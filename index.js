#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Enhanced regex that handles:
// 1. All console methods
// 2. Different spacing patterns
// 3. Multi-line statements
// 4. Optional semicolons
// 5. Template literals
const CONSOLE_REGEX = 
  /console\.(log|info|warn|error|debug|trace|assert|clear|count|countReset|group|groupCollapsed|groupEnd|table|time|timeEnd|timeLog|dir|dirxml|profile|profileEnd|timeStamp)\s*\([\s\S]*?\)\s*;?\n?/g;

async function processFiles(targetPath = '.') {
  try {
    // Find all JS/TS/JSX/TSX files excluding common directories
    const files = await glob([
      `${targetPath}/**/*.{js,ts,jsx,tsx}`,
      '!**/node_modules/**',
      '!**/dist/**',
      '!**/build/**'
    ]);

    if (files.length === 0) {
      console.log('No matching files found');
      return;
    }

    let totalRemoved = 0;

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf-8');
        const newContent = removeConsole(content);
        
        if (content !== newContent) {
          const removedCount = (content.match(CONSOLE_REGEX) || []).length;
          totalRemoved += removedCount;
          fs.writeFileSync(file, newContent);
          console.log(`Removed ${removedCount} console statements from ${file}`);
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    }

    console.log(`\n✅ Removed ${totalRemoved} console statements across ${files.length} files`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

function removeConsole(content) {
  return content.replace(CONSOLE_REGEX, '');
}

// CLI Handling
const [,, targetPath = '.'] = process.argv;
processFiles(targetPath);