/* Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
In game 1, three sets of cubes are revealed from the bag (and then put back again). 
The first set is 3 blue cubes and 4 red cubes; the second set is 1 red cube, 2 green cubes, and 6 blue cubes; 
the third set is only 2 green cubes.

The Elf would first like to know which games would have been possible if the bag contained only 12 red cubes, 
13 green cubes, and 14 blue cubes?

In the example above, games 1, 2, and 5 would have been possible 
if the bag had been loaded with that configuration. However, game 3 would have been 
impossible because at one point the Elf showed you 20 red cubes at once; similarly, 
game 4 would also have been impossible because the Elf showed you 15 blue cubes at once. 
If you add up the IDs of the games that would have been possible, you get 8. */

import fs from "fs";

function readFile(filePath: string): string[] {
  const lines: string[] = fs.readFileSync(filePath, "utf-8").split("\n");
  return lines;
}

const input = readFile("./input.txt");

const example = [
  "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
  "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
  "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
  "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
  "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
];

type ColorMap = { [key: string]: number };

const exampleSolution = 8;
const cubes: ColorMap = {
  red: 12,
  green: 13,
  blue: 14,
};

function totalIds(gamesPlayed: string[]) {
  let result = 0;

  for (const game of gamesPlayed) {
    let pass = true;
    const halves = game.split(":");
    let id = halves[0].split(" ").at(-1);
    const sets = halves.at(-1)?.split(";");
    if (!sets) {
      return;
    }

    for (const set of sets) {
      const colorMap: ColorMap = {
        blue: 0,
        red: 0,
        green: 0,
      };

      let cubesInSet = set.trim().split(",");
      const numbers: RegExpMatchArray | null = set.match(/\d+/g);
      const pattern: RegExp = /\bred\b|\bblue\b|\bgreen\b/g;
      const colors: RegExpMatchArray | null = set.match(pattern);
      //console.log(colors);
      //console.log(numbers);
      if (numbers?.length && colors) {
        for (let i = 0; i < numbers?.length; i++) {
          colorMap[colors[i]] += parseInt(numbers[i]);
        }
      }
      pass = areValuesNotGreaterThan(cubes, colorMap);
      if (!pass) {
        //console.log(colorMap);
        break;
      }
    }
    if (pass) {
      result += parseInt(id as string);
    }
  }
  //console.log(result);
}

function areValuesNotGreaterThan(cubes: ColorMap, colorMap: ColorMap): boolean {
  for (const key in colorMap) {
    if (colorMap.hasOwnProperty(key) && cubes.hasOwnProperty(key)) {
      if (colorMap[key] > cubes[key]) {
        return false;
      }
    }
  }
  return true;
}

function totalIdsPart2(gamesPlayed: string[]) {
  let result = 0;

  for (const game of gamesPlayed) {
    let power = 0;
    const halves = game.split(":");
    const sets = halves.at(-1)?.split(";");
    if (!sets) {
      return;
    }
    const colorMapGame: ColorMap = {
      blue: 0,
      red: 0,
      green: 0,
    };

    for (const set of sets) {
      const colorMapSet: ColorMap = {
        blue: 0,
        red: 0,
        green: 0,
      };
      let cubesInSet = set.trim().split(",");
      const numbers: RegExpMatchArray | null = set.match(/\d+/g);
      const pattern: RegExp = /\bred\b|\bblue\b|\bgreen\b/g;
      const colors: RegExpMatchArray | null = set.match(pattern);
      //console.log(colors);
      //console.log(numbers);
      if (numbers?.length && colors) {
        for (let i = 0; i < numbers?.length; i++) {
          colorMapSet[colors[i]] += parseInt(numbers[i]);
          if (colorMapSet[colors[i]] > colorMapGame[colors[i]]) {
            colorMapGame[colors[i]] = colorMapSet[colors[i]];
          }
          // I need to check if colorMapSet[blue] is bigger than colorMapGame[blue]
          // If it set then it should be set as colorMapGameBlue as well
        }
      }
    }
    power = Object.values(colorMapGame).reduce((acc, count) => {
      return acc * count;
    }, 1);
    //console.log(power)
    result += power;
  }
  console.log(result);
}

totalIdsPart2(input);
