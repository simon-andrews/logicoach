import { Prop, lit, propsEqual } from "./propositions";
import { and, eqv, impl, not, or, xor } from "./propositions";
import { tactics, applyTactic, getRandomTactic, Tactic } from "./tactics";
import { propToLatex, propToString } from "./uiux";

function randChoice(a: any[]): any {
  return a[Math.floor(Math.random() * a.length)];
}

export function getRandomProp(depth: number = 0): Prop {
  if (depth > 2 || (depth > 1 && Math.random() < 1/3)) {
    return lit(randChoice(['P', 'Q', 'R']));
  }
  else {
    let p = () => getRandomProp(depth+1);
    let q = p;

    let branches = [
      () => eqv(p(), q()),
      () => impl(p(), q()),
      () => not(p()),
      () => and(p(), q()),
      () => or(p(), q()),

      // () => not(not(p())), // double negation (leads to messy results)
      () => not(and(p(), q())), // De Morgan And-to-Or
      () => not(or(p(), q())), // De Morgan Or-to-And
      () => and(not(p()), not(q())), // De Morgan And-to-Or
      () => or(not(p()), not(q())), // De Morgan Or-to-And
    ];
    return randChoice(branches)();
  }
}

export interface Problem {
  premise: Prop,
  conclusion: Prop,
}

export function generateProblem(difficulty: number = 3): Problem {
  while (true) {
    const P: Prop = getRandomProp();
    let Q: Prop = P;

    let changes = 0;
    const start: number = Date.now();
    while (changes < difficulty && Date.now() - start < 100) {
      const tactic: Tactic = getRandomTactic();
      const transformed: Prop = applyTactic(Q, tactic)[0];
      if (!propsEqual(Q, transformed)) {
        Q = transformed;
        ++changes;
      }
    }

    if (changes === difficulty) {
      return {
        premise: P,
        conclusion: Q,
      }
    }
  }
}