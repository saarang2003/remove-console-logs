#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
const { program } = require('commander');

// Enhanced regex
const CONSOLE_REGEX = 
  /(^|\s|;)console\.(log|warn|error|info|debug|table|time|timeEnd|trace|dir|group|groupEnd)\([\s\S]*?\)\s*;?(\s*|\/\*.*?\*\/)*$/gm;

async function processFiles(targetPath, options) {
  try {
    const ignorePatterns = [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      ...(options.ignore ? options.ignore.split(',') : [])
    ];

    const files = await glob([
      `${targetPath}/**/*.{js,ts,jsx,tsx}`,
      ...ignorePatterns.map(p => `!${p}`)
    ]);

    if (files.length === 0) {
      console.log('No matching files found');
      return;
    }

    let totalRemoved = 0;
    const changes = [];

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf-8');
        const newContent = options.preserve ? 
          content.replace(CONSOLE_REGEX, match => `/* ${match.trim()} */`) :
          content.replace(CONSOLE_REGEX, '');

        const removed = (content.match(CONSOLE_REGEX) || []).length;
        
        if (removed > 0) {
          changes.push({ file, removed });
          totalRemoved += removed;

          if (!options.dryRun) {
            fs.writeFileSync(file, newContent);
          }
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    }

    // Output results
    if (options.dryRun) {
      console.log('\nDRY RUN RESULTS:');
    }
    
    changes.forEach(change => {
      console.log(`${options.dryRun ? 'Would remove' : 'Removed'} ${change.removed} console statements from ${change.file}`);
    });

    console.log(`\n${options.dryRun ? 'Would remove' : '✅ Removed'} ${totalRemoved} console statements across ${changes.length} files`);

    if (options.dryRun) {
      console.log('\nNote: No files were actually modified (dry run)');
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// CLI Setup
program
  .name('clean-console')
  .description('Remove console statements from JavaScript/TypeScript files')
  .version('1.0.0')
  .argument('[path]', 'path to process', '.')
  .option('-d, --dry-run', 'show what would be removed without modifying files')
  .option('-i, --ignore <patterns>', 'comma-separated ignore patterns (e.g. "**/test/**,**/temp/**")')
  .option('-p, --preserve', 'comment out instead of removing')
  .parse(process.argv);

processFiles(program.args[0], program.opts());