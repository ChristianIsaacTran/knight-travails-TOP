# Looking for the shortest path for the knight
This is a project that uses BFS to find the shortest path in a 
graph (similar to a binary search tree), where a knight in a chess board 
is going from one location on the board to another. The knightMoves() function 
will take in 2 locations as parameters, the start location and the end location and 
the algorithm will use BFS to output all of the locations it took to end at that end location.

# notes:
    - standard chess board going from indices 0 to 7 on both dimensions (8x8 standard chess board)
    - we are using the knight (the little horse) which can only go forward 2 spaces and one space left or right or 
    vice versa, go one space to the left or right then forward or backward 2 spaces.
    - make sure when implementing BFS to SAVE the nodes/spaces the knight has already visited to prevent loops and to 
    make sure that the knight can go to a different node.
    - BFS is actually a common algorithm to find the shortest path since it goes by level evenly until it finds the thing it 
    wants (in our case, the end location).
    - making a GUI for the chess board is NOT required. 
    - graphs are mainly a concept, but in this case, I do not need to make a literal graph object/data structure with verticies and 
    edges. 

    - the 3 ways that khan academy came up with to represent a graph is with lists filled with edges to represent the relationships between verticies.
        1. edge lists: a list of all of the connected edges in a graph 
            ex: [[0, 1], [0, 6], [0,8]]

        2. adjacency matricies: a matrix of 0 and 1 where the 1 is indicating that the location its at connects with the other vertex
            ex: [[0, 0, 0, 1, 0],
                 [0, 0, 1, 0, 0],
                 [0, 1, 0, 1, 0],
                 [1, 0, 0, 1, 0]]

        3. adjacency list: a combination of edge list and adjacency matrix, where the list contains another list that contains verticies that are adjacent to it.
            ex: [[1, 6, 8],
                [0, 4, 6],
                [1, 2],
                [0]]

    - also, the Odin Project mentions that there are MULTIPLE FASTEST PATHS. As long as the function returns ONE of those answers, its still correct. Provides
    the multiple fastest paths to some problems on the project page: https://www.theodinproject.com/lessons/javascript-knights-travails


# new plan: 
Like the node factories I made in the last projects, I am going to make an object that 
has a "parent" pointer property so that I can retrace the steps. 
Printing out the BFS steps isn't going to give me the shortest path order, I need to keep track of what steps I took 
to get to EVERY node when I generate new steps. So the plan is: 

1. start with given position
2. add the given position to our visited list because we are currently visiting it while generating new steps
3. when generating new steps from the origin position, make sure to assign EVERY new step's parent vertex to be the position I am calculating from 
4. enqueue the steps that are valid. If a generated step is out of bounds or in our visited list, then it is invalid so do not enqueue
5. get new step from queue and repeat steps 2-5 until we reach the end of the queue or found the end position during traversal

Doing it this way will BFS through ALL possible steps up until we reach the end point, then we can form our shortest route through iterating through 
the parent steps backwards since they all link to each other (like a linked list). Make sure to reverse the list after iteration since we are going 
from the end to the beginning when going through the parent vertex properties.