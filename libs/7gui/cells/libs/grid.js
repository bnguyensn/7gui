export default class Grid {
  constructor() {
    this.cells = {};
  }

  cellExists(cellId) {
    return this.cells[cellId] !== undefined;
  }

  getCellValue(cellId) {
    return this.cells[cellId] && this.cells[cellId].value;
  }

  refresh() {
    // ...
  }
}
