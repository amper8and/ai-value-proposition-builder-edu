// MTN Education Solution Developer - Main Application

// State management
let appState = {
  currentStep: 0,
  guidedDemo: false,
  clientProfile: {},
  needsAssessment: {},
  selectedBlueprint: null,
  solutionConfig: [],
  pricing: {
    contractTerm: 24,
    discount: 0,
    escalation: false
  },
  offerBrief: {},
  savedDeals: []
};

// Load state from localStorage
function loadState() {
  const saved = localStorage.getItem('mtnEduDemoState');
  if (saved) {
    try {
      appState = { ...appState, ...JSON.parse(saved) };
    } catch (e) {
      console.error('Failed to load state:', e);
    }
  }
  
  const savedDeals = localStorage.getItem('mtnEduDeals');
  if (savedDeals) {
    try {
      appState.savedDeals = JSON.parse(savedDeals);
    } catch (e) {
      console.error('Failed to load deals:', e);
    }
  }
}

// Save state to localStorage
function saveState() {
  localStorage.setItem('mtnEduDemoState', JSON.stringify(appState));
  localStorage.setItem('mtnEduDeals', JSON.stringify(appState.savedDeals));
}

// Steps configuration
const steps = [
  { id: 0, name: 'Client Profile', icon: 'fa-user' },
  { id: 1, name: 'Needs Assessment', icon: 'fa-clipboard-list' },
  { id: 2, name: 'Solution Builder', icon: 'fa-cubes' },
  { id: 3, name: 'Pricing & Commercials', icon: 'fa-calculator' },
  { id: 4, name: 'Offer Brief', icon: 'fa-file-alt' }
];

// Initialize app
function init() {
  loadState();
  renderApp();
  
  // Set demo defaults if no client profile exists
  if (!appState.clientProfile.clientName) {
    appState.clientProfile = { ...demoDefaults };
    saveState();
  }
}

// Render entire app
function renderApp() {
  const container = document.getElementById('app');
  
  container.innerHTML = `
    <div class="flex h-screen bg-gray-50">
      <!-- Left Sidebar -->
      <div class="w-64 bg-white shadow-lg flex flex-col">
        <div class="p-4 border-b">
          <div class="text-lg font-bold text-orange-600">MTN Education</div>
          <div class="text-xs text-gray-500">Solution Developer</div>
        </div>
        
        <!-- Navigation Steps -->
        <div class="flex-1 overflow-y-auto p-4">
          <div class="space-y-2">
            ${steps.map(step => renderStepNav(step)).join('')}
          </div>
        </div>
        
        <!-- Bottom Actions -->
        <div class="p-4 border-t space-y-2">
          <button onclick="toggleGuidedDemo()" class="w-full px-3 py-2 text-sm ${appState.guidedDemo ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 'bg-gray-100 text-gray-700 border-gray-300'} border rounded hover:bg-yellow-50">
            <i class="fas fa-lightbulb mr-2"></i>
            ${appState.guidedDemo ? 'Guided Demo: ON' : 'Guided Demo: OFF'}
          </button>
          <button onclick="resetDemo()" class="w-full px-3 py-2 text-sm bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100">
            <i class="fas fa-redo mr-2"></i>
            Reset Demo
          </button>
        </div>
      </div>
      
      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Top Bar -->
        <div class="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <img src="https://www.mtn.com/wp-content/themes/mtn-refresh/img/logo.svg" alt="MTN" class="h-8" onerror="this.style.display='none'">
            <div>
              <h1 class="text-xl font-bold text-gray-800">MTN Education Solution Developer</h1>
              <div class="flex items-center space-x-2 text-sm">
                <span class="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">DEMO MODE</span>
                <span class="text-gray-500">Step ${appState.currentStep + 1} of ${steps.length}</span>
              </div>
            </div>
          </div>
          
          <button onclick="exportOfferBrief()" class="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 font-semibold">
            <i class="fas fa-file-export mr-2"></i>
            Export Offer Brief
          </button>
        </div>
        
        <!-- Step Content -->
        <div class="flex-1 overflow-y-auto p-6">
          <div class="max-w-7xl mx-auto">
            ${renderStepContent()}
          </div>
        </div>
      </div>
      
      <!-- Right Panel: Deal Summary -->
      <div class="w-80 bg-white shadow-lg border-l overflow-y-auto">
        ${renderDealSummary()}
      </div>
    </div>
    
    <!-- Guided Demo Tooltip -->
    ${appState.guidedDemo ? renderGuidedTooltip() : ''}
  `;
  
  // Re-attach event listeners for dynamic content
  attachEventListeners();
}

// Render step navigation item
function renderStepNav(step) {
  const isActive = appState.currentStep === step.id;
  const isCompleted = appState.currentStep > step.id;
  
  return `
    <button 
      onclick="navigateToStep(${step.id})" 
      class="w-full flex items-center p-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-orange-50 text-orange-600 border border-orange-200' 
          : isCompleted
            ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
            : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
      }"
    >
      <div class="w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
        isActive 
          ? 'bg-orange-600 text-white' 
          : isCompleted
            ? 'bg-green-600 text-white'
            : 'bg-gray-300 text-gray-600'
      }">
        ${isCompleted ? '<i class="fas fa-check text-sm"></i>' : `<i class="fas ${step.icon} text-sm"></i>`}
      </div>
      <div class="flex-1 text-left">
        <div class="text-sm font-semibold">${step.name}</div>
        <div class="text-xs opacity-75">${isActive ? 'Current' : isCompleted ? 'Completed' : 'Pending'}</div>
      </div>
    </button>
  `;
}

// Render current step content
function renderStepContent() {
  switch (appState.currentStep) {
    case 0: return renderClientProfile();
    case 1: return renderNeedsAssessment();
    case 2: return renderSolutionBuilder();
    case 3: return renderPricing();
    case 4: return renderOfferBrief();
    default: return '<div>Invalid step</div>';
  }
}

// STEP 0: Client Profile
function renderClientProfile() {
  const profile = appState.clientProfile;
  
  return `
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">
        <i class="fas fa-user text-orange-600 mr-2"></i>
        Client Profile
      </h2>
      
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Client Name</label>
          <input 
            type="text" 
            id="clientName" 
            value="${profile.clientName || ''}" 
            onchange="updateClientProfile('clientName', this.value)"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="e.g., Gauteng District 12"
          >
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Buyer Type</label>
          <select 
            id="buyerType" 
            onchange="updateClientProfile('buyerType', this.value)"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            ${buyerTypes.map(type => `
              <option value="${type}" ${profile.buyerType === type ? 'selected' : ''}>${type}</option>
            `).join('')}
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Province</label>
          <select 
            id="province" 
            onchange="updateClientProfile('province', this.value)"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            ${provinces.map(prov => `
              <option value="${prov}" ${profile.province === prov ? 'selected' : ''}>${prov}</option>
            `).join('')}
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Number of Sites</label>
          <input 
            type="number" 
            id="numSites" 
            value="${profile.numSites || 0}" 
            onchange="updateClientProfile('numSites', parseInt(this.value))"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            min="1"
          >
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Number of Learners</label>
          <input 
            type="number" 
            id="numLearners" 
            value="${profile.numLearners || 0}" 
            onchange="updateClientProfile('numLearners', parseInt(this.value))"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            min="0"
          >
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Number of Teachers</label>
          <input 
            type="number" 
            id="numTeachers" 
            value="${profile.numTeachers || 0}" 
            onchange="updateClientProfile('numTeachers', parseInt(this.value))"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            min="0"
          >
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Funding Posture</label>
          <select 
            id="fundingPosture" 
            onchange="updateClientProfile('fundingPosture', this.value)"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="Budget Confirmed" ${profile.fundingPosture === 'Budget Confirmed' ? 'selected' : ''}>Budget Confirmed</option>
            <option value="Budget Pending" ${profile.fundingPosture === 'Budget Pending' ? 'selected' : ''}>Budget Pending</option>
            <option value="Donor / PPP" ${profile.fundingPosture === 'Donor / PPP' ? 'selected' : ''}>Donor / PPP</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Current Connectivity Status</label>
          <select 
            id="connectivityStatus" 
            onchange="updateClientProfile('connectivityStatus', this.value)"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="None" ${profile.connectivityStatus === 'None' ? 'selected' : ''}>None</option>
            <option value="Basic" ${profile.connectivityStatus === 'Basic' ? 'selected' : ''}>Basic</option>
            <option value="Unreliable" ${profile.connectivityStatus === 'Unreliable' ? 'selected' : ''}>Unreliable</option>
            <option value="Stable" ${profile.connectivityStatus === 'Stable' ? 'selected' : ''}>Stable</option>
          </select>
        </div>
      </div>
      
      <div class="mt-8 flex justify-end">
        <button 
          onclick="navigateToStep(1)" 
          class="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold"
        >
          Next: Needs Assessment
          <i class="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  `;
}

// STEP 1: Needs Assessment
function renderNeedsAssessment() {
  const needs = appState.needsAssessment;
  
  return `
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">
        <i class="fas fa-clipboard-list text-orange-600 mr-2"></i>
        Needs Assessment
      </h2>
      
      <p class="text-gray-600 mb-6">Rate each need category from 0 (Not Important) to 5 (Critical Priority)</p>
      
      <div class="space-y-6">
        ${needCategories.map(category => `
          <div class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <h3 class="font-semibold text-gray-800">${category.name}</h3>
                <p class="text-sm text-gray-600 mt-1">${category.description}</p>
              </div>
              <div class="ml-4 text-2xl font-bold text-orange-600 w-12 text-center">
                ${needs[category.id] || 0}
              </div>
            </div>
            
            <div class="flex items-center space-x-3">
              <input 
                type="range" 
                min="0" 
                max="5" 
                value="${needs[category.id] || 0}"
                onchange="updateNeedsAssessment('${category.id}', parseInt(this.value))"
                class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style="accent-color: #f97316;"
              >
              <div class="flex space-x-1">
                ${[1,2,3,4,5].map(val => `
                  <button 
                    onclick="updateNeedsAssessment('${category.id}', ${val})"
                    class="w-8 h-8 rounded ${(needs[category.id] || 0) === val ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-600'} text-sm font-semibold hover:bg-orange-500 hover:text-white"
                  >
                    ${val}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="mt-6">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Discovery Notes</label>
        <textarea 
          id="discoveryNotes"
          onchange="updateNeedsAssessment('discoveryNotes', this.value)"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          rows="4"
          placeholder="Add any additional context, challenges, or opportunities discovered during client meetings..."
        >${needs.discoveryNotes || ''}</textarea>
      </div>
      
      <div class="mt-8 flex justify-between">
        <button 
          onclick="navigateToStep(0)" 
          class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold"
        >
          <i class="fas fa-arrow-left mr-2"></i>
          Back
        </button>
        
        <button 
          onclick="generateRecommendations()" 
          class="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold"
        >
          <i class="fas fa-magic mr-2"></i>
          Generate Recommendations
        </button>
      </div>
      
      <!-- Recommendations Section -->
      ${appState.recommendations ? renderRecommendations() : ''}
    </div>
  `;
}

// Render AI recommendations
function renderRecommendations() {
  return `
    <div class="mt-8 border-t pt-8">
      <h3 class="text-xl font-bold mb-4 text-gray-800">
        <i class="fas fa-robot text-orange-600 mr-2"></i>
        AI-Assisted Recommendations
      </h3>
      
      <div class="grid grid-cols-3 gap-4">
        ${appState.recommendations.map((rec, index) => `
          <div class="border-2 ${rec.rank === 1 ? 'border-orange-500 bg-orange-50' : 'border-gray-300'} rounded-lg p-4">
            <div class="flex items-center justify-between mb-3">
              <span class="px-2 py-1 bg-orange-600 text-white rounded text-xs font-bold">
                #${rec.rank} ${rec.rank === 1 ? '🏆 BEST FIT' : ''}
              </span>
              <span class="text-sm text-gray-500">${rec.matchScore}% match</span>
            </div>
            
            <h4 class="font-bold text-gray-800 mb-2">${rec.blueprint.name}</h4>
            <p class="text-sm text-gray-600 mb-3">${rec.rationale}</p>
            
            <div class="text-xs text-gray-500 mb-3">
              <strong>Includes:</strong> ${rec.blueprint.includedComponents.length} components
            </div>
            
            <button 
              onclick="selectBlueprint('${rec.blueprint.id}')" 
              class="w-full px-4 py-2 ${rec.rank === 1 ? 'bg-orange-600' : 'bg-gray-600'} text-white rounded hover:opacity-90 font-semibold"
            >
              Select Blueprint
            </button>
          </div>
        `).join('')}
      </div>
      
      <div class="mt-6 flex justify-end">
        <button 
          onclick="navigateToStep(2)" 
          class="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold"
        >
          Continue to Solution Builder
          <i class="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  `;
}

// STEP 2: Solution Builder
function renderSolutionBuilder() {
  const categories = [...new Set(solutionLibrary.map(item => item.category))];
  const selectedCategory = appState.solutionBuilderCategory || categories[0];
  
  return `
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">
        <i class="fas fa-cubes text-orange-600 mr-2"></i>
        Solution Builder
      </h2>
      
      ${appState.selectedBlueprint ? `
        <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm text-blue-600 font-semibold mb-1">Selected Blueprint</div>
              <div class="font-bold text-gray-800">${blueprints.find(b => b.id === appState.selectedBlueprint).name}</div>
            </div>
            <button onclick="clearBlueprint()" class="text-sm text-blue-600 hover:text-blue-800">
              <i class="fas fa-times mr-1"></i>Clear
            </button>
          </div>
        </div>
      ` : ''}
      
      <div class="grid grid-cols-12 gap-6">
        <!-- Left: Categories -->
        <div class="col-span-3">
          <h3 class="font-semibold text-gray-700 mb-3">Categories</h3>
          <div class="space-y-1">
            ${categories.map(cat => `
              <button 
                onclick="selectSolutionCategory('${cat}')"
                class="w-full text-left px-3 py-2 rounded ${selectedCategory === cat ? 'bg-orange-100 text-orange-600 font-semibold' : 'text-gray-700 hover:bg-gray-100'}"
              >
                ${cat}
                <span class="float-right text-xs">${solutionLibrary.filter(i => i.category === cat).length}</span>
              </button>
            `).join('')}
          </div>
        </div>
        
        <!-- Middle: Items List -->
        <div class="col-span-5">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-semibold text-gray-700">${selectedCategory}</h3>
            <input 
              type="text" 
              id="searchItems" 
              onkeyup="filterSolutionItems(this.value)"
              placeholder="Search..." 
              class="px-3 py-1 text-sm border border-gray-300 rounded"
            >
          </div>
          
          <div class="space-y-2 max-h-96 overflow-y-auto" id="itemsList">
            ${solutionLibrary
              .filter(item => item.category === selectedCategory)
              .map(item => `
                <div class="border border-gray-200 rounded-lg p-3 hover:border-orange-300">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <h4 class="font-semibold text-sm text-gray-800">${item.name}</h4>
                      <p class="text-xs text-gray-600 mt-1">${item.description}</p>
                      <div class="mt-2 flex items-center space-x-2 text-xs">
                        <span class="px-2 py-0.5 bg-gray-100 rounded">${item.chargeType}</span>
                        <span class="font-semibold text-orange-600">R${item.unitPrice.toLocaleString()}</span>
                      </div>
                    </div>
                    <button 
                      onclick="addToConfig('${item.id}')"
                      class="ml-3 px-3 py-1 bg-orange-600 text-white rounded text-xs hover:bg-orange-700"
                    >
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              `).join('')}
          </div>
        </div>
        
        <!-- Right: Configuration Cart -->
        <div class="col-span-4">
          <h3 class="font-semibold text-gray-700 mb-3">Configuration Cart</h3>
          
          ${appState.solutionConfig.length === 0 ? `
            <div class="text-center py-8 text-gray-400">
              <i class="fas fa-shopping-cart text-4xl mb-2"></i>
              <p class="text-sm">No items selected</p>
            </div>
          ` : `
            <div class="space-y-2 max-h-96 overflow-y-auto">
              ${appState.solutionConfig.map((configItem, idx) => {
                const item = solutionLibrary.find(i => i.id === configItem.itemId);
                return `
                  <div class="border border-gray-200 rounded-lg p-3 bg-gray-50">
                    <div class="flex items-start justify-between mb-2">
                      <h4 class="font-semibold text-sm text-gray-800 flex-1">${item.name}</h4>
                      <button onclick="removeFromConfig(${idx})" class="text-red-500 hover:text-red-700">
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                    
                    <div class="flex items-center space-x-2">
                      <input 
                        type="number" 
                        value="${configItem.quantity}"
                        onchange="updateConfigQuantity(${idx}, parseInt(this.value))"
                        min="1"
                        class="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                      >
                      <span class="text-xs text-gray-600">${item.defaultQuantityRule}</span>
                    </div>
                    
                    <div class="mt-2 text-xs text-gray-500">
                      ${item.chargeType}: R${(item.unitPrice * configItem.quantity).toLocaleString()}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
          
          ${renderDependencyValidation()}
        </div>
      </div>
      
      <div class="mt-8 flex justify-between">
        <button 
          onclick="navigateToStep(1)" 
          class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold"
        >
          <i class="fas fa-arrow-left mr-2"></i>
          Back
        </button>
        
        <button 
          onclick="navigateToStep(3)" 
          class="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold"
        >
          Next: Pricing
          <i class="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  `;
}

// Render dependency validation warnings
function renderDependencyValidation() {
  const warnings = [];
  
  // Check for device + MDM recommendation
  const hasDevices = appState.solutionConfig.some(c => 
    solutionLibrary.find(i => i.id === c.itemId && i.category === 'Devices & MDM' && i.id.startsWith('dev-00'))
  );
  const hasMDM = appState.solutionConfig.some(c => c.itemId === 'dev-004');
  
  if (hasDevices && !hasMDM) {
    warnings.push('⚠️ Devices selected without MDM - recommend adding Mobile Device Management');
  }
  
  // Check for connectivity requirement
  const hasAnalytics = appState.solutionConfig.some(c => 
    solutionLibrary.find(i => i.id === c.itemId && i.category === 'Data & Analytics')
  );
  const hasConnectivity = appState.solutionConfig.some(c => 
    solutionLibrary.find(i => i.id === c.itemId && i.category === 'Connectivity')
  );
  
  if (hasAnalytics && !hasConnectivity) {
    warnings.push('⚠️ Analytics requires stable connectivity - recommend adding connectivity solution');
  }
  
  // Check for rural power resilience
  if (appState.clientProfile.connectivityStatus === 'None' || appState.clientProfile.connectivityStatus === 'Unreliable') {
    const hasPower = appState.solutionConfig.some(c => 
      solutionLibrary.find(i => i.id === c.itemId && i.category === 'Power Resilience')
    );
    
    if (!hasPower && appState.clientProfile.numSites > 10) {
      warnings.push('⚠️ Unreliable infrastructure detected - recommend Power Resilience solutions');
    }
  }
  
  if (warnings.length === 0) return '';
  
  return `
    <div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
      <div class="font-semibold text-sm text-yellow-800 mb-2">
        <i class="fas fa-exclamation-triangle mr-1"></i>
        Validation Warnings
      </div>
      <div class="text-xs text-yellow-700 space-y-1">
        ${warnings.map(w => `<div>${w}</div>`).join('')}
      </div>
    </div>
  `;
}

// STEP 3: Pricing & Commercials
function renderPricing() {
  const calculations = calculatePricing();
  
  return `
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">
        <i class="fas fa-calculator text-orange-600 mr-2"></i>
        Pricing & Commercials
      </h2>
      
      <div class="grid grid-cols-3 gap-6 mb-8">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Contract Term</label>
          <select 
            onchange="updatePricing('contractTerm', parseInt(this.value))"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="12" ${appState.pricing.contractTerm === 12 ? 'selected' : ''}>12 months</option>
            <option value="24" ${appState.pricing.contractTerm === 24 ? 'selected' : ''}>24 months</option>
            <option value="36" ${appState.pricing.contractTerm === 36 ? 'selected' : ''}>36 months</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Discount: ${appState.pricing.discount}%</label>
          <input 
            type="range" 
            min="0" 
            max="25" 
            value="${appState.pricing.discount}"
            onchange="updatePricing('discount', parseInt(this.value))"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style="accent-color: #f97316;"
          >
          <div class="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>25%</span>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Annual Escalation</label>
          <label class="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              ${appState.pricing.escalation ? 'checked' : ''}
              onchange="updatePricing('escalation', this.checked)"
              class="w-5 h-5 text-orange-600 rounded"
            >
            <span class="text-sm text-gray-700">+5% annually on recurring</span>
          </label>
        </div>
      </div>
      
      <!-- Pricing Summary Cards -->
      <div class="grid grid-cols-4 gap-4 mb-8">
        <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div class="text-sm text-orange-600 font-semibold mb-1">Once-Off Total</div>
          <div class="text-2xl font-bold text-orange-600">R${calculations.onceOff.toLocaleString()}</div>
        </div>
        
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="text-sm text-blue-600 font-semibold mb-1">Monthly Recurring</div>
          <div class="text-2xl font-bold text-blue-600">R${calculations.monthly.toLocaleString()}</div>
        </div>
        
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="text-sm text-green-600 font-semibold mb-1">Contract Term</div>
          <div class="text-2xl font-bold text-green-600">${appState.pricing.contractTerm} months</div>
        </div>
        
        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div class="text-sm text-purple-600 font-semibold mb-1">Total Contract Value</div>
          <div class="text-2xl font-bold text-purple-600">R${calculations.tcv.toLocaleString()}</div>
        </div>
      </div>
      
      <!-- Line Items Table -->
      <div class="mb-8">
        <h3 class="font-semibold text-gray-700 mb-3">Line Item Quote</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-100 border-b-2 border-gray-300">
              <tr>
                <th class="text-left px-4 py-2">Item</th>
                <th class="text-left px-4 py-2">Charge Type</th>
                <th class="text-right px-4 py-2">Unit Price</th>
                <th class="text-center px-4 py-2">Qty</th>
                <th class="text-right px-4 py-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${calculations.lineItems.map(line => `
                <tr class="border-b border-gray-200">
                  <td class="px-4 py-2">${line.name}</td>
                  <td class="px-4 py-2">${line.chargeType}</td>
                  <td class="text-right px-4 py-2">R${line.unitPrice.toLocaleString()}</td>
                  <td class="text-center px-4 py-2">${line.quantity}</td>
                  <td class="text-right px-4 py-2 font-semibold">R${line.subtotal.toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Revenue Breakdown Chart -->
      <div class="mb-8">
        <h3 class="font-semibold text-gray-700 mb-3">Revenue Breakdown by Category</h3>
        <div class="space-y-2">
          ${Object.entries(calculations.byCategory).map(([cat, amount]) => {
            const percentage = (amount / calculations.tcv * 100).toFixed(1);
            return `
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-700">${cat}</span>
                  <span class="font-semibold">R${amount.toLocaleString()} (${percentage}%)</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-orange-600 h-2 rounded-full" style="width: ${percentage}%"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
      
      <div class="flex justify-between">
        <button 
          onclick="navigateToStep(2)" 
          class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold"
        >
          <i class="fas fa-arrow-left mr-2"></i>
          Back
        </button>
        
        <div class="space-x-3">
          <button 
            onclick="saveDeal()" 
            class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
          >
            <i class="fas fa-save mr-2"></i>
            Save Deal
          </button>
          
          <button 
            onclick="navigateToStep(4)" 
            class="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold"
          >
            Generate Offer Brief
            <i class="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

// STEP 4: Offer Brief
function renderOfferBrief() {
  const brief = generateOfferBriefContent();
  
  return `
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">
        <i class="fas fa-file-alt text-orange-600 mr-2"></i>
        Offer Brief Preview
      </h2>
      
      <div class="prose max-w-none">
        ${brief}
      </div>
      
      <div class="mt-8 flex justify-between">
        <button 
          onclick="navigateToStep(3)" 
          class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold"
        >
          <i class="fas fa-arrow-left mr-2"></i>
          Back to Pricing
        </button>
        
        <div class="space-x-3">
          <button 
            onclick="copyToClipboard()" 
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            <i class="fas fa-copy mr-2"></i>
            Copy to Clipboard
          </button>
          
          <button 
            onclick="exportOfferBrief()" 
            class="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold"
          >
            <i class="fas fa-file-pdf mr-2"></i>
            Export to PDF
          </button>
        </div>
      </div>
    </div>
  `;
}

// Deal Summary Panel
function renderDealSummary() {
  const profile = appState.clientProfile;
  const calculations = calculatePricing();
  const blueprintName = appState.selectedBlueprint 
    ? blueprints.find(b => b.id === appState.selectedBlueprint)?.name 
    : 'Custom Configuration';
  
  return `
    <div class="p-6">
      <h3 class="text-lg font-bold mb-4 text-gray-800">
        <i class="fas fa-handshake text-orange-600 mr-2"></i>
        Deal Summary
      </h3>
      
      ${profile.clientName ? `
        <div class="space-y-4">
          <div>
            <div class="text-xs text-gray-500 mb-1">Client</div>
            <div class="font-semibold text-gray-800">${profile.clientName}</div>
            <div class="text-sm text-gray-600">${profile.buyerType} • ${profile.province}</div>
          </div>
          
          <div class="border-t pt-3">
            <div class="text-xs text-gray-500 mb-2">Scope</div>
            <div class="grid grid-cols-3 gap-2 text-center">
              <div class="bg-gray-50 rounded p-2">
                <div class="text-lg font-bold text-orange-600">${profile.numSites || 0}</div>
                <div class="text-xs text-gray-600">Sites</div>
              </div>
              <div class="bg-gray-50 rounded p-2">
                <div class="text-lg font-bold text-orange-600">${(profile.numLearners || 0).toLocaleString()}</div>
                <div class="text-xs text-gray-600">Learners</div>
              </div>
              <div class="bg-gray-50 rounded p-2">
                <div class="text-lg font-bold text-orange-600">${profile.numTeachers || 0}</div>
                <div class="text-xs text-gray-600">Teachers</div>
              </div>
            </div>
          </div>
          
          <div class="border-t pt-3">
            <div class="text-xs text-gray-500 mb-1">Solution</div>
            <div class="font-semibold text-sm text-gray-800">${blueprintName}</div>
            <div class="text-xs text-gray-600 mt-1">${appState.solutionConfig.length} components</div>
          </div>
          
          <div class="border-t pt-3">
            <div class="text-xs text-gray-500 mb-2">Commercials</div>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-xs text-gray-600">Once-Off</span>
                <span class="text-sm font-semibold text-orange-600">R${calculations.onceOff.toLocaleString()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-xs text-gray-600">Monthly</span>
                <span class="text-sm font-semibold text-blue-600">R${calculations.monthly.toLocaleString()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-xs text-gray-600">Term</span>
                <span class="text-sm font-semibold text-gray-800">${appState.pricing.contractTerm} months</span>
              </div>
              <div class="border-t pt-2 flex justify-between">
                <span class="text-sm font-bold text-gray-700">TCV</span>
                <span class="text-lg font-bold text-purple-600">R${calculations.tcv.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div class="border-t pt-3">
            <div class="text-xs text-gray-500 mb-2">Key Assumptions</div>
            <ul class="text-xs text-gray-600 space-y-1">
              ${calculations.assumptions.map(a => `<li>• ${a}</li>`).join('')}
            </ul>
          </div>
        </div>
      ` : `
        <div class="text-center py-8 text-gray-400">
          <i class="fas fa-info-circle text-3xl mb-2"></i>
          <p class="text-sm">Complete Client Profile to see deal summary</p>
        </div>
      `}
    </div>
  `;
}

// Guided Demo Tooltip
function renderGuidedTooltip() {
  const tooltips = {
    0: 'Start by reviewing or editing the pre-filled client profile. Click "Next" when ready.',
    1: 'Rate each need category and click "Generate Recommendations" to get AI-suggested solutions.',
    2: 'Browse the solution library and add components to build your configuration. Check validation warnings.',
    3: 'Adjust contract terms and discount, then review the pricing breakdown. Save the deal or proceed to generate the offer brief.',
    4: 'Review the complete offer brief. You can copy it to clipboard or export as PDF.'
  };
  
  return `
    <div class="fixed bottom-6 right-96 bg-yellow-400 text-yellow-900 px-4 py-3 rounded-lg shadow-lg max-w-xs animate-bounce">
      <div class="font-semibold mb-1">
        <i class="fas fa-lightbulb mr-2"></i>
        Guided Demo
      </div>
      <div class="text-sm">
        ${tooltips[appState.currentStep]}
      </div>
    </div>
  `;
}

// State update functions
function updateClientProfile(field, value) {
  appState.clientProfile[field] = value;
  saveState();
  renderApp();
}

function updateNeedsAssessment(field, value) {
  appState.needsAssessment[field] = value;
  saveState();
  renderApp();
}

function updatePricing(field, value) {
  appState.pricing[field] = value;
  saveState();
  renderApp();
}

// Navigation
function navigateToStep(stepId) {
  appState.currentStep = stepId;
  saveState();
  renderApp();
}

function toggleGuidedDemo() {
  appState.guidedDemo = !appState.guidedDemo;
  saveState();
  renderApp();
}

// Generate recommendations (rules-based AI simulation)
function generateRecommendations() {
  const needs = appState.needsAssessment;
  const profile = appState.clientProfile;
  
  // Calculate match scores for each blueprint
  const scored = blueprints.map(bp => {
    let score = 0;
    
    // Check target segment match
    if (bp.targetSegments.includes(profile.buyerType)) score += 25;
    
    // Check needs alignment
    bp.targetNeeds.forEach(targetNeed => {
      const needId = targetNeed.toLowerCase().replace(/[^a-z]/g, '').substring(0, 10);
      const needValue = needs[needId] || 0;
      score += needValue * 10;
    });
    
    // Connectivity status bonus
    if (profile.connectivityStatus === 'Unreliable' && bp.id === 'bp-001') score += 20;
    if (profile.connectivityStatus === 'None' && bp.id === 'bp-004') score += 20;
    
    // Budget posture consideration
    if (profile.fundingPosture === 'Budget Confirmed') score += 10;
    
    return {
      blueprint: bp,
      matchScore: Math.min(Math.round(score), 99),
      rationale: bp.rationale
    };
  });
  
  // Sort by score and assign ranks
  scored.sort((a, b) => b.matchScore - a.matchScore);
  scored.forEach((item, index) => {
    item.rank = index + 1;
  });
  
  appState.recommendations = scored.slice(0, 3);
  saveState();
  renderApp();
}

function selectBlueprint(blueprintId) {
  appState.selectedBlueprint = blueprintId;
  
  // Auto-populate solution config with blueprint components
  const blueprint = blueprints.find(b => b.id === blueprintId);
  if (blueprint) {
    appState.solutionConfig = blueprint.includedComponents.map(itemId => ({
      itemId,
      quantity: 1
    }));
  }
  
  navigateToStep(2);
}

function clearBlueprint() {
  appState.selectedBlueprint = null;
  saveState();
  renderApp();
}

// Solution Builder functions
function selectSolutionCategory(category) {
  appState.solutionBuilderCategory = category;
  saveState();
  renderApp();
}

function filterSolutionItems(searchTerm) {
  // Simple client-side filtering - would be more sophisticated in real app
  const items = document.querySelectorAll('#itemsList > div');
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(searchTerm.toLowerCase()) ? '' : 'none';
  });
}

function addToConfig(itemId) {
  // Check if item already in config
  const existing = appState.solutionConfig.find(c => c.itemId === itemId);
  if (existing) {
    existing.quantity += 1;
  } else {
    appState.solutionConfig.push({ itemId, quantity: 1 });
  }
  
  saveState();
  renderApp();
}

function removeFromConfig(index) {
  appState.solutionConfig.splice(index, 1);
  saveState();
  renderApp();
}

function updateConfigQuantity(index, quantity) {
  if (quantity > 0) {
    appState.solutionConfig[index].quantity = quantity;
    saveState();
    renderApp();
  }
}

// Pricing calculations
function calculatePricing() {
  let onceOff = 0;
  let monthly = 0;
  const lineItems = [];
  const byCategory = {};
  
  appState.solutionConfig.forEach(configItem => {
    const item = solutionLibrary.find(i => i.id === configItem.itemId);
    if (!item) return;
    
    const subtotal = item.unitPrice * configItem.quantity;
    const discountedSubtotal = subtotal * (1 - appState.pricing.discount / 100);
    
    if (item.chargeType === 'once-off') {
      onceOff += discountedSubtotal;
    } else {
      monthly += discountedSubtotal;
    }
    
    byCategory[item.category] = (byCategory[item.category] || 0) + discountedSubtotal;
    
    lineItems.push({
      name: item.name,
      chargeType: item.chargeType,
      unitPrice: item.unitPrice,
      quantity: configItem.quantity,
      subtotal: Math.round(discountedSubtotal)
    });
  });
  
  // Calculate TCV
  const monthlyTotal = appState.pricing.escalation 
    ? monthly * appState.pricing.contractTerm * 1.025 // Simplified escalation
    : monthly * appState.pricing.contractTerm;
  
  const tcv = onceOff + monthlyTotal;
  
  // Generate assumptions
  const assumptions = [];
  if (appState.pricing.discount > 0) {
    assumptions.push(`${appState.pricing.discount}% discount applied`);
  }
  if (appState.pricing.escalation) {
    assumptions.push('5% annual escalation on recurring fees');
  }
  assumptions.push(`${appState.pricing.contractTerm}-month contract term`);
  assumptions.push('Prices in ZAR excluding VAT');
  assumptions.push('Subject to final site survey and technical feasibility');
  
  return {
    onceOff: Math.round(onceOff),
    monthly: Math.round(monthly),
    tcv: Math.round(tcv),
    lineItems,
    byCategory,
    assumptions
  };
}

// Generate Offer Brief content
function generateOfferBriefContent() {
  const profile = appState.clientProfile;
  const calculations = calculatePricing();
  const blueprintName = appState.selectedBlueprint 
    ? blueprints.find(b => b.id === appState.selectedBlueprint)?.name 
    : 'Custom Configuration';
  
  return `
    <div class="offer-brief-content">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">MTN Education Solution</h1>
        <h2 class="text-xl text-gray-600">Offer Brief for ${profile.clientName}</h2>
        <p class="text-sm text-gray-500 mt-2">Generated on ${new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      
      <section class="mb-8">
        <h3 class="text-lg font-bold text-orange-600 mb-3 border-b pb-2">1. Executive Summary</h3>
        <p class="text-gray-700 leading-relaxed">
          MTN proposes a comprehensive digital education solution for ${profile.clientName}, designed to transform teaching and learning across ${profile.numSites} sites serving ${profile.numLearners.toLocaleString()} learners and ${profile.numTeachers} educators in ${profile.province}.
        </p>
        <p class="text-gray-700 leading-relaxed mt-3">
          This solution, based on the <strong>${blueprintName}</strong> blueprint, addresses the key educational priorities identified during our needs assessment and aligns with the Department of Basic Education's Digital Learning Framework.
        </p>
        <div class="mt-4 p-4 bg-orange-50 rounded-lg">
          <div class="grid grid-cols-3 gap-4 text-center">
            <div>
              <div class="text-2xl font-bold text-orange-600">R${calculations.tcv.toLocaleString()}</div>
              <div class="text-xs text-gray-600">Total Contract Value</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-orange-600">${appState.pricing.contractTerm} months</div>
              <div class="text-xs text-gray-600">Contract Term</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-orange-600">${appState.solutionConfig.length}</div>
              <div class="text-xs text-gray-600">Solution Components</div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="mb-8">
        <h3 class="text-lg font-bold text-orange-600 mb-3 border-b pb-2">2. Client Context & Needs</h3>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h4 class="font-semibold text-gray-800 mb-2">Client Profile</h4>
            <ul class="text-sm text-gray-700 space-y-1">
              <li><strong>Entity:</strong> ${profile.clientName}</li>
              <li><strong>Type:</strong> ${profile.buyerType}</li>
              <li><strong>Province:</strong> ${profile.province}</li>
              <li><strong>Funding Status:</strong> ${profile.fundingPosture}</li>
              <li><strong>Current Connectivity:</strong> ${profile.connectivityStatus}</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-gray-800 mb-2">Scope of Deployment</h4>
            <ul class="text-sm text-gray-700 space-y-1">
              <li><strong>Sites:</strong> ${profile.numSites} schools/facilities</li>
              <li><strong>Learners:</strong> ${profile.numLearners.toLocaleString()} students</li>
              <li><strong>Teachers:</strong> ${profile.numTeachers} educators</li>
            </ul>
          </div>
        </div>
        
        <div>
          <h4 class="font-semibold text-gray-800 mb-2">Priority Needs Identified</h4>
          <div class="grid grid-cols-2 gap-2">
            ${needCategories
              .filter(cat => (appState.needsAssessment[cat.id] || 0) >= 3)
              .map(cat => `
                <div class="flex items-center space-x-2 text-sm">
                  <div class="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    ${appState.needsAssessment[cat.id]}
                  </div>
                  <span class="text-gray-700">${cat.name}</span>
                </div>
              `).join('')}
          </div>
        </div>
        
        ${appState.needsAssessment.discoveryNotes ? `
          <div class="mt-4 p-3 bg-gray-50 rounded">
            <h4 class="font-semibold text-gray-800 mb-2">Discovery Notes</h4>
            <p class="text-sm text-gray-700 italic">${appState.needsAssessment.discoveryNotes}</p>
          </div>
        ` : ''}
      </section>
      
      <section class="mb-8">
        <h3 class="text-lg font-bold text-orange-600 mb-3 border-b pb-2">3. Proposed Solution</h3>
        <p class="text-gray-700 mb-4">
          The <strong>${blueprintName}</strong> solution comprises ${appState.solutionConfig.length} integrated components across ${Object.keys(calculations.byCategory).length} categories:
        </p>
        
        <div class="space-y-3">
          ${Object.entries(
            appState.solutionConfig.reduce((acc, configItem) => {
              const item = solutionLibrary.find(i => i.id === configItem.itemId);
              if (!item) return acc;
              if (!acc[item.category]) acc[item.category] = [];
              acc[item.category].push({ item, quantity: configItem.quantity });
              return acc;
            }, {})
          ).map(([category, items]) => `
            <div class="border border-gray-200 rounded p-3">
              <h4 class="font-semibold text-gray-800 mb-2">${category}</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                ${items.map(({ item, quantity }) => `
                  <li>• <strong>${item.name}</strong> (Qty: ${quantity}) - ${item.description}</li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </section>
      
      <section class="mb-8">
        <h3 class="text-lg font-bold text-orange-600 mb-3 border-b pb-2">4. Implementation Plan</h3>
        <div class="space-y-4">
          <div>
            <h4 class="font-semibold text-gray-800 mb-2">Phase 1: Pilot (Months 1-2)</h4>
            <ul class="text-sm text-gray-700 space-y-1 ml-4">
              <li>• Site surveys and technical assessments (2-3 pilot schools)</li>
              <li>• Infrastructure installation and configuration</li>
              <li>• Teacher training and change management</li>
              <li>• Pilot monitoring and optimization</li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold text-gray-800 mb-2">Phase 2: Scale (Months 3-6)</h4>
            <ul class="text-sm text-gray-700 space-y-1 ml-4">
              <li>• Lessons learned integration from pilot</li>
              <li>• Rollout to remaining ${Math.max(0, profile.numSites - 3)} sites in phased approach</li>
              <li>• Continuous teacher support and coaching</li>
              <li>• Performance monitoring and reporting</li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold text-gray-800 mb-2">Phase 3: Optimize (Months 7+)</h4>
            <ul class="text-sm text-gray-700 space-y-1 ml-4">
              <li>• Data-driven optimization based on usage analytics</li>
              <li>• Advanced feature enablement</li>
              <li>• Quarterly business reviews with stakeholders</li>
              <li>• Continuous improvement and innovation</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section class="mb-8">
        <h3 class="text-lg font-bold text-orange-600 mb-3 border-b pb-2">5. Commercials Summary</h3>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <h4 class="font-semibold text-gray-800 mb-3">Investment Breakdown</h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between p-2 bg-orange-50 rounded">
                <span class="text-gray-700">Once-Off Investment</span>
                <span class="font-bold text-orange-600">R${calculations.onceOff.toLocaleString()}</span>
              </div>
              <div class="flex justify-between p-2 bg-blue-50 rounded">
                <span class="text-gray-700">Monthly Recurring</span>
                <span class="font-bold text-blue-600">R${calculations.monthly.toLocaleString()}</span>
              </div>
              <div class="flex justify-between p-2 bg-green-50 rounded">
                <span class="text-gray-700">Contract Term</span>
                <span class="font-bold text-green-600">${appState.pricing.contractTerm} months</span>
              </div>
              ${appState.pricing.discount > 0 ? `
                <div class="flex justify-between p-2 bg-yellow-50 rounded">
                  <span class="text-gray-700">Discount Applied</span>
                  <span class="font-bold text-yellow-600">${appState.pricing.discount}%</span>
                </div>
              ` : ''}
              <div class="flex justify-between p-3 bg-purple-100 rounded border-2 border-purple-300">
                <span class="font-bold text-gray-800">Total Contract Value</span>
                <span class="font-bold text-purple-600 text-lg">R${calculations.tcv.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold text-gray-800 mb-3">Key Assumptions</h4>
            <ul class="text-sm text-gray-700 space-y-1">
              ${calculations.assumptions.map(a => `<li>• ${a}</li>`).join('')}
            </ul>
          </div>
        </div>
      </section>
      
      <section class="mb-8">
        <h3 class="text-lg font-bold text-orange-600 mb-3 border-b pb-2">6. Key Performance Indicators (KPIs)</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="border border-gray-200 rounded p-3">
            <h4 class="font-semibold text-gray-800 mb-2">Technical KPIs</h4>
            <ul class="text-sm text-gray-700 space-y-1">
              <li>• Network uptime: ≥99.5%</li>
              <li>• Incident response time: <4 hours</li>
              <li>• Device availability: ≥95%</li>
              <li>• Security compliance: 100%</li>
            </ul>
          </div>
          
          <div class="border border-gray-200 rounded p-3">
            <h4 class="font-semibold text-gray-800 mb-2">Educational KPIs</h4>
            <ul class="text-sm text-gray-700 space-y-1">
              <li>• Teacher adoption rate: ≥80% by Month 6</li>
              <li>• Learner engagement: +30% increase</li>
              <li>• Digital content usage: 500+ hours/week</li>
              <li>• Parent engagement: +40% increase</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section class="mb-8">
        <h3 class="text-lg font-bold text-orange-600 mb-3 border-b pb-2">7. Risks & Dependencies</h3>
        <div class="space-y-3">
          <div class="border-l-4 border-yellow-500 pl-3 py-2 bg-yellow-50">
            <h4 class="font-semibold text-gray-800 text-sm">Infrastructure Readiness</h4>
            <p class="text-sm text-gray-700">Power availability and structural readiness at sites - requires pre-deployment site surveys</p>
          </div>
          
          <div class="border-l-4 border-yellow-500 pl-3 py-2 bg-yellow-50">
            <h4 class="font-semibold text-gray-800 text-sm">Last-Mile Connectivity</h4>
            <p class="text-sm text-gray-700">Some rural sites may require alternative connectivity solutions (LTE/satellite)</p>
          </div>
          
          <div class="border-l-4 border-yellow-500 pl-3 py-2 bg-yellow-50">
            <h4 class="font-semibold text-gray-800 text-sm">Change Management</h4>
            <p class="text-sm text-gray-700">Teacher readiness and digital skills - comprehensive training program included</p>
          </div>
          
          <div class="border-l-4 border-yellow-500 pl-3 py-2 bg-yellow-50">
            <h4 class="font-semibold text-gray-800 text-sm">POPIA Compliance</h4>
            <p class="text-sm text-gray-700">Learner data protection and privacy - solution designed for full POPIA compliance</p>
          </div>
          
          <div class="border-l-4 border-yellow-500 pl-3 py-2 bg-yellow-50">
            <h4 class="font-semibold text-gray-800 text-sm">On-Site Support</h4>
            <p class="text-sm text-gray-700">Local technical capacity for ongoing support - 24/7 managed support included</p>
          </div>
        </div>
      </section>
      
      <div class="mt-12 pt-6 border-t-2">
        <p class="text-sm text-gray-600 text-center italic">
          This Offer Brief is valid for 60 days from date of issue and subject to final technical assessment and commercial negotiation.
        </p>
        <p class="text-sm text-gray-600 text-center mt-2">
          <strong>MTN Business Education Solutions</strong> | education@mtn.co.za | 083 123 4567
        </p>
      </div>
    </div>
  `;
}

// Export and utility functions
function exportOfferBrief() {
  // For demo: Create a simple HTML page that can be printed as PDF
  const brief = generateOfferBriefContent();
  const profile = appState.clientProfile;
  
  const exportWindow = window.open('', '_blank');
  exportWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>MTN Education Offer Brief - ${profile.clientName}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        @media print {
          body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
        }
      </style>
    </head>
    <body class="p-8 bg-white">
      <div class="max-w-4xl mx-auto">
        ${brief}
      </div>
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 1000);
        };
      </script>
    </body>
    </html>
  `);
  exportWindow.document.close();
}

function copyToClipboard() {
  const brief = document.querySelector('.offer-brief-content');
  if (brief) {
    const text = brief.innerText;
    navigator.clipboard.writeText(text).then(() => {
      alert('Offer brief copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }
}

function saveDeal() {
  const deal = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    clientName: appState.clientProfile.clientName,
    tcv: calculatePricing().tcv,
    ...appState
  };
  
  appState.savedDeals.push(deal);
  saveState();
  alert(`Deal saved successfully! Total saved deals: ${appState.savedDeals.length}`);
}

function resetDemo() {
  if (confirm('Are you sure you want to reset all demo data? This cannot be undone.')) {
    localStorage.removeItem('mtnEduDemoState');
    localStorage.removeItem('mtnEduDeals');
    location.reload();
  }
}

function attachEventListeners() {
  // Any additional event listeners for dynamic content can be attached here
  // Most events are handled via inline onclick handlers for simplicity in this demo
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
