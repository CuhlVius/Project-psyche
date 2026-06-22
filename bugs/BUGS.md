# Bug Log - Project: Psyche

### Symbols used:
- 🐛 bug
- 🔍 cause / examine
- 🔧 fix
- 💡 idea
- 👀 thing to watch
- ⚠️ warning / careful
- ✅ correct
- ❌ wrong

## 2026-06-20
### **`CSS`** - Clouds overflow

- **🐛:** Text extends beyond the cloud image
<br>![cloud overflow](bug-images/cloud-overflow.png)</br>

- **🔍:** font-size too big for cloud max-width
- **🔧:** Reduced font-size + added maxlength to input in thoughts.html + fixed image shape!
<br>![cloud overflow fixed](bug-images/cloud-overflow-fixed.png)</br>

- **💡:** font-size, text width, and image size all have to agree. When text overflows, sometimes the fix is a better-shaped img, not more CSS.
---

### **`JS`** - Uncaught ReferenceError: thoughtText is not defined

- **🐛:** No Cloud is appearing after hitting enter

![uncaught-reference-error](bug-images/uncaught-reference-error.png)

- **🔍:** not defined: mismatched variable name → code below will never run → no clouds apear after hitting enter!

- **🔧:** match the names
```js
// Text create
const thoughtTextCloud = document.createElement("span");
thoughtTextCloud.classList.add("thought-text");
thoughtTextCloud.textContent = thoughtInput.value;
```
- **💡:** "not defined" = the variable name doesn't exist (usually a typo or mismatched name). Different from "null" = the element wasn't found on the page.

## 2026-06-21
### **`CSS`** - `doneButton` apears after pressing any key.
- **🐛:** `doneButton` is created after pressing any button
- **🔍:** the `else`❌ ran on *every* non-Enter keypress → button appeared immediately, not after 4 clouds.
- **🔧:** Use if instead to specify the action. `if (inputCounter === 4)✅ `
- **💡:** `else` triggers on ALL false cases. For independent checks, use a separate `if`
---
### **`CSS`** - `doneButton` and input field are not adjusted
- **🐛:** `doneButton` pushes the input field to the left.

![done button no push](/bugs/bug-images/done-button-push-text-field.png)

- **🔍** all got `display: flex;` but no one got something like `position: absolute;`
- **🔧:** using `position: absolute;` at `doneButton`.
- **💡:** `position: absolute;` on `doneButton` → not part of `display: flex;` anymore → now adjust the rest.

![done button no push](/bugs/bug-images/done-button-no-push.png)
---

### **`CSS`** - adjusted boxes have erratic behavior despite the settings
- **🐛:** Clouds are above the input field.
- **🔍:** `display: flex;`-configs manipulate uncontrolled
- **🔧:** use `border: _px solid _rgb` to understand the positions → fix.
<br>![done button no push](/bugs/bug-images/use-border.png)</br>

- **💡:** `display: flex` → `justify-content` and `align-items`, use `top`, `bottom`, `right`, `left`

---

### **`CSS`** - `background` shorthand wipes my settings

- **🐛:** Background stopped using `cover` image showed at wrong size.
- **🔍:** `background: url(...)` is shorthand → it silently resets `background-size` `-position`, `-repeat` to defaults.
- **🔧:** `background: url(...)` ❌ → `background-image: url(...)` ✅ 
- **💡** A shorthand resets every sub-property it covers, even ones you didn't write. Using long-hand to keep other settings.

---

### **`HTML`** - screen background only works when id is on `<body>`

- **🐛:** Have to repeat the background settings on every screen, it never worked from `body` alone.
- **🔍:** My `id="screen-1-home"` is defined in a separate `<div>`, not in the `body`.
- **🔧:** `<div id="screen-1-home">`❌ `<body id="screen-1-home">`✅
- **💡:** background doesn't inherit, setting it on `body` won't automatically apply to a CHILD-`<div>` the CHILDren would need its own background. Putting the `id` on `<body>` means body itself carries the image, so it fills the viewport.

## 2026-06-22

### **`CSS`** - `bottom: 50%` does nothing

* 🐛: move `#info-text` up with `bottom: 50%` → nothing happened
* 🔍: `%` in `top`/`bottom`/`height` is measured against the PARENTs's size. `#row` had no height set → 50% of (basically) 0 is still 0.
* 🔧: `bottom: 50%` ❌ → `bottom: 50px` ✅ fixed value, ignores PARENT (or give PARENT height so the % has something to measure against)
* 💡: When a `%` value "does nothing", first question: what's the PARENT, and does it have a size? Same trap bites `height: 100%`.
---
### **`CSS`** - mystery gap under `#info-text` (`<p>`)

* 🐛: A gap stayed under the info text even with `align-items: flex-end` on the row. Bottom edges wouldn't line up.
* 🔍: Browsers give `<p>` a default `margin-top`/`margin-bottom` I never wrote. That invisible bottom margin pushed it up off the flex-end line.
* 🔧: Added `margin: 0;` to `#info-text` → gap gone.
* 💡: Spacing "out of nowhere" = suspect default browser styles first. `margin: 0` overrieds the browser's hidden default.
---
### **`CSS`** - lining up bottom edges in a flex row

- **🐛**: `#info-text`, input, and done-button wouldn't sit on the same bottom line.
- **🔍**: `align-items: center` was centering them; also the tallest CHILD (done-button, 220px) silently defines the row height, so shorter CHILDren get margin gaps.
- **🔧**: `align-items: flex-end;` on `#row` → all CHILDren align bottoms. (`align-self: flex-end` does it for ONE CHILD only.)
- **💡**: In flexbox the tallest CHILD sets the line height; alignment is measured against that line.
---
### **`CSS`** - overlay pinned to the wrong place (top-left of page)

- **🐛**: The `::after` shine appeared in the top-left corner of the whole page instead of on the box.
- **🔍**: `position: absolute` pins to the nearest PARENT that has `position: relative`. The box had none → shine anchored to the whole page.
- **🔧**: PARENT `#thought-counter` → `position: relative` + `overflow: hidden`. CHILD `::after` → `position: absolute; top:0; left:0; width:100%; height:100%`.
- **💡**: The overlay pattern = anchor + fill. PARENT `relative` and CHILD `absolute` + `0/0/100%/100%` covered `100%`.
- **👀**: `::after` needs `content: "";` or the layer doesn't exist at all.
---
### **`JS`** - null crash loops forever

- **🐛**: On index.html the console spams the same error hundreds of times (252+), never stops.
- **🔍**: script.js is shared across both pages. The typewriter code uses `thoughtInput`, but the input box only exists on thoughts.html. On index.html `thoughtInput` = null. That line lives inside a `setInterval(..., 120)` -> it retries every 120ms forever -> the null crash repeats infinitely.
- **🔧**: Wrapped the whole typewriter block in `if (thoughtInput) { ... }` so it's skipped entirely when the input doesn't exist on the page.
- **💡**: A bug inside a repeating timer (`setInterval`) repeats WITH the timer -> one mistake becomes infinite spam.
- **👀**: When shared JS runs on multiple pages, guard every block that touches a page-specific element with `if (element) { ... }`. An element missing on one page = null = crash there.
---
### **`ENV`** - file:// security errors & caching weirdness

- **🐛**: "Unsafe attempt to load URL... file: URLs are unique security origins" + "content not cached", when open index.html directly.
- **🔍**: Opening files by double-click runs them as file:// → browser reports...
- **🔧**: Run a local server (Live Server in VS Code → "Go Live") → pages load over http:// instead.
- **💡**: file:// = isolated/locked-down. Not a code bug — an environment thing. 
## 2026-06-23
