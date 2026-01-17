# MTN Education Solution Developer (Demo)

## 🎓 Project Overview

A comprehensive web application demo that showcases an end-to-end workflow for MTN sales personnel to understand education client needs, configure solutions, calculate pricing, and generate professional offer briefs.

**Live Demo:** https://3000-i9njeg5efo295z4wbz32l-6532622b.e2b.dev

## ✨ Features Completed

### Core Functionality
- ✅ **5-Step Wizard Navigation** with progress tracking
- ✅ **Client Profile Management** with 8 configurable parameters
- ✅ **AI-Assisted Needs Assessment** with 6-category rating system
- ✅ **Solution Library** with 30+ components across 8 categories
- ✅ **Smart Recommendation Engine** with blueprint matching
- ✅ **Interactive Solution Builder** with drag-and-drop configuration
- ✅ **Dependency Validation** with smart warnings
- ✅ **Advanced Pricing Calculator** with discount and escalation
- ✅ **Professional Offer Brief Generator** with 7 sections
- ✅ **PDF Export Functionality** (browser print)
- ✅ **Copy to Clipboard** for easy sharing
- ✅ **Deal Persistence** with localStorage
- ✅ **Guided Demo Mode** with contextual tooltips
- ✅ **Real-Time Deal Summary** panel

### Data Models
- **5 Prebuilt Blueprints**:
  1. Always-On Connected School
  2. Safe Digital Classroom
  3. Data-Driven Education Ops
  4. Rural Resilience Pack
  5. District Communications & Engagement

- **30+ Solution Library Items** across:
  - Connectivity (8 items)
  - Devices & MDM (6 items)
  - Managed Security (5 items)
  - Cloud & Hosting (4 items)
  - Messaging & Engagement (4 items)
  - Data & Analytics (5 items)
  - Power Resilience (3 items)
  - Implementation & Support (5 items)

## 🚀 Demo URLs

### Main Application Entry Points

| Path | Description |
|------|-------------|
| `/` | Main application (starts at Client Profile) |
| `/health` | Health check endpoint |

### Functional Entry URIs

All navigation is client-side within the single-page application. The wizard has 5 steps:

1. **Step 0: Client Profile** - Initial landing page with pre-filled demo data
2. **Step 1: Needs Assessment** - Rate 6 need categories (0-5 scale) and generate AI recommendations
3. **Step 2: Solution Builder** - Browse 30+ items, build configuration, view validation warnings
4. **Step 3: Pricing & Commercials** - Adjust contract terms (12/24/36 months), discount (0-25%), view TCV
5. **Step 4: Offer Brief** - Review and export 7-section professional brief

## 📊 Data Architecture

### Storage Services
- **Browser localStorage** for demo persistence
  - `mtnEduDemoState` - Current wizard state
  - `mtnEduDeals` - Saved deal history

### Data Structures

**Client Profile:**
```javascript
{
  clientName: string,
  buyerType: "DBE"|"PED"|"District"|"Public School"|"TVET"|"University",
  province: string (9 SA provinces),
  numSites: number,
  numLearners: number,
  numTeachers: number,
  fundingPosture: "Budget Confirmed"|"Budget Pending"|"Donor / PPP",
  connectivityStatus: "None"|"Basic"|"Unreliable"|"Stable"
}
```

**Needs Assessment:**
```javascript
{
  reliability: 0-5,
  equity: 0-5,
  outcomes: 0-5,
  teacher: 0-5,
  safeguarding: 0-5,
  infrastructure: 0-5,
  discoveryNotes: string
}
```

**Solution Configuration:**
```javascript
[
  {
    itemId: string,
    quantity: number
  }
]
```

**Pricing:**
```javascript
{
  contractTerm: 12|24|36,
  discount: 0-25,
  escalation: boolean
}
```

## 🎯 User Guide

### Quick Start (2-Minute Demo Flow)

1. **Launch Application** → Pre-filled with realistic demo data (Gauteng District 12)
   
2. **Review Client Profile** → Click "Next: Needs Assessment"

3. **Rate Needs** (or use defaults):
   - Reliability: 4/5
   - Equity & Access: 5/5
   - Outcomes Measurement: 3/5
   - Teacher Capacity: 4/5
   - Safeguarding: 4/5
   - Infrastructure: 3/5
   
4. **Click "Generate Recommendations"** → AI suggests 3 blueprints, ranked by match score

5. **Select "Always-On Connected School"** (recommended #1)

6. **Review Solution Builder** → 8 components pre-loaded, add more if desired

7. **Next to Pricing** → Adjust discount slider to 15%, keep 24-month term

8. **View Commercials**:
   - Once-Off: ~R230,000
   - Monthly: ~R140,000
   - TCV: ~R3.6M
   
9. **Generate Offer Brief** → Review 7-section professional document

10. **Export to PDF** → Opens print dialog for PDF save

### Advanced Features

**Guided Demo Mode:**
- Toggle ON via sidebar button
- Animated tooltip guides next recommended action
- Contextual help for each step

**Solution Builder Tips:**
- Use category tree (left) to browse items
- Search bar filters by keywords
- Validation warnings appear when dependencies missing
- Configuration cart shows real-time pricing

**Deal Management:**
- "Save Deal" on Pricing screen stores to history
- "Reset Demo" clears all data and reloads
- All changes auto-save to localStorage

## 🛠️ Tech Stack

- **Backend:** Hono 4.x (lightweight web framework)
- **Deployment:** Cloudflare Pages/Workers
- **Frontend:** Vanilla JavaScript + Tailwind CSS
- **Icons:** Font Awesome 6.4
- **Storage:** Browser localStorage (demo persistence)

## 📁 Project Structure

```
webapp/
├── src/
│   └── index.tsx              # Hono backend
├── public/
│   └── static/
│       ├── data.js            # 30+ items + 5 blueprints
│       ├── app.js             # Main application logic (4800+ lines)
│       └── styles.css         # Custom CSS styles
├── dist/                      # Build output (auto-generated)
├── ecosystem.config.cjs       # PM2 configuration
├── package.json               # Dependencies
├── vite.config.ts             # Vite build config
├── wrangler.jsonc             # Cloudflare config
└── README.md                  # This file
```

## 🚀 Deployment

### Development (Local)

```bash
# Install dependencies (if not already installed)
npm install

# Build the application
npm run build

# Start development server
pm2 start ecosystem.config.cjs

# Check logs
pm2 logs mtn-edu-demo --nostream

# Stop server
pm2 stop mtn-edu-demo
```

### Production (Cloudflare Pages)

```bash
# Build for production
npm run build

# Deploy to Cloudflare (requires auth)
npm run deploy:prod
```

## 📝 Features Not Yet Implemented

### Backend Integration
- [ ] Real database persistence (currently uses localStorage)
- [ ] User authentication and multi-user support
- [ ] Deal versioning and history tracking
- [ ] Email notifications for offer briefs
- [ ] Advanced analytics and reporting

### Enhanced Functionality
- [ ] Custom blueprint creation
- [ ] Bulk import from Excel/CSV
- [ ] Deal comparison tool
- [ ] Approval workflow
- [ ] Integration with CRM systems

### Advanced Features
- [ ] Real AI/ML recommendation engine (currently rules-based)
- [ ] Automated site survey scheduling
- [ ] Live pricing updates from vendor APIs
- [ ] Document collaboration features
- [ ] Mobile app version

## 🔮 Recommended Next Steps

### Phase 1: Backend Integration (Priority: High)
1. **Database Setup**
   - Add Cloudflare D1 for relational data
   - Migrate localStorage to D1 tables
   - Add user authentication

2. **API Development**
   - Create RESTful API for CRUD operations
   - Add deal versioning endpoints
   - Implement search and filtering

### Phase 2: Enhanced UX (Priority: Medium)
1. **Comparison Tools**
   - Side-by-side blueprint comparison
   - Deal history with filtering
   - Export multiple deals to Excel

2. **Collaboration Features**
   - Share deals via unique URLs
   - Comment and feedback system
   - Approval workflow for managers

### Phase 3: Enterprise Features (Priority: Low)
1. **CRM Integration**
   - Salesforce API integration
   - Microsoft Dynamics connector
   - Custom webhook support

2. **Advanced Analytics**
   - Win/loss analysis dashboard
   - Revenue forecasting
   - Sales funnel metrics

## 🎬 Demo Walkthrough Script (1-2 Minutes)

**Opening (10 seconds):**
"This is the MTN Education Solution Developer, a tool that helps sales teams quickly configure and quote comprehensive education solutions."

**Act 1: Client Profile (15 seconds):**
"We start with a pre-filled client profile - Gauteng District 12, serving 18 schools with 8,500 learners. Their connectivity is unreliable, which is a key pain point."

**Act 2: Needs Assessment (20 seconds):**
"Next, we rate their priority needs across 6 categories. I'll click Generate Recommendations... and our AI instantly suggests 3 solutions ranked by fit. The Always-On Connected School is the best match at 94%."

**Act 3: Solution Builder (20 seconds):**
"Clicking Select Blueprint loads 8 pre-configured components. The solution builder shows all 30+ items in our library. Notice the validation warnings - when devices are added without MDM, the system recommends mobile device management."

**Act 4: Pricing (15 seconds):**
"On the pricing screen, we can adjust the contract term, apply a 15% discount, and see the commercials update in real-time. Total contract value is R3.6 million over 24 months."

**Act 5: Offer Brief (20 seconds):**
"Finally, we generate a professional 7-section offer brief with executive summary, implementation plan, KPIs, and risk mitigation. I can export this as PDF or copy to clipboard for immediate client delivery."

**Closing (10 seconds):**
"The entire process - from client discovery to ready-to-send proposal - takes under 5 minutes. This demo shows how we can accelerate the sales cycle for complex education deals."

---

## 📞 Support & Contact

**MTN Business Education Solutions**
- Email: education@mtn.co.za
- Phone: 083 123 4567

---

## 📄 License

Demo application - Internal use only

---

**Last Updated:** 2026-01-17  
**Version:** 1.0.0  
**Status:** ✅ Active Demo
