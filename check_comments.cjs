const fs = require("fs");
const path = require("path");

function getFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else {
      if (name.endsWith(".ts") || name.endsWith(".tsx")) {
        files.push(name);
      }
    }
  }
  return files;
}

const files = getFiles("src");
console.log("Found " + files.length + " TS/TSX files.");

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split("\r\n").join("\n").split("\n");
  lines.forEach((line, index) => {
    if (line.includes("/// <reference types=\"vite/client\" />")) {
      return;
    }
    
    let hasSingleLineComment = false;
    let idx = line.indexOf("//");
    while (idx !== -1) {
      if (idx > 0 && line[idx - 1] === ":") {
        idx = line.indexOf("//", idx + 2);
        continue;
      }
      hasSingleLineComment = true;
      break;
    }
    
    const hasBlockStart = line.includes("/*");
    const hasBlockEnd = line.includes("*/");
    
    if (hasSingleLineComment || hasBlockStart || hasBlockEnd) {
      console.log("[" + file + ":" + (index + 1) + "]: " + line.trim());
    }
  });
}
