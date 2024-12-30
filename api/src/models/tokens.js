import {
  serial, timestamp, pgTable, varchar, foreignKey, integer,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import users from './users.js';

const tokens = pgTable('tokens', {
  id: serial().primaryKey().notNull(),
  userId: integer('user_id').notNull(),
  hashedToken: varchar().notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().default(sql`now()`),
}, (table) => [
  foreignKey({
    columns: [table.userId],
    foreignColumns: [users.id],
    name: 'tokens_user_id_fkey',
  }).onDelete('cascade').onUpdate('cascade'),
]);

export default tokens;
