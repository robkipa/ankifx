# AnkiMobile Tap & Card-Flip Behavior

This document explains how AnkiMobile handles tap events and how to design templates or elements to prevent accidental card-flips on interactive controls.

## Root Cause: Native-Level Gesture Recognition

AnkiMobile (the iOS client) does not use standard JavaScript event handlers to detect taps that flip cards. Instead:
- It uses a native-level **WKWebView Gesture Recognizer** (written in Swift/Obj-C).
- When a user taps, the native layer intercepts the touch coordinates and performs a hit-test to find the DOM element at that point.
- It traverses up the DOM ancestor chain from the tapped element, checking for interactive elements.
- Because this happens at the **native layer**, calling `stopPropagation()` or `preventDefault()` in standard JavaScript event listeners **cannot prevent the card from flipping** unless the native layer is explicitly told to ignore it.

## The Solution: `tappable` Class

To designate an element (or a section of the DOM) as interactive so that AnkiMobile's native layer ignores the tap-to-flip gesture and passes the event directly to JavaScript, you must use one of Anki's recognized mechanisms.

### 1. The `tappable` Class (Recommended)
Add the class `tappable` to any container or specific element that needs JavaScript interaction:
```html
<div class="afx-mcq-opt tappable">Option Text</div>
```
When AnkiMobile's hit-test traverses the DOM hierarchy, it checks if any element in the ancestor chain contains the `tappable` class. If it does, the native tap-to-flip gesture is aborted, allowing the JavaScript `click` or `touchstart/touchend` listeners to run normally.

### 2. Standard HTML Interactive Elements
AnkiMobile also ignores taps on elements that are natively interactive by definition in HTML:
- `<a>`
- `<button>`
- `<input>`
- `<select>`
- `<video>`
- `<summary>`
- Any element with an inline `onclick="..."` attribute (e.g. `onclick="void(0)"` or `onclick=""`). Note that dynamically added JS event listeners (`addEventListener`) do **not** trigger this native exception since they are not present in the static HTML attributes.

## Application in AnkiFX

In AnkiFX, interactive elements are handled in two ways depending on their location:

1. **Outside `#qa` (Overlay & Controls)**:
   The main overlay control bar (`#ankifx-overlay`) sits outside the native card question/answer block (`#qa`). The overlay utilizes CSS pointer-events (`pointer-events: none` on the container, `pointer-events: auto` on interactive dock items) and does not typically trigger card flips.
   
2. **Inside `#qa` (MCQ Options, Interactive Card Content)**:
   Because elements inside the card template markup (like MCQ option blocks) are within `#qa`, they are subject to AnkiMobile's native hit-testing. To prevent options from flipping the card on tap, both the options container and individual option cards must have the `tappable` class:
   ```html
   <div id="afxMcqOptions" class="afx-mcq-options tappable">
       <div class="afx-mcq-opt tappable" ...>...</div>
   </div>
   ```
