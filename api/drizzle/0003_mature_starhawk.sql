ALTER TABLE "tokens" ALTER COLUMN "hashedToken" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tokens" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");