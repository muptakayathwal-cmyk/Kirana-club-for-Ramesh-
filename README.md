# Restocking for Ramesh · Kirana Club case study v2

**Live prototype:** https://muptakayathwal-cmyk.github.io/Kirana-club-for-Ramesh-/  
**Case study deck:** https://muptakayathwal-cmyk.github.io/Kirana-club-for-Ramesh-/deck.html

Designed by Manali Gupta. Version 3, November 2026.

## Put it online with GitHub Pages (about 5 minutes, no coding)

1. Sign in at github.com and click **New repository**. Name it `restocking-for-ramesh`, set it to **Public**, and click **Create repository**.
2. On the empty repo page click **uploading an existing file**. Unzip this folder on your computer, open it, select **everything inside it** (including `.nojekyll`, `icons`, `img`, `notes`) and drag it into the browser. Click **Commit changes**.
   On a Mac, press Cmd + Shift + . in Finder to see `.nojekyll`. If it does not upload, the site still works.
3. Go to **Settings > Pages**. Under "Build and deployment" choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. Wait one or two minutes and refresh. Your link appears at the top: `https://YOUR-USERNAME.github.io/restocking-for-ramesh/`

The prototype opens at that link. The deck is at `.../deck.html`.

**For a nice LinkedIn preview (optional):** in `index.html`, change `content="og-image.png"` to the full address, for example `content="https://YOUR-USERNAME.github.io/restocking-for-ramesh/og-image.png"`.

**When you change a file later:** upload the new file to the repo, then open `sw.js` and change `rfr-v2-1` to `rfr-v2-2` (and so on), so phones that installed the app pick up the update.

## Using it as an app on a phone

- Open the link on the phone. The prototype fills the whole screen. The **☰** button opens the tour, the personas and the language switch. During the guided tour, the step card sits on top and can be hidden.
- **Android (Chrome):** menu > **Add to Home screen** / **Install app**.
- **iPhone (Safari):** Share > **Add to Home Screen**.
- Once opened once, it works offline. Only the fonts need a connection the first time.

### Files added for hosting

| File | What it does |
| --- | --- |
| `app.js` | Phone layout (menu and tour card) and offline registration |
| `sw.js` | Offline cache |
| `manifest.webmanifest`, `icons/` | Lets phones install it with its own icon |
| `og-image.png` | Preview image when the link is shared |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

## What is in this folder

| File | What it is |
| --- | --- |
| `deck.html` | The case study deck, 36 slides, with live phones on the solution slides |
| `Restocking-for-Ramesh-deck.pdf` | The same deck as a PDF, for sharing by email |
| `index.html` | The full live prototype with personas, journey panel and language switch |
| `img/` | Product and shop photos (credits in `img/CREDITS.md`) |
| `notes/` | Manali's handwritten research notes used in the deck |

## How to open

1. Unzip and keep all files together in one folder.
2. Double-click `deck.html`. It opens in your browser. Use the arrow keys to move.
3. Click "Prototype" at the top right of the deck, or open `index.html`, for the full prototype.

An internet connection is only needed for the fonts. Chrome is recommended.

## The idea in one line

Restocking is a loop with four moments, not a list: **capture** needs all month, **compose** a Due Now basket, **confirm** in one cart, **check** on arrival. Kari, the AI helper, does the work. The shopkeeper makes the final tap.

## The 10 minute walkthrough

Open `index.html`. A welcome screen offers a **2 minute guided tour** of 16 steps: click "Start the guided tour", then use Next and Back (or the arrow keys). Each step opens the right screen and outlines what to look at. You can still tap anything inside the phone during the tour.

To explore by yourself instead: the phone is in the middle, the left panel jumps to any step, and the right panel switches persona and language.

### Ramesh, the old user

**01 Capture**

1. Tap the lock screen notification: "14 items are due now, plus 2 from your Yaad List."
2. On home, find the **Yaad List** card with two items he noted during the month.
3. Tap "+ Add a note". Type `clinic` or pick a chip, then "Add to Yaad List" or "Customer asked, I had none".

**02 Compose**

4. The hero shows the **Due Now** total and "Order this". The list below is in three bands: Due now, Due soon, Still stocked.
5. Tap a product name to open **Item History**: last three buys, price each time, next due date.
6. Under **My bundles**, tap "+ Add all" on a bundle.
7. Tap "See" on Kari's suggestions and apply one.
8. Tap "Call Kari" and tap the sample lines. Try "Add Good Day to my next order".

**03 Confirm**

9. Tap the cart icon. In Kari's double-check, use the **Fill-up Nudge** ("Take 4 more and save ₹100") and try **Budget Mode** (Kari holds back the least urgent items, then "Bring them back").
10. See the bill: bulk saving, chai combo, wallet cash. The green bar above the button shows what he saves and his margin. Choose khata, UPI or cash and place the order.

**04 Check**

11. On the order screen tap "Add more to this order", add an item, and confirm.
12. Tap "Demo: show next status" until delivered, then check the goods by list or by "Match from a photo of the bill".
13. Tap "Done". The short item comes off the khata and each item's rhythm resets.

### Sunita, the new user

1. Click "Sunita" in the right panel.
2. Pick a language, enter any 10 digits, tap "Fill from SMS", then name the shop.
3. Build the first list by talking to Kari, photographing a paper list, or taking a starter list.
4. Place the order by cash or UPI. Khata unlocks after the first order.

### Imran, the bulk buyer

1. Click "Imran" in the right panel and open his list.
2. His quantities are three times Ramesh's, every bulk slab is unlocked, and the budget options are larger.

### Hindi

Click "हिन्दी" in the right panel at any time. Every screen switches to Hindi script.

## What is real and what is sample

- **Real:** the whole loop for all three personas, Due Now, Yaad List, bundles, item history, fill-up, budget, add to order, Kari's understanding of the sample lines, khata and wallet arithmetic, bulk slabs, schemes, both languages.
- **Sample data:** prices, pack sizes, credit limits, each item's reorder interval, the suggestions, scan results, mandi rates, the poll result.
- **Not tested:** the real microphone, and the spoken voice for Kari and the Listen button.
- **Needs review:** the Hindi was written from a glossary and should be checked by a native writer.
- **Not research-backed yet:** Sunita and Imran are proto-personas; no retailer interviews have been done.

## Images

Photos come from Open Food Facts and Wikimedia Commons under open licences. Brand names and pack designs belong to their owners. Use for this case study only, not for publishing.
