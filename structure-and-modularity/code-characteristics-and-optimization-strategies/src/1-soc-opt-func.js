'use strict';

// Tasks for rewriting:
//   - Apply optimizations of computing resources: processor, memory
//   - Minimize cognitive complexity
//   - Respect SRP and SoC
//   - Improve readability (understanding), reliability
//   - Optimize for maintainability, reusability, flexibility
//   - Make code testable
//   - Implement simple unittests without frameworks
//   - Try to implement in multiple paradigms: OOP, FP, procedural, mixed

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
    const table = bodyLines.map((line) => line.split(','))
    
    return table;
}

const getMax = (values) => values.reduce((maxValue, value) => Math.max(maxValue, value));
const getPercentFromNumber = (value, total) => Math.round(value * 100 / total);

const addDensityPercentToTable = (table) => {
    const densityValues = table.map((cells) => cells[3]);
    const maxDensityValue = getMax(densityValues);
    
    const updatedTable = table.map((cells) => {
        const densityPercent = getPercentFromNumber(Number(cells[3]), maxDensityValue);
        return cells.concat(String(densityPercent));
    });
    
    return updatedTable;
}

const columnWidths = [18, 10, 8, 8, 18, 6];
const formatRow = (row) => row.reduce((line, cell, index) => {
    const columnWidth = columnWidths[index];
    const formattedRow = index === 0 ? cell.padEnd(columnWidth) : cell.padStart(columnWidth);
    return line + formattedRow;
}, '');

const outputToConsole = (array) => array.forEach((item) => console.log(item));

const table = normalizeTable(data);
const updatedTableWithDensity = addDensityPercentToTable(table);
const sortedTableByDensity = updatedTableWithDensity.toSorted((r1, r2) => r2[5] - r1[5]);
const prettifiedTable = sortedTableByDensity.map(formatRow);

outputToConsole(prettifiedTable);