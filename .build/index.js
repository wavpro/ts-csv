"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var tableformat_exports = {};
__export(tableformat_exports, {
  default: () => Table
});
module.exports = __toCommonJS(tableformat_exports);
class Row {
  columns = [];
  push(v) {
    this.columns.push(v);
    return this;
  }
  pushMany(v) {
    this.columns = [...this.columns, ...v];
    return this;
  }
  set(i, v) {
    this.columns[i] = v;
    return this;
  }
  get(i) {
    return this.columns[i];
  }
  getAll() {
    return this.columns;
  }
  getLength() {
    return this.columns.length;
  }
}
class Table {
  rows = [];
  getRow(i) {
    return this.rows[i] || this.createRow(i);
  }
  getRows() {
    return this.rows;
  }
  createRow(i) {
    if (this.rows[i]) {
      return this.rows[i];
    }
    this.rows[i] = new Row();
    return this.rows[i];
  }
  pushRow(v) {
    let row = this.createRow(this.rows.length);
    row.pushMany(v);
    return row;
  }
  import(file) {
    this.rows = this.fileToData(file);
  }
  export() {
    function value(v) {
      if (v.includes("\n") || v.includes('"')) {
        v = v.replace(/"/g, '""');
        v = `"${v}"`;
      }
      return v;
    }
    let csv = "";
    for (let row of this.rows) {
      let columns = row.getAll();
      for (let i = 0; i < columns.length; i++) {
        csv += value(columns[i]);
        if (i === columns.length - 1) {
          csv += "\n";
        } else {
          csv += ",";
        }
      }
    }
    return csv;
  }
  fileToData(file) {
    if (!file.endsWith("\n")) {
      file = file + "\n";
    }
    let inQuotes = false;
    let currentValue = "";
    let rowNumber = 0;
    let rows = [];
    let columns = [];
    let skip = false;
    for (let i = 0; i < file.length; i++) {
      const character = file[i];
      const nextCharacter = file[i + 1];
      if (skip) {
        skip = false;
        continue;
      }
      if (inQuotes) {
        if (character === '"' && nextCharacter === '"') {
          skip = true;
          currentValue += character;
          continue;
        }
        if (character === '"') {
          inQuotes = false;
          continue;
        }
        currentValue += character;
      }
      if (!inQuotes) {
        if (character === '"') {
          inQuotes = true;
        } else if (character === ",") {
          columns.push(currentValue);
          currentValue = "";
        } else if (character === "\n") {
          columns.push(currentValue);
          currentValue = "";
          rows.push(new Row().pushMany(columns));
          rowNumber++;
          columns = [];
        } else {
          currentValue += character;
        }
      }
    }
    return rows;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=index.js.map
