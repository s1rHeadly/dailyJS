(function () {
  "use strict";

  let myObj = [];

  const form = document.querySelector("#trainingForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    const target = e?.target;
    if (!target) return;

    e.preventDefault();
    // grab the inputs from the form since this references the form
    const formData = new FormData(this);
    console.log(formData);
    /**
     *  FormData is not a plain object, it’s an iterable object.
        Logging it directly in Chrome/Firefox will usually show empty object {} or just [object FormData].
        That doesn’t mean it’s empty — it actually has your form fields.
    */

    const dataObj = Object.fromEntries(formData.entries());
    console.log({ dataObj }); // here we can see the object

    //loop over the object to get an item
    for (let [name, value] of formData.entries()) {
      console.log({ [name]: value }); //
      myObj = { ...myObj, [name]: value }; // myObj now becomes a single object with all key/value pairs:
    }

    console.log(myObj);

    // reset the form
    form.reset();
    // reset the myObj
    let myObj = [];
  });
})();
