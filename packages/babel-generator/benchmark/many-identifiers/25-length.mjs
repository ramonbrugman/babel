import Benchmark from "benchmark";
import baseline from "@babel-baseline/generator";
import current from "../../lib/index.js";
import parser from "@babel/parser";
import { report } from "../util.mjs";

const suite = new Benchmark.Suite();

function createInput(length) {
  return parser.parse("parseMaybeImportAssertion;".repeat(length));
}

function benchCases(name, implementation, options) {
  for (const length of [256, 512, 1024, 2048]) {
    const input = createInput(length);
    suite.add(`${name} ${length} 25-length identifiers`, () => {
      implementation(input, options);
    });
  }
}

benchCases("baseline", baseline.default);
benchCases("current", current.default);

suite.on("cycle", report).run();
