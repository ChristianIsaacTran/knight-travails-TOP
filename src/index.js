/* eslint-disable no-magic-numbers */
import "./style.css";
import knight from "./factories/knight.js";

const newKnight = knight();

newKnight.knightMoves([0,0], [3,3]);
