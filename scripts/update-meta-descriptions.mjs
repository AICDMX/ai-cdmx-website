#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

const [, , distArg, localeArg] = process.argv;
const distDir = path.resolve(process.cwd(), distArg ?? "dist/en");
const localePath = path.resolve(
  process.cwd(),
  localeArg ?? "rosey/locales/en.json",
);

async function pathExists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function loadTranslations(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(raw);
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (
      key.startsWith("meta-") &&
      key.endsWith("-description") &&
      typeof value === "string"
    ) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

async function collectHtmlFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectHtmlFiles(entryPath)));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(entryPath);
    }
  }
  return files;
}

function escapeAttr(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

async function main() {
  if (!(await pathExists(distDir))) {
    console.warn(
      `Meta translation skipped: directory "${distDir}" was not found.`,
    );
    return;
  }

  if (!(await pathExists(localePath))) {
    console.warn(
      `Meta translation skipped: locale file "${localePath}" was not found.`,
    );
    return;
  }

  const translations = await loadTranslations(localePath);
  if (!Object.keys(translations).length) {
    console.warn("Meta translation skipped: no translation keys were found.");
    return;
  }

  const files = await collectHtmlFiles(distDir);
  const metaRegex = /<meta\b[^>]*data-meta-key="([^"]+)"[^>]*>/gi;
  const contentRegex = /content="([^"]*)"/i;
  let updatedFiles = 0;

  for (const file of files) {
    let html = await fs.readFile(file, "utf8");
    let changed = false;

    html = html.replace(metaRegex, (match, key) => {
      const translation = translations[key];
      if (!translation) {
        return match;
      }

      const escaped = escapeAttr(translation);
      const replacement = match.replace(
        contentRegex,
        `content="${escaped}"`,
      );

      if (replacement !== match) {
        changed = true;
        return replacement;
      }

      changed = true;
      return match.replace(
        "<meta",
        `<meta content="${escaped}"`,
      );
    });

    if (changed) {
      await fs.writeFile(file, html);
      updatedFiles += 1;
    }
  }

  console.log(
    `Updated English meta descriptions in ${updatedFiles} file${updatedFiles === 1 ? "" : "s"}.`,
  );
}

main().catch((error) => {
  console.error("Failed to update meta descriptions:", error);
  process.exit(1);
});
