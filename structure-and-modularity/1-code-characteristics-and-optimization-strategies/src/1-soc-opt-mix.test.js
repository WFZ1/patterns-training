'use strict';

const {
  addPercentFromColumnToTable,
  formatRow,
  getMax,
  getPercentFromNumber,
  normalizeTable,
  sortByColumnIndex,
} = require('./1-soc-opt-mix.js');
const { runTests } = require('./testRunner.js');

const tests = {
  normalizeTable: () => {
    const testData = 'header1,header2\nvalue1,value2\nvalue3,value4';
    const result = normalizeTable(testData);
    if (
      result.length !== 2 ||
      result[0][0] !== 'value1' ||
      result[1][1] !== 'value4'
    ) {
      throw new Error(
        'Incorrect table structure or content after normalization',
      );
    }
  },
  getMax: () => {
    const result = getMax([1, 5, 3, 9, 2]);
    if (result !== 9) {
      throw new Error('Did not return the maximum value from the array');
    }
  },
  getPercentFromNumber: () => {
    const result = getPercentFromNumber(50, 200);
    if (result !== 25) {
      throw new Error('Incorrect percentage calculation');
    }
  },
  addPercentFromColumnToTable: () => {
    const testTable = [
      ['City', '100'],
      ['Town', '50'],
    ];
    const result = addPercentFromColumnToTable(testTable, 1);
    if (result[0][2] !== '100' || result[1][2] !== '50') {
      throw new Error('Incorrect percentage values added to the table');
    }
  },
  sortByColumnIndex: () => {
    const testTable = [
      ['A', '2'],
      ['B', '1'],
      ['C', '3'],
    ];
    const result = sortByColumnIndex(testTable, 1);
    if (result[0][0] !== 'C' || result[2][0] !== 'B') {
      throw new Error(
        'Table not sorted correctly based on the specified column',
      );
    }
  },
  formatRow: () => {
    const testRow = ['City', '100', '50'];
    const testWidths = [10, 5, 3];
    const result = formatRow(testRow, testWidths);
    if (result !== 'City        100 50') {
      throw new Error(
        'Incorrect formatting of row based on specified column widths',
      );
    }
  },
};

runTests(tests);
