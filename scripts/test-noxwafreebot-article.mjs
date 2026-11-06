import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import { NoxCoreDevConfig } from "../examples/NoxWaFreeBot/config.js";

const NoxCoreDevRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const NoxCoreDevServer = await createServer({
  configFile: path.join(NoxCoreDevRoot, "vite.config.mjs"),
  root: NoxCoreDevRoot,
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true },
});

let NoxCoreDevArticle;
let NoxCoreDevCode;
try {
  ({ default: NoxCoreDevArticle } = await NoxCoreDevServer.ssrLoadModule("/src/data/articles/whatsapp-simple-baileys.js"));
  ({ NoxWaFreeBotCode: NoxCoreDevCode } = await NoxCoreDevServer.ssrLoadModule("/src/data/articles/noxwafreebot-code.js"));
} finally {
  await NoxCoreDevServer.close();
}

assert.equal(NoxCoreDevArticle.slug, "bot-whatsapp-simple-baileys");
assert.equal(NoxCoreDevArticle.downloadUrl, "/downloads/noxwafreebot-base.zip");
assert.equal(NoxCoreDevArticle.fr.title.includes("2025"), false);
assert.equal(NoxCoreDevArticle.fr.intro, undefined);
assert.equal(NoxCoreDevArticle.en.intro, undefined);
assert.equal(NoxCoreDevArticle.fr.downloadLabel, "Télécharger la base complète (.zip)");
assert.equal(NoxCoreDevArticle.en.downloadLabel, "Download the complete starter (.zip)");
assert.equal(NoxCoreDevConfig.commands.includes(".hello"), true);
assert.equal(NoxCoreDevArticle.fr.sections[4].paragraphs.join(" ").includes(".hello"), true);
assert.equal(NoxCoreDevArticle.en.sections[4].paragraphs.join(" ").includes(".hello"), true);
assert.deepEqual(NoxCoreDevConfig.newsletterJids, [
  "120363434925681370@newsletter",
  "120363428923746817@newsletter",
]);
assert.equal(NoxCoreDevConfig.ownerNumber, "OWNER_NUMBER");

const NoxCoreDevSourceFiles = {
  package: "examples/NoxWaFreeBot/package.json",
  config: "examples/NoxWaFreeBot/config.js",
  index: "examples/NoxWaFreeBot/index.js",
  handler: "examples/NoxWaFreeBot/handler.js",
  commands: "examples/NoxWaFreeBot/commands.js",
  newsletters: "examples/NoxWaFreeBot/newsletters.js",
  groups: "examples/NoxWaFreeBot/group-events.js",
  readme: "examples/NoxWaFreeBot/README.md",
  ignore: "examples/NoxWaFreeBot/.gitignore",
  mockTest: "examples/NoxWaFreeBot/scripts/mock-test.mjs",
};

const NoxCoreDevArticleBlocks = new Map();
for (const NoxCoreDevSection of NoxCoreDevArticle.fr.sections) {
  for (const NoxCoreDevBlock of NoxCoreDevSection.codeBlocks || []) {
    NoxCoreDevArticleBlocks.set(NoxCoreDevBlock.label, NoxCoreDevBlock.code);
  }
}

for (const [NoxCoreDevId, NoxCoreDevSourcePath] of Object.entries(NoxCoreDevSourceFiles)) {
  const NoxCoreDevSource = await readFile(path.join(NoxCoreDevRoot, NoxCoreDevSourcePath), "utf8");
  assert.equal(NoxCoreDevCode[NoxCoreDevId].code, NoxCoreDevSource, "Generated article code must match " + NoxCoreDevSourcePath);
  if (NoxCoreDevArticleBlocks.has(NoxCoreDevCode[NoxCoreDevId].label)) {
    assert.equal(NoxCoreDevArticleBlocks.get(NoxCoreDevCode[NoxCoreDevId].label), NoxCoreDevSource);
  }
}

const NoxCoreDevFunctionFiles = [
  "examples/NoxWaFreeBot/index.js",
  "examples/NoxWaFreeBot/handler.js",
  "examples/NoxWaFreeBot/commands.js",
  "examples/NoxWaFreeBot/newsletters.js",
  "examples/NoxWaFreeBot/group-events.js",
  "examples/NoxWaFreeBot/scripts/mock-test.mjs",
];
const NoxCoreDevBrandedFunctionNames = new Set(["NoxCoreDevOwnerCommand", "NoxCoreDevIsOwner"]);
const NoxCoreDevFoundBrandedFunctionNames = new Set();
const NoxCoreDevFunctionPattern = /\b(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/g;
for (const NoxCoreDevFunctionFile of NoxCoreDevFunctionFiles) {
  const NoxCoreDevFunctionSource = await readFile(path.join(NoxCoreDevRoot, NoxCoreDevFunctionFile), "utf8");
  for (const NoxCoreDevMatch of NoxCoreDevFunctionSource.matchAll(NoxCoreDevFunctionPattern)) {
    if (NoxCoreDevMatch[1].startsWith("NoxCoreDev")) {
      assert.equal(NoxCoreDevBrandedFunctionNames.has(NoxCoreDevMatch[1]), true, "Only owner-related functions use the NoxCoreDev prefix: " + NoxCoreDevMatch[1]);
      NoxCoreDevFoundBrandedFunctionNames.add(NoxCoreDevMatch[1]);
    }
  }
}
assert.deepEqual([...NoxCoreDevFoundBrandedFunctionNames].sort(), [...NoxCoreDevBrandedFunctionNames].sort());

const NoxCoreDevArticlePageSource = await readFile(path.join(NoxCoreDevRoot, "src/pages/Article.jsx"), "utf8");
const NoxCoreDevDownloadButtonIndex = NoxCoreDevArticlePageSource.indexOf("{article.downloadUrl && (");
const NoxCoreDevTakeawaysIndex = NoxCoreDevArticlePageSource.indexOf('{t("blog.takeaways")}');
const NoxCoreDevAuthorIndex = NoxCoreDevArticlePageSource.indexOf('{t("blog.authorLabel")}');
const NoxCoreDevArticleEndIndex = NoxCoreDevArticlePageSource.indexOf("</article>");
assert.equal(NoxCoreDevArticlePageSource.includes("{localized.intro && ("), true);
assert.equal(NoxCoreDevDownloadButtonIndex > NoxCoreDevTakeawaysIndex, true);
assert.equal(NoxCoreDevDownloadButtonIndex > NoxCoreDevAuthorIndex, true);
assert.equal(NoxCoreDevDownloadButtonIndex < NoxCoreDevArticleEndIndex, true);

const NoxCoreDevArticleText = JSON.stringify(NoxCoreDevArticle.fr) + JSON.stringify(NoxCoreDevArticle.en);
assert.equal(NoxCoreDevArticleText.includes("Create Your Own WhatsApp Bot – Complete 2025 Guide"), false);
assert.equal(NoxCoreDevArticleText.includes("120363434925681370@newsletter"), true);
assert.equal(NoxCoreDevArticleText.includes("120363428923746817@newsletter"), true);

process.stdout.write("NoxWaFreeBot article wiring verified: no intro paragraph, end-positioned bilingual ZIP button, source blocks, central placeholder config, allow-listed JIDs, and slug.\n");
