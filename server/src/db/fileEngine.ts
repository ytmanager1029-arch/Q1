import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

export type Doc = Record<string, unknown> & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

type Filter = Record<string, unknown>;

const dataDir = path.resolve(__dirname, "../../.data");

function ensureDir() {
  fs.mkdirSync(dataDir, { recursive: true });
}

function fileFor(name: string) {
  return path.join(dataDir, `${name}.json`);
}

function oid() {
  return crypto.randomBytes(12).toString("hex");
}

function revive(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(revive);
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      if ((k === "createdAt" || k === "updatedAt" || k === "timestamp" || k === "lastLoginAt" || k === "lockedUntil") && typeof v === "string") {
        out[k] = new Date(v);
      } else {
        out[k] = revive(v);
      }
    }
    return out;
  }
  return value;
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

function plainOf(doc: Doc): Doc {
  const copy = { ...doc } as Doc & { save?: unknown; deleteOne?: unknown };
  delete copy.save;
  delete copy.deleteOne;
  return copy;
}

function match(doc: Record<string, unknown>, filter: Filter = {}): boolean {
  if (filter.$or && Array.isArray(filter.$or)) {
    if (!(filter.$or as Filter[]).some((f) => match(doc, f))) return false;
  }

  for (const [key, raw] of Object.entries(filter)) {
    if (key === "$or") continue;
    const current = doc[key];

    if (raw instanceof RegExp) {
      if (!raw.test(String(current ?? ""))) return false;
      continue;
    }

    if (raw && typeof raw === "object" && !Array.isArray(raw) && !(raw instanceof Date)) {
      const ops = raw as Record<string, unknown>;
      const opKeys = Object.keys(ops);
      if (opKeys.some((k) => k.startsWith("$"))) {
        const asDate = (v: unknown) => new Date(v as string).getTime();
        const curNum =
          current instanceof Date ? current.getTime() : typeof current === "number" ? current : asDate(current);
        if (ops.$gte !== undefined && curNum < asDate(ops.$gte)) return false;
        if (ops.$lte !== undefined && curNum > asDate(ops.$lte)) return false;
        if (ops.$gt !== undefined && curNum <= asDate(ops.$gt)) return false;
        if (ops.$lt !== undefined && curNum >= asDate(ops.$lt)) return false;
        continue;
      }
    }

    if (key === "_id") {
      if (String(current) !== String(raw)) return false;
      continue;
    }

    if (String(current ?? "") !== String(raw ?? "")) return false;
  }

  return true;
}

export function createFileCollection(name: string) {
  ensureDir();
  const file = fileFor(name);

  function read(): Doc[] {
    if (!fs.existsSync(file)) return [];
    const raw = JSON.parse(fs.readFileSync(file, "utf8")) as unknown[];
    return (revive(raw) as Doc[]) ?? [];
  }

  function write(rows: Doc[]) {
    ensureDir();
    fs.writeFileSync(file, JSON.stringify(rows, null, 2));
  }

  function attach(doc: Doc) {
    const wrapped = doc as Doc & {
      save: () => Promise<Doc>;
      deleteOne: () => Promise<void>;
    };
    wrapped.save = async () => {
      const rows = read();
      const i = rows.findIndex((r) => r._id === doc._id);
      doc.updatedAt = new Date();
      const plain = { ...doc } as Doc;
      delete (plain as { save?: unknown }).save;
      delete (plain as { deleteOne?: unknown }).deleteOne;
      if (i >= 0) rows[i] = plain;
      else rows.push(plain);
      write(rows);
      return wrapped;
    };
    wrapped.deleteOne = async () => {
      write(read().filter((r) => r._id !== doc._id));
    };
    return wrapped;
  }

  function query(filter: Filter = {}) {
    let rows = read().filter((d) => match(d, filter));
    const api = {
      sort(spec: Record<string, 1 | -1>) {
        const [key, dir] = Object.entries(spec)[0] ?? ["createdAt", -1];
        rows = [...rows].sort((a, b) => {
          const av = a[key];
          const bv = b[key];
          const an = av instanceof Date ? av.getTime() : Number(av) || String(av ?? "");
          const bn = bv instanceof Date ? bv.getTime() : Number(bv) || String(bv ?? "");
          if (an < bn) return dir === 1 ? -1 : 1;
          if (an > bn) return dir === 1 ? 1 : -1;
          return 0;
        });
        return api;
      },
      skip(n: number) {
        rows = rows.slice(n);
        return api;
      },
      limit(n: number) {
        rows = rows.slice(0, n);
        return api;
      },
      lean() {
        return Promise.resolve(rows.map((r) => clone(r)));
      },
      then<TResult1 = Doc[], TResult2 = never>(
        resolve?: ((value: Doc[]) => TResult1 | PromiseLike<TResult1>) | null,
        reject?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
      ) {
        return Promise.resolve(rows.map((r) => clone(r))).then(resolve ?? undefined, reject ?? undefined);
      },
    };
    return api;
  }

  return {
    async create(data: Record<string, unknown>) {
      const now = new Date();
      const doc: Doc = {
        ...data,
        _id: (data._id as string) || oid(),
        createdAt: (data.createdAt as Date) || now,
        updatedAt: now,
      };
      const rows = read();
      rows.push(doc);
      write(rows);
      return attach(clone(doc));
    },
    find(filter: Filter = {}) {
      return query(filter);
    },
    findOne(filter: Filter) {
      const row = read().find((d) => match(d, filter));
      const doc = row ? attach(clone(row)) : null;
      return {
        lean: async () => (doc ? clone(plainOf(doc)) : null),
        then<T1, T2>(
          resolve?: ((value: typeof doc) => T1 | PromiseLike<T1>) | null,
          reject?: ((reason: unknown) => T2 | PromiseLike<T2>) | null,
        ) {
          return Promise.resolve(doc).then(resolve ?? undefined, reject ?? undefined);
        },
      };
    },
    findById(id: string) {
      const row = read().find((d) => d._id === String(id));
      const doc = row ? attach(clone(row)) : null;
      return {
        lean: async () => (doc ? clone(plainOf(doc)) : null),
        then<T1, T2>(
          resolve?: ((value: typeof doc) => T1 | PromiseLike<T1>) | null,
          reject?: ((reason: unknown) => T2 | PromiseLike<T2>) | null,
        ) {
          return Promise.resolve(doc).then(resolve ?? undefined, reject ?? undefined);
        },
      };
    },
    async countDocuments(filter: Filter = {}) {
      return read().filter((d) => match(d, filter)).length;
    },
    async aggregate(pipeline: Array<Record<string, unknown>>) {
      let rows: Record<string, unknown>[] = read();
      for (const stage of pipeline) {
        if (stage.$group) {
          const g = stage.$group as { _id: string; count?: { $sum: number } };
          const field = String(g._id).replace(/^\$/, "");
          const map = new Map<string, number>();
          for (const row of rows) {
            const key = String(row[field] ?? "");
            map.set(key, (map.get(key) ?? 0) + 1);
          }
          rows = [...map.entries()].map(([id, count]) => ({ _id: id, count }));
        }
      }
      return rows;
    },
  };
}

export function isHexId(id: string) {
  return /^[a-f0-9]{24}$/i.test(id);
}
