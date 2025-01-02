ALTER TABLE "collections" DROP CONSTRAINT "collections_user_id_fkey";
--> statement-breakpoint
ALTER TABLE "collections" ADD CONSTRAINT "collections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;