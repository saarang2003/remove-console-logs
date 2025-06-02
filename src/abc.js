// fake1.js

function sum(a, b) {
  console.log("Calculating sum...");
  return a + b;
}

const result = sum(10, 20);
console.info("Result is:", result);

if (result > 10) {
  console.warn("Result exceeds 10");
}

(() => {
  console.debug("Immediately Invoked Function Expression");
})();

for (let i = 0; i < 3; i++) {
  console.count("Loop Iteration");
}

console.table([
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
]);

// Non-console line
alert("Done!");
