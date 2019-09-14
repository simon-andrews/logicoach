var logicoach =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar problem_generation_1 = __webpack_require__(/*! ./problem_generation */ \"./src/problem_generation.ts\");\nvar uiux_1 = __webpack_require__(/*! ./uiux */ \"./src/uiux.ts\");\nfunction updateProblem() {\n    var problem = problem_generation_1.generateProblem();\n    var P = uiux_1.propToString(problem.premise);\n    var C = uiux_1.propToString(problem.conclusion);\n    var Pspan = document.getElementById(\"premise\");\n    var Cspan = document.getElementById(\"conclusion\");\n    if (Pspan !== null && Cspan !== null) {\n        Pspan.innerHTML = P;\n        Cspan.innerHTML = C;\n    }\n    else {\n        alert(\"could not find spans for premise /\\\\ conclusion!\");\n    }\n}\nmodule.exports = {\n    updateProblem: updateProblem,\n};\n\n\n//# sourceURL=webpack://logicoach/./src/main.ts?");

/***/ }),

/***/ "./src/problem_generation.ts":
/*!***********************************!*\
  !*** ./src/problem_generation.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar propositions_1 = __webpack_require__(/*! ./propositions */ \"./src/propositions.ts\");\nvar propositions_2 = __webpack_require__(/*! ./propositions */ \"./src/propositions.ts\");\nvar tactics_1 = __webpack_require__(/*! ./tactics */ \"./src/tactics.ts\");\nfunction randChoice(a) {\n    return a[Math.floor(Math.random() * a.length)];\n}\nfunction getRandomProp(depth) {\n    if (depth === void 0) { depth = 0; }\n    if (depth > 2 || (depth > 1 && Math.random() < 1 / 3)) {\n        return propositions_1.lit(randChoice(['P', 'Q', 'R']));\n    }\n    else {\n        var p_1 = function () { return getRandomProp(depth + 1); };\n        var q_1 = p_1;\n        var branches = [\n            function () { return propositions_2.eqv(p_1(), q_1()); },\n            function () { return propositions_2.impl(p_1(), q_1()); },\n            function () { return propositions_2.not(p_1()); },\n            function () { return propositions_2.and(p_1(), q_1()); },\n            function () { return propositions_2.or(p_1(), q_1()); },\n            // () => not(not(p())), // double negation (leads to messy results)\n            function () { return propositions_2.not(propositions_2.and(p_1(), q_1())); },\n            function () { return propositions_2.not(propositions_2.or(p_1(), q_1())); },\n            function () { return propositions_2.and(propositions_2.not(p_1()), propositions_2.not(q_1())); },\n            function () { return propositions_2.or(propositions_2.not(p_1()), propositions_2.not(q_1())); },\n        ];\n        return randChoice(branches)();\n    }\n}\nexports.getRandomProp = getRandomProp;\nfunction generateProblem(difficulty) {\n    if (difficulty === void 0) { difficulty = 3; }\n    while (true) {\n        var P = getRandomProp();\n        var Q = P;\n        var changes = 0;\n        var start = Date.now();\n        while (changes < difficulty && Date.now() - start < 100) {\n            var tactic = tactics_1.getRandomTactic();\n            var transformed = tactics_1.applyTactic(Q, tactic)[0];\n            if (!propositions_1.propsEqual(Q, transformed)) {\n                Q = transformed;\n                ++changes;\n            }\n        }\n        if (changes === difficulty) {\n            return {\n                premise: P,\n                conclusion: Q,\n            };\n        }\n    }\n}\nexports.generateProblem = generateProblem;\n\n\n//# sourceURL=webpack://logicoach/./src/problem_generation.ts?");

/***/ }),

/***/ "./src/propositions.ts":
/*!*****************************!*\
  !*** ./src/propositions.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n// Unary operators\nvar UnOp;\n(function (UnOp) {\n    UnOp[\"Not\"] = \"not\";\n})(UnOp = exports.UnOp || (exports.UnOp = {}));\n// Binary operators\nvar BinOp;\n(function (BinOp) {\n    BinOp[\"And\"] = \"and\";\n    BinOp[\"Eqv\"] = \"eqv\";\n    BinOp[\"Impl\"] = \"impl\";\n    BinOp[\"Or\"] = \"or\";\n    BinOp[\"Xor\"] = \"xor\";\n})(BinOp = exports.BinOp || (exports.BinOp = {}));\n// Some convenience functions\nfunction lit(name) {\n    return { tag: \"lit\", name: name };\n}\nexports.lit = lit;\nfunction bin(op, lhs, rhs) {\n    return { tag: \"bin\", op: op, lhs: lhs, rhs: rhs };\n}\nexports.bin = bin;\nexports.and = function (lhs, rhs) { return bin(BinOp.And, lhs, rhs); };\nexports.eqv = function (lhs, rhs) { return bin(BinOp.Eqv, lhs, rhs); };\nexports.impl = function (lhs, rhs) { return bin(BinOp.Impl, lhs, rhs); };\nexports.or = function (lhs, rhs) { return bin(BinOp.Or, lhs, rhs); };\nexports.xor = function (lhs, rhs) { return bin(BinOp.Xor, lhs, rhs); };\nfunction un(op, p) {\n    return { tag: \"un\", op: op, p: p };\n}\nexports.un = un;\nexports.not = function (p) { return un(UnOp.Not, p); };\n// checks if two proposition objects are strictly equal. This means that\n// P and Q !== Q and P, even though they're equivalent.\nfunction propsEqual(p1, p2) {\n    // it's awkward, but it makes the type checker happy so :\\\n    if (p1.tag === \"lit\" && p2.tag === \"lit\") {\n        return p1.name === p2.name;\n    }\n    else if (p1.tag === \"bin\" && p2.tag === \"bin\") {\n        return p1.op === p2.op\n            && propsEqual(p1.lhs, p2.lhs)\n            && propsEqual(p1.rhs, p2.rhs);\n    }\n    else if (p1.tag === \"un\" && p2.tag === \"un\") {\n        return p1.op === p2.op && propsEqual(p1.p, p2.p);\n    }\n    else {\n        return false;\n    }\n}\nexports.propsEqual = propsEqual;\n\n\n//# sourceURL=webpack://logicoach/./src/propositions.ts?");

/***/ }),

/***/ "./src/tactics.ts":
/*!************************!*\
  !*** ./src/tactics.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar propositions_1 = __webpack_require__(/*! ./propositions */ \"./src/propositions.ts\");\nvar propositions_2 = __webpack_require__(/*! ./propositions */ \"./src/propositions.ts\");\n// For every sub-proposition in p, try applying the tactic to it. If the tactic\n// fails, don't change anything.\nfunction applyTactic(p, tactic) {\n    try {\n        return tactic(p);\n    }\n    catch (_) {\n        return [p];\n    }\n}\nexports.applyTactic = applyTactic;\n// tactic: removes double negations from a proposition\n// ¬¬P ↔ P\nfunction doubleNegation(p) {\n    if (p.tag === \"un\" && p.op === propositions_1.UnOp.Not && p.p.tag === \"un\" && p.p.op === propositions_1.UnOp.Not) {\n        return [p.p.p];\n    }\n    throw 'no good';\n}\nexports.doubleNegation = doubleNegation;\n// tactic: De Morgan And-to-Or\n// ¬(P ∨ Q) ↔ ¬P ∧ ¬Q\n// ¬(P ∧ Q) ↔ ¬P ∨ ¬Q\nfunction deMorganAndToOr(p) {\n    if (p.tag === \"bin\" && p.op === propositions_1.BinOp.And) {\n        return [propositions_2.not(propositions_2.or(p.lhs, p.rhs))];\n    }\n    else if (p.tag === \"un\" && p.op === propositions_1.UnOp.Not && p.p.tag === \"bin\" && p.p.op === propositions_1.BinOp.And) {\n        return [propositions_2.or(propositions_2.not(p.p.lhs), propositions_2.not(p.p.rhs))];\n    }\n    throw 'no good';\n}\nexports.deMorganAndToOr = deMorganAndToOr;\n// tactic: De Morgan Or-to-And\n// ¬(P ∨ Q) ↔ ¬P ∧ ¬Q\n// ¬(P ∧ Q) ↔ ¬P ∨ ¬Q\nfunction deMorganOrToAnd(p) {\n    if (p.tag === \"bin\" && p.op === propositions_1.BinOp.Or) {\n        return [propositions_2.not(propositions_2.and(p.lhs, p.rhs))];\n    }\n    else if (p.tag === \"un\" && p.op === propositions_1.UnOp.Not && p.p.tag === \"bin\" && p.p.op === propositions_1.BinOp.Or) {\n        return [propositions_2.and(propositions_2.not(p.p.lhs), propositions_2.not(p.p.rhs))];\n    }\n    throw 'no good';\n}\nexports.deMorganOrToAnd = deMorganOrToAnd;\nfunction leftSeparation(p) {\n    if (p.tag === \"bin\" && p.op === propositions_1.BinOp.And) {\n        return [p.lhs];\n    }\n    throw 'no good';\n}\nexports.leftSeparation = leftSeparation;\nfunction rightSeparation(p) {\n    if (p.tag === \"bin\" && p.op === propositions_1.BinOp.And) {\n        return [p.rhs];\n    }\n    throw 'no good';\n}\nexports.rightSeparation = rightSeparation;\nfunction separation(p) {\n    if (p.tag === \"bin\" && p.op === propositions_1.BinOp.And) {\n        return [p.lhs, p.rhs];\n    }\n    throw 'no good';\n}\nexports.separation = separation;\n// Modus Ponens\n// P /\\ (P -> Q) -> Q\nfunction modusPonens(p) {\n    if (p.tag === \"bin\" && p.op === propositions_1.BinOp.And && p.rhs.tag === \"bin\" && p.rhs.op === propositions_1.BinOp.Impl && propositions_1.propsEqual(p.lhs, p.rhs.lhs)) {\n        return [p.rhs.rhs];\n    }\n    throw 'no good';\n}\nexports.modusPonens = modusPonens;\n// Modus Tollens\n// (P -> Q) /\\ ~Q -> ~P\nfunction modusTollens(p) {\n    if (p.tag === \"bin\" && p.op === propositions_1.BinOp.And && p.lhs.tag === \"bin\" && p.lhs.op === propositions_1.BinOp.Impl && p.rhs.tag === \"un\" && p.rhs.op === propositions_1.UnOp.Not && propositions_1.propsEqual(p.lhs.rhs, p.rhs.p)) {\n        return [propositions_2.not(p.lhs.lhs)];\n    }\n    throw 'no good';\n}\nexports.modusTollens = modusTollens;\nvar tactics = {\n    deMorganAndToOr: deMorganAndToOr,\n    deMorganOrToAnd: deMorganOrToAnd,\n    doubleNegation: doubleNegation,\n    leftSeparation: leftSeparation,\n    modusPonens: modusPonens,\n    modusTollens: modusTollens,\n    rightSeparation: rightSeparation,\n    separation: separation,\n};\nexports.tactics = tactics;\n// https://stackoverflow.com/a/15106541\nfunction getRandomTactic() {\n    var keys = Object.keys(tactics);\n    return tactics[keys[keys.length * Math.random() << 0]];\n}\nexports.getRandomTactic = getRandomTactic;\n\n\n//# sourceURL=webpack://logicoach/./src/tactics.ts?");

/***/ }),

/***/ "./src/uiux.ts":
/*!*********************!*\
  !*** ./src/uiux.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar propositions_1 = __webpack_require__(/*! ./propositions */ \"./src/propositions.ts\");\nfunction opToSymbol(op) {\n    switch (op) {\n        case propositions_1.BinOp.And: return \"∧\";\n        case propositions_1.BinOp.Eqv: return \"↔\";\n        case propositions_1.BinOp.Impl: return \"→\";\n        case propositions_1.BinOp.Or: return \"∨\";\n        case propositions_1.BinOp.Xor: return \"⊕\";\n        case propositions_1.UnOp.Not: return \"¬\";\n    }\n}\nfunction propToString(p) {\n    switch (p.tag) {\n        case \"lit\":\n            return p.name;\n        case \"bin\":\n            return \"(\" + propToString(p.lhs) + \" \" + opToSymbol(p.op) + \" \" + propToString(p.rhs) + \")\";\n        case \"un\":\n            return opToSymbol(p.op) + propToString(p.p);\n    }\n}\nexports.propToString = propToString;\nfunction opToLatex(op) {\n    switch (op) {\n        case propositions_1.BinOp.And: return \"\\\\wedge\";\n        case propositions_1.BinOp.Eqv: return \"\\\\leftrightarrow\";\n        case propositions_1.BinOp.Impl: return \"\\\\rightarrow\";\n        case propositions_1.BinOp.Or: return \"\\\\vee\";\n        case propositions_1.BinOp.Xor: return \"\\\\oplus\";\n        case propositions_1.UnOp.Not: return \"\\\\neg\";\n    }\n}\nfunction propToLatex(p) {\n    switch (p.tag) {\n        case \"lit\":\n            return p.name;\n        case \"bin\":\n            return \"( \" + propToLatex(p.lhs) + \" \" + opToLatex(p.op) + \" \" + propToLatex(p.rhs) + \" )\";\n        case \"un\":\n            return opToLatex(p.op) + \" \" + propToLatex(p.p);\n    }\n}\nexports.propToLatex = propToLatex;\n\n\n//# sourceURL=webpack://logicoach/./src/uiux.ts?");

/***/ })

/******/ });