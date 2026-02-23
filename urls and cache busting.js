/**
 * Lesson: Fetch Requests, Query Strings, and Cache-Busting
 */

/* 1️⃣ How Query Strings Work in a URL

A URL can have query parameters after a `?`. Multiple parameters are separated by `&`.

Example:
*/

let url = `https://example.com/page?userId=123&sort=asc`;

/**
Explanation:

? → starts the query string

userId=123 → key = userId, value = 123

&sort=asc → key = sort, value = asc

Notes:
- Multiple parameters are separated by &
- Keys can exist without values: ?debug is valid
- The server reads these key-value pairs to decide what to return
- Analogy: You’re sending a package (URL) with a note (query parameters) telling the recipient exactly what you want
*/

/* 2️⃣ Basic Fetch in JS */

fetch(url)
  .then((response) => response.json()) // converts JSON string → JS object
  .then((data) => console.log(data)) // uses the data
  .catch((error) => console.error("Error fetching data:", error));

/**
Summary:
- fetch(url) → requests the URL
- .then(response.json()) → converts JSON text to JS object
- .then(data => …) → uses the data
- .catch() → handles errors
*/

/* 3️⃣ Cache-Busting With Fetch */

// Correct way: add '&_=' if URL already has query parameters
fetch(`${url}&_=${Date.now()}`, { cache: "no-store" })
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error fetching data:", error));

/**
Explanation:
- `_` → arbitrary key chosen for cache-busting
- `${Date.now()}` → inserts the current timestamp in milliseconds
- { cache: "no-store" } → tells the browser never to cache this request
- Every fetch request is now unique → no cached response will be returned
- This ensures dynamic data or tokens are always fresh
*/

/* 4️⃣ Optional: Periodic Refresh Example */

setInterval(async () => {
  try {
    const response = await fetch(`${url}&_=${Date.now()}`, {
      cache: "no-store",
    });
    const data = await response.json();
    console.log("Refreshed data:", data);
  } catch (err) {
    console.error("Error refreshing data:", err);
  }
}, 5000); // refresh every 5 seconds
