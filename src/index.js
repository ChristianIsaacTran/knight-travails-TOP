/* eslint-disable no-magic-numbers */
import "./style.css";
import knight from "./factories/knight.js";

const newKnight1 = knight();

const newKnight2 = knight();

const newKnight3 = knight();

newKnight1.knightMoves([0,0], [3,3]);

newKnight2.knightMoves([3,3], [0,0]);

newKnight3.knightMoves([0,0], [7,7]);
