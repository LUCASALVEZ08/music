import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { users, songs, playlists, playlistSongs, songReviews, listeningHistory } from "./schema";

export type User = InferSelectModel<typeof users>;
export type Song = InferSelectModel<typeof songs>;
export type Playlist = InferSelectModel<typeof playlists>;
export type PlaylistSong = InferSelectModel<typeof playlistSongs>;
export type SongReview = InferSelectModel<typeof songReviews>;
export type ListeningHistory = InferSelectModel<typeof listeningHistory>;

export type NewUser = InferInsertModel<typeof users>;
export type NewSong = InferInsertModel<typeof songs>;
export type NewPlaylist = InferInsertModel<typeof playlists>;
export type NewPlaylistSong = InferInsertModel<typeof playlistSongs>;
export type NewSongReview = InferInsertModel<typeof songReviews>;
export type NewListeningHistory = InferInsertModel<typeof listeningHistory>;
