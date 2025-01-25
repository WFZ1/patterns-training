'use strict';

const data = `city,population,area,density,country
  Shanghai,24256800,6340,3826,China
  Delhi,16787941,1484,11313,India
  Lagos,16060303,1171,13712,Nigeria
  Istanbul,14160467,5461,2593,Turkey
  Tokyo,13513734,2191,6168,Japan
  Sao Paulo,12038175,1521,7914,Brazil
  Mexico City,8874724,1486,5974,Mexico
  London,8673713,1572,5431,United Kingdom
  New York City,8537673,784,10892,United States
  Bangkok,8280925,1569,5279,Thailand`;

const getMax = (values) =>
  values.reduce((maxValue, value) => Math.max(maxValue, value));

const getPercentFromNumber = (value, total) =>
  Math.round((value * 100) / total);

class Table {
  static normalize(data) {
    const lines = data.split('\n');
    const bodyLines = lines.slice(1);
    const table = bodyLines.map((line) => line.trim().split(','));

    return table;
  }

  static addPercentFromColumn(table, columnIndex) {
    const values = table.map((cells) => cells[columnIndex]);
    const maxValue = getMax(values);

    const updatedTable = table.map((cells) => {
      const value = Number(cells[columnIndex]);
      const percent = getPercentFromNumber(value, maxValue);
      return cells.concat(String(percent));
    });

    return updatedTable;
  }

  static sortByColumnIndex(table, colIndex, type = 'desc') {
    return table.toSorted((row1, row2) => {
      const compareResult = row1[colIndex] - row2[colIndex];
      return type === 'asc' ? compareResult : compareResult * -1;
    });
  }

  static formatRow(row, columnWidths) {
    const formattedCells = row.map((cell, index) => {
      const columnWidth = columnWidths[index];
      return index ? cell.padStart(columnWidth) : cell.padEnd(columnWidth);
    });
    return formattedCells.join('');
  }

  static prettify(table, columnWidths) {
    return table.map((row) => Table.formatRow(row, columnWidths));
  }

  static outputToConsole(table) {
    table.forEach((row) => console.log(row));
  }
}

const main = (rawTable) => {
  const table = Table.normalize(rawTable);
  const densityColumnIndex = 3;
  const updatedTableWithDensity = Table.addPercentFromColumn(
    table,
    densityColumnIndex,
  );
  const densityPercentColumnIndex = 5;
  const sortedTableByDensity = Table.sortByColumnIndex(
    updatedTableWithDensity,
    densityPercentColumnIndex,
  );
  const columnWidths = [18, 10, 8, 8, 18, 6];
  const prettifiedTable = Table.prettify(sortedTableByDensity, columnWidths);

  Table.outputToConsole(prettifiedTable);
};

main(data);

module.exports = {
  getMax,
  getPercentFromNumber,
  Table,
};
