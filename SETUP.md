# Setup Guide — Portfolio v2.1

This version is built for **GitHub Pages** + **Formspree** — no servers, no build step, no environment variables. Upload the files and it works.

---

## 1. Publish to GitHub Pages

1. Open your GitHub repo (`calvin-portfolio`) in the browser.
2. Click **Add file → Upload files**.
3. On your computer, open the unzipped `portfolio-v2/` folder. Select **all files and folders INSIDE it** (Cmd+A / Ctrl+A) — not the folder itself.
4. Drag them into GitHub. Scroll down, click **Commit changes**.
5. Go to **Settings → Pages**. Under "Build and deployment", make sure Source is **Deploy from a branch**, Branch is **main**, Folder is **/ (root)**. Save.
6. Wait 30–60 seconds, then refresh your live site URL.

> **Troubleshooting**: If the page shows up unstyled, your `css/` or `js/` folder on GitHub is probably empty. Open each folder *first*, then drag files into it.

---

## 2. Make the contact form actually work (Formspree)

The form is currently in **fallback mode** — it will open the visitor's email app with their message pre-filled. That works, but for a real "submit and done" experience, do this:

### Step-by-step

1. Go to **https://formspree.io** and click **Sign up** (free — no credit card).
2. Verify your email (`calvinwilliams772@gmail.com`).
3. In the Formspree dashboard, click **+ New Form**.
4. Give it a name like "Portfolio Contact". For the receiving email, use `calvinwilliams772@gmail.com`. Click **Create Form**.
5. Formspree gives you an **endpoint URL** that looks like this:
   ```
   https://formspree.io/f/xyzabcde
   ```
   You only need the part after `/f/` — the **form ID** (`xyzabcde` in this example).
6. In your repo, open `js/data.js`. Find this line near the top:
   ```js
   formspreeId: "YOUR_FORMSPREE_ID",
   ```
   Replace `YOUR_FORMSPREE_ID` with your actual form ID:
   ```js
   formspreeId: "xyzabcde",
   ```
7. Commit the change. GitHub Pages redeploys in ~30 seconds.
8. Open your live site, fill in the contact form, and submit. Check your inbox — the message should arrive.

### Formspree free tier

- 50 submissions / month
- Spam filtering built in
- No credit card required
- Upgrade to $10/mo only if you outgrow the free tier

---

## 3. Updating content

Everything editable lives in `js/data.js`. No HTML edits needed.

- **Projects** → `projects: [...]`
- **Awards & Achievements** → `awards: [...]`
- **Certifications** → `certifications: [...]`
- **Social links** → `socials: [...]` (entries with `url: "#"` stay hidden)

After editing, commit & push — GitHub Pages redeploys automatically.

## 4. Updating images

Replace files in `/assets/` — **keep the exact same filenames**:
- `calvin.jpg` — your portrait (hero)
- `logo.jpg` — the gold "III" logo
- `intel-dashboard.jpg` — Tableau screenshot on the Intel project

## Troubleshooting

**Form shows "Couldn't send through the form right now."**
You probably haven't pasted your real Formspree form ID into `data.js` yet, or pasted the full URL instead of just the ID. The ID is the part after `/f/`.

**Form submits but no email arrives.**
Check your Formspree dashboard — the first submission requires you to confirm the destination email. Also check spam.

**"Page not found" after uploading.**
Make sure `index.html` is at the root of the repo, not inside a `portfolio-v2/` subfolder.

**Styling is broken / looks like plain HTML.**
`css/style.css` didn't upload. Open the `css/` folder in GitHub first, THEN drag the file in.
