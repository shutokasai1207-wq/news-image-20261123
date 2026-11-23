// The World in One Page — an entry for make.fun's news-image-20261123.
//
// The picture of Monday 23 November 2026 is drawn ahead of time (the front
// page in render/frontpage.html, rendered to entry.png beside this file):
// the grader's container has no network, so the program's job is to deliver
// those exact bytes to /output/entry.png, unchanged, on every run.
//
// Before writing, the program checks the image against the gate's own
// limits — a whole PNG or JPEG, at most 1 MiB and at most 1024x1024 — so a
// truncated or oversized file fails loudly here instead of scoring 0.
// The write goes through a temporary file renamed into place, so the
// output is never a partial copy.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_BYTES = 1_048_576; // 1 MiB
const MAX_SIDE = 1024;

function imageSize(bytes: Buffer): { width: number; height: number } {
  // PNG: signature, then IHDR width/height as big-endian uint32 at 16/20.
  if (bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }
  // JPEG: walk the segments to the start-of-frame marker.
  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    let at = 2;
    while (at + 9 < bytes.length) {
      if (bytes[at] !== 0xff) break;
      const marker = bytes[at + 1];
      if (marker >= 0xc0 && marker <= 0xc3) {
        return { width: bytes.readUInt16BE(at + 7), height: bytes.readUInt16BE(at + 5) };
      }
      at += 2 + bytes.readUInt16BE(at + 2);
    }
  }
  throw new Error('entry.png is neither a PNG nor a JPEG');
}

const bytes = readFileSync(new URL('./entry.png', import.meta.url));
if (bytes.length > MAX_BYTES) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the ${MAX_BYTES}-byte cap`);
}
const { width, height } = imageSize(bytes);
if (width > MAX_SIDE || height > MAX_SIDE) {
  throw new Error(`entry.png is ${width}x${height}, over the ${MAX_SIDE}x${MAX_SIDE} cap`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, '.entry.png.tmp');
writeFileSync(tmp, bytes);
renameSync(tmp, join(outDir, 'entry.png'));
