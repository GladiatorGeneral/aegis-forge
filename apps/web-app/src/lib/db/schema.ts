import { pgTable, serial, text, varchar, timestamp, integer, decimal, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 20 }).$type<'student' | 'teacher' | 'admin'>().notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const standards = pgTable('standards', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 20 }).unique().notNull(),
  description: text('description').notNull(),
  gradeLevel: varchar('grade_level', { length: 10 }).notNull(),
  domain: varchar('domain', { length: 50 }).notNull(),
  cluster: varchar('cluster', { length: 100 }),
  prerequisites: jsonb('prerequisites').$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const learningObjectives = pgTable('learning_objectives', {
  id: serial('id').primaryKey(),
  standardId: integer('standard_id').references(() => standards.id),
  description: text('description').notNull(),
  complexityLevel: varchar('complexity_level', { length: 20 }).$type<'basic' | 'proficient' | 'advanced'>(),
  prerequisites: jsonb('prerequisites').$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const problems = pgTable('problems', {
  id: serial('id').primaryKey(),
  objectiveId: integer('objective_id').references(() => learningObjectives.id),
  question: text('question').notNull(),
  expectedAnswer: jsonb('expected_answer'),
  difficulty: varchar('difficulty', { length: 20 }).$type<'easy' | 'medium' | 'hard'>(),
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const studentProgress = pgTable('student_progress', {
  id: serial('id').primaryKey(),
  studentId: integer('student_id').references(() => users.id),
  objectiveId: integer('objective_id').references(() => learningObjectives.id),
  status: varchar('status', { length: 20 }).default('not_started').$type<'not_started' | 'in_progress' | 'mastered'>(),
  confidenceScore: decimal('confidence_score', { precision: 3, scale: 2 }),
  lastAttempted: timestamp('last_attempted'),
  attemptsCount: integer('attempts_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const auditLogs = pgTable('audit_logs', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  action: varchar('action', { length: 100 }).notNull(),
  entityType: varchar('entity_type', { length: 50 }),
  entityId: integer('entity_id'),
  details: jsonb('details'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow(),
});
