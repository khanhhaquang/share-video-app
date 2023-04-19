import { FileDB } from 'https://deno.land/x/filedb/mod.ts';
const db = new FileDB({ rootDir: './db', isAutosave: true });

export default db;
