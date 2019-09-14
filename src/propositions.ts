// Unary operators
export enum UnOp {
  Not = "not", // ¬P, the opposite of P
}

// Binary operators
export enum BinOp {
  And = "and",   // P ∧ Q, true iff both P and Q are true
  Eqv = "eqv",   // P ↔ Q, P implies Q and Q implies P (or, P and Q are equivalent)
  Impl = "impl", // P → Q, P implies Q
  Or = "or",     // P ∨ Q, true iff either of P or Q is true, or both
  Xor = "xor",   // P ⊕ Q, true iff one of P or Q is true but not both
}

// An """ADT""" for propositions
export type Prop = { tag: "lit", name: string }
                 | { tag: "bin", op: BinOp; lhs: Prop; rhs: Prop }
                 | { tag: "un",  op: UnOp;  p: Prop };

// Some convenience functions
export function lit(name: string): Prop {
  return { tag: "lit", name: name };
}

export function bin(op: BinOp, lhs: Prop, rhs: Prop): Prop {
  return { tag: "bin", op: op, lhs: lhs, rhs: rhs };
}
export let and  = (lhs: Prop, rhs: Prop) => bin(BinOp.And,  lhs, rhs);
export let eqv  = (lhs: Prop, rhs: Prop) => bin(BinOp.Eqv,  lhs, rhs);
export let impl = (lhs: Prop, rhs: Prop) => bin(BinOp.Impl, lhs, rhs);
export let or   = (lhs: Prop, rhs: Prop) => bin(BinOp.Or,   lhs, rhs);
export let xor  = (lhs: Prop, rhs: Prop) => bin(BinOp.Xor,  lhs, rhs);

export function un(op: UnOp, p: Prop): Prop {
  return { tag: "un", op: op, p: p };
}
export let not = (p: Prop) => un(UnOp.Not, p);

// checks if two proposition objects are strictly equal. This means that
// P and Q !== Q and P, even though they're equivalent.
export function propsEqual(p1: Prop, p2: Prop): boolean {
  // it's awkward, but it makes the type checker happy so :\
  if (p1.tag === "lit" && p2.tag === "lit") {
    return p1.name === p2.name;
  }
  else if (p1.tag === "bin" && p2.tag === "bin") {
    return p1.op === p2.op
        && propsEqual(p1.lhs, p2.lhs)
        && propsEqual(p1.rhs, p2.rhs);
  }
  else if (p1.tag === "un" && p2.tag === "un") {
    return p1.op === p2.op && propsEqual(p1.p, p2.p);
  }
  else {
    return false;
  }
}
