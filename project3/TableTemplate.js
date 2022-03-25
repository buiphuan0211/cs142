// class TableTemplate {
//   constructor(id, dictionary, columnName) {
//     (this.id = id),
//       (this.dictionary = dictionary),
//       (this.columnName = columnName);
//   }

//   fillIn(){

//   }
// }

class TableTemplate {
  static fillIn(id, dict, columnName) {
    let table = document.getElementById(id);
    table.style = `visibility: visible`;
    let tbody = table.tBodies[0];
    console.log('tbody', tbody);
    let firstRow = tbody.rows[0];
    let headerHtml = firstRow.innerHTML;
    // console.log(headerHtml);

    let template = new Cs142TemplateProcessor(headerHtml);
    // console.log('log template: ', template);

    firstRow.innerHTML = template.fillIn(dict);
    let headerCells = firstRow.cells;
    console.log(headerCells);
    let col = -1;
    for (let i = 0; i < headerCells.length; i++) {
      let td = headerCells[i];
      if (td.innerHTML === columnName) {
        col = i;
      }
    }

    for (let row of tbody.rows) {
      let cells = row.cells;
      console.log(cells);
      for (let i = 0; i < cells.length; i++) {
        if (columnName === undefined || i === col) {
          let cellTemplate = new Cs142TemplateProcessor(cells[i].innerHTML);
          cells[i].innerHTML = cellTemplate.fillIn(dict);
        }
      }
    }
  }
}
