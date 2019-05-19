import { Prop, BinOp, UnOp, bin, un, compareProps } from "./propositions";
import { and, not, or } from "./propositions";

// A tactic is a function that takes a proposition and applies some
// transformation to it, resulting in new propositions. Tactic functions
// generally have the form:
//
// function myTactic(p: Prop): Prop[] {
//   if ( /* check tactic's preconditions here */ ) {
//     return [ /* new propositions  */ ];
//   }
//   throw 'no good'; // fail when tactic can't be applied
// }
export type Tactic = (_: Prop) => Prop[];

// For every sub-proposition in p, try applying the tactic to it. If the tactic
// fails, don't change anything.
export function applyTactic(p: Prop, tactic: Tactic): Prop[] {
  try {
    return tactic(p);
  }
  catch (_) {
    return [p];
  }
}

// tactic: removes double negations from a proposition
// ¬¬P ↔ P
export function doubleNegation(p: Prop): Prop[] {
  if (p.tag === "un" && p.op === UnOp.Not && p.p.tag === "un" && p.p.op === UnOp.Not) {
    return [p.p.p];
  }
  throw 'no good';
}


// tactic: De Morgan And-to-Or
// ¬(P ∨ Q) ↔ ¬P ∧ ¬Q
// ¬(P ∧ Q) ↔ ¬P ∨ ¬Q
export function deMorganAndToOr(p: Prop): Prop[] {
  if (p.tag === "bin" && p.op === BinOp.And) {
    return [not(or(p.lhs, p.rhs))];
  }
  else if (p.tag === "un" && p.op === UnOp.Not && p.p.tag === "bin" && p.p.op === BinOp.And) {
    return [or(not(p.p.lhs), not(p.p.rhs))];
  }
  throw 'no good';
}

// tactic: De Morgan Or-to-And
// ¬(P ∨ Q) ↔ ¬P ∧ ¬Q
// ¬(P ∧ Q) ↔ ¬P ∨ ¬Q
export function deMorganOrToAnd(p: Prop): Prop[] {
  if (p.tag === "bin" && p.op === BinOp.Or) {
    return [not(and(p.lhs, p.rhs))];
  }
  else if (p.tag === "un" && p.op === UnOp.Not && p.p.tag === "bin" && p.p.op === BinOp.Or) {
    return [and(not(p.p.lhs), not(p.p.rhs))];
  }
  throw 'no good';
}

export function leftSeparation(p: Prop): Prop[] {
  if (p.tag === "bin" && p.op === BinOp.And) {
    return [p.lhs];
  }
  throw 'no good';
}

export function rightSeparation(p: Prop): Prop[] {
  if (p.tag === "bin" && p.op === BinOp.And) {
    return [p.rhs];
  }
  throw 'no good';
}

export function separation(p: Prop): Prop[] {
  if (p.tag === "bin" && p.op === BinOp.And) {
    return [p.lhs, p.rhs];
  }
  throw 'no good';
}

// Modus Ponens
// P /\ (P -> Q) -> Q
export function modusPonens(p: Prop): Prop[] {
  if (p.tag === "bin" && p.op === BinOp.And && p.rhs.tag === "bin" && p.rhs.op === BinOp.Impl && compareProps(p.lhs, p.rhs.lhs)) {
    return [p.rhs.rhs];
  }
  throw 'no good';
}

// Modus Tollens
// (P -> Q) /\ ~Q -> ~P
export function modusTollens(p: Prop): Prop[] {
  if (p.tag === "bin" && p.op === BinOp.And && p.lhs.tag === "bin" && p.lhs.op === BinOp.Impl && p.rhs.tag === "un" && p.rhs.op === UnOp.Not && compareProps(p.lhs.rhs, p.rhs.p)) {
    return [not(p.lhs.lhs)];
  }
  throw 'no good';
}

const tactics:{ [index:string] : Tactic } = {
  deMorganAndToOr: deMorganAndToOr,
  deMorganOrToAnd: deMorganOrToAnd,
  doubleNegation: doubleNegation,
  leftSeparation: leftSeparation,
  modusPonens: modusPonens,
  modusTollens: modusTollens,
  rightSeparation: rightSeparation,
  separation: separation,
};
export { tactics };

// https://stackoverflow.com/a/15106541
export function getRandomTactic(): Tactic {
  let keys = Object.keys(tactics);
  return tactics[keys[keys.length * Math.random() << 0]];
}
