import { match } from "assert";
import fs from "fs";
import readline from "readline";

function readFile(filePath: string): string[] {
  const lines: string[] = fs.readFileSync(filePath, "utf-8").split("\n");
  return lines;
}

const input = readFile("./input.txt");

const firstFive = input.slice(0, 5);
// The goal is to check each string, get the first and last number in the string
// We combine these 2 chars to create a string, then add it to the total
// the first string will result in 12, adding it to the total
// if there is only 1 string, then this will be both the first and the last int, returning 77 in the last one
const example = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];

function part1Total(input: string[]) {
  let total = 0;
  input.forEach((line) => {
    const numbers: RegExpMatchArray | null = line.match(/\d+/g);
    if (!numbers) return;

    let numbersArray: string[] = numbers.join("").split("");

    // console.log(`Text: ${line}`);
    // console.log(`numbersArray: ${numbersArray} Length: ${numbersArray?.length}`);
    if (!numbersArray) return;
    let firstNumber: string = numbersArray[0];
    let lastNumber: string = numbersArray[numbersArray.length - 1];
    /* console.log(
    `First number: ${firstNumber} numbers Array array: ${numbersArray} Last number: ${lastNumber}`
  ); */
    const localTotal = `${firstNumber}${lastNumber};`;
    //console.log(`Local total: ${localTotal}`);
    total += parseInt(localTotal);
  });
  return total;
}

// Part 2

//  In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76.
// Adding these together produces 281.
// What is the sum of all of the calibration
type NumString = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0";

const digits: { [key: string]: NumString } = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const exp = /(one|two|three|four|five|six|seven|eight|nine|\d)/g;

/* function containsDigitOrWord(str: string): string[] | null {
  // Create a regex pattern from the keys of the digits object and digits 0-9

  const pattern = new RegExp(exp);

  const allMatches = str.match(pattern);
  if (!allMatches) return null;
  const finalMatches: string[] = [];

  allMatches.forEach((match) => {
    const key = match.toLowerCase() as keyof typeof digits;
    if (digits[key]) {
      finalMatches.push(digits[key]);
    } else {
      finalMatches.push(match);
    }
  });
  //console.log(`Final matches: ${finalMatches} All Matches: ${allMatches}`);
  return finalMatches;
} */
const examplePart2 = [
  "two1nine",
  "eightwothree",
  "abcone2threexyz",
  "xtwone3four",
  "4nineeightseven2",
  "zoneight234",
  "7pqrstsixteen",
];

function part2Total(input: string[]) {
  let totalSum = 0;

  for (let i = 0; i < input.length; i++) {
    const results: string[] = [];
    let match: RegExpExecArray | null;
    exp.lastIndex = 0;

    while ((match = exp.exec(input[i])) !== null) {
      exp.lastIndex -= match[0].length - 1;
      results.push(match[0]);
    }

    const firstDigit = results[0];
    const lastDigit = results.at(-1);

    if (firstDigit && lastDigit) {
      const firstNumber = isNaN(+firstDigit) ? digits[firstDigit] : firstDigit;
      const lastNumber = isNaN(+lastDigit) ? digits[lastDigit] : lastDigit;
      totalSum += parseInt(firstNumber + lastNumber, 10);
    }
  }
}

console.log(part2Total(input));
