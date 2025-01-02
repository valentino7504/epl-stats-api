import {
  varchar, pgTable, integer, serial, timestamp, foreignKey,
  unique,
} from 'drizzle-orm/pg-core';
import users from './users.js';

const collections = pgTable('collections', {
  id: serial().primaryKey().notNull(),
  name: varchar(),
  description: varchar(),
  userId: integer('user_id').notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
}, (table) => [
  foreignKey({
    columns: [table.userId],
    foreignColumns: [users.id],
    name: 'collections_user_id_fkey',
  }).onDelete('cascade'),
  unique('collections_name_user_id_key').on(table.name, table.userId),
]);

export default collections;
