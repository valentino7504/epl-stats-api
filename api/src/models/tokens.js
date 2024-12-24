import {
  serial, timestamp, pgTable, varchar, boolean, foreignKey, integer,
} from 'drizzle-orm/pg-core';
import users from './users.js';

const tokens = pgTable('tokens', {
  id: serial().primaryKey().notNull(),
  userId: integer('user_id').notNull(),
  hashedToken: varchar(),
  revoked: boolean().notNull().default(false),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull(),
}, (table) => [
  foreignKey({
    columns: [table.userId],
    foreignColumns: [users.id],
    name: 'tokens_user_id_fkey',
  }),
]);

export default tokens;
