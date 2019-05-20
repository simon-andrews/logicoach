import { Prop, lit, compareProps } from "./propositions";
import { and, eqv, impl, not, or, xor } from "./propositions";
import { tactics, applyTactic, getRandomTactic } from "./tactics";
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

/*
let P: Prop = getRandomProp();
console.log(propToLatex(P));
console.log(propToString(P));

let Q: Prop = not(not(lit("A")));

while (true) {
  let i = 0;
  while (compareProps(Q, applyTactic(Q, getRandomTactic())[0])) {
    i += 1;
  }
  console.log(i);
}
 */
