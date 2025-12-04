import { pgTable, text, timestamp, uuid, integer, boolean, jsonb, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// Users table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  image: text('image'),
  password: varchar('password', { length: 255 }), // Added for email/password auth
  role: varchar('role', { length: 50 }).default('user'), // Added for role-based access
  isActive: boolean('is_active').default(true), // Added for account status
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// OAuth accounts table
export const accounts = pgTable('accounts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: varchar('type', { length: 50 }).notNull(),
  provider: varchar('provider', { length: 50 }).notNull(),
  providerAccountId: varchar('provider_account_id', { length: 255 }).notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: varchar('token_type', { length: 50 }),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Sessions table
export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionToken: varchar('session_token', { length: 255 }).notNull().unique(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Projects table
export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  type: varchar('type', { length: 50 }).notNull(), // 'code', 'docs', 'both'
  language: varchar('language', { length: 100 }),
  framework: varchar('framework', { length: 100 }),
  prompt: text('prompt').notNull(),
  settings: jsonb('settings'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Files table
export const files = pgTable('files', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  path: varchar('path', { length: 500 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'code', 'docs', 'config'
  language: varchar('language', { length: 100 }),
  content: text('content').notNull(),
  size: integer('size').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Generations table (for tracking individual generation jobs)
export const generations = pgTable('generations', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  projectId: uuid('project_id').references(() => projects.id, { onDelete: 'cascade' }),
  prompt: text('prompt').notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'code', 'docs', 'both'
  settings: jsonb('settings'),
  status: varchar('status', { length: 50 }).notNull().default('pending'), // 'pending', 'running', 'completed', 'failed'
  tokensUsed: integer('tokens_used').default(0),
  cost: integer('cost').default(0), // in cents
  error: text('error'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
});

// Templates table
export const templates = pgTable('templates', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 100 }).notNull(),
  language: varchar('language', { length: 100 }),
  difficulty: varchar('difficulty', { length: 50 }).notNull(), // 'beginner', 'intermediate', 'advanced'
  prompt: text('prompt').notNull(),
  settings: jsonb('settings'),
  hasCode: boolean('has_code').default(true),
  hasDocs: boolean('has_docs').default(true),
  downloads: integer('downloads').default(0),
  rating: integer('rating').default(0), // 0-50 (for 0-5 stars)
  isPublic: boolean('is_public').default(true),
  isOfficial: boolean('is_official').default(false),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// User usage tracking
export const usage = pgTable('usage', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  date: timestamp('date').notNull(), // YYYY-MM-DD format
  generations: integer('generations').default(0),
  tokensUsed: integer('tokens_used').default(0),
  cost: integer('cost').default(0), // in cents
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const insertProjectSchema = createInsertSchema(projects);
export const selectProjectSchema = createSelectSchema(projects);

export const insertFileSchema = createInsertSchema(files);
export const selectFileSchema = createSelectSchema(files);

export const insertGenerationSchema = createInsertSchema(generations);
export const selectGenerationSchema = createSelectSchema(generations);

export const insertTemplateSchema = createInsertSchema(templates);
export const selectTemplateSchema = createSelectSchema(templates);

export const insertUsageSchema = createInsertSchema(usage);
export const selectUsageSchema = createSelectSchema(usage);

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export type File = typeof files.$inferSelect;
export type NewFile = typeof files.$inferInsert;

export type Generation = typeof generations.$inferSelect;
export type NewGeneration = typeof generations.$inferInsert;

export type Template = typeof templates.$inferSelect;
export type NewTemplate = typeof templates.$inferInsert;

export type Usage = typeof usage.$inferSelect;
export type NewUsage = typeof usage.$inferInsert;
