/**
performance.now() gives you a very precise timestamp used to measure how long something takes.
Unlike Date.now(), it is designed specifically for performance timing.
*/

const number = 10;

const start = performance.now();
console.log({ start });

for (let i = 0; i < number; i++) {
  console.log(i);
}

const end = performance.now();
console.log({ end });

console.log(`time: ${end - start}`); // 0.800000011920929

//example

document.addEventListener("click", (e) => {
  const link = e.target.closest("a");

  if (!link) return;

  const data = {
    text: link.textContent.trim(),
    url: link.href,
    timestamp: performance.now(),
  };

  console.log(data);
});

/**
Result: {
  text: "Pricing",
  url: "/pricing",
  timestamp: 5231.44
}
*/

//exmaple of page load
window.addEventListener("load", () => {
  console.log("Page loaded in", performance.now(), "ms");
});
