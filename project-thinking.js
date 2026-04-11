/**
 * @fileoverview Interactive UI project planning checklist.
 * Reference only — no runtime code. Use before building features.
 */

/**
 * YOUR PROJECT START CHECKLIST
 *
 * ── 1. Define the interaction ─────────────────────────────────────────
 * What is the user actually doing?
 *   - click?
 *   - type?
 *   - submit?
 *   - scroll?
 * If you can’t answer this clearly → stop.
 *
 * ── 2. Identify the trigger element ───────────────────────────────────
 * What exact element causes the action?
 * Think: e.target.closest("???")
 *
 * ── 3. Extract meaningful data ───────────────────────────────────────
 * What represents this action?
 *   - id
 *   - value
 *   - index
 *   - dataset
 * If there’s no data → your logic will break later.
 *
 * ── 4. Define your state (MOST IMPORTANT) ────────────────────────────
 * Ask: “What do I need to remember to make this work?”
 * Examples: activeId, selectedItems, isOpen, currentPage
 * Keep it minimal.
 *
 * ── 5. Define the rule (THIS is your logic) ──────────────────────────
 * Ask: “Given this action, how should state change?”
 * Examples: toggle, replace, add/remove, increment/decrement
 *
 * ── 6. Define UI outcome ─────────────────────────────────────────────
 * Ask: “If state = X, what should the UI look like?”
 * This is where most people guess — you won’t.
 */

/**
 * THE FLOW YOU MUST FOLLOW
 *   Event → Element → Data → State change → UI update
 */

/**
 * PERSONAL WEAK POINT (important)
 * You tend to: understand the logic, but struggle to translate it into steps.
 *
 * Fix: Before coding, always write the steps:
 *   1. detect click
 *   2. get element
 *   3. get id
 *   4. update state
 *   5. update UI
 * Then code each step.
 */

/**
 * HOW TO THINK LIKE A DEV
 * Instead of: “How do I code this?”
 * Ask: “What is the sequence of decisions happening here?”
 */

/**
 * GOLDEN RULE
 * Never jump to DOM manipulation first. Always define state first.
 */

/**
 * DEBUGGING FRAMEWORK — if something breaks, check in order:
 *   - Did event fire?
 *   - Did I get correct element?
 *   - Did I get correct data?
 *   - Did state update?
 *   - Did UI reflect state?
 */
