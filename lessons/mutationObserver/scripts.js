(function () {
  // we are goin to add comments dynamically into the DOM
  // then using the mutation observer to look at the amount of comments (children in the comments container)
  // then update the counter based on those amount of children

  //vars
  const addCommentBtn = document.getElementById("add-comment");
  const commentSection = document.getElementById("comment-section");
  const counter = document.getElementById("counter");

  // =====================
  // Add a new comment
  // =====================
  function addComment() {
    const newComment = document.createElement("p");
    newComment.className = "comment";
    newComment.textContent = "A new comment";
    // insert into DOM
    commentSection.insertAdjacentElement("beforeend", newComment);
    console.log({ commentSection });
  }

  // =====================
  // Set up MutationObserver
  // =====================
  function setUpObserver() {
    // Callback function runs when mutations are detected

    //? 1 create the observerCallback shell
    //? 2 create the observer, then the config and then .observe
    //? 3 flesh out the observerCallback shell

    const observerCallback = (mutationList) => {
      console.log({ mutationList });
      for (let item of mutationList) {
        console.log({ item });

        // Only care about added child nodes
        if (item.type === "childList" && item.addedNodes.length > 0) {
          counter.textContent = commentSection.children.length;

          console.log(
            "Observer triggered! Total comments:",
            commentSection.children.length,
          );
        }
      }
    };

    const observer = new MutationObserver(observerCallback);
    const config = { childList: true };
    observer.observe(commentSection, config); //we are observing the comment section children
  }

  // =====================
  // Event listeners
  // =====================
  function listeners() {
    addCommentBtn.addEventListener("click", function () {
      addComment();
    });
  }

  // =====================
  // Initialize
  // =====================
  function init() {
    listeners();
    setUpObserver();
  }

  init();
})();
