'use strict';

const { getMax, getPercentFromNumber, Table } = require('./1-soc-opt-oop.js');
const { runTests } = require('./testRunner.js');

const tests = {
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
  normalize: () => {
    const testData = 'header1,header2\nvalue1,value2\nvalue3,value4';
    const result = Table.normalize(testData);
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
  addPercentFromColumn: () => {
    const testTable = [
      ['City', '100'],
      ['Town', '50'],
    ];
    const result = Table.addPercentFromColumn(testTable, 1);
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
    const result = Table.sortByColumnIndex(testTable, 1);
    if (result[0][0] !== 'C' || result[2][0] !== 'B') {
      throw new Error(
        'Table not sorted correctly based on the specified column',
      );
    }
  },
  formatRow: () => {
    const testRow = ['City', '100', '50'];
    const testWidths = [10, 5, 3];
    const result = Table.formatRow(testRow, testWidths);
    if (result !== 'City        100 50') {
      throw new Error(
        'Incorrect formatting of row based on specified column widths',
      );
    }
  },
  prettify: () => {
    const testTable = [
      ['City', '100', '50'],
      ['Town', '200', '75'],
    ];
    const testWidths = [10, 5, 3];
    const result = Table.prettify(testTable, testWidths);
    if (
      result[0] !== 'City        100 50' ||
      result[1] !== 'Town        200 75'
    ) {
      throw new Error(
        'Incorrect formatting of rows based on specified column widths',
      );
    }
  },
};

runTests(tests);
