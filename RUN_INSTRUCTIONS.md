# MTN Education Solution Developer - Run Instructions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or similar package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

---

## 📦 Installation

```bash
# Clone or navigate to project directory
cd webapp

# Install dependencies (if not already installed)
npm install

# Verify installation
npm run build
```

---

## 🏃 Running the Application

### Option 1: Development Mode (Recommended for Local Testing)

```bash
# Build the application first
npm run build

# Start with PM2 (daemon process)
pm2 start ecosystem.config.cjs

# Verify it's running
pm2 list

# Check logs
pm2 logs mtn-edu-demo --nostream

# Access the application
# Open browser to: http://localhost:3000
```

### Option 2: Direct Wrangler Dev Server

```bash
# Build first
npm run build

# Run wrangler pages dev directly (foreground process)
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000

# Open browser to: http://localhost:3000
```

### Option 3: Vite Dev Server (for Frontend Development)

```bash
# Run Vite dev server (hot reload enabled)
npm run dev

# Open browser to: http://localhost:5173
```

---

## 🛑 Stopping the Application

### If using PM2:
```bash
# Stop the service
pm2 stop mtn-edu-demo

# Or delete it completely
pm2 delete mtn-edu-demo
```

### If using direct wrangler/vite:
```bash
# Press Ctrl+C in the terminal
```

---

## 🔧 Troubleshooting

### Port 3000 is already in use

```bash
# Kill any process on port 3000
fuser -k 3000/tcp

# Or find and kill manually
lsof -ti:3000 | xargs kill -9

# Then restart the application
pm2 start ecosystem.config.cjs
```

### Application won't start

```bash
# Check PM2 status
pm2 list

# View detailed logs
pm2 logs mtn-edu-demo

# Restart with fresh build
npm run build
pm2 restart mtn-edu-demo

# If still failing, delete and restart
pm2 delete mtn-edu-demo
pm2 start ecosystem.config.cjs
```

### Changes not reflecting

```bash
# Rebuild the application
npm run build

# Restart the service
pm2 restart mtn-edu-demo

# Or for hard reset
pm2 delete mtn-edu-demo
pm2 start ecosystem.config.cjs
```

### Browser shows blank page

1. Check browser console (F12) for errors
2. Verify the server is running: `pm2 list`
3. Test health endpoint: `curl http://localhost:3000/health`
4. Clear browser cache and reload (Ctrl+Shift+R)
5. Try incognito/private mode

---

## 🌐 Accessing from Another Device

If you want to access the demo from another device on the same network:

```bash
# Find your local IP address
ip addr show | grep inet

# Example output: 192.168.1.100

# Start the server with 0.0.0.0 binding (already configured in ecosystem.config.cjs)
pm2 start ecosystem.config.cjs

# Access from another device:
# http://192.168.1.100:3000
```

**Note:** Ensure your firewall allows incoming connections on port 3000.

---

## 📊 Useful Commands

### PM2 Commands
```bash
# List all running processes
pm2 list

# Show detailed info for mtn-edu-demo
pm2 show mtn-edu-demo

# Monitor real-time metrics
pm2 monit

# View logs (live stream)
pm2 logs mtn-edu-demo

# View logs (static snapshot)
pm2 logs mtn-edu-demo --nostream

# Restart the service
pm2 restart mtn-edu-demo

# Stop the service
pm2 stop mtn-edu-demo

# Delete from PM2
pm2 delete mtn-edu-demo

# Save PM2 process list
pm2 save

# Resurrect saved processes after reboot
pm2 resurrect
```

### Development Commands
```bash
# Clean build artifacts
rm -rf dist/

# Fresh build
npm run build

# Clean port and restart
npm run clean-port && pm2 start ecosystem.config.cjs

# Test endpoint
npm run test

# Or manually
curl http://localhost:3000/health
```

---

## 🧪 Testing the Application

### Manual Testing Checklist

1. **Landing Page**
   - [ ] Page loads without errors
   - [ ] MTN logo visible
   - [ ] "Demo Mode" badge present
   - [ ] 5 steps visible in sidebar
   - [ ] Deal Summary panel on right

2. **Client Profile (Step 1)**
   - [ ] All 8 fields pre-filled with demo data
   - [ ] Fields are editable
   - [ ] "Next" button works
   - [ ] Deal Summary updates when fields change

3. **Needs Assessment (Step 2)**
   - [ ] 6 sliders visible with ratings
   - [ ] Sliders are adjustable (0-5)
   - [ ] Discovery Notes text area works
   - [ ] "Generate Recommendations" button works
   - [ ] 3 blueprint cards appear after generation
   - [ ] "Select Blueprint" buttons work

4. **Solution Builder (Step 3)**
   - [ ] Selected blueprint shows at top
   - [ ] 8 categories visible in left panel
   - [ ] Items load when category selected
   - [ ] Search box filters items
   - [ ] "Add" button adds to cart
   - [ ] Configuration cart shows added items
   - [ ] Quantity adjustments work
   - [ ] Remove buttons work
   - [ ] Validation warnings appear when appropriate

5. **Pricing & Commercials (Step 4)**
   - [ ] Contract term selector works (12/24/36)
   - [ ] Discount slider works (0-25%)
   - [ ] Escalation toggle works
   - [ ] 4 summary cards show correct totals
   - [ ] Line items table displays all components
   - [ ] Revenue breakdown chart visible
   - [ ] "Save Deal" button works
   - [ ] Numbers update in real-time

6. **Offer Brief (Step 5)**
   - [ ] All 7 sections render correctly
   - [ ] Client data appears in brief
   - [ ] Components listed by category
   - [ ] Pricing summary accurate
   - [ ] "Copy to Clipboard" works
   - [ ] "Export to PDF" opens print dialog

7. **Global Features**
   - [ ] Navigation between steps works in both directions
   - [ ] Deal Summary panel updates across all steps
   - [ ] "Guided Demo" toggle works
   - [ ] Tooltips appear when Guided Demo is ON
   - [ ] "Reset Demo" clears data and reloads
   - [ ] Data persists after page reload (localStorage)

### Automated Testing
```bash
# Health check
curl -s http://localhost:3000/health | jq

# Expected output:
# {
#   "status": "healthy",
#   "service": "MTN Education Solution Developer",
#   "timestamp": "2026-01-17T..."
# }
```

---

## 📱 Browser Compatibility

Tested and working on:
- ✅ Chrome 120+
- ✅ Firefox 121+
- ✅ Safari 17+
- ✅ Edge 120+

Not recommended:
- ❌ Internet Explorer (not supported)
- ⚠️ Mobile browsers (responsive design not optimized)

---

## 🔐 Security Notes

This is a **demo application** with no authentication or sensitive data handling. For production:

1. Add user authentication
2. Implement RBAC (Role-Based Access Control)
3. Use environment variables for configuration
4. Enable HTTPS/TLS
5. Add rate limiting
6. Implement CSRF protection
7. Sanitize all inputs
8. Add audit logging

---

## 📈 Performance

Expected performance on standard hardware:

- **Initial Load:** <2 seconds
- **Step Navigation:** <100ms
- **Recommendation Generation:** <500ms
- **Pricing Calculation:** <100ms
- **Offer Brief Generation:** <200ms
- **PDF Export:** 2-3 seconds (browser-dependent)

---

## 🐛 Known Issues

1. **PDF Export Quality:** Uses browser print dialog, layout may vary by browser
2. **Mobile Layout:** Not optimized for mobile devices (desktop-first design)
3. **Data Persistence:** Uses localStorage only, data lost if browser cache cleared
4. **Offline Mode:** Requires internet for CDN resources (Tailwind, Font Awesome)

---

## 💡 Tips for Best Experience

1. **Use Chrome or Edge** for best performance and print quality
2. **Maximize browser window** to see all panels properly
3. **Clear localStorage** if experiencing issues: Press F12 → Application → Local Storage → Clear
4. **Disable browser extensions** that may interfere with JavaScript
5. **Use incognito mode** for fresh demo sessions

---

## 📞 Support

For technical issues or questions:
- Check logs: `pm2 logs mtn-edu-demo`
- Review browser console (F12)
- Restart the service: `pm2 restart mtn-edu-demo`
- Rebuild from scratch: `npm run build && pm2 restart mtn-edu-demo`

---

**Last Updated:** 2026-01-17  
**Version:** 1.0.0
