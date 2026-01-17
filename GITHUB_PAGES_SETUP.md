# GitHub Pages Setup Instructions

## ✅ Files Prepared and Pushed to GitHub

All necessary files for GitHub Pages have been created and pushed to your repository:
- `docs/index.html` - Main HTML page
- `docs/static/*` - All static assets (JS, CSS, fonts)
- `docs/.nojekyll` - Prevents Jekyll processing
- `docs/README.md` - Documentation

---

## 🚀 How to Enable GitHub Pages

Follow these steps to activate your GitHub Pages site:

### Step 1: Go to Repository Settings

1. Navigate to your GitHub repository:  
   **https://github.com/amper8and/ai-value-proposition-builder-edu**

2. Click the **⚙️ Settings** tab (top right)

### Step 2: Navigate to Pages Section

1. In the left sidebar, scroll down and click **Pages**
2. You should see "GitHub Pages" settings

### Step 3: Configure Source

Under **"Build and deployment"** section:

1. **Source:** Select **"Deploy from a branch"**
2. **Branch:** 
   - Select **`main`** from the dropdown
   - Select **`/docs`** from the folder dropdown
3. Click **Save**

### Step 4: Wait for Deployment

1. GitHub will automatically build and deploy your site
2. This takes 1-3 minutes
3. You'll see a message: "Your site is live at..."

### Step 5: Access Your Site

Your site will be available at:

**https://amper8and.github.io/ai-value-proposition-builder-edu/**

---

## 📸 Visual Guide

```
Settings → Pages
├── Source: Deploy from a branch
├── Branch: main
└── Folder: /docs
```

---

## ✅ Verification

Once deployed, you can verify:

1. ✅ Visit: https://amper8and.github.io/ai-value-proposition-builder-edu/
2. ✅ You should see the AI-Value Proposition Developer tool
3. ✅ MTN branding (Yellow #FFCB00, Black #000000)
4. ✅ All 5 steps working (Client Profile, Needs Assessment, etc.)
5. ✅ Fonts loading correctly

---

## 🔧 Troubleshooting

### If the page doesn't load:

1. **Check deployment status:**
   - Go to repository **Actions** tab
   - Look for "pages build and deployment"
   - Wait until it shows ✅ green checkmark

2. **Check Pages settings:**
   - Verify Branch is `main` and Folder is `/docs`
   - Click "Save" again if needed

3. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

4. **Wait a bit longer:**
   - First deployment can take 3-5 minutes

### If fonts don't load:

The fonts are self-hosted in `docs/static/fonts/` and should load automatically. If they don't:
1. Check browser console (F12) for errors
2. Verify the fonts are in the repository under `docs/static/fonts/`

---

## 🎯 What's Deployed

Your GitHub Pages site includes:

### Features
- ✅ 5-Step wizard workflow
- ✅ MTN branding (Yellow #FFCB00, Black #000000)
- ✅ MTN Brighter Sans fonts (Regular, Light, Bold)
- ✅ 30+ solution library items
- ✅ 5 prebuilt blueprints
- ✅ AI-assisted recommendations
- ✅ Dynamic pricing calculator
- ✅ Offer brief generator with PDF export
- ✅ Guided demo mode
- ✅ localStorage persistence

### Technology
- Pure client-side (no backend required)
- Tailwind CSS for styling
- Font Awesome for icons
- Vanilla JavaScript (no framework)
- Works on all modern browsers

---

## 🔄 Updating Your Site

Whenever you make changes:

```bash
# 1. Make changes to files in docs/ folder
# 2. Commit and push
git add docs/
git commit -m "Update GitHub Pages"
git push origin main

# 3. GitHub automatically rebuilds the site (1-3 minutes)
```

---

## 📊 Custom Domain (Optional)

To use a custom domain like `valueproposition.yourdomain.com`:

1. Go to **Settings → Pages**
2. Under **"Custom domain"**, enter your domain
3. Follow GitHub's instructions to configure DNS
4. Enable **"Enforce HTTPS"** (recommended)

---

## 🌐 Sharing Your Site

Share this URL with stakeholders:

**https://amper8and.github.io/ai-value-proposition-builder-edu/**

Perfect for:
- Client demos
- Internal training
- Sales team access
- Stakeholder reviews

---

## 📱 Mobile Compatibility

Note: The site is optimized for desktop browsers. For best experience:
- Use desktop/laptop (minimum 1024px width)
- Chrome, Firefox, Safari, or Edge
- Disable browser extensions that may interfere

---

## 🎉 Next Steps After Deployment

1. ✅ Test the live site
2. ✅ Share with your team
3. ✅ Gather feedback
4. ✅ Make updates as needed
5. ✅ Consider adding analytics (Google Analytics, etc.)

---

**Ready to enable GitHub Pages?**  
Follow the steps above and your site will be live in minutes! 🚀
