ALTER TABLE "collections" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "collections" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "collections" ADD CONSTRAINT "collections_name_user_id_key" UNIQUE("name","user_id");