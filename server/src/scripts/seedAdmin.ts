import { connectDb, disconnectDb } from "../config/db";
import { seedAdminIfNeeded } from "../services/seed";

async function main() {
  await connectDb();
  await seedAdminIfNeeded();
  await disconnectDb();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
