"use strict";
class Row {
  #columns = [];
  push(v) {
    this.#columns.push(v);
    return this;
  }
  pushMany(v) {
    this.#columns = [...this.#columns, ...v];
    return this;
  }
  set(i, v) {
    this.#columns[i] = v;
    return this;
  }
  get(i) {
    return this.#columns[i];
  }
  getAll() {
    return this.#columns;
  }
  getLength() {
    return this.#columns.length;
  }
}
class Table {
  #rows = [];
  getRow(i) {
    return this.#rows[i] || this.createRow(i);
  }
  createRow(i) {
    if (this.#rows[i]) {
      return this.#rows[i];
    }
    this.#rows[i] = new Row();
    return this.#rows[i];
  }
  pushRow(v) {
    let row = this.createRow(this.#rows.length);
    row.pushMany(v);
    return row;
  }
}
const table = new Table();
table.createRow(0).set(0, "id").set(1, "name").set(2, "order_id");
table.createRow(1).set(0, "5").set(1, "foo").set(2, "7");
table.createRow(2).push("6").push("bar").push("8");
table.pushRow(["9", "exc", "10"]);
console.log("0:", table.getRow(0).getAll());
console.log("1:", table.getRow(1).getAll());
console.log("2:", table.getRow(2).getAll());
console.log("3:", table.getRow(3).getAll());
//# sourceMappingURL=index.js.map
