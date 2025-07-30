# Looking for the shortest path for the knight
This is a project that uses BFS to find the shortest path in a 
graph (similar to a binary search tree), where a knight in a chess board 
is going from one location on the board to another. The knightMoves() function 
will take in 2 locations as parameters, the start location and the end location and 
the algorithm will use BFS to output all of the locations it took to end at that end location.

# notes:
    - standard chess board going from indices 0 to 7 on both dimensions
    - we are using the knight (the little horse) which can only go forward 2 spaces and one space left or right or 
    vice versa, go one space to the left or right then forward or backward 2 spaces.
    - make sure when implementing BFS to SAVE the nodes/spaces the knight has already visited to prevent loops and to 
    make sure that the knight can go to a different node.
    - BFS is actually a common algorithm to find the shortest path since it goes by level evenly until it finds the thing it 
    wants (in our case, the end location).
    - making a GUI for the chess board is NOT required. 
    - graphs are mainly a concept, but in this case, I do not need to make a literal graph object/data structure with verticies and 
    edges. 
