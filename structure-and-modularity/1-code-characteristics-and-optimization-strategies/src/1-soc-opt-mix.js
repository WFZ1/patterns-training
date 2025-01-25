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

const normalizeTable = (data) => {
  const lines = data.split('\n');
  const bodyLines = lines.slice(1);
  const table = bodyLines.map((line) => line.trim().split(','));

  return table;
};

const getMax = (values) =>
  values.reduce((maxValue, value) => Math.max(maxValue, value));

const getPercentFromNumber = (value, total) =>
  Math.round((value * 100) / total);

const addPercentFromColumnToTable = (table, columnIndex) => {
  const values = table.map((cells) => cells[columnIndex]);
  const maxValue = getMax(values);

  const updatedTable = table.map((cells) => {
    const value = Number(cells[columnIndex]);
    const percent = getPercentFromNumber(value, maxValue);
    return cells.concat(String(percent));
  });

  return updatedTable;
};

const sortByColumnIndex = (table, colIndex, type = 'desc') =>
  table.toSorted((row1, row2) => {
    const compareResult = row1[colIndex] - row2[colIndex];
    return type === 'asc' ? compareResult : compareResult * -1;
  });

const formatRow = (row, columnWidths) => {
  const formattedCells = row.map((cell, index) => {
    const columnWidth = columnWidths[index];
    return index ? cell.padStart(columnWidth) : cell.padEnd(columnWidth);
  });
  return formattedCells.join('');
};

const outputToConsole = (array) => array.forEach((item) => console.log(item));

const main = (rawTable) => {
  const table = normalizeTable(rawTable);
  const densityColumnIndex = 3;
  const updatedTableWithDensity = addPercentFromColumnToTable(
    table,
    densityColumnIndex,
  );
  const densityPercentColumnIndex = 5;
  const sortedTableByDensity = sortByColumnIndex(
    updatedTableWithDensity,
    densityPercentColumnIndex,
  );
  const columnWidths = [18, 10, 8, 8, 18, 6];
  const prettifiedTable = sortedTableByDensity.map((row) =>
    formatRow(row, columnWidths),
  );

  outputToConsole(prettifiedTable);
};

main(data);

module.exports = {
  normalizeTable,
  getMax,
  getPercentFromNumber,
  addPercentFromColumnToTable,
  sortByColumnIndex,
  formatRow,
  outputToConsole,
};
