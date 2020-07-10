// sample grids
const grid1 = [
  [ 3,4,7,6,8,9,1,2,5 ],
  [ 9,8,7,6,5,1,2,3,4 ],
  [ 6,5,4,7,8,9,3,2,1 ],
  [ 3,4,7,8,9,1,2,3,6 ],
  [ 7,5,6,7,3,4,9,1,2 ],
  [ 1,2,3,4,5,6,7,8,9 ],
  [ 1,5,9,8,7,4,6,2,3 ],
  [ 7,4,6,3,2,5,8,1,9 ],
  [ 3,2,8,1,9,6,5,4,7 ]
];

const grid2 = [
  [ 8,9,5,7,4,2,1,3,6],
  [ 2,7,1,9,6,3,4,8,5],
  [ 4,6,3,5,8,1,7,9,2],
  [ 9,3,4,6,1,7,2,5,8],
  [ 5,1,7,2,3,8,9,6,4],
  [ 6,8,2,4,5,9,3,7,1],
  [ 1,5,9,8,7,4,6,2,3],
  [ 7,4,6,3,2,5,8,1,9],
  [ 3,2,8,1,9,6,5,4,7]];

const grid3 = [
  [ 8,9,5,7,4,2,1,3,6],
  [ 2,7,1,9,6,3,4,8,5],
  [ 4,6,3,5,8,1,7,9,2],
  [ 9,3,4,6,1,7,2,5,8],
  [ 5,1,7,2,3,8,9,6,4],
  [ 6,8,2,4,5,9,3,7,1],
  [ 1,5,9,8,7,4,6,2,3],
  [ 7,4,6,3,2,5,8,1,9],
  [ 3,2,8,1,9,6,5,4,7]];


// an object with object methods
const sudoku = {
  // function to select a row
  getRow: (grid, rowNum) => grid[rowNum],

  // function to select a colum
  getColumn: (grid, colNum) => {
    const chosenCol = [];
    grid.forEach(eachRow => chosenCol.push(eachRow[colNum]));
    return chosenCol;
  },

  // function to select a subgrid
  getSubgrid: (grid, x, y) => {
    const subgrid = [];
    for (let rowNum = y * 3; rowNum < (y + 1) * 3; rowNum ++) {
      const currentRow = grid[rowNum];
      for (let colNum = x * 3; colNum < (x + 1) * 3; colNum ++) {
        subgrid.push(currentRow[colNum]);  
      }
    }
    return subgrid;
  },
  
  //method to test if a row, column, or a subgrid includes 1-9;
  includes1to9: (section) => {
    let result = true;
    section.forEach((eachNum, index, array) => {
      if (index !== array.indexOf(eachNum)) result = false;
    })
    return result;
  },
  
  //method to test if the entire sudoku grid follow the rule;
  isValid: function (grid) {
    let rowTest = true;
    for (let rowNum = 0; rowNum < 9; rowNum++) {
      const row = this.getRow(grid, rowNum);
      if (!this.includes1to9(row)) rowTest = false;
    }
  
    let colTest = true;
    for (let colNum = 0; colNum < 9; colNum++) {
      const column = this.getColumn(grid, colNum);
      if (!this.includes1to9(column)) colTest = false;
    }
  
    let secTest = true; 
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        const subgrid = this.getSubgrid(grid, x, y);
        if (!this.includes1to9(subgrid)) secTest = false;
      }
    }
    return !rowTest || !colTest || !secTest ? "This grid is invalid!" : "This grid is valid!";           
  },

  //method to compare two grids
  isSame: (grid1, grid2) => {
    let testResult = true;
    grid1.forEach((eachRow1, rowNum) => {
      let eachRow2 = grid2[rowNum];
      eachRow1.forEach((eachNum1, index) => {
        let eachNum2 = eachRow2[index];
        if (eachNum1 !== eachNum2) testResult = false;
      })
    })
    return testResult ? "The two grids are exactly the same!" : "The two grids are different!";
  }
}

console.log(sudoku.isValid(grid1));
console.log(sudoku.isSame(grid2, grid3));
