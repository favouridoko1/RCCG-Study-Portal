import "dotenv/config";
import { db } from "../src/prisma/db";

const materials = await db.orm.public.Material.all();

console.log(materials);

process.exit(0);