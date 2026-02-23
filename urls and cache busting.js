/**
 * Lesson: Fetch Requests, Query Strings, and Cache-Busting
 */

/**
 * 1️⃣ How Query Strings Work in a URL
 *
 * A URL can have query parameters after a `?`. Multiple parameters are separated by `&`.
 *
 * Example:
 */

let url = `https://example.com/page?userId=123&sort=asc`;

/**
 * Explanation:
 *
 * - ? → starts the query string
 * - userId=123 → key = userId, value = 123
 * - &sort=asc → key = sort, value = asc
 *
 * Notes:
 * - Multiple parameters are separated by &
 * - Keys can exist without values: ?debug is valid
 * - The server reads these key-value pairs to decide what to return
 * - Analogy: You're sending a package (URL) with a note (query parameters) telling the recipient exactly what you want
 */

/** 2️⃣ Basic Fetch in JS */

fetch(url)
  .then((response) => response.json()) // converts JSON string → JS object
  .then((data) => console.log(data)) // uses the data
  .catch((error) => console.error("Error fetching data:", error));

/**
 * Summary:
 * - fetch(url) → requests the URL
 * - .then(response.json()) → converts JSON text to JS object
 * - .then(data => …) → uses the data
 * - .catch() → handles errors
 */

/** 3️⃣ Cache-Busting With Fetch */

// Correct way: add '&_=' if URL already has query parameters
fetch(`${url}&_=${Date.now()}`, { cache: "no-store" })
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error fetching data:", error));

/**
 * Explanation:
 * - `_` → arbitrary key chosen for cache-busting
 * - `${Date.now()}` → inserts the current timestamp in milliseconds
 * - { cache: "no-store" } → tells the browser never to cache this request
 * - Every fetch request is now unique → no cached response will be returned
 * - This ensures dynamic data or tokens are always fresh
 */

/** 4️⃣ Optional: Periodic Refresh Example */

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

/**
 * Key Takeaways
 *
 * Query strings:
 * - ?key=value&key2=value2
 * - Keys can exist without values (?debug)
 *
 * Fetch:
 * - Used to request data from a server in JS
 * - Parse JSON with .then(response.json()) or await response.json()
 *
 * Cache-busting:
 * - _=${Date.now()} ensures unique URL each request
 * - { cache: "no-store" } prevents browser caching
 *
 * Real-world pattern:
 * - Use when fetching dynamic content (e.g., tokens, user-specific data)
 * - Combine with interval refresh for continuously updating data
 */

/**
 * 5️⃣ B. Client-Side / Dynamic Values
 * Sometimes you generate keys or values on the client side for:
 * - User input
 * - Filters / sorting / pagination
 * - Cache-busting / unique requests
 */

// Example: user input
{
  const userIdParam = 123;
  fetch(`https://example.com/api?userId=${userIdParam}`);
}

// Example: filters / sorting / pagination
{
  const sortParam = "asc";
  const pageParam = 2;
  fetch(`https://example.com/api?sort=${sortParam}&page=${pageParam}`);
}

// Example: cache-busting (query string must start with ?)
fetch(`https://example.com/api?_=${Date.now()}`, { cache: "no-store" });

/**
 * 6️⃣ C. Mixed
 * Often you combine server-required keys with dynamic or optional keys from the client.
 * - Server uses userId and sort to generate data
 * - _ is ignored by the server but ensures a fresh fetch
 */
{
  const userIdMixed = 123; // client-side dynamic
  const sortMixed = "asc"; // client-side dynamic
  const timestamp = Date.now(); // cache-busting

  const urlMixed = `https://example.com/api?userId=${userIdMixed}&sort=${sortMixed}&_=${timestamp}`;
  fetch(urlMixed, { cache: "no-store" });
}

/**
 * 7️⃣ How to know what keys/values to add
 * - Check the server/API docs → required keys
 * - Decide what's dynamic → client-side inputs, filters, user-specific values
 * - Optional keys → cache-busting, debug flags, tracking info
 * Build the URL dynamically with template literals:
 */
{
  const key1 = "abc";
  const key2 = 42;
  const urlBuilt = `https://example.com/api?key1=${key1}&key2=${key2}&_=${Date.now()}`;
}

// Real-World Example: Dynamic Query Builder

function buildUrl(baseUrl, params) {
  // params is an object: { key: value }
  let queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  // Add cache-busting
  queryString += `&_=${Date.now()}`;
  return `${baseUrl}?${queryString}`;
}

// Example usage:
const params = { userId: 123, sort: "asc", debug: true };
const urlBuilder = buildUrl("https://example.com/api", params);

console.log(url);
// Output: https://example.com/api?userId=123&sort=asc&debug=true&_=1677100023456
