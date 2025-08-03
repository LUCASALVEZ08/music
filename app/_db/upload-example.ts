import { db } from "./drizzle";
import { songs } from "./schema";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import type { NewSong } from "./types";

export async function uploadSong(
  file: File,
  songData: Omit<NewSong, "filePath" | "fileSize" | "uploadedBy">,
  uploadedBy: string
) {
  try {
    const uploadsDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const fileExtension = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`;
    const filePath = join(uploadsDir, fileName);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(filePath, buffer);

    const newSong = await db
      .insert(songs)
      .values({
        ...songData,
        filePath: `/uploads/${fileName}`,
        fileSize: buffer.length,
        uploadedBy,
      })
      .returning();

    return newSong[0];
  } catch (error) {
    console.error("Error uploading song:", error);
    throw error;
  }
}

// Example usage in a Next.js API route:
/*
export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const title = formData.get("title") as string;
  const artist = formData.get("artist") as string;
  const album = formData.get("album") as string;
  const genre = formData.get("genre") as string;
  const durationSeconds = parseInt(formData.get("durationSeconds") as string);
  const releaseDate = new Date(formData.get("releaseDate") as string);
  const uploadedBy = formData.get("uploadedBy") as string;

  const song = await uploadSong(file, {
    title,
    artist,
    album,
    genre,
    durationSeconds,
    releaseDate,
  }, uploadedBy);

  return Response.json({ success: true, song });
}
*/
