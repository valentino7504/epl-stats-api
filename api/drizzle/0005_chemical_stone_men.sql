CREATE TABLE "password_tokens" (
	"token" varchar PRIMARY KEY NOT NULL,
	"hashedPassword" varchar NOT NULL,
	"user_id" integer NOT NULL,
	"expires_at" timestamp DEFAULT NOW() + INTERVAL '30 minutes' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"used" boolean DEFAULT false
);
--> statement-breakpoint
ALTER TABLE "players" DROP CONSTRAINT "players_club_id_fkey";
--> statement-breakpoint
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_user_id_fkey";
--> statement-breakpoint
ALTER TABLE "password_tokens" ADD CONSTRAINT "password_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "players" ADD CONSTRAINT "players_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;