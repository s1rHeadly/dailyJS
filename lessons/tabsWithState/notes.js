/**
 * Define the flow (your turn)

//? Answer these in your own words:

//* 1. What is the user interaction?
// *2. What element triggers the interaction?

(Hint: similar to .faq-question)

// *3. What data do we need?

(Hint: how do we know which tab was clicked?)

//* 4. What is our state?

(Hint: very similar to accordion… but say it yourself)

//* 5 What is the rule?

(Hint: think: “what happens when I click a tab?”)

//* 6. What should the UI do?

(Hint: what happens to:

clicked tab
other tabs
content panels)
*/

/* 


Click tab
→ get id
→ update activeId
→ loop all tabs:
     if match → activate
     else → deactivate
→ loop all panels:
     if match → show
     else → hide

     */

// Pattern
// DOM → init state → event → update state → (next step: render UI)
