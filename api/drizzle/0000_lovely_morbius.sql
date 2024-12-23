-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
-- CREATE TABLE "clubs" (
-- 	"name" varchar NOT NULL,
-- 	"founded" integer NOT NULL,
-- 	"city" varchar,
-- 	"position" integer NOT NULL,
-- 	"matches_played" integer NOT NULL,
-- 	"wins" integer NOT NULL,
-- 	"draws" integer NOT NULL,
-- 	"losses" integer NOT NULL,
-- 	"goal_difference" integer NOT NULL,
-- 	"goals_scored" integer NOT NULL,
-- 	"goals_conceded" integer NOT NULL,
-- 	"points" integer NOT NULL,
-- 	"ppg" double precision NOT NULL,
-- 	"xG" double precision NOT NULL,
-- 	"xGA" double precision NOT NULL,
-- 	"xGD" double precision NOT NULL,
-- 	"xGDp90" double precision NOT NULL,
-- 	"xGp90" double precision NOT NULL,
-- 	"last_five" varchar,
-- 	"attendance_per_game" integer NOT NULL,
-- 	"possession" double precision,
-- 	"prgC" integer,
-- 	"prgP" integer,
-- 	"no_players" integer NOT NULL,
-- 	"average_age" double precision NOT NULL,
-- 	"stadium" varchar,
-- 	"nickname" varchar,
-- 	"stadium_capacity" integer,
-- 	"manager" varchar,
-- 	"id" serial PRIMARY KEY NOT NULL,
-- 	"created_at" timestamp NOT NULL,
-- 	"updated_at" timestamp NOT NULL,
-- 	CONSTRAINT "clubs_name_key" UNIQUE("name")
-- );
-- --> statement-breakpoint
-- CREATE TABLE "players" (
-- 	"name" varchar NOT NULL,
-- 	"club_id" integer NOT NULL,
-- 	"nationality" varchar NOT NULL,
-- 	"position" varchar NOT NULL,
-- 	"birth_date" timestamp NOT NULL,
-- 	"matches_played" integer NOT NULL,
-- 	"yellow_cards" integer NOT NULL,
-- 	"red_cards" integer NOT NULL,
-- 	"starts" integer NOT NULL,
-- 	"full_90s" integer NOT NULL,
-- 	"minutes" integer NOT NULL,
-- 	"goals" integer NOT NULL,
-- 	"assists" integer NOT NULL,
-- 	"non_penalty_goals" integer NOT NULL,
-- 	"xG" double precision NOT NULL,
-- 	"npxG" double precision NOT NULL,
-- 	"xAG" double precision NOT NULL,
-- 	"prgC" integer NOT NULL,
-- 	"prgP" integer NOT NULL,
-- 	"goals_p90" double precision NOT NULL,
-- 	"assists_p90" double precision NOT NULL,
-- 	"xG_p90" double precision NOT NULL,
-- 	"xAG_p90" double precision NOT NULL,
-- 	"tackles" integer,
-- 	"saves" integer,
-- 	"clean_sheets" integer,
-- 	"interceptions" integer,
-- 	"blocks" integer,
-- 	"save_percent" double precision,
-- 	"clearances" integer,
-- 	"is_captain" boolean,
-- 	"id" serial PRIMARY KEY NOT NULL,
-- 	"created_at" timestamp NOT NULL,
-- 	"updated_at" timestamp NOT NULL,
-- 	CONSTRAINT "players_name_club_id_key" UNIQUE("name","club_id")
-- );
-- --> statement-breakpoint
-- ALTER TABLE "players" ADD CONSTRAINT "players_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE no action ON UPDATE no action;
