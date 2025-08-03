import { db } from "./drizzle";
import { users, songs, playlists, songReviews } from "./schema";

export async function seed() {
  console.log("🌱 Seeding database...");

  const user1 = await db
    .insert(users)
    .values({
      name: "João Silva",
      email: "joao@example.com",
      passwordHash: "hashed_password_123",
      subscriptionType: "premium",
      favoriteGenres: "rock,pop,jazz",
    })
    .returning();

  const user2 = await db
    .insert(users)
    .values({
      name: "Maria Santos",
      email: "maria@example.com",
      passwordHash: "hashed_password_456",
      subscriptionType: "free",
      favoriteGenres: "pop,electronic",
    })
    .returning();

  console.log("✅ Users created");

  const song1 = await db
    .insert(songs)
    .values({
      title: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      genre: "rock",
      durationSeconds: 354,
      releaseDate: new Date("1975-10-31"),
      filePath: "/uploads/bohemian_rhapsody.mp3",
      fileSize: 1024000,
      uploadedBy: user1[0].id,
    })
    .returning();

  const song2 = await db
    .insert(songs)
    .values({
      title: "Imagine",
      artist: "John Lennon",
      album: "Imagine",
      genre: "pop",
      durationSeconds: 183,
      releaseDate: new Date("1971-09-09"),
      filePath: "/uploads/imagine.mp3",
      fileSize: 512000,
      uploadedBy: user2[0].id,
    })
    .returning();

  console.log("✅ Songs created");

  const playlist1 = await db
    .insert(playlists)
    .values({
      name: "My Favorite Rock Songs",
      description: "A collection of my favorite rock songs",
      userId: user1[0].id,
    })
    .returning();

  console.log("✅ Playlists created");

  await db.insert(songReviews).values({
    userId: user1[0].id,
    songId: song2[0].id,
    rating: 5,
    reviewText: "Amazing song! One of the best ever written.",
  });

  await db.insert(songReviews).values({
    userId: user2[0].id,
    songId: song1[0].id,
    rating: 4,
    reviewText: "Classic rock masterpiece!",
  });

  console.log("✅ Reviews created");
  console.log("🎉 Database seeded successfully!");
}

if (require.main === module) {
  seed().catch(console.error);
}
