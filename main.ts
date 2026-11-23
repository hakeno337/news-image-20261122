// The World Today, Sunday 22 November 2026: delivers this entry's image to the grader.
// The image lives beside this file as entry.png. Before handing it over, the program proves it
// fits the gate (a whole PNG or JPEG, at most 1 MiB, at most 1024 by 1024 pixels), writes it to
// the output as entry.png, and reads the copy back to prove the bytes arrived whole.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const image = readFileSync(new URL('./entry.png', import.meta.url));

function dimensionsOf(buf) {
  // PNG: the IHDR chunk follows the 8-byte signature; width and height are big-endian at 16/20.
  if (buf.length > 24 && buf[0] === 0x89 && buf.toString('latin1', 1, 4) === 'PNG') {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20), kind: 'PNG' };
  }
  // JPEG: walk the segments from the SOI marker to a start-of-frame marker, which carries the size.
  if (buf.length > 2 && buf[0] === 0xff && buf[1] === 0xd8) {
    for (let at = 2; at + 9 < buf.length && buf[at] === 0xff;) {
      const marker = buf[at + 1];
      const isFrame = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
      if (isFrame) return { width: buf.readUInt16BE(at + 7), height: buf.readUInt16BE(at + 5), kind: 'JPEG' };
      at += 2 + buf.readUInt16BE(at + 2);
    }
    return { width: 0, height: 0, kind: 'JPEG' };
  }
  return null;
}

const dims = dimensionsOf(image);
if (dims === null) throw new Error('entry.png is neither a PNG nor a JPEG');
if (image.length > 1024 * 1024) throw new Error(`entry.png is ${image.length} bytes, over the 1 MiB gate limit`);
if (dims.width > 1024 || dims.height > 1024) {
  throw new Error(`entry.png is ${dims.width}x${dims.height}, over the 1024x1024 gate limit`);
}

const target = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');
writeFileSync(target, image);
const back = readFileSync(target);
if (back.length !== image.length || !back.equals(image)) throw new Error('the delivered copy differs from entry.png');
