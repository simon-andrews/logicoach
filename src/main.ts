import { Problem, generateProblem } from "./problem_generation";
import { propToString } from "./uiux";

function updateProblem() {
  const problem: Problem = generateProblem();
  const P: string = propToString(problem.premise);
  const C: string = propToString(problem.conclusion);
  const Pspan: HTMLElement | null = document.getElementById("premise");
  const Cspan: HTMLElement | null = document.getElementById("conclusion");
  if (Pspan !== null && Cspan !== null) {
    Pspan.innerHTML = P;
    Cspan.innerHTML = C;
  }
  else {
    alert("could not find spans for premise /\\ conclusion!");
  }
}

module.exports = {
  updateProblem: updateProblem,
};
