import fs from "fs";
import readline from "readline";

function readFile(filePath) {
  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  console.log(lines);
  return lines;
}

function main() {
  const input = readFile("./input.txt");
  // /console.log(input);
}

main();
