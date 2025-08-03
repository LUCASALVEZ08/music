import { pgTable, text, integer, timestamp, uuid, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  subscriptionType: text("subscription_type").notNull(),
  favoriteGenres: text("favorite_genres"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const songs = pgTable("songs", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  album: text("album"),
  genre: text("genre").notNull(),
  durationSeconds: integer("duration_seconds").notNull(),
  releaseDate: timestamp("release_date").notNull(),
  filePath: text("file_path").notNull(), // Path to MP3 file
  fileSize: integer("file_size").notNull(), // File size in bytes
  isPublic: boolean("is_public").default(true),
  uploadedBy: uuid("uploaded_by")
    .notNull()
    .references(() => users.id),
  uploadDate: timestamp("upload_date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const playlists = pgTable("playlists", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  isPublic: boolean("is_public").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
});

export const playlistSongs = pgTable("playlist_songs", {
  id: uuid("id").primaryKey().defaultRandom(),
  playlistId: uuid("playlist_id")
    .notNull()
    .references(() => playlists.id),
  songId: uuid("song_id")
    .notNull()
    .references(() => songs.id),
  addedAt: timestamp("added_at").defaultNow(),
});

export const songReviews = pgTable("song_reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  songId: uuid("song_id")
    .notNull()
    .references(() => songs.id),
  rating: integer("rating").notNull(),
  reviewText: text("review_text"),
  reviewedAt: timestamp("reviewed_at").defaultNow(),
});

export const listeningHistory = pgTable("listening_history", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  songId: uuid("song_id")
    .notNull()
    .references(() => songs.id),
  playedAt: timestamp("played_at").defaultNow(),
  device: text("device"),
  duration: integer("duration"), // How long the song was played
});

export const usersRelations = relations(users, ({ many }) => ({
  songs: many(songs),
  playlists: many(playlists),
  reviews: many(songReviews),
  listeningHistory: many(listeningHistory),
}));

export const songsRelations = relations(songs, ({ one, many }) => ({
  uploadedBy: one(users, {
    fields: [songs.uploadedBy],
    references: [users.id],
  }),
  playlistSongs: many(playlistSongs),
  reviews: many(songReviews),
  listeningHistory: many(listeningHistory),
}));

export const playlistsRelations = relations(playlists, ({ one, many }) => ({
  user: one(users, {
    fields: [playlists.userId],
    references: [users.id],
  }),
  playlistSongs: many(playlistSongs),
}));

export const playlistSongsRelations = relations(playlistSongs, ({ one }) => ({
  playlist: one(playlists, {
    fields: [playlistSongs.playlistId],
    references: [playlists.id],
  }),
  song: one(songs, {
    fields: [playlistSongs.songId],
    references: [songs.id],
  }),
}));

export const songReviewsRelations = relations(songReviews, ({ one }) => ({
  user: one(users, {
    fields: [songReviews.userId],
    references: [users.id],
  }),
  song: one(songs, {
    fields: [songReviews.songId],
    references: [songs.id],
  }),
}));

export const listeningHistoryRelations = relations(listeningHistory, ({ one }) => ({
  user: one(users, {
    fields: [listeningHistory.userId],
    references: [users.id],
  }),
  song: one(songs, {
    fields: [listeningHistory.songId],
    references: [songs.id],
  }),
}));
