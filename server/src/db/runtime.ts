import { createFileCollection } from "./fileEngine";

type AnyCollection = {
  create: (...args: never[]) => unknown;
  find: (...args: never[]) => unknown;
  findOne: (...args: never[]) => unknown;
  findById: (...args: never[]) => unknown;
  countDocuments: (...args: never[]) => unknown;
  aggregate?: (...args: never[]) => unknown;
};

const bags: Record<string, AnyCollection> = {};

export function setCollection(name: string, collection: AnyCollection) {
  bags[name] = collection;
}

export function initFileCollections() {
  setCollection("users", createFileCollection("users") as unknown as AnyCollection);
  setCollection("inquiries", createFileCollection("inquiries") as unknown as AnyCollection);
  setCollection("auditlogs", createFileCollection("auditlogs") as unknown as AnyCollection);
}

function proxy(name: string) {
  return new Proxy(
    {},
    {
      get(_target, prop) {
        const col = bags[name];
        if (!col) {
          throw new Error("Database is not initialized.");
        }
        const value = (col as Record<string | symbol, unknown>)[prop];
        return typeof value === "function" ? (value as (...a: unknown[]) => unknown).bind(col) : value;
      },
    },
  );
}

export const Users = proxy("users");
export const Inquiries = proxy("inquiries");
export const AuditLogs = proxy("auditlogs");
