# Bug Report

## 1. Initial image index could skip or miss the buffer-wrap refresh

- **Location:** `script.js`, `handleMouseOver`
- **Bug:** The original code checked `index == 0` before applying modulo normalization. It also initialized `index` to `1`, so the buffer boundary was not reliably detected and the preloaded side buffer was never swapped in consistently.
- **Fix:** The handler now starts at index `0`, uses modulo normalization after selecting each image, and calls `refreshImageBuffer()` exactly when the index wraps to `0`.

## 2. Buffer refresh could leave no valid images or swap state incorrectly

- **Location:** `script.js`, `addImageToBuffer` / `mainBuffer` refresh logic
- **Bug:** The old refresh function relied on undeclared global variables and one shared promise in a way that did not have explicit success or race protection. It could make the active buffer depend on an invalid or incomplete state.
- **Fix:** Replaced it with explicitly declared `mainBuffer`, `sideBuffer`, and `isRefreshing` state. A successful preload replaces the active buffer only when it contains at least one image, and concurrent refresh calls are prevented.

## 3. Async initialization failures were not caught

- **Location:** `script.js`, `init` invocation
- **Bug:** `try/catch` was wrapped around `init()` without `await`. A rejected promise from image loading bypassed the synchronous `catch`, leaving an initialization error with no user-facing feedback.
- **Fix:** `init()` contains an internal `try/catch`, and is invoked with `void init()`. Initialization now reports a clear loading error and logs the underlying failure.

## 4. Failed image requests were still added to the image buffer

- **Location:** `script.js`, `loadBuffer`
- **Bug:** The original function appended `response.url` even for failed requests and did not handle fetch exceptions, so the grid could receive invalid or empty image URLs.
- **Fix:** Every request now checks `response.ok`, returns `null` on failure or exception, filters null values, and rejects initialization if no usable image was loaded.

## 5. Grid creation started an unintended extra image load

- **Location:** `script.js`, `createBoxGrid`
- **Bug:** `createBoxGrid()` called `loadBuffer()` and discarded the result, causing an extra 10-image network request whenever the grid was built.
- **Fix:** Removed the unnecessary call. The grid is now responsible only for creating boxes.

## 6. An unnecessary grid array was allocated and never used

- **Location:** `script.js`, `createBoxGrid`
- **Bug:** The original function created a two-dimensional `Grid` array and stored DOM elements in it even though no code uses that array.
- **Fix:** Removed the unused array while preserving the loop that appends all boxes to the page.

## 7. The HTML lacked an active HTML5 doctype

- **Location:** `main.html`, first line
- **Bug:** The doctype was commented out, allowing older browser layout/quirks modes instead of standards mode.
- **Fix:** Restored `<!DOCTYPE html>` as the active first line.
