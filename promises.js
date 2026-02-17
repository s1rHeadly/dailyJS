/**
 * Basic Promise with resolve reject
 */

const myPromise = new Promise((resolve, reject) => {
  const success = "true";

  if (success) {
    resolve("Data is ready");
  } else {
    reject("Nothing found");
  }
});

/**
Important mental model
Promises don’t magically know what’s a success or failure.
You, the developer, decide: “This counts as success → resolve. This counts as failure → reject.”
After that, .then handles resolve, .catch handles reject.
*/

// ============
// API EXAMPLE
// ============

// step 1 = get the user data from the API

/*

fetchGitHubUser returns a Promise.
resolve(data) → called when the API succeeds.
reject(error) → called when the API fails (404 or network error).
showGitHubUser is async, and await waits for the Promise.
try/catch handles any rejection.

*/
function fetchGitHubUser() {
  return new Promise((resolve, reject) => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (!response.ok) {
          reject(`User not found at ${response.status}`);
        }
        return response.json(); // return the json if ok
      })
      .then((data) => resolve(data))
      .catch((error) => console.log(error));
  });
}

// step 2
