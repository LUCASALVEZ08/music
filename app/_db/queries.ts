import { db } from "./drizzle";
import { eq, desc } from "drizzle-orm";
import { users, songs, playlists, songReviews } from "./schema";
import type { NewUser, NewSong, NewPlaylist } from "./types";

export async function createUser(userData: NewUser) {
  return await db.insert(users).values(userData).returning();
}

export async function getUserById(id: string) {
  return await db.select().from(users).where(eq(users.id, id)).limit(1);
}

export async function getUserByEmail(email: string) {
  return await db.select().from(users).where(eq(users.email, email)).limit(1);
}

export async function createSong(songData: NewSong) {
  return await db.insert(songs).values(songData).returning();
}

export async function getSongsByArtist(artist: string) {
  return await db.select().from(songs).where(eq(songs.artist, artist));
}

export async function getSongsByGenre(genre: string) {
  return await db.select().from(songs).where(eq(songs.genre, genre));
}

export async function getSongsWithUser() {
  return await db
    .select({
      id: songs.id,
      title: songs.title,
      artist: songs.artist,
      album: songs.album,
      genre: songs.genre,
      durationSeconds: songs.durationSeconds,
      releaseDate: songs.releaseDate,
      uploadDate: songs.uploadDate,
      uploadedBy: users.name,
    })
    .from(songs)
    .innerJoin(users, eq(songs.uploadedBy, users.id))
    .orderBy(desc(songs.uploadDate));
}

export async function createPlaylist(playlistData: NewPlaylist) {
  return await db.insert(playlists).values(playlistData).returning();
}

export async function getUserPlaylists(userId: string) {
  return await db
    .select()
    .from(playlists)
    .where(eq(playlists.userId, userId))
    .orderBy(desc(playlists.createdAt));
}

export async function getSongReviews(songId: string) {
  return await db
    .select({
      id: songReviews.id,
      rating: songReviews.rating,
      reviewText: songReviews.reviewText,
      reviewedAt: songReviews.reviewedAt,
      userName: users.name,
    })
    .from(songReviews)
    .innerJoin(users, eq(songReviews.userId, users.id))
    .where(eq(songReviews.songId, songId))
    .orderBy(desc(songReviews.reviewedAt));
}

export async function getAverageRating(songId: string) {
  const result = await db
    .select({
      averageRating: songReviews.rating,
    })
    .from(songReviews)
    .where(eq(songReviews.songId, songId));

  if (result.length === 0) return 0;

  const totalRating = result.reduce((sum, review) => sum + review.averageRating, 0);
  return totalRating / result.length;
}
