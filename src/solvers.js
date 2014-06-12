/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var createBoard = function(n){
    var board = [];
    for (var i=0; i<n; i++) {
      var row = [];
      for (var j=0; j<n; j++) {
        row.push(0);
      }
      board.push(row);
    }
    return board;
  };

var solution = new Board(createBoard(n));
  for (var i=0; i<n; i++) {
    for (var j=0; j<n; j++) {
      solution.togglePiece(j,i);
      if(solution.hasAnyRooksConflicts()) {
        solution.togglePiece(j,i);
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(num) {
  // var solutionCount = undefined; //fixme
  // var root = [];
  // if (num = 1) {

  // }
  // var depth = 3;
  // var index = 3;
  var solutionCount = 0;
  //create empty board of nxn
  var board = new Board({n:num});
  //array of row position we can choose at each level
  var rows = _.range(1, num+1);
  //create function to call recursively
  var findCombo = function(depth) {
    // debugger;
    for (var i=0; i<rows.length; i++) {
      //toggle entire column, 1 at a time
      board.togglePiece(i, depth);
      if (!board.hasAnyRooksConflicts()) {
        if(depth === num-1) {
          solutionCount++;
        }else {
          findCombo(depth+1);
        }
      }
      //toggle column value
      board.togglePiece(i, depth);
    }
  };

  findCombo(0);

  console.log('Number of solutions for ' + num + ' rooks:', solutionCount);
  return solutionCount;

















  // console.log(board);
  // var boards = [];

  // //var makeChildren = function(depth, board, boards) {
  //   if (depth === 0) {
  //     return boards;
  //   }

  //   // if (board.indexOf(1) === -1) {

  //   // }

  //   for (var i=0; i<index; i++) {
  //     debugger;
  //     boards.push(board.rows());
  //     console.log(boards);
  //   }

  //     for (var j=0; j<index; j++) {

  //     }



    //}




    //makeChildren(depth--, board, boards);






  //base case: n levels of tree
  //initial case: []
  //common pattern: loop through all children, 1 through n

  //function makeChildren, recursively called, pass in root and depth,
  //then children and depth
  //toggle
  //when depth is zero stop


};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
