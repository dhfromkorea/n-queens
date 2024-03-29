// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

    window.Board = Backbone.Model.extend({
        initialize: function(params) {
            if (_.isUndefined(params) || _.isNull(params)) {
                console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
                console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
                console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
            } else if (params.hasOwnProperty('n')) {
                this.set(makeEmptyMatrix(this.get('n')));
            } else {
                this.set('n', params.length);
            }
        },

        rows: function() {
            return _(_.range(this.get('n'))).map(function(rowIndex) {
                return this.get(rowIndex);
            }, this);
        },

        cols: function() {
            var rows = this.rows();
            var storage = [];
            for (var i = 0; i < rows[0].length; i++) {
                storage.push(_.pluck(rows, i));
            }
            return storage;
        },

        togglePiece: function(rowIndex, colIndex) {
            this.get(rowIndex)[colIndex] = +!this.get(rowIndex)[colIndex];
            this.trigger('change');
        },

        _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
            return colIndex - rowIndex;
        },

        _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
            return colIndex + rowIndex;
        },

        hasAnyRooksConflicts: function() {
            return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
        },

        hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
            return (
                this.hasRowConflictAt(rowIndex) ||
                this.hasColConflictAt(colIndex) ||
                this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
                this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
            );
        },

        hasAnyQueensConflicts: function() {
            return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
        },

        _isInBounds: function(rowIndex, colIndex) {
            return (
                0 <= rowIndex && rowIndex < this.get('n') &&
                0 <= colIndex && colIndex < this.get('n')
            );
        },


        /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

    */
        /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

        // ROWS - run from left to right
        // --------------------------------------------------------------
        //
        // test if a specific row on this board contains a conflict
        hasRowConflictAt: function(rowIndex) {
            var counter = 0;
            var row = this.get(rowIndex);
            // iterating over a single row
            for (var i = 0; i < row.length; i++) {
                // check for pieces
                if (row[i] === 1) {
                    counter++;
                }
            }
            // if there's more than one piece
            if (counter > 1) {
                return true;
            }
            return false; // fixme
        },

        // test if any rows on this board contain conflicts
        hasAnyRowConflicts: function() {
            // get the rows
            var rows = this.rows();
            // loop through rows
            // check if there's a conflict
            for (var i = 0; i < rows.length; i++) {
                if (this.hasRowConflictAt(i)) {
                    return true;
                }
            }
            return false; // fixme
        },



        // COLUMNS - run from top to bottom
        // --------------------------------------------------------------
        //
        // test if a specific column on this board contains a conflict
        hasColConflictAt: function(colIndex) {
            //get column array
            //iterate over array
            //check for column conflict
            var counter = 0;
            var col = this.cols()[colIndex];
            for (var i = 0; i < col.length; i++) {
                if (col[i] === 1) {
                    counter++;
                }
            }
            if (counter > 1) {
                return true;
            }
            return false; // fixme
        },

        // test if any columns on this board contain conflicts
        hasAnyColConflicts: function() {
            //get column array
            //iterate over array
            //check for column conflict
            var cols = this.cols();
            var rowIndex;
            for (var i = 0; i < cols.length; i++) {
                // rowIndex = i;
                if (this.hasColConflictAt(i)) {
                    return true;
                }
            }
            return false; // fixme
        },


        // Major Diagonals - go from top-left to bottom-right
        // --------------------------------------------------------------
        //
        // test if a specific major diagonal on this board contains a conflict
        hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
            // check if there's a queen for that diagIndex
            // make a diagonal line from the first spot of that diagIndex
            var row;
            var col;
            var boardSize = this.get('n');
            var queenAppears = 0;
            if (majorDiagonalColumnIndexAtFirstRow < 0) {
                row = (-1) * majorDiagonalColumnIndexAtFirstRow;
                col = 0;
            } else {
                row = 0;
                col = majorDiagonalColumnIndexAtFirstRow;
            }
            // debugger;
            while ( this._isInBounds(row,col) ) {
                if (this.get(row)[col] === 1) {
                    queenAppears += 1;
                }
                row++;
                col++;
            }
            return (queenAppears > 1) ? true : false;
        },

        // test if any major diagonals on this board contain conflicts
        hasAnyMajorDiagonalConflicts: function() {
            return _.some(_.range(-this.get('n') + 1, this.get('n')), function(diagIndex) {
                return this.hasMajorDiagonalConflictAt(diagIndex);
            }, this);
        },



        // Minor Diagonals - go from top-right to bottom-left
        // --------------------------------------------------------------
        //
        // test if a specific minor diagonal on this board contains a conflict
        hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
            var col;
            var row;
            var boardSize = this.get('n');
            var queenAppears = 0;
            if (minorDiagonalColumnIndexAtFirstRow < boardSize) {
                row = 0;
                col = minorDiagonalColumnIndexAtFirstRow;
            } else {
                row = minorDiagonalColumnIndexAtFirstRow - boardSize + 1;
                col = boardSize-1;
            }
            while ( this._isInBounds(row,col) ) {
                if (this.get(row)[col] === 1) {
                    queenAppears += 1;
                }
                col--;
                row++;
            }
            return (queenAppears > 1) ? true : false;
        },

        // test if any minor diagonals on this board contain conflicts
        hasAnyMinorDiagonalConflicts: function() {
            return _.some(_.range(this.get('n')), function(diagIndex) {
                return this.hasMinorDiagonalConflictAt(diagIndex);
            }, this);
        }

        /*--------------------  End of Helper Functions  ---------------------*/

    });

    var makeEmptyMatrix = function(n) {
        return _(_.range(n)).map(function() {
            return _(_.range(n)).map(function() {
                return 0;
            });
        });
    };

}());