// ========== PAGE NAVIGATION (Must be first for onclick handlers) ==========
function switchPage(pageName) {
  console.log('Switching to page:', pageName);

  // Hide all pages
  document.querySelectorAll('.page-content').forEach(page => {
    page.classList.remove('active');
  });

  // Remove active class from all nav tabs
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.remove('active');
  });

  // Show selected page
  const targetPage = document.getElementById(pageName + 'Page');
  if (targetPage) {
    targetPage.classList.add('active');
    console.log('Activated page:', pageName);
  } else {
    console.error('Page not found:', pageName + 'Page');
  }

  // Add active class to clicked tab
  const targetTab = document.querySelector('.nav-tab[data-page="' + pageName + '"]');
  if (targetTab) {
    targetTab.classList.add('active');
  }

  // If switching to analytics, refresh the data
  if (pageName === 'analytics' && typeof getAllQuotesForAnalytics === 'function') {
    setTimeout(function() {
      const quotes = getAllQuotesForAnalytics();
      updateAnalyticsDashboard(quotes);
    }, 100);
  }

  // Save current page to localStorage
  localStorage.setItem('currentPage', pageName);
}

// Ensure quotes page is default on load
document.addEventListener('DOMContentLoaded', function() {
  // Always start on quotes page
  const quotesPage = document.getElementById('quotesPage');
  const analyticsPage = document.getElementById('analyticsPage');
  const quotesTab = document.querySelector('.nav-tab[data-page="quotes"]');
  const analyticsTab = document.querySelector('.nav-tab[data-page="analytics"]');

  if (quotesPage) quotesPage.classList.add('active');
  if (analyticsPage) analyticsPage.classList.remove('active');
  if (quotesTab) quotesTab.classList.add('active');
  if (analyticsTab) analyticsTab.classList.remove('active');

  console.log('Page initialized - quotes page is active');
});

const CONFIG = {
  stepDefinitions: {
    client: {
      title: "Client Information",
      description: "Start with the quote type, client profile, and the core opportunity details."
    },
    modules: {
      title: "Module Scope",
      description: "Select the EPL modules and in-scope services for the opportunity."
    },
    delivery: {
      title: "Conversions, Reports & Integrations",
      description: "Review integration, reporting, and conversion details only for the services selected in module scope."
    },
    "sales-quote": {
      title: "Sales Quote Entry",
      description: "Use this only when the quote is already priced and you need the notes, scope, and output document to reflect the quoted service lines."
    },
    addons: {
      title: "Add-On Scope",
      description: "Choose add-ons and capture internal scoping notes."
    }
  },
  suites: [
    { id: "community-development", name: "Community Development" },
    { id: "business-management", name: "Business Management" },
    { id: "environmental-health", name: "Environmental Health" }
  ],
  addons: [
    { id: "civic-access", name: "Civic Access" },
    { id: "ereviews", name: "eReviews" },
    { id: "ereviews-external-reviewers", name: "eReviews External Reviewers" },
    { id: "workforce-mobile", name: "Workforce Mobile" },
    { id: "decision-engine", name: "Decision Engine" },
    { id: "selectron-ivr", name: "Selectron IVR" },
    { id: "other-ivr", name: "Other IVR" },
    { id: "epl-document-management-api", name: "3rd Party EPL Document Management API Connector" },
    { id: "citizen-connect", name: "Citizen Connect" },
    { id: "tyler-cashiering", name: "Tyler Cashiering" },
    { id: "erp", name: "ERP Pro Financial" },
    { id: "erp-pro", name: "EERP Financials" },
    { id: "new-world-erp", name: "New World ERP" },
    { id: "enterprise-assessment-tax", name: "Enterprise Assessment and Tax" },
    { id: "my-civic-bundle", name: "My Civic Bundle" },
    { id: "content-manager", name: "Content Manager" },
    { id: "executive-insights", name: "Executive Insights (D&I)" },
    { id: "eagle-recorder", name: "Eagle Recorder" },
    { id: "enterprise-asset-management", name: "Enterprise Asset Management (EAM)" },
    { id: "fire-prevention-mobile", name: "Fire Prevention Mobile" },
    { id: "digeplan", name: "DigEplan" },
    { id: "enterprise-service-requests", name: "Enterprise Service Request (ESR)" },
    { id: "ai-resident-connect", name: "AI Resident Connect" },
    { id: "ai-preapplication-assistant", name: "AI Pre-Application Assistant" },
    { id: "ai-civic-access-assistant", name: "AI Civic Access Assistant" },
    { id: "automated-file-review", name: "Automated File Review" },
    { id: "ai", name: "AI" }
  ],
  commonAddonIds: ["ereviews", "digeplan", "decision-engine"],
  scopeMap: [
    { id: "includeImplementation", label: "Implementation" },
    { id: "includeTraining", label: "Training" },
    { id: "includeConversion", label: "Data Conversion" },
    { id: "includeIntegration", label: "Integration Services" },
    { id: "includeReports", label: "Reporting Services" },
    { id: "includeTravel", label: "Travel / Onsite Support" }
  ],
  conversionModules: [
    { id: "community-development", name: "EPL Community Development" },
    { id: "business-management", name: "EPL Business Management" },
    { id: "environmental-health", name: "EPL Environmental Health" }
  ],
  populationTiers: {
    city: [
      { tier: "A", min: 0, max: 10000 },
      { tier: "B", min: 10000, max: 25000 },
      { tier: "C", min: 25000, max: 50000 },
      { tier: "D", min: 50000, max: 100000 },
      { tier: "E", min: 100000, max: 250000 },
      { tier: "F", min: 250000, max: 500000 },
      { tier: "G", min: 500000, max: 1000000 },
      { tier: "H", min: 1000000, max: 2000000 },
      { tier: "I", min: 2000000, max: Number.POSITIVE_INFINITY }
    ],
    county: [
      { tier: "A", min: 0, max: 20000 },
      { tier: "B", min: 20000, max: 50000 },
      { tier: "C", min: 50000, max: 100000 },
      { tier: "D", min: 100000, max: 200000 },
      { tier: "E", min: 200000, max: 500000 },
      { tier: "F", min: 500000, max: 1000000 },
      { tier: "G", min: 1000000, max: 2000000 },
      { tier: "H", min: 2000000, max: 3000000 },
      { tier: "I", min: 3000000, max: Number.POSITIVE_INFINITY }
    ]
  },
  conversionPricing: {
    "epl-current-to-epl": {
      "community-development": { B: 18000, C: 19000, D: 20000, E: 22000, F: 25000, G: 28000, H: 30000, I: 35000, J: 40000, K: 49000, L: 59000 },
      "business-management": { B: 24500, C: 25500, D: 28000, E: 32000, F: 36000, G: 38000, H: 41000, I: 45000, J: 55000, K: 65000, L: 75000 },
      "environmental-health": { B: 22000, C: 23500, D: 25000, E: 27500, F: 31000, G: 32500, H: 34000, I: 42000, J: 50500, K: 58500, L: 70000 }
    },
    energov: {
      "community-development": { B: 6500, C: 6500, D: 6500, E: 6500, F: 7500, G: 8000, H: 8000, I: 8000, J: 8000, K: 8000, L: 8000 },
      "business-management": { B: 5500, C: 5500, D: 5500, E: 5500, F: 5500, G: 7000, H: 7000, I: 7000, J: 7000, K: 7000, L: 7000 },
      "environmental-health": { B: 5500, C: 5500, D: 5500, E: 5500, F: 5500, G: 7000, H: 7000, I: 7000, J: 7000, K: 7000, L: 7000 }
    }
  },
  dataArchivePricing: {
    "community-development": { B: 6000, C: 7000, D: 8000, E: 9000, F: 10000, G: 11000, H: 12000, I: 13000, J: 14000, K: 15000, L: 16000 },
    "business-management": { B: 8000, C: 9000, D: 10000, E: 11000, F: 12000, G: 13000, H: 14000, I: 15000, J: 16000, K: 17000, L: 18000 },
    "environmental-health": { B: 7000, C: 8000, D: 9000, E: 10000, F: 11000, G: 12000, H: 13000, I: 14000, J: 15000, K: 16000, L: 17000 }
  },
  tcmConversionPricing: {
    B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, I: 0, J: 0, K: 0, L: 0
  },
  hostingFees: {
    B: 1500, C: 2000, D: 2000, E: 4000, F: 4000, G: 4000, H: 5000, I: 5000, J: 6000, K: 7000, L: 7000
  },
  notes: {
    standard: [
      "Project Delays and Change Control: Delays resulting from the client's completion, review, or acceptance of deliverables that extend the overall project timeline will be managed through the formal change control process and may result in additional costs, including additional project management, consulting, and conversion development hours.",
      "Cancellation Policy: If the client cancels services with fewer than two weeks' notice, the client will be responsible for all non-refundable expenses incurred on their behalf and daily fees for canceled services if Tyler is unable to reassign assigned personnel.",
      "Implementation Service Hours: Implementation services are delivered in four- or eight-hour increments. Service hours are based on an assumed mix of approximately 75% remote and 25% onsite work, though this may vary by project. Travel expenses are not included.",
      "Public Administration Security Console (PASC): PASC is a secure access tool that allows Tyler Support staff to access client environments using Tyler-owned accounts with rotating passwords.",
      "GIS Responsibilities: The client is responsible for providing and maintaining all GIS services required by Enterprise Permitting and Licensing in accordance with Tyler's GIS deployment standards.",
      "Civic Access: Tyler will ensure the portal is operational, integrated with GIS, configure the payment portal when applicable, and provide training for Civic Access configuration. The client is responsible for configuring online applications and any components not explicitly listed.",
      "Enterprise Service Requests (ESR): Tyler will configure and validate the ESR connection points included in scope. The client is responsible for ongoing request configuration, form content, routing decisions, and operational ownership of ESR processes after deployment.",
      "Executive Insights: Tyler will connect the EPL data source to Executive Insights and provide guidance on standard dashboard availability. The client is responsible for dashboard administration, ongoing maintenance, and any additional analytics configuration not explicitly included in scope.",
      "Hub: Tyler will connect the Enterprise Permitting and Licensing data source to Hub and provide training on dashboard personalization. The client is responsible for creating, maintaining, and managing dashboards. Any additional data source integrations are subject to change control and may incur additional costs."
    ],
    implementation: {
      epl: {
        intro: "Enterprise Permitting & Licensing (EPL) Implementation: This implementation follows a shared services model. Tyler is responsible for configuring 5 unique case types as examples, with the client completing the remaining configuration. Each unique case type configured by Tyler is estimated to require 25-30 hours for definition, configuration, and validation. Tyler will also enable the application's standard Geo Rules and standard automation events. The client will manage all additional configuration tasks.",
        tyler: [
          "Training on EPL functionality.",
          "Providing training, best practices, and consultation on software configuration and maintenance for EPL and Civic Access applications.",
          "Establish connections between EPL, Civic Access, and the client-published GIS map services and configure EPL's Live Link component.",
          "Configure and validate core EPL functionalities, including global settings and initial user roles.",
          "Configure and validate the payment system for EPL and Civic Access or enable electronic payments based on client-supplied payment gateway information where applicable.",
          "Configure and validate integrations between Tyler products such as Enterprise ERP, Cashiering, Content Manager, and Enterprise Service Requests as applicable based on the contract."
        ],
        clientIntro: "The client's Subject Matter Experts are expected to be available approximately 25-50% each week, depending on the number of processes, throughout the project to perform configuration and validation in addition to time spent with the Tyler team. The client's configuration team should plan to dedicate 30-45 hours per process following the completion of configuration training.",
        client: [
          "Configure case types and work classes, including all associated module components.",
          "Set up system configurations such as holidays, zones, hold types, and hearing types.",
          "Configure dynamic custom fields for Report Setup.",
          "Configure users and user roles.",
          "Configure workflow components and workflow templates, including steps, actions, submittal types, and item reviews.",
          "Customize and administer Civic Access, including allowed case types, application instructions, geo rules, themes, headers, menus, and security settings.",
          "Configure automation events, including Intelligent Objects and standard Intelligent Queries, to manage tasks such as emails, tasks, and geo rules.",
          "Manage any additional configuration tasks as desired by the client."
        ]
      },
      environmentalHealth: {
        intro: "Environmental Health implementation follows a shared services model. Tyler configures 5 processes, including its violation library content, one code case type, and one ESR case type, as examples. The client will complete the remaining configuration. Each case type configured by Tyler is estimated to require 25-30 hours for definition, configuration, and validation. Tyler will also enable the standard Geo Rules and automation events included in the application. The client will manage all additional configuration tasks.",
        tyler: [
          "Training on Environmental Health functionality.",
          "Providing training, best practices, and guidance on software configuration and maintenance for Environmental Health and Civic Access applications.",
          "Establish connections between Environmental Health, Civic Access, and the client-published GIS map services and configure Environmental Health's Live Link component.",
          "Configure the Environmental Health and Civic Access payment system or enable electronic payments based on client-supplied payment gateway information where applicable.",
          "Configure and validate integrations between Tyler products such as Enterprise ERP, Cashiering, Content Manager, and Enterprise Service Requests as applicable based on the contract."
        ],
        clientIntro: "The client's Subject Matter Experts are expected to be available approximately 25-50% each week, depending on the number of processes, throughout the project to perform configuration and validation in addition to time spent with the Tyler team. The client's configuration team should plan to dedicate 30-45 hours per process following the completion of configuration training.",
        client: [
          "Configure case types and work classes, including all associated module components.",
          "Set up system configurations such as holidays, zones, hold types, and hearing types.",
          "Configure dynamic custom fields for Report Setup.",
          "Configure users and user roles.",
          "Configure workflow components and templates, including steps, actions, submittal types, and item reviews.",
          "Customize and administer Civic Access, including allowed case types, application instructions, geo rules, themes, headers, menus, and security settings.",
          "Configure automation events, including Intelligent Objects and standard Intelligent Queries, to manage tasks such as emails, tasks, and geo rules.",
          "Manage any additional configuration tasks as desired by the client."
        ],
        mobile: "Environmental Health Mobile offers mobile solutions enabling field personnel to capture inspection and health data remotely. Tyler will integrate these mobile applications with EPL and support the necessary testing."
      }
    },
    integrations: {
      base: [
        "Enterprise Permitting & Licensing (EPL) API Implementation & Support: Tyler's services for EPL API implementation are limited to delivering the API and providing guidance to the client's integration development team. Tyler does not offer integration development services for EPL API or SDK toolkits. The client, or a chosen third-party integrator, is responsible for all development work related to the API or SDK.",
        "No additional integrations are included in the scope of this implementation."
      ],
      "tyler-cashiering": "Integration with Cashiering: Tyler will configure, test, provide training, and support the go-live for Cashiering functionality EPL uses.",
      "content-manager": "Integration with Content Manager - Enterprise Permitting & Licensing Tie-in (Standard Edition): Tyler will configure, test, provide training, and support the go-live for Content Manager functionality used by EPL. A full Content Manager implementation is outside the scope of this project.",
      erp: "Integration of EPL to ERP Pro Financial: Tyler will configure, test, provide training, and support the go-live based on the EPL user interface. The client is expected to be proficient in the ERP Pro Financial software.",
      "erp-pro": "Integration of EPL to EERP Financials: Tyler will configure, test, provide training, and support the go-live based on the EPL user interface. The client is expected to be proficient in the EERP Financials software.",
      "new-world-erp": "Integration of EPL to 3rd Party Financial Software: Tyler will develop, provide training, and support the go-live based on the specifications provided. The client is responsible for testing the integration and is expected to be proficient in the third-party financial software.",
      "my-civic-bundle": "Integration with MyCivic: Tyler will establish the connection and verify data exchange between MyCivic and ESR with EPL for code cases and requests. MyCivic Limited is a generic application with no branding. MyCivic Branded is a specific application for Apple."
    },
    conversion: {
      template: "Template Conversion: The client will populate Tyler's Data Conversion Template database with all legacy data to be converted into EPL. The client is responsible for the accuracy and quality of the legacy data. Tyler will use the completed template to generate a mapping document, and the client is responsible for all data mapping decisions and document completion.",
      templatePasses: "The scope of this implementation includes four conversion passes: two evaluation passes, one simulated go-live pass, and one final go-live pass. Partial passes requested from an incomplete conversion template are not included in scope and are subject to change control. Tyler will not provide SQL scripts or training.",
      full: "Full Conversion: The client will provide Tyler with the agreed legacy data sources in an acceptable format. Tyler will populate the Data Conversion Template database with the legacy data and produce a mapping document so the client can correlate legacy data fields with EPL fields. Tyler will not manipulate or correct the legacy data on behalf of the client.",
      fullPasses: "The scope of this implementation includes four conversion passes: two evaluation passes, one simulated go-live pass, and one final go-live pass.",
      additional: "No additional conversion services are included in the scope of this implementation.",
      invoicing: "Fixed-fee conversion services are invoiced 50 percent upon initial delivery and 50 percent upon client acceptance for production load."
    },
    reporting: {
      customReports: "Custom Reports are designed from the ground up based on client specifications and return data from multiple records based on selection criteria.",
      customForms: "Custom Forms and Letters are created from the ground up based on client specifications and return data from a single record, such as a permit or code case.",
      none: "No custom reports, forms, or letters are included in this implementation."
    },
    training: [
      "Each 40-hour training engagement includes four full days of instruction and up to eight hours of preparation and administrative time.",
      "Solutions Orientation Training helps new clients learn general terminology, experience the basic functionality of the software, encourage client-side discussions, discover additional software capabilities, improve communication between Tyler and the client, and prepare for the Assess and Define process.",
      "Configuration Training helps clients understand general terminology, experience the basic functionality of the software, and understand best practices for configuration standards.",
      "Solution Validation training teaches users how to validate configuration in the client's testing environment, experience the functionality of the suite, review the Solution Validation Training guides, and understand how to test the applications.",
      "System Administrator Training covers system-wide processes, including System Setup, Navigation with GIS, Contact Management, User Setup, User Roles, Custom Fields, Workflow Basics, Cashiering fee basis and template configuration, Reports, and Document basics. Business process instruction is not included, and a client SME is expected to participate.",
      "Train-the-Trainer is advanced training intended to develop client-side software subject matter experts. Attendees are expected to demonstrate their understanding of the topics presented.",
      "End User Training is the final training component before go-live and covers the end-user functionality of the modules being used. Business process instruction is not included, and a client SME is expected to participate throughout the training.",
      "Training focuses on system functionality and usage. Business process instruction remains the responsibility of the client, with subject matter experts participating throughout training sessions."
    ],
    changeManagement: [
      "Enterprise Change Management may include Project Kickoff on-site support, Project Lifecycle remote support, Project Go-Live on-site support, a Sponsor Guide with messaging tools, a Procedural Change Management Guide with process tracking tools, a Resistance Management Guide with resistance management tools, and an After-Action and Recognition Guide with an After-Action Review tool."
    ],
    addonSpecific: {
      "civic-access": "Civic Access is scoped per selected module or suite.",
      "citizen-connect": "Citizen Connect: Tyler will configure and validate the Citizen Connect functionality included in scope. The client is responsible for content, app administration, notification ownership, and ongoing operational maintenance unless otherwise stated in the quote.",
      ereviews: "eReviews enables electronic plan review and document markup by client staff. This functionality requires a Bluebeam Core or Complete license for each reviewer, estimated at $300 per user annually, and a Bluebeam Studio Prime subscription, estimated at $2,500 annually for up to 100 users. These licenses and subscriptions must be purchased directly by the client.",
      "ereviews-external-reviewers": "eReviews External Reviewers supports a more formal third-party reviewer access model to EPL.",
      "decision-engine": "Decision Engine is a web-based extension of Civic Access that guides citizens to the appropriate applications through a question-based workflow. Tyler will establish the connection, provide troubleshooting support, and deliver configuration training. The client is responsible for designing and maintaining the questionnaires.",
      "executive-insights": "Executive Insights setup is production only.",
      "enterprise-service-requests": "Enterprise Service Request (ESR) includes a base setup plus additional scope per quoted case type.",
      "my-civic-bundle": "MyCivic is always quoted with ESR.",
      "fire-prevention-mobile": "Environmental Health Mobile offers mobile solutions enabling field personnel to capture inspection and health data remotely. Tyler will integrate these mobile applications with EPL and support the necessary testing."
    }
  }
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const ADDON_SERVICE_CONFIG = {
  "civic-access": { hours: 16, perSuite: true },
  ereviews: { hours: 80 },
  "ereviews-external-reviewers": { hours: 40, notes: "External Reviewers provides a more formal third-party reviewer access path into EPL." },
  "workforce-mobile": { hours: 16 },
  "decision-engine": { hours: 12, notes: "Decision Engine includes 8 hours of training and 4 hours of setup." },
  "tyler-cashiering": { hours: 44 },
  "content-manager": { hours: 36 },
  "executive-insights": { hours: 4, notes: "Executive Insights setup is production only." },
  "citizen-connect": { hours: 24, perSuite: true },
  "selectron-ivr": { hours: 96 },
  "other-ivr": { hours: 112 },
  "epl-document-management-api": { hours: 32 },
  digeplan: { hours: 124 },
  "ai-resident-connect": { hours: 0 },
  "ai-preapplication-assistant": { hours: 200 },
  "ai-civic-access-assistant": { hours: 0 },
  "automated-file-review": { hours: 0 },
  "eagle-recorder": { hours: 4 },
  "enterprise-asset-management": { hours: 4 },
  "enterprise-assessment-tax": { hours: 4 },
  erp: { hours: 12 },
  "erp-pro": { hours: 12 },
  "my-civic-bundle": { hours: 16, notes: "MyCivic is always quoted with Enterprise Service Request (ESR)." },
  "new-world-erp": { hours: 8 },
  "enterprise-service-requests": { hours: 12, extraCaseTypeHours: 4, notes: "Enterprise Service Request (ESR) includes 12 hours plus 4 additional hours per case type." }
};

const APPOLLO_BUILDING_TEMPLATES = [
  "Building (Commercial) - Accessory Structure",
  "Building (Commercial) - Addition",
  "Building (Commercial) - Alteration, Remodel, Repair",
  "Building (Commercial) - Concrete Work",
  "Building (Commercial) - Demolition",
  "Building (Commercial) - Fence",
  "Building (Commercial) - Foundation Only",
  "Building (Commercial) - New Construction",
  "Building (Residential) - Accessory Structure",
  "Building (Residential) - Addition",
  "Building (Residential) - Alteration, Remodel, Repair",
  "Building (Residential) - Concrete Work",
  "Building (Residential) - Fence",
  "Building (Residential) - Foundation Only",
  "Building (Residential) - Manufactured Home",
  "Building (Residential) - Modular Home",
  "Building (Residential) - New Construction",
  "Building (Residential) - Relocation",
  "Certificate of Occupancy - Certificate of Occupancy",
  "Certificate of Occupancy - Temporary Certificate of Occupancy",
  "Clearing and Grading - Commercial",
  "Clearing and Grading - Residential",
  "Electrical (Commercial) - Alteration, Remodel, Repair",
  "Electrical (Commercial) - New Construction",
  "Electrical (Commercial) - Service Change",
  "Electrical (Commercial) - Sign",
  "Electrical (Commercial) - Temporary",
  "Electrical (Residential) - Alteration, Remodel, Repair",
  "Electrical (Residential) - New Construction",
  "Electrical (Residential) - Service Change",
  "Electrical (Residential) - Temporary",
  "Mechanical (Commercial) - Alteration, Remodel, Repair",
  "Mechanical (Commercial) - HVAC Changeout",
  "Mechanical (Commercial) - New Construction",
  "Mechanical (Residential) - Alteration, Remodel, Repair",
  "Mechanical (Residential) - HVAC Changeout",
  "Mechanical (Residential) - New Construction",
  "Plumbing (Commercial) - Alteration, Remodel, Repair",
  "Plumbing (Commercial) - New Construction",
  "Plumbing (Commercial) - Pool",
  "Plumbing (Commercial) - Water Heater",
  "Plumbing (Residential) - Alteration, Remodel, Repair",
  "Plumbing (Residential) - New Construction",
  "Plumbing (Residential) - Pool",
  "Plumbing (Residential) - Water Heater",
  "Pool (Commercial) - Above Ground",
  "Pool (Commercial) - In Ground",
  "Pool (Residential) - Above Ground",
  "Pool (Residential) - In Ground"
];

const APPOLLO_PLANNING_CASE_TYPES = [
  "Abandonment - Easement",
  "Abandonment - Right of Way",
  "Annexation - Annexation",
  "Annexation - Deannexation",
  "Appeal - Board of Administrative Review",
  "Appeal - Board of Zoning Appeals",
  "Appeal - Council",
  "Appeal - Planning Commission",
  "Business License Review",
  "Home Occupation",
  "Land Use - Conditional Use",
  "Land Use - Special Use",
  "Land Use - Temporary Use",
  "Lot Line Adjustment",
  "Planned Unit Development - Final PUD",
  "Planned Unit Development - Preliminary PUD",
  "Pre-Application Review - Pre-Application Review",
  "Professional License Review",
  "Rezone - Map Amendment",
  "Rezone - Text Amendment",
  "Rezone - Text/Map Amendment",
  "Standard Building Plan",
  "Subdivision Plat - Final Plat",
  "Subdivision Plat - Preliminary Plat",
  "Variance - Major Variance",
  "Variance - Minor Variance",
  "Zoning Confirmation"
];

const APPOLLO_CODE_CASE_TYPES = [
  "Code Enforcement - Accessibility",
  "Code Enforcement - Animals",
  "Code Enforcement - Building",
  "Code Enforcement - Fire",
  "Code Enforcement - Health and Sanitation",
  "Code Enforcement - Property Maintenance",
  "Code Enforcement - Stormwater",
  "Code Enforcement - Vegetation",
  "Code Enforcement - Zoning"
];

const APPOLLO_BUSINESS_CASE_TYPES = [
  "General Business License",
  "Alcohol License"
];

function formatHours(value) {
  return String(Math.round(value || 0));
}

function roundUpToFourHours(value) {
  if (!value || value <= 0) {
    return 0;
  }
  return Math.ceil(value / 4) * 4;
}

function roundQuotedHours(value, isAddonOnly = false) {
  if (!value || value <= 0) {
    return 0;
  }
  const increment = isAddonOnly ? 2 : 4;
  return Math.ceil(value / increment) * increment;
}

function getEffectivePmPercentage(settings, isAddonOnly = false) {
  if (isAddonOnly) {
    return ADDON_PM_PERCENTAGE;
  }
  return settings.pmPercentage || PM_PERCENTAGE;
}

function calculatePmHoursFromIc(icHours, settings, isAddonOnly = false) {
  if (!icHours || icHours <= 0) {
    return 0;
  }
  const pmHours = roundQuotedHours(icHours * getEffectivePmPercentage(settings, isAddonOnly), isAddonOnly);
  return isAddonOnly ? Math.max(pmHours, ADDON_PM_MIN_HOURS) : pmHours;
}

function isAppolloMode(modelValue = els.serviceDeliveryModel?.value) {
  return getServiceDeliveryModelConfig(modelValue).isAppollo === true;
}

function getApolloOptionalConversionItem() {
  if (!isAppolloMode()) {
    return null;
  }
  const sourceMap = getConversionSources();
  const selectedModules = getSelectedConversionModules();
  if (!selectedModules.length) {
    return null;
  }
  const conversion = calculateConversion();
  const model = els.conversionModel?.value || "epl-current-to-epl";
  const pricingTable = CONFIG.conversionPricing[model] || {};
  const fixedValue = Math.round(selectedModules.reduce((sum, moduleId) => {
    const basePrice = pricingTable?.[moduleId]?.[conversion.pricedTier] || 0;
    const sourceCount = sourceMap[moduleId] || 0;
    const sourceMultiplier = sourceCount > 0
      ? (1 + Math.max(0, sourceCount - 1) * ADDITIONAL_CONVERSION_SOURCE_MULTIPLIER)
      : 0;
    return sum + (basePrice * sourceMultiplier);
  }, 0) * getServiceHoursMultiplier());
  if (fixedValue <= 0) {
    return null;
  }
  const moduleSummary = selectedModules.map((moduleId) => {
    const label = CONFIG.conversionModules.find((item) => item.id === moduleId)?.name.replace(/^EPL\s+/, "") || moduleId;
    const sourceCount = sourceMap[moduleId] || 0;
    return `${label}: ${sourceCount} source${sourceCount === 1 ? "" : "s"}`;
  }).join("; ");
  return createOptionalQuoteItem({
    id: "apollo-optional-full-conversion",
    name: "Optional Full Conversion Services",
    pricingMode: "fixed",
    fixedValue: String(fixedValue),
    notes: moduleSummary
  });
}

function getAppolloOptionalQuoteItems() {
  const items = APPOLLO_OPTIONAL_ITEMS.map((item, index) => createOptionalQuoteItem({
    id: `apollo-optional-${index + 1}`,
    ...item
  }));
  const optionalConversionItem = getApolloOptionalConversionItem();
  if (optionalConversionItem) {
    items.push(optionalConversionItem);
  }
  return items;
}

function getApolloEhPackageItems() {
  if (!isAppolloMode() || !selectedValues("suite").includes("environmental-health")) {
    return {
      implementationHours: 0,
      implementationValue: 0,
      pmHours: 0,
      pmValue: 0
    };
  }
  const pmHours = roundQuotedHours(APPOLLO_EH_IMPLEMENTATION_HOURS * APPOLLO_EH_PM_PERCENTAGE, false);
  return {
    implementationHours: APPOLLO_EH_IMPLEMENTATION_HOURS,
    implementationValue: APPOLLO_EH_IMPLEMENTATION_HOURS * APPOLLO_IMPLEMENTATION_RATE,
    pmHours,
    pmValue: pmHours * APPOLLO_PM_RATE
  };
}

function getApolloBaseImplementationHours() {
  if (!isAppolloMode()) {
    return 0;
  }
  const businessManagementIncluded = selectedValues("suite").includes("business-management");
  return APPOLLO_IMPLEMENTATION_HOURS - (businessManagementIncluded ? 0 : APPOLLO_BUSINESS_MANAGEMENT_HOURS);
}

function calculateRecommendedEutHours(userCount) {
  const users = Number(userCount) || 0;
  if (users <= 30) {
    return BASE_EUT_HOURS;
  }
  return BASE_EUT_HOURS + (Math.ceil((users - 30) / EXTRA_EUT_USER_BLOCK) * EXTRA_EUT_BLOCK_HOURS);
}

function getTrainingPlan() {
  const isFullImplementation = els.quoteType?.value === "full-implementation";
  const trainingToggleChecked = document.querySelector("#includeTraining")?.checked;
  const trainingIncluded = Boolean(trainingToggleChecked);
  const userCount = Number(els.userCount?.value) || 0;
  const settings = getAdminSettings();
  const solutionOrientationInput = els.solutionOrientationHours?.value?.trim() ?? "";
  const solutionValidationInput = els.solutionValidationHours?.value?.trim() ?? "";
  const endUserTrainingInput = els.endUserTrainingHours?.value?.trim() ?? "";
  const solutionOrientationHours = trainingIncluded && isFullImplementation
    ? (solutionOrientationInput === "" ? SOLUTION_ORIENTATION_HOURS : (Number(solutionOrientationInput) || 0))
    : 0;
  const solutionValidationHours = trainingIncluded && isFullImplementation
    ? (solutionValidationInput === "" ? SOLUTION_VALIDATION_HOURS : (Number(solutionValidationInput) || 0))
    : 0;
  const configurationTrainingHours = trainingIncluded ? (Number(els.configurationTrainingHours?.value) || 0) : 0;
  const trainTheTrainerSelected = trainingIncluded ? Boolean(els.includeTrainTheTrainer?.checked) : false;
  const systemAdminTrainingSelected = trainingIncluded ? Boolean(els.includeSystemAdminTraining?.checked) : false;

  return {
    trainingIncluded,
    isFullImplementation,
    trainTheTrainerSelected,
    trainTheTrainerHours: trainTheTrainerSelected ? (settings.hasTrainTheTrainerOverrideHours ? settings.trainTheTrainerOverrideHours : TRAIN_THE_TRAINER_HOURS) : 0,
    systemAdminTrainingSelected,
    systemAdminTrainingHours: systemAdminTrainingSelected ? (settings.hasSystemAdminOverrideHours ? settings.systemAdminOverrideHours : SYSTEM_ADMIN_TRAINING_HOURS) : 0,
    solutionOrientationHours,
    solutionValidationHours,
    configurationTrainingHours,
    endUserTrainingHours: trainingIncluded
      ? (trainTheTrainerSelected
        ? 0
        : (settings.hasEutOverrideHours
          ? settings.eutOverrideHours
          : (isFullImplementation
            ? (endUserTrainingInput === "" ? calculateRecommendedEutHours(userCount) : (Number(endUserTrainingInput) || 0))
            : (Number(els.endUserTrainingHours?.value) || 0))))
      : 0,
    productionSupportHours: trainingIncluded ? (Number(els.productionSupportHours?.value) || 0) : 0
  };
}

function setOutputText(element, text) {
  if (!element) {
    return;
  }
  if ("value" in element) {
    element.value = text;
  }
  element.textContent = text;
}

function clearImportedQuoteOverrides() {
  const overrideIds = [
    "implementationOverrideHours",
    "pmOverrideHours",
    "conversionOverridePrice",
    "reportingOverridePrice",
    "integrationOverridePrice"
  ];

  let cleared = false;
  overrideIds.forEach((id) => {
    const input = document.querySelector(`#${id}`);
    if (input && String(input.value).trim() !== "") {
      input.value = "";
      cleared = true;
    }
  });

  if (cleared && els.saveStatus) {
    els.saveStatus.textContent = "Imported quote overrides cleared because scoped inputs were changed";
  }
}

function clearImportedHoursOverridesOnly() {
  ["implementationOverrideHours", "pmOverrideHours"].forEach((id) => {
    const input = document.querySelector(`#${id}`);
    if (input) {
      input.value = "";
    }
  });
}

function applyQuoteTypeDefaults() {
  const isAddonOnly = els.quoteType?.value === "addon-only";
  const defaults = {
    includeImplementation: !isAddonOnly,
    includeTraining: !isAddonOnly,
    includeConversion: !isAddonOnly,
    includeIntegration: !isAddonOnly,
    includeReports: !isAddonOnly,
    includeTravel: !isAddonOnly
  };

  Object.entries(defaults).forEach(([id, checked]) => {
    const field = document.querySelector(`#${id}`);
    if (field) {
      field.checked = checked;
    }
  });
}

function getQuoteFormStateRecord(quote) {
  if (!quote || typeof quote !== "object") {
    return null;
  }
  if (quote.formState && typeof quote.formState === "object") {
    return quote.formState;
  }
  if (quote.quote && typeof quote.quote === "object") {
    if (quote.quote.formState && typeof quote.quote.formState === "object") {
      return quote.quote.formState;
    }
    return quote.quote;
  }
  if (quote.state && typeof quote.state === "object") {
    return quote.state;
  }
  if (quote.data && typeof quote.data === "object") {
    if (quote.data.formState && typeof quote.data.formState === "object") {
      return quote.data.formState;
    }
    return quote.data;
  }
  return quote;
}

function getSavedQuoteSortTimestamp(quote) {
  return String(quote?.updatedAt || quote?.createdAt || "");
}

function inferLegacyServiceDeliveryModel(saved = {}) {
  const explicitModel = normalizeServiceDeliveryModelValue(saved.serviceDeliveryModel || "");
  if (saved.serviceDeliveryModel) {
    return explicitModel;
  }
  return saved.quoteType === "addon-only" ? "addon-work" : "full";
}

function normalizeClientTypeValue(value = "") {
  const normalized = String(value || "").toLowerCase().trim();
  if (normalized === "county") {
    return "county";
  }
  return "city";
}

function getSelectedOptionText(selectEl, fallback = "Not entered") {
  if (!selectEl) {
    return fallback;
  }
  const selectedOption = selectEl.selectedOptions?.[0];
  return selectedOption?.text || fallback;
}

const DEFAULT_HOURLY_RATE = 225;
const FIXED_FEE_HOURLY_RATE = 250;
const TYLER_PROCESS_HOURS = 36;
const CLIENT_PROCESS_HOURS = 16;
const TYLER_TEMPLATED_PROCESS_HOURS = 14;
const CLIENT_TEMPLATED_PROCESS_HOURS = 7;
const PM_PERCENTAGE = 0.25;
const ADDON_PM_PERCENTAGE = 0.15;
const ADDON_PM_MIN_HOURS = 4;
const APPOLLO_IMPLEMENTATION_HOURS = 446;
const APPOLLO_BUSINESS_MANAGEMENT_HOURS = 72;
const APPOLLO_IMPLEMENTATION_RATE = 200;
const APPOLLO_PM_HOURS = 100;
const APPOLLO_PM_RATE = 200;
const APPOLLO_EUT_HOURS = 40;
const APPOLLO_EUT_RATE = 225;
const APPOLLO_EH_IMPLEMENTATION_HOURS = 250;
const APPOLLO_EH_PM_PERCENTAGE = 0.25;
const APPOLLO_OPTIONAL_ITEMS = [
  { name: "Post Go-Live Configuration Training", pricingMode: "hourly", hours: "40", rate: String(APPOLLO_EUT_RATE), notes: "Optional configuration training" }
];
const SOLUTION_ORIENTATION_HOURS = 40;
const SOLUTION_VALIDATION_HOURS = 40;
const BASE_EUT_HOURS = 40;
const EXTRA_EUT_USER_BLOCK = 30;
const EXTRA_EUT_BLOCK_HOURS = 40;
const TRAIN_THE_TRAINER_HOURS = 120;
const SYSTEM_ADMIN_TRAINING_HOURS = 40;
const ADDITIONAL_CONVERSION_SOURCE_MULTIPLIER = 0.5;
const STORAGE_KEY = "epl-sales-pricer-saved-quotes";
const ARCHIVE_DB_NAME = "epl-sales-pricer-archive";
const ARCHIVE_DB_VERSION = 1;
const ARCHIVE_STORE_NAME = "handles";
const ARCHIVE_DIRECTORY_KEY = "versionArchiveDirectory";

const state = {
  activeStep: 0,
  loadedQuoteId: null,
  archiveDirectoryHandle: null,
  archiveDirectoryName: "",
  archiveMode: "none",
  lastTargetScenario: null,
  serviceOptionalSelections: {},
  serviceSplitSelections: {}
};

const els = {
  quoteNumber: document.querySelector("#quoteNumber"),
  quoteVersion: document.querySelector("#quoteVersion"),
  cityName: document.querySelector("#cityName"),
  stateName: document.querySelector("#stateName"),
  quoteType: document.querySelector("#quoteType"),
  salesRep: document.querySelector("#salesRep"),
  departments: document.querySelector("#departments"),
  clientType: document.querySelector("#clientType"),
  serviceDeliveryModel: document.querySelector("#serviceDeliveryModel"),
  sharedServicesBreakdown: document.querySelector("#sharedServicesBreakdown"),
  sharedServicesBreakdownField: document.querySelector("#sharedServicesBreakdownField"),
  goLiveTarget: document.querySelector("#goLiveTarget"),
  userCount: document.querySelector("#userCount"),
  populationValue: document.querySelector("#populationValue"),
  internalNotes: document.querySelector("#internalNotes"),
  integrationNotes: document.querySelector("#integrationNotes"),
  integrationSupportPrice: document.querySelector("#integrationSupportPrice"),
  integrationDevelopmentPrice: document.querySelector("#integrationDevelopmentPrice"),
  reportsNotes: document.querySelector("#reportsNotes"),
  customFormsCount: document.querySelector("#customFormsCount"),
  customReportsCount: document.querySelector("#customReportsCount"),
  reportHours: document.querySelector("#reportHours"),
  solutionOrientationHours: document.querySelector("#solutionOrientationHours"),
  solutionValidationHours: document.querySelector("#solutionValidationHours"),
  configurationTrainingHours: document.querySelector("#configurationTrainingHours"),
  endUserTrainingHours: document.querySelector("#endUserTrainingHours"),
  productionSupportHours: document.querySelector("#productionSupportHours"),
  includeTrainTheTrainer: document.querySelector("#includeTrainTheTrainer"),
  includeSystemAdminTraining: document.querySelector("#includeSystemAdminTraining"),
  includeChangeManagement: document.querySelector("#includeChangeManagement"),
  integrationBlock: document.querySelector("#integrationBlock"),
  reportsBlock: document.querySelector("#reportsBlock"),
  trainingSupportBlock: document.querySelector("#trainingSupportBlock"),
  conversionBlock: document.querySelector("#conversionBlock"),
  suiteOptions: document.querySelector("#suiteOptions"),
  suiteRequirementMessage: document.querySelector("#suiteRequirementMessage"),
  addonOptions: document.querySelector("#addonOptions"),
  esrCaseTypeCount: document.querySelector("#esrCaseTypeCount"),
  esrCaseTypeCountField: document.querySelector("#esrCaseTypeCountField"),
  selectAllSuites: document.querySelector("#selectAllSuites"),
  selectCommonAddons: document.querySelector("#selectCommonAddons"),
  conversionModel: document.querySelector("#conversionModel"),
  conversionScopeType: document.querySelector("#conversionScopeType"),
  populationTierDisplay: document.querySelector("#populationTierDisplay"),
  conversionTierReadout: document.querySelector("#conversionTierReadout"),
  fillSourcesOne: document.querySelector("#fillSourcesOne"),
  sourcesCommunityDevelopment: document.querySelector("#sourcesCommunityDevelopment"),
  sourcesBusinessManagement: document.querySelector("#sourcesBusinessManagement"),
  sourcesEnvironmentalHealth: document.querySelector("#sourcesEnvironmentalHealth"),
  tylerOwnedProcesses: document.querySelector("#tylerOwnedProcesses"),
  clientOwnedProcesses: document.querySelector("#clientOwnedProcesses"),
  tylerOwnedTemplatedProcesses: document.querySelector("#tylerOwnedTemplatedProcesses"),
  clientOwnedTemplatedProcesses: document.querySelector("#clientOwnedTemplatedProcesses"),
  aiProductToolsHours: document.querySelector("#aiProductToolsHours"),
  includeFixedFeeUplift: document.querySelector("#includeFixedFeeUplift"),
  includeDataArchive: document.querySelector("#includeDataArchive"),
  includeTcmConversion: document.querySelector("#includeTcmConversion"),
  conversionBasePrice: document.querySelector("#conversionBasePrice"),
  conversionHostingPrice: document.querySelector("#conversionHostingPrice"),
  conversionTotalPrice: document.querySelector("#conversionTotalPrice"),
  conversionSelectedModules: document.querySelector("#conversionSelectedModules"),
  conversionHostingLabel: document.querySelector("#conversionHostingLabel"),
  conversionSourceSummary: document.querySelector("#conversionSourceSummary"),
  conversionSummary: document.querySelector("#conversionSummary"),
  topTotalValue: document.querySelector("#topTotalValue"),
  topTotalHours: document.querySelector("#topTotalHours"),
  topIcHours: document.querySelector("#topIcHours"),
  topPmHours: document.querySelector("#topPmHours"),
  workspaceCustomer: document.querySelector("#workspaceCustomer"),
  workspaceSalesRep: document.querySelector("#workspaceSalesRep"),
  workspaceUsers: document.querySelector("#workspaceUsers"),
  workspaceModules: document.querySelector("#workspaceModules"),
  heroScopedServices: document.querySelector("#heroScopedServices"),
  heroModulesSelected: document.querySelector("#heroModulesSelected"),
  heroAddonsSelected: document.querySelector("#heroAddonsSelected"),
  heroSavedQuotes: document.querySelector("#heroSavedQuotes"),
  analyticsProjectQuotes: document.querySelector("#analyticsProjectQuotes"),
  analyticsAddonQuotes: document.querySelector("#analyticsAddonQuotes"),
  analyticsYtdQuotes: document.querySelector("#analyticsYtdQuotes"),
  analyticsYoyChange: document.querySelector("#analyticsYoyChange"),
  chartProjectsBar: document.querySelector("#chartProjectsBar"),
  chartAddonsBar: document.querySelector("#chartAddonsBar"),
  chartProjectsValue: document.querySelector("#chartProjectsValue"),
  chartAddonsValue: document.querySelector("#chartAddonsValue"),
  chartPriorYearBar: document.querySelector("#chartPriorYearBar"),
  chartCurrentYearBar: document.querySelector("#chartCurrentYearBar"),
  chartPriorYearValue: document.querySelector("#chartPriorYearValue"),
  chartCurrentYearValue: document.querySelector("#chartCurrentYearValue"),
  chartPriorYearLabel: document.querySelector("#chartPriorYearLabel"),
  chartCurrentYearLabel: document.querySelector("#chartCurrentYearLabel"),
  currentUser: document.querySelector("#currentUser"),
  useSalesQuoteEntry: document.querySelector("#useSalesQuoteEntry"),
  newQuote: document.querySelector("#newQuote"),
  saveQuote: document.querySelector("#saveQuote"),
  saveAsQuote: document.querySelector("#saveAsQuote"),
  saveStatus: document.querySelector("#saveStatus"),
  selectArchiveFolder: document.querySelector("#selectArchiveFolder"),
  archiveFolderStatus: document.querySelector("#archiveFolderStatus"),
  savedQuotesList: document.querySelector("#savedQuotesList"),
  savedQuoteSearch: document.querySelector("#savedQuoteSearch"),
  openQuoteLibrary: document.querySelector("#openQuoteLibrary"),
  closeQuoteLibrary: document.querySelector("#closeQuoteLibrary"),
  quoteLibraryModal: document.querySelector("#quoteLibraryModal"),
  exportJson: document.querySelector("#exportJson"),
  importJsonButton: document.querySelector("#importJsonButton"),
  importJsonInput: document.querySelector("#importJsonInput"),
  uploadQuoteReviewButton: document.querySelector("#uploadQuoteReviewButton"),
  quoteReviewInput: document.querySelector("#quoteReviewInput"),
  reviewedQuoteText: document.querySelector("#reviewedQuoteText"),
  quoteReviewTargetValue: document.querySelector("#quoteReviewTargetValue"),
  quoteReviewAssumptions: document.querySelector("#quoteReviewAssumptions"),
  analyzeUploadedQuote: document.querySelector("#analyzeUploadedQuote"),
  applyReviewedQuoteToForm: document.querySelector("#applyReviewedQuoteToForm"),
  buildTargetGuidance: document.querySelector("#buildTargetGuidance"),
  applyTargetGuidanceToQuote: document.querySelector("#applyTargetGuidanceToQuote"),
  quoteReviewResults: document.querySelector("#quoteReviewResults"),
  quoteReviewRecommendations: document.querySelector("#quoteReviewRecommendations"),
  applySalesQuoteEntry: document.querySelector("#applySalesQuoteEntry"),
  salesQuoteServiceDeliveryModel: document.querySelector("#salesQuoteServiceDeliveryModel"),
  salesQuoteSharedServicesBreakdown: document.querySelector("#salesQuoteSharedServicesBreakdown"),
  salesQuoteSharedBreakdownField: document.querySelector("#salesQuoteSharedBreakdownField"),
  salesQuoteTylerOwnedProcesses: document.querySelector("#salesQuoteTylerOwnedProcesses"),
  salesQuoteClientOwnedProcesses: document.querySelector("#salesQuoteClientOwnedProcesses"),
  salesQuoteTylerOwnedTemplatedProcesses: document.querySelector("#salesQuoteTylerOwnedTemplatedProcesses"),
  salesQuoteClientOwnedTemplatedProcesses: document.querySelector("#salesQuoteClientOwnedTemplatedProcesses"),
  salesQuoteImplementationHours: document.querySelector("#salesQuoteImplementationHours"),
  salesQuoteCommunitySources: document.querySelector("#salesQuoteCommunitySources"),
  salesQuoteBusinessSources: document.querySelector("#salesQuoteBusinessSources"),
  salesQuoteEnvironmentalSources: document.querySelector("#salesQuoteEnvironmentalSources"),
  salesQuoteCustomFormsCount: document.querySelector("#salesQuoteCustomFormsCount"),
  salesQuoteCustomReportsCount: document.querySelector("#salesQuoteCustomReportsCount"),
  salesQuoteReportHours: document.querySelector("#salesQuoteReportHours"),
  salesQuoteIntegrationSupportHours: document.querySelector("#salesQuoteIntegrationSupportHours"),
  salesQuoteIntegrationDevelopmentHours: document.querySelector("#salesQuoteIntegrationDevelopmentHours"),
  salesQuoteConfigurationTrainingHours: document.querySelector("#salesQuoteConfigurationTrainingHours"),
  salesQuoteSystemAdminHours: document.querySelector("#salesQuoteSystemAdminHours"),
  salesQuoteTrainTheTrainerHours: document.querySelector("#salesQuoteTrainTheTrainerHours"),
  salesQuoteEndUserTrainingHours: document.querySelector("#salesQuoteEndUserTrainingHours"),
  salesQuoteProductionSupportHours: document.querySelector("#salesQuoteProductionSupportHours"),
  salesQuotePmHours: document.querySelector("#salesQuotePmHours"),
  salesQuoteImplementationRate: document.querySelector("#salesQuoteImplementationRate"),
  salesQuoteImplementationValue: document.querySelector("#salesQuoteImplementationValue"),
  salesQuoteCommunityRate: document.querySelector("#salesQuoteCommunityRate"),
  salesQuoteCommunityValue: document.querySelector("#salesQuoteCommunityValue"),
  salesQuoteBusinessRate: document.querySelector("#salesQuoteBusinessRate"),
  salesQuoteBusinessValue: document.querySelector("#salesQuoteBusinessValue"),
  salesQuoteEnvironmentalRate: document.querySelector("#salesQuoteEnvironmentalRate"),
  salesQuoteEnvironmentalValue: document.querySelector("#salesQuoteEnvironmentalValue"),
  salesQuoteCustomFormsRate: document.querySelector("#salesQuoteCustomFormsRate"),
  salesQuoteCustomFormsValue: document.querySelector("#salesQuoteCustomFormsValue"),
  salesQuoteCustomReportsRate: document.querySelector("#salesQuoteCustomReportsRate"),
  salesQuoteCustomReportsValue: document.querySelector("#salesQuoteCustomReportsValue"),
  salesQuoteReportHoursRate: document.querySelector("#salesQuoteReportHoursRate"),
  salesQuoteReportHoursValue: document.querySelector("#salesQuoteReportHoursValue"),
  salesQuoteIntegrationSupportRate: document.querySelector("#salesQuoteIntegrationSupportRate"),
  salesQuoteIntegrationSupportValue: document.querySelector("#salesQuoteIntegrationSupportValue"),
  salesQuoteIntegrationDevelopmentRate: document.querySelector("#salesQuoteIntegrationDevelopmentRate"),
  salesQuoteIntegrationDevelopmentValue: document.querySelector("#salesQuoteIntegrationDevelopmentValue"),
  salesQuoteConfigurationTrainingRate: document.querySelector("#salesQuoteConfigurationTrainingRate"),
  salesQuoteConfigurationTrainingValue: document.querySelector("#salesQuoteConfigurationTrainingValue"),
  salesQuoteSystemAdminRate: document.querySelector("#salesQuoteSystemAdminRate"),
  salesQuoteSystemAdminValue: document.querySelector("#salesQuoteSystemAdminValue"),
  salesQuoteTrainTheTrainerRate: document.querySelector("#salesQuoteTrainTheTrainerRate"),
  salesQuoteTrainTheTrainerValue: document.querySelector("#salesQuoteTrainTheTrainerValue"),
  salesQuoteEndUserTrainingRate: document.querySelector("#salesQuoteEndUserTrainingRate"),
  salesQuoteEndUserTrainingValue: document.querySelector("#salesQuoteEndUserTrainingValue"),
  salesQuoteProductionSupportRate: document.querySelector("#salesQuoteProductionSupportRate"),
  salesQuoteProductionSupportValue: document.querySelector("#salesQuoteProductionSupportValue"),
  salesQuotePmRate: document.querySelector("#salesQuotePmRate"),
  salesQuotePmValue: document.querySelector("#salesQuotePmValue"),
  salesQuoteTravelHours: document.querySelector("#salesQuoteTravelHours"),
  salesQuoteTravelRate: document.querySelector("#salesQuoteTravelRate"),
  salesQuoteTravelValue: document.querySelector("#salesQuoteTravelValue"),
  salesQuoteTotalServicesValue: document.querySelector("#salesQuoteTotalServicesValue"),
  salesQuoteSummaryTotal: document.querySelector("#salesQuoteSummaryTotal"),
  exportWord: document.querySelector("#exportWord"),
  exportPdf: document.querySelector("#exportPdf"),
  overrideAuditTrail: document.querySelector("#overrideAuditTrail"),
  suiteCount: document.querySelector("#suiteCount"),
  suiteSummary: document.querySelector("#suiteSummary"),
  selectedAddonCount: document.querySelector("#selectedAddonCount"),
  addonSummary: document.querySelector("#addonSummary"),
  serviceScopeCount: document.querySelector("#serviceScopeCount"),
  serviceScopeSummary: document.querySelector("#serviceScopeSummary"),
  quoteTitle: document.querySelector("#quoteTitle"),
  summarySalesRep: document.querySelector("#summarySalesRep"),
  summaryClientType: document.querySelector("#summaryClientType"),
  summaryUsers: document.querySelector("#summaryUsers"),
  summaryDepartments: document.querySelector("#summaryDepartments"),
  summaryGoLive: document.querySelector("#summaryGoLive"),
  quoteSummary: document.querySelector("#quoteSummary"),
  quoteNotes: document.querySelector("#quoteNotes"),
  quoteHistory: document.querySelector("#quoteHistory"),
  serviceSummaryBody: document.querySelector("#serviceSummaryBody"),
  optionalServiceSummaryBody: document.querySelector("#optionalServiceSummaryBody"),
  copySummary: document.querySelector("#copySummary"),
  addOptionalItem: document.querySelector("#addOptionalItem"),
  optionalItemsContainer: document.querySelector("#optionalItemsContainer"),
  navCityName: document.querySelector("#navCityName"),
  navModules: document.querySelector("#navModules"),
  navAddons: document.querySelector("#navAddons"),
  activeStepTitle: document.querySelector("#activeStepTitle"),
  activeStepDescription: document.querySelector("#activeStepDescription"),
  quoteTypeCallout: document.querySelector("#quoteTypeCallout"),
  overrideReason: document.querySelector("#overrideReason"),
  implementationOverrideHours: document.querySelector("#implementationOverrideHours"),
  systemAdminOverrideHours: document.querySelector("#systemAdminOverrideHours"),
  trainTheTrainerOverrideHours: document.querySelector("#trainTheTrainerOverrideHours"),
  eutOverrideHours: document.querySelector("#eutOverrideHours"),
  prevStep: document.querySelector("#prevStep"),
  nextStep: document.querySelector("#nextStep"),
  stepLinks: Array.from(document.querySelectorAll(".step-link")),
  stepPanels: Array.from(document.querySelectorAll(".step-panel"))
};

function getAdminSettings() {
  const parseOverrideField = (selector) => {
    const raw = document.querySelector(selector)?.value ?? "";
    const trimmed = String(raw).trim();
    return {
      value: trimmed === "" ? 0 : (Number(trimmed) || 0),
      enabled: trimmed !== ""
    };
  };

  const pmOverride = parseOverrideField("#pmOverrideHours");
  const implementationOverride = parseOverrideField("#implementationOverrideHours");
  const systemAdminOverride = parseOverrideField("#systemAdminOverrideHours");
  const trainTheTrainerOverride = parseOverrideField("#trainTheTrainerOverrideHours");
  const eutOverride = parseOverrideField("#eutOverrideHours");
  const conversionOverride = parseOverrideField("#conversionOverridePrice");
  const reportingOverride = parseOverrideField("#reportingOverridePrice");
  const integrationOverride = parseOverrideField("#integrationOverridePrice");

  return {
    hourlyRate: Number(document.querySelector("#adminHourlyRate")?.value) || 225,
    fixedFeeRate: Number(document.querySelector("#adminFixedFeeRate")?.value) || 250,
    pmPercentage: Number(document.querySelector("#adminPmPercentage")?.value) || 0.25,
    tylerProcessHours: Number(document.querySelector("#adminTylerProcessHours")?.value) || 36,
    clientProcessHours: Number(document.querySelector("#adminClientProcessHours")?.value) || 16,
    customFormPrice: Number(document.querySelector("#adminCustomFormPrice")?.value) || 3000,
    customReportPrice: Number(document.querySelector("#adminCustomReportPrice")?.value) || 5000,
    pmOverrideHours: pmOverride.value,
    hasPmOverrideHours: pmOverride.enabled,
    implementationOverrideHours: implementationOverride.value,
    hasImplementationOverrideHours: implementationOverride.enabled,
    systemAdminOverrideHours: systemAdminOverride.value,
    hasSystemAdminOverrideHours: systemAdminOverride.enabled,
    trainTheTrainerOverrideHours: trainTheTrainerOverride.value,
    hasTrainTheTrainerOverrideHours: trainTheTrainerOverride.enabled,
    eutOverrideHours: eutOverride.value,
    hasEutOverrideHours: eutOverride.enabled,
    conversionOverridePrice: conversionOverride.value,
    hasConversionOverridePrice: conversionOverride.enabled,
    reportingOverridePrice: reportingOverride.value,
    hasReportingOverridePrice: reportingOverride.enabled,
    integrationOverridePrice: integrationOverride.value,
    hasIntegrationOverridePrice: integrationOverride.enabled
  };
}

function getOverrideAuditTrail() {
  const settings = getAdminSettings();
  const entries = [];
  const reason = els.overrideReason?.value.trim() || "";

  const compareEntries = [
    { label: "Delivery Rate", current: settings.hourlyRate, defaultValue: DEFAULT_HOURLY_RATE, format: (value) => currency.format(value) },
    { label: "Fixed Fee Rate", current: settings.fixedFeeRate, defaultValue: FIXED_FEE_HOURLY_RATE, format: (value) => currency.format(value) },
    { label: "PM %", current: settings.pmPercentage, defaultValue: PM_PERCENTAGE, format: (value) => `${Math.round(value * 100)}%` },
    { label: "Tyler Process Hours", current: settings.tylerProcessHours, defaultValue: TYLER_PROCESS_HOURS, format: formatHours },
    { label: "Client Process Hours", current: settings.clientProcessHours, defaultValue: CLIENT_PROCESS_HOURS, format: formatHours },
    { label: "Custom Form Price", current: settings.customFormPrice, defaultValue: 3000, format: (value) => currency.format(value) },
    { label: "Custom Report Price", current: settings.customReportPrice, defaultValue: 5000, format: (value) => currency.format(value) }
  ];

  compareEntries.forEach((entry) => {
    if (entry.current !== entry.defaultValue) {
      entries.push(`${entry.label}: ${entry.format(entry.current)} (default ${entry.format(entry.defaultValue)})`);
    }
  });

  if (settings.hasPmOverrideHours) {
    entries.push(`PM Override Hours: ${formatHours(settings.pmOverrideHours)}`);
  }
  if (settings.hasImplementationOverrideHours) {
    entries.push(`Implementation Override Hours: ${formatHours(settings.implementationOverrideHours)}`);
  }
  if (settings.hasSystemAdminOverrideHours) {
    entries.push(`System Admin Override Hours: ${formatHours(settings.systemAdminOverrideHours)}`);
  }
  if (settings.hasTrainTheTrainerOverrideHours) {
    entries.push(`TNT Override Hours: ${formatHours(settings.trainTheTrainerOverrideHours)}`);
  }
  if (settings.hasEutOverrideHours) {
    entries.push(`EUT Override Hours: ${formatHours(settings.eutOverrideHours)}`);
  }
  if (settings.hasConversionOverridePrice) {
    entries.push(`Conversion Override Price: ${currency.format(settings.conversionOverridePrice)}`);
  }
  if (settings.hasReportingOverridePrice) {
    entries.push(`Reporting Override Price: ${currency.format(settings.reportingOverridePrice)}`);
  }
  if (settings.hasIntegrationOverridePrice) {
    entries.push(`Integration Override Price: ${currency.format(settings.integrationOverridePrice)}`);
  }

  if (!entries.length) {
    return "No admin overrides applied";
  }

  return [
    "Overrides Applied",
    ...entries.map((entry) => `- ${entry}`),
    reason ? "" : null,
    reason ? `Reason Provided` : null,
    reason ? `- ${reason}` : null
  ].filter(Boolean).join("\n");
}

function getVisibleStepKeys() {
  const keys = ["client", "modules"];
  if (
    document.querySelector("#includeIntegration")?.checked ||
    document.querySelector("#includeReports")?.checked ||
    document.querySelector("#includeConversion")?.checked
  ) {
    keys.push("delivery");
  }
  if (els.useSalesQuoteEntry?.checked) {
    keys.push("sales-quote");
  }
  keys.push("addons");
  return keys;
}

function renderCheckboxOptions(container, items, name) {
  container.innerHTML = items.map((item) => `
    <label class="checkbox-option">
      <input type="checkbox" name="${name}" value="${item.id}">
      <span>${item.name}</span>
    </label>
  `).join("");
}

function selectedValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
}

function hasSelectedSuites() {
  return selectedValues("suite").length > 0;
}

function updateSuiteRequirementState(showError = false) {
  const hasSuites = hasSelectedSuites();
  els.suiteOptions?.classList.toggle("required-grid", showError && !hasSuites);
  els.suiteRequirementMessage?.classList.toggle("hidden-step", hasSuites || !showError);
  els.suiteRequirementMessage?.classList.toggle("error", showError && !hasSuites);
  return hasSuites;
}

function syncAppolloPackageState() {
  const appolloMode = isAppolloMode();
  const suiteInputs = Array.from(document.querySelectorAll('input[name="suite"]'));
  suiteInputs.forEach((input) => {
    if (!(input instanceof HTMLInputElement)) {
      return;
    }
    if (appolloMode) {
      if (input.value === "community-development") {
        input.checked = true;
        input.disabled = true;
      } else if (input.value === "business-management" || input.value === "environmental-health") {
        input.disabled = false;
      } else {
        input.disabled = true;
      }
    } else {
      input.disabled = false;
    }
  });

  if (appolloMode) {
    const forceChecked = (id, checked) => {
      const field = document.querySelector(`#${id}`);
      if (field instanceof HTMLInputElement) {
        field.checked = checked;
      }
    };
    forceChecked("includeImplementation", true);
    forceChecked("includeTraining", true);
    forceChecked("includeConversion", true);
    forceChecked("includeIntegration", false);
    forceChecked("includeReports", false);
    forceChecked("includeTravel", false);
    if (els.includeDataArchive) {
      els.includeDataArchive.checked = true;
    }
    if (els.includeTcmConversion) {
      els.includeTcmConversion.checked = false;
    }
  }
}

function getSuiteNames() {
  return CONFIG.suites
    .filter((suite) => selectedValues("suite").includes(suite.id))
    .map((suite) => suite.name);
}

function getAddonNames() {
  return CONFIG.addons
    .filter((addon) => selectedValues("addon").includes(addon.id))
    .map((addon) => addon.name);
}

function getAddonServiceItems() {
  const selectedAddons = selectedValues("addon");
  const selectedSuites = selectedValues("suite");
  const suiteCount = Math.max(selectedSuites.length, 1);
  const esrCaseTypes = Number(els.esrCaseTypeCount?.value) || 0;
  const hourlyRate = getAdminSettings().hourlyRate;
  const isAddonOnly = els.quoteType?.value === "addon-only";

  // These add-ons are included in base implementation hours for Full/Shared/Apollo
  // They only get separate hours for Add-On-Only deals
  const includedInBaseImplementation = [
    "civic-access",
    "workforce-mobile",
    "erp",
    "erp-pro",
    "new-world-erp",
    "executive-insights",
    "tyler-cashiering",
    "enterprise-assessment-tax",
    "eagle-recorder",
    "enterprise-asset-management",
    "enterprise-service-requests"
  ];

  return selectedAddons.map((addonId) => {
    const addon = CONFIG.addons.find((item) => item.id === addonId);
    const config = ADDON_SERVICE_CONFIG[addonId] || {};
    const multiplier = config.perSuite ? suiteCount : 1;
    const extraHours = config.extraCaseTypeHours ? (config.extraCaseTypeHours * esrCaseTypes) : 0;
    const baseHours = Number(config.hours) || 0;

    // If this add-on is included in base implementation and it's NOT an add-on-only deal, set hours to 0
    let calculatedHours = 0;
    if (includedInBaseImplementation.includes(addonId) && !isAddonOnly) {
      calculatedHours = 0; // Included in implementation consultant hours
    } else {
      calculatedHours = baseHours > 0 || extraHours > 0 ? roundQuotedHours((baseHours * multiplier) + extraHours, isAddonOnly) : 0;
    }

    const hours = calculatedHours;
    const rateBasisParts = [];
    if (config.perSuite) {
      rateBasisParts.push(`${baseHours} hours x ${suiteCount} suite${suiteCount === 1 ? "" : "s"}`);
    } else if (baseHours > 0) {
      rateBasisParts.push(`${baseHours} hours`);
    }
    if (config.extraCaseTypeHours && esrCaseTypes > 0) {
      rateBasisParts.push(`${config.extraCaseTypeHours} hours x ${esrCaseTypes} case type${esrCaseTypes === 1 ? "" : "s"}`);
    }
    return {
      id: addonId,
      name: addon?.name || addonId,
      hours,
      value: hours * hourlyRate,
      rateBasis: rateBasisParts.length ? `${rateBasisParts.join(" + ")} @ ${currency.format(hourlyRate)}/hour` : "",
      notes: config.notes || ""
    };
  });
}

function getScopeSelections() {
  return CONFIG.scopeMap
    .filter((item) => {
      if (item.id === "includeTraining") {
        return getTrainingPlan().trainingIncluded;
      }
      const el = document.querySelector(`#${item.id}`);
      return el && el.checked;
    })
    .map((item) => item.label);
}

function getConversionSources() {
  return {
    "community-development": Number(els.sourcesCommunityDevelopment.value) || 0,
    "business-management": Number(els.sourcesBusinessManagement.value) || 0,
    "environmental-health": Number(els.sourcesEnvironmentalHealth.value) || 0
  };
}

function getSelectedConversionModules() {
  const sourceMap = getConversionSources();
  return Object.entries(sourceMap)
    .filter(([, count]) => count > 0)
    .map(([moduleId]) => moduleId);
}

function getConversionModuleNames() {
  return CONFIG.conversionModules
    .filter((item) => getSelectedConversionModules().includes(item.id))
    .map((item) => item.name);
}

function getSavedQuotes() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed)
      ? parsed.filter((item) => item && typeof item === "object")
      : [];
  } catch (error) {
    return [];
  }
}

function setSavedQuotes(quotes) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
}

function supportsVersionArchive() {
  return typeof window.showDirectoryPicker === "function" && typeof window.indexedDB !== "undefined";
}

function downloadArchiveFile(fileName, content, mimeType = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 15000);
}

function updateArchiveFolderStatus(message, isError = false) {
  if (!els.archiveFolderStatus) {
    return;
  }
  els.archiveFolderStatus.textContent = message;
  els.archiveFolderStatus.classList.toggle("error", isError);
}

function openArchiveDatabase() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(ARCHIVE_DB_NAME, ARCHIVE_DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(ARCHIVE_STORE_NAME)) {
        db.createObjectStore(ARCHIVE_STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Unable to open archive storage"));
  });
}

async function saveArchiveDirectoryHandle(handle) {
  const db = await openArchiveDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ARCHIVE_STORE_NAME, "readwrite");
    transaction.objectStore(ARCHIVE_STORE_NAME).put(handle, ARCHIVE_DIRECTORY_KEY);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error || new Error("Unable to store archive folder"));
    };
  });
}

async function loadArchiveDirectoryHandle() {
  const db = await openArchiveDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ARCHIVE_STORE_NAME, "readonly");
    const request = transaction.objectStore(ARCHIVE_STORE_NAME).get(ARCHIVE_DIRECTORY_KEY);
    request.onsuccess = () => {
      db.close();
      resolve(request.result || null);
    };
    request.onerror = () => {
      db.close();
      reject(request.error || new Error("Unable to load archive folder"));
    };
  });
}

async function clearArchiveDirectoryHandle() {
  const db = await openArchiveDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ARCHIVE_STORE_NAME, "readwrite");
    transaction.objectStore(ARCHIVE_STORE_NAME).delete(ARCHIVE_DIRECTORY_KEY);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error || new Error("Unable to clear archive folder"));
    };
  });
}

async function hasDirectoryPermission(handle, write = true) {
  if (!handle) {
    return false;
  }
  if (typeof handle.queryPermission !== "function") {
    return true;
  }
  const permission = await handle.queryPermission(write ? { mode: "readwrite" } : {});
  return permission === "granted";
}

async function requestDirectoryPermission(handle, write = true) {
  if (!handle) {
    return false;
  }
  if (typeof handle.requestPermission !== "function") {
    return true;
  }
  const permission = await handle.requestPermission(write ? { mode: "readwrite" } : {});
  return permission === "granted";
}

function sanitizePathSegment(value, fallback = "Untitled") {
  const cleaned = String(value || "")
    .replace(/[\\/:*?"<>|]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return (cleaned || fallback).replace(/\s+/g, "_");
}

function buildArchiveQuoteFolderName(quote) {
  const formState = getQuoteFormStateRecord(quote) || quote?.formState || getFormState();
  return [
    formState.cityName || quote?.customerName || "Unnamed Quote",
    formState.stateName || "NA",
    formState.quoteNumber || quote?.id || "Quote"
  ].map((part, index) => sanitizePathSegment(part, index === 2 ? "Quote" : "Untitled")).join("_");
}

async function restoreArchiveDirectory() {
  if (!supportsVersionArchive()) {
    state.archiveMode = "downloads";
    updateArchiveFolderStatus("Version archive folder: Browser folder access is not available here. Versions can be archived to Downloads instead.");
    return null;
  }

  try {
    const handle = await loadArchiveDirectoryHandle();
    if (!handle) {
      state.archiveDirectoryHandle = null;
      state.archiveDirectoryName = "";
      state.archiveMode = "none";
      updateArchiveFolderStatus("Version archive folder: Not selected. Saved versions will stay in browser history only.");
      return null;
    }

    state.archiveDirectoryHandle = handle;
    state.archiveDirectoryName = handle.name || "Selected folder";
    state.archiveMode = "directory";
    const hasAccess = await hasDirectoryPermission(handle, true);
    updateArchiveFolderStatus(
      hasAccess
        ? `Version archive folder: ${state.archiveDirectoryName}. New versions will be saved there automatically.`
        : `Version archive folder: ${state.archiveDirectoryName}. Click Select Version Archive Folder to reconnect access.`
    );
    return handle;
  } catch (error) {
    state.archiveDirectoryHandle = null;
    state.archiveDirectoryName = "";
    state.archiveMode = "none";
    updateArchiveFolderStatus("Version archive folder: Unable to restore the previous folder. Select it again to continue archiving.", true);
    return null;
  }
}

async function chooseArchiveDirectory() {
  if (!supportsVersionArchive()) {
    state.archiveMode = "downloads";
    updateArchiveFolderStatus("Version archive folder: This app cannot pick a folder here, so new versions will be archived to Downloads automatically.");
    return true;
  }

  try {
    const handle = await window.showDirectoryPicker({ id: "epl-sales-pricer-version-archive", mode: "readwrite" });
    const granted = await requestDirectoryPermission(handle, true);
    if (!granted) {
      updateArchiveFolderStatus("Version archive folder: Access was not granted. Select the folder again when you are ready.", true);
      return false;
    }

    await saveArchiveDirectoryHandle(handle);
    state.archiveDirectoryHandle = handle;
    state.archiveDirectoryName = handle.name || "Selected folder";
    state.archiveMode = "directory";
    updateArchiveFolderStatus(`Version archive folder: ${state.archiveDirectoryName}. New versions will be saved there automatically.`);
    return true;
  } catch (error) {
    if (error?.name === "AbortError") {
      if (!state.archiveDirectoryHandle) {
        updateArchiveFolderStatus("Version archive folder: Not selected. Saved versions will stay in browser history only.");
      }
      return false;
    }
    updateArchiveFolderStatus(`Version archive folder: ${error?.message || "Unable to select folder"}`, true);
    return false;
  }
}

async function getArchiveDirectoryHandle({ prompt = false } = {}) {
  if (!supportsVersionArchive()) {
    return null;
  }

  let handle = state.archiveDirectoryHandle;
  if (!handle) {
    handle = await restoreArchiveDirectory();
  }
  if (!handle) {
    return null;
  }

  let granted = await hasDirectoryPermission(handle, true);
  if (!granted && prompt) {
    granted = await requestDirectoryPermission(handle, true);
  }

  if (!granted) {
    updateArchiveFolderStatus(`Version archive folder: ${state.archiveDirectoryName || "Selected folder"} is no longer accessible. Select it again to continue archiving.`, true);
    return null;
  }

  return handle;
}

async function writeArchiveFile(directoryHandle, fileName, content) {
  const fileHandle = await directoryHandle.getFileHandle(fileName, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
}

async function archiveQuoteVersion(quote, snapshot) {
  if (!supportsVersionArchive() || state.archiveMode === "downloads") {
    const fileBaseName = buildExportFileBaseName();
    const snapshotPayload = {
      savedAt: new Date().toISOString(),
      quoteId: quote.id,
      customerName: quote.customerName,
      salesRep: quote.salesRep,
      versionLabel: quote.latestVersionLabel,
      formState: quote.formState,
      snapshot
    };
    downloadArchiveFile(`${fileBaseName}.html`, buildPrintableHtml(), "text/html;charset=utf-8");
    downloadArchiveFile(`${fileBaseName}.json`, JSON.stringify(snapshotPayload, null, 2), "application/json");
    return {
      archived: true,
      mode: "downloads",
      folderName: "Downloads",
      fileBaseName
    };
  }

  const rootHandle = await getArchiveDirectoryHandle({ prompt: true });
  if (!rootHandle) {
    return {
      archived: false,
      skipped: true,
      reason: state.archiveDirectoryName
        ? "Selected archive folder is not currently accessible"
        : "No archive folder selected"
    };
  }

  const quoteFolderName = buildArchiveQuoteFolderName(quote);
  const quoteDirectory = await rootHandle.getDirectoryHandle(quoteFolderName, { create: true });
  const fileBaseName = buildExportFileBaseName();
  const snapshotPayload = {
    savedAt: new Date().toISOString(),
    quoteId: quote.id,
    customerName: quote.customerName,
    salesRep: quote.salesRep,
    versionLabel: quote.latestVersionLabel,
    formState: quote.formState,
    snapshot
  };

  await writeArchiveFile(quoteDirectory, `${fileBaseName}.html`, buildPrintableHtml());
  await writeArchiveFile(quoteDirectory, `${fileBaseName}.json`, JSON.stringify(snapshotPayload, null, 2));

  return {
    archived: true,
    folderName: quoteFolderName,
    fileBaseName
  };
}

function buildCurrentDocumentSnapshot() {
  const scopedMetrics = getScopedServiceMetrics();
  return {
    quoteSummary: els.quoteSummary?.value || "",
    quoteNotes: els.quoteNotes?.value || "",
    overrideAuditTrail: els.overrideAuditTrail?.value || "",
    serviceOptionalSelections: { ...state.serviceOptionalSelections },
    serviceSplitSelections: { ...state.serviceSplitSelections },
    serviceSummaryRows: getServiceSummaryRows().map((row) => ({
      service: row.service,
      hours: row.hours,
      rateBasis: row.rateBasis,
      value: row.value
    })),
    optionalServiceSummaryRows: scopedMetrics.optionalRows.map((row) => ({
      service: row.service,
      hours: row.hours,
      rateBasis: row.rateBasis,
      value: row.value
    }))
  };
}

function getDocumentSnapshotSignature(snapshot) {
  return JSON.stringify(snapshot || {});
}

function getQuoteServiceValue(quote) {
  const snapshot = quote?.documentVersions?.[quote.documentVersions.length - 1]?.snapshot || {};
  const rows = snapshot.serviceSummaryRows || [];
  const selections = normalizeServiceOptionalSelections(snapshot.serviceOptionalSelections);
  const splitSelections = normalizeServiceSplitSelections(snapshot.serviceSplitSelections);
  const { requiredRows } = splitServiceRowsByOptional(rows, selections, splitSelections);
  return requiredRows.reduce((sum, row) => (
    row.service === "Estimated Travel" ? sum : sum + (Number(row.value) || 0)
  ), 0);
}

function renderAnalyticsDashboard() {
  const quotes = getSavedQuotes();
  const now = new Date();
  const currentYear = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  const projectQuotes = quotes.filter((quote) => getQuoteFormStateRecord(quote)?.quoteType === "full-implementation");
  const addonQuotes = quotes.filter((quote) => getQuoteFormStateRecord(quote)?.quoteType === "addon-only");

  const currentYearYtdQuotes = quotes.filter((quote) => {
    const updated = new Date(quote.updatedAt);
    return updated.getFullYear() === currentYear
      && (updated.getMonth() < month || (updated.getMonth() === month && updated.getDate() <= day));
  });

  const priorYearYtdQuotes = quotes.filter((quote) => {
    const updated = new Date(quote.updatedAt);
    return updated.getFullYear() === currentYear - 1
      && (updated.getMonth() < month || (updated.getMonth() === month && updated.getDate() <= day));
  });

  const currentYtdCount = currentYearYtdQuotes.length;
  const priorYtdCount = priorYearYtdQuotes.length;
  const yoyChange = priorYtdCount > 0
    ? ((currentYtdCount - priorYtdCount) / priorYtdCount) * 100
    : (currentYtdCount > 0 ? 100 : 0);
  const mixMax = Math.max(projectQuotes.length, addonQuotes.length, 1);
  const yearMax = Math.max(currentYtdCount, priorYtdCount, 1);

  if (els.heroSavedQuotes) {
    els.heroSavedQuotes.textContent = String(quotes.length);
  }
  if (els.analyticsProjectQuotes) {
    els.analyticsProjectQuotes.textContent = String(projectQuotes.length);
  }
  if (els.analyticsAddonQuotes) {
    els.analyticsAddonQuotes.textContent = String(addonQuotes.length);
  }
  if (els.analyticsYtdQuotes) {
    els.analyticsYtdQuotes.textContent = String(currentYtdCount);
  }
  if (els.analyticsYoyChange) {
    const prefix = yoyChange > 0 ? "+" : "";
    els.analyticsYoyChange.textContent = `${prefix}${Math.round(yoyChange)}%`;
  }
  if (els.chartProjectsBar) {
    els.chartProjectsBar.style.width = `${(projectQuotes.length / mixMax) * 100}%`;
  }
  if (els.chartAddonsBar) {
    els.chartAddonsBar.style.width = `${(addonQuotes.length / mixMax) * 100}%`;
  }
  if (els.chartProjectsValue) {
    els.chartProjectsValue.textContent = String(projectQuotes.length);
  }
  if (els.chartAddonsValue) {
    els.chartAddonsValue.textContent = String(addonQuotes.length);
  }
  if (els.chartPriorYearBar) {
    els.chartPriorYearBar.style.width = `${(priorYtdCount / yearMax) * 100}%`;
  }
  if (els.chartCurrentYearBar) {
    els.chartCurrentYearBar.style.width = `${(currentYtdCount / yearMax) * 100}%`;
  }
  if (els.chartPriorYearValue) {
    els.chartPriorYearValue.textContent = String(priorYtdCount);
  }
  if (els.chartCurrentYearValue) {
    els.chartCurrentYearValue.textContent = String(currentYtdCount);
  }
  if (els.chartPriorYearLabel) {
    els.chartPriorYearLabel.textContent = `${currentYear - 1} YTD`;
  }
  if (els.chartCurrentYearLabel) {
    els.chartCurrentYearLabel.textContent = `${currentYear} YTD`;
  }
}

function normalizeServiceOptionalSelections(selections = {}) {
  if (!selections || typeof selections !== "object") {
    return {};
  }
  return Object.fromEntries(
    Object.entries(selections).map(([key, value]) => [String(key), Boolean(value)])
  );
}

function normalizeServiceSplitSelections(selections = {}) {
  if (!selections || typeof selections !== "object") {
    return {};
  }
  return Object.fromEntries(
    Object.entries(selections)
      .map(([key, value]) => [String(key), Number(value)])
      .filter(([, value]) => Number.isFinite(value) && value > 0)
  );
}

function getServiceRowKey(row) {
  return String(row?.service || "");
}

function roundCurrencyAmount(value) {
  return Math.round((Number(value) || 0) * 100) / 100;
}

function clampServiceSplitValue(row, rawValue) {
  const splitUnits = Number(row?.splitUnits) || 0;
  if (!splitUnits) {
    return 0;
  }
  const numericValue = Number(rawValue);
  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return 0;
  }
  const step = Number(row?.splitStep) || 1;
  const normalized = Math.round(numericValue / step) * step;
  return Math.max(0, Math.min(splitUnits, normalized));
}

function getServiceRowSplitValue(row, splitSelections = state.serviceSplitSelections) {
  return clampServiceSplitValue(row, normalizeServiceSplitSelections(splitSelections)[getServiceRowKey(row)]);
}

function buildSplitRateBasis(row, splitUnits) {
  if (row?.splitMode === "count" && row?.splitRateBasisLabel) {
    return `${splitUnits} x ${row.splitRateBasisLabel}`;
  }
  return row?.rateBasis || "";
}

function buildSplitRowState(row, optionalSelections = state.serviceOptionalSelections, splitSelections = state.serviceSplitSelections) {
  const key = getServiceRowKey(row);
  const selections = normalizeServiceOptionalSelections(optionalSelections);
  if (selections[key]) {
    return {
      key,
      requiredRow: null,
      optionalRow: { ...row },
      isFullyOptional: true,
      optionalSplitValue: Number(row?.splitUnits) || 0
    };
  }

  const optionalSplitValue = getServiceRowSplitValue(row, splitSelections);
  if (!row?.splitMode || optionalSplitValue <= 0) {
    return {
      key,
      requiredRow: { ...row },
      optionalRow: null,
      isFullyOptional: false,
      optionalSplitValue: 0
    };
  }

  const splitUnits = Number(row.splitUnits) || 0;
  const requiredUnits = Math.max(0, splitUnits - optionalSplitValue);
  const unitValue = splitUnits > 0 ? (Number(row.value) || 0) / splitUnits : 0;
  const optionalValue = roundCurrencyAmount(optionalSplitValue * unitValue);
  const requiredValue = roundCurrencyAmount((Number(row.value) || 0) - optionalValue);
  const requiredRow = requiredUnits > 0 ? {
    ...row,
    hours: row.splitMode === "hours" ? requiredUnits : row.hours,
    rateBasis: buildSplitRateBasis(row, requiredUnits),
    value: requiredValue
  } : null;
  const optionalRow = optionalSplitValue > 0 ? {
    ...row,
    hours: row.splitMode === "hours" ? optionalSplitValue : row.hours,
    rateBasis: buildSplitRateBasis(row, optionalSplitValue),
    value: optionalValue
  } : null;

  return {
    key,
    requiredRow,
    optionalRow,
    isFullyOptional: false,
    optionalSplitValue
  };
}

function getOptionalServiceBundleKeys(serviceKey, rows = getServiceSummaryRows()) {
  const key = String(serviceKey || "");
  const bundleKeys = new Set([key]);
  const allKeys = rows.map((row) => getServiceRowKey(row));

  const addMatching = (predicate) => {
    allKeys.filter(predicate).forEach((rowKey) => bundleKeys.add(rowKey));
  };

  if (key === "Implementation Consultant" || key === "Project Management") {
    addMatching((rowKey) => rowKey === "Implementation Consultant" || rowKey === "Project Management");
  }

  if (
    key.startsWith("Conversion Fixed Fee -")
    || key.startsWith("Data Archive -")
    || key === "Conversion Hosting"
    || key === "Data Archive Hosting"
    || key === "TCM Conversion"
  ) {
    addMatching((rowKey) => (
      rowKey.startsWith("Conversion Fixed Fee -")
      || rowKey.startsWith("Data Archive -")
      || rowKey === "Conversion Hosting"
      || rowKey === "Data Archive Hosting"
      || rowKey === "TCM Conversion"
    ));
  }

  if (key === "Integration Support" || key === "Integration Development") {
    addMatching((rowKey) => rowKey === "Integration Support" || rowKey === "Integration Development");
  }

  if (["Custom Forms / Documents", "Custom Reports", "Reporting Services"].includes(key)) {
    addMatching((rowKey) => ["Custom Forms / Documents", "Custom Reports", "Reporting Services"].includes(rowKey));
  }

  return Array.from(bundleKeys);
}

function getScopedServiceMetrics() {
  const serviceRows = getServiceSummaryRows();
  const { requiredRows, optionalRows: summaryOptionalRows } = splitServiceRowsByOptional(serviceRows);
  const customOptionalRows = getOptionalServiceRows();
  const optionalRows = [...summaryOptionalRows, ...customOptionalRows];
  const requiredTravelRow = requiredRows.find((row) => row.service === "Estimated Travel");
  const requiredServicesValue = requiredRows
    .filter((row) => row.service !== "Estimated Travel")
    .reduce((sum, row) => sum + row.value, 0);
  const requiredHours = requiredRows.reduce((sum, row) => sum + (Number(row.hours) || 0), 0);
  const optionalTotal = optionalRows.reduce((sum, row) => sum + row.value, 0);
  const optionalHours = optionalRows.reduce((sum, row) => sum + (Number(row.hours) || 0), 0);
  const requiredSummaryTotal = requiredServicesValue + (requiredTravelRow?.value || 0);
  const grandTotalIfAccepted = requiredSummaryTotal + optionalTotal;

  return {
    serviceRows,
    requiredRows,
    optionalRows,
    requiredTravelRow,
    requiredServicesValue,
    requiredHours,
    optionalTotal,
    optionalHours,
    requiredSummaryTotal,
    grandTotalIfAccepted
  };
}

function splitServiceRowsByOptional(
  rows = getServiceSummaryRows(),
  optionalSelections = state.serviceOptionalSelections,
  splitSelections = state.serviceSplitSelections
) {
  const requiredRows = [];
  const optionalRows = [];

  rows.forEach((row) => {
    const splitState = buildSplitRowState(row, optionalSelections, splitSelections);
    if (splitState.requiredRow) {
      requiredRows.push(splitState.requiredRow);
    }
    if (splitState.optionalRow) {
      optionalRows.push(splitState.optionalRow);
    }
  });

  return { requiredRows, optionalRows };
}

function isServiceMarkedOptional(serviceName = "") {
  const selections = normalizeServiceOptionalSelections(state.serviceOptionalSelections);
  return Boolean(selections[String(serviceName || "")]);
}

function formatInvestmentSummaryRow(row, options = {}) {
  if (!row) {
    return "";
  }
  const suffix = options.optional ? " (optional)" : "";
  if (row.hours > 0) {
    return `${row.service} - ${formatHours(row.hours)} hours${suffix}`;
  }
  return `${row.service} - ${currency.format(row.value)}${suffix}`;
}

function buildOptionalPresetItem(preset = "") {
  const totals = calculateServiceTotals();
  const settings = getAdminSettings();

  switch (preset) {
    case "config-training":
      return createOptionalQuoteItem({
        name: "Optional Configuration Training",
        pricingMode: "hourly",
        hours: String(totals.configurationTrainingHours || 40),
        rate: String(settings.hourlyRate || DEFAULT_HOURLY_RATE),
        notes: "Quoted separately from base scope"
      });
    case "module":
      return createOptionalQuoteItem({
        name: "Optional Module (Implementation + PM)",
        pricingMode: "fixed",
        fixedValue: "0",
        notes: "Add implementation and PM for an additional module"
      });
    case "pm":
      return createOptionalQuoteItem({
        name: "Optional Project Management",
        pricingMode: "hourly",
        hours: String(totals.pmHours || 0),
        rate: String(settings.hourlyRate || DEFAULT_HOURLY_RATE),
        notes: "Quoted separately from base scope"
      });
    case "conversion":
      return createOptionalQuoteItem({
        name: "Optional Conversion Services",
        pricingMode: "fixed",
        fixedValue: String(totals.conversion?.totalBeforePm || 0),
        notes: "Optional conversion scope"
      });
    default:
      return createOptionalQuoteItem();
  }
}

function formatHistoryTimestamp(value) {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function getChangedFieldLabels(previousState = {}, nextState = {}) {
  const labels = {
    quoteType: "Quote Type",
    cityName: "City / County",
    stateName: "State",
    clientType: "Entity Type",
    serviceDeliveryModel: "Service Delivery Model",
    salesRep: "Sales Resource",
    departments: "Departments",
    userCount: "Users",
    populationValue: "Population",
    goLiveTarget: "Project Length (Months)",
    tylerOwnedProcesses: "Tyler Owned Custom Processes",
    clientOwnedProcesses: "Client Owned Custom Processes",
    tylerOwnedTemplatedProcesses: "Tyler Owned Templated Processes",
    clientOwnedTemplatedProcesses: "Client Owned Templated Processes",
    aiProductToolsHours: "AI Product Tools Hours",
    includeFixedFeeUplift: "Fixed Fee (+20% Hours)",
    solutionOrientationHours: "Solution Orientation Hours",
    solutionValidationHours: "Solution Validation Hours",
    configurationTrainingHours: "Configuration Training Hours",
    endUserTrainingHours: "End User Training Hours",
    productionSupportHours: "Production Support Hours",
    integrationSupportPrice: "Integration Support Hours",
    integrationDevelopmentPrice: "Integration Development Hours",
    integrationNotes: "Integration Notes",
    customFormsCount: "Custom Forms / Documents",
    customReportsCount: "Custom Reports",
    reportHours: "Report Hours",
    reportsNotes: "Reporting Notes",
    conversionScopeType: "Conversion Type",
    conversionModel: "Conversion Model",
    esrCaseTypeCount: "ESR Case Types",
    includeDataArchive: "Include Data Archive",
    includeTcmConversion: "Include TCM Conversion",
    sourcesCommunityDevelopment: "Community Development Sources",
    sourcesBusinessManagement: "Business Management Sources",
    sourcesEnvironmentalHealth: "Environmental Health Sources",
    internalNotes: "Internal Notes",
    optionalQuoteItems: "Optional Services",
    serviceOptionalSelections: "Optional Service Selections",
    serviceSplitSelections: "Optional Service Splits",
    overrideReason: "Override Reason",
    scopes: "Services In Scope",
    suites: "Modules",
    addons: "Add-Ons"
  };

  return Object.entries(labels)
    .filter(([key]) => JSON.stringify(previousState?.[key] ?? null) !== JSON.stringify(nextState?.[key] ?? null))
    .map(([, label]) => label);
}

function buildQuoteHistoryText(quote) {
  const entries = quote?.history || [];
  if (!entries.length) {
    return "No quote history yet";
  }

  return entries
    .slice()
    .reverse()
    .map((entry) => {
      const changeLine = entry.changedFields?.length
        ? `Changed: ${entry.changedFields.join(", ")}`
        : "Changed: Document output updated";
      return [
        `${entry.action} by ${entry.user || "Unknown User"} on ${formatHistoryTimestamp(entry.at)} (${entry.versionLabel || "v1"})`,
        changeLine
      ].join("\n");
    })
    .join("\n\n");
}

function getDefaultScopeState(quoteType = "full-implementation") {
  const isAddonOnly = quoteType === "addon-only";
  return CONFIG.scopeMap.reduce((acc, item) => {
    acc[item.id] = !isAddonOnly;
    return acc;
  }, {});
}

function normalizeServiceDeliveryModelValue(value = "") {
  const normalized = String(value || "").toLowerCase().trim();
  if (!normalized || normalized === "shared" || /^shared-\d+-\d+$/.test(normalized)) {
    return "shared";
  }
  if (normalized === "apollo" || normalized === "appollo") {
    return "apollo";
  }
  return normalized;
}

function normalizeSharedServicesBreakdownValue(value = "") {
  const normalized = String(value || "").toLowerCase().trim();
  if (normalized === "custom") {
    return "custom";
  }
  const match = normalized.match(/(\d+)-(\d+)/);
  if (match) {
    return `${match[1]}-${match[2]}`;
  }
  return "70-30";
}

function getServiceDeliveryModelConfig(value = "", breakdownOverride = null) {
  const normalized = normalizeServiceDeliveryModelValue(value || "shared");
  if (normalized === "shared") {
    const breakdown = normalizeSharedServicesBreakdownValue(
      (breakdownOverride ?? els.sharedServicesBreakdown?.value) || "70-30"
    );
    if (breakdown === "custom") {
      return {
        value: normalized,
        breakdown,
        isShared: true,
        isFull: false,
        isAddonWork: false,
        isAppollo: false,
        isCustomShared: true,
        clientPercent: null,
        tylerPercent: null,
        clientRatio: null,
        tylerRatio: null,
        label: "Shared Services (Custom Split)"
      };
    }
    const sharedMatch = breakdown.match(/^(\d+)-(\d+)$/);
    const clientPercent = Number(sharedMatch?.[1]) || 70;
    const tylerPercent = Number(sharedMatch?.[2]) || 30;
    return {
      value: normalized,
      breakdown,
      isShared: true,
      isFull: false,
      isAddonWork: false,
      isAppollo: false,
      isCustomShared: false,
      clientPercent,
      tylerPercent,
      clientRatio: clientPercent / 100,
      tylerRatio: tylerPercent / 100,
      label: `Shared Services (${clientPercent}% Client / ${tylerPercent}% Tyler)`
    };
  }
  if (normalized === "addon-work") {
    return {
      value: normalized,
      breakdown: "",
      isShared: false,
      isFull: false,
      isAddonWork: true,
      isAppollo: false,
      isCustomShared: false,
      clientPercent: 0,
      tylerPercent: 100,
      clientRatio: 0,
      tylerRatio: 1,
      label: "Add On Work"
    };
  }
  if (normalized === "apollo") {
    return {
      value: normalized,
      breakdown: "",
      isShared: false,
      isFull: false,
      isAddonWork: false,
      isAppollo: true,
      isCustomShared: false,
      clientPercent: 0,
      tylerPercent: 100,
      clientRatio: 0,
      tylerRatio: 1,
      label: "Apollo"
    };
  }
  return {
    value: "full",
    breakdown: "",
    isShared: false,
    isFull: true,
    isAddonWork: false,
    isAppollo: false,
    isCustomShared: false,
    clientPercent: 0,
    tylerPercent: 100,
    clientRatio: 0,
    tylerRatio: 1,
    label: "Full Services"
  };
}

function syncQuoteTypeFromDeliveryModel() {
  if (!els.quoteType) {
    return;
  }
  const deliveryModel = getServiceDeliveryModelConfig(els.serviceDeliveryModel?.value);
  els.quoteType.value = deliveryModel.isAddonWork ? "addon-only" : "full-implementation";
}

function createEmptyQuoteState(overrides = {}) {
  const quoteType = overrides.quoteType || "full-implementation";
  return {
    quoteNumber: "",
    quoteVersion: "v1",
    quoteType,
    currentUser: "",
    useSalesQuoteEntry: false,
    cityName: "",
    stateName: "",
    clientType: "city",
    serviceDeliveryModel: "shared",
    sharedServicesBreakdown: "70-30",
    salesRep: "",
    departments: "",
    userCount: "0",
    populationValue: "0",
    goLiveTarget: "",
    tylerOwnedProcesses: "0",
    clientOwnedProcesses: "0",
    tylerOwnedTemplatedProcesses: "0",
    clientOwnedTemplatedProcesses: "0",
    aiProductToolsHours: "0",
    includeFixedFeeUplift: false,
    solutionOrientationHours: String(SOLUTION_ORIENTATION_HOURS),
    solutionValidationHours: String(SOLUTION_VALIDATION_HOURS),
    configurationTrainingHours: "0",
    endUserTrainingHours: quoteType === "full-implementation" ? String(BASE_EUT_HOURS) : "0",
    productionSupportHours: "0",
    includeTrainTheTrainer: false,
    includeSystemAdminTraining: false,
    includeChangeManagement: false,
    integrationSupportPrice: "0",
    integrationDevelopmentPrice: "0",
    integrationNotes: "",
    customFormsCount: "0",
    customReportsCount: "0",
    reportHours: "0",
    reportsNotes: "",
    conversionScopeType: "full",
    conversionModel: "epl-current-to-epl",
    sourcesCommunityDevelopment: "0",
    sourcesBusinessManagement: "0",
    sourcesEnvironmentalHealth: "0",
    esrCaseTypeCount: "0",
    includeDataArchive: false,
    includeTcmConversion: false,
    internalNotes: "",
    optionalQuoteItems: [],
    serviceOptionalSelections: {},
    serviceSplitSelections: {},
    adminHourlyRate: String(DEFAULT_HOURLY_RATE),
    adminFixedFeeRate: String(FIXED_FEE_HOURLY_RATE),
    adminPmPercentage: String(PM_PERCENTAGE),
    adminTylerProcessHours: String(TYLER_PROCESS_HOURS),
    adminClientProcessHours: String(CLIENT_PROCESS_HOURS),
    adminCustomFormPrice: "3000",
    adminCustomReportPrice: "5000",
    pmOverrideHours: "",
    implementationOverrideHours: "",
    systemAdminOverrideHours: "",
    trainTheTrainerOverrideHours: "",
    eutOverrideHours: "",
    conversionOverridePrice: "",
    reportingOverridePrice: "",
    integrationOverridePrice: "",
    overrideReason: "",
    scopes: getDefaultScopeState(quoteType),
    suites: [],
    addons: [],
    conversionModules: [],
    ...overrides
  };
}

function hasUnsavedQuoteChanges() {
  const currentState = getFormState();

  if (state.loadedQuoteId) {
    const savedQuote = getSavedQuotes().find((item) => item.id === state.loadedQuoteId);
    if (!savedQuote) {
      return true;
    }

    const savedState = { ...(savedQuote.formState || {}) };
    const comparableCurrentState = { ...currentState };

    delete savedState.currentUser;
    delete comparableCurrentState.currentUser;

    if (JSON.stringify(savedState) !== JSON.stringify(comparableCurrentState)) {
      return true;
    }

    const currentSignature = getDocumentSnapshotSignature(buildCurrentDocumentSnapshot());
    const savedSignature = savedQuote.documentVersions?.[savedQuote.documentVersions.length - 1]?.signature || "";
    return currentSignature !== savedSignature;
  }

  const blankState = createEmptyQuoteState({ currentUser: currentState.currentUser, quoteType: currentState.quoteType });
  const comparableBlankState = { ...blankState };
  const comparableCurrentState = { ...currentState };
  delete comparableBlankState.currentUser;
  delete comparableCurrentState.currentUser;
  return JSON.stringify(comparableBlankState) !== JSON.stringify(comparableCurrentState);
}

function getFormState() {
  return {
    quoteNumber: els.quoteNumber.value,
    quoteVersion: els.quoteVersion.value,
    quoteType: els.quoteType.value,
    currentUser: els.currentUser?.value || "",
    useSalesQuoteEntry: els.useSalesQuoteEntry?.checked || false,
    cityName: els.cityName.value,
    stateName: els.stateName?.value || "",
    clientType: els.clientType.value,
    serviceDeliveryModel: normalizeServiceDeliveryModelValue(els.serviceDeliveryModel?.value || "shared"),
    sharedServicesBreakdown: normalizeSharedServicesBreakdownValue(els.sharedServicesBreakdown?.value || "70-30"),
    salesRep: els.salesRep.value,
    departments: els.departments?.value || "",
    userCount: els.userCount.value,
    populationValue: els.populationValue.value,
    goLiveTarget: els.goLiveTarget.value,
    tylerOwnedProcesses: els.tylerOwnedProcesses.value,
    clientOwnedProcesses: els.clientOwnedProcesses.value,
    tylerOwnedTemplatedProcesses: els.tylerOwnedTemplatedProcesses?.value || "0",
    clientOwnedTemplatedProcesses: els.clientOwnedTemplatedProcesses?.value || "0",
    aiProductToolsHours: els.aiProductToolsHours?.value || "0",
    includeFixedFeeUplift: els.includeFixedFeeUplift?.checked || false,
    solutionOrientationHours: els.solutionOrientationHours?.value || String(SOLUTION_ORIENTATION_HOURS),
    solutionValidationHours: els.solutionValidationHours?.value || String(SOLUTION_VALIDATION_HOURS),
    configurationTrainingHours: els.configurationTrainingHours?.value || "0",
    endUserTrainingHours: els.endUserTrainingHours?.value || "0",
    productionSupportHours: els.productionSupportHours?.value || "0",
    includeTrainTheTrainer: els.includeTrainTheTrainer?.checked || false,
    includeSystemAdminTraining: els.includeSystemAdminTraining?.checked || false,
    includeChangeManagement: els.includeChangeManagement?.checked || false,
    integrationSupportPrice: els.integrationSupportPrice?.value || "0",
    integrationDevelopmentPrice: els.integrationDevelopmentPrice?.value || "0",
    integrationNotes: els.integrationNotes.value,
    customFormsCount: els.customFormsCount?.value || "0",
    customReportsCount: els.customReportsCount?.value || "0",
    reportHours: els.reportHours?.value || "0",
    reportsNotes: els.reportsNotes.value,
    conversionScopeType: els.conversionScopeType?.value || "full",
    conversionModel: els.conversionModel?.value || "epl-current-to-epl",
    sourcesCommunityDevelopment: els.sourcesCommunityDevelopment.value,
    sourcesBusinessManagement: els.sourcesBusinessManagement.value,
    sourcesEnvironmentalHealth: els.sourcesEnvironmentalHealth.value,
    esrCaseTypeCount: els.esrCaseTypeCount?.value || "0",
    includeDataArchive: els.includeDataArchive?.checked || false,
    includeTcmConversion: els.includeTcmConversion?.checked || false,
    internalNotes: els.internalNotes.value,
    optionalQuoteItems: getOptionalQuoteItems(),
    serviceOptionalSelections: { ...state.serviceOptionalSelections },
    serviceSplitSelections: { ...state.serviceSplitSelections },
    adminHourlyRate: document.querySelector("#adminHourlyRate")?.value || "225",
    adminFixedFeeRate: document.querySelector("#adminFixedFeeRate")?.value || "250",
    adminPmPercentage: document.querySelector("#adminPmPercentage")?.value || "0.25",
    adminTylerProcessHours: document.querySelector("#adminTylerProcessHours")?.value || "36",
    adminClientProcessHours: document.querySelector("#adminClientProcessHours")?.value || "16",
    adminCustomFormPrice: document.querySelector("#adminCustomFormPrice")?.value || "3000",
    adminCustomReportPrice: document.querySelector("#adminCustomReportPrice")?.value || "5000",
    pmOverrideHours: document.querySelector("#pmOverrideHours")?.value || "",
    implementationOverrideHours: els.implementationOverrideHours?.value || "",
    systemAdminOverrideHours: els.systemAdminOverrideHours?.value || "",
    trainTheTrainerOverrideHours: els.trainTheTrainerOverrideHours?.value || "",
    eutOverrideHours: els.eutOverrideHours?.value || "",
    conversionOverridePrice: document.querySelector("#conversionOverridePrice")?.value || "",
    reportingOverridePrice: document.querySelector("#reportingOverridePrice")?.value || "",
    integrationOverridePrice: document.querySelector("#integrationOverridePrice")?.value || "",
    overrideReason: els.overrideReason?.value || "",
    scopes: CONFIG.scopeMap.reduce((acc, item) => {
      acc[item.id] = document.querySelector(`#${item.id}`)?.checked || false;
      return acc;
    }, {}),
    suites: selectedValues("suite"),
    addons: selectedValues("addon"),
    conversionModules: getSelectedConversionModules()
  };
}

function applyFormState(saved, options = {}) {
  const { requireFreshUser = false } = options;
  const rawSaved = getQuoteFormStateRecord(saved) || {};
  const inferredQuoteType = rawSaved.quoteType || "full-implementation";
  const normalizedDeliveryModel = inferLegacyServiceDeliveryModel(rawSaved);
  const legacyBreakdown = String(rawSaved.serviceDeliveryModel || "").match(/shared-(\d+)-(\d+)/);
  const normalizedScopes = CONFIG.scopeMap.reduce((acc, item) => {
    const explicitScopeValue = rawSaved.scopes?.[item.id];
    const legacyScopeValue = rawSaved[item.id];
    if (typeof explicitScopeValue === "boolean") {
      acc[item.id] = explicitScopeValue;
    } else if (typeof legacyScopeValue === "boolean") {
      acc[item.id] = legacyScopeValue;
    }
    return acc;
  }, {});
  const normalizedSaved = {
    ...createEmptyQuoteState({ quoteType: inferredQuoteType }),
    ...rawSaved,
    quoteType: inferredQuoteType,
    serviceDeliveryModel: normalizedDeliveryModel,
    sharedServicesBreakdown: normalizeSharedServicesBreakdownValue(
      rawSaved.sharedServicesBreakdown || (legacyBreakdown ? `${legacyBreakdown[1]}-${legacyBreakdown[2]}` : "70-30")
    ),
    scopes: {
      ...getDefaultScopeState(inferredQuoteType),
      ...normalizedScopes
    },
    suites: Array.isArray(rawSaved.suites) ? rawSaved.suites : (Array.isArray(rawSaved.selectedSuites) ? rawSaved.selectedSuites : []),
    addons: Array.isArray(rawSaved.addons) ? rawSaved.addons : (Array.isArray(rawSaved.selectedAddons) ? rawSaved.selectedAddons : [])
  };
  if (rawSaved.conversionModel === "archive-10plus") {
    normalizedSaved.conversionModel = "epl-current-to-epl";
    normalizedSaved.includeDataArchive = true;
  }
  if (rawSaved.includeHosting) {
    normalizedSaved.includeDataArchive = true;
  }

  els.quoteNumber.value = normalizedSaved.quoteNumber || "";
  els.quoteVersion.value = normalizedSaved.quoteVersion || "v1";
  els.quoteType.value = normalizedSaved.quoteType || "full-implementation";
  if (els.currentUser) {
    els.currentUser.value = requireFreshUser ? "" : (normalizedSaved.currentUser || "");
  }
  if (els.useSalesQuoteEntry) {
    els.useSalesQuoteEntry.checked = Boolean(normalizedSaved.useSalesQuoteEntry);
  }
  els.cityName.value = normalizedSaved.cityName || "";
  if (els.stateName) {
    els.stateName.value = normalizedSaved.stateName || "";
  }
  els.clientType.value = normalizeClientTypeValue(normalizedSaved.clientType || "city");
  if (els.serviceDeliveryModel) {
    els.serviceDeliveryModel.value = normalizedSaved.serviceDeliveryModel || "full";
    if (els.sharedServicesBreakdown) {
      els.sharedServicesBreakdown.value = normalizedSaved.sharedServicesBreakdown || "70-30";
    }
  }
  syncQuoteTypeFromDeliveryModel();
  els.salesRep.value = normalizedSaved.salesRep || "";
  if (els.departments) {
    els.departments.value = normalizedSaved.departments || "";
  }
  els.userCount.value = normalizedSaved.userCount || "0";
  els.populationValue.value = normalizedSaved.populationValue || "0";
  els.goLiveTarget.value = normalizedSaved.goLiveTarget || "";
  els.tylerOwnedProcesses.value = normalizedSaved.tylerOwnedProcesses || "0";
  els.clientOwnedProcesses.value = normalizedSaved.clientOwnedProcesses || "0";
  if (els.tylerOwnedTemplatedProcesses) {
    els.tylerOwnedTemplatedProcesses.value = normalizedSaved.tylerOwnedTemplatedProcesses || "0";
  }
  if (els.clientOwnedTemplatedProcesses) {
    els.clientOwnedTemplatedProcesses.value = normalizedSaved.clientOwnedTemplatedProcesses || "0";
  }
  syncSharedProcessInputs();
  if (els.aiProductToolsHours) {
    els.aiProductToolsHours.value = normalizedSaved.aiProductToolsHours || "0";
  }
  if (els.includeFixedFeeUplift) {
    els.includeFixedFeeUplift.checked = Boolean(normalizedSaved.includeFixedFeeUplift);
  }
  if (els.solutionOrientationHours) {
    els.solutionOrientationHours.value = normalizedSaved.solutionOrientationHours || String(SOLUTION_ORIENTATION_HOURS);
  }
  if (els.solutionValidationHours) {
    els.solutionValidationHours.value = normalizedSaved.solutionValidationHours || String(SOLUTION_VALIDATION_HOURS);
  }
  if (els.configurationTrainingHours) {
    els.configurationTrainingHours.value = normalizedSaved.configurationTrainingHours || "0";
  }
  if (els.endUserTrainingHours) {
    els.endUserTrainingHours.value = normalizedSaved.endUserTrainingHours || "0";
  }
  if (els.productionSupportHours) {
    els.productionSupportHours.value = normalizedSaved.productionSupportHours || "0";
  }
  if (els.includeTrainTheTrainer) {
    els.includeTrainTheTrainer.checked = Boolean(normalizedSaved.includeTrainTheTrainer);
  }
  if (els.includeSystemAdminTraining) {
    els.includeSystemAdminTraining.checked = Boolean(normalizedSaved.includeSystemAdminTraining);
  }
  if (els.includeChangeManagement) {
    els.includeChangeManagement.checked = Boolean(normalizedSaved.includeChangeManagement);
  }
  if (els.eutOverrideHours) {
    els.eutOverrideHours.value = normalizedSaved.eutOverrideHours || "";
  }
  if (els.integrationSupportPrice) {
    els.integrationSupportPrice.value = normalizedSaved.integrationSupportPrice || "0";
  }
  if (els.integrationDevelopmentPrice) {
    els.integrationDevelopmentPrice.value = normalizedSaved.integrationDevelopmentPrice || "0";
  }
  els.integrationNotes.value = normalizedSaved.integrationNotes || "";
  if (els.customFormsCount) {
    els.customFormsCount.value = normalizedSaved.customFormsCount || "0";
  }
  if (els.customReportsCount) {
    els.customReportsCount.value = normalizedSaved.customReportsCount || "0";
  }
  if (els.reportHours) {
    els.reportHours.value = normalizedSaved.reportHours || "0";
  }
  els.reportsNotes.value = normalizedSaved.reportsNotes || "";
  if (els.conversionScopeType) {
    els.conversionScopeType.value = normalizedSaved.conversionScopeType || "full";
  }
  if (els.conversionModel) {
    els.conversionModel.value = normalizedSaved.conversionModel || "epl-current-to-epl";
  }
  els.sourcesCommunityDevelopment.value = normalizedSaved.sourcesCommunityDevelopment || "0";
  els.sourcesBusinessManagement.value = normalizedSaved.sourcesBusinessManagement || "0";
  els.sourcesEnvironmentalHealth.value = normalizedSaved.sourcesEnvironmentalHealth || "0";
  if (els.esrCaseTypeCount) {
    els.esrCaseTypeCount.value = normalizedSaved.esrCaseTypeCount || "0";
  }
  if (els.includeDataArchive) {
    els.includeDataArchive.checked = Boolean(normalizedSaved.includeDataArchive);
  }
  if (els.includeTcmConversion) {
    els.includeTcmConversion.checked = Boolean(normalizedSaved.includeTcmConversion);
  }
  els.internalNotes.value = normalizedSaved.internalNotes || "";
  renderOptionalQuoteItems(normalizedSaved.optionalQuoteItems || []);
  state.serviceOptionalSelections = normalizeServiceOptionalSelections(normalizedSaved.serviceOptionalSelections);
  state.serviceSplitSelections = normalizeServiceSplitSelections(normalizedSaved.serviceSplitSelections);
  if (els.overrideReason) {
    els.overrideReason.value = normalizedSaved.overrideReason || "";
  }
  [
    "adminHourlyRate",
    "adminFixedFeeRate",
    "adminPmPercentage",
    "adminTylerProcessHours",
    "adminClientProcessHours",
    "adminCustomFormPrice",
    "adminCustomReportPrice",
    "pmOverrideHours",
    "implementationOverrideHours",
    "systemAdminOverrideHours",
    "trainTheTrainerOverrideHours",
    "eutOverrideHours",
    "conversionOverridePrice",
    "reportingOverridePrice",
    "integrationOverridePrice"
  ].forEach((id) => {
    const input = document.querySelector(`#${id}`);
    if (input) {
      input.value = normalizedSaved[id] ?? "";
    }
  });

  CONFIG.scopeMap.forEach((item) => {
    const input = document.querySelector(`#${item.id}`);
    if (input) {
      input.checked = Boolean(normalizedSaved.scopes?.[item.id]);
    }
  });

  document.querySelectorAll('input[name="suite"]').forEach((input) => {
    input.checked = (normalizedSaved.suites || []).includes(input.value);
  });
  document.querySelectorAll('input[name="addon"]').forEach((input) => {
    input.checked = (normalizedSaved.addons || []).includes(input.value);
  });
  const savedConversionModules = normalizedSaved.conversionModules || [];
  if (!normalizedSaved.sourcesCommunityDevelopment && savedConversionModules.includes("community-development")) {
    els.sourcesCommunityDevelopment.value = "1";
  }
  if (!normalizedSaved.sourcesBusinessManagement && savedConversionModules.includes("business-management")) {
    els.sourcesBusinessManagement.value = "1";
  }
  if (!normalizedSaved.sourcesEnvironmentalHealth && savedConversionModules.includes("environmental-health")) {
    els.sourcesEnvironmentalHealth.value = "1";
  }

  calculate();
  updateCurrentUserRequirementState(false);
}

function getSavedQuotesWithMeta() {
  return getSavedQuotes().map((quote, index) => ({
    quote,
    storageIndex: index,
    formState: getQuoteFormStateRecord(quote) || {}
  }));
}

function renderSavedQuotes() {
  const quotes = getSavedQuotes();
  const quotesWithMeta = getSavedQuotesWithMeta();
  if (!els.savedQuotesList) {
    return;
  }

  if (els.heroSavedQuotes) {
    els.heroSavedQuotes.textContent = String(quotes.length);
  }
  renderAnalyticsDashboard();

  if (els.saveStatus && !state.loadedQuoteId) {
    els.saveStatus.textContent = "Start a new quote or open the quote library when you need a saved quote.";
  }

  const query = els.savedQuoteSearch?.value.trim().toLowerCase() || "";
  const filteredQuotes = quotesWithMeta.filter(({ quote, formState }) => {
    const haystack = [
      quote.customerName,
      quote.salesRep,
      formState.cityName,
      `${formState.cityName || ""} ${(formState.stateName || "").trim().toUpperCase()}`.trim(),
      formState.salesRep,
      ...(formState.suites || []),
      ...(formState.addons || [])
    ].join(" ").toLowerCase();
    return !query || haystack.includes(query);
  });

  if (!filteredQuotes.length) {
    els.savedQuotesList.innerHTML = query
      ? '<p class="mini-muted">No saved quotes matched that client name or search term.</p>'
      : '<p class="mini-muted">No saved quotes yet</p>';
    return;
  }

  els.savedQuotesList.innerHTML = filteredQuotes
    .sort((a, b) => getSavedQuoteSortTimestamp(b.quote).localeCompare(getSavedQuoteSortTimestamp(a.quote)))
    .map(({ quote, formState, storageIndex }) => {
      const updatedLabel = quote.updatedLabel || (getSavedQuoteSortTimestamp(quote) ? formatHistoryTimestamp(getSavedQuoteSortTimestamp(quote)) : "Saved quote");
      const versionItems = (quote.documentVersions || [])
        .slice()
        .sort((a, b) => String(b.savedAt || "").localeCompare(String(a.savedAt || "")))
        .map((version, index) => `
          <li class="saved-quote-version-item${index === 0 ? " latest" : ""}">
            <span class="saved-quote-version-label">${version.versionLabel || "v1"}</span>
            <span class="saved-quote-version-date">${version.savedLabel || formatHistoryTimestamp(version.savedAt || "") || "Saved version"}</span>
          </li>
        `)
        .join("");
      const versionCount = (quote.documentVersions || []).length;
      return `
        <article class="saved-quote-card">
          <div class="saved-quote-copy">
            <strong>${quote.customerName || formState.cityName || "Unnamed quote"}</strong>
            <small class="saved-quote-label">Client Name</small>
            <small>${quote.salesRep || formState.salesRep || "No sales rep"} · ${quote.latestVersionLabel || formState.quoteVersion || "v1"} · ${updatedLabel}</small>
            <small>${quote.updatedBy ? `Last updated by ${quote.updatedBy}` : "Last updated by unknown user"}</small>
            <small>${[
              (formState.stateName || "").trim().toUpperCase(),
              formState.clientType === "county" ? "County" : "City"
            ].filter(Boolean).join(" · ")}${formState.suites?.length ? ` · ${formState.suites.length} module(s)` : ""}${formState.addons?.length ? ` · ${formState.addons.length} add-on(s)` : ""}</small>
            ${versionItems ? `
              <details class="saved-quote-versions">
                <summary class="saved-quote-versions-toggle">
                  <span>View Version History</span>
                  <strong>${versionCount} version${versionCount === 1 ? "" : "s"}</strong>
                </summary>
                <ul class="saved-quote-version-list">${versionItems}</ul>
              </details>
            ` : ""}
          </div>
          <div class="saved-quote-actions">
            <button class="secondary-button" type="button" data-load-quote-index="${storageIndex}" onclick="window.loadSavedQuoteByIndex && window.loadSavedQuoteByIndex(${storageIndex})">Load</button>
            <button class="ghost-button" type="button" data-delete-quote-index="${storageIndex}">Delete</button>
          </div>
        </article>
      `;
    })
    .join("");

  els.savedQuotesList.querySelectorAll("[data-delete-quote-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const deleteIndex = Number(button.dataset.deleteQuoteIndex);
      const allQuotes = getSavedQuotes();
      const quoteToDelete = allQuotes[deleteIndex];
      const filtered = allQuotes.filter((_, index) => index !== deleteIndex);
      if (quoteToDelete?.id && state.loadedQuoteId === quoteToDelete.id) {
        state.loadedQuoteId = null;
      }
      setSavedQuotes(filtered);
      renderSavedQuotes();
      if (els.saveStatus) {
        els.saveStatus.textContent = "Quote deleted";
      }
    });
  });
}

function openQuoteLibrary() {
  if (!els.quoteLibraryModal) {
    return;
  }
  els.quoteLibraryModal.classList.remove("hidden-step");
  els.quoteLibraryModal.setAttribute("aria-hidden", "false");
  els.quoteLibraryModal.hidden = false;
  els.quoteLibraryModal.style.display = "grid";
  renderSavedQuotes();
  if (els.savedQuoteSearch) {
    requestAnimationFrame(() => els.savedQuoteSearch.focus());
  }
}

function closeQuoteLibrary() {
  if (!els.quoteLibraryModal) {
    return;
  }
  els.quoteLibraryModal.classList.add("hidden-step");
  els.quoteLibraryModal.setAttribute("aria-hidden", "true");
  els.quoteLibraryModal.style.display = "none";
  els.quoteLibraryModal.hidden = true;
}

function loadSavedQuoteById(id) {
  const quote = getSavedQuotes().find((item) => item.id === id);
  const formState = getQuoteFormStateRecord(quote);
  if (!quote || !formState) {
    if (els.saveStatus) {
      els.saveStatus.classList.add("error");
      els.saveStatus.textContent = "Could not load that saved quote.";
    }
    return;
  }

  try {
    state.loadedQuoteId = quote.id;
    applyFormState(formState, { requireFreshUser: true });
      if (els.quoteVersion) {
        els.quoteVersion.value = quote.latestVersionLabel || formState.quoteVersion || "v1";
      }
      state.lastTargetScenario = null;
      closeQuoteLibrary();
    requestAnimationFrame(() => {
      goToStep(0);
      calculate();
      setOutputText(els.quoteHistory, buildQuoteHistoryText(quote));
      if (els.saveStatus) {
        els.saveStatus.classList.remove("error");
        els.saveStatus.textContent = `Loaded: ${quote.customerName || formState.cityName || "Unnamed quote"}. Enter Current User before saving changes.`;
      }
    });
  } catch (error) {
    if (els.saveStatus) {
      els.saveStatus.classList.add("error");
      els.saveStatus.textContent = `Saved quote load failed: ${error?.message || "Unknown load error"}`;
    }
  }
}

function loadSavedQuoteByIndex(index) {
  const allQuotes = getSavedQuotes();
  const quote = Number.isInteger(index) ? allQuotes[index] : null;
  if (!quote) {
    if (els.saveStatus) {
      els.saveStatus.classList.add("error");
      els.saveStatus.textContent = "Could not load that saved quote.";
    }
    return;
  }

  if (quote.id) {
    loadSavedQuoteById(quote.id);
    return;
  }

  const formState = getQuoteFormStateRecord(quote);
  if (!formState) {
    if (els.saveStatus) {
      els.saveStatus.classList.add("error");
      els.saveStatus.textContent = "Could not load that saved quote.";
    }
    return;
  }

  try {
    state.loadedQuoteId = null;
    applyFormState(formState, { requireFreshUser: true });
      if (els.quoteVersion) {
        els.quoteVersion.value = quote.latestVersionLabel || formState.quoteVersion || "v1";
      }
      state.lastTargetScenario = null;
      closeQuoteLibrary();
    requestAnimationFrame(() => {
      goToStep(0);
      calculate();
      setOutputText(els.quoteHistory, buildQuoteHistoryText(quote));
      if (els.saveStatus) {
        els.saveStatus.classList.remove("error");
        els.saveStatus.textContent = `Loaded: ${quote.customerName || formState.cityName || "Unnamed quote"}. Enter Current User before saving changes.`;
      }
    });
  } catch (error) {
    if (els.saveStatus) {
      els.saveStatus.classList.add("error");
      els.saveStatus.textContent = `Saved quote load failed: ${error?.message || "Unknown load error"}`;
    }
  }
}

window.openQuoteLibrary = openQuoteLibrary;
window.closeQuoteLibrary = closeQuoteLibrary;
window.loadSavedQuoteById = loadSavedQuoteById;
window.loadSavedQuoteByIndex = loadSavedQuoteByIndex;

function formatHistoryLabel(value) {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function getChangedFieldLabels(previousState = {}, nextState = {}) {
  const labels = {
    quoteType: "Quote Type",
    cityName: "City / County",
    stateName: "State",
    clientType: "Entity Type",
    serviceDeliveryModel: "Service Delivery Model",
    salesRep: "Sales Resource",
    userCount: "Users",
    populationValue: "Population",
    goLiveTarget: "Go-Live Target",
    tylerOwnedProcesses: "Tyler Owned Custom Processes",
    clientOwnedProcesses: "Client Owned Custom Processes",
    tylerOwnedTemplatedProcesses: "Tyler Owned Templated Processes",
    clientOwnedTemplatedProcesses: "Client Owned Templated Processes",
    aiProductToolsHours: "AI Product Tools Hours",
    solutionOrientationHours: "Solution Orientation Hours",
    solutionValidationHours: "Solution Validation Hours",
    configurationTrainingHours: "Configuration Training Hours",
    endUserTrainingHours: "End User Training Hours",
    productionSupportHours: "Production Support Hours",
    integrationSupportPrice: "Integration Support Hours",
    integrationDevelopmentPrice: "Integration Development Hours",
    integrationNotes: "Integration Notes",
    customFormsCount: "Custom Forms / Documents",
    customReportsCount: "Custom Reports",
    reportHours: "Report Hours",
    reportsNotes: "Reporting Notes",
    conversionScopeType: "Conversion Type",
    conversionModel: "Conversion Model",
    esrCaseTypeCount: "ESR Case Types",
    includeDataArchive: "Include Data Archive",
    includeTcmConversion: "Include TCM Conversion",
    sourcesCommunityDevelopment: "Community Development Sources",
    sourcesBusinessManagement: "Business Management Sources",
    sourcesEnvironmentalHealth: "Environmental Health Sources",
    internalNotes: "Internal Notes",
    optionalQuoteItems: "Optional Services",
    serviceOptionalSelections: "Optional Service Selections",
    serviceSplitSelections: "Optional Service Splits",
    scopes: "Services In Scope",
    suites: "Modules",
    addons: "Add-Ons"
  };

  return Object.entries(labels)
    .filter(([key]) => JSON.stringify(previousState?.[key] ?? null) !== JSON.stringify(nextState?.[key] ?? null))
    .map(([, label]) => label);
}

function buildQuoteHistoryText(quote) {
  const entries = quote?.history || [];
  if (!entries.length) {
    return "No quote history yet";
  }

  return entries
    .slice()
    .reverse()
    .map((entry) => {
      const changeLine = entry.changedFields?.length
        ? `Changed: ${entry.changedFields.join(", ")}`
        : "Changed: Document output updated";
      return `${entry.action} by ${entry.user || "Unknown User"} on ${formatHistoryLabel(entry.at)} (${entry.versionLabel || "v1"})\n${changeLine}`;
    })
    .join("\n\n");
}

function updateCurrentUserRequirementState(showError = false) {
  const hasUser = Boolean(els.currentUser?.value.trim());
  const hasClientName = Boolean(els.cityName?.value.trim());
  const canSave = hasUser && hasClientName;
  if (els.saveQuote) {
    els.saveQuote.disabled = !canSave;
  }
  if (els.saveAsQuote) {
    els.saveAsQuote.disabled = !canSave;
  }
  els.currentUser?.classList.toggle("required-error", showError && !hasUser);
  els.cityName?.classList.toggle("required-error", showError && !hasClientName);
  els.saveStatus?.classList.toggle("error", showError && !canSave);
  return { hasUser, hasClientName, canSave };
}

async function saveCurrentQuote() {
  const requiredUser = els.currentUser?.value.trim() || "";
  const requirementState = updateCurrentUserRequirementState(true);
  if (!requirementState.canSave) {
    if (els.saveStatus) {
      const missing = [];
      if (!requirementState.hasClientName) {
        missing.push("Client Name");
      }
      if (!requirementState.hasUser) {
        missing.push("Current User");
      }
      els.saveStatus.textContent = `Save blocked: enter ${missing.join(" and ")} before Save or Save As.`;
    }
    if (!requirementState.hasClientName) {
      els.cityName?.focus();
    } else {
      els.currentUser?.focus();
    }
    return false;
  }

  const quotes = getSavedQuotes();
  const customerName = els.cityName.value.trim() || "Unnamed quote";
  const now = new Date();
  const existingQuote = quotes.find((item) => item.id === state.loadedQuoteId);
  const actingUser = requiredUser;
  const currentSnapshot = buildCurrentDocumentSnapshot();
  const currentSignature = getDocumentSnapshotSignature(currentSnapshot);
  const existingVersions = existingQuote?.documentVersions || [];
  const existingHistory = existingQuote?.history || [];
  const lastVersion = existingVersions[existingVersions.length - 1];
  const documentChanged = !lastVersion || lastVersion.signature !== currentSignature;
  const versionNumber = documentChanged ? (existingVersions.length + 1) : Math.max(existingVersions.length, 1);
  const autoVersionLabel = `v${versionNumber}`;
  const currentVersionLabel = existingQuote?.latestVersionLabel || els.quoteVersion.value.trim() || autoVersionLabel;

  if (!els.quoteVersion.value.trim() || documentChanged) {
    els.quoteVersion.value = autoVersionLabel;
  } else {
    els.quoteVersion.value = currentVersionLabel;
  }

  const formState = getFormState();
  const changedFields = existingQuote ? getChangedFieldLabels(existingQuote.formState, formState) : ["Initial quote creation"];
  const documentVersions = documentChanged
    ? [
        ...existingVersions,
        {
          versionLabel: formState.quoteVersion || autoVersionLabel,
          savedAt: now.toISOString(),
          savedLabel: now.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"
          }),
          signature: currentSignature,
          snapshot: currentSnapshot
        }
      ]
    : existingVersions;
  const history = documentChanged
    ? [
        ...existingHistory,
        {
          action: existingQuote ? "Updated" : "Created",
          user: actingUser,
          at: now.toISOString(),
          versionLabel: formState.quoteVersion || autoVersionLabel,
          changedFields
        }
      ]
    : existingHistory;

  const quote = {
    id: state.loadedQuoteId || `${Date.now()}`,
    customerName,
    salesRep: els.salesRep.value.trim(),
    createdAt: existingQuote?.createdAt || now.toISOString(),
    createdBy: existingQuote?.createdBy || actingUser,
    updatedBy: actingUser,
    updatedAt: now.toISOString(),
    updatedLabel: now.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }),
    latestVersionLabel: formState.quoteVersion || autoVersionLabel,
    documentVersions,
    history,
    formState
  };

  const filtered = quotes.filter((item) => item.id !== quote.id);
  filtered.push(quote);
  setSavedQuotes(filtered);
  state.loadedQuoteId = quote.id;
  renderSavedQuotes();
  let archiveResult = null;
  if (documentChanged) {
    try {
      archiveResult = await archiveQuoteVersion(quote, currentSnapshot);
    } catch (error) {
      archiveResult = {
        archived: false,
        skipped: false,
        reason: error?.message || "Unable to write archived version"
      };
    }
  }
  if (els.saveStatus) {
    els.saveStatus.classList.remove("error");
    if (!documentChanged) {
      els.saveStatus.textContent = `No document changes: ${customerName} remains ${quote.latestVersionLabel}`;
    } else if (archiveResult?.archived && archiveResult.mode === "downloads") {
      els.saveStatus.textContent = `Saved: ${customerName} (${quote.latestVersionLabel}). Version files were downloaded for archive.`;
    } else if (archiveResult?.archived) {
      els.saveStatus.textContent = `Saved: ${customerName} (${quote.latestVersionLabel}). Archived in ${archiveResult.folderName}.`;
    } else if (archiveResult && !archiveResult.skipped) {
      els.saveStatus.textContent = `Saved: ${customerName} (${quote.latestVersionLabel}). Archive warning: ${archiveResult.reason}.`;
    } else if (state.archiveDirectoryName) {
      els.saveStatus.textContent = `Saved: ${customerName} (${quote.latestVersionLabel}). Archive skipped: ${archiveResult?.reason || "archive folder unavailable"}.`;
    } else {
      els.saveStatus.textContent = `Saved: ${customerName} (${quote.latestVersionLabel}). Select Version Archive Folder to also save files outside the browser.`;
    }
  }
  setOutputText(els.quoteHistory, buildQuoteHistoryText(quote));
  return true;
}

function exportJson() {
  const quotes = getSavedQuotes();
  const existingQuote = quotes.find((item) => item.id === state.loadedQuoteId);
  const payload = {
    exportedAt: new Date().toISOString(),
    quote: {
      id: state.loadedQuoteId || null,
      customerName: els.cityName.value.trim() || "Unnamed quote",
      salesRep: els.salesRep.value.trim(),
      createdAt: existingQuote?.createdAt || null,
      createdBy: existingQuote?.createdBy || "",
      updatedBy: existingQuote?.updatedBy || "",
      latestVersionLabel: existingQuote?.latestVersionLabel || els.quoteVersion.value.trim() || "v1",
      documentVersions: existingQuote?.documentVersions || [],
      history: existingQuote?.history || [],
      formState: getFormState()
    }
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${(els.cityName.value.trim() || "epl-quote").replace(/\s+/g, "-").toLowerCase()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importJsonFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(reader.result);
      const importedFormState = getQuoteFormStateRecord(payload?.quote);
      if (!importedFormState) {
        throw new Error("Invalid quote file");
      }
      state.loadedQuoteId = payload.quote.id || null;
      applyFormState(importedFormState, { requireFreshUser: true });
      if (els.quoteVersion) {
        els.quoteVersion.value = payload.quote.latestVersionLabel || importedFormState.quoteVersion || "v1";
      }
      state.lastTargetScenario = null;
      if (payload.quote.id) {
        const quotes = getSavedQuotes();
        const filtered = quotes.filter((item) => item.id !== payload.quote.id);
        filtered.push({
          id: payload.quote.id,
          customerName: payload.quote.customerName || importedFormState.cityName || "Unnamed quote",
          salesRep: payload.quote.salesRep || importedFormState.salesRep || "",
          createdAt: payload.quote.createdAt || new Date().toISOString(),
          createdBy: payload.quote.createdBy || importedFormState.currentUser || "",
          updatedBy: payload.quote.updatedBy || importedFormState.currentUser || "",
          updatedAt: new Date().toISOString(),
          updatedLabel: new Date().toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"
          }),
          latestVersionLabel: payload.quote.latestVersionLabel || importedFormState.quoteVersion || "v1",
          documentVersions: payload.quote.documentVersions || [],
          history: payload.quote.history || [],
          formState: importedFormState
        });
        setSavedQuotes(filtered);
        renderSavedQuotes();
      }
      setOutputText(els.quoteHistory, buildQuoteHistoryText({ history: payload.quote.history || [] }));
      if (els.saveStatus) {
        els.saveStatus.classList.remove("error");
        els.saveStatus.textContent = `Imported: ${payload.quote.customerName || "Unnamed quote"}. Enter Current User before saving changes.`;
      }
    } catch (error) {
      if (els.saveStatus) {
        els.saveStatus.textContent = "Import failed";
      }
    }
  };
  reader.readAsText(file);
}

async function startNewQuote() {
  const preservedUser = els.currentUser?.value.trim() || "";
  if (hasUnsavedQuoteChanges()) {
    if (!preservedUser) {
      const discardWithoutSaving = window.confirm("This quote has unsaved changes, and Current User is blank so it cannot be saved as a new version. Click OK to start a new quote and discard the current changes.");
      if (!discardWithoutSaving) {
        if (els.saveStatus) {
          els.saveStatus.classList.remove("error");
          els.saveStatus.textContent = "New quote canceled. Enter Current User if you want to save before starting over.";
        }
        return;
      }
    } else {
      const wantsToSave = window.confirm("This quote has unsaved changes. Click OK to save it before starting a new quote. Click Cancel to choose whether to discard it.");
      if (wantsToSave) {
        const saved = await saveCurrentQuote();
        if (!saved) {
          return;
        }
      } else {
        const discardChanges = window.confirm("Start a new quote without saving the current one?");
        if (!discardChanges) {
          if (els.saveStatus) {
            els.saveStatus.classList.remove("error");
            els.saveStatus.textContent = "New quote canceled. Current quote is still open.";
          }
          return;
        }
      }
    }
  }
  state.loadedQuoteId = null;
  state.lastTargetScenario = null;
  applyFormState(createEmptyQuoteState({ currentUser: preservedUser }));
  applyQuoteTypeDefaults();
  calculate();
  goToStep(0);
  closeQuoteLibrary();
  setOutputText(els.quoteHistory, "No quote history yet");
  setOutputText(els.reviewedQuoteText, "");
  setOutputText(els.quoteReviewResults, "Upload or paste a quote and click Analyze Quote Variance to review service gaps.");
  setOutputText(els.quoteReviewRecommendations, "Add a target value and assumptions, then click Build Target Guidance.");
  if (els.quoteReviewInput) {
    els.quoteReviewInput.value = "";
  }
  if (els.saveStatus) {
    els.saveStatus.classList.remove("error");
    els.saveStatus.textContent = preservedUser
      ? "Started a new quote. Save when you are ready."
      : "Started a new quote. Enter Current User before saving.";
  }
  updateCurrentUserRequirementState(false);
}

function normalizeReviewText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\$([0-9,]+)/g, (_, amount) => `$${amount.replace(/,/g, "")}`)
    .replace(/[^a-z0-9$%:.\- ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCurrencyNumber(value) {
  const cleaned = String(value || "").replace(/[^0-9.-]/g, "");
  return cleaned ? Number(cleaned) : 0;
}

function decodePdfLiteral(literal) {
  return literal
    .replace(/\\\(/g, "(")
    .replace(/\\\)/g, ")")
    .replace(/\\\\/g, "\\")
    .replace(/\\n/g, " ")
    .replace(/\\r/g, " ")
    .replace(/\\t/g, " ");
}

function extractPdfTextFromArrayBuffer(buffer) {
  const bytes = new Uint8Array(buffer);
  let raw = "";
  for (let index = 0; index < bytes.length; index += 1) {
    raw += String.fromCharCode(bytes[index]);
  }

  const chunks = [];
  const literalMatches = raw.matchAll(/\((?:\\.|[^\\()])*\)\s*Tj/g);
  for (const match of literalMatches) {
    const textMatch = match[0].match(/\(((?:\\.|[^\\()])*)\)\s*Tj/);
    if (textMatch?.[1]) {
      chunks.push(decodePdfLiteral(textMatch[1]));
    }
  }

  const arrayMatches = raw.matchAll(/\[(.*?)\]\s*TJ/gs);
  for (const match of arrayMatches) {
    const segment = match[1] || "";
    const innerMatches = segment.matchAll(/\(((?:\\.|[^\\()])*)\)/g);
    for (const inner of innerMatches) {
      if (inner[1]) {
        chunks.push(decodePdfLiteral(inner[1]));
      }
    }
  }

  const cleaned = chunks
    .join("\n")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return cleaned;
}

function extractUploadedCurrencyValues(text) {
  return Array.from(String(text || "").matchAll(/\$?\s?([0-9]{1,3}(?:,[0-9]{3})+|[0-9]+)(?:\.00)?/g))
    .map((match) => Number(match[1].replace(/,/g, "")))
    .filter((value) => Number.isFinite(value) && value > 0);
}

function extractUploadedTotalValue(text) {
  const content = String(text || "");
  const totalLineMatch = content.match(/total(?:\s+service(?:s)?)?\s+value[^0-9$]*\$?\s*([0-9,]+)/i);
  if (totalLineMatch) {
    return Number(totalLineMatch[1].replace(/,/g, ""));
  }
  const investmentLineMatch = content.match(/investment[^0-9$]*\$?\s*([0-9,]+)/i);
  if (investmentLineMatch) {
    return Number(investmentLineMatch[1].replace(/,/g, ""));
  }
  return 0;
}

function extractLabeledValue(text, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = String(text || "").match(new RegExp(`${escaped}\\s*(?::|-)?\\s*([^\\n\\r]+)`, "i"));
  return match ? match[1].trim() : "";
}

function extractLabeledValueFromAliases(text, aliases) {
  for (const alias of aliases) {
    const value = extractLabeledValue(text, alias);
    if (value) {
      return value;
    }
  }
  return "";
}

function inferNarrativeProcessCounts(text) {
  const lines = String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const totals = {
    tylerCustom: 0,
    tylerTemplated: 0,
    clientCustom: 0,
    clientTemplated: 0
  };

  lines.forEach((line) => {
    const normalized = line.toLowerCase();
    const uniqueMatches = Array.from(normalized.matchAll(/(\d+)\s+unique\b/g));
    const templateMatches = Array.from(normalized.matchAll(/(\d+)\s+template(?:d)?\b/g));
    const customCount = uniqueMatches.reduce((sum, match) => sum + (Number(match[1]) || 0), 0);
    const templatedCount = templateMatches.reduce((sum, match) => sum + (Number(match[1]) || 0), 0);

    if (!customCount && !templatedCount) {
      return;
    }

    const isTylerOwned = /tyler/.test(normalized) && /(owns|owner|lead|responsible|configure)/.test(normalized);
    const isClientOwned = /client/.test(normalized) && /(owns|owned|responsible|complete|configure)/.test(normalized);

    if (isTylerOwned) {
      totals.tylerCustom += customCount;
      totals.tylerTemplated += templatedCount;
      return;
    }

    if (isClientOwned) {
      totals.clientCustom += customCount;
      totals.clientTemplated += templatedCount;
    }
  });

  return totals;
}

function estimateSharedClientCount(tylerCount, modelOverride = "", breakdownOverride = null) {
  if (tylerCount <= 0) {
    return 0;
  }
  const deliveryModel = getServiceDeliveryModelConfig(
    modelOverride || els.serviceDeliveryModel?.value,
    breakdownOverride
  );
  const tylerRatio = deliveryModel.tylerRatio || 0.3;
  const totalEstimated = Math.round(tylerCount / tylerRatio);
  return Math.max(0, totalEstimated - tylerCount);
}

function estimateProcessCountsFromImplementationHours(implementationHours, modelValue = "", breakdownValue = null, settings = getAdminSettings()) {
  const hours = Number(implementationHours) || 0;
  if (hours <= 0) {
    return {
      tylerCustom: 0,
      clientCustom: 0,
      tylerTemplated: 0,
      clientTemplated: 0
    };
  }

  const deliveryModel = getServiceDeliveryModelConfig(
    modelValue || els.serviceDeliveryModel?.value,
    breakdownValue
  );

  if (deliveryModel.isShared && !deliveryModel.isCustomShared) {
    const blendedHoursPerProcess =
      ((deliveryModel.tylerRatio || 0) * settings.tylerProcessHours) +
      ((deliveryModel.clientRatio || 0) * settings.clientProcessHours);
    const totalCustomProcesses = Math.max(1, Math.round(hours / Math.max(blendedHoursPerProcess, 1)));
    const tylerCustom = Math.max(1, Math.round(totalCustomProcesses * (deliveryModel.tylerRatio || 0)));
    const clientCustom = Math.max(0, totalCustomProcesses - tylerCustom);
    return {
      tylerCustom,
      clientCustom,
      tylerTemplated: 0,
      clientTemplated: 0
    };
  }

  return {
    tylerCustom: Math.max(1, Math.round(hours / Math.max(settings.tylerProcessHours, 1))),
    clientCustom: 0,
    tylerTemplated: 0,
    clientTemplated: 0
  };
}

function getEffectiveProcessCounts() {
  const tylerCustom = Number(els.tylerOwnedProcesses?.value) || 0;
  const clientCustomInput = Number(els.clientOwnedProcesses?.value) || 0;
  const tylerTemplated = Number(els.tylerOwnedTemplatedProcesses?.value) || 0;
  const clientTemplatedInput = Number(els.clientOwnedTemplatedProcesses?.value) || 0;
  const appolloMode = isAppolloMode();
  const treatAsFullServices = (
    !appolloMode &&
    els.serviceDeliveryModel?.value !== "addon-work"
    && clientCustomInput === 0
    && clientTemplatedInput === 0
    && (tylerCustom > 0 || tylerTemplated > 0)
  );
  const deliveryModel = getServiceDeliveryModelConfig(treatAsFullServices ? "full" : els.serviceDeliveryModel?.value);
  const shouldAutoEstimateClient = deliveryModel.isShared && !deliveryModel.isCustomShared;
  const clientCustom = shouldAutoEstimateClient ? estimateSharedClientCount(tylerCustom) : clientCustomInput;
  const clientTemplated = shouldAutoEstimateClient ? estimateSharedClientCount(tylerTemplated) : clientTemplatedInput;
  return {
    deliveryModel,
    tylerCustom,
    clientCustom,
    tylerTemplated,
    clientTemplated,
    clientCustomInput,
    clientTemplatedInput
  };
}

function syncSharedProcessInputs() {
  const tylerCustom = Number(els.tylerOwnedProcesses?.value) || 0;
  const clientCustomInput = Number(els.clientOwnedProcesses?.value) || 0;
  const tylerTemplated = Number(els.tylerOwnedTemplatedProcesses?.value) || 0;
  const clientTemplatedInput = Number(els.clientOwnedTemplatedProcesses?.value) || 0;
  const appolloMode = isAppolloMode();

  const deliveryModel = getServiceDeliveryModelConfig(els.serviceDeliveryModel?.value);
  const autoEstimateClient = deliveryModel.isShared && !deliveryModel.isCustomShared;

  console.log('syncSharedProcessInputs:', {
    deliveryModelValue: els.serviceDeliveryModel?.value,
    isShared: deliveryModel.isShared,
    autoEstimateClient,
    tylerCustom,
    tylerTemplated
  });
  if (els.clientOwnedProcesses) {
    if (autoEstimateClient) {
      els.clientOwnedProcesses.value = String(estimateSharedClientCount(Number(els.tylerOwnedProcesses?.value) || 0));
    }
    els.clientOwnedProcesses.readOnly = autoEstimateClient;
  }
  if (els.clientOwnedTemplatedProcesses) {
    if (autoEstimateClient) {
      els.clientOwnedTemplatedProcesses.value = String(estimateSharedClientCount(Number(els.tylerOwnedTemplatedProcesses?.value) || 0));
    }
    els.clientOwnedTemplatedProcesses.readOnly = autoEstimateClient;
  }
}

function syncSalesQuoteProcessInputs() {
  const deliveryModel = getServiceDeliveryModelConfig(
    els.salesQuoteServiceDeliveryModel?.value || els.serviceDeliveryModel?.value,
    els.salesQuoteSharedServicesBreakdown?.value || els.sharedServicesBreakdown?.value
  );
  const autoEstimateClient = deliveryModel.isShared && !deliveryModel.isCustomShared;
  const lockClientFields = autoEstimateClient || deliveryModel.isFull || deliveryModel.isAddonWork;

  if (els.salesQuoteSharedBreakdownField) {
    els.salesQuoteSharedBreakdownField.classList.toggle("hidden-step", !deliveryModel.isShared);
  }

  if (els.salesQuoteClientOwnedProcesses) {
    if (autoEstimateClient) {
      els.salesQuoteClientOwnedProcesses.value = String(
        estimateSharedClientCount(
          Number(els.salesQuoteTylerOwnedProcesses?.value) || 0,
          deliveryModel.value,
          deliveryModel.breakdown
        )
      );
    } else if (deliveryModel.isFull || deliveryModel.isAddonWork) {
      els.salesQuoteClientOwnedProcesses.value = "0";
    }
    els.salesQuoteClientOwnedProcesses.readOnly = lockClientFields;
  }

  if (els.salesQuoteClientOwnedTemplatedProcesses) {
    if (autoEstimateClient) {
      els.salesQuoteClientOwnedTemplatedProcesses.value = String(
        estimateSharedClientCount(
          Number(els.salesQuoteTylerOwnedTemplatedProcesses?.value) || 0,
          deliveryModel.value,
          deliveryModel.breakdown
        )
      );
    } else if (deliveryModel.isFull || deliveryModel.isAddonWork) {
      els.salesQuoteClientOwnedTemplatedProcesses.value = "0";
    }
    els.salesQuoteClientOwnedTemplatedProcesses.readOnly = lockClientFields;
  }
}

function getServiceHoursMultiplier() {
  return els.includeFixedFeeUplift?.checked ? 1.2 : 1;
}

function calculateProcessServices() {
  const isAddonOnly = els.quoteType?.value === "addon-only";
  const settings = getAdminSettings();
  const processCounts = getEffectiveProcessCounts();
  const serviceHoursMultiplier = getServiceHoursMultiplier();
  const tylerProcesses = processCounts.tylerCustom;
  const clientProcesses = processCounts.clientCustom;
  const tylerTemplatedProcesses = processCounts.tylerTemplated;
  const clientTemplatedProcesses = processCounts.clientTemplated;
  const rawHours =
    (tylerProcesses * settings.tylerProcessHours) +
    (clientProcesses * settings.clientProcessHours) +
    (tylerTemplatedProcesses * TYLER_TEMPLATED_PROCESS_HOURS) +
    (clientTemplatedProcesses * CLIENT_TEMPLATED_PROCESS_HOURS);
  const hours = roundQuotedHours(rawHours * serviceHoursMultiplier, isAddonOnly);
  return {
    processCounts,
    hours,
    price: hours * settings.hourlyRate
  };
}

function extractHoursForService(text, serviceName) {
  const escaped = serviceName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = String(text || "").match(new RegExp(`${escaped}[^\\n\\r]*?\\b([0-9]+)\\b\\s*(?:hours?)?`, "i"));
  return match ? Number(match[1]) || 0 : 0;
}

function extractHoursForAliases(text, aliases) {
  for (const alias of aliases) {
    const value = extractHoursForService(text, alias);
    if (value > 0) {
      return value;
    }
  }
  return 0;
}

function extractCurrencyForService(text, serviceName) {
  const escaped = serviceName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = String(text || "").match(new RegExp(`${escaped}[^\\n\\r$]*\\$\\s*([0-9,]+)`, "i"));
  return match ? Number(match[1].replace(/,/g, "")) || 0 : 0;
}

function extractCurrencyForAliases(text, aliases) {
  return aliases.reduce((sum, alias) => sum + extractCurrencyForService(text, alias), 0);
}

function sumCurrencyForServiceAliases(text, aliases) {
  return aliases.reduce((sum, alias) => sum + extractCurrencyForService(text, alias), 0);
}

function getUploadedConversionTotal(text) {
  return sumCurrencyForServiceAliases(text, getReviewServiceAliases("Conversion Fixed Fee"));
}

function getReviewServiceAliases(serviceName) {
  const aliases = {
    "Implementation Consultant": [
      "Implementation Consultant",
      "Implementation Consukltant",
      "Professional Implementation Services",
      "Professional Services Hours"
    ],
    "Conversion Fixed Fee": [
      "Conversion Fixed Fee",
      "BM Conversion",
      "Business Management conversion",
      "Comm Dev conversion",
      "Comm Dev Conversion",
      "Community Development conversion",
      "Environmental Health conversion"
    ],
    "Conversion Hosting": ["Conversion Hosting", "Hosting"],
    "Reporting Services": ["Reporting Services", "Reports", "Custom Reports", "Custom Forms / Documents"],
    "Integration Support": ["Integration Support"],
    "Integration Development": ["Integration Development"],
    "Configuration Training": ["Configuration Training"],
    "System Administrator Training": ["System Administrator Training", "System Admin Training"],
    "Train the Trainer": ["Train the Trainer"],
    "End User Training": ["End User Training", "EUT"],
    "Production Support": ["Production Support"],
    "Project Management": ["Project Management", "Project Manager Services", "PM Hours"],
    "Estimated Travel": ["Estimated Travel", "Travel"]
  };
  return aliases[serviceName] || [serviceName];
}

function getKnownReviewServiceNames() {
  return [
    "Implementation Consultant",
    "Conversion Fixed Fee",
    "Conversion Hosting",
    "Reporting Services",
    "Integration Support",
    "Integration Development",
    "Configuration Training",
    "System Administrator Training",
    "Train the Trainer",
    "End User Training",
    "Production Support",
    "Project Management",
    "Estimated Travel"
  ];
}

function extractUploadedServiceSnapshot(text, serviceName) {
  const content = String(text || "");
  const normalized = normalizeReviewText(content);
  const settings = getAdminSettings();
  const aliases = getReviewServiceAliases(serviceName);
  const hasAlias = aliases.some((alias) => normalized.includes(normalizeReviewText(alias)));

  let hours = 0;
  let value = 0;

  switch (serviceName) {
    case "Implementation Consultant": {
      hours = extractHoursForAliases(content, getReviewServiceAliases("Implementation Consultant"))
        || parseCurrencyNumber(extractLabeledValueFromAliases(content, getReviewServiceAliases("Implementation Consultant")));
      value = extractCurrencyForAliases(content, getReviewServiceAliases("Implementation Consultant"));
      if (!value && hours > 0) {
        value = hours * settings.hourlyRate;
      }
      break;
    }
    case "Conversion Fixed Fee": {
      value = getUploadedConversionTotal(content);
      if (!value) {
        value = extractCurrencyForAliases(content, ["Conversion", "Data Conversion Services"]);
      }
      hours = extractHoursForAliases(content, ["Data Conversion Services", "Conversion Fixed Fee", "Conversion"]);
      if (!value && hours > 0) {
        value = hours * settings.hourlyRate;
      }
      if (value > 0) {
        hours = hours || Math.ceil(value / FIXED_FEE_HOURLY_RATE);
      }
      break;
    }
    case "Conversion Hosting": {
      value = extractCurrencyForService(content, "Conversion Hosting") || extractCurrencyForService(content, "Hosting");
      break;
    }
    case "Reporting Services": {
      const reportHours = parseCurrencyNumber(extractLabeledValue(content, "Report Hours"));
      const customForms = parseCurrencyNumber(extractLabeledValue(content, "Custom Forms / Documents"));
      const customReports = parseCurrencyNumber(extractLabeledValue(content, "Custom Reports"));
      hours = reportHours;
      value =
        extractCurrencyForService(content, "Reporting Services")
        || (customForms * 3000) + (customReports * 5000) + (reportHours * FIXED_FEE_HOURLY_RATE);
      if (!hours && value > 0) {
        hours = Math.ceil(value / FIXED_FEE_HOURLY_RATE);
      }
      break;
    }
    case "Integration Support": {
      hours = extractHoursForService(content, "Integration Support");
      value = extractCurrencyForService(content, "Integration Support");
      if (!value && hours > 0) {
        value = hours * FIXED_FEE_HOURLY_RATE;
      }
      break;
    }
    case "Integration Development": {
      hours = extractHoursForService(content, "Integration Development");
      value = extractCurrencyForService(content, "Integration Development");
      if (!value && hours > 0) {
        value = hours * FIXED_FEE_HOURLY_RATE;
      }
      break;
    }
    case "Configuration Training":
    case "System Administrator Training":
    case "Train the Trainer":
    case "End User Training":
    case "Production Support":
    case "Project Management": {
      hours = extractHoursForAliases(content, getReviewServiceAliases(serviceName))
        || (serviceName === "Project Management"
          ? parseCurrencyNumber(extractLabeledValueFromAliases(content, getReviewServiceAliases(serviceName)))
          : 0);
      value = extractCurrencyForAliases(content, getReviewServiceAliases(serviceName));
      if (!value && hours > 0) {
        value = hours * settings.hourlyRate;
      }
      break;
    }
    case "Estimated Travel": {
      value = extractCurrencyForService(content, "Estimated Travel") || extractCurrencyForService(content, "Travel");
      break;
    }
    default: {
      hours = extractHoursForService(content, serviceName);
      value = extractCurrencyForService(content, serviceName);
    }
  }

  return {
    service: serviceName,
    present: hasAlias || hours > 0 || value > 0,
    hours,
    value
  };
}

function deriveUploadedServiceValue(text) {
  const explicitTotal = extractUploadedTotalValue(text);
  if (explicitTotal > 0) {
    return {
      total: explicitTotal,
      source: "explicit total"
    };
  }

  const settings = getAdminSettings();
  const professionalServicesHours = parseCurrencyNumber(extractLabeledValue(text, "Professional Services Hours"));
  const pmHours = parseCurrencyNumber(extractLabeledValue(text, "PM Hours"));

  const lineItemPatterns = [
    /conversion[^$\n\r]*\$?\s*([0-9,]+)/gi,
    /report(?:ing)?[^$\n\r]*\$?\s*([0-9,]+)/gi,
    /integration support[^$\n\r]*\$?\s*([0-9,]+)/gi,
    /integration development[^$\n\r]*\$?\s*([0-9,]+)/gi,
    /end user training[^$\n\r]*\$?\s*([0-9,]+)/gi,
    /train the trainer[^$\n\r]*\$?\s*([0-9,]+)/gi,
    /system administrator training[^$\n\r]*\$?\s*([0-9,]+)/gi,
    /production support[^$\n\r]*\$?\s*([0-9,]+)/gi,
    /estimated travel[^$\n\r]*\$?\s*([0-9,]+)/gi,
    /hosting[^$\n\r]*\$?\s*([0-9,]+)/gi
  ];

  let lineItemTotal = 0;
  lineItemPatterns.forEach((pattern) => {
    const matches = Array.from(String(text || "").matchAll(pattern));
    matches.forEach((match) => {
      lineItemTotal += Number((match[1] || "0").replace(/,/g, "")) || 0;
    });
  });

  const derivedTotal = (professionalServicesHours * settings.hourlyRate) + (pmHours * settings.hourlyRate) + lineItemTotal;
  return {
    total: derivedTotal,
    source: derivedTotal > 0 ? "derived from uploaded hours and line items" : ""
  };
}

function setCheckboxIfPresent(id, shouldCheck) {
  const input = document.querySelector(`#${id}`);
  if (input && !input.disabled) {
    input.checked = shouldCheck;
  }
}

function setNamedCheckboxesFromText(name, items, text) {
  const normalized = normalizeReviewText(text);
  document.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
    const item = items.find((entry) => entry.id === input.value);
    if (item) {
      input.checked = normalized.includes(normalizeReviewText(item.name));
    }
  });
}

function populateFormFromUploadedQuote(text) {
  const content = String(text || "");
  const normalized = normalizeReviewText(content);

  const quoteTypeValue = extractLabeledValue(content, "Quote type");
  if (/add-?on/i.test(quoteTypeValue)) {
    els.quoteType.value = "addon-only";
    if (els.serviceDeliveryModel) {
      els.serviceDeliveryModel.value = "addon-work";
    }
  } else if (/full implementation/i.test(quoteTypeValue)) {
    els.quoteType.value = "full-implementation";
  }

  const isSharedServices = /shared services model|shared service contract|shared services/i.test(content);
  const isAddonWork = /add-?on work|add-?on only|add-?on quote/i.test(content);
  if (els.serviceDeliveryModel && !/add-?on/i.test(quoteTypeValue)) {
    const ratioMatch = content.match(/(\d+)\s*%\s*client\s*\/\s*(\d+)\s*%\s*tyler/i);
    els.serviceDeliveryModel.value = isAddonWork ? "addon-work" : (isSharedServices ? "shared" : "full");
    if (els.sharedServicesBreakdown && ratioMatch) {
      els.sharedServicesBreakdown.value = normalizeSharedServicesBreakdownValue(`${ratioMatch[1]}-${ratioMatch[2]}`);
    }
  }

  applyQuoteTypeDefaults();

  const quoteNumber = extractLabeledValue(content, "Quote number");
  const quoteVersion = extractLabeledValue(content, "Quote version");
  const cityCounty = extractLabeledValue(content, "City / County") || extractLabeledValue(content, "Customer");
  const entityType = extractLabeledValue(content, "Entity type");
  const salesResource = extractLabeledValue(content, "Sales resource") || extractLabeledValue(content, "Sales rep");
  const goLive = extractLabeledValue(content, "Project length")
    || extractLabeledValue(content, "Project Length (Months)")
    || extractLabeledValue(content, "Target go-live")
    || extractLabeledValue(content, "Go-Live Target");
  const users = extractLabeledValue(content, "Users");
  const population = extractLabeledValue(content, "Population");
  const professionalServicesHours = extractLabeledValueFromAliases(content, getReviewServiceAliases("Implementation Consultant"));
  const uploadedPmHours = extractLabeledValueFromAliases(content, getReviewServiceAliases("Project Management"));
  const tylerProcesses = extractLabeledValue(content, "Tyler owned custom processes") || extractLabeledValue(content, "Tyler owned processes");
  const clientProcesses = extractLabeledValue(content, "Client owned custom processes") || extractLabeledValue(content, "Client owned processes");
  const tylerTemplatedProcesses = extractLabeledValue(content, "Tyler owned templated processes");
  const clientTemplatedProcesses = extractLabeledValue(content, "Client owned templated processes");
  const inferredNarrativeCounts = inferNarrativeProcessCounts(content);

  if (quoteNumber) els.quoteNumber.value = quoteNumber;
  if (quoteVersion) els.quoteVersion.value = quoteVersion;
  if (cityCounty) els.cityName.value = cityCounty;
  if (salesResource) els.salesRep.value = salesResource;
  if (goLive) els.goLiveTarget.value = goLive;
  if (users) els.userCount.value = parseCurrencyNumber(users) || els.userCount.value;
  if (population) els.populationValue.value = parseCurrencyNumber(population) || els.populationValue.value;
  if (tylerProcesses) {
    els.tylerOwnedProcesses.value = parseCurrencyNumber(tylerProcesses) || els.tylerOwnedProcesses.value;
  } else if (inferredNarrativeCounts.tylerCustom > 0) {
    els.tylerOwnedProcesses.value = String(inferredNarrativeCounts.tylerCustom);
  }
  if (clientProcesses) {
    els.clientOwnedProcesses.value = parseCurrencyNumber(clientProcesses) || els.clientOwnedProcesses.value;
  } else if (inferredNarrativeCounts.clientCustom > 0) {
    els.clientOwnedProcesses.value = String(inferredNarrativeCounts.clientCustom);
  } else if (getServiceDeliveryModelConfig(els.serviceDeliveryModel?.value).isShared && (Number(els.tylerOwnedProcesses.value) || 0) > 0) {
    els.clientOwnedProcesses.value = String(estimateSharedClientCount(Number(els.tylerOwnedProcesses.value) || 0));
  }
  if (els.tylerOwnedTemplatedProcesses) {
    if (tylerTemplatedProcesses) {
      els.tylerOwnedTemplatedProcesses.value = parseCurrencyNumber(tylerTemplatedProcesses) || els.tylerOwnedTemplatedProcesses.value;
    } else if (inferredNarrativeCounts.tylerTemplated > 0) {
      els.tylerOwnedTemplatedProcesses.value = String(inferredNarrativeCounts.tylerTemplated);
    }
  }
  if (els.clientOwnedTemplatedProcesses) {
    if (clientTemplatedProcesses) {
      els.clientOwnedTemplatedProcesses.value = parseCurrencyNumber(clientTemplatedProcesses) || els.clientOwnedTemplatedProcesses.value;
    } else if (inferredNarrativeCounts.clientTemplated > 0) {
      els.clientOwnedTemplatedProcesses.value = String(inferredNarrativeCounts.clientTemplated);
    } else if (getServiceDeliveryModelConfig(els.serviceDeliveryModel?.value).isShared && (Number(els.tylerOwnedTemplatedProcesses?.value) || 0) > 0) {
      els.clientOwnedTemplatedProcesses.value = String(estimateSharedClientCount(Number(els.tylerOwnedTemplatedProcesses?.value) || 0));
    }
  }
  if (professionalServicesHours && els.implementationOverrideHours) {
    els.implementationOverrideHours.value = String(parseCurrencyNumber(professionalServicesHours) || els.implementationOverrideHours.value);
  }
  if (uploadedPmHours) {
    const pmOverrideField = document.querySelector("#pmOverrideHours");
    if (pmOverrideField) {
      pmOverrideField.value = String(parseCurrencyNumber(uploadedPmHours) || pmOverrideField.value);
    }
  }
  if (/county/i.test(entityType)) {
    els.clientType.value = "county";
  } else if (/city/i.test(entityType)) {
    els.clientType.value = "city";
  }

  setNamedCheckboxesFromText("suite", CONFIG.suites, content);
  setNamedCheckboxesFromText("addon", CONFIG.addons, content);

  setCheckboxIfPresent(
    "includeImplementation",
    getReviewServiceAliases("Implementation Consultant").some((alias) => normalized.includes(normalizeReviewText(alias)))
  );
  setCheckboxIfPresent(
    "includeConversion",
    normalized.includes(normalizeReviewText("Conversion Fixed Fee"))
      || normalized.includes(normalizeReviewText("Conversion Notes"))
      || getUploadedConversionTotal(content) > 0
  );
  setCheckboxIfPresent("includeIntegration", normalized.includes(normalizeReviewText("Integration Support")) || normalized.includes(normalizeReviewText("Integration Development")));
  setCheckboxIfPresent("includeReports", normalized.includes(normalizeReviewText("Reporting Services")) || normalized.includes(normalizeReviewText("Reports:")));
  setCheckboxIfPresent("includeTraining", normalized.includes(normalizeReviewText("Configuration Training")) || normalized.includes(normalizeReviewText("End User Training")) || normalized.includes(normalizeReviewText("Train the Trainer")) || normalized.includes(normalizeReviewText("System Administrator Training")));

  if (els.configurationTrainingHours) {
    els.configurationTrainingHours.value = String(extractHoursForAliases(content, getReviewServiceAliases("Configuration Training")) || els.configurationTrainingHours.value || 0);
  }
  if (els.endUserTrainingHours && els.quoteType.value === "addon-only") {
    const eutHours = extractHoursForAliases(content, getReviewServiceAliases("End User Training"));
    if (eutHours > 0) {
      els.endUserTrainingHours.value = String(eutHours);
    }
  }
  if (els.productionSupportHours) {
    const productionHours = extractHoursForAliases(content, getReviewServiceAliases("Production Support"));
    if (productionHours > 0) {
      els.productionSupportHours.value = String(productionHours);
    }
  }
  if (els.includeTrainTheTrainer) {
    const tntHours = extractHoursForAliases(content, getReviewServiceAliases("Train the Trainer"));
    els.includeTrainTheTrainer.checked = normalized.includes(normalizeReviewText("Train the Trainer")) || tntHours > 0;
    if (tntHours > 0) {
      const tntOverrideField = document.querySelector("#trainTheTrainerOverrideHours");
      if (tntOverrideField) {
        tntOverrideField.value = String(tntHours);
      }
    }
  }
  if (els.includeSystemAdminTraining) {
    const systemAdminHours = extractHoursForAliases(content, getReviewServiceAliases("System Administrator Training"));
    els.includeSystemAdminTraining.checked = normalized.includes(normalizeReviewText("System Administrator Training")) || systemAdminHours > 0;
    if (systemAdminHours > 0 && els.systemAdminOverrideHours) {
      els.systemAdminOverrideHours.value = String(systemAdminHours);
    }
  }

  if (els.integrationSupportPrice) {
    const supportHours = extractHoursForService(content, "Integration Support");
    const supportValue = extractCurrencyForService(content, "Integration Support");
    if (supportHours > 0) {
      els.integrationSupportPrice.value = String(supportHours);
    } else if (supportValue > 0) {
      els.integrationSupportPrice.value = String(Math.round(supportValue / FIXED_FEE_HOURLY_RATE));
    }
  }
  if (els.integrationDevelopmentPrice) {
    const developmentHours = extractHoursForService(content, "Integration Development");
    const developmentValue = extractCurrencyForService(content, "Integration Development");
    if (developmentHours > 0) {
      els.integrationDevelopmentPrice.value = String(developmentHours);
    } else if (developmentValue > 0) {
      els.integrationDevelopmentPrice.value = String(Math.round(developmentValue / FIXED_FEE_HOURLY_RATE));
    }
  }

  const reportHours = extractLabeledValue(content, "Report hours");
  const customForms = extractLabeledValue(content, "Custom forms / letters");
  const customReports = extractLabeledValue(content, "Custom reports");
  if (reportHours && els.reportHours) els.reportHours.value = String(parseCurrencyNumber(reportHours) || 0);
  if (customForms && els.customFormsCount) els.customFormsCount.value = String(parseCurrencyNumber(customForms) || 0);
  if (customReports && els.customReportsCount) els.customReportsCount.value = String(parseCurrencyNumber(customReports) || 0);

  const conversionType = extractLabeledValue(content, "Conversion type");
  if (/full/i.test(conversionType)) {
    els.conversionScopeType.value = "full";
  } else if (/dct/i.test(conversionType)) {
    els.conversionScopeType.value = "dct";
  }

  CONFIG.conversionModules.forEach((module) => {
    const match = content.match(new RegExp(`${module.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*:\\s*([0-9]+)\\s*source`, "i"));
    if (match) {
      const count = String(Number(match[1]) || 0);
      if (module.id === "community-development") els.sourcesCommunityDevelopment.value = count;
      if (module.id === "business-management") els.sourcesBusinessManagement.value = count;
      if (module.id === "environmental-health") els.sourcesEnvironmentalHealth.value = count;
    }
  });

  const conversionLineTotal = getUploadedConversionTotal(content);
  if (conversionLineTotal > 0) {
    const conversionOverrideField = document.querySelector("#conversionOverridePrice");
    if (conversionOverrideField) {
      conversionOverrideField.value = String(conversionLineTotal);
    }
    setCheckboxIfPresent("includeConversion", true);
  } else {
    const conversionHours = extractHoursForAliases(content, ["Data Conversion Services", "Conversion Fixed Fee", "Conversion"]);
    if (conversionHours > 0) {
      const conversionOverrideField = document.querySelector("#conversionOverridePrice");
      if (conversionOverrideField) {
        conversionOverrideField.value = String(conversionHours * getAdminSettings().hourlyRate);
      }
      setCheckboxIfPresent("includeConversion", true);
    }
  }

  const notesMatch = content.match(/investment summary notes[:\s]+([\s\S]*)/i);
  if (notesMatch && els.internalNotes) {
    els.internalNotes.value = notesMatch[1].trim();
  }
}

function getExpectedQuoteReviewItems() {
  const totals = calculateServiceTotals();
  const serviceRows = getServiceSummaryRows();
  const noteLines = (els.quoteNotes?.value || "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("-"));

  const expectedItems = [
    { label: "Quote title", value: els.quoteTitle?.textContent?.trim() || "" },
    { label: "Total service value", value: currency.format(totals.totalValue) },
    { label: "IC hours", value: `${formatHours(totals.icHours)}` },
    { label: "PM hours", value: `${formatHours(totals.pmHours)}` }
  ];

  serviceRows.forEach((row) => {
    expectedItems.push({ label: `Service line: ${row.service}`, value: row.service });
    expectedItems.push({ label: `Service value: ${row.service}`, value: currency.format(row.value) });
  });

  noteLines.forEach((line) => {
    expectedItems.push({ label: `Note line`, value: line });
  });

  return expectedItems.filter((item) => item.value);
}

function getClosestServiceCombination(targetDelta, mode) {
  const rows = getServiceSummaryRows()
    .filter((row) => row.value > 0 && row.service !== "Project Management" && row.service !== "Estimated Travel");

  const sortedRows = [...rows].sort((a, b) => {
    if (mode === "reduce") {
      return b.value - a.value;
    }
    return a.value - b.value;
  });

  const chosen = [];
  let running = 0;

  for (const row of sortedRows) {
    if (running >= targetDelta) {
      break;
    }
    chosen.push(row);
    running += row.value;
  }

  return {
    chosen,
    total: running
  };
}

function withTemporaryFormState(work) {
  const snapshot = getFormState();
  const previousLoadedQuoteId = state.loadedQuoteId;
  const previousStatus = els.saveStatus?.textContent || "";
  try {
    return work();
  } finally {
    state.loadedQuoteId = previousLoadedQuoteId;
    applyFormState(snapshot);
    if (els.saveStatus) {
      els.saveStatus.textContent = previousStatus;
    }
  }
}

function getTargetPlanningLevers(mode = "add") {
  const hourStep = els.quoteType?.value === "addon-only" ? 2 : 4;
  const implementationOverrideInput = document.querySelector("#implementationOverrideHours");
  const pmOverrideInput = document.querySelector("#pmOverrideHours");
  const conversionOverrideInput = document.querySelector("#conversionOverridePrice");
  const reportingOverrideInput = document.querySelector("#reportingOverridePrice");
  const integrationOverrideInput = document.querySelector("#integrationOverridePrice");
  const hasDetailedDrivers =
    (Number(els.tylerOwnedProcesses?.value) || 0) > 0
    || (Number(els.clientOwnedProcesses?.value) || 0) > 0
    || (Number(els.tylerOwnedTemplatedProcesses?.value) || 0) > 0
    || (Number(els.clientOwnedTemplatedProcesses?.value) || 0) > 0
    || (Number(els.customFormsCount?.value) || 0) > 0
    || (Number(els.customReportsCount?.value) || 0) > 0
    || (Number(els.reportHours?.value) || 0) > 0
    || (Number(els.integrationSupportPrice?.value) || 0) > 0
    || (Number(els.integrationDevelopmentPrice?.value) || 0) > 0
    || (Number(els.configurationTrainingHours?.value) || 0) > 0
    || (Number(els.productionSupportHours?.value) || 0) > 0;
  const currentConfigurationTrainingHours = Number(els.configurationTrainingHours?.value) || 0;
  const configurationTrainingMin = currentConfigurationTrainingHours > 0 ? 40 : 0;
  const protectedReductionKeys = new Set([
    "customFormsCount",
    "customReportsCount",
    "reportHours",
    "reportingOverridePrice",
    "integrationSupportPrice",
    "integrationDevelopmentPrice",
    "integrationOverridePrice",
    "configurationTrainingHours",
    "conversionOverridePrice"
  ]);
  const protectedAllTargetModes = new Set([
    "customFormsCount",
    "customReportsCount",
    "reportHours",
    "reportingOverridePrice",
    "integrationSupportPrice",
    "integrationDevelopmentPrice",
    "integrationOverridePrice",
    "conversionOverridePrice"
  ]);

  const levers = [
    { key: "tylerOwnedProcesses", label: "Tyler Owned Custom Processes", type: "number", step: 1, min: 0, element: els.tylerOwnedProcesses },
    { key: "clientOwnedProcesses", label: "Client Owned Custom Processes", type: "number", step: 1, min: 0, element: els.clientOwnedProcesses },
    { key: "tylerOwnedTemplatedProcesses", label: "Tyler Owned Templated Processes", type: "number", step: 1, min: 0, element: els.tylerOwnedTemplatedProcesses },
    { key: "clientOwnedTemplatedProcesses", label: "Client Owned Templated Processes", type: "number", step: 1, min: 0, element: els.clientOwnedTemplatedProcesses },
    { key: "customFormsCount", label: "Custom Forms / Documents", type: "number", step: 1, min: 0, element: els.customFormsCount },
    { key: "customReportsCount", label: "Custom Reports", type: "number", step: 1, min: 0, element: els.customReportsCount },
    { key: "reportHours", label: "Report Hours", type: "number", step: 1, min: 0, element: els.reportHours },
    { key: "integrationSupportPrice", label: "Integration Support Hours", type: "number", step: hourStep, min: 0, element: els.integrationSupportPrice },
    { key: "integrationDevelopmentPrice", label: "Integration Development Hours", type: "number", step: hourStep, min: 0, element: els.integrationDevelopmentPrice },
    { key: "configurationTrainingHours", label: "Configuration Training Hours", type: "number", step: hourStep, min: configurationTrainingMin, element: els.configurationTrainingHours },
    { key: "productionSupportHours", label: "Production Support Hours", type: "number", step: hourStep, min: 0, element: els.productionSupportHours },
    { key: "endUserTrainingHours", label: "End User Training Hours", type: "number", step: hourStep, min: 0, element: els.endUserTrainingHours, addonOnly: true },
    { key: "includeSystemAdminTraining", label: "System Administrator Training", type: "boolean", element: els.includeSystemAdminTraining },
    { key: "includeTrainTheTrainer", label: "Train the Trainer", type: "boolean", element: els.includeTrainTheTrainer }
  ];

  if (!hasDetailedDrivers) {
    levers.push(
      { key: "implementationOverrideHours", label: "Implementation Override Hours", type: "number", step: hourStep, min: 0, element: implementationOverrideInput },
      { key: "pmOverrideHours", label: "PM Override Hours", type: "number", step: hourStep, min: 0, element: pmOverrideInput },
      { key: "conversionOverridePrice", label: "Conversion Override Price", type: "number", step: 250, min: 0, element: conversionOverrideInput },
      { key: "reportingOverridePrice", label: "Reporting Override Price", type: "number", step: 250, min: 0, element: reportingOverrideInput },
      { key: "integrationOverridePrice", label: "Integration Override Price", type: "number", step: 250, min: 0, element: integrationOverrideInput }
    );
  }

  return levers.filter((lever) => (
    lever.element
    && (!lever.addonOnly || els.quoteType?.value === "addon-only")
    && !protectedAllTargetModes.has(lever.key)
    && !(mode === "reduce" && protectedReductionKeys.has(lever.key))
  ));
}

function setLeverValue(lever, nextValue) {
  if (!lever.element) {
    return;
  }
  if (lever.type === "boolean") {
    lever.element.checked = Boolean(nextValue);
  } else {
    lever.element.value = String(Math.max(lever.min ?? 0, Number(nextValue) || 0));
  }
  calculate();
}

function getLeverValue(lever) {
  if (!lever.element) {
    return 0;
  }
  return lever.type === "boolean" ? Boolean(lever.element.checked) : (Number(lever.element.value) || 0);
}

function computeLeverImpact(lever, mode) {
  const currentValue = getLeverValue(lever);
  const currentTotal = calculateServiceTotals().totalValue;

  if (lever.type === "boolean") {
    const nextValue = mode === "reduce" ? false : true;
    if (currentValue === nextValue) {
      return null;
    }
    setLeverValue(lever, nextValue);
    const nextTotal = calculateServiceTotals().totalValue;
    setLeverValue(lever, currentValue);
    const impact = Math.abs(nextTotal - currentTotal);
    return impact > 0 ? { lever, currentValue, nextValue, impact } : null;
  }

  if (mode === "reduce" && currentValue <= (lever.min ?? 0)) {
    return null;
  }

  if (
    mode === "reduce"
    && (lever.key === "tylerOwnedProcesses" || lever.key === "tylerOwnedTemplatedProcesses")
  ) {
    const currentTylerUnique = Number(els.tylerOwnedProcesses?.value) || 0;
    const currentTylerTemplated = Number(els.tylerOwnedTemplatedProcesses?.value) || 0;
    const currentTylerTotal = currentTylerUnique + currentTylerTemplated;
    if (currentTylerTotal <= 5) {
      return null;
    }
    if (lever.key === "tylerOwnedProcesses" && currentTylerUnique <= 3) {
      return null;
    }
  }

  const nextValue = mode === "reduce"
    ? Math.max(lever.min ?? 0, currentValue - lever.step)
    : currentValue + lever.step;

  if (nextValue === currentValue) {
    return null;
  }

  setLeverValue(lever, nextValue);
  const nextTotal = calculateServiceTotals().totalValue;
  setLeverValue(lever, currentValue);
  const impact = Math.abs(nextTotal - currentTotal);
  return impact > 0 ? { lever, currentValue, nextValue, impact } : null;
}

function getScenarioInputSummary() {
  const trainingPlan = getTrainingPlan();
  const processCounts = getEffectiveProcessCounts();
  const deliveryModelLabel = processCounts.deliveryModel.label;
  const lines = [
    `Service Delivery Model: ${deliveryModelLabel}`,
    `Tyler Owned Custom Processes: ${processCounts.tylerCustom}`,
    `Client Owned Custom Processes: ${processCounts.clientCustom}`,
    `Tyler Owned Templated Processes: ${processCounts.tylerTemplated}`,
    `Client Owned Templated Processes: ${processCounts.clientTemplated}`
  ];

  if (document.querySelector("#includeReports")?.checked) {
    lines.push(`Custom Forms / Documents: ${Number(els.customFormsCount?.value) || 0}`);
    lines.push(`Custom Reports: ${Number(els.customReportsCount?.value) || 0}`);
    lines.push(`Report Hours: ${Number(els.reportHours?.value) || 0}`);
  }
  if (document.querySelector("#includeIntegration")?.checked) {
    lines.push(`Integration Support Hours: ${Number(els.integrationSupportPrice?.value) || 0}`);
    lines.push(`Integration Development Hours: ${Number(els.integrationDevelopmentPrice?.value) || 0}`);
  }
  if (trainingPlan.trainingIncluded) {
    lines.push(`Configuration Training Hours: ${Number(els.configurationTrainingHours?.value) || 0}`);
    lines.push(`Production Support Hours: ${Number(els.productionSupportHours?.value) || 0}`);
    if (els.quoteType?.value === "addon-only") {
      lines.push(`End User Training Hours: ${Number(els.endUserTrainingHours?.value) || 0}`);
    } else {
      lines.push(`End User Training Hours: ${trainingPlan.endUserTrainingHours}`);
    }
    if (els.includeSystemAdminTraining?.checked) {
      lines.push("System Administrator Training: Included");
    }
    if (els.includeTrainTheTrainer?.checked) {
      lines.push("Train the Trainer: Included");
    }
  }
  const settings = getAdminSettings();
  if (settings.hasImplementationOverrideHours) {
    lines.push(`Implementation Override Hours: ${settings.implementationOverrideHours}`);
  }
  if (settings.hasPmOverrideHours) {
    lines.push(`PM Override Hours: ${settings.pmOverrideHours}`);
  }
  if (settings.hasConversionOverridePrice) {
    lines.push(`Conversion Override Price: ${currency.format(settings.conversionOverridePrice)}`);
  }
  if (settings.hasReportingOverridePrice) {
    lines.push(`Reporting Override Price: ${currency.format(settings.reportingOverridePrice)}`);
  }
  if (settings.hasIntegrationOverridePrice) {
    lines.push(`Integration Override Price: ${currency.format(settings.integrationOverridePrice)}`);
  }
  return lines;
}

function buildTargetScenario(mode, neededAmount, startingTotal) {
  const changes = [];
  let remaining = neededAmount;
  let guard = 0;
  let stalledIterations = 0;
  let lastTotal = calculateServiceTotals().totalValue;

  while (remaining > 0 && guard < 300) {
    guard += 1;
    const options = getTargetPlanningLevers(mode)
      .map((lever) => computeLeverImpact(lever, mode))
      .filter(Boolean);

    if (!options.length) {
      break;
    }

    const withinRemaining = options.filter((option) => option.impact <= remaining + 1);
    const selected = withinRemaining.length
      ? withinRemaining.sort((a, b) => b.impact - a.impact)[0]
      : options.sort((a, b) => a.impact - b.impact)[0];

    setLeverValue(selected.lever, selected.nextValue);
    const currentTotal = calculateServiceTotals().totalValue;
    remaining = Math.max(0, neededAmount - Math.abs(currentTotal - startingTotal));
    changes.push(selected);

    if (Math.abs(currentTotal - lastTotal) < 1) {
      stalledIterations += 1;
    } else {
      stalledIterations = 0;
      lastTotal = currentTotal;
    }

    if (stalledIterations >= 3) {
      break;
    }
  }

  const finalTotals = calculateServiceTotals();
  return {
    changes,
    remaining,
    finalTotals,
    inputSummary: getScenarioInputSummary()
  };
}

function getProcessReductionPlan(requiredIcHours, settings) {
  const available = [
    {
      label: "Tyler Owned Custom Processes",
      count: Number(els.tylerOwnedProcesses?.value) || 0,
      hoursPer: settings.tylerProcessHours
    },
    {
      label: "Tyler Owned Templated Processes",
      count: Number(els.tylerOwnedTemplatedProcesses?.value) || 0,
      hoursPer: TYLER_TEMPLATED_PROCESS_HOURS
    },
    {
      label: "Client Owned Custom Processes",
      count: Number(els.clientOwnedProcesses?.value) || 0,
      hoursPer: settings.clientProcessHours
    },
    {
      label: "Client Owned Templated Processes",
      count: Number(els.clientOwnedTemplatedProcesses?.value) || 0,
      hoursPer: CLIENT_TEMPLATED_PROCESS_HOURS
    }
  ].filter((item) => item.count > 0);

  const plan = [];
  let remaining = requiredIcHours;

  available.forEach((item) => {
    if (remaining <= 0) {
      return;
    }
    const maxReducible = Math.min(item.count, Math.ceil(remaining / item.hoursPer));
    if (maxReducible > 0) {
      const reducedHours = maxReducible * item.hoursPer;
      plan.push({
        label: item.label,
        count: maxReducible,
        hours: reducedHours
      });
      remaining = Math.max(0, remaining - reducedHours);
    }
  });

  return {
    plan,
    remaining
  };
}

function getRequiredHourReductions(targetDelta, settings, isAddonOnly) {
  const pmPercent = getEffectivePmPercentage(settings, isAddonOnly);
  const rawIcHours = targetDelta / (settings.hourlyRate * (1 + pmPercent));
  const icHours = Math.max(roundQuotedHours(rawIcHours, isAddonOnly), isAddonOnly ? 2 : 4);
  const pmHours = calculatePmHoursFromIc(icHours, settings, isAddonOnly);
  const totalReductionValue = (icHours * settings.hourlyRate) + (pmHours * settings.hourlyRate);
  return {
    icHours,
    pmHours,
    totalReductionValue
  };
}

function getCurrentProcessCounts() {
  return {
    tylerCustom: Number(els.tylerOwnedProcesses?.value) || 0,
    clientCustom: Number(els.clientOwnedProcesses?.value) || 0,
    tylerTemplated: Number(els.tylerOwnedTemplatedProcesses?.value) || 0,
    clientTemplated: Number(els.clientOwnedTemplatedProcesses?.value) || 0
  };
}

function setSalesQuoteDisplayText(element, value) {
  if (element) {
    element.textContent = value;
  }
}

function getServiceRowByName(rows, serviceName) {
  return rows.find((row) => row.service === serviceName) || null;
}

function syncSalesQuoteEntryToForm() {
  if (els.salesQuoteServiceDeliveryModel && els.serviceDeliveryModel) {
    els.serviceDeliveryModel.value = normalizeServiceDeliveryModelValue(
      els.salesQuoteServiceDeliveryModel.value || els.serviceDeliveryModel.value
    );
  }
  if (els.salesQuoteSharedServicesBreakdown && els.sharedServicesBreakdown) {
    els.sharedServicesBreakdown.value = normalizeSharedServicesBreakdownValue(
      els.salesQuoteSharedServicesBreakdown.value || els.sharedServicesBreakdown.value
    );
  }

  syncQuoteTypeFromDeliveryModel();
  syncSharedProcessInputs();
  syncSalesQuoteProcessInputs();

  const implementationHours = Number(els.salesQuoteImplementationHours?.value) || 0;
  const typedProcessCounts = {
    tylerCustom: Number(els.salesQuoteTylerOwnedProcesses?.value) || 0,
    clientCustom: Number(els.salesQuoteClientOwnedProcesses?.value) || 0,
    tylerTemplated: Number(els.salesQuoteTylerOwnedTemplatedProcesses?.value) || 0,
    clientTemplated: Number(els.salesQuoteClientOwnedTemplatedProcesses?.value) || 0
  };
  const hasManualProcessCounts = Object.values(typedProcessCounts).some((count) => count > 0);
  const derivedProcessCounts = hasManualProcessCounts
    ? typedProcessCounts
    : estimateProcessCountsFromImplementationHours(
      implementationHours,
      els.salesQuoteServiceDeliveryModel?.value || els.serviceDeliveryModel?.value,
      els.salesQuoteSharedServicesBreakdown?.value || els.sharedServicesBreakdown?.value
    );

  if (els.salesQuoteTylerOwnedProcesses) {
    els.tylerOwnedProcesses.value = String(derivedProcessCounts.tylerCustom || 0);
  }
  if (els.salesQuoteClientOwnedProcesses) {
    els.clientOwnedProcesses.value = String(derivedProcessCounts.clientCustom || 0);
  }
  if (els.salesQuoteTylerOwnedTemplatedProcesses) {
    els.tylerOwnedTemplatedProcesses.value = String(derivedProcessCounts.tylerTemplated || 0);
  }
  if (els.salesQuoteClientOwnedTemplatedProcesses) {
    els.clientOwnedTemplatedProcesses.value = String(derivedProcessCounts.clientTemplated || 0);
  }

  if (els.salesQuoteImplementationHours) {
    const implementationOverrideInput = document.querySelector("#implementationOverrideHours");
    if (implementationOverrideInput) {
      implementationOverrideInput.value = String(Number(els.salesQuoteImplementationHours.value) || 0);
    }
  }

  const includeImplementation = document.querySelector("#includeImplementation");
  if (includeImplementation) {
    includeImplementation.checked =
      implementationHours > 0
      || derivedProcessCounts.tylerCustom > 0
      || derivedProcessCounts.clientCustom > 0
      || derivedProcessCounts.tylerTemplated > 0
      || derivedProcessCounts.clientTemplated > 0;
  }

  if (els.salesQuoteCommunitySources) {
    els.sourcesCommunityDevelopment.value = String(Number(els.salesQuoteCommunitySources.value) || 0);
  }
  if (els.salesQuoteBusinessSources) {
    els.sourcesBusinessManagement.value = String(Number(els.salesQuoteBusinessSources.value) || 0);
  }
  if (els.salesQuoteEnvironmentalSources) {
    els.sourcesEnvironmentalHealth.value = String(Number(els.salesQuoteEnvironmentalSources.value) || 0);
  }
  if (
    (Number(els.salesQuoteCommunitySources?.value) || 0) > 0 ||
    (Number(els.salesQuoteBusinessSources?.value) || 0) > 0 ||
    (Number(els.salesQuoteEnvironmentalSources?.value) || 0) > 0
  ) {
    const includeConversion = document.querySelector("#includeConversion");
    if (includeConversion) includeConversion.checked = true;
  }

  if (els.salesQuoteCustomFormsCount) {
    els.customFormsCount.value = String(Number(els.salesQuoteCustomFormsCount.value) || 0);
  }
  if (els.salesQuoteCustomReportsCount) {
    els.customReportsCount.value = String(Number(els.salesQuoteCustomReportsCount.value) || 0);
  }
  if (els.salesQuoteReportHours) {
    els.reportHours.value = String(Number(els.salesQuoteReportHours.value) || 0);
  }
  if (
    (Number(els.salesQuoteCustomFormsCount?.value) || 0) > 0 ||
    (Number(els.salesQuoteCustomReportsCount?.value) || 0) > 0 ||
    (Number(els.salesQuoteReportHours?.value) || 0) > 0
  ) {
    const includeReports = document.querySelector("#includeReports");
    if (includeReports) includeReports.checked = true;
  }

  if (els.salesQuoteIntegrationSupportHours) {
    els.integrationSupportPrice.value = String(Number(els.salesQuoteIntegrationSupportHours.value) || 0);
  }
  if (els.salesQuoteIntegrationDevelopmentHours) {
    els.integrationDevelopmentPrice.value = String(Number(els.salesQuoteIntegrationDevelopmentHours.value) || 0);
  }
  if (
    (Number(els.salesQuoteIntegrationSupportHours?.value) || 0) > 0 ||
    (Number(els.salesQuoteIntegrationDevelopmentHours?.value) || 0) > 0
  ) {
    const includeIntegration = document.querySelector("#includeIntegration");
    if (includeIntegration) includeIntegration.checked = true;
  }

  if (els.salesQuoteConfigurationTrainingHours) {
    els.configurationTrainingHours.value = String(Number(els.salesQuoteConfigurationTrainingHours.value) || 0);
  }
  if (els.salesQuoteProductionSupportHours) {
    els.productionSupportHours.value = String(Number(els.salesQuoteProductionSupportHours.value) || 0);
  }
  const eutOverrideInput = document.querySelector("#eutOverrideHours");
  if (els.salesQuoteEndUserTrainingHours && eutOverrideInput) {
    eutOverrideInput.value = String(Number(els.salesQuoteEndUserTrainingHours.value) || 0);
  }
  const systemAdminOverrideInput = document.querySelector("#systemAdminOverrideHours");
  if (els.salesQuoteSystemAdminHours && systemAdminOverrideInput) {
    const value = Number(els.salesQuoteSystemAdminHours.value) || 0;
    systemAdminOverrideInput.value = String(value);
    if (els.includeSystemAdminTraining) {
      els.includeSystemAdminTraining.checked = value > 0;
    }
  }
  const trainTheTrainerOverrideInput = document.querySelector("#trainTheTrainerOverrideHours");
  if (els.salesQuoteTrainTheTrainerHours && trainTheTrainerOverrideInput) {
    const value = Number(els.salesQuoteTrainTheTrainerHours.value) || 0;
    trainTheTrainerOverrideInput.value = String(value);
    if (els.includeTrainTheTrainer) {
      els.includeTrainTheTrainer.checked = value > 0;
    }
  }
  if (
    (Number(els.salesQuoteConfigurationTrainingHours?.value) || 0) > 0 ||
    (Number(els.salesQuoteProductionSupportHours?.value) || 0) > 0 ||
    (Number(els.salesQuoteEndUserTrainingHours?.value) || 0) > 0 ||
    (Number(els.salesQuoteSystemAdminHours?.value) || 0) > 0 ||
    (Number(els.salesQuoteTrainTheTrainerHours?.value) || 0) > 0
  ) {
    const includeTraining = document.querySelector("#includeTraining");
    if (includeTraining) includeTraining.checked = true;
  }

  const pmOverrideInput = document.querySelector("#pmOverrideHours");
  if (els.salesQuotePmHours && pmOverrideInput) {
    pmOverrideInput.value = String(Number(els.salesQuotePmHours.value) || 0);
  }
}

function renderSalesQuoteEntry(totals) {
  const rows = getServiceSummaryRows();
  const settings = getAdminSettings();
  const implementationOverride = settings.hasImplementationOverrideHours ? String(settings.implementationOverrideHours) : "";
  const pmOverride = settings.hasPmOverrideHours ? String(settings.pmOverrideHours) : "";
  const systemAdminOverride = settings.hasSystemAdminOverrideHours ? String(settings.systemAdminOverrideHours) : "";
  const trainTheTrainerOverride = settings.hasTrainTheTrainerOverrideHours ? String(settings.trainTheTrainerOverrideHours) : "";
  const eutOverride = settings.hasEutOverrideHours ? String(settings.eutOverrideHours) : "";

  if (els.salesQuoteServiceDeliveryModel && document.activeElement !== els.salesQuoteServiceDeliveryModel) {
    els.salesQuoteServiceDeliveryModel.value = normalizeServiceDeliveryModelValue(
      els.serviceDeliveryModel?.value || "shared"
    );
  }
  if (els.salesQuoteSharedServicesBreakdown && document.activeElement !== els.salesQuoteSharedServicesBreakdown) {
    els.salesQuoteSharedServicesBreakdown.value = normalizeSharedServicesBreakdownValue(
      els.sharedServicesBreakdown?.value || "70-30"
    );
  }
  syncSalesQuoteProcessInputs();

  const processMappings = [
    ["salesQuoteTylerOwnedProcesses", "tylerOwnedProcesses"],
    ["salesQuoteClientOwnedProcesses", "clientOwnedProcesses"],
    ["salesQuoteTylerOwnedTemplatedProcesses", "tylerOwnedTemplatedProcesses"],
    ["salesQuoteClientOwnedTemplatedProcesses", "clientOwnedTemplatedProcesses"]
  ];
  processMappings.forEach(([salesField, sourceField]) => {
    if (els[salesField] && els[sourceField] && document.activeElement !== els[salesField]) {
      els[salesField].value = String(Number(els[sourceField].value) || 0);
    }
  });

  if (els.salesQuoteImplementationHours) {
    els.salesQuoteImplementationHours.placeholder = formatHours(totals.implementationConsultantHours);
    if (document.activeElement !== els.salesQuoteImplementationHours) {
      els.salesQuoteImplementationHours.value = implementationOverride;
    }
  }
  if (els.salesQuotePmHours) {
    els.salesQuotePmHours.placeholder = formatHours(totals.pmHours);
    if (document.activeElement !== els.salesQuotePmHours) {
      els.salesQuotePmHours.value = pmOverride;
    }
  }
  if (els.salesQuoteEndUserTrainingHours) {
    els.salesQuoteEndUserTrainingHours.placeholder = formatHours(totals.endUserTrainingHours);
    if (document.activeElement !== els.salesQuoteEndUserTrainingHours) {
      els.salesQuoteEndUserTrainingHours.value = eutOverride;
    }
  }
  if (els.salesQuoteSystemAdminHours) {
    els.salesQuoteSystemAdminHours.placeholder = formatHours(totals.systemAdminTrainingHours);
    if (document.activeElement !== els.salesQuoteSystemAdminHours) {
      els.salesQuoteSystemAdminHours.value = systemAdminOverride;
    }
  }
  if (els.salesQuoteTrainTheTrainerHours) {
    els.salesQuoteTrainTheTrainerHours.placeholder = formatHours(totals.trainTheTrainerHours);
    if (document.activeElement !== els.salesQuoteTrainTheTrainerHours) {
      els.salesQuoteTrainTheTrainerHours.value = trainTheTrainerOverride;
    }
  }

  const directFieldMappings = [
    ["salesQuoteCommunitySources", "sourcesCommunityDevelopment"],
    ["salesQuoteBusinessSources", "sourcesBusinessManagement"],
    ["salesQuoteEnvironmentalSources", "sourcesEnvironmentalHealth"],
    ["salesQuoteCustomFormsCount", "customFormsCount"],
    ["salesQuoteCustomReportsCount", "customReportsCount"],
    ["salesQuoteReportHours", "reportHours"],
    ["salesQuoteIntegrationSupportHours", "integrationSupportPrice"],
    ["salesQuoteIntegrationDevelopmentHours", "integrationDevelopmentPrice"],
    ["salesQuoteConfigurationTrainingHours", "configurationTrainingHours"],
    ["salesQuoteProductionSupportHours", "productionSupportHours"]
  ];
  directFieldMappings.forEach(([salesField, sourceField]) => {
    if (els[salesField] && els[sourceField] && document.activeElement !== els[salesField]) {
      els[salesField].value = String(Number(els[sourceField].value) || 0);
    }
  });

  const implementationRow = getServiceRowByName(rows, "Implementation Consultant");
  const communityRow = getServiceRowByName(rows, "Conversion Fixed Fee - Community Development");
  const businessRow = getServiceRowByName(rows, "Conversion Fixed Fee - Business Management");
  const environmentalRow = getServiceRowByName(rows, "Conversion Fixed Fee - Environmental Health");
  const customFormsRow = getServiceRowByName(rows, "Custom Forms / Documents");
  const customReportsRow = getServiceRowByName(rows, "Custom Reports");
  const reportingHoursRow = getServiceRowByName(rows, "Reporting Services");
  const integrationSupportRow = getServiceRowByName(rows, "Integration Support");
  const integrationDevelopmentRow = getServiceRowByName(rows, "Integration Development");
  const configurationTrainingRow = getServiceRowByName(rows, "Configuration Training");
  const systemAdminRow = getServiceRowByName(rows, "System Administrator Training");
  const trainTheTrainerRow = getServiceRowByName(rows, "Train the Trainer");
  const endUserTrainingRow = getServiceRowByName(rows, "End User Training");
  const productionSupportRow = getServiceRowByName(rows, "Production Support");
  const pmRow = getServiceRowByName(rows, "Project Management");
  const travelRow = getServiceRowByName(rows, "Estimated Travel");

  setSalesQuoteDisplayText(els.salesQuoteImplementationRate, implementationRow?.rateBasis || `$${settings.hourlyRate}/hour`);
  setSalesQuoteDisplayText(els.salesQuoteImplementationValue, currency.format(implementationRow?.value || 0));
  setSalesQuoteDisplayText(els.salesQuoteCommunityRate, communityRow?.rateBasis || `${Number(els.sourcesCommunityDevelopment?.value) || 0} Community Development source${(Number(els.sourcesCommunityDevelopment?.value) || 0) === 1 ? "" : "s"}`);
  setSalesQuoteDisplayText(els.salesQuoteCommunityValue, currency.format(communityRow?.value || 0));
  setSalesQuoteDisplayText(els.salesQuoteBusinessRate, businessRow?.rateBasis || `${Number(els.sourcesBusinessManagement?.value) || 0} Business Management source${(Number(els.sourcesBusinessManagement?.value) || 0) === 1 ? "" : "s"}`);
  setSalesQuoteDisplayText(els.salesQuoteBusinessValue, currency.format(businessRow?.value || 0));
  setSalesQuoteDisplayText(els.salesQuoteEnvironmentalRate, environmentalRow?.rateBasis || `${Number(els.sourcesEnvironmentalHealth?.value) || 0} Environmental Health source${(Number(els.sourcesEnvironmentalHealth?.value) || 0) === 1 ? "" : "s"}`);
  setSalesQuoteDisplayText(els.salesQuoteEnvironmentalValue, currency.format(environmentalRow?.value || 0));
  setSalesQuoteDisplayText(els.salesQuoteCustomFormsRate, customFormsRow?.rateBasis || `0 x ${currency.format(settings.customFormPrice)}`);
  setSalesQuoteDisplayText(els.salesQuoteCustomFormsValue, currency.format(customFormsRow?.value || 0));
  setSalesQuoteDisplayText(els.salesQuoteCustomReportsRate, customReportsRow?.rateBasis || `0 x ${currency.format(settings.customReportPrice)}`);
  setSalesQuoteDisplayText(els.salesQuoteCustomReportsValue, currency.format(customReportsRow?.value || 0));
  setSalesQuoteDisplayText(els.salesQuoteReportHoursRate, reportingHoursRow?.rateBasis || `$${FIXED_FEE_HOURLY_RATE}/hour`);
  setSalesQuoteDisplayText(els.salesQuoteReportHoursValue, currency.format(reportingHoursRow?.value || 0));
  setSalesQuoteDisplayText(els.salesQuoteIntegrationSupportRate, integrationSupportRow?.rateBasis || `$${FIXED_FEE_HOURLY_RATE}/hour`);
  setSalesQuoteDisplayText(els.salesQuoteIntegrationSupportValue, currency.format(integrationSupportRow?.value || 0));
  setSalesQuoteDisplayText(els.salesQuoteIntegrationDevelopmentRate, integrationDevelopmentRow?.rateBasis || `$${FIXED_FEE_HOURLY_RATE}/hour`);
  setSalesQuoteDisplayText(els.salesQuoteIntegrationDevelopmentValue, currency.format(integrationDevelopmentRow?.value || 0));
  setSalesQuoteDisplayText(els.salesQuoteConfigurationTrainingRate, configurationTrainingRow?.rateBasis || `$${settings.hourlyRate}/hour`);
  setSalesQuoteDisplayText(els.salesQuoteConfigurationTrainingValue, currency.format(configurationTrainingRow?.value || 0));
  setSalesQuoteDisplayText(els.salesQuoteSystemAdminRate, systemAdminRow?.rateBasis || `$${settings.hourlyRate}/hour`);
  setSalesQuoteDisplayText(els.salesQuoteSystemAdminValue, currency.format(systemAdminRow?.value || 0));
  setSalesQuoteDisplayText(els.salesQuoteTrainTheTrainerRate, trainTheTrainerRow?.rateBasis || `$${settings.hourlyRate}/hour`);
  setSalesQuoteDisplayText(els.salesQuoteTrainTheTrainerValue, currency.format(trainTheTrainerRow?.value || 0));
  setSalesQuoteDisplayText(els.salesQuoteEndUserTrainingRate, endUserTrainingRow?.rateBasis || `$${settings.hourlyRate}/hour`);
  setSalesQuoteDisplayText(els.salesQuoteEndUserTrainingValue, currency.format(endUserTrainingRow?.value || 0));
  setSalesQuoteDisplayText(els.salesQuoteProductionSupportRate, productionSupportRow?.rateBasis || `$${settings.hourlyRate}/hour`);
  setSalesQuoteDisplayText(els.salesQuoteProductionSupportValue, currency.format(productionSupportRow?.value || 0));
  setSalesQuoteDisplayText(els.salesQuotePmRate, pmRow?.rateBasis || `$${settings.hourlyRate}/hour`);
  setSalesQuoteDisplayText(els.salesQuotePmValue, currency.format(pmRow?.value || 0));
  setSalesQuoteDisplayText(els.salesQuoteTravelHours, travelRow?.hours ? formatHours(travelRow.hours) : "-");
  setSalesQuoteDisplayText(els.salesQuoteTravelRate, travelRow?.rateBasis || "0 trip(s) x $2,400");
  setSalesQuoteDisplayText(els.salesQuoteTravelValue, currency.format(travelRow?.value || 0));
  setSalesQuoteDisplayText(els.salesQuoteTotalServicesValue, currency.format(totals.totalValue));
  setSalesQuoteDisplayText(els.salesQuoteSummaryTotal, currency.format(totals.totalValue + totals.travelEstimate));
}

function applySalesQuoteEntry() {
  syncSalesQuoteEntryToForm();
  calculate();
  if (els.saveStatus) {
    els.saveStatus.classList.remove("error");
    els.saveStatus.textContent = "Sales Quote Entry applied. Pricing and notes have been updated.";
  }
}

window.applySalesQuoteEntryNow = applySalesQuoteEntry;

function buildAdjustmentGuidance() {
  return withTemporaryFormState(() => {
    state.lastTargetScenario = null;
    const uploadedText = els.reviewedQuoteText?.value.trim() || "";
    let missingServices = [];
    if (uploadedText) {
      populateFormFromUploadedQuote(uploadedText);
      const hasDetailedDrivers =
        (Number(els.tylerOwnedProcesses?.value) || 0) > 0
        || (Number(els.clientOwnedProcesses?.value) || 0) > 0
        || (Number(els.tylerOwnedTemplatedProcesses?.value) || 0) > 0
        || (Number(els.clientOwnedTemplatedProcesses?.value) || 0) > 0
        || (Number(els.integrationSupportPrice?.value) || 0) > 0
        || (Number(els.integrationDevelopmentPrice?.value) || 0) > 0
        || (Number(els.customFormsCount?.value) || 0) > 0
        || (Number(els.customReportsCount?.value) || 0) > 0
        || (Number(els.reportHours?.value) || 0) > 0
        || (Number(els.configurationTrainingHours?.value) || 0) > 0
        || (Number(els.productionSupportHours?.value) || 0) > 0;
      if (hasDetailedDrivers) {
        clearImportedHoursOverridesOnly();
      }
    }
    calculate();

    const baselineTotals = calculateServiceTotals();
    if (uploadedText) {
      const reconstructedRows = getServiceSummaryRows();
      missingServices = reconstructedRows
        .map((row) => ({
          current: row,
          uploaded: extractUploadedServiceSnapshot(uploadedText, row.service)
        }))
        .filter(({ current, uploaded }) => current.value > 0 && !uploaded.present);
    }
    const baselineSource = uploadedText ? "uploaded quote baseline" : "current working quote";
    const manualTarget = Number(els.quoteReviewTargetValue?.value) || 0;
    const targetValue = manualTarget > 0 ? manualTarget : 0;
    const assumptions = els.quoteReviewAssumptions?.value.trim() || "";

    if (!targetValue) {
      return [
        `Baseline Service Value: ${currency.format(baselineTotals.totalValue)} (${baselineSource})`,
        assumptions ? "" : null,
        assumptions ? "Target Assumptions" : null,
        assumptions ? assumptions : null,
        assumptions ? "" : null,
        "Enter a Target Service Value to build a revised quote."
      ].filter(Boolean).join("\n");
    }

    const delta = targetValue - baselineTotals.totalValue;
    if (delta === 0) {
      return [
        `Baseline Service Value: ${currency.format(baselineTotals.totalValue)} (${baselineSource})`,
        `Target Service Value: ${currency.format(targetValue)}`,
        "",
        "The baseline quote already matches the target service value."
      ].join("\n");
    }

    const mode = delta < 0 ? "reduce" : "add";
    const neededAmount = Math.abs(delta);
    const settings = getAdminSettings();
    const isAddonOnly = els.quoteType?.value === "addon-only";
    const baselinePmHours = baselineTotals.pmHours;
    const baselineProcessCounts = getCurrentProcessCounts();
    const scenario = buildTargetScenario(mode, neededAmount, baselineTotals.totalValue);
    const revisedRows = getServiceSummaryRows();
    const revisedNotesLines = (els.quoteNotes?.value || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    state.lastTargetScenario = {
      formState: getFormState(),
      totals: {
        totalValue: scenario.finalTotals.totalValue,
        travelEstimate: scenario.finalTotals.travelEstimate,
        implementationConsultantHours: scenario.finalTotals.implementationConsultantHours,
        pmHours: scenario.finalTotals.pmHours
      },
      builtAt: new Date().toISOString(),
      targetValue,
      baselineValue: baselineTotals.totalValue
    };
    const lines = [
      `Baseline Service Value: ${currency.format(baselineTotals.totalValue)} (${baselineSource})`,
      `Target Service Value: ${currency.format(targetValue)}`,
      `${mode === "reduce" ? "Reduction Needed" : "Additional Value Needed"}: ${currency.format(neededAmount)}`,
      `Projected Service Value: ${currency.format(scenario.finalTotals.totalValue)}`,
      `Remaining Variance: ${currency.format(Math.abs(targetValue - scenario.finalTotals.totalValue))}`
    ];

    if (Math.abs(targetValue - scenario.finalTotals.totalValue) > 1) {
      lines.push("");
      lines.push("Target Status");
      lines.push(`The current target could not be reached exactly with the quote elements that are locked from target planning. The guidance below reflects the closest supported quote the planner could build at ${currency.format(scenario.finalTotals.totalValue)}.`);
      if (mode === "reduce") {
        lines.push(`Minimum reachable service value with the current protected items and floors: ${currency.format(scenario.finalTotals.totalValue)}.`);
      } else {
        lines.push(`Maximum reachable service value with the current protected items and floors: ${currency.format(scenario.finalTotals.totalValue)}.`);
      }
    }

    if (assumptions) {
      lines.push("");
      lines.push("Target Assumptions");
      lines.push(assumptions);
    }

    if (missingServices.length) {
      lines.push("");
      lines.push("Missing From Uploaded Quote");
      missingServices.forEach(({ current }) => {
        lines.push(`- ${current.service}: add ${currency.format(current.value)}${current.hours ? ` (${formatHours(current.hours)})` : ""}`);
      });
    }

    if (mode === "reduce") {
      const hourReductions = getRequiredHourReductions(neededAmount, settings, isAddonOnly);
      const revisedProcessCounts = getCurrentProcessCounts();
      const icReductionValue = hourReductions.icHours * settings.hourlyRate;
      const pmReductionValue = hourReductions.pmHours * settings.hourlyRate;
      const actualProcessReductions = [
        {
          label: "tyler owned custom processes",
          reduced: Math.max(0, baselineProcessCounts.tylerCustom - revisedProcessCounts.tylerCustom),
          hoursPer: settings.tylerProcessHours
        },
        {
          label: "client owned custom processes",
          reduced: Math.max(0, baselineProcessCounts.clientCustom - revisedProcessCounts.clientCustom),
          hoursPer: settings.clientProcessHours
        },
        {
          label: "tyler owned templated processes",
          reduced: Math.max(0, baselineProcessCounts.tylerTemplated - revisedProcessCounts.tylerTemplated),
          hoursPer: TYLER_TEMPLATED_PROCESS_HOURS
        },
        {
          label: "client owned templated processes",
          reduced: Math.max(0, baselineProcessCounts.clientTemplated - revisedProcessCounts.clientTemplated),
          hoursPer: CLIENT_TEMPLATED_PROCESS_HOURS
        }
      ].filter((item) => item.reduced > 0);

      lines.push("");
      lines.push("Required Hour Reduction");
      lines.push(`- Implementation Consultant hours to reduce: ${formatHours(hourReductions.icHours)}`);
      lines.push(`- Implementation Consultant value reduction: ${currency.format(icReductionValue)}`);
      lines.push(`- PM hours to reduce: ${formatHours(hourReductions.pmHours)}`);
      lines.push(`- PM value reduction: ${currency.format(pmReductionValue)}`);
      lines.push(`- Approximate value impact from IC + PM reduction: ${currency.format(hourReductions.totalReductionValue)}`);
      lines.push(`- PM reduction is based on the revised quote target, not the original quote. Baseline PM was ${formatHours(baselinePmHours)} and revised PM is ${formatHours(scenario.finalTotals.pmHours)}.`);

      lines.push("");
      lines.push("Suggested Process Reduction");
      if (actualProcessReductions.length) {
        actualProcessReductions.forEach((item) => {
          lines.push(`- Reduce ${item.reduced} ${item.label} (${formatHours(item.reduced * item.hoursPer)} IC hours)`);
        });
      } else {
        const processPlan = getProcessReductionPlan(hourReductions.icHours, settings);
        if (processPlan.plan.length) {
          processPlan.plan.forEach((item) => {
            lines.push(`- Reduce ${item.count} ${item.label.toLowerCase()} (${formatHours(item.hours)} IC hours)`);
          });
          if (processPlan.remaining > 0) {
            lines.push(`- Remaining IC hours to reduce outside process counts: ${formatHours(processPlan.remaining)}`);
          }
        } else {
          lines.push("- No process counts are currently available, so the planner cannot translate the target into process reductions.");
        }
      }
    }

    lines.push("");
    lines.push("What To Quote");
    revisedRows.filter((row) => row.service !== "Estimated Travel").forEach((row) => {
      lines.push(`- ${row.service}: ${currency.format(row.value)}${row.hours ? ` (${formatHours(row.hours)})` : ""}`);
    });
    lines.push(`- Total Services Cost: ${currency.format(scenario.finalTotals.totalValue)}`);
    if (scenario.finalTotals.travelEstimate > 0) {
      lines.push(`- Estimated Travel: ${currency.format(scenario.finalTotals.travelEstimate)}`);
    }

    if (revisedNotesLines.length) {
      lines.push("");
      lines.push("Comments");
      revisedNotesLines.forEach((line) => {
        if (line.startsWith(">> ")) {
          lines.push(line.slice(3).trim());
        } else if (line.startsWith("- >> ")) {
          lines.push(line.slice(5).trim());
        } else {
          lines.push(line.startsWith("- ") ? line : `- ${line}`);
        }
      });
    }

    lines.push("");
    lines.push("Hours Summary");
    lines.push(`- Baseline IC hours: ${formatHours(baselineTotals.implementationConsultantHours)}`);
    lines.push(`- Revised IC hours: ${formatHours(scenario.finalTotals.implementationConsultantHours)}`);
    lines.push(`- Baseline PM hours: ${formatHours(baselinePmHours)}`);
    lines.push(`- Revised PM hours: ${formatHours(scenario.finalTotals.pmHours)}`);

    lines.push("");
    lines.push("Revised Quote Inputs");
    lines.push(`- Revised IC Hours: ${formatHours(scenario.finalTotals.implementationConsultantHours)}`);
    lines.push(`- Revised PM Hours: ${formatHours(scenario.finalTotals.pmHours)}`);
    lines.push(`- Revised Total Services Cost: ${currency.format(scenario.finalTotals.totalValue)}`);
    if (scenario.finalTotals.travelEstimate > 0) {
      lines.push(`- Estimated Travel: ${currency.format(scenario.finalTotals.travelEstimate)}`);
    }
    scenario.inputSummary.forEach((line) => lines.push(`- ${line}`));

    return lines.join("\n");
  });
}

function analyzeUploadedQuote() {
  try {
    const uploadedText = els.reviewedQuoteText?.value || "";
    if (!uploadedText.trim()) {
      setOutputText(els.quoteReviewResults, "Upload or paste a quote first.");
      return;
    }

    const normalizedUploaded = normalizeReviewText(uploadedText);
    const uploadedValueSummary = deriveUploadedServiceValue(uploadedText);
    const uploadedTotalValue = uploadedValueSummary.total;

    const analysis = withTemporaryFormState(() => {
      populateFormFromUploadedQuote(uploadedText);
      const hasDetailedDrivers =
        (Number(els.tylerOwnedProcesses?.value) || 0) > 0
        || (Number(els.clientOwnedProcesses?.value) || 0) > 0
        || (Number(els.tylerOwnedTemplatedProcesses?.value) || 0) > 0
        || (Number(els.clientOwnedTemplatedProcesses?.value) || 0) > 0
        || (Number(els.integrationSupportPrice?.value) || 0) > 0
        || (Number(els.integrationDevelopmentPrice?.value) || 0) > 0
        || (Number(els.customFormsCount?.value) || 0) > 0
        || (Number(els.customReportsCount?.value) || 0) > 0
        || (Number(els.reportHours?.value) || 0) > 0
        || (Number(els.configurationTrainingHours?.value) || 0) > 0
        || (Number(els.productionSupportHours?.value) || 0) > 0;
      if (hasDetailedDrivers) {
        clearImportedHoursOverridesOnly();
      }
      calculate();
      return {
        reconstructedTotals: calculateServiceTotals(),
        reconstructedRows: getServiceSummaryRows(),
        reconstructedNotes: els.quoteNotes?.value || "",
        reconstructedInputSummary: getScenarioInputSummary()
      };
    });

    const reconstructedTotals = analysis.reconstructedTotals;
    const reconstructedRows = analysis.reconstructedRows;
    const serviceComparisons = reconstructedRows.map((row) => ({
      current: row,
      uploaded: extractUploadedServiceSnapshot(uploadedText, row.service)
    }));
    const reconstructedServiceNames = new Set(reconstructedRows.map((row) => row.service));
    const extraUploadedServices = getKnownReviewServiceNames()
      .filter((serviceName) => !reconstructedServiceNames.has(serviceName))
      .map((serviceName) => extractUploadedServiceSnapshot(uploadedText, serviceName))
      .filter((row) => row.present);
    const missingServices = serviceComparisons.filter(({ current, uploaded }) => current.value > 0 && !uploaded.present);
    const underQuotedServices = serviceComparisons.filter(({ current, uploaded }) => (
      current.value > 0
      && uploaded.present
      && uploaded.value > 0
      && uploaded.value + 1 < current.value
    ));
    const overQuotedServices = serviceComparisons.filter(({ current, uploaded }) => (
      current.value > 0
      && uploaded.present
      && uploaded.value > current.value + 1
    ));
    const missingSections = [];
    if (!normalizedUploaded.includes(normalizeReviewText("Investment Summary"))) {
      missingSections.push("Investment Summary header");
    }
    if (analysis.reconstructedNotes.trim() && !normalizedUploaded.includes(normalizeReviewText("Investment Summary Notes"))) {
      missingSections.push("Investment Summary Notes section");
    }

    const reconstructedContractCost = reconstructedTotals.totalValue + (reconstructedTotals.travelEstimate || 0);
    const variance = uploadedTotalValue ? uploadedTotalValue - reconstructedTotals.totalValue : 0;
    const contractVariance = uploadedTotalValue ? uploadedTotalValue - reconstructedContractCost : 0;
    const missingServicesValue = missingServices.reduce((sum, { current }) => sum + current.value, 0);
    const underQuotedValue = underQuotedServices.reduce((sum, { current, uploaded }) => sum + Math.max(0, current.value - uploaded.value), 0);
    const overQuotedValue = overQuotedServices.reduce((sum, { current, uploaded }) => sum + Math.max(0, uploaded.value - current.value), 0);
    const results = [
      "Quote review complete.",
      `The uploaded quote was first reconstructed into the pricer so the comparison uses the uploaded quote as the baseline.`,
      missingServices.length || underQuotedServices.length || overQuotedServices.length || extraUploadedServices.length || missingSections.length
        ? `Review found ${missingServices.length} missing, ${underQuotedServices.length} under-quoted, and ${overQuotedServices.length} over-quoted service areas.`
        : "No obvious service gaps or over-quoted items were found."
    ];

    if (missingServices.length || underQuotedServices.length || overQuotedServices.length) {
      results.push("");
      results.push("Service Findings");
      if (missingServices.length) {
        results.push(`- Missing services in uploaded quote: ${currency.format(missingServicesValue)} in pricer value`);
      }
      if (underQuotedServices.length) {
        results.push(`- Under-quoted services in uploaded quote: ${currency.format(underQuotedValue)} below the pricer`);
      }
      if (overQuotedServices.length) {
        results.push(`- Over-quoted services in uploaded quote: ${currency.format(overQuotedValue)} above the pricer`);
      }
    }

    results.push("");
    results.push("What The Quote Should Be");
    reconstructedRows.forEach((row) => {
      const uploaded = extractUploadedServiceSnapshot(uploadedText, row.service);
      const deltaValue = uploaded.value > 0 ? row.value - uploaded.value : row.value;
      const deltaPrefix = deltaValue > 0 ? "+" : deltaValue < 0 ? "-" : "";
      results.push(
        `- ${row.service}: ${currency.format(row.value)}${row.hours ? ` (${formatHours(row.hours)})` : ""} | Delta vs uploaded: ${deltaPrefix}${currency.format(Math.abs(deltaValue))}`
      );
    });
    results.push(`- Total Services Cost: ${currency.format(reconstructedTotals.totalValue)}`);
    results.push(`- Delta vs uploaded services total: ${uploadedTotalValue ? `${reconstructedTotals.totalValue - uploadedTotalValue > 0 ? "+" : reconstructedTotals.totalValue - uploadedTotalValue < 0 ? "-" : ""}${currency.format(Math.abs(reconstructedTotals.totalValue - uploadedTotalValue))}` : "Unable to determine"}`);
    if (reconstructedTotals.travelEstimate > 0) {
      results.push(`- Estimated Travel: ${currency.format(reconstructedTotals.travelEstimate)}`);
    }

    results.push("");
    results.push("Value Comparison");
    results.push(`- Reconstructed service value from uploaded quote: ${currency.format(reconstructedTotals.totalValue)}`);
    results.push(`- Reconstructed total contract cost: ${currency.format(reconstructedContractCost)}`);
    if (uploadedTotalValue) {
      results.push(`- Uploaded quote value found: ${currency.format(uploadedTotalValue)}${uploadedValueSummary.source ? ` (${uploadedValueSummary.source})` : ""}`);
      results.push(`- Variance vs reconstructed quote: ${variance > 0 ? "+" : variance < 0 ? "-" : ""}${currency.format(Math.abs(variance))}`);
      results.push(`- Variance vs reconstructed total contract cost: ${contractVariance > 0 ? "+" : contractVariance < 0 ? "-" : ""}${currency.format(Math.abs(contractVariance))}`);
      results.push(`- Reasoning: the uploaded quote is ${variance === 0 ? "aligned with" : variance > 0 ? "higher than" : "lower than"} the reconstructed pricer output.`);
    } else {
      results.push("- Uploaded quote value found: Unable to detect a clear total");
      results.push("- Reasoning: service-line comparison is still shown, but total variance could not be confirmed.");
    }

    results.push("");
    results.push("Pricer Calculation Inputs Used");
    analysis.reconstructedInputSummary.forEach((line) => {
      results.push(`- ${line}`);
    });

    if (missingServices.length) {
      results.push("");
      results.push("Missing From Uploaded Quote");
      missingServices.forEach(({ current }) => {
        results.push(`- ${current.service}: pricer cost ${currency.format(current.value)}${current.hours ? ` for ${formatHours(current.hours)}` : ""}. This service was not clearly found in the uploaded quote.`);
      });
    }

    if (underQuotedServices.length) {
      results.push("");
      results.push("Likely Under-Quoted In Uploaded Quote");
      underQuotedServices.forEach(({ current, uploaded }) => {
        results.push(`- ${current.service}: uploaded quote shows ${currency.format(uploaded.value)} but the pricer expects ${currency.format(current.value)}${current.hours ? ` (${formatHours(current.hours)})` : ""}.`);
      });
    }

    if (overQuotedServices.length) {
      results.push("");
      results.push("Likely Over-Quoted In Uploaded Quote");
      overQuotedServices.forEach(({ current, uploaded }) => {
        results.push(`- ${current.service}: uploaded quote shows ${currency.format(uploaded.value)} but the pricer expects ${currency.format(current.value)}${current.hours ? ` (${formatHours(current.hours)})` : ""}.`);
      });
    }

    if (extraUploadedServices.length) {
      results.push("");
      results.push("Services Found In Uploaded Quote But Not In Reconstructed Quote");
      extraUploadedServices.forEach((row) => {
        results.push(`- ${row.service}: found in uploaded quote${row.value > 0 ? ` at ${currency.format(row.value)}` : ""}. Review whether this service should be added to the pricer input or removed from the quote.`);
      });
    }

    if (missingSections.length) {
      results.push("");
      results.push("Likely Missing Sections");
      missingSections.forEach((item) => {
        results.push(`- ${item}`);
      });
    }

    results.push("");
    results.push("Reconstructed Quote Reference");
    reconstructedRows.forEach((row) => {
      results.push(`- ${row.service}: ${currency.format(row.value)}${row.hours ? ` (${formatHours(row.hours)})` : ""}`);
    });

    setOutputText(els.quoteReviewResults, results.join("\n"));
  } catch (error) {
    setOutputText(
      els.quoteReviewResults,
      `Quote variance review could not be completed.\n\nReason: ${error?.message || "Unexpected analyzer error"}`
    );
  }
}

function runQuoteVarianceReview() {
  setOutputText(els.quoteReviewResults, "Running quote variance review...");
  analyzeUploadedQuote();
}

function importQuoteReviewFile(file) {
  setOutputText(els.quoteReviewResults, `Reading ${file.name}...`);
  const reader = new FileReader();
  reader.onload = () => {
    let text = "";
    if (file.type === "application/pdf" || /\.pdf$/i.test(file.name || "")) {
      text = extractPdfTextFromArrayBuffer(reader.result);
      if (!text) {
        const message = "PDF uploaded, but text could not be extracted. If this is a scanned PDF, paste the text or use a text-based PDF.";
        setOutputText(els.reviewedQuoteText, message);
        setOutputText(els.quoteReviewResults, message);
        return;
      }
    } else {
      text = typeof reader.result === "string" ? reader.result : "";
    }
    setOutputText(els.reviewedQuoteText, text);
    setOutputText(els.quoteReviewResults, `${file.name} loaded. Review the extracted text, then click Analyze Quote Variance.`);
  };
  reader.onerror = () => {
    const message = `Could not read ${file.name}.`;
    setOutputText(els.reviewedQuoteText, message);
    setOutputText(els.quoteReviewResults, message);
  };
  if (file.type === "application/pdf" || /\.pdf$/i.test(file.name || "")) {
    reader.readAsArrayBuffer(file);
  } else {
    reader.readAsText(file);
  }
}

function applyReviewedQuoteToForm() {
  const uploadedText = els.reviewedQuoteText?.value || "";
  if (!uploadedText.trim()) {
    setOutputText(els.quoteReviewResults, "Upload or paste a quote first.");
    return;
  }
  state.lastTargetScenario = null;
  populateFormFromUploadedQuote(uploadedText);
  calculate();
  setOutputText(els.quoteReviewResults, "Uploaded quote details were applied to the working form. Review the refreshed summary, totals, and notes, then save the quote if it looks right.");
}

async function applyTargetGuidanceToQuote() {
  if (!state.lastTargetScenario?.formState) {
    setOutputText(els.quoteReviewRecommendations, "Build Target Guidance first, then use Update Quote From Target.");
    return;
  }

  if (!els.currentUser?.value.trim()) {
    updateCurrentUserRequirementState(true);
    if (els.saveStatus) {
      els.saveStatus.classList.add("error");
      els.saveStatus.textContent = "Enter Current User before applying target guidance as a new saved version.";
    }
    els.currentUser?.focus();
    return;
  }

  const preservedVersion = els.quoteVersion?.value || "v1";
  applyFormState({
    ...state.lastTargetScenario.formState,
    currentUser: els.currentUser?.value || "",
    quoteVersion: preservedVersion
  });
  calculate();
  goToStep(0);

  const saved = await saveCurrentQuote();
  if (saved) {
    const remainingVariance = Math.abs((state.lastTargetScenario?.targetValue || 0) - (state.lastTargetScenario?.totals?.totalValue || 0));
    setOutputText(
      els.quoteReviewRecommendations,
      `${els.quoteReviewRecommendations?.value || ""}\n\nTarget guidance applied to the quote and saved as the next version.${remainingVariance > 1 ? ` The saved quote reflects the closest supported value at ${currency.format(state.lastTargetScenario?.totals?.totalValue || 0)}.` : ""}`
    );
  }
}

window.applyTargetGuidanceNow = applyTargetGuidanceToQuote;

function getServiceSummaryRows() {
  const totals = calculateServiceTotals();
  const settings = getAdminSettings();
  const appolloMode = isAppolloMode();
  const rows = [];
  const customFormsCount = Number(els.customFormsCount?.value) || 0;
  const customReportsCount = Number(els.customReportsCount?.value) || 0;
  const reportHours = Number(els.reportHours?.value) || 0;
  const conversionSources = getConversionSources();
  const pricingTable = CONFIG.conversionPricing[els.conversionModel?.value || "epl-current-to-epl"] || {};
  const dataArchivePricingTable = CONFIG.dataArchivePricing || {};
  const tier = totals.conversion.pricedTier;
  const conversionModuleRows = getSelectedConversionModules().map((moduleId) => {
    const module = CONFIG.conversionModules.find((item) => item.id === moduleId);
    const sourceCount = conversionSources[moduleId] || 0;
    const basePrice = pricingTable[moduleId]?.[tier] || 0;
    const sourceMultiplier = sourceCount > 0
      ? (1 + Math.max(0, sourceCount - 1) * ADDITIONAL_CONVERSION_SOURCE_MULTIPLIER)
      : 0;
    const value = Math.round(basePrice * sourceMultiplier * getServiceHoursMultiplier());
    const shortName = module?.name.replace(/^EPL\s+/, "") || moduleId;
    return {
      service: `Conversion Fixed Fee - ${shortName}`,
      hours: 0,
      rateBasis: `${sourceCount} ${shortName} source${sourceCount === 1 ? "" : "s"}`,
      value
    };
  });
  const dataArchiveRows = totals.conversion.includeDataArchive
    ? getSelectedConversionModules().map((moduleId) => {
      const module = CONFIG.conversionModules.find((item) => item.id === moduleId);
      const sourceCount = conversionSources[moduleId] || 0;
      const basePrice = dataArchivePricingTable[moduleId]?.[tier] || 0;
      const sourceMultiplier = sourceCount > 0
        ? (1 + Math.max(0, sourceCount - 1) * ADDITIONAL_CONVERSION_SOURCE_MULTIPLIER)
        : 0;
      const value = Math.round(basePrice * sourceMultiplier * getServiceHoursMultiplier());
      const shortName = module?.name.replace(/^EPL\s+/, "") || moduleId;
      return {
        service: `Data Archive - ${shortName}`,
        hours: 0,
        rateBasis: `${sourceCount} ${shortName} source${sourceCount === 1 ? "" : "s"}`,
        value
      };
    })
    : [];

  if (appolloMode) {
    rows.push({
      service: "Professional Implementation Services",
      hours: totals.implementationConsultantHours,
      rateBasis: `$${APPOLLO_IMPLEMENTATION_RATE}/hour`,
      value: totals.implementationConsultantPrice
    });
    if (totals.apolloEhImplementationHours > 0) {
      rows.push({
        service: "Environmental Health Implementation Services",
        hours: totals.apolloEhImplementationHours,
        rateBasis: `$${APPOLLO_IMPLEMENTATION_RATE}/hour`,
        value: totals.apolloEhImplementationValue,
        splitMode: "hours",
        splitUnits: totals.apolloEhImplementationHours,
        splitStep: 1
      });
    }
  } else if (totals.implementationConsultantHours > 0) {
    rows.push({
      service: "Implementation Consultant",
      hours: totals.implementationConsultantHours,
      rateBasis: `$${settings.hourlyRate}/hour`,
      value: totals.implementationConsultantPrice
    });
  }
  rows.push(...totals.addonServiceItems
    .filter((item) => item.hours > 0 || item.value > 0)
    .map((item) => ({
      service: item.name,
      hours: item.hours,
      rateBasis: item.rateBasis || `$${settings.hourlyRate}/hour`,
      value: item.value,
      notes: item.notes,
      splitMode: item.hours > 0 ? "hours" : undefined,
      splitUnits: item.hours > 0 ? item.hours : 0,
      splitStep: item.hours > 0 ? 1 : undefined
    })));
  if (appolloMode) {
    if (totals.conversion.base > 0) {
      rows.push({
        service: "Data Conversion - Archive",
        hours: roundQuotedHours(totals.conversion.fixedFeeHours, false),
        rateBasis: `Tier ${totals.conversion.pricedTier} archive pricing`,
        value: totals.conversion.base
      });
    }
    if (totals.conversion.hosting > 0) {
      rows.push({
        service: "Archive DB Hosting Fee",
        hours: 0,
        rateBasis: "Tier-based annual fee",
        value: totals.conversion.hosting
      });
    }
  } else {
    rows.push(...conversionModuleRows.filter((row) => row.value > 0));
    rows.push(...dataArchiveRows.filter((row) => row.value > 0));
    if (totals.conversion.dataArchiveHosting > 0) {
      rows.push({ service: "Data Archive Hosting", hours: 0, rateBasis: "Tier-based annual fee", value: totals.conversion.dataArchiveHosting });
    }
    if (totals.conversion.tcmPrice > 0) {
      rows.push({ service: "TCM Conversion", hours: 0, rateBasis: `Tier ${tier}`, value: totals.conversion.tcmPrice });
    }
    if (totals.conversion.hosting > 0 && totals.conversion.dataArchiveHosting === 0) {
      rows.push({ service: "Conversion Hosting", hours: 0, rateBasis: "Fixed fee", value: totals.conversion.hosting });
    }
  }
  if (customFormsCount > 0) {
    rows.push({
      service: "Custom Forms / Documents",
      hours: 0,
      rateBasis: `${customFormsCount} x ${currency.format(settings.customFormPrice)}`,
      value: customFormsCount * settings.customFormPrice * getServiceHoursMultiplier(),
      splitMode: "count",
      splitUnits: customFormsCount,
      splitStep: 1,
      splitRateBasisLabel: currency.format(settings.customFormPrice)
    });
  }
  if (customReportsCount > 0) {
    rows.push({
      service: "Custom Reports",
      hours: 0,
      rateBasis: `${customReportsCount} x ${currency.format(settings.customReportPrice)}`,
      value: customReportsCount * settings.customReportPrice * getServiceHoursMultiplier(),
      splitMode: "count",
      splitUnits: customReportsCount,
      splitStep: 1,
      splitRateBasisLabel: currency.format(settings.customReportPrice)
    });
  }
  if (reportHours > 0) {
    rows.push({
      service: "Reporting Services",
      hours: reportHours,
      rateBasis: `${formatHours(reportHours)} hours x ${currency.format(settings.fixedFeeRate)}`,
      value: reportHours * settings.fixedFeeRate * getServiceHoursMultiplier(),
      splitMode: "hours",
      splitUnits: reportHours,
      splitStep: 1
    });
  }
  if (totals.integrationSupportPrice > 0) {
    rows.push({
      service: "Integration Support",
      hours: totals.integrationSupportHours,
      rateBasis: `$${settings.fixedFeeRate}/hour`,
      value: totals.integrationSupportPrice,
      splitMode: "hours",
      splitUnits: totals.integrationSupportHours,
      splitStep: 1
    });
  }
  if (totals.integrationDevelopmentPrice > 0) {
    rows.push({
      service: "Integration Development",
      hours: totals.integrationDevelopmentHours,
      rateBasis: `$${settings.fixedFeeRate}/hour`,
      value: totals.integrationDevelopmentPrice,
      splitMode: "hours",
      splitUnits: totals.integrationDevelopmentHours,
      splitStep: 1
    });
  }
  if (totals.configurationTrainingHours > 0) {
    rows.push({
      service: "Configuration Training",
      hours: totals.configurationTrainingHours,
      rateBasis: `$${settings.hourlyRate}/hour`,
      value: totals.configurationTrainingHours * settings.hourlyRate,
      splitMode: "hours",
      splitUnits: totals.configurationTrainingHours,
      splitStep: 1
    });
  }
  if (totals.systemAdminTrainingHours > 0) {
    rows.push({
      service: "System Administrator Training",
      hours: totals.systemAdminTrainingHours,
      rateBasis: `$${settings.hourlyRate}/hour`,
      value: totals.systemAdminTrainingHours * settings.hourlyRate,
      splitMode: "hours",
      splitUnits: totals.systemAdminTrainingHours,
      splitStep: 1
    });
  }
  if (totals.trainTheTrainerHours > 0) {
    rows.push({
      service: "Train the Trainer",
      hours: totals.trainTheTrainerHours,
      rateBasis: `$${settings.hourlyRate}/hour`,
      value: totals.trainTheTrainerHours * settings.hourlyRate,
      splitMode: "hours",
      splitUnits: totals.trainTheTrainerHours,
      splitStep: 1
    });
  }
  if (totals.endUserTrainingHours > 0) {
    rows.push({
      service: appolloMode ? "End User Training - Onsite" : "End User Training",
      hours: totals.endUserTrainingHours,
      rateBasis: appolloMode ? `$${APPOLLO_EUT_RATE}/hour` : `$${settings.hourlyRate}/hour`,
      value: appolloMode ? (APPOLLO_EUT_HOURS * APPOLLO_EUT_RATE) : (totals.endUserTrainingHours * settings.hourlyRate),
      splitMode: "hours",
      splitUnits: totals.endUserTrainingHours,
      splitStep: 1
    });
  }
  if (totals.productionSupportHours > 0) {
    rows.push({
      service: "Production Support",
      hours: totals.productionSupportHours,
      rateBasis: `$${settings.hourlyRate}/hour`,
      value: totals.productionSupportHours * settings.hourlyRate,
      splitMode: "hours",
      splitUnits: totals.productionSupportHours,
      splitStep: 1
    });
  }
  if (totals.pmHours > 0) {
    rows.push({
      service: appolloMode ? "Project Management Time" : "Project Management",
      hours: appolloMode ? APPOLLO_PM_HOURS : totals.pmHours,
      rateBasis: appolloMode ? `$${APPOLLO_PM_RATE}/hour` : `$${settings.hourlyRate}/hour`,
      value: appolloMode ? (APPOLLO_PM_HOURS * APPOLLO_PM_RATE) : (totals.pmHours * settings.hourlyRate)
    });
    if (appolloMode && totals.apolloEhPmHours > 0) {
      rows.push({
        service: "Environmental Health PM",
        hours: totals.apolloEhPmHours,
        rateBasis: `$${APPOLLO_PM_RATE}/hour`,
        value: totals.apolloEhPmValue,
        splitMode: "hours",
        splitUnits: totals.apolloEhPmHours,
        splitStep: 1
      });
    }
  }
  if (totals.travelEstimate > 0) {
    rows.push({
      service: "Estimated Travel",
      hours: 0,
      rateBasis: `${Math.round(totals.travelTrips)} trip(s) x $2,400`,
      value: totals.travelEstimate
    });
  }

  return rows;
}

function renderServiceSummary() {
  if (!els.serviceSummaryBody) {
    return;
  }
  const { requiredRows, requiredServicesValue, requiredSummaryTotal, serviceRows } = getScopedServiceMetrics();
  if (!serviceRows.length) {
    els.serviceSummaryBody.innerHTML = '<tr><td colspan="6">No scoped services yet</td></tr>';
    return;
  }
  const selections = normalizeServiceOptionalSelections(state.serviceOptionalSelections);
  const detailRows = serviceRows.map((row) => {
    const splitState = buildSplitRowState(row);
    const baseRow = splitState.requiredRow;
    const splitValue = splitState.optionalSplitValue;
    const splitEnabled = Boolean(row.splitMode && row.splitUnits > 0);
    const serviceKey = getServiceRowKey(row);
    const baseHours = baseRow?.hours || 0;
    const baseRateBasis = baseRow?.rateBasis || (splitEnabled && !splitState.isFullyOptional ? "-" : row.rateBasis);
    const baseValue = baseRow?.value || 0;
    const splitSummary = splitEnabled && splitValue > 0
      ? `<div class="table-note">Optional: ${row.splitMode === "hours" ? formatHours(splitValue) : splitValue}</div>`
      : "";

    return `
      <tr${splitState.isFullyOptional ? ' class="service-row-optionalized"' : ""}>
        <td>${row.service}${splitSummary}</td>
        <td>${baseHours ? formatHours(baseHours) : "-"}</td>
        <td>${baseRateBasis}</td>
        <td>${currency.format(baseValue)}</td>
        <td><input type="checkbox" data-service-optional="${escapeHtml(serviceKey)}"${selections[serviceKey] ? " checked" : ""}></td>
        <td>${splitEnabled ? `<input class="service-split-input" type="number" min="0" max="${escapeHtml(row.splitUnits)}" step="${escapeHtml(row.splitStep || 1)}" value="${splitValue ? escapeHtml(splitValue) : ""}" placeholder="${row.splitMode === "hours" ? "Opt hrs" : "Opt qty"}" data-service-split="${escapeHtml(serviceKey)}"${splitState.isFullyOptional ? " disabled" : ""}>` : '<span class="mini-muted">-</span>'}</td>
      </tr>
    `;
  }).join("");
  const totalRow = `
    <tr class="service-summary-total">
      <td>Base Scope Services Total (w/o Travel)</td>
      <td>-</td>
      <td>-</td>
      <td>${currency.format(requiredServicesValue)}</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr class="service-summary-total">
      <td>Base Scope Summary Total</td>
      <td>${formatHours(requiredRows.reduce((sum, row) => sum + (Number(row.hours) || 0), 0))}</td>
      <td>-</td>
      <td>${currency.format(requiredSummaryTotal)}</td>
      <td>-</td>
      <td>-</td>
    </tr>
  `;
  els.serviceSummaryBody.innerHTML = `${detailRows}${totalRow}`;
}

function renderOptionalServiceSummary() {
  if (!els.optionalServiceSummaryBody) {
    return;
  }

  const { optionalRows, optionalTotal, grandTotalIfAccepted } = getScopedServiceMetrics();
  const rows = optionalRows;
  if (!rows.length) {
    els.optionalServiceSummaryBody.innerHTML = '<tr><td colspan="4">No optional services quoted</td></tr>';
    return;
  }

  const detailRows = rows.map((row) => `
    <tr>
      <td>${row.service}</td>
      <td>${row.hours ? formatHours(row.hours) : "-"}</td>
      <td>${row.rateBasis}</td>
      <td>${currency.format(row.value)}</td>
    </tr>
  `).join("");
  const totalRow = `
    <tr class="service-summary-total">
      <td>Optional Services Total</td>
      <td>-</td>
      <td>-</td>
      <td>${currency.format(optionalTotal)}</td>
    </tr>
    <tr class="service-summary-total">
      <td>Grand Total If Accepted</td>
      <td>-</td>
      <td>-</td>
      <td>${currency.format(grandTotalIfAccepted)}</td>
    </tr>
  `;
  els.optionalServiceSummaryBody.innerHTML = `${detailRows}${totalRow}`;
}

function syncTopSummaryWithScope(metrics = getScopedServiceMetrics(), fallbackTotals = calculateServiceTotals()) {
  els.topIcHours.textContent = formatHours(fallbackTotals.icHours);
  els.topPmHours.textContent = formatHours(fallbackTotals.pmHours);
  els.topTotalHours.textContent = formatHours(metrics.requiredHours);
  els.topTotalValue.textContent = currency.format(metrics.requiredServicesValue);
}

function handleServiceOptionalToggle(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || target.type !== "checkbox" || !target.dataset.serviceOptional) {
    return;
  }
  event.stopPropagation();
  getOptionalServiceBundleKeys(target.dataset.serviceOptional).forEach((key) => {
    state.serviceOptionalSelections[key] = target.checked;
    if (target.checked) {
      delete state.serviceSplitSelections[key];
    }
  });
  calculate();
}

function handleServiceSplitInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || !target.dataset.serviceSplit) {
    return;
  }
  const row = getServiceSummaryRows().find((item) => getServiceRowKey(item) === target.dataset.serviceSplit);
  if (!row) {
    return;
  }
  const nextValue = clampServiceSplitValue(row, target.value);
  const bundleKeys = getOptionalServiceBundleKeys(target.dataset.serviceSplit);
  bundleKeys.forEach((key) => {
    state.serviceOptionalSelections[key] = false;
  });
  if (nextValue > 0) {
    state.serviceSplitSelections[target.dataset.serviceSplit] = nextValue;
  } else {
    delete state.serviceSplitSelections[target.dataset.serviceSplit];
  }
  if (String(nextValue || "") !== String(target.value || "")) {
    target.value = nextValue ? String(nextValue) : "";
  }
  calculate();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildSimpleLinesHtml(text) {
  const lines = String(text || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) {
    return '<p class="empty-copy">No content available.</p>';
  }

  return `
    <div class="text-stack">
      ${lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}
    </div>
  `;
}

function buildKeyValueHtml(text) {
  const rows = String(text || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const separatorIndex = line.indexOf(":");
      if (separatorIndex === -1) {
        return { label: "", value: line };
      }
      return {
        label: line.slice(0, separatorIndex).trim(),
        value: line.slice(separatorIndex + 1).trim()
      };
    });

  if (!rows.length) {
    return '<p class="empty-copy">No content available.</p>';
  }

  return `
    <div class="detail-grid">
      ${rows.map((row) => `
        <div class="detail-row">
          <span class="detail-label">${escapeHtml(row.label || "")}</span>
          <span class="detail-value">${escapeHtml(row.value || "")}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function buildExportServiceTableRowsHtml(rows) {
  if (!rows.length) {
    return `
      <tr class="service-row empty-row">
        <td colspan="4">No professional services are currently scoped.</td>
      </tr>
    `;
  }

  return rows.map((row, index) => `
    <tr class="service-row ${index % 2 === 0 ? "row-soft" : "row-blue"}">
      <td>${escapeHtml(row.service)}</td>
      <td>${row.hours ? escapeHtml(formatHours(row.hours)) : "-"}</td>
      <td>${escapeHtml(row.rateBasis || "")}</td>
      <td>${escapeHtml(currency.format(row.value))}</td>
    </tr>
  `).join("");
}

function buildNotesSectionHtml(text, options = {}) {
  const { skipIntro = false } = options;
  const lines = String(text || "").split("\n");
  const sections = [];
  let intro = [];
  let currentSection = null;
  let currentSubheader = null;

  const pushCurrentSection = () => {
    if (currentSection && currentSection.items.length) {
      sections.push(currentSection);
    }
    currentSection = null;
    currentSubheader = null;
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      return;
    }

    if (line.endsWith(":")) {
      pushCurrentSection();
      currentSection = { title: line.slice(0, -1), items: [] };
      return;
    }

    if (line.startsWith(">> ")) {
      if (!currentSection) {
        currentSection = { title: "", items: [] };
      }
      currentSubheader = line.slice(3).trim();
      return;
    }

    if (line.startsWith("- >> ")) {
      if (!currentSection) {
        currentSection = { title: "", items: [] };
      }
      currentSubheader = line.slice(5).trim();
      return;
    }

    if (currentSection && !line.startsWith("- ")) {
      currentSubheader = line;
      return;
    }

    if (line.startsWith("- ")) {
      if (!currentSection) {
        currentSection = { title: "", items: [] };
      }
      currentSection.items.push({
        text: line.slice(2),
        subheader: currentSubheader
      });
      return;
    }

    if (!currentSection && !sections.length) {
      intro.push(line);
      return;
    }

    if (!currentSection) {
      currentSection = { title: "", items: [] };
    }
    currentSection.items.push({
      text: line,
      subheader: currentSubheader
    });
  });

  pushCurrentSection();

  const introHtml = !skipIntro && intro.length
    ? `<div class="note-intro">${intro.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}</div>`
    : "";

  const sectionsHtml = sections.length
    ? sections.map((section) => `
      <section class="note-section">
        ${section.title ? `<h3>${escapeHtml(section.title)}</h3>` : ""}
        <ul>
          ${section.items.map((item, index) => {
            const prev = index > 0 ? section.items[index - 1] : null;
            const showSubheader = item.subheader && item.subheader !== prev?.subheader;
            return `
              ${showSubheader ? `<li class="note-subheader"><strong>${escapeHtml(item.subheader)}</strong></li>` : ""}
              <li>${escapeHtml(item.text)}</li>
            `;
          }).join("")}
        </ul>
      </section>
    `).join("")
    : '<p class="empty-copy">No notes available.</p>';

  return `${introHtml}${sectionsHtml}`;
}

function buildExportSummaryText() {
  const quoteType = els.quoteType?.options?.[els.quoteType.selectedIndex]?.text || "Not entered";
  const clientType = els.clientType?.options?.[els.clientType.selectedIndex]?.text || "Not entered";
  const projectLength = (Number(els.goLiveTarget?.value) || 0) > 0
    ? `${Number(els.goLiveTarget?.value) || 0} month(s)`
    : "Not entered";
  const users = Number(els.userCount?.value) || 0;
  const suites = getSuiteNames();
  const addons = getAddonNames();
  const scope = getScopeSelections();
  const optionalServices = getScopedServiceMetrics().optionalRows;
  const cityLabel = [els.cityName?.value.trim() || "Unnamed opportunity", (els.stateName?.value || "").trim().toUpperCase()]
    .filter(Boolean)
    .join(", ");

  return [
    `Quote type: ${quoteType}`,
    `City / County: ${cityLabel}`,
    `Entity type: ${clientType}`,
    `Sales resource: ${els.salesRep?.value.trim() || "Not entered"}`,
    `Departments: ${els.departments?.value.trim() || "Not entered"}`,
    `Project length: ${projectLength}`,
    `Users: ${users}`,
    `Fixed fee adjustment: ${els.includeFixedFeeUplift?.checked ? "+20% hours applied" : "Not applied"}`,
    `Modules: ${suites.length ? suites.join(", ") : "None selected"}`,
    `Selected add-ons: ${addons.length ? addons.join(", ") : "None selected"}`,
    `Services in scope: ${scope.length ? scope.join(", ") : "None selected"}`,
    `Optional services quoted: ${optionalServices.length ? optionalServices.map((row) => row.service).join(", ") : "None"}`
  ].join("\n");
}

function buildExportFileBaseName() {
  const city = (els.cityName?.value || "").trim().replace(/\s+/g, " ");
  const state = (els.stateName?.value || "").trim().toUpperCase();
  const salesRep = (els.salesRep?.value || "").trim().replace(/\s+/g, " ");
  const version = (els.quoteVersion?.value || "v1").trim();
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).replace(/\//g, "-");

  return [
    city || "EPL Quote",
    state || "NA",
    salesRep || "Unknown Sales Person",
    version || "v1",
    today
  ]
    .map((part) => part.replace(/[\\/:*?"<>|]+/g, "").trim().replace(/\s+/g, "_"))
    .filter(Boolean)
    .join("_");
}

function buildQuoteDisplayTitle(locationLabel = "") {
  const cleanLocation = String(locationLabel || "").trim();
  const suitesLabel = getSuiteNames().length ? getSuiteNames().join(", ") : "No suites selected";
  return `${cleanLocation || "Unnamed opportunity"} Includes: ${suitesLabel}`;
}

function createOptionalQuoteItem(overrides = {}) {
  return {
    id: overrides.id || `optional-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: "",
    pricingMode: "hourly",
    hours: "0",
    rate: String(getAdminSettings().hourlyRate || DEFAULT_HOURLY_RATE),
    fixedValue: "0",
    notes: "",
    ...overrides
  };
}

function normalizeOptionalQuoteItems(items = []) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item) => createOptionalQuoteItem({
    id: item?.id,
    name: String(item?.name || ""),
    pricingMode: item?.pricingMode === "fixed" ? "fixed" : "hourly",
    hours: String(item?.hours ?? "0"),
    rate: String(item?.rate ?? (getAdminSettings().hourlyRate || DEFAULT_HOURLY_RATE)),
    fixedValue: String(item?.fixedValue ?? "0"),
    notes: String(item?.notes || "")
  }));
}

function calculateOptionalQuoteItemValue(item) {
  if ((item?.pricingMode || "hourly") === "fixed") {
    return Number(item?.fixedValue) || 0;
  }
  return (Number(item?.hours) || 0) * (Number(item?.rate) || 0);
}

function getOptionalQuoteItems() {
  if (!els.optionalItemsContainer) {
    return [];
  }

  return Array.from(els.optionalItemsContainer.querySelectorAll("[data-optional-item-id]")).map((card) => createOptionalQuoteItem({
    id: card.dataset.optionalItemId,
    name: card.querySelector('[data-optional-field="name"]')?.value || "",
    pricingMode: card.querySelector('[data-optional-field="pricingMode"]')?.value || "hourly",
    hours: card.querySelector('[data-optional-field="hours"]')?.value || "0",
    rate: card.querySelector('[data-optional-field="rate"]')?.value || String(getAdminSettings().hourlyRate || DEFAULT_HOURLY_RATE),
    fixedValue: card.querySelector('[data-optional-field="fixedValue"]')?.value || "0",
    notes: card.querySelector('[data-optional-field="notes"]')?.value || ""
  }));
}

function updateOptionalItemCardState(card) {
  if (!card) {
    return;
  }

  const pricingMode = card.querySelector('[data-optional-field="pricingMode"]')?.value || "hourly";
  card.querySelector('[data-optional-hours-field]')?.classList.toggle("hidden-step", pricingMode === "fixed");
  card.querySelector('[data-optional-rate-field]')?.classList.toggle("hidden-step", pricingMode === "fixed");
  card.querySelector('[data-optional-fixed-field]')?.classList.toggle("hidden-step", pricingMode !== "fixed");

  const item = createOptionalQuoteItem({
    pricingMode,
    hours: card.querySelector('[data-optional-field="hours"]')?.value || "0",
    rate: card.querySelector('[data-optional-field="rate"]')?.value || "0",
    fixedValue: card.querySelector('[data-optional-field="fixedValue"]')?.value || "0"
  });
  const valueEl = card.querySelector("[data-optional-item-value]");
  if (valueEl) {
    valueEl.textContent = currency.format(calculateOptionalQuoteItemValue(item));
  }
}

function renderOptionalQuoteItems(items = getOptionalQuoteItems()) {
  if (!els.optionalItemsContainer) {
    return;
  }

  const normalizedItems = normalizeOptionalQuoteItems(items);
  if (!normalizedItems.length) {
    els.optionalItemsContainer.innerHTML = '<p class="mini-muted">No optional services added yet.</p>';
    return;
  }

  els.optionalItemsContainer.innerHTML = normalizedItems.map((item) => {
    const value = calculateOptionalQuoteItemValue(item);
    return `
      <div class="optional-item-card" data-optional-item-id="${escapeHtml(item.id)}">
        <div class="field-grid optional-item-grid">
          <label class="field">
            <span>Optional Item Name</span>
            <input data-optional-field="name" type="text" value="${escapeHtml(item.name)}" placeholder="Configuration Training or Optional Module">
          </label>
          <label class="field">
            <span>Pricing Mode</span>
            <select data-optional-field="pricingMode">
              <option value="hourly"${item.pricingMode === "hourly" ? " selected" : ""}>Hourly</option>
              <option value="fixed"${item.pricingMode === "fixed" ? " selected" : ""}>Fixed Fee</option>
            </select>
          </label>
          <label class="field${item.pricingMode === "fixed" ? " hidden-step" : ""}" data-optional-hours-field>
            <span>Hours</span>
            <input data-optional-field="hours" type="number" min="0" value="${escapeHtml(item.hours)}">
          </label>
          <label class="field${item.pricingMode === "fixed" ? " hidden-step" : ""}" data-optional-rate-field>
            <span>Rate</span>
            <input data-optional-field="rate" type="number" min="0" value="${escapeHtml(item.rate)}">
          </label>
          <label class="field${item.pricingMode !== "fixed" ? " hidden-step" : ""}" data-optional-fixed-field>
            <span>Fixed Price</span>
            <input data-optional-field="fixedValue" type="number" min="0" value="${escapeHtml(item.fixedValue)}">
          </label>
          <label class="field">
            <span>Optional Notes</span>
            <input data-optional-field="notes" type="text" value="${escapeHtml(item.notes)}" placeholder="Example: Optional post-go-live support">
          </label>
        </div>
        <div class="optional-item-toolbar">
          <p class="mini-muted">Computed Optional Value: <strong data-optional-item-value>${currency.format(value)}</strong></p>
          <button class="ghost-button" type="button" data-remove-optional-item="${escapeHtml(item.id)}">Remove</button>
        </div>
      </div>
    `;
  }).join("");

  els.optionalItemsContainer.querySelectorAll("[data-optional-item-id]").forEach((card) => updateOptionalItemCardState(card));
}

function getOptionalServiceRows() {
  const autoItems = isAppolloMode() ? getAppolloOptionalQuoteItems() : [];
  return normalizeOptionalQuoteItems([...autoItems, ...getOptionalQuoteItems()])
    .map((item) => {
      const value = calculateOptionalQuoteItemValue(item);
      const service = item.name.trim();
      const notes = item.notes.trim();
      return {
        service: service || "Optional Service",
        hours: item.pricingMode === "fixed" ? 0 : (Number(item.hours) || 0),
        notes,
        rateBasis: item.pricingMode === "fixed"
          ? `Fixed fee${notes ? ` · ${notes}` : ""}`
          : `$${Number(item.rate) || 0}/hour${notes ? ` · ${notes}` : ""}`,
        value
      };
    })
    .filter((row) => row.value > 0 || Boolean(row.notes));
}

function buildPrintableHtml() {
  const overrideAuditText = els.overrideAuditTrail?.value || "No admin overrides applied";
  const hasRealOverrides = overrideAuditText.trim() !== "No admin overrides applied";
  const locationLabel = [els.cityName.value.trim(), (els.stateName?.value || "").trim().toUpperCase()]
    .filter(Boolean)
    .join(", ") || "EPL Quote";
  const departmentsLabel = els.departments?.value.trim() || "Not entered";
  const projectLengthLabel = (Number(els.goLiveTarget.value) || 0) > 0
    ? `${Number(els.goLiveTarget.value) || 0} month(s)`
    : "Not entered";
  const serviceRows = getServiceSummaryRows();
  const servicesTotalWithoutTravel = serviceRows
    .filter((row) => row.service !== "Estimated Travel")
    .reduce((sum, row) => sum + row.value, 0);
  const travelRow = serviceRows.find((row) => row.service === "Estimated Travel");
  const quoteDateLabel = new Date().toLocaleDateString("en-US");
  const quoteName = getAddonNames().length
    ? getAddonNames().join(", ")
    : (getSuiteNames().length ? getSuiteNames().join(", ") : "Enterprise Permitting & Licensing");
  const moduleList = getSuiteNames().length ? getSuiteNames().join(", ") : "None selected";
  const quoteDisplayTitle = buildQuoteDisplayTitle(locationLabel);
  const {
    requiredRows,
    optionalRows: optionalServiceRows,
    requiredTravelRow,
    requiredServicesValue,
    requiredSummaryTotal,
    optionalTotal: optionalServicesTotal,
    grandTotalIfAccepted
  } = getScopedServiceMetrics();

  return `
    <html>
      <head>
        <title>${escapeHtml(quoteDisplayTitle)}</title>
        <style>
          @page { margin: 0.45in; }
          body { font-family: "Aptos", "Segoe UI", Arial, sans-serif; margin: 0; color: #20384c; background: #ffffff; font-size: 12px; }
          .sheet { max-width: 980px; margin: 0 auto; background: #ffffff; padding: 0 4px 14px; }
          .brand-band { margin: 0 0 16px; padding: 16px 18px 14px; background: linear-gradient(135deg, #123251 0%, #0e5c86 100%); color: #ffffff; }
          .brand-kicker { margin: 0 0 5px; text-transform: uppercase; letter-spacing: .12em; font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.8); }
          .brand-title { margin: 0; font-size: 28px; line-height: 1.08; color: #ffffff; }
          .brand-subtitle { margin: 7px 0 0; font-size: 12px; line-height: 1.45; color: rgba(255,255,255,0.86); max-width: 760px; }
          .quote-detail-grid { display: block; margin-bottom: 18px; }
          .quote-detail-panel { border: 1px solid #d8e2ea; padding: 12px 14px; min-height: 100%; border-top: 4px solid #0e5c86; }
          .quote-detail-panel h2 { margin: 0 0 10px; font-size: 15px; color: #0e5c86; padding-bottom: 6px; border-bottom: 1px solid #dce4eb; }
          .quote-detail-row { margin: 0 0 9px; }
          .quote-detail-row:last-child { margin-bottom: 0; }
          .quote-detail-label { display: block; color: #6a7f92; font-size: 10px; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 3px; }
          .quote-detail-value { display: block; color: #123251; font-size: 12px; line-height: 1.45; font-weight: 700; }
          .quote-recipient { font-size: 13px; line-height: 1.55; color: #123251; }
          .quote-recipient strong { display: block; font-size: 24px; line-height: 1.1; margin-bottom: 8px; color: #123251; }
          .section { margin-top: 18px; page-break-inside: avoid; break-inside: avoid; }
          h2 { margin: 0 0 12px; font-size: 15px; color: #2f6589; padding-bottom: 6px; border-bottom: 1px solid #dce4eb; }
          h3 { margin: 0 0 8px; font-size: 11px; color: #0e5c86; text-transform: uppercase; letter-spacing: .08em; }
          .block { border: 1px solid #d8e2ea; padding: 14px 16px; background: #ffffff; line-height: 1.58; }
          .detail-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px 18px; }
          .detail-row { padding-bottom: 8px; border-bottom: 1px solid #eef3f7; }
          .detail-label { display: block; color: #6a7f92; font-size: 10px; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 3px; }
          .detail-value { display: block; color: #123251; font-size: 12px; line-height: 1.45; }
          .summary-list { border: 1px solid #d8e2ea; padding: 14px 16px; }
          .summary-list p { margin: 0 0 8px; }
          .summary-list p:last-child { margin-bottom: 0; }
          .text-stack p, .note-intro p { margin: 0 0 7px; }
          .text-stack p:last-child, .note-intro p:last-child { margin-bottom: 0; }
          .note-section { margin-top: 16px; }
          .note-section:first-of-type { margin-top: 12px; }
          .note-section ul { margin: 0; padding-left: 18px; }
          .note-section li { margin: 0 0 8px; line-height: 1.5; }
          .note-section .note-subheader { list-style: none; margin: 14px 0 6px -18px; font-weight: 700; color: #0e5c86; }
          .empty-copy { margin: 0; color: #5f7488; }
          .service-table-shell { border: 1px solid #d7e4ef; border-radius: 18px; overflow: hidden; background: #fdfefe; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.5); }
          table.service-table { width: 100%; border-collapse: separate; border-spacing: 0; margin-top: 0; page-break-inside: avoid; break-inside: avoid; font-size: 12px; }
          .service-table thead th { border: 0; padding: 13px 12px; text-align: left; vertical-align: middle; background: linear-gradient(180deg, #edf5fb 0%, #dfeef8 100%); text-transform: uppercase; font-size: 10px; letter-spacing: .12em; color: #6a8498; }
          .service-table thead th:first-child { border-top-left-radius: 18px; }
          .service-table thead th:last-child { border-top-right-radius: 18px; }
          .service-table tbody td { border: 0; border-top: 1px solid #d7e4ef; padding: 12px 12px; text-align: left; vertical-align: middle; color: #29465f; }
          .service-table tbody td:last-child { text-align: left; white-space: nowrap; }
          .service-row.row-soft td { background: #ffffff; }
          .service-row.row-blue td { background: #f4f9fd; }
          .service-row.empty-row td { background: #ffffff; color: #6c8193; }
          .service-table tbody tr.total-row td { background: #f3f8fc; font-weight: 700; color: #1e5778; border-top: 1px solid #bcd3e4; }
          .service-table tbody tr.total-row.primary td { background: #edf5fb; }
          .service-table tbody tr.total-row.grand td { background: #e4f0f8; font-weight: 800; }
        </style>
      </head>
      <body>
        <div class="sheet">
          <div class="brand-band">
            <p class="brand-kicker">Tyler Technologies</p>
            <h1 class="brand-title">${escapeHtml(quoteDisplayTitle)}</h1>
            <p class="brand-subtitle">Professional services quotation prepared for scoping, pricing review, and client-ready delivery.</p>
          </div>

          <div class="quote-detail-grid">
            <div class="quote-detail-panel">
              <h2>Sales Quotation For</h2>
              <div class="quote-recipient">
                <strong>${escapeHtml(locationLabel)}</strong>
                ${escapeHtml(getSelectedOptionText(els.clientType, "City"))}<br>
                Users: ${escapeHtml(String(Number(els.userCount.value) || 0))}<br>
                Modules: ${escapeHtml(moduleList)}<br>
                ${escapeHtml(departmentsLabel)}
              </div>
            </div>
          </div>

          <section class="section">
            <h2>Base Scope Services Summary</h2>
            <div class="service-table-shell">
              <table class="service-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Hours</th>
                    <th>Rate Basis</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  ${buildExportServiceTableRowsHtml(requiredRows)}
                  <tr class="total-row primary">
                    <td>Total Services Cost (w/o Travel Estimate)</td>
                    <td>-</td>
                    <td>-</td>
                    <td>${currency.format(requiredServicesValue)}</td>
                  </tr>
                  ${requiredTravelRow ? `
                    <tr class="total-row">
                      <td>Estimated Travel</td>
                      <td>-</td>
                      <td>${escapeHtml(requiredTravelRow.rateBasis || "")}</td>
                      <td>${currency.format(requiredTravelRow.value)}</td>
                    </tr>
                  ` : ""}
                  <tr class="total-row grand">
                    <td>Summary Total</td>
                    <td>-</td>
                    <td>-</td>
                    <td>${currency.format(requiredSummaryTotal)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          ${optionalServiceRows.length ? `
          <section class="section">
            <h2>Optional Services Summary</h2>
            <div class="service-table-shell">
              <table class="service-table">
                <thead>
                  <tr>
                    <th>Optional Item</th>
                    <th>Hours</th>
                    <th>Rate Basis</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  ${buildExportServiceTableRowsHtml(optionalServiceRows)}
                  <tr class="total-row primary">
                    <td>Optional Services Total</td>
                    <td>-</td>
                    <td>-</td>
                    <td>${currency.format(optionalServicesTotal)}</td>
                  </tr>
                  <tr class="total-row grand">
                    <td>Grand Total If Accepted</td>
                    <td>-</td>
                    <td>-</td>
                    <td>${currency.format(grandTotalIfAccepted)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          ` : ""}
          <section class="section">
            <h2>Comments</h2>
            <div class="block">${buildNotesSectionHtml(els.quoteNotes.value, { skipIntro: true })}</div>
          </section>
          <section class="section">
            <h2>Summary</h2>
            <div class="summary-list">
              ${buildSimpleLinesHtml(buildExportSummaryText())}
            </div>
          </section>
          ${hasRealOverrides ? `
          <section class="section">
            <h2>Override Audit Trail</h2>
            <div class="block">${buildSimpleLinesHtml(overrideAuditText)}</div>
          </section>` : ""}
        </div>
      </body>
    </html>
  `;
}

function buildWordDocumentHtml() {
  const printableHtml = buildPrintableHtml();
  return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
  <head>
    <meta charset="utf-8">
    <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
    <![endif]-->
  </head>
  <body>
    ${printableHtml.replace(/^<html>|<\/html>$/g, "").replace(/^[\s\S]*<body>/, "").replace(/<\/body>[\s\S]*$/,"")}
  </body>
</html>`;
}

function exportWordDoc() {
  try {
    if (els.saveStatus) {
      els.saveStatus.classList.remove("error");
      els.saveStatus.textContent = "Building Word export...";
    }
    const wordDocument = buildWordDocumentHtml();
    const blob = new Blob(["\ufeff", wordDocument], { type: "application/msword;charset=utf-8" });
    const fileName = `${buildExportFileBaseName()}.doc`;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 15000);
    if (els.saveStatus) {
      els.saveStatus.classList.remove("error");
      els.saveStatus.innerHTML = `Word export started. Check your downloads. If nothing happened, <a href="${url}" download="${fileName}">click here to download it manually</a>.`;
    }
  } catch (error) {
    if (els.saveStatus) {
      els.saveStatus.classList.add("error");
      els.saveStatus.textContent = `Word export failed: ${error?.message || "Unknown export error"}`;
    }
  }
}

function escapePdfText(value = "") {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function wrapPdfText(text, maxChars) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  if (!words.length) {
    return [""];
  }
  const lines = [];
  let current = words[0];
  for (let index = 1; index < words.length; index += 1) {
    const candidate = `${current} ${words[index]}`;
    if (candidate.length <= maxChars) {
      current = candidate;
    } else {
      lines.push(current);
      current = words[index];
    }
  }
  lines.push(current);
  return lines;
}

function buildPdfContentBlocks() {
  const cityLabel = [els.cityName?.value.trim() || "EPL Quote", (els.stateName?.value || "").trim().toUpperCase()]
    .filter(Boolean)
    .join(", ");
  const {
    requiredRows,
    optionalRows: optionalServiceRows,
    requiredTravelRow: travelRow,
    requiredServicesValue: servicesTotalWithoutTravel,
    requiredSummaryTotal: summaryTotal,
    optionalTotal: optionalServicesTotal,
    grandTotalIfAccepted
  } = getScopedServiceMetrics();
  const overrideAuditText = els.overrideAuditTrail?.value || "No admin overrides applied";
  const hasRealOverrides = overrideAuditText.trim() !== "No admin overrides applied";
  const noteLines = (els.quoteNotes?.value || "").split("\n");
  const fixedFeeEnabled = Boolean(els.includeFixedFeeUplift?.checked);

  const blocks = [
    { type: "eyebrow", text: "Tyler Technologies" },
    { type: "title", text: buildQuoteDisplayTitle(cityLabel || "EPL Quote") },
    { type: "line", text: "Professional services quotation prepared for scoping, pricing review, and client-ready delivery." },
    { type: "spacer-small" },
    { type: "section", text: "Sales Quotation For" },
    { type: "line", text: cityLabel || "EPL Quote" },
    { type: "line", text: `${getSelectedOptionText(els.clientType, "City")}` },
    { type: "line", text: `Users: ${Number(els.userCount.value) || 0}` },
    { type: "line", text: `Modules: ${getSuiteNames().length ? getSuiteNames().join(", ") : "None selected"}` },
    { type: "line", text: `${els.departments?.value.trim() || "Not entered"}` },
    { type: "spacer" },
    { type: "section", text: "Base Scope Services Summary" }
  ];
  blocks.push({
    type: "table-header",
    cells: ["Service", "Hours", "Rate Basis", "Value"]
  });
  requiredRows.forEach((row, index) => {
    blocks.push({
      type: "table-row",
      fillVariant: index % 2 === 0 ? "light" : "lighter",
      cells: [
        row.service,
        row.hours ? formatHours(row.hours) : "-",
        row.rateBasis || "",
        currency.format(row.value)
      ]
    });
  });
  blocks.push({
    type: "table-row",
    fillVariant: "totalPrimary",
    cells: ["Total Services Cost (w/o Travel Estimate)", "-", "-", currency.format(servicesTotalWithoutTravel)]
  });
  if (travelRow) {
    blocks.push({
      type: "table-row",
      fillVariant: "total",
      cells: ["Estimated Travel", "-", travelRow.rateBasis || "", currency.format(travelRow.value)]
    });
  }
  blocks.push({
    type: "table-row",
    fillVariant: "totalStrong",
    cells: ["Summary Total", "-", "-", currency.format(summaryTotal)]
  });

  if (optionalServiceRows.length) {
    blocks.push({ type: "spacer" });
    blocks.push({ type: "section", text: "Optional Services Summary" });
    blocks.push({
      type: "table-header",
      cells: ["Optional Item", "Hours", "Rate Basis", "Value"]
    });
    optionalServiceRows.forEach((row, index) => {
      blocks.push({
        type: "table-row",
        fillVariant: index % 2 === 0 ? "light" : "lighter",
        cells: [
          row.service,
          row.hours ? formatHours(row.hours) : "-",
          row.rateBasis || "",
          currency.format(row.value)
        ]
      });
    });
    blocks.push({
      type: "table-row",
      fillVariant: "totalPrimary",
      cells: ["Optional Services Total", "-", "-", currency.format(optionalServicesTotal)]
    });
    blocks.push({
      type: "table-row",
      fillVariant: "totalStrong",
      cells: ["Grand Total If Accepted", "-", "-", currency.format(grandTotalIfAccepted)]
    });
  }

  blocks.push({ type: "spacer" });
  blocks.push({ type: "section", text: "Comments" });
  noteLines.forEach((line) => {
    if (!line.trim()) {
      blocks.push({ type: "spacer-small" });
      return;
    }
    if (line.endsWith(":")) {
      blocks.push({ type: "subsection", text: line.slice(0, -1) });
      return;
    }
    blocks.push({ type: "line", text: line.replace(/^- /, "• ") });
  });

  const quoteSummaryLines = buildExportSummaryText().split("\n").filter(Boolean);
  blocks.push({ type: "spacer" });
  blocks.push({ type: "section", text: "Summary" });
  quoteSummaryLines.forEach((line) => {
    blocks.push({ type: "line", text: line });
  });
  if (fixedFeeEnabled) {
    blocks.push({ type: "line", text: "Fixed Fee Adjustment: +20% hours applied to services" });
  }

  if (hasRealOverrides) {
    blocks.push({ type: "spacer" });
    blocks.push({ type: "section", text: "Override Audit Trail" });
    overrideAuditText.split("\n").filter(Boolean).forEach((line) => {
      blocks.push({ type: "line", text: line });
    });
  }

  return blocks;
}

function buildPdfBlob() {
  const pageWidth = 612;
  const pageHeight = 792;
  const marginX = 54;
  const topY = 738;
  const bottomY = 54;
  const maxWidth = pageWidth - (marginX * 2);

  const fontSizes = {
    eyebrow: 10,
    title: 22,
    section: 15,
    subsection: 11,
    line: 10,
    "line-strong": 10
  };
  const tableColumns = [210, 48, 150, 96];

  const pageStreams = [];
  let currentStream = [];
  let y = topY;

  const newPage = () => {
    if (currentStream.length) {
      pageStreams.push(currentStream.join("\n"));
    }
    currentStream = [];
    y = topY;
  };

  const ensureSpace = (requiredHeight) => {
    if (y - requiredHeight < bottomY) {
      newPage();
    }
  };

  const addTextBlock = (text, size, options = {}) => {
    const maxChars = Math.max(24, Math.floor(maxWidth / (size * 0.52)));
    const lines = wrapPdfText(text, maxChars);
    const lineHeight = options.lineHeight || Math.max(size + 4, 14);
    const before = options.before || 0;
    const after = options.after ?? 4;
    ensureSpace(before + (lines.length * lineHeight) + after);
    y -= before;
    lines.forEach((line) => {
      currentStream.push(`BT /F1 ${size} Tf 1 0 0 1 ${marginX} ${y} Tm (${escapePdfText(line)}) Tj ET`);
      y -= lineHeight;
    });
    y -= after;
  };

  const addTableRowBlock = (cells, options = {}) => {
    const lineHeight = 12;
    const cellPaddingX = 4;
    const cellPaddingTop = 11;
    const fillVariant = options.fillVariant || "light";
    const backgroundColors = {
      header: [0.886, 0.941, 0.976],
      light: [1, 1, 1],
      lighter: [0.957, 0.98, 0.992],
      total: [0.949, 0.973, 0.988],
      totalPrimary: [0.929, 0.965, 0.988],
      totalStrong: [0.894, 0.945, 0.976]
    };
    const textColor = fillVariant === "header" ? [0.416, 0.518, 0.596] : [0.161, 0.275, 0.373];
    const cellLines = cells.map((cell, index) => {
      const approxChars = Math.max(10, Math.floor((tableColumns[index] - (cellPaddingX * 2)) / 5.6));
      return wrapPdfText(cell, approxChars);
    });
    const rowHeight = Math.max(...cellLines.map((lines) => (lines.length * lineHeight) + 10), 20);
    ensureSpace(rowHeight + 4);
    const rowTop = y;
    let x = marginX;
    cells.forEach((cell, index) => {
      const width = tableColumns[index];
      const rectY = rowTop - rowHeight;
      const [fillR, fillG, fillB] = backgroundColors[fillVariant] || backgroundColors.light;
      currentStream.push(`q ${fillR} ${fillG} ${fillB} rg 0.84 0.89 0.93 RG ${x} ${rectY} ${width} ${rowHeight} re B Q`);
      const [textR, textG, textB] = textColor;
      cellLines[index].forEach((line, lineIndex) => {
        const lineY = rowTop - cellPaddingTop - (lineIndex * lineHeight);
        currentStream.push(`BT ${textR} ${textG} ${textB} rg /F1 ${fillVariant === "header" ? 9 : 10} Tf 1 0 0 1 ${x + cellPaddingX} ${lineY} Tm (${escapePdfText(line)}) Tj ET`);
      });
      x += width;
    });
    y -= rowHeight + 2;
  };

  buildPdfContentBlocks().forEach((block) => {
    if (block.type === "spacer") {
      ensureSpace(12);
      y -= 12;
      return;
    }
    if (block.type === "spacer-small") {
      ensureSpace(6);
      y -= 6;
      return;
    }
    if (block.type === "eyebrow") {
      addTextBlock(block.text, fontSizes.eyebrow, { after: 6 });
      return;
    }
    if (block.type === "title") {
      addTextBlock(block.text, fontSizes.title, { after: 10 });
      return;
    }
    if (block.type === "section") {
      addTextBlock(block.text, fontSizes.section, { before: 4, after: 6 });
      return;
    }
    if (block.type === "subsection") {
      addTextBlock(block.text, fontSizes.subsection, { before: 4, after: 4 });
      return;
    }
    if (block.type === "line-strong") {
      addTextBlock(block.text, fontSizes["line-strong"], { before: 4, after: 6 });
      return;
    }
    if (block.type === "table-header") {
      addTableRowBlock(block.cells || [], { fillVariant: "header" });
      return;
    }
    if (block.type === "table-row") {
      addTableRowBlock(block.cells || [], { fillVariant: block.fillVariant });
      return;
    }
    addTextBlock(block.text, fontSizes.line);
  });

  if (currentStream.length) {
    pageStreams.push(currentStream.join("\n"));
  }

  const objects = [];
  const addObject = (content) => {
    objects.push(content);
    return objects.length;
  };

  const fontObjectId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const pageObjectIds = [];

  pageStreams.forEach((stream) => {
    const streamLength = new TextEncoder().encode(stream).length;
    const contentId = addObject(`<< /Length ${streamLength} >>\nstream\n${stream}\nendstream`);
    const pageId = addObject(`<< /Type /Page /Parent 0 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontObjectId} 0 R >> >> /Contents ${contentId} 0 R >>`);
    pageObjectIds.push(pageId);
  });

  const pagesId = addObject(`<< /Type /Pages /Count ${pageObjectIds.length} /Kids [${pageObjectIds.map((id) => `${id} 0 R`).join(" ")}] >>`);
  pageObjectIds.forEach((pageId) => {
    objects[pageId - 1] = objects[pageId - 1].replace("/Parent 0 0 R", `/Parent ${pagesId} 0 R`);
  });
  const catalogId = addObject(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}

function exportPdf() {
  try {
    if (els.saveStatus) {
      els.saveStatus.classList.remove("error");
      els.saveStatus.textContent = "Building PDF export...";
    }
    const blob = buildPdfBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${buildExportFileBaseName()}.pdf`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    if (els.saveStatus) {
      els.saveStatus.classList.remove("error");
      els.saveStatus.textContent = "PDF export started. Check your downloads.";
    }
  } catch (error) {
    if (els.saveStatus) {
      els.saveStatus.classList.add("error");
      els.saveStatus.textContent = "PDF export failed. Try Export Word while I refine the PDF generator.";
    }
  }
}

function derivePopulationTier() {
  const type = els.clientType.value;
  const population = Number(els.populationValue.value) || 0;
  const tiers = CONFIG.populationTiers[type] || [];
  const match = tiers.find((item) => population >= item.min && population < item.max);
  return match?.tier || "A";
}

function resolvePricedTier(derivedTier, pricingTable, selectedModules) {
  const availableTiers = ["B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  if (availableTiers.includes(derivedTier)) {
    return derivedTier;
  }

  const modulesToCheck = selectedModules.length
    ? selectedModules
    : Object.keys(pricingTable || {});

  for (const tier of availableTiers) {
    const hasTier = modulesToCheck.some((moduleId) => typeof (pricingTable?.[moduleId] || {})[tier] === "number");
    if (hasTier) {
      return tier;
    }
  }

  return derivedTier;
}

function calculateConversion() {
  const isAppollo = isAppolloMode();
  const model = els.conversionModel?.value || "epl-current-to-epl";
  const scopeType = els.conversionScopeType?.value || "full";
  const tier = derivePopulationTier();
  const selectedModules = getSelectedConversionModules();
  const pricingTable = CONFIG.conversionPricing[model] || {};
  const dataArchivePricingTable = CONFIG.dataArchivePricing || {};
  const pricedTier = resolvePricedTier(tier, pricingTable, selectedModules);
  const sourceMap = getConversionSources();
  const settings = getAdminSettings();
  const processServices = calculateProcessServices();
  const processCounts = processServices.processCounts;
  const tylerProcesses = processCounts.tylerCustom;
  const clientProcesses = processCounts.clientCustom;
  const tylerTemplatedProcesses = processCounts.tylerTemplated;
  const clientTemplatedProcesses = processCounts.clientTemplated;
  const icHours = processServices.hours;
  const processPrice = processServices.price;
  const serviceHoursMultiplier = getServiceHoursMultiplier();

  const modulePricingBreakdown = selectedModules.map((moduleId) => {
    const modulePricing = pricingTable[moduleId] || {};
    const moduleBasePrice = modulePricing[pricedTier] || 0;
    const sourceCount = sourceMap[moduleId] || 0;
    const sourceMultiplier = sourceCount > 0
      ? (1 + Math.max(0, sourceCount - 1) * ADDITIONAL_CONVERSION_SOURCE_MULTIPLIER)
      : 0;
    const adjustedModulePrice = Math.round(moduleBasePrice * sourceMultiplier);
    return {
      moduleId,
      moduleBasePrice,
      sourceCount,
      sourceMultiplier,
      adjustedModulePrice
    };
  });

  const base = modulePricingBreakdown.reduce((sum, item) => sum + item.adjustedModulePrice, 0);
  const includeDataArchive = isAppollo || Boolean(els.includeDataArchive?.checked);
  const includeTcmConversion = Boolean(els.includeTcmConversion?.checked);
  const dataArchiveBreakdown = includeDataArchive
    ? selectedModules.map((moduleId) => {
      const modulePricing = dataArchivePricingTable[moduleId] || {};
      const moduleBasePrice = modulePricing[pricedTier] || 0;
      const sourceCount = sourceMap[moduleId] || 0;
      const sourceMultiplier = sourceCount > 0
        ? (1 + Math.max(0, sourceCount - 1) * ADDITIONAL_CONVERSION_SOURCE_MULTIPLIER)
        : 0;
      const adjustedModulePrice = Math.round(moduleBasePrice * sourceMultiplier);
      return {
        moduleId,
        moduleBasePrice,
        sourceCount,
        sourceMultiplier,
        adjustedModulePrice
      };
    })
    : [];
  const dataArchivePrice = dataArchiveBreakdown.reduce((sum, item) => sum + item.adjustedModulePrice, 0);
  const dataArchiveHosting = includeDataArchive && model !== "energov"
    ? (CONFIG.hostingFees[pricedTier] || 0)
    : 0;
  const tcmPrice = includeTcmConversion ? (CONFIG.tcmConversionPricing?.[pricedTier] || 0) : 0;

  let baseOverride = settings.hasConversionOverridePrice ? settings.conversionOverridePrice : 0;
  const hosting = dataArchiveHosting;

  const moduleNames = getConversionModuleNames();
  const sourceSummary = selectedModules.map((moduleId) => {
    const label = CONFIG.conversionModules.find((item) => item.id === moduleId)?.name || moduleId;
    return `${label}: ${sourceMap[moduleId] || 0} source(s)`;
  });
  const modulePricingSummary = modulePricingBreakdown.map((item) => {
    const label = CONFIG.conversionModules.find((module) => module.id === item.moduleId)?.name || item.moduleId;
    if (item.sourceCount <= 1) {
      return `${label}: ${currency.format(item.adjustedModulePrice)}`;
    }
    return `${label}: ${currency.format(item.moduleBasePrice)} base + ${item.sourceCount - 1} additional source(s) = ${currency.format(item.adjustedModulePrice)}`;
  });
  const dataArchivePricingSummary = dataArchiveBreakdown.map((item) => {
    const label = CONFIG.conversionModules.find((module) => module.id === item.moduleId)?.name || item.moduleId;
    if (item.sourceCount <= 1) {
      return `${label}: ${currency.format(item.adjustedModulePrice)}`;
    }
    return `${label}: ${currency.format(item.moduleBasePrice)} base + ${item.sourceCount - 1} additional source(s) = ${currency.format(item.adjustedModulePrice)}`;
  });

  const modelLabel = els.conversionModel?.options?.[els.conversionModel.selectedIndex]?.text || "Current EERP / EPL to EPL (up to 10 years)";
  const scopeTypeLabel = els.conversionScopeType?.options?.[els.conversionScopeType.selectedIndex]?.text || "DCT";
  const hasPricingForTier = selectedModules.every((moduleId) => {
    const modulePricing = pricingTable[moduleId] || {};
    return typeof modulePricing[pricedTier] === "number";
  });
  const hasArchivePricingForTier = !includeDataArchive || selectedModules.every((moduleId) => {
    const modulePricing = dataArchivePricingTable[moduleId] || {};
    return typeof modulePricing[pricedTier] === "number";
  });
  const hasTcmPricingForTier = !includeTcmConversion || (CONFIG.tcmConversionPricing && typeof CONFIG.tcmConversionPricing[pricedTier] === "number" && CONFIG.tcmConversionPricing[pricedTier] > 0);

  els.populationTierDisplay.value = `Tier ${tier}`;
  els.conversionTierReadout.value = pricedTier === tier ? `Tier ${tier}` : `Tier ${tier} -> priced as ${pricedTier}`;
  const conversionBaseAmount = isAppollo
    ? dataArchivePrice
    : (base + dataArchivePrice + tcmPrice);
  const baseWithFixedFee = (settings.hasConversionOverridePrice ? baseOverride : conversionBaseAmount) * serviceHoursMultiplier;
  const effectiveBase = Math.round(baseWithFixedFee);
  els.conversionBasePrice.textContent = currency.format(effectiveBase);
  els.conversionHostingPrice.textContent = currency.format(hosting);
  els.conversionTotalPrice.textContent = currency.format(effectiveBase + hosting);
  els.conversionSelectedModules.textContent = moduleNames.join(", ") || "No modules selected";
  els.conversionHostingLabel.textContent = hosting ? `Tier ${pricedTier} data archive hosting included` : "Not included";
  els.conversionSourceSummary.textContent = sourceSummary.join(" | ") || "Fixed-fee conversion quote based on selected modules and sources";
  setOutputText(els.conversionSummary, [
    `Conversion type: ${scopeTypeLabel}`,
    `Conversion model: ${modelLabel}`,
    `Entity type: ${getSelectedOptionText(els.clientType, "City")}`,
    `Population: ${(Number(els.populationValue.value) || 0).toLocaleString("en-US")}`,
    `Service delivery model: ${processCounts.deliveryModel.label}`,
    `Population tier: ${tier}`,
    `Pricing tier used: ${pricedTier}`,
    `Tyler owned custom processes: ${tylerProcesses}`,
    `Client owned custom processes: ${clientProcesses}`,
    `Tyler owned templated processes: ${tylerTemplatedProcesses}`,
    `Client owned templated processes: ${clientTemplatedProcesses}`,
    `Process-based services: ${icHours} hours at ${currency.format(settings.hourlyRate)}/hour = ${currency.format(processPrice)}`,
    `Modules selected: ${moduleNames.join(", ") || "None selected"}`,
    `Sources per module: ${sourceSummary.join("; ") || "None entered"}`,
    `Module conversion pricing: ${modulePricingSummary.join("; ") || "None entered"}`,
    `Include Data Archive: ${includeDataArchive ? "Yes" : "No"}`,
    `Data archive pricing: ${includeDataArchive ? (dataArchivePricingSummary.join("; ") || "No priced modules selected") : "Not included"}`,
    `Data archive hosting fee: ${currency.format(dataArchiveHosting)}`,
    `Include TCM Conversion: ${includeTcmConversion ? "Yes" : "No"}`,
    `TCM conversion pricing: ${includeTcmConversion ? currency.format(tcmPrice) : "Not included"}`,
    `Base conversion estimate: ${currency.format(effectiveBase)}`,
    `Data archive hosting fee: ${currency.format(hosting)}`,
    `Fixed-fee hours for conversion estimate: ${(effectiveBase / settings.fixedFeeRate).toFixed(1)}`,
    `Conversion fixed-fee total: ${currency.format(effectiveBase + hosting)}`,
    hasPricingForTier && hasArchivePricingForTier
      ? "Pricing applied from configured conversion tables."
      : `Warning: no pricing table is configured for tier ${tier} in the selected model or archive configuration.`,
    includeTcmConversion && !hasTcmPricingForTier
      ? `Warning: TCM pricing is not yet configured for tier ${pricedTier}.`
      : "",
    scopeType === "dct"
      ? "Conversion notes aligned to the DCT conversion approach."
      : "Conversion notes aligned to the full conversion approach."
  ].join("\n"));

  return {
    scopeType,
    tier,
    pricedTier,
    base: effectiveBase,
    hosting,
    dataArchivePrice,
    dataArchiveHosting,
    tcmPrice,
    includeDataArchive,
    includeTcmConversion,
    processHours: icHours,
    processPrice,
    fixedFeeHours: effectiveBase / settings.fixedFeeRate,
    totalBeforePm: effectiveBase + hosting
  };
}

function calculateServiceTotals() {
  const isAddonOnly = els.quoteType?.value === "addon-only";
  const appolloMode = isAppolloMode();
  const apolloEhPackage = getApolloEhPackageItems();
  const addonServiceItems = getAddonServiceItems();
  const addonHours = addonServiceItems.reduce((sum, item) => sum + (Number(item.hours) || 0), 0);
  const addonValue = addonServiceItems.reduce((sum, item) => sum + (Number(item.value) || 0), 0);
  const conversionIncluded = document.querySelector("#includeConversion")?.checked;
  const integrationIncluded = document.querySelector("#includeIntegration")?.checked;
  const reportsIncluded = document.querySelector("#includeReports")?.checked;
  const travelIncluded = document.querySelector("#includeTravel")?.checked;
  const trainingPlan = getTrainingPlan();
  const trainingIncluded = trainingPlan.trainingIncluded;
  const serviceHoursMultiplier = getServiceHoursMultiplier();
  const conversion = conversionIncluded
    ? calculateConversion()
    : { base: 0, hosting: 0, processHours: 0, processPrice: 0, fixedFeeHours: 0, totalBeforePm: 0 };
  const processServices = calculateProcessServices();
  const settings = getAdminSettings();
  const rawIntegrationSupportHours = integrationIncluded ? (Number(els.integrationSupportPrice?.value) || 0) : 0;
  const rawIntegrationDevelopmentHours = integrationIncluded ? (Number(els.integrationDevelopmentPrice?.value) || 0) : 0;
  const integrationOverrideApplied = settings.hasIntegrationOverridePrice;
  const overriddenIntegrationTotal = integrationOverrideApplied ? settings.integrationOverridePrice : 0;
  const integrationSupportHours = integrationOverrideApplied
    ? roundQuotedHours(overriddenIntegrationTotal / settings.fixedFeeRate, isAddonOnly)
    : roundQuotedHours(rawIntegrationSupportHours * serviceHoursMultiplier, isAddonOnly);
  const integrationDevelopmentHours = integrationOverrideApplied ? 0 : roundQuotedHours(rawIntegrationDevelopmentHours * serviceHoursMultiplier, isAddonOnly);
  const integrationSupportPrice = integrationSupportHours * settings.fixedFeeRate;
  const integrationDevelopmentPrice = integrationDevelopmentHours * settings.fixedFeeRate;
  const integrationTotalPrice = integrationSupportPrice + integrationDevelopmentPrice;
  const integrationTotalHours = integrationSupportHours + integrationDevelopmentHours;
  const customFormsCount = reportsIncluded ? (Number(els.customFormsCount?.value) || 0) : 0;
  const customReportsCount = reportsIncluded ? (Number(els.customReportsCount?.value) || 0) : 0;
  const reportHours = reportsIncluded ? (Number(els.reportHours?.value) || 0) : 0;
  const reportFormsPrice = customFormsCount * settings.customFormPrice * serviceHoursMultiplier;
  const reportReportsPrice = customReportsCount * settings.customReportPrice * serviceHoursMultiplier;
  const reportHoursPrice = reportHours * settings.fixedFeeRate * serviceHoursMultiplier;
  const rawReportsPrice = reportFormsPrice + reportReportsPrice + reportHoursPrice;
  const reportsPrice = settings.hasReportingOverridePrice ? settings.reportingOverridePrice : rawReportsPrice;
  const reportsHours = roundQuotedHours((((reportsPrice - reportHoursPrice) / settings.fixedFeeRate) + (reportHours * serviceHoursMultiplier)), isAddonOnly);
  const solutionOrientationHours = roundQuotedHours(trainingPlan.solutionOrientationHours * serviceHoursMultiplier, isAddonOnly);
  const solutionValidationHours = roundQuotedHours(trainingPlan.solutionValidationHours * serviceHoursMultiplier, isAddonOnly);
  const configurationTrainingHours = roundQuotedHours(trainingPlan.configurationTrainingHours * serviceHoursMultiplier, isAddonOnly);
  const systemAdminTrainingHours = roundQuotedHours(trainingPlan.systemAdminTrainingHours * serviceHoursMultiplier, isAddonOnly);
  const trainTheTrainerHours = roundQuotedHours(trainingPlan.trainTheTrainerHours * serviceHoursMultiplier, isAddonOnly);
  const endUserTrainingHours = roundQuotedHours(trainingPlan.endUserTrainingHours * serviceHoursMultiplier, isAddonOnly);
  const productionSupportHours = roundQuotedHours(trainingPlan.productionSupportHours * serviceHoursMultiplier, isAddonOnly);
  const solutionOrientationPrice = solutionOrientationHours * settings.hourlyRate;
  const solutionValidationPrice = solutionValidationHours * settings.hourlyRate;
  const configurationTrainingPrice = configurationTrainingHours * settings.hourlyRate;
  const systemAdminTrainingPrice = systemAdminTrainingHours * settings.hourlyRate;
  const trainTheTrainerPrice = trainTheTrainerHours * settings.hourlyRate;
  const aiProductToolsHours = roundQuotedHours((Number(els.aiProductToolsHours?.value) || 0) * serviceHoursMultiplier, isAddonOnly);
  const defaultImplementationConsultantHours = appolloMode
    ? getApolloBaseImplementationHours()
    : (processServices.hours + solutionOrientationHours + solutionValidationHours + aiProductToolsHours);
  const implementationConsultantHours = settings.hasImplementationOverrideHours
    ? roundQuotedHours(settings.implementationOverrideHours, isAddonOnly)
    : defaultImplementationConsultantHours;
  const implementationConsultantPrice = appolloMode
    ? (implementationConsultantHours * APPOLLO_IMPLEMENTATION_RATE)
    : (implementationConsultantHours * settings.hourlyRate);
  const endUserTrainingPrice = appolloMode
    ? (endUserTrainingHours > 0 ? APPOLLO_EUT_HOURS * APPOLLO_EUT_RATE : 0)
    : (endUserTrainingHours * settings.hourlyRate);
  const productionSupportPrice = productionSupportHours * settings.hourlyRate;
  const noteProServicesHours = roundQuotedHours(implementationConsultantHours + integrationTotalHours + productionSupportHours, isAddonOnly);
  const rawIcHours = implementationConsultantHours + apolloEhPackage.implementationHours + addonHours + conversion.fixedFeeHours + integrationTotalHours + reportsHours + configurationTrainingHours + systemAdminTrainingHours + trainTheTrainerHours + endUserTrainingHours + productionSupportHours;
  const icHours = roundQuotedHours(rawIcHours, isAddonOnly);
  const pmHours = settings.hasPmOverrideHours
    ? roundQuotedHours(settings.pmOverrideHours, isAddonOnly)
    : (appolloMode ? (APPOLLO_PM_HOURS + apolloEhPackage.pmHours) : calculatePmHoursFromIc(icHours, settings, isAddonOnly));
  const totalHours = icHours + pmHours;
  const icValue = implementationConsultantPrice + apolloEhPackage.implementationValue + addonValue + conversion.base + integrationTotalPrice + reportsPrice + configurationTrainingPrice + systemAdminTrainingPrice + trainTheTrainerPrice + endUserTrainingPrice + productionSupportPrice;
  const pmValue = appolloMode ? ((APPOLLO_PM_HOURS * APPOLLO_PM_RATE) + apolloEhPackage.pmValue) : (pmHours * settings.hourlyRate);
  const totalValue = icValue + pmValue + conversion.hosting;
  const travelTrips = travelIncluded ? Math.ceil((((icHours + pmHours) / 40) * 0.25)) : 0;
  const travelEstimate = travelTrips * 2400;
  return {
    totalHours,
    totalValue,
    noteProServicesHours,
    icHours,
    pmHours,
    implementationConsultantHours,
    implementationConsultantPrice,
    apolloEhImplementationHours: apolloEhPackage.implementationHours,
    apolloEhImplementationValue: apolloEhPackage.implementationValue,
    apolloEhPmHours: apolloEhPackage.pmHours,
    apolloEhPmValue: apolloEhPackage.pmValue,
    addonServiceItems,
    addonHours,
    addonValue,
    travelTrips,
    travelEstimate,
    conversion,
    integrationSupportPrice,
    integrationSupportHours,
    integrationDevelopmentPrice,
    integrationDevelopmentHours,
    integrationTotalPrice,
    integrationTotalHours,
    reportsPrice,
    reportsHours,
    aiProductToolsHours,
    solutionOrientationHours,
    solutionValidationHours,
    configurationTrainingHours,
    systemAdminTrainingHours,
    trainTheTrainerHours,
    endUserTrainingHours,
    productionSupportHours,
    customFormsCount,
    customReportsCount,
    reportHours
  };
}

function getQuoteNotes() {
  const notes = [];
  const selectedAddons = selectedValues("addon");
  const selectedSuites = selectedValues("suite");
  const totals = calculateServiceTotals();
  const processCounts = getEffectiveProcessCounts();
  const tylerOwnedProcesses = processCounts.tylerCustom;
  const clientOwnedProcesses = processCounts.clientCustom;
  const tylerOwnedTemplatedProcesses = processCounts.tylerTemplated;
  const clientOwnedTemplatedProcesses = processCounts.clientTemplated;
  const deliveryModel = processCounts.deliveryModel;
  const includeConversion = document.querySelector("#includeConversion")?.checked;
  const includeReports = document.querySelector("#includeReports")?.checked;
  const includeTravel = document.querySelector("#includeTravel")?.checked;
  const trainingPlan = getTrainingPlan();
  const includeTraining = trainingPlan.trainingIncluded;
  const includeTrainTheTrainer = trainingPlan.trainTheTrainerSelected;
  const includeSystemAdminTraining = trainingPlan.systemAdminTrainingSelected;
  const includeChangeManagement = els.includeChangeManagement?.checked;
  const includeImplementation = document.querySelector("#includeImplementation")?.checked || els.quoteType.value === "full-implementation";
  const includeIntegration = document.querySelector("#includeIntegration")?.checked;
  const integrationNotesText = els.integrationNotes?.value.trim() || "";
  const conversionScopeType = els.conversionScopeType?.value || "full";
  const conversionSourceMap = getConversionSources();
  const conversionSourceNotes = CONFIG.conversionModules
    .filter((module) => (conversionSourceMap[module.id] || 0) > 0)
    .map((module) => `${module.name}: ${conversionSourceMap[module.id] || 0} source(s)`)
    .join(", ");
  const conversionSourceDetailNotes = CONFIG.conversionModules
    .filter((module) => (conversionSourceMap[module.id] || 0) > 0)
    .map((module) => {
      const sourceCount = conversionSourceMap[module.id] || 0;
      const moduleLabel = module.name.replace(/^EPL\s+/, "").toLowerCase();
      return `${sourceCount} legacy source${sourceCount === 1 ? "" : "s"} for the ${moduleLabel} module.`;
    });
  const includeEnvironmentalHealth = selectedSuites.includes("environmental-health")
    || getSelectedConversionModules().includes("environmental-health");
  const includeGeneralImplementation = selectedSuites.some((suite) => suite !== "environmental-health");
  const hasImplementationProcessScope = (
    tylerOwnedProcesses +
    clientOwnedProcesses +
    tylerOwnedTemplatedProcesses +
    clientOwnedTemplatedProcesses
  ) > 0;
  const shouldIncludeGeneralImplementationNotes = includeImplementation && (
    els.quoteType.value === "full-implementation" ||
    includeGeneralImplementation ||
    hasImplementationProcessScope
  );

  function isMeaningfulNoteItem(item) {
    if (!item) {
      return false;
    }
    const text = String(item).trim();
    if (!text) {
      return false;
    }
    if (/^not applicable$/i.test(text)) {
      return false;
    }
    if (/(^|[:\s])\$0(?:\D|$)/.test(text)) {
      return false;
    }
    if (/(^|[:\s])0 hours?(?:\D|$)/i.test(text)) {
      return false;
    }
    if (/(^|[:\s])0 source\(s\)(?:\D|$)/i.test(text)) {
      return false;
    }
    return true;
  }

  function addSection(title, items) {
    const cleaned = items.filter(isMeaningfulNoteItem);
    if (!cleaned.length) {
      return;
    }
    if (notes.length) {
      notes.push("");
    }
    notes.push(`${title}:`);
    cleaned.forEach((item) => {
      notes.push(`- ${item}`);
    });
  }

  function buildImplementationIntro(baseIntro) {
    const splitLabel = deliveryModel.isShared
      ? (deliveryModel.isCustomShared
          ? "custom client / Tyler split"
          : `${deliveryModel.clientPercent}% client / ${deliveryModel.tylerPercent}% Tyler`)
      : null;
    const totalTylerConfiguredProcesses = tylerOwnedProcesses + tylerOwnedTemplatedProcesses;
    const geoRuleCount = totalTylerConfiguredProcesses > 0
      ? Math.ceil(totalTylerConfiguredProcesses / 10)
      : 0;
    const automationEventCount = totalTylerConfiguredProcesses > 0
      ? Math.ceil(totalTylerConfiguredProcesses / 6)
      : 0;
    const geoRuleSentence = (geoRuleCount > 0 || automationEventCount > 0)
      ? `Tyler will also enable ${geoRuleCount} Geo Rule(s) and ${automationEventCount} automation event(s) within the application.`
      : "Tyler will also enable Geo Rules and automation events within the application.";
    const introLead = deliveryModel.isShared
      ? `Enterprise Permitting & Licensing (EPL) Implementation: This implementation follows a shared services model (${splitLabel}).`
      : "Enterprise Permitting & Licensing (EPL) Implementation: This implementation follows a full services model.";
    const configuredProcessSummary = [
      tylerOwnedProcesses > 0 ? `${tylerOwnedProcesses} unique case type${tylerOwnedProcesses === 1 ? "" : "s"}` : "",
      tylerOwnedTemplatedProcesses > 0 ? `${tylerOwnedTemplatedProcesses} templated case type${tylerOwnedTemplatedProcesses === 1 ? "" : "s"}` : ""
    ].filter(Boolean).join(" and ");
    const configurationSentence = configuredProcessSummary
      ? `Tyler will configure ${configuredProcessSummary} as representative examples.`
      : "";
    return [introLead, configurationSentence, "Each case type is estimated at 25 to 30 hours for definition, configuration, and validation.", geoRuleSentence, "The client will complete all remaining configuration activities not explicitly included above. This project is scoped based on this volume of processes. Any additional scope may require a change order or may be the responsibility of the client."]
      .filter(Boolean)
      .join(" ");
  }

  function buildTylerResponsibilities(items) {
    const totalTylerConfiguredProcesses = tylerOwnedProcesses + tylerOwnedTemplatedProcesses;
    const geoRuleCount = totalTylerConfiguredProcesses > 0
      ? Math.ceil(totalTylerConfiguredProcesses / 10)
      : 0;
    const automationEventCount = totalTylerConfiguredProcesses > 0
      ? Math.ceil(totalTylerConfiguredProcesses / 6)
      : 0;
    const aiProductToolsHours = Number(els.aiProductToolsHours?.value) || 0;
    const configuredProcessSummary = [
      tylerOwnedProcesses > 0 ? `${tylerOwnedProcesses} Tyler-owned custom process(es)` : "",
      tylerOwnedTemplatedProcesses > 0 ? `${tylerOwnedTemplatedProcesses} Tyler-owned templated process(es)` : ""
    ].filter(Boolean).join(" and ");

    return [
      configuredProcessSummary ? `Tyler will configure ${configuredProcessSummary} included in this quote.` : "",
      totalTylerConfiguredProcesses > 0
        ? `Each Tyler-configured ${includeEnvironmentalHealth ? "process" : "case type"} is estimated at 25 to 30 hours for definition, configuration, and validation.`
        : "",
      (geoRuleCount > 0 || automationEventCount > 0)
        ? `Tyler will be responsible for configuring ${geoRuleCount} Geo Rule(s) and ${automationEventCount} automation event(s). Automation events may include an Intelligent Object or Intelligent Automation Agent.`
        : "",
      aiProductToolsHours > 0
        ? `Implementation Consultant scope also includes ${formatHours(aiProductToolsHours)} hours for AI Product Tools.`
        : "",
      ...items
    ];
  }

  function buildClientResponsibilities(intro, items) {
    const clientProcessSummary = [
      clientOwnedProcesses > 0 ? `${clientOwnedProcesses} custom process(es)` : "",
      clientOwnedTemplatedProcesses > 0 ? `${clientOwnedTemplatedProcesses} templated process(es)` : ""
    ].filter(Boolean).join(" and ");
    return [
      clientProcessSummary ? `${intro} The client is expected to complete ${clientProcessSummary} included in this quote.` : intro,
      ...items
    ];
  }

  function formatAppolloQuoteListingRow(row, optional = false) {
    if (!row) {
      return "";
    }
    if (row.service === "Professional Implementation Services") {
      return `${row.service}: ${formatHours(row.hours)} hours${optional ? " (optional)" : ""}`;
    }
    if (row.service === "Data Conversion - Archive") {
      return `${row.service}: ${currency.format(row.value)}${row.rateBasis ? ` (${row.rateBasis})` : ""}${optional ? " (optional)" : ""}`;
    }
    if (row.service === "Archive DB Hosting Fee") {
      return `${row.service}: ${currency.format(row.value)}${optional ? " (optional)" : ""}`;
    }
    if (row.hours > 0) {
      return `${row.service}: ${formatHours(row.hours)} hours - ${currency.format(row.value)}${optional ? " (optional)" : ""}`;
    }
    return `${row.service}: ${currency.format(row.value)}${optional ? " (optional)" : ""}`;
  }

  const { requiredRows, optionalRows, requiredServicesValue } = getScopedServiceMetrics();
  if (deliveryModel.isAppollo) {
    const selectedSuites = selectedValues("suite");
    const businessManagementIncluded = selectedSuites.includes("business-management");
    const appolloNotes = [];
    appolloNotes.push("Investment Summary Notes");
    requiredRows
      .map((row) => formatAppolloQuoteListingRow(row))
      .filter(Boolean)
      .forEach((line) => appolloNotes.push(line));
    appolloNotes.push(`Total Services - ${currency.format(requiredServicesValue)}`);
    if (optionalRows.length) {
      appolloNotes.push("");
      appolloNotes.push("Optional:");
      optionalRows
        .map((row) => formatAppolloQuoteListingRow(row, true))
        .filter(Boolean)
        .forEach((line) => appolloNotes.push(line));
    }
    appolloNotes.push("");
    appolloNotes.push("The client has purchased the standard pre-configured version of Tyler's Enterprise Permitting and Licensing software, which includes commonly used case types, work classes, and reporting tools. This configuration supports GIS-driven permitting, planning, and code enforcement functionality, is sold by departmental function, and is designed to reduce implementation time and overall effort.");
    appolloNotes.push("");
    appolloNotes.push("The client is responsible for providing and maintaining all GIS services used by the Enterprise Permitting and Licensing and Civic Access applications. Tyler will supply deployment guidelines for these services.");
    appolloNotes.push("");
    appolloNotes.push("Tyler Responsibilities:");
    [
      "Training on EPL functionality included in the contracted modules",
      "Training, best practices, and configuration consultation for Civic Access",
      "Establishing EPL and Civic Access connections to client-published GIS services and configuring Live Link",
      "Establishing and validating the integration between Executive Insights and EPL",
      "Configuring and validating core EPL functionality, including global settings and initial user roles",
      "Configuring payments for EPL and Civic Access or enabling electronic payments based on client-supplied gateway information, as applicable",
      "Configuring client-provided business requirements, including fee schedules, inspections, reviews, hearings, meetings, violations, occupational taxes, non-GIS impact fees, and custom fields required for fee calculations",
      "Configuring Tyler standard Dynamic Reports",
      "Configuring and validating Tyler-to-Tyler integrations, including Incode Financials"
    ].forEach((item) => appolloNotes.push(`- ${item}`));
    appolloNotes.push("");
    appolloNotes.push("Client Responsibilities:");
    [
      "Providing requested documentation such as fee schedules, inspections, and violation definitions",
      "Adapting business processes to align with the delivered solution",
      "Managing ongoing user and role configuration",
      "Validating system configuration and data conversion results",
      "Configuring and administering Civic Access, including application availability, instructions, geo rules, themes, menus, and security settings",
      "Managing GL account administration within fee structures"
    ].forEach((item) => appolloNotes.push(`- ${item}`));
    appolloNotes.push("");
    appolloNotes.push("Pre-Configured Case Types:");
    appolloNotes.push(`The implementation leverages Tyler's pre-configured EPL case types across Building, Planning, Code Enforcement${businessManagementIncluded ? " and Business Management" : ""} modules. These case types share standardized workflow and custom field templates. Tyler will configure associated fees for all included case types.`);
    appolloNotes.push("");
    appolloNotes.push("Permissible modifications during implementation are limited to:");
    [
      "Building permits: Reviewers and inspection types",
      "Planning applications: Hearing names, meeting names, reviews, and notices",
      "Code enforcement: Violations, hearing names, and meeting names",
      businessManagementIncluded ? "Business Management: Fees, state specific data, meeting names" : null
    ].filter(Boolean).forEach((item) => appolloNotes.push(`- ${item}`));
    appolloNotes.push("Any case types not listed are considered out of scope and require formal change control.");
    appolloNotes.push("");
    appolloNotes.push("Building Permit Templates:");
    APPOLLO_BUILDING_TEMPLATES.forEach((item) => appolloNotes.push(`- ${item}`));
    appolloNotes.push("");
    appolloNotes.push("Planning Application Case Types:");
    APPOLLO_PLANNING_CASE_TYPES.forEach((item) => appolloNotes.push(`- ${item}`));
    appolloNotes.push("");
    appolloNotes.push("Code Enforcement Case Types:");
    APPOLLO_CODE_CASE_TYPES.forEach((item) => appolloNotes.push(`- ${item}`));
    appolloNotes.push("");
    if (businessManagementIncluded) {
      appolloNotes.push("Business Management Case Types:");
      APPOLLO_BUSINESS_CASE_TYPES.forEach((item) => appolloNotes.push(`- ${item}`));
      appolloNotes.push("");
    }
    appolloNotes.push("Archive Conversion:");
    appolloNotes.push("Archive conversion extracts legacy data from the client's prior system and delivers it in a secure, read-only format hosted outside of the EPL application. The archive structure may be organized according to client requirements. Any data requiring entry into the archive database must be manually entered by the client.");
    appolloNotes.push("");
    appolloNotes.push("Automation and Geo Rules:");
    appolloNotes.push("The client will select from Tyler's standard library of Automation Events and Geo Rules. Automation Events include Intelligent Objects and the Intelligent Automation Agent, which executes nightly processes to perform configured actions. Geo Rules are automation events triggered by conditions defined within the ESRI geodatabase.");
    appolloNotes.push("");
    appolloNotes.push("Additional Components:");
    [
      "Civic Access serves as the public-facing portal. Tyler will ensure system connectivity, payment configuration, and provide configuration training. The client is responsible for determining which applications and features are made available online.",
      "Enterprise Service Requests enables citizen-submitted service requests and code complaints. Tyler will configure and train client personnel and support go-live. The client must provide required GIS services.",
      "eReviews enables electronic plan review and markup and requires a separate Bluebeam Studio Prime subscription purchased by the client.",
      "Workforce Mobile applications support mobile inspections and enforcement. Tyler will assist with connectivity and testing."
    ].forEach((item) => appolloNotes.push(`- ${item}`));
    appolloNotes.push("");
    appolloNotes.push("Reporting:");
    appolloNotes.push("- No custom reports are included. The client will have access to Tyler standard reports and reporting tools. Custom reporting requests require change control.");
    appolloNotes.push("");
    appolloNotes.push("Training Included:");
    [
      "Solutions Orientation Training",
      "Solution Validation Training",
      "End User Training",
      "Optional Configuration Training"
    ].forEach((item) => appolloNotes.push(`- ${item}`));
    appolloNotes.push("");
    appolloNotes.push("Project Governance:");
    [
      "Delays caused by the client that extend the project timeline may require change control and additional fees.",
      "Cancellation with less than two weeks' notice may result in charges for unrecoverable costs and unused staff time.",
      "Implementation services are delivered in four- or eight-hour increments."
    ].forEach((item) => appolloNotes.push(`- ${item}`));
    appolloNotes.push("");
    appolloNotes.push("Security and Access:");
    appolloNotes.push("- The Public Administration Security Console allows Tyler Support controlled access to client environments using secure credentials.");
    if (optionalRows.length) {
      const hasOptionalConfigTraining = optionalRows.some((row) => row.service === "Post Go-Live Configuration Training");
      const optionalApolloConversionRow = optionalRows.find((row) => row.service === "Optional Full Conversion Services");
      if (hasOptionalConfigTraining) {
        appolloNotes.push("");
        appolloNotes.push("Optional Configuration Training Notes:");
        appolloNotes.push(`- ${CONFIG.notes.training[2]}`);
      }
      if (optionalApolloConversionRow) {
        const sourceMap = getConversionSources();
        const selectedModules = getSelectedConversionModules();
        appolloNotes.push("");
        appolloNotes.push("Optional Conversion Notes:");
        selectedModules.forEach((moduleId) => {
          const label = CONFIG.conversionModules.find((item) => item.id === moduleId)?.name.replace(/^EPL\s+/, "") || moduleId;
          const sourceCount = sourceMap[moduleId] || 0;
          if (sourceCount > 0) {
            appolloNotes.push(`- ${label}: ${sourceCount} source${sourceCount === 1 ? "" : "s"}.`);
          }
        });
        appolloNotes.push("- Full conversion services are quoted separately from the included archive conversion scope.");
      }
    }
    return appolloNotes.join("\n");
  }

  if (requiredRows.length || optionalRows.length) {
    notes.push("Investment Summary Notes");
    requiredRows
      .map(formatInvestmentSummaryRow)
      .filter(Boolean)
      .forEach((line) => notes.push(line));
    notes.push(`Total Services - ${currency.format(requiredServicesValue)}`);

    if (optionalRows.length) {
      notes.push("");
      notes.push("Optional:");
      optionalRows
        .map((row) => formatInvestmentSummaryRow(row, { optional: true }))
        .filter(Boolean)
        .forEach((line) => notes.push(line));
    }
  }

  addSection("Standard Notes", CONFIG.notes.standard);

  if (selectedAddons.some((addonId) => CONFIG.notes.addonSpecific[addonId])) {
    addSection(
      "Add-On Notes",
      selectedAddons
        .map((addonId) => CONFIG.notes.addonSpecific[addonId])
        .filter(Boolean)
    );
  }

  const addonServiceNotes = totals.addonServiceItems
    .filter((item) => item.hours > 0 || item.notes)
    .flatMap((item) => ([
      item.hours > 0 ? `${item.name} - ${formatHours(item.hours)} hours` : "",
      item.notes || ""
    ]));
  if (addonServiceNotes.length) {
    addSection("Add-On Service Notes", addonServiceNotes);
  }

  if (shouldIncludeGeneralImplementationNotes) {
    addSection("Implementation Notes", [buildImplementationIntro(CONFIG.notes.implementation.epl.intro)]);
    addSection("Tyler's Responsibilities", buildTylerResponsibilities(CONFIG.notes.implementation.epl.tyler));
    addSection("Client's Responsibilities", buildClientResponsibilities(
      CONFIG.notes.implementation.epl.clientIntro,
      CONFIG.notes.implementation.epl.client
    ));
  }

  if (includeIntegration || selectedAddons.some((addonId) => CONFIG.notes.integrations[addonId])) {
    const integrationItems = [
      CONFIG.notes.integrations.base[0],
      ...selectedAddons
        .map((addonId) => CONFIG.notes.integrations[addonId])
        .filter(Boolean)
    ];

    if (integrationNotesText) {
      integrationItems.push(`Quoted integration scope: ${integrationNotesText}`);
    } else {
      integrationItems.push(CONFIG.notes.integrations.base[1]);
    }

    addSection("Integration Notes", [
      ...integrationItems
    ]);
  } else {
    addSection("Integration Notes", [CONFIG.notes.integrations.base[1]]);
  }

  if (includeConversion) {
    addSection("Conversion Notes", [
      ...conversionSourceDetailNotes,
      totals.conversion.includeDataArchive ? "Data Archive is included and priced using the configured tier-based archive schedule plus the associated hosting fee." : "",
      totals.conversion.includeTcmConversion ? (totals.conversion.tcmPrice > 0
        ? "TCM conversion is included and priced using the configured tier-based TCM schedule."
        : "TCM conversion is selected, but pricing is not yet configured for the derived tier.") : "",
      conversionScopeType === "dct" ? CONFIG.notes.conversion.template : CONFIG.notes.conversion.full,
      conversionScopeType === "dct" ? CONFIG.notes.conversion.templatePasses : CONFIG.notes.conversion.fullPasses,
      CONFIG.notes.conversion.additional,
      CONFIG.notes.conversion.invoicing
    ]);
  } else {
    addSection("Conversion Notes", [CONFIG.notes.conversion.additional]);
  }

  if (includeReports) {
    addSection("Reporting Notes", [
      CONFIG.notes.reporting.customReports,
      CONFIG.notes.reporting.customForms
    ]);
  } else {
    addSection("Reporting Notes", [CONFIG.notes.reporting.none]);
  }

  const trainingOverview = [
    CONFIG.notes.training[0],
    CONFIG.notes.training[7]
  ];
  const trainingSectionItems = [...trainingOverview];
  const optionalServiceNotes = [];

  if (totals.solutionOrientationHours > 0) {
    trainingSectionItems.push(">> Solution Orientation");
    trainingSectionItems.push(CONFIG.notes.training[1]);
  }

  if (totals.configurationTrainingHours > 0 && !isServiceMarkedOptional("Configuration Training")) {
    trainingSectionItems.push(">> Configuration Training");
    trainingSectionItems.push(CONFIG.notes.training[2]);
  }

  if (totals.solutionValidationHours > 0) {
    trainingSectionItems.push(">> Solution Validation");
    trainingSectionItems.push(CONFIG.notes.training[3]);
  }

  if (includeSystemAdminTraining && !isServiceMarkedOptional("System Administrator Training")) {
    trainingSectionItems.push(">> System Administrator Training");
    trainingSectionItems.push(CONFIG.notes.training[4]);
  }

  if (includeTrainTheTrainer && !isServiceMarkedOptional("Train the Trainer")) {
    trainingSectionItems.push(">> Train the Trainer");
    trainingSectionItems.push(CONFIG.notes.training[5]);
  }

  if (totals.endUserTrainingHours > 0 && !includeTrainTheTrainer && !isServiceMarkedOptional("End User Training")) {
    trainingSectionItems.push(">> End User Training");
    trainingSectionItems.push(CONFIG.notes.training[6]);
  }

  if (
    totals.solutionOrientationHours > 0 ||
    totals.configurationTrainingHours > 0 ||
    totals.solutionValidationHours > 0 ||
    totals.systemAdminTrainingHours > 0 ||
    totals.trainTheTrainerHours > 0 ||
    totals.endUserTrainingHours > 0
  ) {
    addSection("Training Overview", trainingSectionItems);
  }

  if (includeChangeManagement) {
    addSection("Change Management Notes", CONFIG.notes.changeManagement);
  }

  if (isServiceMarkedOptional("Configuration Training")) {
    optionalServiceNotes.push(">> Configuration Training");
    optionalServiceNotes.push(CONFIG.notes.training[2]);
  }
  if (isServiceMarkedOptional("System Administrator Training")) {
    optionalServiceNotes.push(">> System Administrator Training");
    optionalServiceNotes.push(CONFIG.notes.training[4]);
  }
  if (isServiceMarkedOptional("Train the Trainer")) {
    optionalServiceNotes.push(">> Train the Trainer");
    optionalServiceNotes.push(CONFIG.notes.training[5]);
  }
  if (isServiceMarkedOptional("End User Training")) {
    optionalServiceNotes.push(">> End User Training");
    optionalServiceNotes.push(CONFIG.notes.training[6]);
  }

  getOptionalServiceRows().forEach((row) => {
    if (row.notes) {
      optionalServiceNotes.push(`>> ${row.service}`);
      optionalServiceNotes.push(row.notes);
    }
  });

  if (optionalServiceNotes.length) {
    addSection("Optional Services", optionalServiceNotes);
  }

  return notes.join("\n");
}

function generateSummary() {
  const cityName = els.cityName.value.trim() || "Unnamed opportunity";
  const quoteType = getSelectedOptionText(els.quoteType, "Full Implementation Project");
  const salesRep = els.salesRep.value.trim() || "Not entered";
  const departments = els.departments?.value.trim() || "Not entered";
  const clientType = getSelectedOptionText(els.clientType, "City");
  const projectLength = (Number(els.goLiveTarget.value) || 0) > 0
    ? `${Number(els.goLiveTarget.value) || 0} month(s)`
    : "Not entered";
  const users = Number(els.userCount.value) || 0;
  const population = Number(els.populationValue.value) || 0;
  const suites = getSuiteNames();
  const addons = getAddonNames();
  const scope = getScopeSelections();
  const conversionModules = getConversionModuleNames();
  const totals = calculateServiceTotals();
  const trainingPlan = getTrainingPlan();
  const conversion = totals.conversion;
  const addonServiceSummary = totals.addonServiceItems
    .filter((item) => item.hours > 0)
    .map((item) => `${item.name}: ${formatHours(item.hours)} hours`)
    .join("; ");
  const notes = els.internalNotes.value.trim() || "None entered";
  const integrationNotes = els.integrationNotes.value.trim() || "None entered";
  const reportsNotes = els.reportsNotes.value.trim() || "None entered";
  const processCounts = getEffectiveProcessCounts();

  return [
    `Quote type: ${quoteType}`,
    `Quote number: ${els.quoteNumber.value.trim() || "Not entered"}`,
    `Quote version: ${els.quoteVersion.value.trim() || "Not entered"}`,
    `City / County: ${cityName}`,
    `Entity type: ${clientType}`,
    `Sales resource: ${salesRep}`,
    `Departments: ${departments}`,
    `Project length: ${projectLength}`,
    `Users: ${users}`,
    `Population: ${population.toLocaleString("en-US")}`,
    `Derived population tier: ${document.querySelector("#includeConversion")?.checked ? conversion.tier : "Not applicable"}`,
    `Pricing tier used: ${document.querySelector("#includeConversion")?.checked ? conversion.pricedTier : "Not applicable"}`,
    `Service delivery model: ${processCounts.deliveryModel.label}`,
    `Tyler owned custom processes: ${processCounts.tylerCustom}`,
    `Client owned custom processes: ${processCounts.clientCustom}`,
    `Tyler owned templated processes: ${processCounts.tylerTemplated}`,
    `Client owned templated processes: ${processCounts.clientTemplated}`,
    `AI Product Tools hours: ${formatHours(totals.aiProductToolsHours)}`,
    `Modules: ${suites.length ? suites.join(", ") : "None selected"}`,
    `Selected add-ons: ${addons.length ? addons.join(", ") : "None selected"}`,
    `Add-on scoped hours: ${addonServiceSummary || "None configured"}`,
    `Services in scope: ${scope.length ? scope.join(", ") : "None selected"}`,
    `Integration notes: ${document.querySelector("#includeIntegration")?.checked ? integrationNotes : "Not applicable"}`,
    `Reporting notes: ${document.querySelector("#includeReports")?.checked ? reportsNotes : "Not applicable"}`,
    `Custom forms / letters: ${totals.customFormsCount}`,
    `Custom reports: ${totals.customReportsCount}`,
    `Report hours: ${document.querySelector("#includeReports")?.checked ? formatHours(totals.reportHours) : "Not applicable"}`,
    `Reporting estimate: ${document.querySelector("#includeReports")?.checked ? currency.format(totals.reportsPrice) : "Not applicable"}`,
    `Conversion type: ${document.querySelector("#includeConversion")?.checked ? (els.conversionScopeType?.options?.[els.conversionScopeType.selectedIndex]?.text || "DCT") : "Not applicable"}`,
    `Include Data Archive: ${document.querySelector("#includeConversion")?.checked ? (totals.conversion.includeDataArchive ? "Yes" : "No") : "Not applicable"}`,
    `Include TCM Conversion: ${document.querySelector("#includeConversion")?.checked ? (totals.conversion.includeTcmConversion ? "Yes" : "No") : "Not applicable"}`,
    `Conversion modules: ${conversionModules.length ? conversionModules.join(", ") : "None selected"}`,
    `Conversion fixed-fee total: ${document.querySelector("#includeConversion")?.checked ? currency.format(totals.conversion.totalBeforePm) : "Not applicable"}`,
    `Integration support price: ${document.querySelector("#includeIntegration")?.checked ? currency.format(totals.integrationSupportPrice) : "Not applicable"}`,
    `Integration support hours: ${document.querySelector("#includeIntegration")?.checked ? formatHours(totals.integrationSupportHours) : "Not applicable"}`,
    `Integration development price: ${document.querySelector("#includeIntegration")?.checked ? currency.format(totals.integrationDevelopmentPrice) : "Not applicable"}`,
    `Integration development hours: ${document.querySelector("#includeIntegration")?.checked ? formatHours(totals.integrationDevelopmentHours) : "Not applicable"}`,
    `Implementation consultant hours: ${formatHours(totals.implementationConsultantHours)}`,
    `Configuration training hours: ${trainingPlan.trainingIncluded ? formatHours(totals.configurationTrainingHours) : "Not applicable"}`,
    ...(trainingPlan.systemAdminTrainingSelected ? [`System administrator training hours: ${formatHours(totals.systemAdminTrainingHours)}`] : []),
    ...(trainingPlan.trainTheTrainerSelected ? [`Train the trainer hours: ${formatHours(totals.trainTheTrainerHours)}`] : []),
    `End user training hours: ${trainingPlan.trainingIncluded && !trainingPlan.trainTheTrainerSelected ? formatHours(totals.endUserTrainingHours) : "Not applicable"}`,
    `Production support hours: ${trainingPlan.trainingIncluded ? formatHours(totals.productionSupportHours) : "Not applicable"}`,
    `IC hours: ${formatHours(totals.icHours)}`,
    `PM hours: ${formatHours(totals.pmHours)}`,
    `Total services hours: ${formatHours(totals.totalHours)}`,
    `Total services value: ${currency.format(totals.totalValue)}`,
    `Estimated travel: ${document.querySelector("#includeTravel")?.checked ? currency.format(totals.travelEstimate) : "Not applicable"}`,
    `Internal scoping notes: ${notes}`
  ].join("\n");
}

function updateStepper() {
  const isAddonOnly = els.quoteType.value === "addon-only";
  const visibleKeys = getVisibleStepKeys();
  const stepOverrides = {
    client: {
      title: "Client Information",
      description: "Start with the quote type, client profile, and the core opportunity details."
    },
    modules: {
      title: isAddonOnly ? "Existing Module Context" : "Module Scope",
      description: isAddonOnly
        ? "Identify the current Tyler module footprint and any services that support the add-on."
        : "Select the EPL modules and in-scope services for the opportunity."
    },
    delivery: {
      title: "Conversions, Reports & Integrations",
      description: "Review integration, reporting, and conversion details only for the services selected in module scope."
    },
    "sales-quote": {
      title: "Sales Quote Entry",
      description: "Enter quoted service lines in table format and let the pricer refresh notes and totals automatically."
    },
    addons: {
      title: isAddonOnly ? "Add-On Request" : "Add-On Scope",
      description: isAddonOnly
        ? "Choose the add-on being requested and capture any implementation notes."
        : "Choose add-ons and capture internal scoping notes."
    },
    conversion: {
      title: isAddonOnly ? "Add-On Conversion Review" : "Conversion Review",
      description: isAddonOnly
        ? "Review whether any conversion work applies to this add-on request."
        : "Review conversion pricing inputs and the estimated conversion amount."
    }
  };

  if (!visibleKeys.includes(visibleKeys[state.activeStep])) {
    state.activeStep = 0;
  }

  els.stepLinks.forEach((button) => {
    const key = button.dataset.stepKey;
    const visibleIndex = visibleKeys.indexOf(key);
    const isVisible = visibleIndex !== -1;
    button.classList.toggle("hidden-step", !isVisible);
    button.classList.toggle("active", visibleIndex === state.activeStep);
    if (isVisible) {
      const label = stepOverrides[key] || CONFIG.stepDefinitions[key];
      const textNode = button.querySelector(".step-text");
      const indexNode = button.querySelector(".step-index");
      if (textNode) {
        textNode.textContent = label.title.replace(" And Population", "");
      }
      if (indexNode) {
        indexNode.textContent = String(visibleIndex + 1);
      }
    }
  });

  els.stepPanels.forEach((panel) => {
    const key = panel.dataset.stepKey;
    const visibleIndex = visibleKeys.indexOf(key);
    panel.classList.toggle("active", visibleIndex === state.activeStep);
  });

  const activeKey = visibleKeys[state.activeStep];
  const step = stepOverrides[activeKey] || CONFIG.stepDefinitions[activeKey];
  els.activeStepTitle.textContent = step.title;
  els.activeStepDescription.textContent = step.description;
  els.prevStep.disabled = state.activeStep === 0;
  els.nextStep.textContent = state.activeStep === visibleKeys.length - 1 ? "Finish" : "Next";
}

function calculate() {
  syncQuoteTypeFromDeliveryModel();
  syncAppolloPackageState();
  syncSharedProcessInputs();
  const isAddonOnly = els.quoteType.value === "addon-only";
  const suites = getSuiteNames();
  const addons = getAddonNames();
  const trainingPlan = getTrainingPlan();
  const deliveryModel = getServiceDeliveryModelConfig(els.serviceDeliveryModel?.value);
  const esrSelected = selectedValues("addon").includes("enterprise-service-requests");

  els.sharedServicesBreakdownField?.classList.toggle("hidden-step", !deliveryModel.isShared);
  els.esrCaseTypeCountField?.classList.toggle("hidden-step", !esrSelected);

  const trainingToggle = document.querySelector("#includeTraining");
  if (trainingToggle) {
    trainingToggle.checked = trainingPlan.trainingIncluded;
    trainingToggle.disabled = false;
  }
  if (els.endUserTrainingHours) {
    els.endUserTrainingHours.readOnly = false;
    if (trainingPlan.isFullImplementation && !els.endUserTrainingHours.value.trim()) {
      els.endUserTrainingHours.value = String(trainingPlan.endUserTrainingHours);
    }
  }

  const scope = getScopeSelections();
  const totals = calculateServiceTotals();
  const scopedMetrics = getScopedServiceMetrics();
  updateSuiteRequirementState(false);
  renderOptionalServiceSummary();
  const locationLabel = [els.cityName.value.trim(), (els.stateName?.value || "").trim().toUpperCase()].filter(Boolean).join(", ");

  els.suiteCount.textContent = String(suites.length);
  els.suiteSummary.textContent = suites.join(", ") || "None selected";
  els.selectedAddonCount.textContent = String(addons.length);
  els.addonSummary.textContent = addons.join(", ") || "None selected";
  els.serviceScopeCount.textContent = String(scope.length);
  els.serviceScopeSummary.textContent = scope.join(", ") || "None selected";
  if (els.heroScopedServices) {
    els.heroScopedServices.textContent = String(scope.length);
  }
  if (els.heroModulesSelected) {
    els.heroModulesSelected.textContent = String(suites.length);
  }
  if (els.heroAddonsSelected) {
    els.heroAddonsSelected.textContent = String(addons.length);
  }
  renderAnalyticsDashboard();
  els.quoteTitle.textContent = buildQuoteDisplayTitle(locationLabel);
  els.summarySalesRep.textContent = els.salesRep.value.trim() || "Not entered";
  els.summaryClientType.textContent = getSelectedOptionText(els.clientType, "City");
  els.summaryUsers.textContent = String(Number(els.userCount.value) || 0);
  if (els.summaryDepartments) {
    els.summaryDepartments.textContent = els.departments?.value.trim() || "Not entered";
  }
  els.summaryGoLive.textContent = (Number(els.goLiveTarget.value) || 0) > 0
    ? `${Number(els.goLiveTarget.value) || 0} month(s)`
    : "Not entered";
  els.workspaceCustomer.textContent = locationLabel || "No customer entered";
  els.workspaceSalesRep.textContent = `Sales Rep: ${els.salesRep.value.trim() || "Not entered"}`;
  els.workspaceUsers.textContent = `Users: ${Number(els.userCount.value) || 0}`;
  els.workspaceModules.textContent = `Modules Purchased: ${suites.join(", ") || "None selected"}`;
  els.navCityName.textContent = locationLabel || "No city entered";
  els.navModules.textContent = suites.join(", ") || "No modules selected";
  els.navAddons.textContent = addons.join(", ") || "No add-ons selected";
  syncTopSummaryWithScope(scopedMetrics, totals);
  renderSalesQuoteEntry(totals);
  setOutputText(els.overrideAuditTrail, getOverrideAuditTrail());
  els.integrationBlock?.classList.toggle("hidden-step", !document.querySelector("#includeIntegration")?.checked);
  els.reportsBlock?.classList.toggle("hidden-step", !document.querySelector("#includeReports")?.checked);
  els.trainingSupportBlock?.classList.toggle("hidden-step", !trainingPlan.trainingIncluded);
  els.conversionBlock?.classList.toggle("hidden-step", !document.querySelector("#includeConversion")?.checked);
  setOutputText(els.quoteSummary, generateSummary());
  setOutputText(els.quoteNotes, getQuoteNotes());
  renderServiceSummary();
  els.quoteTypeCallout.innerHTML = isAddonOnly
    ? "<h3>Add-On Only</h3><p>This path is for a simpler quote where the client is only adding a component or add-on to an existing footprint.</p>"
    : "<h3>Full Implementation Project</h3><p>This path is for a broader EPL engagement with modules, implementation planning, add-ons, and conversion review.</p>";
  updateStepper();
}

async function copySummary() {
  try {
    await navigator.clipboard.writeText([
      "Opportunity Snapshot",
      els.quoteSummary.value,
      "",
      "Override Audit Trail",
      els.overrideAuditTrail?.value || "No admin overrides applied",
      "",
      "Investment Summary Notes",
      els.quoteNotes.value
    ].join("\n"));
    els.copySummary.textContent = "Copied";
    setTimeout(() => {
      els.copySummary.textContent = "Copy Summary";
    }, 1500);
  } catch (error) {
    els.copySummary.textContent = "Copy Failed";
    setTimeout(() => {
      els.copySummary.textContent = "Copy Summary";
    }, 1500);
  }
}

function goToStep(index) {
  const visibleKeys = getVisibleStepKeys();
  state.activeStep = Math.max(0, Math.min(index, visibleKeys.length - 1));
  updateStepper();
}

async function initialize() {
  renderCheckboxOptions(els.suiteOptions, CONFIG.suites, "suite");
  renderCheckboxOptions(els.addonOptions, CONFIG.addons, "addon");

  document.body.addEventListener("input", calculate);
  document.body.addEventListener("change", calculate);
  els.serviceDeliveryModel?.addEventListener("change", (e) => {
    console.log('Service Delivery Model changed to:', e.target.value);
    syncQuoteTypeFromDeliveryModel();
    syncSharedProcessInputs();
    applyQuoteTypeDefaults();
    calculate();

    // Force show/hide shared services breakdown field
    const deliveryModel = getServiceDeliveryModelConfig(e.target.value);
    if (els.sharedServicesBreakdownField) {
      if (deliveryModel.isShared) {
        els.sharedServicesBreakdownField.classList.remove('hidden-step');
        console.log('Showing shared services breakdown field');
      } else {
        els.sharedServicesBreakdownField.classList.add('hidden-step');
      }
    }
  });
  els.sharedServicesBreakdown?.addEventListener("change", () => {
    syncSharedProcessInputs();
    calculate();
  });
  els.useSalesQuoteEntry?.addEventListener("change", () => {
    calculate();
  });

  [
    els.salesQuoteServiceDeliveryModel,
    els.salesQuoteSharedServicesBreakdown,
    els.salesQuoteTylerOwnedProcesses,
    els.salesQuoteClientOwnedProcesses,
    els.salesQuoteTylerOwnedTemplatedProcesses,
    els.salesQuoteClientOwnedTemplatedProcesses,
    els.salesQuoteImplementationHours,
    els.salesQuoteCommunitySources,
    els.salesQuoteBusinessSources,
    els.salesQuoteEnvironmentalSources,
    els.salesQuoteCustomFormsCount,
    els.salesQuoteCustomReportsCount,
    els.salesQuoteReportHours,
    els.salesQuoteIntegrationSupportHours,
    els.salesQuoteIntegrationDevelopmentHours,
    els.salesQuoteConfigurationTrainingHours,
    els.salesQuoteSystemAdminHours,
    els.salesQuoteTrainTheTrainerHours,
    els.salesQuoteEndUserTrainingHours,
    els.salesQuoteProductionSupportHours,
    els.salesQuotePmHours
  ].filter(Boolean).forEach((input) => {
    input.addEventListener("input", () => {
      syncSalesQuoteEntryToForm();
      calculate();
    });
    input.addEventListener("change", () => {
      syncSalesQuoteEntryToForm();
      calculate();
    });
  });
  els.applySalesQuoteEntry?.addEventListener("click", () => {
    applySalesQuoteEntry();
  });

  els.stepLinks.forEach((button) => {
    button.addEventListener("click", () => {
      const visibleKeys = getVisibleStepKeys();
      const index = visibleKeys.indexOf(button.dataset.stepKey);
      if (index !== -1) {
        if (index > visibleKeys.indexOf("modules") && !hasSelectedSuites()) {
          goToStep(1);
          updateSuiteRequirementState(true);
          if (els.saveStatus) {
            els.saveStatus.classList.add("error");
            els.saveStatus.textContent = "Select at least one module or suite before continuing.";
          }
          return;
        }
        goToStep(index);
      }
    });
  });

  els.prevStep.addEventListener("click", () => {
    goToStep(state.activeStep - 1);
  });

  els.nextStep.addEventListener("click", () => {
    const visibleKeys = getVisibleStepKeys();
    if (visibleKeys[state.activeStep] === "client" && !hasSelectedSuites()) {
      goToStep(1);
      updateSuiteRequirementState(true);
      if (els.saveStatus) {
        els.saveStatus.classList.add("error");
        els.saveStatus.textContent = "Select at least one module or suite before continuing.";
      }
      return;
    }
    if (state.activeStep < visibleKeys.length - 1) {
      goToStep(state.activeStep + 1);
    }
  });

  els.selectAllSuites.addEventListener("click", () => {
    document.querySelectorAll('input[name="suite"]').forEach((input) => {
      input.checked = true;
    });
    calculate();
  });

  els.selectCommonAddons.addEventListener("click", () => {
    CONFIG.commonAddonIds.forEach((id) => {
      const input = document.querySelector(`input[name="addon"][value="${id}"]`);
      if (input) {
        input.checked = true;
      }
    });
    calculate();
  });

  els.fillSourcesOne.addEventListener("click", () => {
    els.sourcesCommunityDevelopment.value = "1";
    els.sourcesBusinessManagement.value = "1";
    els.sourcesEnvironmentalHealth.value = "1";
    calculate();
  });

  els.copySummary.addEventListener("click", copySummary);
  els.newQuote?.addEventListener("click", () => {
    startNewQuote();
  });
  els.saveQuote?.addEventListener("click", () => {
    saveCurrentQuote();
  });
  els.saveAsQuote?.addEventListener("click", async () => {
    state.loadedQuoteId = null;
    await saveCurrentQuote();
  });
  const handleSaveRequirementInput = () => {
    const requirementState = updateCurrentUserRequirementState(false);
    const statusText = els.saveStatus?.textContent || "";
    if (
      requirementState.canSave
      && statusText.startsWith("Save blocked: enter ")
    ) {
      els.saveStatus.classList.remove("error");
      els.saveStatus.textContent = "Client Name and Current User entered. You can save this quote.";
    }
  };
  els.currentUser?.addEventListener("input", handleSaveRequirementInput);
  els.cityName?.addEventListener("input", handleSaveRequirementInput);
  els.serviceSummaryBody?.addEventListener("click", handleServiceOptionalToggle, true);
  els.serviceSummaryBody?.addEventListener("input", handleServiceOptionalToggle, true);
  els.serviceSummaryBody?.addEventListener("change", handleServiceOptionalToggle, true);
  els.serviceSummaryBody?.addEventListener("input", handleServiceSplitInput, true);
  els.serviceSummaryBody?.addEventListener("change", handleServiceSplitInput, true);
  els.openQuoteLibrary?.addEventListener("click", openQuoteLibrary);
  els.selectArchiveFolder?.addEventListener("click", () => {
    chooseArchiveDirectory();
  });
  els.closeQuoteLibrary?.addEventListener("click", closeQuoteLibrary);
  els.quoteLibraryModal?.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.closeLibrary === "true") {
      closeQuoteLibrary();
    }
  });
  els.savedQuoteSearch?.addEventListener("input", renderSavedQuotes);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeQuoteLibrary();
    }
  });
  els.exportJson?.addEventListener("click", exportJson);
  els.importJsonButton?.addEventListener("click", () => els.importJsonInput?.click());
  els.importJsonInput?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) {
      importJsonFile(file);
    }
  });
  els.uploadQuoteReviewButton?.addEventListener("click", () => els.quoteReviewInput?.click());
  els.quoteReviewInput?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) {
      importQuoteReviewFile(file);
    }
  });
  els.analyzeUploadedQuote?.addEventListener("click", runQuoteVarianceReview);
  els.applyReviewedQuoteToForm?.addEventListener("click", applyReviewedQuoteToForm);
  els.buildTargetGuidance?.addEventListener("click", () => {
    setOutputText(els.quoteReviewRecommendations, buildAdjustmentGuidance());
  });
  els.applyTargetGuidanceToQuote?.addEventListener("click", () => {
    applyTargetGuidanceToQuote();
  });
  els.exportWord?.addEventListener("click", exportWordDoc);
  els.exportPdf?.addEventListener("click", exportPdf);
  els.addOptionalItem?.addEventListener("click", () => {
    const items = getOptionalQuoteItems();
    items.push(createOptionalQuoteItem());
    renderOptionalQuoteItems(items);
    calculate();
  });
  document.querySelectorAll("[data-optional-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      const items = getOptionalQuoteItems();
      items.push(buildOptionalPresetItem(button.dataset.optionalPreset || ""));
      renderOptionalQuoteItems(items);
      calculate();
    });
  });
  els.optionalItemsContainer?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.dataset.removeOptionalItem) {
      const items = getOptionalQuoteItems().filter((item) => item.id !== target.dataset.removeOptionalItem);
      renderOptionalQuoteItems(items);
      calculate();
    }
  });
  els.optionalItemsContainer?.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const card = target.closest("[data-optional-item-id]");
    if (card instanceof HTMLElement) {
      updateOptionalItemCardState(card);
    }
  });
  els.optionalItemsContainer?.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const card = target.closest("[data-optional-item-id]");
    if (card instanceof HTMLElement) {
      updateOptionalItemCardState(card);
    }
  });

  [
    els.tylerOwnedProcesses,
    els.clientOwnedProcesses,
    els.tylerOwnedTemplatedProcesses,
    els.clientOwnedTemplatedProcesses,
    els.userCount,
    els.sourcesCommunityDevelopment,
    els.sourcesBusinessManagement,
    els.sourcesEnvironmentalHealth,
    els.integrationSupportPrice,
    els.integrationDevelopmentPrice,
    els.customFormsCount,
    els.customReportsCount,
    els.reportHours,
    els.solutionOrientationHours,
    els.solutionValidationHours,
    els.configurationTrainingHours,
    els.endUserTrainingHours,
    els.productionSupportHours
  ].forEach((input) => {
    input?.addEventListener("input", clearImportedQuoteOverrides);
  });

  [els.tylerOwnedProcesses, els.tylerOwnedTemplatedProcesses].forEach((input) => {
    input?.addEventListener("input", syncSharedProcessInputs);
  });

  [
    "#includeConversion",
    "#includeIntegration",
    "#includeReports",
    "#includeTraining",
    "#includeTravel",
    "#includeFixedFeeUplift"
  ].forEach((selector) => {
    document.querySelector(selector)?.addEventListener("change", clearImportedQuoteOverrides);
  });

  closeQuoteLibrary();
  state.loadedQuoteId = null;
  applyFormState(createEmptyQuoteState());
  setOutputText(els.quoteHistory, "No quote history yet");
  setOutputText(els.quoteReviewResults, "Upload or paste a quote and click Analyze Quote Variance to review service gaps.");
  setOutputText(els.quoteReviewRecommendations, "Add a target value and assumptions, then click Build Target Guidance.");
  renderSavedQuotes();
  await restoreArchiveDirectory();
  updateCurrentUserRequirementState(false);
  updateStepper();
  calculate();
}

initialize();

window.runQuoteVarianceReview = runQuoteVarianceReview;
window.exportPdfQuote = exportPdf;
window.exportWordQuote = exportWordDoc;
window.startNewQuoteNow = startNewQuote;

// ========== QUICK WINS FEATURES ==========

// 1. Dark Mode Toggle
function initDarkMode() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleDarkMode() {
  const current = document.documentElement.getAttribute('data-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

window.toggleDarkMode = toggleDarkMode;

// 2. Print Function
function printQuote() {
  window.print();
}

window.printQuote = printQuote;

// 3. Copy to Clipboard
function copyToClipboard(text, buttonElement) {
  navigator.clipboard.writeText(text).then(() => {
    if (buttonElement) {
      buttonElement.classList.add('copied');
      buttonElement.textContent = 'Copied!';
      setTimeout(() => {
        buttonElement.classList.remove('copied');
        buttonElement.textContent = 'Copy';
      }, 2000);
    }
  }).catch(err => {
    console.error('Failed to copy:', err);
    alert('Failed to copy to clipboard');
  });
}

function addCopyButtons() {
  const textareas = document.querySelectorAll('textarea[readonly]');
  textareas.forEach(textarea => {
    if (textarea.id && !document.querySelector(`[data-copy-for="${textarea.id}"]`)) {
      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';

      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-btn';
      copyBtn.textContent = 'Copy';
      copyBtn.type = 'button';
      copyBtn.setAttribute('data-copy-for', textarea.id);
      copyBtn.style.position = 'absolute';
      copyBtn.style.top = '8px';
      copyBtn.style.right = '8px';
      copyBtn.style.zIndex = '10';

      copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        copyToClipboard(textarea.value, copyBtn);
      });

      textarea.parentNode.insertBefore(wrapper, textarea);
      wrapper.appendChild(textarea);
      wrapper.appendChild(copyBtn);
    }
  });
}

window.copyToClipboard = copyToClipboard;

// Initialize dark mode and copy buttons
initDarkMode();
setTimeout(addCopyButtons, 500);

// ========== COLLABORATION & SHARING FEATURES ==========

// Generate shareable link
function generateShareableLink() {
  const quoteData = captureFormState();
  const compressed = btoa(JSON.stringify(quoteData));
  const shareUrl = `${window.location.origin}${window.location.pathname}?share=${encodeURIComponent(compressed)}`;

  copyToClipboard(shareUrl);
  alert('Shareable link copied to clipboard!\n\nAnyone with this link can view and edit this quote.');
  return shareUrl;
}

// Load quote from URL parameter
function loadSharedQuote() {
  const urlParams = new URLSearchParams(window.location.search);
  const shareData = urlParams.get('share');

  if (shareData) {
    try {
      const decompressed = JSON.parse(atob(decodeURIComponent(shareData)));
      applyFormState(decompressed);
      calculate();
      alert('Quote loaded from shared link!');
      // Remove the share parameter from URL without reloading
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (e) {
      console.error('Failed to load shared quote:', e);
      alert('Failed to load shared quote. The link may be invalid or corrupted.');
    }
  }
}

// Export to Email
function exportToEmail() {
  const quoteData = captureFormState();
  const cityName = quoteData.cityName || 'Unnamed Client';
  const quoteNumber = quoteData.quoteNumber || 'No Quote Number';

  const subject = `Tyler EPL Sales Quote - ${cityName} (${quoteNumber})`;

  const body = `Hi,

Please review the Tyler EPL Sales quote for ${cityName}.

Quote Number: ${quoteNumber}
Client: ${cityName}
State: ${quoteData.stateName || 'Not specified'}
Users: ${quoteData.userCount || 0}
Sales Rep: ${quoteData.salesRep || 'Not specified'}

Modules Selected:
${quoteData.selectedSuites?.map(s => `- ${s}`).join('\n') || 'None'}

Add-Ons Selected:
${quoteData.selectedAddons?.map(a => `- ${a}`).join('\n') || 'None'}

View and edit this quote online:
${window.location.origin}${window.location.pathname}

Best regards`;

  const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
}

window.generateShareableLink = generateShareableLink;
window.exportToEmail = exportToEmail;

// Load shared quote on page load
setTimeout(loadSharedQuote, 1000);

// ========== QUOTE TEMPLATES & PRESETS ==========

// Save current quote as template
function saveAsTemplate() {
  const templateName = prompt('Enter a name for this template:');
  if (!templateName) return;

  const quoteData = captureFormState();
  const template = {
    name: templateName,
    data: quoteData,
    createdAt: new Date().toISOString()
  };

  const templates = JSON.parse(localStorage.getItem('quoteTemplates') || '[]');
  templates.push(template);
  localStorage.setItem('quoteTemplates', JSON.stringify(templates));

  alert(`Template "${templateName}" saved successfully!`);
  renderTemplatesList();
}

// Load template
function loadTemplate(templateName) {
  const templates = JSON.parse(localStorage.getItem('quoteTemplates') || '[]');
  const template = templates.find(t => t.name === templateName);

  if (template) {
    applyFormState(template.data);
    calculate();
    alert(`Template "${templateName}" loaded!`);
  }
}

// Delete template
function deleteTemplate(templateName) {
  if (!confirm(`Delete template "${templateName}"?`)) return;

  const templates = JSON.parse(localStorage.getItem('quoteTemplates') || '[]');
  const filtered = templates.filter(t => t.name !== templateName);
  localStorage.setItem('quoteTemplates', JSON.stringify(filtered));

  alert(`Template "${templateName}" deleted.`);
  renderTemplatesList();
}

// Render templates list
function renderTemplatesList() {
  const container = document.getElementById('templatesList');
  if (!container) return;

  const templates = JSON.parse(localStorage.getItem('quoteTemplates') || '[]');

  if (templates.length === 0) {
    container.innerHTML = '<p class="mini-muted">No templates saved yet</p>';
    return;
  }

  container.innerHTML = templates.map(t => `
    <div class="template-item">
      <div>
        <strong>${t.name}</strong>
        <small>${new Date(t.createdAt).toLocaleDateString()}</small>
      </div>
      <div>
        <button class="ghost-button" onclick="loadTemplate('${t.name}')">Load</button>
        <button class="ghost-button" onclick="deleteTemplate('${t.name}')">Delete</button>
      </div>
    </div>
  `).join('');
}

// Quick-start presets
const PRESETS = {
  'standard-city': {
    name: 'Standard City Implementation',
    cityName: 'City of Example',
    stateName: 'TX',
    clientType: 'city',
    userCount: 50,
    populationValue: 75000,
    goLiveTarget: 12,
    serviceDeliveryModel: 'shared',
    sharedServicesBreakdown: '70-30',
    selectedSuites: ['community-development'],
    selectedAddons: ['civic-access', 'ereviews'],
    includeImplementation: true,
    includeTraining: true,
    includeConversion: true,
    includeIntegration: false,
    includeReports: true,
    includeTravel: true
  },
  'county-addon': {
    name: 'County Add-On Only',
    cityName: 'Example County',
    stateName: 'TX',
    clientType: 'county',
    userCount: 25,
    populationValue: 150000,
    goLiveTarget: 6,
    serviceDeliveryModel: 'addon-work',
    selectedSuites: [],
    selectedAddons: ['decision-engine', 'workforce-mobile'],
    includeImplementation: true,
    includeTraining: true,
    includeConversion: false,
    includeIntegration: false,
    includeReports: false,
    includeTravel: false
  },
  'full-implementation': {
    name: 'Full Implementation - All Modules',
    cityName: 'City of Full Services',
    stateName: 'CA',
    clientType: 'city',
    userCount: 100,
    populationValue: 200000,
    goLiveTarget: 18,
    serviceDeliveryModel: 'full',
    selectedSuites: ['community-development', 'business-management', 'environmental-health'],
    selectedAddons: ['civic-access', 'ereviews', 'decision-engine', 'workforce-mobile', 'content-manager'],
    includeImplementation: true,
    includeTraining: true,
    includeConversion: true,
    includeIntegration: true,
    includeReports: true,
    includeTravel: true
  }
};

function applyPreset(presetKey) {
  const preset = PRESETS[presetKey];
  if (!preset) return;

  applyFormState(preset);
  calculate();
  alert(`Preset "${preset.name}" applied!`);
}

window.saveAsTemplate = saveAsTemplate;
window.loadTemplate = loadTemplate;
window.deleteTemplate = deleteTemplate;
window.applyPreset = applyPreset;

// Initialize templates list
setTimeout(renderTemplatesList, 1000);

// ========== ENHANCED ANALYTICS DASHBOARD ==========

// Get all saved quotes for analytics
function getAllQuotesForAnalytics() {
  const quotes = JSON.parse(localStorage.getItem('savedQuotes') || '[]');
  return quotes.map(q => ({
    ...q,
    createdDate: q.createdAt ? new Date(q.createdAt) : new Date(),
    totalValue: calculateQuoteValue(q),
    modules: q.selectedSuites || [],
    addons: q.selectedAddons || []
  }));
}

// Calculate quote value from quote data
function calculateQuoteValue(quoteData) {
  // Simplified calculation - you may want to use the full calculate() logic
  const baseHours = (quoteData.implementationHours || 0) + (quoteData.pmHours || 0);
  const rate = quoteData.adminHourlyRate || 225;
  return baseHours * rate;
}

// Apply analytics filters
function applyAnalyticsFilters() {
  const startDate = document.getElementById('analyticsStartDate')?.value;
  const endDate = document.getElementById('analyticsEndDate')?.value;
  const salesRep = document.getElementById('analyticsSalesRep')?.value;
  const region = document.getElementById('analyticsRegion')?.value;

  let quotes = getAllQuotesForAnalytics();

  // Filter by date range
  if (startDate) {
    const start = new Date(startDate);
    quotes = quotes.filter(q => q.createdDate >= start);
  }
  if (endDate) {
    const end = new Date(endDate);
    quotes = quotes.filter(q => q.createdDate <= end);
  }

  // Filter by sales rep
  if (salesRep && salesRep !== 'all') {
    quotes = quotes.filter(q => q.salesRep === salesRep);
  }

  // Filter by region (state)
  if (region && region !== 'all') {
    quotes = quotes.filter(q => q.stateName === region);
  }

  updateAnalyticsDashboard(quotes);
}

// Update analytics dashboard with filtered data
function updateAnalyticsDashboard(quotes) {
  // Calculate metrics
  const totalQuotes = quotes.length;
  const totalValue = quotes.reduce((sum, q) => sum + q.totalValue, 0);
  const avgDealSize = totalQuotes > 0 ? totalValue / totalQuotes : 0;

  // Group by type
  const projectQuotes = quotes.filter(q => q.modules.length > 0);
  const addonQuotes = quotes.filter(q => q.modules.length === 0 && q.addons.length > 0);

  // Update DOM
  const avgDealEl = document.getElementById('analyticsAvgDeal');
  const totalValueEl = document.getElementById('analyticsTotalValue');
  const conversionRateEl = document.getElementById('analyticsConversionRate');

  if (avgDealEl) avgDealEl.textContent = `$${avgDealSize.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  if (totalValueEl) totalValueEl.textContent = `$${totalValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  if (conversionRateEl) conversionRateEl.textContent = `${totalQuotes > 0 ? Math.round((projectQuotes.length / totalQuotes) * 100) : 0}%`;

  // Update charts
  updateAnalyticsCharts(quotes);
}

// Update analytics charts
function updateAnalyticsCharts(quotes) {
  // Group by month
  const monthlyData = {};
  quotes.forEach(q => {
    const month = q.createdDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    monthlyData[month] = (monthlyData[month] || 0) + q.totalValue;
  });

  // Render simple trend chart
  const chartEl = document.getElementById('analyticsTrendChart');
  if (chartEl && Object.keys(monthlyData).length > 0) {
    const maxValue = Math.max(...Object.values(monthlyData));
    chartEl.innerHTML = Object.entries(monthlyData).map(([month, value]) => `
      <div class="chart-bar-row">
        <span class="chart-month">${month}</span>
        <div class="chart-bar-track">
          <div class="chart-bar-fill" style="width: ${(value / maxValue) * 100}%"></div>
        </div>
        <span class="chart-value">$${(value / 1000).toFixed(0)}k</span>
      </div>
    `).join('');
  }
}

// Export analytics to CSV
function exportAnalyticsToCSV() {
  const quotes = getAllQuotesForAnalytics();

  if (quotes.length === 0) {
    alert('No quotes to export');
    return;
  }

  const headers = ['Quote Number', 'Client', 'State', 'Sales Rep', 'Created Date', 'Users', 'Modules', 'Add-Ons', 'Estimated Value'];
  const rows = quotes.map(q => [
    q.quoteNumber || '',
    q.cityName || '',
    q.stateName || '',
    q.salesRep || '',
    q.createdDate.toLocaleDateString(),
    q.userCount || 0,
    q.modules.join('; '),
    q.addons.join('; '),
    q.totalValue.toFixed(2)
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sales-quotes-analytics-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);

  alert('Analytics exported to CSV!');
}

window.applyAnalyticsFilters = applyAnalyticsFilters;
window.exportAnalyticsToCSV = exportAnalyticsToCSV;

// Initialize analytics on load
setTimeout(() => {
  const quotes = getAllQuotesForAnalytics();
  updateAnalyticsDashboard(quotes);
}, 1500);

// ========== REMAINING QUICK WINS ==========

// 4. Undo/Redo Functionality
const historyStack = [];
let historyIndex = -1;
const MAX_HISTORY = 50;

function saveToHistory() {
  const currentState = captureFormState();

  // Remove any future states if we're not at the end
  if (historyIndex < historyStack.length - 1) {
    historyStack.splice(historyIndex + 1);
  }

  // Add new state
  historyStack.push(JSON.parse(JSON.stringify(currentState)));

  // Limit history size
  if (historyStack.length > MAX_HISTORY) {
    historyStack.shift();
  } else {
    historyIndex++;
  }

  updateUndoRedoButtons();
}

function undo() {
  if (historyIndex > 0) {
    historyIndex--;
    applyFormState(historyStack[historyIndex]);
    calculate();
    updateUndoRedoButtons();
  }
}

function redo() {
  if (historyIndex < historyStack.length - 1) {
    historyIndex++;
    applyFormState(historyStack[historyIndex]);
    calculate();
    updateUndoRedoButtons();
  }
}

function updateUndoRedoButtons() {
  const undoBtn = document.getElementById('undoBtn');
  const redoBtn = document.getElementById('redoBtn');

  if (undoBtn) undoBtn.disabled = historyIndex <= 0;
  if (redoBtn) redoBtn.disabled = historyIndex >= historyStack.length - 1;
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
    e.preventDefault();
    undo();
  } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
    e.preventDefault();
    redo();
  }
});

// Auto-save to history on input changes
let historyTimeout;
function scheduleHistorySave() {
  clearTimeout(historyTimeout);
  historyTimeout = setTimeout(saveToHistory, 1000);
}

// 5. Currency Formatting
let currentCurrency = localStorage.getItem('currency') || 'USD';

const currencyFormats = {
  USD: { symbol: '$', locale: 'en-US' },
  EUR: { symbol: '€', locale: 'de-DE' },
  GBP: { symbol: '£', locale: 'en-GB' },
  CAD: { symbol: 'C$', locale: 'en-CA' }
};

function setCurrency(currency) {
  currentCurrency = currency;
  localStorage.setItem('currency', currency);
  calculate(); // Recalculate to update all displayed values
}

function formatCurrency(amount) {
  const format = currencyFormats[currentCurrency];
  return new Intl.NumberFormat(format.locale, {
    style: 'currency',
    currency: currentCurrency,
    maximumFractionDigits: 0
  }).format(amount);
}

// 6. Auto-calculate Project End Dates
function calculateProjectEndDate() {
  const projectLength = parseInt(document.getElementById('goLiveTarget')?.value || 0);
  const today = new Date();
  const endDate = new Date(today.setMonth(today.getMonth() + projectLength));

  const endDateEl = document.getElementById('projectEndDate');
  if (endDateEl && projectLength > 0) {
    endDateEl.textContent = endDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } else if (endDateEl) {
    endDateEl.textContent = 'Not set';
  }
}

// 7. Duplicate Quote Button
function duplicateQuote() {
  const currentData = captureFormState();

  // Update quote number and version
  const quoteNum = currentData.quoteNumber || 'EPL-2026-001';
  const match = quoteNum.match(/(\d+)$/);
  if (match) {
    const num = parseInt(match[1]) + 1;
    currentData.quoteNumber = quoteNum.replace(/\d+$/, num.toString().padStart(3, '0'));
  }
  currentData.quoteVersion = 'v1';

  applyFormState(currentData);
  calculate();

  alert('Quote duplicated! Update the client name and quote number as needed.');
  saveToHistory();
}

// 8. Quote Expiration Dates
function setDefaultExpirationDate() {
  const expirationInput = document.getElementById('quoteExpirationDate');
  if (expirationInput && !expirationInput.value) {
    const today = new Date();
    const expiration = new Date(today.setDate(today.getDate() + 30));
    expirationInput.value = expiration.toISOString().split('T')[0];
  }
}

function getExpirationWarning() {
  const expirationInput = document.getElementById('quoteExpirationDate');
  if (!expirationInput || !expirationInput.value) return '';

  const expiration = new Date(expirationInput.value);
  const today = new Date();
  const daysRemaining = Math.ceil((expiration - today) / (1000 * 60 * 60 * 24));

  if (daysRemaining < 0) {
    return '⚠️ This quote has expired';
  } else if (daysRemaining <= 7) {
    return `⚠️ Expires in ${daysRemaining} days`;
  } else {
    return `Valid for ${daysRemaining} more days`;
  }
}

window.undo = undo;
window.redo = redo;
window.setCurrency = setCurrency;
window.calculateProjectEndDate = calculateProjectEndDate;
window.duplicateQuote = duplicateQuote;
window.setDefaultExpirationDate = setDefaultExpirationDate;

// Initialize
setTimeout(() => {
  saveToHistory(); // Save initial state
  setDefaultExpirationDate();
  calculateProjectEndDate();
}, 2000);

// ========== SMART PRICING SUGGESTIONS ==========

function findSimilarQuotes(currentQuote) {
  const allQuotes = JSON.parse(localStorage.getItem('savedQuotes') || '[]');

  if (allQuotes.length < 3) return [];

  // Calculate similarity score for each quote
  const scored = allQuotes.map(quote => {
    let score = 0;

    // Same modules (+3 points each)
    const currentModules = currentQuote.selectedSuites || [];
    const quoteModules = quote.selectedSuites || [];
    currentModules.forEach(m => {
      if (quoteModules.includes(m)) score += 3;
    });

    // Same client type (+2 points)
    if (quote.clientType === currentQuote.clientType) score += 2;

    // Similar user count (+2 points if within 25%)
    const userDiff = Math.abs((quote.userCount || 0) - (currentQuote.userCount || 0));
    if (userDiff < (currentQuote.userCount || 1) * 0.25) score += 2;

    // Similar population (+1 point if same tier)
    if (quote.populationTierDisplay === currentQuote.populationTierDisplay) score += 1;

    // Same state (+1 point)
    if (quote.stateName === currentQuote.stateName) score += 1;

    return { quote, score };
  });

  // Return top 5 similar quotes
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(s => s.quote);
}

function generatePricingSuggestions() {
  const currentQuote = captureFormState();
  const similarQuotes = findSimilarQuotes(currentQuote);

  if (similarQuotes.length === 0) {
    return {
      suggestions: [],
      warnings: [],
      recommendations: ['Not enough historical data yet. Save more quotes to get personalized suggestions.']
    };
  }

  const suggestions = [];
  const warnings = [];
  const recommendations = [];

  // Calculate average metrics from similar quotes
  const avgUsers = similarQuotes.reduce((sum, q) => sum + (q.userCount || 0), 0) / similarQuotes.length;
  const avgProjectLength = similarQuotes.reduce((sum, q) => sum + (q.goLiveTarget || 0), 0) / similarQuotes.length;

  // Check for outliers
  const currentUsers = currentQuote.userCount || 0;
  if (currentUsers > 0 && Math.abs(currentUsers - avgUsers) > avgUsers * 0.5) {
    warnings.push(`⚠️ User count (${currentUsers}) is ${currentUsers > avgUsers ? 'significantly higher' : 'significantly lower'} than similar quotes (avg: ${Math.round(avgUsers)})`);
  }

  const currentLength = currentQuote.goLiveTarget || 0;
  if (currentLength > 0 && Math.abs(currentLength - avgProjectLength) > avgProjectLength * 0.3) {
    warnings.push(`⚠️ Project length (${currentLength} months) differs from similar quotes (avg: ${Math.round(avgProjectLength)} months)`);
  }

  // Suggest missing add-ons based on similar quotes
  const currentAddons = currentQuote.selectedAddons || [];
  const addonFrequency = {};

  similarQuotes.forEach(q => {
    (q.selectedAddons || []).forEach(addon => {
      addonFrequency[addon] = (addonFrequency[addon] || 0) + 1;
    });
  });

  Object.entries(addonFrequency).forEach(([addon, count]) => {
    if (!currentAddons.includes(addon) && count >= similarQuotes.length * 0.6) {
      recommendations.push(`💡 Consider adding "${addon}" - included in ${Math.round((count / similarQuotes.length) * 100)}% of similar quotes`);
    }
  });

  // Service recommendations
  const servicesFrequency = {
    conversion: 0,
    integration: 0,
    reports: 0,
    training: 0
  };

  similarQuotes.forEach(q => {
    if (q.includeConversion) servicesFrequency.conversion++;
    if (q.includeIntegration) servicesFrequency.integration++;
    if (q.includeReports) servicesFrequency.reports++;
    if (q.includeTraining) servicesFrequency.training++;
  });

  Object.entries(servicesFrequency).forEach(([service, count]) => {
    const percentage = (count / similarQuotes.length) * 100;
    const currentlyIncluded = currentQuote[`include${service.charAt(0).toUpperCase() + service.slice(1)}`];

    if (!currentlyIncluded && percentage >= 60) {
      recommendations.push(`💡 ${Math.round(percentage)}% of similar quotes include ${service} services`);
    }
  });

  suggestions.push(`Found ${similarQuotes.length} similar quote(s) for comparison`);

  return { suggestions, warnings, recommendations };
}

function showPricingSuggestions() {
  const { suggestions, warnings, recommendations } = generatePricingSuggestions();

  const container = document.getElementById('pricingSuggestionsPanel');
  if (!container) return;

  let html = '';

  if (warnings.length > 0) {
    html += '<div class="suggestions-section warnings-section">';
    html += '<h4>Pricing Warnings</h4>';
    html += warnings.map(w => `<p class="suggestion-item warning">${w}</p>`).join('');
    html += '</div>';
  }

  if (recommendations.length > 0) {
    html += '<div class="suggestions-section">';
    html += '<h4>Recommendations</h4>';
    html += recommendations.map(r => `<p class="suggestion-item">${r}</p>`).join('');
    html += '</div>';
  }

  if (suggestions.length > 0) {
    html += '<div class="suggestions-section">';
    html += suggestions.map(s => `<p class="suggestion-item info">${s}</p>`).join('');
    html += '</div>';
  }

  container.innerHTML = html || '<p class="mini-muted">Configure your quote to see smart suggestions</p>';
  container.style.display = 'block';
}

window.showPricingSuggestions = showPricingSuggestions;

// Auto-show suggestions when key fields change
setTimeout(() => {
  ['cityName', 'userCount', 'goLiveTarget'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', () => {
      setTimeout(showPricingSuggestions, 500);
    });
  });
}, 2000);

// ========== QUOTE COMPARISON TOOL ==========

let comparisonQuotes = [];

function addQuoteToComparison(quoteId) {
  const allQuotes = JSON.parse(localStorage.getItem('savedQuotes') || '[]');
  const quote = allQuotes.find(q => q.id === quoteId);

  if (!quote) {
    alert('Quote not found');
    return;
  }

  if (comparisonQuotes.find(q => q.id === quoteId)) {
    alert('This quote is already in the comparison');
    return;
  }

  if (comparisonQuotes.length >= 3) {
    alert('Maximum 3 quotes can be compared at once');
    return;
  }

  comparisonQuotes.push(quote);
  renderQuoteComparison();
}

function removeFromComparison(quoteId) {
  comparisonQuotes = comparisonQuotes.filter(q => q.id !== quoteId);
  renderQuoteComparison();
}

function addCurrentQuoteToComparison() {
  const currentQuote = captureFormState();
  currentQuote.id = 'current';
  currentQuote.quoteNumber = currentQuote.quoteNumber || 'Current Quote';

  if (comparisonQuotes.find(q => q.id === 'current')) {
    comparisonQuotes = comparisonQuotes.filter(q => q.id !== 'current');
  }

  if (comparisonQuotes.length >= 3) {
    alert('Maximum 3 quotes can be compared. Remove one first.');
    return;
  }

  comparisonQuotes.push(currentQuote);
  renderQuoteComparison();
}

function renderQuoteComparison() {
  const container = document.getElementById('quoteComparisonGrid');
  if (!container) return;

  if (comparisonQuotes.length === 0) {
    container.innerHTML = '<p class="mini-muted">Select quotes to compare side-by-side</p>';
    return;
  }

  const fields = [
    { key: 'quoteNumber', label: 'Quote Number' },
    { key: 'cityName', label: 'Client' },
    { key: 'stateName', label: 'State' },
    { key: 'clientType', label: 'Type' },
    { key: 'userCount', label: 'Users' },
    { key: 'populationValue', label: 'Population' },
    { key: 'goLiveTarget', label: 'Project Length' },
    { key: 'serviceDeliveryModel', label: 'Delivery Model' },
    { key: 'selectedSuites', label: 'Modules', isArray: true },
    { key: 'selectedAddons', label: 'Add-Ons', isArray: true }
  ];

  let html = '<table class="comparison-table"><thead><tr><th>Field</th>';
  comparisonQuotes.forEach(q => {
    html += `<th>${q.quoteNumber || 'Unnamed'}<br><button class="ghost-button" onclick="removeFromComparison('${q.id}')">Remove</button></th>`;
  });
  html += '</tr></thead><tbody>';

  fields.forEach(field => {
    html += `<tr><td><strong>${field.label}</strong></td>`;

    const values = comparisonQuotes.map(q => {
      const val = q[field.key];
      if (field.isArray) {
        return val && val.length > 0 ? val.join(', ') : 'None';
      }
      return val || 'Not set';
    });

    // Check if values differ
    const allSame = values.every(v => v === values[0]);

    values.forEach(val => {
      const diffClass = allSame ? '' : 'diff-highlight';
      html += `<td class="${diffClass}">${val}</td>`;
    });

    html += '</tr>';
  });

  html += '</tbody></table>';
  container.innerHTML = html;
}

function openComparisonModal() {
  const modal = document.getElementById('quoteComparisonModal');
  if (modal) {
    modal.classList.remove('hidden-step');
    modal.removeAttribute('hidden');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function closeComparisonModal() {
  const modal = document.getElementById('quoteComparisonModal');
  if (modal) {
    modal.classList.add('hidden-step');
    modal.setAttribute('hidden', '');
    modal.setAttribute('aria-hidden', 'true');
  }
}

window.addQuoteToComparison = addQuoteToComparison;
window.removeFromComparison = removeFromComparison;
window.addCurrentQuoteToComparison = addCurrentQuoteToComparison;
window.openComparisonModal = openComparisonModal;
window.closeComparisonModal = closeComparisonModal;

// Page navigation already defined at top of file - see line 1
