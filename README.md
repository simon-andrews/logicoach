# LogiCoach
LogiCoach is (going to be) software for practicing propositional logic proofs. The idea is that it shows the user two propositions and asks them to prove or disprove their equivalence. The user does this by applying _tactics_ (e.g. removing double negations) to one proposition to either transform it into the other or obtain a contradiction.

LogiCoach is written in [TypeScript](https://www.typescriptlang.org/) and is inspired by the [Coq](https://coq.inria.fr/) proof management system.

## Getting started
Ensure you have [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/) installed, then
  1. download a copy of LogiCoach: `git clone https://github.com/simon-andrews/logicoach`, then
  2. change your working directory to LogiCoach folder: `cd logicoach`, then
  3. install LogiCoach's dependencies: `npm install`, then
  4. build: `npm run build`, then
  5. serve the site: `npm run serve`.

## To-do list
* What's to be done?
  * Basically, we have propositions, which look like: (P → ¬Q) ∧ Q (see: https://en.wikipedia.org/wiki/List_of_logic_symbols, propositions.ts)
  * We also have tactics, which allow us to transform propositions into other propositions (applying [Modus tollens](https://en.wikipedia.org/wiki/Modus_tollens) to the above allows us to deduce ¬P (see: tactics.ts)
  * Program will display two propositions, and allow the user to prove or disprove their equivalence.
  * Somehow, we'll need to "chain" sets of tactics together
* Create a mock-up of a nice UI for this thing
  * Is it realistic to make?
  * Does it look nice?
* Create a prototype.
  * Don't worry about this repo or the code in it for now, just build something pretty with HTML + CSS
  * I'll get a demo going Sometime(TM) that shows how to use my logic library (as soon as I figure out Typescript myself lmao)
  * Maybe use [Bootstrap](https://getbootstrap.com/)? (Easier to make something pretty, lots of reusable widgets, will probably be faster to get from 0 to 1)
  * HTML+CSS by hand? (Better learning experience, might give us more fine-grained control of appeareance)
  * Some sort of drag-and-drop setup might be nice, but might also be difficult to program.
  * Could click + and - buttons to add/remove tactics from a list

Simon's super duper vague idea:

```
+---------------------------------------------------+
|  Prove or disprove the equivalence of these props |
|---------------------------------------------------+
|  1: (P → ¬Q) ∧ Q         |        2: ¬P           |
|---------------------------------------------------|
|  Tactics:                                         |
|   * Modus tollens on 1                            |
|                                                   |
|  Result: checks out! good job!                    |
|                                                   |
+---------------------------------------------------+
```
Maybe in the future we can add a hypothesis box like Coq for storing multiple sub-propositions for super duper extra fancy proving, but let's not worry about it for now.
