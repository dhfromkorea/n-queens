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

// fucking how do I save all the solutions over the course of the whole the recursive call
window.findNRooksSolution = function(n) {
  // eliminated row or col check with the decision tree design itself
  var board = new Board({n: n});
  var result = [];
  var remainingRows = _.range(0, n);
  var arrCopy;
  var searchSpots = function(colNum, remainingRows) {
    for (var i = 0; i < remainingRows.length; i++) {
      board.togglePiece(remainingRows[i], colNum);
        if (colNum === (n - 1)) {
          // console.log('Single solutions for ' + n + ' rooks:', JSON.stringify(board.rows()));
          var temp = [];
          for (var j = 0; j < board.rows().length; j++){
            temp[j] = board.rows()[j].slice();
          }
          result.push(temp);
        } else {
          arrCopy = Array.prototype.slice.call(remainingRows);
          arrCopy.splice(i,1);
          searchSpots(colNum + 1, arrCopy);
        }
      board.togglePiece(remainingRows[i], colNum);
    }
  };
  searchSpots(0, remainingRows);
  return result[0];
};




// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // has rowconflict has O(n^2) time complexity (as it requires a double loop)
var board = new Board({n: n});
  var remainingRows = _.range(0, n);
  var solutionCount = 0;
  var searchSpots = function(colNum, remainingRows) {
    for (var i = 0; i < remainingRows.length; i++) {
      board.togglePiece(remainingRows[i], colNum);
        if (colNum === (n - 1)) {
            // console.log('Single solutions for ' + n + ' rooks:', JSON.stringify(board.rows()));
          solutionCount++;
          } else {
          arrCopy = Array.prototype.slice.call(remainingRows);
          arrCopy.splice(i,1);
          searchSpots(colNum + 1, arrCopy);
        }
      board.togglePiece(remainingRows[i], colNum);
    }
  };
  searchSpots(0, remainingRows);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var createBoard = function(n) {
    var board = [];
    for (var i = 0; i < n; i++) {
      var row = [];
      for (var j = 0; j < n; j++) {
        row.push(0);
      }
      board.push(row);
    }
    return board;
  };
  var solution = new Board(createBoard(n));
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      solution.togglePiece(j, i);
      if (solution.hasAnyQueensConflicts()) {
        solution.togglePiece(j, i);
      }
    }
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  if (n === 0 || n === 1) {
   // handle unusual base cases
    solutionCount = 1;
    return solutionCount;
  }
  //create empty board of nxn
  var board = new Board({n: n});
  // will have access to the latest diagonal states
  var remainingRows = _.range(0, n);
  var diagIndex;
  var arrCopy;
  //array of row position we can choose at each level
  //create function to call recursively
  var searchMoves = function(colNum, remainingRows) {
    for (var i = 0; i < remainingRows.length; i++) {
      // as we're removing rows selected in the parent nodes
      // we only check for diagonal conflicts
      majorIndex = board._getFirstRowColumnIndexForMajorDiagonalOn(remainingRows[i], colNum);
      minorIndex = board._getFirstRowColumnIndexForMinorDiagonalOn(remainingRows[i], colNum);
      board.togglePiece(remainingRows[i], colNum);
      if (!board.hasMajorDiagonalConflictAt(majorIndex) && !board.hasMinorDiagonalConflictAt(minorIndex)) {
        if (colNum === n - 1) {
          // console.log('Number of solutions for ' + n + ' queens:', board.rows());
          solutionCount++;
        } else {
          // create a shallow copy to avoid value sharing 
          arrCopy = remainingRows.slice();
          // slice out the selected index  
          arrCopy.splice(i, 1);
          searchMoves(colNum + 1, arrCopy);
        }
      }
      board.togglePiece(remainingRows[i], colNum);
    }
  };
  searchMoves(0, remainingRows);
  return solutionCount;
};