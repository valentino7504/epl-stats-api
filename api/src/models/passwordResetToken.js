import {
  pgTable, varchar, timestamp, boolean,
  integer,
  foreignKey,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import users from './users.js';

const passwordTokens = pgTable('password_tokens', {
  token: varchar().primaryKey(),
  hashedPassword: varchar().notNull(),
  userId: integer('user_id').notNull(),
  expiresAt: timestamp('expires_at').notNull().default(sql`NOW() + INTERVAL '30 minutes'`),
  createdAt: timestamp('created_at').defaultNow(),
  used: boolean().default(false),
}, (table) => [
  foreignKey({
    columns: [table.userId],
    foreignColumns: [users.id],
    name: 'password_tokens_user_id_fkey',
  }).onDelete('cascade').onUpdate('cascade'),
]);

export default passwordTokens;
