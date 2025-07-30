/* eslint-disable no-magic-numbers */
import vertex from "./vertex.js";

export default function knight() {
    let queue = [];
    const visitedVertices = [];
    /*
    returns the path to get to the endPos from startPos through edges ex: [0, 1]
    - will be limited to a standard chess board from 0 to 7 in both dimensions (an 8x8 standard chess board)
    - knight will be limited to move like a standard knight: 2 spaces and 1 space either left or right
    - this will be using the BFS logic from last lessons, but used on a graph instead of a BST. It should work the same way.
    */
    function knightMoves(startPos, endPos) {
        console.log(`start position: ${startPos}`);
        console.log(`start position: ${endPos}`);

        // make a new vertex object for the start position and find the first possible moves
        const startVertex = vertex(startPos);
        let endVertex;

        // enqueue all of the possible moves knight can move from first position to start
        findAllPossibleMoves(startVertex);

        // loop through queue and get ALL possible moves until we reach the end position.
        while (queue.length > 0) {
            // dequeue position, mark as visited
            const currentVertex = queue.shift();

            // if the destination has been reached, stop the traversal
            if (
                currentVertex.vertexValue[0] === endPos[0] &&
                currentVertex.vertexValue[1] === endPos[1]
            ) {
                endVertex = currentVertex;
                break;
            }

            // enqueue all possible next steps from current position
            findAllPossibleMoves(currentVertex);
        }

        // loop through until we reach the end steps by pushing the parent vertex. We are looping from the end to the beginning so reverse the array after getting all steps
        let stepArr = [];
        let currStepVertex = endVertex;
        while (currStepVertex !== null) {
            // push step into step array to be reversed later
            stepArr.push(currStepVertex.vertexValue);

            // move onto the previous step from the current vertex's parent step
            currStepVertex = currStepVertex.parentVertex;

            // keep going until we reach null (beginning step)
        }

        // reverse the list since we iterated from the end to the start
        stepArr = stepArr.reverse();

        // finally, iterate through the step array now that it is in order and console.log the shortest path
        console.log("SHORTEST PATH TO END GOAL: ------");
        let stepCounter = 0;
        stepArr.forEach((step) => {
            console.log(step);
            stepCounter += 1;
        });

        console.log(`You made it in ${stepCounter} moves!`);
    }

    // given a position, calculate the possible moves that don't violate the 0-7 index board and enqueue them if they HAVEN'T been visited
    function findAllPossibleMoves(givenVertex) {
        // add the givenVertex to the visited list since that is our current vertex we are visiting
        visitedVertices.push(givenVertex);

        let tempArr = [];
        // 8 possible moves a knight can make from givenPos. If they go out of bounds, do NOT enqueue them
        // 2 spaces up, one space to the left
        const upLeft = vertex([
            givenVertex.vertexValue[0] - 1,
            givenVertex.vertexValue[1] + 2,
        ]);
        const upRight = vertex([
            givenVertex.vertexValue[0] + 1,
            givenVertex.vertexValue[1] + 2,
        ]);
        const leftUp = vertex([
            givenVertex.vertexValue[0] - 2,
            givenVertex.vertexValue[1] + 1,
        ]);
        const leftDown = vertex([
            givenVertex.vertexValue[0] - 2,
            givenVertex.vertexValue[1] - 1,
        ]);
        const rightUp = vertex([
            givenVertex.vertexValue[0] + 2,
            givenVertex.vertexValue[1] + 1,
        ]);
        const rightDown = vertex([
            givenVertex.vertexValue[0] + 2,
            givenVertex.vertexValue[1] - 1,
        ]);
        const downLeft = vertex([
            givenVertex.vertexValue[0] - 1,
            givenVertex.vertexValue[1] - 2,
        ]);
        const downRight = vertex([
            givenVertex.vertexValue[0] + 1,
            givenVertex.vertexValue[1] - 2,
        ]);

        // track the next move's previous step (which is the given node that was generating these new steps)
        upLeft.parentVertex = givenVertex;
        upRight.parentVertex = givenVertex;
        leftUp.parentVertex = givenVertex;
        leftDown.parentVertex = givenVertex;
        rightUp.parentVertex = givenVertex;
        rightDown.parentVertex = givenVertex;
        downLeft.parentVertex = givenVertex;
        downRight.parentVertex = givenVertex;

        // push to array to iterate through
        tempArr.push(upLeft);
        tempArr.push(upRight);
        tempArr.push(leftUp);
        tempArr.push(leftDown);
        tempArr.push(rightUp);
        tempArr.push(rightDown);
        tempArr.push(downLeft);
        tempArr.push(downRight);

        // filter any positions that are out of bounds, or have already been visited before
        tempArr = tempArr.filter((currentVertex) => {
            const positionX = currentVertex.vertexValue[0];
            const positionY = currentVertex.vertexValue[1];

            // check if the current vertex has been visited based on if they are inside visitedVertex array
            if (
                visitedVertices.some((visitedVertex) => {
                    if (
                        visitedVertex.vertexValue[0] === positionX &&
                        visitedVertex.vertexValue[1] === positionY
                    ) {
                        return true;
                    }
                })
            ) {
                return false;
            }

            // check if either position in ANY possible direction is out of bounds of the chessboard
            if (positionX > 7 || positionX < 0) {
                return false;
            }
            if (positionY > 7 || positionY < 0) {
                return false;
            }

            return true;
        });

        // enqueue all of the valid positions into queue
        queue = queue.concat(tempArr);
    }

    return { knightMoves, findAllPossibleMoves };
}
