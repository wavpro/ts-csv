class Row {
  #columns: string[] = [];

  push(v: string) {
    this.#columns.push(v);

    return this;
  }

  pushMany(v: string[]) {
    this.#columns = [...this.#columns, ...v]

    return this;
  }

  set(i: number, v: string) {
    this.#columns[i] = v;

    return this;
  }

  get(i: number): string {
    return this.#columns[i];
  }

  getAll(): string[] {
    return this.#columns;
  }

  getLength(): number {
    return this.#columns.length;
  }
}

class Table {
  #rows: Row[] = [];

  getRow(i: number): Row {
    return this.#rows[i] || this.createRow(i);
  }

  createRow(i: number): Row {
    if (this.#rows[i]) {
      return this.#rows[i];
    }

    this.#rows[i] = new Row();

    return this.#rows[i];
  }

  pushRow(v: string[]): Row {
    let row = this.createRow(this.#rows.length);

    row.pushMany(v);

    return row;
  }

  import(file: string) {
    let rows = file.split('\n');


  }

  #fileToData(row: string) {
    let inQuotes = false;
    let currentValue = '';
    let rowNumber = 0;

    let rows: string[] = [];

    let skip = false;

    for (let i = 0; i < row.length; i++) {
      const character = row[i];
      const nextCharacter = row[i];

      if (skip) {
        skip = false;
        continue;
      }

      if (inQuotes) {
        if (character === '"' && nextCharacter === '"') {
          skip = true;
          currentValue += character;
        }
      }
    }
  }
}

const table = new Table();

table.createRow(0).set(0, 'id').set(1, 'name').set(2, 'order_id');
table.createRow(1).set(0, '5').set(1, 'foo').set(2, '7');
table.createRow(2).push('6').push('bar').push('8');
table.pushRow(['9', 'exc', '10']);

console.log('0:', table.getRow(0).getAll())
console.log('1:', table.getRow(1).getAll())
console.log('2:', table.getRow(2).getAll())
console.log('3:', table.getRow(3).getAll())