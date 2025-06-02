

# Remove Console Logs 🧹⚡

A zero-dependency Node.js CLI tool that cleans all `console.*` statements from your JavaScript/TypeScript files. Perfect for preparing production code!

[![npm version](https://img.shields.io/npm/v/remove-console-logs)](https://www.npmjs.com/package/remove-console-logs)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## Features ✨

* Removes all `console` methods (`log`, `error`, `warn`, `info`, etc.)
* Supports JS, TS, JSX, and TSX files
* Preserves source formatting
* Dry run mode for safe preview
* Ignore specific files/folders
* Option to comment out instead of removing

---

## Installation 📦

Use npx:

```bash
npx remove-console-logs@latest
```

Or install globally:

```bash
npm install -g remove-console-logs
```

---

## Usage 🛠️

```bash
# Basic usage (process current directory)
remove-console-logs

# Target specific directory
remove-console-logs ./src

# Dry run (preview changes without modifying files)
remove-console-logs --dry-run

# Ignore specific paths
remove-console-logs --ignore "**/test/**,**/mocks/**"

# Comment out instead of removing
remove-console-logs --preserve
```

---

## Options 🔧

| Option       | Description                             |
| ------------ | --------------------------------------- |
| `--dry-run`  | Preview changes without modifying files |
| `--ignore`   | Comma-separated ignore patterns         |
| `--preserve` | Comment out instead of removing         |
| `--help`     | Show help                               |
| `--version`  | Show version number                     |

---

## Examples 📝

**Before:**

```javascript
// app.js
console.log('Debugging');
console.error('Error occurred');
```

**After:**

```javascript
// app.js
/* Production clean! */
```

**With `--preserve` flag:**

```javascript
// app.js
/* console.log('Debugging') */
/* console.error('Error occurred') */
```

---

## FAQ ❓

**Q: Is this safe to use?**
A: Yes! For extra safety:

* Use `--dry-run` first
* Commit your code before running
* Consider using `--preserve` flag

**Q: What console methods are removed?**
A: All standard methods: `log`, `error`, `warn`, `info`, `debug`, `table`, `time`, `timeEnd`, etc.

---

## License 📄

MIT © \[Your Name]

---

## Recommended Additions

* 📹 Add a GIF demo under **Usage**
* 🤝 Include a **Contributing** section if open source
* ✅ Add GitHub Actions/CI badges if available

---

Let me know if you want this localized or expanded further!
