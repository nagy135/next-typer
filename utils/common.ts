import { faker } from "@faker-js/faker";

export const generateText = (sentences: number): string => {
  let result = "";

  for (let i = 0; i < sentences; i++) {
    result += " " + faker.hacker.phrase().replace(/!$/, ".");
  }
  return result.trim();
};

/**
 * python-like iterator with configurable step
 * https://docs.python.org/3/library/functions.html#func-range
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export function* range(...args: number[]) {
  let start = 0;
  let end = 10;
  let step = 1;
  if (args.length === 1) {
    end = args[0];
  } else if (args.length === 2) {
    start = args[0];
    end = args[1];
  } else if (args.length === 3) {
    start = args[0];
    end = args[1];
    step = args[2];
  } else throw new Error("too many arguments");

  let iterationCount = 0;
  for (let i = start; i < end; i += step) {
    iterationCount++;
    yield i;
  }
  return iterationCount;
}
