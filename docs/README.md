# AI-Value Proposition Developer (Education) - GitHub Pages

This directory contains the static files for the GitHub Pages deployment.

## Live Demo

**GitHub Pages:** https://amper8and.github.io/ai-value-proposition-builder-edu/

## Files

- `index.html` - Main HTML page
- `static/` - Static assets (JavaScript, CSS, fonts)
  - `app.js` - Application logic
  - `data.js` - Mock data (30+ items, 5 blueprints)
  - `styles.css` - MTN branding styles
  - `fonts/` - MTN Brighter Sans font files
- `.nojekyll` - Prevents GitHub Pages from processing with Jekyll

## How It Works

This is a static single-page application that runs entirely in the browser:

1. **index.html** loads the application shell
2. **data.js** provides mock data for solution library and blueprints
3. **app.js** contains all application logic and UI rendering
4. **styles.css** applies MTN branding (Yellow #FFCB00, Black #000000)

## Local Development

To run locally, simply open `index.html` in a web browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Then open http://localhost:8000
```

## Features

- ✅ 5-Step Wizard workflow
- ✅ MTN South Africa branding
- ✅ 30+ solution components
- ✅ 5 prebuilt blueprints
- ✅ AI-assisted recommendations
- ✅ Dynamic pricing calculator
- ✅ Professional offer brief generator
- ✅ PDF export functionality
- ✅ Guided demo mode
- ✅ localStorage persistence

## Browser Compatibility

- ✅ Chrome 120+
- ✅ Firefox 121+
- ✅ Safari 17+
- ✅ Edge 120+

## Note

This is the GitHub Pages deployment. For the full Cloudflare Workers/Pages version with backend API endpoints, see the main repository.
