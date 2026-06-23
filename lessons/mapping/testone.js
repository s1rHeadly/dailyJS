// refactor to a dynamic map

function handleStatus(status) {
  if (status === "loading") {
    console.log("Loading...");
  } else if (status === "success") {
    console.log("Success!");
  } else if (status === "error") {
    console.log("Error!");
  }
}

function handleLoading() {
  console.log("Loading...");
}

function handleSuccess() {
  console.log("Success!");
}

function handleError() {
  console.log("Error!");
}

const statusObj = {
  loading: handleLoading,
  success: handleSuccess,
  error: handleError,
};

function getStatus(status) {
  const handler = statusObj[status];

  if (!handler) {
    console.log("Unknown status");
    return;
  }

  handler();
}
