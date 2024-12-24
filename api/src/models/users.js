import {
  pgTable, unique, serial, timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

const users = pgTable('users', {
  id: serial().primaryKey().notNull(),
  email: varchar().notNull(),
  hashedPassword: varchar().notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp(
    'updated_at',
    { mode: 'string' },
  ).notNull(),
}, (table) => [
  unique('users_email_key').on(table.email),
]);

export default users;
