// MTN Education Solution Developer - Mock Data

// Solution Library Items (30+ items across categories)
export const solutionLibrary = [
  // Connectivity (8 items)
  {
    id: 'conn-001',
    name: 'LTE Campus Network (5Mbps)',
    category: 'Connectivity',
    description: 'Reliable 5Mbps LTE connectivity for small schools (up to 200 learners)',
    chargeType: 'per-month',
    unitPrice: 1200,
    defaultQuantityRule: 'per-site',
    dependencies: []
  },
  {
    id: 'conn-002',
    name: 'LTE Campus Network (10Mbps)',
    category: 'Connectivity',
    description: 'Reliable 10Mbps LTE connectivity for medium schools (200-500 learners)',
    chargeType: 'per-month',
    unitPrice: 2100,
    defaultQuantityRule: 'per-site',
    dependencies: []
  },
  {
    id: 'conn-003',
    name: 'Fibre Campus Network (20Mbps)',
    category: 'Connectivity',
    description: 'High-speed 20Mbps fibre connectivity for large schools (500+ learners)',
    chargeType: 'per-month',
    unitPrice: 3500,
    defaultQuantityRule: 'per-site',
    dependencies: []
  },
  {
    id: 'conn-004',
    name: 'Fibre Campus Network (50Mbps)',
    category: 'Connectivity',
    description: 'Ultra-fast 50Mbps fibre connectivity for districts/universities',
    chargeType: 'per-month',
    unitPrice: 6800,
    defaultQuantityRule: 'per-site',
    dependencies: []
  },
  {
    id: 'conn-005',
    name: 'SD-WAN Multi-Site Management',
    category: 'Connectivity',
    description: 'Centralized network management for districts with 5+ sites',
    chargeType: 'once-off',
    unitPrice: 25000,
    defaultQuantityRule: 'per-district',
    dependencies: []
  },
  {
    id: 'conn-006',
    name: 'WiFi Access Point (Indoor)',
    category: 'Connectivity',
    description: 'Enterprise-grade indoor WiFi AP (50+ concurrent users)',
    chargeType: 'once-off',
    unitPrice: 4500,
    defaultQuantityRule: 'per-site',
    dependencies: []
  },
  {
    id: 'conn-007',
    name: 'WiFi Controller & Management',
    category: 'Connectivity',
    description: 'Cloud WiFi controller for centralized AP management',
    chargeType: 'per-month',
    unitPrice: 850,
    defaultQuantityRule: 'per-site',
    dependencies: ['conn-006']
  },
  {
    id: 'conn-008',
    name: 'Failover 4G Backup Link',
    category: 'Connectivity',
    description: 'Automatic failover to 4G when primary link fails',
    chargeType: 'per-month',
    unitPrice: 680,
    defaultQuantityRule: 'per-site',
    dependencies: []
  },

  // Devices & MDM (6 items)
  {
    id: 'dev-001',
    name: 'MTN EduTab Basic (8" Tablet)',
    category: 'Devices & MDM',
    description: '8" Android tablet with 2GB RAM, 32GB storage, pre-loaded learning apps',
    chargeType: 'once-off',
    unitPrice: 1850,
    defaultQuantityRule: 'per-learner',
    dependencies: []
  },
  {
    id: 'dev-002',
    name: 'MTN EduTab Pro (10" Tablet)',
    category: 'Devices & MDM',
    description: '10" Android tablet with 4GB RAM, 64GB storage, ruggedized case',
    chargeType: 'once-off',
    unitPrice: 3200,
    defaultQuantityRule: 'per-teacher',
    dependencies: []
  },
  {
    id: 'dev-003',
    name: 'Chromebook for Education',
    category: 'Devices & MDM',
    description: 'Google Chromebook with 4GB RAM, 64GB storage, EDU license',
    chargeType: 'once-off',
    unitPrice: 4800,
    defaultQuantityRule: 'per-learner',
    dependencies: []
  },
  {
    id: 'dev-004',
    name: 'Mobile Device Management (MDM)',
    category: 'Devices & MDM',
    description: 'Centralized device management, app distribution, content filtering',
    chargeType: 'per-device-per-month',
    unitPrice: 25,
    defaultQuantityRule: 'per-device',
    dependencies: []
  },
  {
    id: 'dev-005',
    name: 'Device Insurance & Warranty',
    category: 'Devices & MDM',
    description: '36-month device insurance covering theft, loss, and accidental damage',
    chargeType: 'once-off',
    unitPrice: 380,
    defaultQuantityRule: 'per-device',
    dependencies: []
  },
  {
    id: 'dev-006',
    name: 'Device Charging Cart (40 units)',
    category: 'Devices & MDM',
    description: 'Lockable charging cart for 40 tablets with sync capability',
    chargeType: 'once-off',
    unitPrice: 18500,
    defaultQuantityRule: 'per-site',
    dependencies: []
  },

  // Managed Security (5 items)
  {
    id: 'sec-001',
    name: 'Next-Gen Firewall (NGF)',
    category: 'Managed Security',
    description: 'Enterprise firewall with IPS, malware protection, web filtering',
    chargeType: 'per-month',
    unitPrice: 1850,
    defaultQuantityRule: 'per-site',
    dependencies: []
  },
  {
    id: 'sec-002',
    name: 'POPIA Compliance Suite',
    category: 'Managed Security',
    description: 'Data protection, privacy controls, audit logs for POPIA compliance',
    chargeType: 'per-month',
    unitPrice: 950,
    defaultQuantityRule: 'per-site',
    dependencies: []
  },
  {
    id: 'sec-003',
    name: 'Content Filtering & Safe Browsing',
    category: 'Managed Security',
    description: 'Age-appropriate content filtering, block harmful sites, usage reports',
    chargeType: 'per-month',
    unitPrice: 580,
    defaultQuantityRule: 'per-site',
    dependencies: []
  },
  {
    id: 'sec-004',
    name: 'Security Operations Center (SOC)',
    category: 'Managed Security',
    description: '24/7 threat monitoring, incident response, quarterly security audits',
    chargeType: 'per-month',
    unitPrice: 4500,
    defaultQuantityRule: 'per-district',
    dependencies: []
  },
  {
    id: 'sec-005',
    name: 'Backup & Disaster Recovery',
    category: 'Managed Security',
    description: 'Daily automated backups, 30-day retention, 4-hour recovery SLA',
    chargeType: 'per-month',
    unitPrice: 1200,
    defaultQuantityRule: 'per-site',
    dependencies: []
  },

  // Cloud & Hosting (4 items)
  {
    id: 'cloud-001',
    name: 'EMIS Cloud Hosting',
    category: 'Cloud & Hosting',
    description: 'Secure cloud hosting for Education Management Information Systems',
    chargeType: 'per-month',
    unitPrice: 8500,
    defaultQuantityRule: 'per-district',
    dependencies: []
  },
  {
    id: 'cloud-002',
    name: 'Google Workspace for Education',
    category: 'Cloud & Hosting',
    description: 'Gmail, Drive, Classroom, Meet for educators and learners',
    chargeType: 'per-user-per-month',
    unitPrice: 45,
    defaultQuantityRule: 'per-user',
    dependencies: []
  },
  {
    id: 'cloud-003',
    name: 'Microsoft 365 A3 for Education',
    category: 'Cloud & Hosting',
    description: 'Office apps, Teams, OneDrive, advanced security for education',
    chargeType: 'per-user-per-month',
    unitPrice: 85,
    defaultQuantityRule: 'per-user',
    dependencies: []
  },
  {
    id: 'cloud-004',
    name: 'Learning Management System (LMS)',
    category: 'Cloud & Hosting',
    description: 'Moodle-based LMS with mobile app, analytics, and support',
    chargeType: 'per-month',
    unitPrice: 3500,
    defaultQuantityRule: 'per-site',
    dependencies: []
  },

  // Messaging & Engagement (4 items)
  {
    id: 'msg-001',
    name: 'Bulk SMS Platform',
    category: 'Messaging & Engagement',
    description: 'Automated SMS notifications for attendance, events, emergencies',
    chargeType: 'per-month',
    unitPrice: 1200,
    defaultQuantityRule: 'per-site',
    dependencies: []
  },
  {
    id: 'msg-002',
    name: 'SMS Bundle (5000 messages/month)',
    category: 'Messaging & Engagement',
    description: '5000 SMS credits per month for parent-teacher communication',
    chargeType: 'per-month',
    unitPrice: 850,
    defaultQuantityRule: 'per-site',
    dependencies: ['msg-001']
  },
  {
    id: 'msg-003',
    name: 'Parent Mobile App',
    category: 'Messaging & Engagement',
    description: 'Branded mobile app for parent engagement, reports, payments',
    chargeType: 'once-off',
    unitPrice: 45000,
    defaultQuantityRule: 'per-district',
    dependencies: []
  },
  {
    id: 'msg-004',
    name: 'USSD Portal for Feature Phones',
    category: 'Messaging & Engagement',
    description: 'USSD-based access to attendance, results, and announcements',
    chargeType: 'per-month',
    unitPrice: 1800,
    defaultQuantityRule: 'per-district',
    dependencies: []
  },

  // Data & Analytics (5 items)
  {
    id: 'data-001',
    name: 'Real-Time Analytics Dashboard',
    category: 'Data & Analytics',
    description: 'Live dashboards for attendance, engagement, performance metrics',
    chargeType: 'per-month',
    unitPrice: 2500,
    defaultQuantityRule: 'per-site',
    dependencies: []
  },
  {
    id: 'data-002',
    name: 'Predictive Analytics & AI Insights',
    category: 'Data & Analytics',
    description: 'AI-powered early warning system for at-risk learners',
    chargeType: 'per-month',
    unitPrice: 5500,
    defaultQuantityRule: 'per-district',
    dependencies: ['data-001']
  },
  {
    id: 'data-003',
    name: 'Biometric Attendance System',
    category: 'Data & Analytics',
    description: 'Fingerprint attendance tracking with cloud sync and reporting',
    chargeType: 'once-off',
    unitPrice: 12500,
    defaultQuantityRule: 'per-site',
    dependencies: []
  },
  {
    id: 'data-004',
    name: 'Data Integration Hub',
    category: 'Data & Analytics',
    description: 'API gateway for integrating EMIS, LURITS, and third-party systems',
    chargeType: 'once-off',
    unitPrice: 65000,
    defaultQuantityRule: 'per-district',
    dependencies: []
  },
  {
    id: 'data-005',
    name: 'Monthly Analytics Reports',
    category: 'Data & Analytics',
    description: 'Professional monthly reports with insights and recommendations',
    chargeType: 'per-month',
    unitPrice: 1200,
    defaultQuantityRule: 'per-site',
    dependencies: ['data-001']
  },

  // Power Resilience (3 items)
  {
    id: 'power-001',
    name: 'Solar Power System (5kW)',
    category: 'Power Resilience',
    description: '5kW solar system with batteries for 8-hour backup',
    chargeType: 'once-off',
    unitPrice: 85000,
    defaultQuantityRule: 'per-site',
    dependencies: []
  },
  {
    id: 'power-002',
    name: 'UPS Backup System (3kVA)',
    category: 'Power Resilience',
    description: '3kVA UPS with 4-hour battery backup for network equipment',
    chargeType: 'once-off',
    unitPrice: 18500,
    defaultQuantityRule: 'per-site',
    dependencies: []
  },
  {
    id: 'power-003',
    name: 'Power Monitoring & Management',
    category: 'Power Resilience',
    description: 'Remote power monitoring, alerts, and predictive maintenance',
    chargeType: 'per-month',
    unitPrice: 450,
    defaultQuantityRule: 'per-site',
    dependencies: []
  },

  // Implementation & Support (5 items)
  {
    id: 'impl-001',
    name: 'Site Survey & Planning',
    category: 'Implementation & Support',
    description: 'Professional site survey, network design, and project planning',
    chargeType: 'once-off',
    unitPrice: 8500,
    defaultQuantityRule: 'per-site',
    dependencies: []
  },
  {
    id: 'impl-002',
    name: 'Network Installation & Configuration',
    category: 'Implementation & Support',
    description: 'On-site installation, configuration, and testing of all equipment',
    chargeType: 'once-off',
    unitPrice: 12000,
    defaultQuantityRule: 'per-site',
    dependencies: []
  },
  {
    id: 'impl-003',
    name: 'Teacher Training Programme',
    category: 'Implementation & Support',
    description: '3-day digital skills and device management training for teachers',
    chargeType: 'once-off',
    unitPrice: 1500,
    defaultQuantityRule: 'per-teacher',
    dependencies: []
  },
  {
    id: 'impl-004',
    name: '24/7 Managed Support (Gold)',
    category: 'Implementation & Support',
    description: '24/7 helpdesk, 4-hour on-site response SLA, quarterly reviews',
    chargeType: 'per-month',
    unitPrice: 4500,
    defaultQuantityRule: 'per-site',
    dependencies: []
  },
  {
    id: 'impl-005',
    name: 'On-Site Support Technician',
    category: 'Implementation & Support',
    description: 'Dedicated on-site technician for large deployments (200+ devices)',
    chargeType: 'per-month',
    unitPrice: 18000,
    defaultQuantityRule: 'per-district',
    dependencies: []
  }
];

// Prebuilt Solution Blueprints (5 blueprints)
export const blueprints = [
  {
    id: 'bp-001',
    name: 'Always-On Connected School',
    description: 'Reliable connectivity with failover, managed security, and 24/7 support for uninterrupted learning',
    targetSegments: ['Public School', 'TVET'],
    targetNeeds: ['Reliability', 'Infrastructure Readiness'],
    includedComponents: [
      'conn-002', // LTE 10Mbps
      'conn-006', // WiFi AP
      'conn-007', // WiFi Management
      'conn-008', // Failover backup
      'sec-001', // NGF
      'sec-003', // Content filtering
      'impl-002', // Installation
      'impl-004'  // 24/7 Support
    ],
    rationale: 'Ensures 99.5% uptime with automatic failover and enterprise-grade security'
  },
  {
    id: 'bp-002',
    name: 'Safe Digital Classroom',
    description: 'Devices with MDM, content filtering, POPIA compliance, and teacher training',
    targetSegments: ['Public School', 'District'],
    targetNeeds: ['Equity & Access', 'Safeguarding', 'Teacher Capacity'],
    includedComponents: [
      'dev-001', // EduTab Basic
      'dev-002', // EduTab Pro (teachers)
      'dev-004', // MDM
      'dev-005', // Insurance
      'dev-006', // Charging cart
      'sec-002', // POPIA
      'sec-003', // Content filtering
      'impl-003'  // Teacher training
    ],
    rationale: 'Comprehensive device deployment with safeguarding and teacher enablement'
  },
  {
    id: 'bp-003',
    name: 'Data-Driven Education Ops',
    description: 'Analytics, attendance tracking, EMIS integration, and real-time dashboards',
    targetSegments: ['District', 'PED', 'DBE'],
    targetNeeds: ['Outcomes Measurement', 'Equity & Access'],
    includedComponents: [
      'cloud-001', // EMIS hosting
      'data-001', // Analytics dashboard
      'data-002', // Predictive analytics
      'data-003', // Biometric attendance
      'data-004', // Integration hub
      'data-005', // Monthly reports
      'impl-004'  // 24/7 support
    ],
    rationale: 'Transform data into actionable insights for improved learner outcomes'
  },
  {
    id: 'bp-004',
    name: 'Rural Resilience Pack',
    description: 'Solar power, LTE connectivity, offline-capable devices, and rugged infrastructure',
    targetSegments: ['Public School', 'District'],
    targetNeeds: ['Infrastructure Readiness', 'Equity & Access', 'Reliability'],
    includedComponents: [
      'conn-001', // LTE 5Mbps
      'conn-006', // WiFi AP
      'power-001', // Solar 5kW
      'power-002', // UPS
      'power-003', // Power monitoring
      'dev-002', // Rugged tablets
      'dev-004', // MDM
      'impl-001', // Site survey
      'impl-002'  // Installation
    ],
    rationale: 'Overcomes infrastructure challenges with renewable power and resilient connectivity'
  },
  {
    id: 'bp-005',
    name: 'District Communications & Engagement',
    description: 'Parent engagement platform, SMS, USSD, mobile app for multi-channel communication',
    targetSegments: ['District', 'PED'],
    targetNeeds: ['Equity & Access', 'Outcomes Measurement'],
    includedComponents: [
      'msg-001', // SMS platform
      'msg-002', // SMS bundle
      'msg-003', // Parent app
      'msg-004', // USSD portal
      'data-001', // Analytics
      'sec-002', // POPIA
      'impl-004'  // Support
    ],
    rationale: 'Bridge the communication gap with multi-channel parent engagement'
  }
];

// Demo defaults for Client Profile
export const demoDefaults = {
  clientName: 'Gauteng District 12 Education',
  buyerType: 'District',
  province: 'Gauteng',
  numSites: 18,
  numLearners: 8500,
  numTeachers: 420,
  fundingPosture: 'Budget Confirmed',
  connectivityStatus: 'Unreliable'
};

// South African provinces
export const provinces = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'Northern Cape',
  'North West',
  'Western Cape'
];

// Buyer types
export const buyerTypes = [
  'DBE',
  'PED',
  'District',
  'Public School',
  'TVET',
  'University'
];

// Need categories for assessment
export const needCategories = [
  {
    id: 'reliability',
    name: 'Reliability (Always-On)',
    description: 'Minimize downtime, ensure consistent connectivity'
  },
  {
    id: 'equity',
    name: 'Equity & Access',
    description: 'Bridge digital divide, provide equal learning opportunities'
  },
  {
    id: 'outcomes',
    name: 'Outcomes Measurement',
    description: 'Track attendance, performance, and engagement'
  },
  {
    id: 'teacher',
    name: 'Teacher Capacity',
    description: 'Digital skills training and ongoing support'
  },
  {
    id: 'safeguarding',
    name: 'Safeguarding / POPIA & Cybersecurity',
    description: 'Protect learners online, comply with data privacy laws'
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure Readiness (Power/Support)',
    description: 'Address power challenges, local technical support'
  }
];
