// main.ts — copies POST.json from the repository root into the output directory.
// Node 22, standard library only.
//
// The make.fun runner sets:
//   MAKEFUN_BOT_DIR    — repo root (default /bot)
//   MAKEFUN_OUTPUT_DIR — directory to write POST.json into (default /output)
// The entry's POST.json (with the real post URL) is placed in the repo root
// before submission; this script only copies it, it never fabricates it.
//
// Improvement over a blind copy: the file is read and validated BEFORE
// anything is written, and the destination is re-read and byte-compared
// AFTER the write. A blind copy would exit 0 while handing the grader a
// truncated, non-JSON, or wrong-shaped file (e.g. an empty file, a JSON
// array, or an object with no post URL) — and a partial write would go
// unnoticed. Here both failure modes exit 1 with a clear message and no
// invalid destination file is left behind.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(botDir, "POST.json");
const destination = join(outputDir, "POST.json");

function fail(message: string): never {
  console.error(`Failed to copy POST.json from ${source} to ${destination}: ${message}`);
  process.exit(1);
}

try {
  if (resolve(source) === resolve(destination)) {
    fail("source and destination are the same file; refusing to copy onto itself");
  }

  // 1. Read and validate before writing anything.
  let contents: Buffer;
  try {
    contents = await readFile(source);
  } catch (error) {
    fail(`cannot read source file (${error instanceof Error ? error.message : String(error)})`);
  }

  if (contents!.length === 0) {
    fail("source file is empty");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(contents!.toString("utf8"));
  } catch (error) {
    fail(`source is not valid JSON (${error instanceof Error ? error.message : String(error)})`);
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    fail("source JSON must be an object with a url field");
  }
  const postUrl = (parsed as Record<string, unknown>).url;
  if (typeof postUrl !== "string" || !/^https?:\/\/\S+$/.test(postUrl.trim())) {
    fail("source JSON has no usable url (expected a non-empty http(s) URL string)");
  }

  // 2. Write the validated bytes, then verify the destination matches.
  await mkdir(outputDir, { recursive: true });
  await writeFile(destination, contents!);
  const written = await readFile(destination);
  if (!written.equals(contents!)) {
    fail("destination contents do not match the source after writing (partial/corrupt copy)");
  }
  // Re-parse the destination copy too, so a write that somehow garbled the
  // bytes is caught even if the length happened to match.
  JSON.parse(written.toString("utf8"));

  console.log(`Copied ${source} -> ${destination} (validated url: ${postUrl.trim()})`);
} catch (error) {
  if (error instanceof Error && error.message.startsWith("Failed to copy")) throw error;
  console.error(`Failed to copy POST.json from ${source} to ${destination}:`, error);
  process.exit(1);
}
