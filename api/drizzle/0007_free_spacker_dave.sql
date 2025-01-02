ALTER TABLE "clubs_to_collections" DROP CONSTRAINT "clubs_to_collections_club_id_clubs_id_fk";
--> statement-breakpoint
ALTER TABLE "clubs_to_collections" DROP CONSTRAINT "clubs_to_collections_collection_id_collections_id_fk";
--> statement-breakpoint
ALTER TABLE "players_to_collections" DROP CONSTRAINT "players_to_collections_player_id_players_id_fk";
--> statement-breakpoint
ALTER TABLE "players_to_collections" DROP CONSTRAINT "players_to_collections_collection_id_collections_id_fk";
--> statement-breakpoint
ALTER TABLE "clubs_to_collections" ADD CONSTRAINT "clubs_to_collections_club_id_clubs_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clubs_to_collections" ADD CONSTRAINT "clubs_to_collections_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "players_to_collections" ADD CONSTRAINT "players_to_collections_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "players_to_collections" ADD CONSTRAINT "players_to_collections_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;