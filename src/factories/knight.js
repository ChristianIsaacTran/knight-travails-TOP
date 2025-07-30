/* eslint-disable no-magic-numbers */
export default function knight() {
    let queue = [];
    const visitedMoves = [];
    /*
    returns the path to get to the endPos from startPos through edges ex: [0, 1]
    - will be limited to a standard chess board from 0 to 7 in both dimensions (an 8x8 standard chess board)
    - knight will be limited to move like a standard knight: 2 spaces and 1 space either left or right
    - this will be using the BFS logic from last lessons, but used on a graph instead of a BST. It should work the same way.
    */
    function knightMoves(startPos, endPos) {
        console.log(`start position: ${startPos}`)
        // enqueue all of the possible moves knight can move from first position to start
        findAllPossibleMoves(startPos);

        while (queue.length > 0) {
            // add dequeued position into visited to mark it as visited
            visitedMoves.push(queue[0]);

            // dequeue position
            const currentPos = queue.shift();

            // if the destination has been reached, stop the traversal
            if (currentPos[0] === endPos[0] && currentPos[1] === endPos[1]) {
                return console.log(`last position: ${currentPos}`);
            }

            // print out current step in the traversal
            console.log(`current position: ${currentPos}`);

            // enqueue all possible next steps from current position
            findAllPossibleMoves(currentPos);

            console.log(queue);
            console.log(visitedMoves);
        }
    }

    // given a position, calculate the possible moves that don't violate the 0-7 index board and enqueue them
    function findAllPossibleMoves(givenPos) {
        let tempArr = [];
        // 8 possible moves a knight can make from givenPos. If they go out of bounds, do NOT enqueue them
        // 2 spaces up, one space to the left
        const upLeft = [givenPos[0] - 1, givenPos[1] + 2];
        const upRight = [givenPos[0] + 1, givenPos[1] + 2];
        const leftUp = [givenPos[0] - 2, givenPos[1] + 1];
        const leftDown = [givenPos[0] - 2, givenPos[1] - 1];
        const rightUp = [givenPos[0] + 2, givenPos[1] + 1];
        const rightDown = [givenPos[0] + 2, givenPos[1] - 1];
        const downLeft = [givenPos[0] - 1, givenPos[1] - 2];
        const downRight = [givenPos[0] + 1, givenPos[1] - 2];

        tempArr.push(upLeft);
        tempArr.push(upRight);
        tempArr.push(leftUp);
        tempArr.push(leftDown);
        tempArr.push(rightUp);
        tempArr.push(rightDown);
        tempArr.push(downLeft);
        tempArr.push(downRight);

        // filter any positions that are out of bounds
        tempArr = tempArr.filter((positionGroup) => {
            const positionX = positionGroup[0];
            const positionY = positionGroup[1];

            // check if the position is already visited, then don't include in the tempArr
            if (
                visitedMoves.some((visitedGroup) => {
                    const visitedX = visitedGroup[0];
                    const visitedY = visitedGroup[1];

                    if (visitedX === positionX && visitedY === positionY) {
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
