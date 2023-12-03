import fs from "fs";

function readFile(filePath: string): string[] {
  const lines: string[] = fs.readFileSync(filePath, "utf-8").split("\n");
  return lines;
}

const input = readFile("./input.txt");

const example = [
  "467..114..",
  "...*......",
  "..35..633.",
  "......#...",
  "617*......",
  ".....+.58.",
  "..592.....",
  "......755.",
  "...$.*....",
  ".664.598..",
];

const symbolPattern = /[^0-9.\s]/g; // Matches symbols (excluding numbers, dots, and whitespace)
const digitPattern = /\d/g;
const integerPattern = /\b\d+\b/g;

function addWholeNumbers(lines: string[]) {
  const inputLength = lines.length;
  let total = 0;

  for (let i = 0; i < inputLength; i++) {
    const lineLength = lines[i].length;
    const numbersInLine = Array.from(lines[i].matchAll(integerPattern));

    numbersInLine.forEach((match) => {
      const number = match[0];
      const index = match.index;
      let shouldAddNumber = false;
      if (typeof index === "number") {
        for (let j = index; j < index + number.length && j < lineLength; j++) {
          // Check symbols in top, current, and bottom rows around each character
          for (let k = -1; k <= 1; k++) {
            // -1, 0, 1 for left, current, right positions
            if (
              // Top row
              (i > 0 &&
                j + k >= 0 &&
                j + k < lineLength &&
                symbolPattern.test(lines[i - 1][j + k])) ||
              // Current row (excluding the digit itself)
              (k !== 0 &&
                j + k >= 0 &&
                j + k < lineLength &&
                symbolPattern.test(lines[i][j + k])) ||
              // Bottom row
              (i < inputLength - 1 &&
                j + k >= 0 &&
                j + k < lineLength &&
                symbolPattern.test(lines[i + 1][j + k]))
            ) {
              shouldAddNumber = true;
              break;
            }
          }

          if (shouldAddNumber) {
            break;
          }
        }
      }

      if (shouldAddNumber) {
        total += parseInt(number);
      }
    });
  }

  return total;
}

// With example the result should be 4361
// Only 2 numbers with no symbols adjacent are 114 and 58

console.log(addWholeNumbers(input));
