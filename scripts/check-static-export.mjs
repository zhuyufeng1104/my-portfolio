import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const output = resolve("out");
const prefix = "/my-portfolio";
const required = [
  "index.html",
  "works/index.html",
  "projects/afterlight/index.html",
  "projects/liquid-form/index.html",
  "projects/echoes/index.html",
  "projects/other-sun/index.html",
  "404.html",
];
for (const file of required) {
  assert(existsSync(join(output, file)), `Missing exported route: ${file}`);
}

function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  });
}

let checked = 0;
for (const file of files(output).filter((file) => file.endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  // Inspect actual HTML elements, including links and framework-generated assets.
  for (const [, value] of html.matchAll(
    /<(?:a|img|script|link|source)\b[^>]*?\b(?:src|href)="([^"]+)"/g,
  )) {
    if (!value.startsWith("/") || value.startsWith("//")) continue;
    assert(
      value === prefix || value.startsWith(`${prefix}/`),
      `Unprefixed URL in ${file}: ${value}`,
    );
    const pathname = decodeURIComponent(value.split(/[?#]/)[0]).slice(
      prefix.length,
    );
    const target = join(output, pathname);
    assert(
      existsSync(target) || existsSync(join(target, "index.html")),
      `Missing exported resource in ${file}: ${value}`,
    );
    checked++;
  }
}
assert(
  readFileSync(join(output, "index.html"), "utf8").includes(
    `${prefix}/images/hero.svg`,
  ),
  "Hero artwork must use the repository base path",
);
assert(checked > 0, "No local links or assets were checked");
console.log(
  `PASS: ${required.length} required routes and ${checked} local URLs use ${prefix}/ and resolve to exported files.`,
);
