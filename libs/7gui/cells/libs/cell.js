export default class Cell {
  constructor({ id, value }) {
    this.id = id;
    this.value = value !== undefined ? value : null;
  }

  isFormula() {
    return this.value.startsWith('=');
  }

  refresh() {
    // Only need to update if the cell is a formula
    if (this.isFormula()) {
    }
  }
}
