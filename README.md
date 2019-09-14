# LogiCoach
LogiCoach is (going to be) software for practicing propositional logic proofs. The idea is that it shows the user two propositions and asks them to prove or disprove that one implies the other. The user does this by applying _tactics_ (e.g. removing double negations) to one proposition to either transform it into the other or obtain a contradiction.

LogiCoach is written in [TypeScript](https://www.typescriptlang.org/) and is inspired by the [Coq](https://coq.inria.fr/) proof management system.

## Getting started
Ensure you have [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/) installed, then
  1. download a copy of LogiCoach: `git clone https://github.com/simon-andrews/logicoach`, then
  2. change your working directory to LogiCoach folder: `cd logicoach`, then
  3. install LogiCoach's dependencies: `yarn install`, then
  4. build: `yarn build`, then
  5. visit the site: `yarn serve` then navigate to [localhost:8080](http://localhost:8080/) in your browser.

## To-do list
* Showing answers
  * Give the user the list of tactics used upon request
  * Maybe a "hint" feature that shows the next tactic they ought to use without showing the whole list?
* Better problem generation
  * Premises and conclusions often look very similar
  * Possible (but unlikely) that they'll be exactly the same
  * Often long and ugly
* More add more tactics
* Add disproving stuff
* Prove equivalences
* Show truth tables maybe for something?
* Better UI/UX
  * Make the website pretty
  * Maybe 
* Add a hypothesis box like Coq for storing multiple sub-propositions for super duper extra fancy proving
  * Some tactics (separation) yield multiple sub-propositions, this would be a way to handle that.