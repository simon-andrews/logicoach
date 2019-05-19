import { Prop, BinOp, UnOp } from "./propositions";

function opToSymbol(op: BinOp | UnOp): string {
  switch (op) {
    case BinOp.And:  return "∧";
    case BinOp.Eqv:  return "↔";
    case BinOp.Impl: return "→";
    case BinOp.Or:   return "∨";
    case BinOp.Xor:  return "⊕";
    case UnOp.Not:   return "¬";
  }
}

export function propToString(p: Prop): string {
  switch (p.tag) {
    case "lit":
      return p.name;
    case "bin":
      return "(" + propToString(p.lhs) + " " + opToSymbol(p.op) + " " + propToString(p.rhs) + ")";
    case "un":
      return opToSymbol(p.op) + propToString(p.p);
  }
}

function opToLatex(op: BinOp | UnOp): string {
  switch (op) {
    case BinOp.And:  return "\\wedge";
    case BinOp.Eqv:  return "\\leftrightarrow";
    case BinOp.Impl: return "\\rightarrow";
    case BinOp.Or:   return "\\vee";
    case BinOp.Xor:  return "\\oplus";
    case UnOp.Not:   return "\\neg";
  }
}

export function propToLatex(p: Prop): string {
  switch (p.tag) {
    case "lit":
      return p.name;
    case "bin":
      return "( " + propToLatex(p.lhs) + " " + opToLatex(p.op) + " " + propToLatex(p.rhs) + " )";
    case "un":
      return opToLatex(p.op) + " " + propToLatex(p.p);
  }
}
