import { getRandomProp } from "./problem_generation";
import { compareProps } from "./propositions";
import { tactics, applyTactic } from "./tactics";
import { propToString, propToLatex } from "./uiux";

module.exports = {
  applyTactic: applyTactic,
  compareProps: compareProps,
  getRandomProp: getRandomProp,
  propToLatex: propToLatex,
  propToString: propToString,
  tactics: tactics,
};
