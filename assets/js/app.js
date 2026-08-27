"use strict";

/* ---------- config (design props) ---------- */
const PHONE = "(346) 218-1253";
const HERO_VARIANT = "itdept";       // itdept | running | buildsecure | protected
const SHOW_PARTNERS = true;

/* ---------- state + router ---------- */
const state = { page: "home", signedIn: false, tab: "billing" };

const CLEAN_PATHS = { home: "/", about: "/about/", services: "/services/", industries: "/industries/", pricing: "/pricing/", contact: "/contact/", privacy: "/privacy.html", terms: "/terms.html", "managed-it": "/services/managed-it/", "ai-automation": "/services/ai-automation/", "medical-billing": "/services/medical-billing/", "medical-billing-software": "/services/medical-billing-software/", "security-cameras": "/services/security-cameras/", "network-wifi": "/services/network-wifi/", "websites-marketing": "/services/websites-marketing/", "custom-software": "/services/custom-software/", "crm-business-intelligence": "/services/crm-business-intelligence/" };
const PATH_TO_PAGE = { "": "home", "/about": "about", "/services": "services", "/industries": "industries", "/pricing": "pricing", "/contact": "contact", "/privacy.html": "privacy", "/terms.html": "terms", "/services/managed-it": "managed-it", "/services/ai-automation": "ai-automation", "/services/medical-billing": "medical-billing", "/services/medical-billing-software": "medical-billing-software", "/services/security-cameras": "security-cameras", "/services/network-wifi": "network-wifi", "/services/websites-marketing": "websites-marketing", "/services/custom-software": "custom-software", "/services/crm-business-intelligence": "crm-business-intelligence" };

function pageFromLocation() {
  const h = location.hash.slice(1);
  if (h) return h;
  const clean = location.pathname.replace(/\/+$/, "");
  return PATH_TO_PAGE[clean] || "home";
}

function nav(page) {
  state.page = page;
  const clean = CLEAN_PATHS[page];
  if (clean) {
    if (location.pathname !== clean || location.hash) history.pushState({ page: page }, "", clean);
  } else {
    const target = location.pathname + "#" + page;
    if (location.hash.slice(1) !== page) history.pushState({ page: page }, "", target);
  }
  render();
  window.scrollTo(0, 0);
}

function syncFromLocation() {
  const p = pageFromLocation();
  if (p !== state.page) { state.page = p; render(); window.scrollTo(0, 0); }
}
window.addEventListener("popstate", syncFromLocation);
window.addEventListener("hashchange", syncFromLocation);

function setTab(tab) { state.tab = tab; render(); }
function signIn() { state.signedIn = true; render(); window.scrollTo(0, 0); }
function signOut() { state.signedIn = false; state.tab = "billing"; render(); window.scrollTo(0, 0); }
const FORMSPREE_ENDPOINT = "https://formspree.io/f/myeygqrw";

async function contactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById("cf-submit");
  const thanks = document.getElementById("cf-thanks");
  const error = document.getElementById("cf-error");
  const originalLabel = btn.textContent;
  thanks.style.display = "none";
  error.style.display = "none";
  btn.disabled = true;
  btn.textContent = "Sending...";
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form)
    });
    if (res.ok) {
      form.reset();
      thanks.style.display = "block";
    } else {
      error.style.display = "block";
    }
  } catch (err) {
    error.style.display = "block";
  }
  btn.disabled = false;
  btn.textContent = originalLabel;
  return false;
}

/* ---------- data ---------- */
const heroes = {
  itdept: { l1: "Your IT Department.", l2: "Without Hiring One.", a: "We Build. Secure. Automate.",
    sub: "AxisForce is your outsourced technology department — we build, secure, automate and support your systems so you can focus on running the business." },
  running: { l1: "Technology That Keeps", l2: "Your Business", a: "Running.",
    sub: "One Houston team accountable for your IT, security, networking, billing systems and growth — with no long-term contracts." },
  buildsecure: { l1: "We Build, Secure &", l2: "Automate", a: "Growing Businesses.",
    sub: "From managed IT to AI automation and custom platforms — AxisForce is the technology partner behind Houston businesses that can't go down." },
  protected: { l1: "Your Business.", l2: "Protected. Connected.", a: "Built for the Future.",
    sub: "AxisForce delivers end-to-end IT, security, networking, billing and digital solutions that help Houston businesses operate smarter, stay secure, and grow with confidence." }
};
const HERO = heroes[HERO_VARIANT] || heroes.itdept;

const I = {
  headset: "M3 11h3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3v-7zM18 11h3v7h-3a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1zM5 11a7 7 0 0 1 14 0M21 18a3 3 0 0 1-3 3h-4",
  camera: "M2 7h13a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zM16 10l6-3v10l-6-3M5 20v2",
  wifi: "M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M2 9.5a15 15 0 0 1 20 0M12 20h.01",
  globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  chart: "M3 3v18h18M7 15l4-4 3 3 5-6",
  bot: "M12 3v3M9 6h6a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3zM9.5 12h.01M14.5 12h.01M3 12h3M18 12h3",
  shield: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6zM9 12l2 2 4-4",
  pin: "M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  clock: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2",
  users: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1M17 3.5a4 4 0 0 1 0 7M22 21v-1a6 6 0 0 0-4-5.5",
  billing: "M12 2v20M17 5.5H9.5a3.25 3.25 0 0 0 0 6.5h5a3.25 3.25 0 0 1 0 6.5H6",
  cross: "M9 3h6v6h6v6h-6v6H9v-6H3V9h6z",
  utensils: "M8 2v20M5 2v6a3 3 0 0 0 6 0V2M17 2v20M17 2c-2.5 1.2-3.5 4-3 7h6",
  scale: "M12 3v18M8 21h8M6 7L3 13a3 3 0 0 0 6 0zM18 7l-3 6a3 3 0 0 0 6 0zM4 7h16",
  bag: "M6 7h12l1 14H5zM9 10V7a3 3 0 0 1 6 0v3",
  fuel: "M3 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M2 21h12M6 7h4M13 10h3a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V9.5L18 6.5",
  briefcase: "M3 8h18v12H3zM8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18",
  hardhat: "M2 18h20M4 18v-2a8 8 0 0 1 5-7.4M20 18v-2a8 8 0 0 0-5-7.4M10 5a2 2 0 0 1 4 0v6h-4z",
  growth: "M3 17l6-6 4 4 8-8M15 7h6v6",
  code: "M8 6L2 12l6 6M16 6l6 6-6 6M14 4l-4 16",
  server: "M3 4h18v6H3V4zM3 14h18v6H3v-6zM7 7h.01M11 7h4M7 17h.01M11 17h4",
  box: "M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10",
  check: "M4 12l5 5L20 6",
  link: "M9 17H7a5 5 0 0 1 0-10h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35",
  device: "M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM11 19h2",
  cloud: "M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.5A4.5 4.5 0 0 1 17 18H7z"
};

function icon(path, size, color, extra) {
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="' + color +
    '" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"' + (extra ? ' style="' + extra + '"' : '') +
    '><path d="' + path + '"></path></svg>';
}

/* local-first image slot */
const CAMERAS_FALLBACK = "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1400&q=80";

function slot(src, alt, credit, creditHref, fallback, extraClass) {
  const onerr = fallback ? ' onerror="this.onerror=null;this.src=\'' + fallback + '\'"' : "";
  const cr = credit ? '<a class="credit" href="' + creditHref + '" target="_blank" rel="noopener">' + credit + "</a>" : "";
  return '<div class="imgslot' + (extraClass ? " " + extraClass : "") + '"><img src="' + src + '" alt="' + alt + '"' + onerr + ">" + cr + "</div>";
}

const svcImgs = {
  "01": ["https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1400&q=80", "Photo by ThisisEngineering on Unsplash", "https://unsplash.com/@thisisengineering", ""],
  "02": ["https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80", "Photo by Possessed Photography on Unsplash", "https://unsplash.com/@possessedphotography", ""],
  "03": ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80", "Photo by Luke Chesser on Unsplash", "https://unsplash.com/@lukechesser", ""],
  "04": ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80", "Photo by National Cancer Institute on Unsplash", "https://unsplash.com/@nci", ""],
  "05": ["/assets/images/svc-cameras-hero.png", "", "", CAMERAS_FALLBACK],
  "06": ["https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1400&q=80", "Photo by Thomas Jensen on Unsplash", "https://unsplash.com/@thomasjsn", ""],
  "07": ["https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1400&q=80", "Photo by Ilya Pavlov on Unsplash", "https://unsplash.com/@ilyapavlov", ""],
  "08": ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80", "Photo by Ilya Pavlov on Unsplash", "https://unsplash.com/@ilyapavlov", ""],
  "09": ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80", "Photo by Luke Chesser on Unsplash", "https://unsplash.com/@lukechesser", ""]
};

const services = [
  { no: "01", name: "Managed IT Support", meta: "Starting at $399 / month", group: "Technology Operations", cta: "Explore Managed IT", page: "managed-it",
    problem: "Downtime, security gaps and “the computer guy is unreachable” cost real money.",
    long: "We become your IT department: unlimited remote support, monitoring, patching, backups, Microsoft 365, networking and device management — with every vendor coordinated for you.",
    outcome: "Reduce downtime, secure your systems, and give your employees technology that just works.",
    whoFor: "Businesses of 5–50 staff that need accountable IT without hiring internally.",
    items: ["Unlimited remote support", "Monitoring & patching", "Backups & recovery", "Microsoft 365 management", "Networking & device management", "Vendor coordination"] },
  { no: "02", name: "AI & Business Automation", meta: "Request a Quote", group: "Automation & Software", cta: "Explore AI Automation", page: "ai-automation",
    problem: "Your team spends hours every week on intake, follow-up and reporting a machine could do.",
    long: "Custom AI agents, voice AI, workflow automation, document processing, CRM automation and reporting dashboards — scoped small, proven on one process, then extended.",
    outcome: "Hours of repetitive admin removed weekly, with a human in the loop where judgment matters.",
    whoFor: "Operators drowning in repetitive processes: intake, scheduling, documents, reporting.",
    items: ["Custom AI agents", "Voice AI", "Workflow automation", "Document processing", "CRM automation", "Reporting dashboards & portals"] },
  { no: "03", name: "Medical Billing Services", meta: "3% of collections", group: "Medical Revenue", cta: "Explore Billing Services", page: "medical-billing",
    problem: "Claims sit unworked, denials pile up, and nobody can tell you what's stuck where.",
    long: "Full revenue cycle management: eligibility verification, charge entry, claim submission, payment posting, denial management, A/R follow-up and reporting.",
    outcome: "Cleaner claims, faster payment, and visibility into every dollar in flight.",
    whoFor: "Independent practices that want billing handled — not just software.",
    items: ["Eligibility verification", "Charge entry & claim submission", "Payment posting", "Denial management", "A/R follow-up", "Monthly reporting"] },
  { no: "04", name: "Medical Billing Software", meta: "Starting at $250 / month", group: "Automation & Software", cta: "Explore Billing Software", page: "medical-billing-software",
    problem: "Legacy billing systems are slow, overpriced and built for hospital groups — not independent practices.",
    long: "A cloud-hosted platform: patient management, insurance, claims, documents, reporting and role-based access — on an AI-ready, healthcare-focused architecture.",
    outcome: "One modern system your front desk and biller actually like using.",
    whoFor: "Independent medical practices running their own billing.",
    items: ["Patient management", "Insurance & claims", "Document management", "Reporting", "Role-based access", "Healthcare-focused architecture"] },
  { no: "05", name: "Security Camera Systems", meta: "Starting at $300", group: "Security", cta: "Explore Security Cameras", page: "security-cameras",
    problem: "When something happens, the first question is always: did the cameras catch it?",
    long: "Commercial-grade design and installation: NVR configuration, network integration, remote viewing and ongoing maintenance — placed to answer the questions you'll actually ask.",
    outcome: "Reviewable footage of the moments that matter, from your phone.",
    whoFor: "Storefronts, practices, stations and offices that need reliable recording.",
    items: ["Professional installation", "Commercial-grade systems", "NVR configuration", "Network integration", "Remote viewing", "Maintenance"] },
  { no: "06", name: "Network & Wi-Fi Solutions", meta: "Custom quote per site", group: "Technology Operations", cta: "Explore Network Solutions", page: "network-wifi",
    problem: "Dead zones, dropped payments, and one consumer router doing a building's worth of work.",
    long: "Structured cabling, firewalls, segmented Wi-Fi and failover internet — designed for the building you actually have, and documented so you own it.",
    outcome: "Fast, secure connectivity that survives rush hour and audits alike.",
    whoFor: "Any site where the network carries payments, phones or patient data.",
    items: ["Site survey & design", "Structured cabling", "Firewall & VLAN segmentation", "Guest / staff separation", "Failover internet", "As-built documentation"] },
  { no: "07", name: "Websites & Marketing", meta: "Starting at $800 / month", group: "Growth", cta: "Explore Marketing Solutions", page: "websites-marketing",
    problem: "A 9pm Google search should end with your phone ringing — not a competitor's.",
    long: "Professional website, local SEO, Google Business Profile, analytics, lead generation, maintenance and hosting — measured against booked work, not clicks.",
    outcome: "More calls from people already looking for exactly what you sell.",
    whoFor: "Local businesses that win by being found first.",
    items: ["Professional website", "Local SEO", "Google Business Profile", "Analytics & lead tracking", "Maintenance & hosting", "Monthly reporting"] },
  { no: "08", name: "Custom Software", meta: "Request a Quote", group: "Automation & Software", cta: "Explore Custom Software", page: "custom-software",
    problem: "Off-the-shelf tools almost fit — so your team lives in spreadsheets and workarounds.",
    long: "Custom internal portals, dashboards, integrations and business applications built around your actual processes.",
    outcome: "Software shaped to your operation, owned by you.",
    whoFor: "Businesses with a process worth automating properly.",
    items: ["Internal portals", "Dashboards & reporting", "System integrations", "Process automation", "Cloud hosting", "Ongoing support"] },
  { no: "09", name: "CRM & Business Intelligence", meta: "Request a Quote", group: "Automation & Software", cta: "Explore CRM & BI", page: "crm-business-intelligence",
    problem: "Customer data lives in spreadsheets and inboxes instead of a system your team can actually use to sell, service and report.",
    long: "CRM implementation, automation, integrations, dashboards and reporting solutions built around your business.",
    outcome: "A CRM and reporting setup that fits how your team actually works — with real visibility into what's happening.",
    whoFor: "Businesses running or adopting a CRM — Salesforce, Dynamics 365, HubSpot or a practice-management platform — that need it configured, connected or turned into usable reporting.",
    items: ["Salesforce & Dynamics 365", "HubSpot & other CRM platforms", "Healthcare/practice-management CRM", "CRM customization & integrations", "Data migration", "Power BI, dashboards & reporting"] }
];
services.forEach(s => {
  const [src, credit, creditHref, fallback] = svcImgs[s.no];
  s.img = src; s.imgCredit = credit; s.imgCreditHref = creditHref; s.imgFallback = fallback;
});

const S = {
  blue: { sbg: "rgba(30,95,224,0.1)", sc: "#1e5fe0" },
  gray: { sbg: "#e8edf6", sc: "#62708a" },
  red: { sbg: "rgba(194,69,45,0.1)", sc: "#c2452d" }
};

const partners = ["Microsoft 365", "Google Workspace", "Salesforce", "Ubiquiti", "Dell Technologies", "Availity"];

const trustChips = [
  { label: "No Long-Term Contracts", icon: I.shield },
  { label: "Trusted by Businesses", icon: I.users },
  { label: "On-site & Remote", icon: I.pin }
];

const heroCards = [
  { name: "Managed IT", body: "Proactive IT support and maintenance for your business.", icon: I.headset },
  { name: "Security Solutions", body: "Protect your property with advanced camera systems.", icon: I.camera },
  { name: "AI & Automation", body: "Smart AI tools and workflow automation. Coming soon.", icon: I.bot },
  { name: "Business Growth", body: "Digital marketing and web solutions that drive results.", icon: I.growth }
];

const homeServices = [
  { name: "Managed IT Support", body: "Reduce downtime, secure your systems, and give your team reliable technology — without hiring internally.", icon: I.headset, no: "01" },
  { name: "AI & Business Automation", body: "AI agents, voice AI and workflow automation that remove hours of repetitive admin every week.", icon: I.bot, no: "02", status: "Coming Soon" },
  { name: "Medical Billing Platform", body: "Billing done for you at 3% of collections, or our cloud billing software for your own team.", icon: I.billing, no: "04" },
  { name: "Security Camera Systems", body: "Commercial-grade cameras installed, integrated and reviewable from your phone.", icon: I.camera, no: "05" },
  { name: "Network & Wi-Fi Solutions", body: "Structured cabling, firewalls and segmented Wi-Fi that carry payments and phones without drama.", icon: I.wifi, no: "06" },
  { name: "Websites & Marketing", body: "Get found first on Google — websites, local SEO and lead generation measured against booked work.", icon: I.globe, no: "07" },
  { name: "CRM & Business Intelligence", body: "CRM implementation, automation, integrations, dashboards and reporting solutions built around your business.", icon: I.chart, no: "09" },
  { name: "Custom Software", body: "Custom web applications, internal portals and business systems designed around your operations.", icon: I.code, no: "08" }
];

const stats = [
  { label: "Houston-Based", icon: I.pin },
  { label: "On-Site & Remote", icon: I.headset },
  { label: "No Long-Term Contracts", icon: I.shield },
  { label: "Business-Focused Support", icon: I.users }
];

const industryRow = [
  { name: "Healthcare", icon: I.cross },
  { name: "Professional Services", icon: I.briefcase },
  { name: "Retail & Gas Stations", icon: I.fuel },
  { name: "Restaurants", icon: I.utensils },
  { name: "Construction", icon: I.hardhat }
];

const steps = [
  { no: "01", when: "Systems Review", name: "Discovery", body: "We review what you run today, what's unsupported, and what would hurt most if it failed tomorrow — whether that's IT, cameras, networking, billing or marketing." },
  { no: "02", when: "Clear Recommendations", name: "Plan", body: "A short, written plan: what we'd fix first, what it costs, and what can safely wait. Yours to keep either way." },
  { no: "03", when: "Stabilize & Improve", name: "Execute", body: "We handle the highest-risk items first, then move on to the improvements that help your business grow." }
];

const priceCards = [
  { name: "Managed IT", price: "Starting at $399", unit: "per month", body: "Unlimited remote support, monitoring, patching, backups and vendor coordination.", featured: true, border: "#1e5fe0", no: "01" },
  { name: "Security Cameras", price: "Starting at $300", unit: "per project", body: "Professional installation, NVR configuration and remote viewing.", featured: false, border: "#dbe3f0", no: "05" },
  { name: "Medical Billing", price: "3% of collections", unit: "no base fee", body: "Full revenue cycle management for independent practices.", featured: false, border: "#dbe3f0", no: "03" },
  { name: "Billing Software", price: "Starting at $250", unit: "per month", body: "Cloud-hosted billing platform on HIPAA-ready architecture.", featured: false, border: "#dbe3f0", no: "04" },
  { name: "Websites & SEO", price: "Starting at $800", unit: "per month", body: "Website, local SEO, Google Business Profile and lead tracking.", featured: false, border: "#dbe3f0", no: "07" },
  { name: "Custom Software", price: "Request a Quote", unit: "scoped per project", body: "Portals, dashboards and integrations built around your process.", featured: false, border: "#dbe3f0", no: "08" },
  { name: "AI Automation", price: "Request a Quote", unit: "scoped per workflow", body: "AI agents and workflow automation, proven on one process first.", featured: false, border: "#dbe3f0", no: "02" }
];

const cases = [
  { tag: "Capability", name: "Digital Marketing & Growth", challenge: "Most local businesses are invisible in search until a competitor gets there first.", solution: "Local SEO, Google &amp; Meta advertising and website optimization built around lead generation — not vanity metrics.", result: "Available standalone or bundled with any other AxisForce service.", tech: ["Local SEO", "Google & Meta Ads", "Website Optimization"] },
  { tag: "Product build", name: "AxisForce Medical Billing Platform", challenge: "Independent practices overpaying for legacy billing systems built for hospital groups.", solution: "Custom cloud-hosted billing platform: patients, insurance, claims, documents, role-based access.", result: "In production for AxisForce medical billing clients.", tech: ["Cloud", "HIPAA-ready", "AI-ready"] },
  { tag: "Coming Soon", name: "AI Receptionist & Business Automation", challenge: "Practices and small businesses lose hours a week to intake, scheduling and follow-up.", solution: "An AI receptionist and workflow automation platform — call handling, appointment workflows, lead follow-up and custom agents.", result: "In development — not yet available to clients.", tech: ["AI Agents", "Voice AI", "Automation"] },
  { tag: "Field work", name: "IT, Security & Networking", challenge: "Sites with dead zones, unrecorded incidents and undocumented networks.", solution: "Camera systems, structured cabling and segmented Wi-Fi — installed, documented and maintained.", result: "Ongoing installs and managed support across Houston-area sites.", tech: ["Cameras & NVR", "Cabling", "Firewalls"] }
];

const faqs = [
  { q: "Do you require long-term contracts?", a: "No. Everything is month to month — cancel anytime. If you prepay and cancel mid-period, the unused portion is refunded pro-rata." },
  { q: "Do you provide both remote and on-site support?", a: "Yes. We're Houston-based and cover Greater Houston on-site, with remote support for everything that doesn't need a truck." },
  { q: "What types of businesses do you work with?", a: "Primarily independent medical practices, with restaurants, law firms, retail and gas stations also on board. If your business depends on its technology to operate, we're a fit." },
  { q: "Where can I see your pricing?", a: "Our pricing depends on the service. Visit our <span class=\"go-link\" style=\"color:#1e5fe0;font-weight:700;\" onclick=\"nav('pricing')\">Pricing page</span> for current starting prices and service options." }
];

const industries = [
  { tag: "Primary", name: "Medical & dental practices", imgSrc: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80", imgCredit: "Photo by Martha Dominguez de Gouveia on Unsplash", imgCreditHref: "https://unsplash.com/@martzzl",
    body: "Independent practices from two to twenty providers. The technology has to satisfy HIPAA, survive an audit, and never get between a provider and a chart.",
    cells: [
      { name: "EHR-adjacent IT", detail: "We stay in our lane and coordinate with Athena, eCW, Epic Community or whatever you run." },
      { name: "Claims visibility", detail: "Availity-fed aging and denial views so nothing sits at 90 days unnoticed." },
      { name: "Compliance file", detail: "Risk analysis, policies, training records and BAA kept current, not reconstructed at audit time." },
      { name: "Front desk uptime", detail: "Printers, scanners, check-in tablets and phones treated as clinical equipment." }
    ] },
  { tag: "Featured", name: "Law firms", imgSrc: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80", imgCredit: "Photo by Tingey Injury Law Firm on Unsplash", imgCreditHref: "https://unsplash.com/@tingeyinjurylawfirm",
    body: "Firms bill by the hour — downtime and data exposure are unbillable. We run the systems that keep client files confidential and attorneys working.",
    cells: [
      { name: "Confidentiality by design", detail: "Encryption, access control and audit trails on every client file and mailbox." },
      { name: "Practice software support", detail: "Clio, case management and document systems supported and coordinated with the vendor." },
      { name: "Email & compliance", detail: "Retention policies, litigation hold and MFA enforced without slowing anyone down." },
      { name: "Uptime for billable hours", detail: "Same-day response, reliable VoIP and workstations treated as revenue equipment." }
    ] },
  { tag: "Expanding", name: "Gas stations & retail", imgSrc: "https://images.unsplash.com/photo-1573706375595-fa829a0e226a?auto=format&fit=crop&w=1200&q=80", imgCredit: "Photo by Erik Mclean on Unsplash", imgCreditHref: "https://unsplash.com/@introspectivedsgn",
    body: "Stations, c-stores and shops where the network carries payment, fuel control, and a camera system somebody will subpoena.",
    cells: [
      { name: "PCI-aware networking", detail: "Payment traffic segmented from back office and guest WiFi, documented." },
      { name: "Forecourt coverage", detail: "Outdoor-rated cameras and WiFi that survive Gulf Coast weather." },
      { name: "Multi-site rollout", detail: "One standard build repeated across locations, with remote management." },
      { name: "Loss prevention", detail: "Camera-to-POS correlation and retention sized to your insurer's ask." }
    ] },
  { tag: "Served", name: "Restaurants, law firms & services", imgSrc: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80", imgCredit: "Photo by Austin Distel on Unsplash", imgCreditHref: "https://unsplash.com/@austindistel",
    body: "Small firms, restaurants and agencies that need reliable IT, cameras and a marketing engine without hiring either role.",
    cells: [
      { name: "Cloud-first setup", detail: "M365 or Workspace done properly — MFA, retention, shared drives that make sense." },
      { name: "Automation", detail: "Intake, scheduling and reporting workflows that remove repetitive admin." },
      { name: "Website & SEO", detail: "A site that ranks for what you actually sell, and converts." },
      { name: "Device lifecycle", detail: "Procurement, imaging, and a plan for replacing hardware on a schedule." }
    ] }
];

const facts = [
  { k: "Company", v: "AxisForce Inc." },
  { k: "Based", v: "Houston, Texas" },
  { k: "Service Area", v: "Greater Houston + Remote Support" },
  { k: "Focus", v: "Business Technology Solutions" },
  { k: "Support", v: "On-Site & Remote" },
  { k: "Engagement", v: "Month-to-Month Options Available" }
];

const principles = [
  { name: "Document Everything", body: "We keep your systems organized with clear documentation, configurations and records so your business is not dependent on guesswork." },
  { name: "Fix What Matters First", body: "We prioritize security, reliability and business-critical issues first, then build a practical roadmap for improvements." },
  { name: "One Technology Partner", body: "From IT and networking to software, automation and vendors, we help coordinate the technology behind your business so you have one team to call." }
];

const contactRows = [
  { k: "Phone", v: '<a href="tel:+13462181253" style="color: inherit; text-decoration: none;">' + PHONE + '</a>' },
  { k: "Email", v: '<a href="mailto:info@axisforce.net" style="color: inherit; text-decoration: none;">info@axisforce.net</a>' },
  { k: "Service area", v: "Greater Houston — Harris, Fort Bend, Montgomery" },
  { k: "Hours", v: "Mon–Fri 8a–6p CT · emergency line for managed clients" },
  { k: "Existing client?", v: "Use the client portal for tickets" }
];

const portalBadges = ["MFA required", "Session timeout 15 min", "Audit-logged", "BAA covered"];

const kpis = [
  { label: "Balance due", value: "$4,850", note: "Invoice 2026-041 · due Aug 20" },
  { label: "Claims in flight", value: "138", note: "$96,420 billed" },
  { label: "Denials to work", value: "9", note: "$7,310 at risk" },
  { label: "Open tickets", value: "3", note: "1 high priority" }
];

const invoices = [
  Object.assign({ id: "2026-041", period: "Aug 2026", amount: "$4,850.00", status: "Open", due: "Aug 20" }, S.blue),
  Object.assign({ id: "2026-034", period: "Jul 2026", amount: "$4,850.00", status: "Paid", due: "Jul 20" }, S.gray),
  Object.assign({ id: "2026-027", period: "Jun 2026", amount: "$5,320.00", status: "Paid", due: "Jun 20" }, S.gray),
  Object.assign({ id: "2026-019", period: "May 2026", amount: "$4,850.00", status: "Paid", due: "May 20" }, S.gray),
  Object.assign({ id: "2026-011", period: "Apr 2026", amount: "$9,400.00", status: "Paid", due: "Apr 20" }, S.gray)
];

const claims = [
  Object.assign({ id: "C-88214", patient: "R. Alvarez", payer: "BCBS TX", billed: "$1,240", paid: "$0", status: "Denied", age: "34 d" }, S.red),
  Object.assign({ id: "C-88190", patient: "T. Nguyen", payer: "UnitedHealthcare", billed: "$860", paid: "$612", status: "Paid", age: "12 d" }, S.gray),
  Object.assign({ id: "C-88177", patient: "M. Okafor", payer: "Aetna", billed: "$2,150", paid: "$0", status: "Pending", age: "21 d" }, S.blue),
  Object.assign({ id: "C-88142", patient: "D. Patel", payer: "Cigna", billed: "$430", paid: "$430", status: "Paid", age: "9 d" }, S.gray),
  Object.assign({ id: "C-88101", patient: "S. Brooks", payer: "Medicare", billed: "$1,980", paid: "$0", status: "Denied", age: "47 d" }, S.red),
  Object.assign({ id: "C-88074", patient: "L. Herrera", payer: "BCBS TX", billed: "$720", paid: "$540", status: "Paid", age: "6 d" }, S.gray)
];

const claimPanels = [
  { name: "Aging by payer", body: "BCBS TX carries the oldest bucket at 41 days average. Medicare is clean at 11. Full breakdown exports to CSV." },
  { name: "Top denial reasons", body: "CO-97 bundling and missing prior auth account for six of nine open denials this month." },
  { name: "Remittances", body: "Four ERAs posted this week totaling $18,240. Each links to its originating claim batch." }
];

const tickets = [
  Object.assign({ id: "T-2291", subject: "Check-in tablet won't hold WiFi", site: "Main clinic", priority: "High", updated: "2 hrs ago" }, S.blue),
  Object.assign({ id: "T-2288", subject: "New provider onboarding — 3 accounts", site: "Main clinic", priority: "Normal", updated: "Yesterday" }, S.gray),
  Object.assign({ id: "T-2280", subject: "Back-office printer replacement quote", site: "Katy office", priority: "Normal", updated: "2 days ago" }, S.gray),
  Object.assign({ id: "T-2274", subject: "Camera 4 recording gap review", site: "Katy office", priority: "Low", updated: "4 days ago" }, S.gray)
];

const docs = [
  { kind: "Agreement", name: "Business Associate Agreement", meta: "Signed Mar 2026 · PDF" },
  { kind: "Compliance", name: "Security Risk Analysis 2026", meta: "Completed Apr 2026 · PDF" },
  { kind: "Compliance", name: "Workforce training log", meta: "Updated monthly · CSV" },
  { kind: "Network", name: "As-built diagram — Main clinic", meta: "Rev C · Jun 2026" },
  { kind: "Network", name: "Credential record", meta: "Vault link · MFA required" },
  { kind: "Hardware", name: "Asset & warranty register", meta: "42 devices · updated weekly" }
];

const footerCols = [
  { title: "Services", links: [
    { label: "Managed IT Support", go: "svc:01" }, { label: "AI & Business Automation", go: "ai-automation" },
    { label: "Medical Billing Services", go: "svc:03" }, { label: "Medical Billing Software", go: "medical-billing-software" },
    { label: "Security Cameras", go: "security-cameras" }, { label: "Network & Wi-Fi", go: "network-wifi" },
    { label: "Websites & Marketing", go: "websites-marketing" }, { label: "CRM & Business Intelligence", go: "crm-business-intelligence" },
    { label: "Custom Software", go: "custom-software" } ] },
  { title: "Company", links: [
    { label: "About", go: "about" }, { label: "Industries", go: "industries" }, { label: "Pricing", go: "pricing" },
    { label: "Contact", go: "contact" }, { label: "Client Login", go: "portal" } ] },
  { title: "Connect", links: [
    { label: "Google Reviews", href: "https://g.page/r/CRhtDtmr4_jyEBM/review" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/axisforce-it-marketing-solutions/" } ] }
];

/* ---------- shared fragments ---------- */
const div = i => (i === 0 ? "transparent" : "rgba(255,255,255,0.1)");
const divLight = i => (i === 0 ? "transparent" : "rgba(19,26,40,0.14)");
const heroFade = '<div style="position: absolute; inset: 0; background: linear-gradient(90deg, #060a14 0%, rgba(6,10,20,0.4) 18%, rgba(6,10,20,0) 45%), linear-gradient(0deg, rgba(6,10,20,0.9) 0%, rgba(6,10,20,0) 30%), linear-gradient(180deg, rgba(6,10,20,0.7) 0%, rgba(6,10,20,0) 22%); pointer-events: none;"></div>';

function btnPrimary(label, go, pad, fs, shadow) {
  return '<button class="btn btn-primary" style="padding: ' + (pad || "14px 24px") + '; font-size: ' + (fs || "15.5px") + ';' +
    (shadow === false ? " box-shadow: none;" : "") + '" onclick="nav(\'' + go + '\')">' + label + "</button>";
}

function toggleMenu() {
  const m = document.getElementById("mob-menu");
  if (m) m.classList.toggle("open");
}

function mobileMenu() {
  const pages = [["home", "Home"], ["about", "About Us"], ["services", "Services"], ["industries", "Industries"], ["pricing", "Pricing"], ["contact", "Contact Us"]];
  return '<div id="mob-menu" class="mob-menu">' +
    pages.map(([k, label]) =>
      '<div class="mob-link' + (state.page === k ? " active" : "") + '" onclick="nav(\'' + k + '\')">' + label + "</div>").join("") +
    '<div style="display: flex; gap: 12px; padding: 16px 24px; align-items: center; flex-wrap: wrap;">' +
      '<a href="https://calendly.com/sameed-axisforce/30min" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding: 12px 18px; font-size: 15px; text-decoration: none; display: inline-flex; align-items: center;">Free Consultation</a>' +
      '<button class="btn btn-ghost-dark" style="color: #cfd8ea; padding: 12px 18px; font-size: 14.5px;" onclick="nav(\'portal\')">Client Login</button>' +
    '</div>' +
    '<a href="tel:+13462181253" style="display: block; padding: 0 24px 16px; color: #8b95ab; font-weight: 700; font-size: 15px; text-decoration: none;">' + PHONE + '</a>' +
  '</div>';
}

function header() {
  const pages = [["home", "Home"], ["about", "About Us"], ["services", "Services"], ["industries", "Industries"], ["pricing", "Pricing"], ["contact", "Contact Us"]];
  const links = pages.map(([k, label]) =>
    '<div class="navlink" style="font-size: 15px; font-weight: 600; cursor: pointer; white-space: nowrap; color: ' +
    (state.page === k ? "#4d8dff" : "#cfd8ea") + '; padding-bottom: 3px; border-bottom: 2px solid ' +
    (state.page === k ? "#2f7bff" : "transparent") + ';" onclick="nav(\'' + k + '\')">' + label + "</div>").join("");
  return '' +
  '<header style="position: sticky; top: 0; z-index: 30; background: rgba(6,10,20,0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.07);">' +
    '<div style="max-width: 1280px; margin: 0 auto; padding: 14px 32px; display: flex; align-items: center; gap: 20px;">' +
      '<div style="display: flex; align-items: center; gap: 10px; cursor: pointer;" onclick="nav(\'home\')">' +
        '<img src="/assets/images/branding/axisforce-mark.png" alt="AxisForce logo" style="width: 34px; height: 34px; object-fit: contain;">' +
        '<div>' +
          '<div style="font-weight: 800; font-size: 21px; letter-spacing: 0.01em; line-height: 1;"><span style="color: #fff;">Axis</span><span style="color: #2f7bff;">Force</span></div>' +

        '</div>' +
      '</div>' +
      '<nav class="hdr-nav" style="margin-left: auto; display: flex; align-items: center; gap: clamp(12px, 1.8vw, 26px); min-width: 0;">' +
        links +
        '<a href="tel:+13462181253" class="hdr-phone" style="display: flex; align-items: center; gap: 8px; color: #cfd8ea; font-weight: 700; font-size: 15px; white-space: nowrap; text-decoration: none;">' +
          icon("M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z", 17, "#2f7bff") +
          PHONE +
        '</a>' +
        '<button class="hdr-login btn" style="background: transparent; color: #cfd8ea; border: 1px solid rgba(255,255,255,0.25); padding: 10px 16px; font-size: 14.5px; white-space: nowrap;" onmouseover="this.style.borderColor=\'#7caeff\';this.style.color=\'#7caeff\'" onmouseout="this.style.borderColor=\'rgba(255,255,255,0.25)\';this.style.color=\'#cfd8ea\'" onclick="nav(\'portal\')">Client Login</button>' +
        '<a href="https://calendly.com/sameed-axisforce/30min" target="_blank" rel="noopener noreferrer" class="hdr-cta btn btn-primary" style="padding: 11px 20px; font-size: 15px; white-space: nowrap; box-shadow: 0 4px 18px rgba(47,123,255,0.35); text-decoration: none; display: inline-flex; align-items: center;">Free Consultation</a>' +
      '</nav>' +
      '<button class="hdr-burger" aria-label="Open menu" onclick="toggleMenu()">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#cfd8ea" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>' +
      '</button>' +
    '</div>' +
    mobileMenu() +
  '</header>';
}

function pageHero(kicker, title, sub, media) {
  return '' +
  '<section style="border-bottom: 1px solid rgba(255,255,255,0.06); padding: 64px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div class="hero-grid-cols" style="display: grid; grid-template-columns: minmax(0,1.05fr) minmax(0,0.95fr); gap: 48px; align-items: center;">' +
        '<div style="min-width: 0;">' +
          '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">' + kicker + '</div>' +
          '<h1 style="font-size: 48px; font-weight: 800; line-height: 1.04; margin: 0 0 18px;">' + title + '</h1>' +
          '<p style="font-size: 18px; line-height: 1.6; color: #aeb8cd; margin: 0; max-width: 62ch;">' + sub + '</p>' +
        '</div>' +
        media +
      '</div>' +
    '</div>' +
  '</section>';
}

function heroMedia(height, imgHtml) {
  return '<div class="hero-media" style="position: relative; height: ' + height + 'px; margin-right: -32px; min-width: 0;">' + imgHtml + heroFade + '</div>';
}

function ctaSection() {
  return '' +
  '<section style="padding: 64px 32px;">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; background: linear-gradient(120deg, #0d1526, #12203c 60%, #0e2a5c); border: 1px solid rgba(124,174,255,0.25); border-radius: 16px; padding: 48px 56px; display: grid; grid-template-columns: 1.3fr 1fr; gap: 48px; align-items: center; position: relative; overflow: hidden;">' +
      '<div style="position: absolute; right: -60px; bottom: -80px; width: 380px; height: 380px; border-radius: 50%; background: radial-gradient(circle, rgba(47,123,255,0.25), transparent 65%); pointer-events: none;"></div>' +
      '<div>' +
        '<div style="font-size: 13.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #4d8dff; margin-bottom: 14px;">Ready To Take The Next Step?</div>' +
        '<h2 style="font-size: 38px; font-weight: 800; margin: 0; line-height: 1.1; letter-spacing: -0.01em;">Let\'s Build a Smarter,<br>Stronger Business Together.</h2>' +
      '</div>' +
      '<div>' +
        '<p style="font-size: 16.5px; line-height: 1.6; color: #cfd8ea; margin: 0 0 22px;">Get a free consultation and see how AxisForce can help your business grow with the right technology.</p>' +
        btnPrimary("Book Free Consultation &nbsp;→", "contact", "15px 26px", "16px") +
        '<div style="font-size: 15px; font-weight: 600; color: #8b95ab; margin-top: 16px;">Or call us directly: <a href="tel:+13462181253" style="color: #eef2fa; text-decoration: none;">' + PHONE + '</a></div>' +
      '</div>' +
    '</div>' +
  '</section>';
}

function footer() {
  const cols = footerCols.map(col =>
    '<div>' +
      '<div style="font-size: 12.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #62708a; margin-bottom: 14px;">' + col.title + '</div>' +
      col.links.map(l => l.href ?
        '<a class="hoverlink" href="' + l.href + '" target="_blank" rel="noopener noreferrer" style="display: block; font-size: 14.5px; line-height: 2; color: #aeb8cd;">' + l.label + '</a>' :
        '<div class="hoverlink" style="font-size: 14.5px; line-height: 2; color: #aeb8cd; cursor: pointer;" onclick="nav(\'' + l.go + '\')">' + l.label + "</div>"
      ).join("") +
    '</div>').join("");
  return '' +
  '<footer style="border-top: 1px solid rgba(255,255,255,0.07); background: #05080f;">' +
    '<div class="grid-4 footer-grid" style="max-width: 1280px; margin: 0 auto; padding: 52px 32px 32px; display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 32px;">' +
      '<div>' +
        '<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">' +
          '<img src="/assets/images/branding/axisforce-mark.png" alt="AxisForce logo" style="width: 28px; height: 28px; object-fit: contain;">' +
          '<span style="font-weight: 800; font-size: 19px;"><span style="color: #fff;">Axis</span><span style="color: #2f7bff;">Force</span></span>' +
        '</div>' +
        '<div style="font-size: 14.5px; line-height: 1.6; color: #8b95ab; max-width: 34ch;">Managed IT, security, business automation, billing systems and digital growth solutions for businesses.</div>' +
        '<div style="font-size: 14px; color: #8b95ab; margin-top: 14px;">Houston, Texas</div>' +
        '<div style="font-size: 14px; margin-top: 6px;"><a href="tel:+13462181253" style="color: #aeb8cd; text-decoration: none;">' + PHONE + '</a></div>' +
        '<div style="font-size: 14px; margin-top: 2px;"><a href="mailto:info@axisforce.net" style="color: #aeb8cd; text-decoration: none;">info@axisforce.net</a></div>' +
      '</div>' +
      cols +
    '</div>' +
    '<div style="max-width: 1280px; margin: 0 auto; padding: 20px 32px 28px; border-top: 1px solid rgba(255,255,255,0.07); display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap; font-size: 14px; color: #5c6579;">' +
      '<span>© 2026 AxisForce Inc.</span>' +
      '<div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">' +
        '<span class="hoverlink" style="color: #8b95ab; cursor: pointer;" onclick="nav(\'privacy\')">Privacy Policy</span>' +
        '<span class="hoverlink" style="color: #8b95ab; cursor: pointer;" onclick="nav(\'terms\')">Terms of Service</span>' +
      '</div>' +
    '</div>' +
  '</footer>';
}

/* ---------- pages ---------- */
function homePage() {
  const trust = trustChips.map((c, i) =>
    '<div style="display: flex; align-items: center; gap: 9px; font-size: 14.5px; font-weight: 600; color: #cfd8ea; padding: 0 18px; border-left: 1px solid ' +
    (i === 0 ? "transparent" : "rgba(255,255,255,0.12)") + ';">' + icon(c.icon, 18, "#2f7bff") + c.label + "</div>").join("");

  const hCards = heroCards.map((hc, i) =>
    '<div style="padding: 16px 14px; border-left: 1px solid ' + div(i) + ';">' +
      '<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">' + icon(hc.icon, 19, "#2f7bff") +
        '<span style="font-size: 14.5px; font-weight: 700;">' + hc.name + '</span></div>' +
      '<div style="font-size: 12.5px; line-height: 1.45; color: #8b95ab;">' + hc.body + '</div>' +
    '</div>').join("");

  const partnersRow = SHOW_PARTNERS ?
    '<section style="border-bottom: 1px solid rgba(255,255,255,0.06); background: #08101f;">' +
      '<div class="tech-row" style="max-width: 1280px; margin: 0 auto; padding: 22px 32px;">' +
      '<span style="font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #4d8dff; white-space: nowrap;">Technologies We Work With</span>' +
      '<div class="tech-grid">' +
      partners.map(pt => '<span style="font-size: 16px; font-weight: 700; letter-spacing: 0.02em; color: #5c6579;">' + pt + "</span>").join("") +
      '</div></div></section>' : "";

  const svcCards = homeServices.map(s =>
    '<div class="card-hover" style="position: relative; background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 28px 24px; cursor: pointer; box-shadow: 0 2px 10px rgba(19,26,40,0.05);" onclick="nav(\'svc:' + s.no + '\')">' +
      (s.status ? '<span style="position: absolute; top: 20px; right: 20px; padding: 4px 11px; border-radius: 999px; font-size: 11.5px; font-weight: 700; letter-spacing: 0.04em; background: rgba(30,95,224,0.09); color: #1e5fe0; border: 1px solid rgba(30,95,224,0.25);">' + s.status + '</span>' : "") +
      '<div style="width: 52px; height: 52px; border-radius: 12px; background: rgba(30,95,224,0.08); border: 1px solid rgba(30,95,224,0.25); display: grid; place-items: center; margin-bottom: 18px;">' +
        icon(s.icon, 26, "#1e5fe0") + '</div>' +
      '<div style="font-size: 19px; font-weight: 700; margin-bottom: 8px; color: #0c1220;">' + s.name + '</div>' +
      '<div style="font-size: 14.5px; line-height: 1.55; color: #46536b; margin-bottom: 16px;">' + s.body + '</div>' +
      '<div style="font-size: 14px; font-weight: 700; color: #1e5fe0;">Learn More &nbsp;→</div>' +
    '</div>').join("");

  const statCells = stats.map((st, i) =>
    '<div style="display: flex; align-items: center; gap: 14px; padding: 30px 28px; border-left: 1px solid ' + div(i) + '; min-width: 0;">' +
      icon(st.icon, 28, "#2f7bff") +
      '<div style="font-size: 17px; font-weight: 700; min-width: 0; text-wrap: balance;">' + st.label + '</div>' +
    '</div>').join("");

  const indCells = industryRow.map((ind, i) =>
    '<div class="go-link" style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 0 32px; border-left: 1px solid ' + divLight(i) + ';" onclick="nav(\'industries\')">' +
      icon(ind.icon, 40, "#1e5fe0") +
      '<div style="font-size: 16px; font-weight: ' + (ind.badge ? "800" : "700") + '; line-height: 1.3; color: ' + (ind.badge ? "#1e5fe0" : "#131a28") + ';">' + ind.name + '</div>' +
      '<div style="font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #1e5fe0;">' + (ind.badge || "") + '</div>' +
    '</div>').join("");

  const caseCards = cases.map(cs =>
    '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 30px; box-shadow: 0 2px 10px rgba(19,26,40,0.05); display: flex; flex-direction: column; gap: 14px;">' +
      '<div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">' +
        '<h3 style="font-size: 22px; font-weight: 800; line-height: 1.15; margin: 0; color: #0c1220;">' + cs.name + '</h3>' +
        '<span style="padding: 4px 12px; border-radius: 999px; font-size: 12.5px; font-weight: 700; background: rgba(30,95,224,0.09); color: #1e5fe0; border: 1px solid rgba(30,95,224,0.25); white-space: nowrap;">' + cs.tag + '</span>' +
      '</div>' +
      '<div style="display: grid; grid-template-columns: 86px 1fr; gap: 6px 14px; font-size: 14.5px; line-height: 1.5;">' +
        '<span style="font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; font-size: 12px; color: #62708a; padding-top: 3px;">Challenge</span><span style="color: #34415c;">' + cs.challenge + '</span>' +
        '<span style="font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; font-size: 12px; color: #62708a; padding-top: 3px;">Solution</span><span style="color: #34415c;">' + cs.solution + '</span>' +
        '<span style="font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; font-size: 12px; color: #1e5fe0; padding-top: 3px;">Result</span><span style="color: #0c1220; font-weight: 600;">' + cs.result + '</span>' +
      '</div>' +
      '<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; padding-top: 6px;">' +
        cs.tech.map(tg => '<span style="padding: 4px 11px; border-radius: 999px; font-size: 12.5px; font-weight: 700; background: #e8edf6; color: #34415c;">' + tg + "</span>").join("") +
      '</div>' +
    '</div>').join("");

  const faqCards = faqs.map(fq =>
    '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 12px; padding: 22px 24px;">' +
      '<div style="font-size: 16.5px; font-weight: 700; color: #0c1220; margin-bottom: 8px;">' + fq.q + '</div>' +
      '<div style="font-size: 14.5px; line-height: 1.55; color: #46536b;">' + fq.a + '</div>' +
    '</div>').join("");

  const stepCells = steps.map(st =>
    '<div style="border-top: 3px solid #1e5fe0; padding-top: 20px;">' +
      '<div style="font-size: 13.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 10px;">' + st.no + ' · ' + st.when + '</div>' +
      '<div style="font-size: 23px; font-weight: 700; margin-bottom: 10px; color: #0c1220;">' + st.name + '</div>' +
      '<div style="font-size: 15.5px; line-height: 1.55; color: #46536b;">' + st.body + '</div>' +
    '</div>').join("");

  return '<main>' +
  '<section style="position: relative; border-bottom: 1px solid rgba(255,255,255,0.06);">' +
    '<div class="hero-grid-cols" style="max-width: 1280px; margin: 0 auto; padding: 72px 32px 96px; display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 48px; align-items: center;">' +
      '<div style="min-width: 0;">' +
        '<div style="display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(124,174,255,0.35); border-radius: 999px; padding: 7px 16px; font-size: 13.5px; font-weight: 600; color: #cfd8ea; margin-bottom: 28px; background: rgba(47,123,255,0.08);">' +
          '<span style="width: 8px; height: 8px; border-radius: 50%; background: #2f7bff; display: inline-block;"></span>' +
          'Technology Solutions That Drive Growth' +
        '</div>' +
        '<h1 style="font-size: 56px; font-weight: 800; line-height: 1.06; letter-spacing: -0.015em; margin: 0 0 22px;">' +
          HERO.l1 + '<br>' + HERO.l2 + '<br><span style="color: #2f7bff;">' + HERO.a + '</span></h1>' +
        '<p style="font-size: 18px; line-height: 1.6; color: #aeb8cd; max-width: 48ch; margin: 0 0 30px; text-wrap: pretty;">' + HERO.sub + '</p>' +
        '<div style="display: flex; gap: 14px; margin-bottom: 36px; flex-wrap: wrap;">' +
          btnPrimary("Book Free Consultation &nbsp;→", "contact", "15px 26px", "16px") +
          '<button class="btn btn-ghost-dark" style="padding: 15px 26px; font-size: 16px;" onclick="nav(\'services\')">Our Services &nbsp;→</button>' +
        '</div>' +
        '<div style="display: flex; align-items: center; flex-wrap: wrap;">' + trust + '</div>' +
      '</div>' +
      '<div style="position: relative; min-width: 0;">' +
        '<div class="hero-media" style="position: relative; height: 480px; margin-right: -32px;">' +
          slot("/assets/images/axisforce-hero-it.webp", "AxisForce IT professional monitoring network infrastructure and business technology systems", "", "", "", "hero-home-img") + heroFade +
        '</div>' +
        '<div class="hero-cards grid-4" style="position: absolute; left: 0; right: 0; bottom: -68px; display: grid; grid-template-columns: repeat(4, 1fr); background: rgba(10,16,30,0.92); backdrop-filter: blur(10px); border: 1px solid rgba(124,174,255,0.25); border-radius: 12px; box-shadow: 0 14px 40px rgba(0,0,0,0.5);">' +
          hCards +
        '</div>' +
      '</div>' +
    '</div>' +
  '</section>' +
  partnersRow +
  '<section style="background: #f2f5fa; color: #131a28; padding: 84px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 52px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">What We Do</div>' +
        '<h2 style="font-size: 42px; font-weight: 800; margin: 0 0 14px; letter-spacing: -0.01em; color: #0c1220;">Complete Technology Solutions</h2>' +
        '<p style="font-size: 17px; color: #46536b; max-width: 62ch; margin: 0 auto; line-height: 1.6;">From IT support to security, billing systems and digital marketing — end-to-end solutions to keep your business running smoothly.</p>' +
      '</div>' +
      '<div class="grid-services">' + svcCards + '</div>' +
      '<div style="text-align: center; margin-top: 40px;">' +
        '<span class="go-link" style="font-size: 15.5px; font-weight: 700; color: #1e5fe0;" onclick="nav(\'services\')">View All Services &nbsp;→</span>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="padding: 56px 32px; border-bottom: 1px solid rgba(255,255,255,0.06);">' +
    '<div class="grid-4" style="max-width: 1280px; margin: 0 auto; background: linear-gradient(180deg, rgba(20,30,52,0.7), rgba(10,16,30,0.95)); border: 1px solid rgba(124,174,255,0.22); border-radius: 14px; display: grid; grid-template-columns: repeat(4, 1fr);">' + statCells + '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 76px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto; text-align: center;">' +
      '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">Industries We Serve</div>' +
      '<h2 style="font-size: 40px; font-weight: 800; margin: 0 0 48px; letter-spacing: -0.01em; color: #0c1220;">Technology Solutions For Every Industry</h2>' +
      '<div style="display: flex; justify-content: center; align-items: stretch; flex-wrap: wrap; row-gap: 32px;">' + indCells + '</div>' +
      '<div style="margin-top: 40px;">' +
        '<span class="go-link" style="font-size: 15.5px; font-weight: 700; color: #1e5fe0;" onclick="nav(\'industries\')">Explore Industries &nbsp;→</span>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 76px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 44px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">Solutions &amp; Selected Work</div>' +
        '<h2 style="font-size: 40px; font-weight: 800; margin: 0; color: #0c1220;">Solutions Built for Real Business.</h2>' +
      '</div>' +
      '<div class="grid-cases" style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px;">' + caseCards + '</div>' +
      '<div style="margin-top: 44px; border-top: 1px solid #dbe3f0; padding-top: 44px;">' +
        '<h2 style="font-size: 32px; font-weight: 800; margin: 0 0 28px; color: #0c1220;">Frequently asked questions</h2>' +
        '<div class="grid-cases" style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px;">' + faqCards + '</div>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 0 32px 84px;">' +
    '<div style="max-width: 1280px; margin: 0 auto; border-top: 1px solid #dbe3f0; padding-top: 56px;">' +
      '<h2 style="font-size: 36px; font-weight: 800; margin: 0 0 40px; color: #0c1220;">How an engagement starts</h2>' +
      '<div class="grid-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px;">' + stepCells + '</div>' +
    '</div>' +
  '</section>' +
  '</main>';
}

function servicesPage() {
  const rows = services.map(s =>
    '<div class="svc-row" style="display: grid; grid-template-columns: 1fr 1.1fr; gap: 48px; padding: 44px 0; border-bottom: 1px solid #dbe3f0; align-items: start;">' +
      '<div>' +
        '<h2 style="font-size: 28px; font-weight: 800; margin: 0 0 10px; line-height: 1.1; color: #0c1220;">' + s.name + '</h2>' +
        '<p style="font-size: 15.5px; line-height: 1.6; color: #46536b; margin: 0 0 14px;">' + s.long + '</p>' +
        '<div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">' +
          '<span style="padding: 5px 12px; border-radius: 999px; font-size: 13px; font-weight: 700; background: #e8edf6; color: #34415c;">' + s.meta + '</span>' +
          (s.page ?
            '<span class="go-link" style="font-size: 14px; font-weight: 700; color: #1e5fe0;" onclick="nav(\'' + s.page + '\')">' + s.cta + ' &nbsp;→</span>' :
            '<span style="font-size: 14px; font-weight: 700; color: #1e5fe0; cursor: default;">' + s.cta + ' &nbsp;→</span>') +
        '</div>' +
      '</div>' +
      '<div>' +
        '<div style="font-size: 12.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #62708a; margin-bottom: 14px;">Included</div>' +
        '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px 24px;">' +
          s.items.map(it => '<div style="font-size: 14.5px; line-height: 1.4; color: #34415c; border-left: 2px solid #9db4dd; padding-left: 10px;">' + it + "</div>").join("") +
        '</div>' +
      '</div>' +
    '</div>').join("");

  return '<main>' +
  pageHero("Services",
    "Technology That Runs Your Business.<br>Nine Services. One Partner.",
    "From managed IT and security to AI automation, medical billing, software and digital growth, AxisForce brings the technology your business depends on under one team.",
    heroMedia(320, slot("/assets/images/axisforce-services-hero.webp", "AxisForce technology professional monitoring systems on a multi-monitor workstation with AxisForce branding on the wall", "", "", "", "services-hero-img"))) +
  '<section style="background: #f2f5fa; color: #131a28; padding: 40px 32px 72px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' + rows +
      '<div style="padding-top: 32px; display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap;">' +
        '<div style="font-size: 16.5px; color: #46536b; max-width: 52ch;">Clear starting prices where possible. Custom projects are quoted based on scope.</div>' +
        btnPrimary("See Pricing &nbsp;→", "pricing", "14px 24px", "15.5px", false) +
      '</div>' +
    '</div>' +
  '</section>' +
  '</main>';
}

function pricingPage() {
  const cards = priceCards.map(t =>
    '<div class="card-hover" style="background: #fff; border: 1px solid ' + t.border + '; border-radius: 14px; padding: 28px 26px; display: flex; flex-direction: column; box-shadow: 0 2px 10px rgba(19,26,40,0.05); position: relative; cursor: pointer;" onclick="nav(\'svc:' + t.no + '\')">' +
      (t.featured ? '<div style="position: absolute; top: -12px; left: 26px; background: linear-gradient(180deg, #3f87ff, #1e5fe0); color: #fff; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 12px; border-radius: 999px;">Most Common</div>' : "") +
      '<div style="font-size: 13.5px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #1e5fe0;">' + t.name + '</div>' +
      '<div style="font-size: 28px; font-weight: 800; line-height: 1.1; margin: 12px 0 4px; color: #0c1220;">' + t.price + '</div>' +
      '<div style="font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #62708a; margin-bottom: 14px;">' + t.unit + '</div>' +
      '<div style="font-size: 14.5px; line-height: 1.55; color: #46536b; margin-bottom: 16px;">' + t.body + '</div>' +
      '<div style="margin-top: auto; font-size: 14px; font-weight: 700; color: #1e5fe0;">View service →</div>' +
    '</div>').join("");

  const tableRows = services.map(s =>
    '<div style="display: grid; grid-template-columns: 2fr 1.2fr 1.4fr; padding: 14px 24px; border-bottom: 1px solid #e9eef7; font-size: 15px; align-items: baseline;">' +
      '<span style="font-weight: 600; color: #0c1220;">' + s.name + '</span>' +
      '<span style="color: #62708a;">' + s.group + '</span>' +
      '<span style="font-variant-numeric: tabular-nums; color: #34415c;">' + s.meta + '</span>' +
    '</div>').join("");

  return '<main>' +
  pageHero("Pricing",
    "Starting ranges, published.",
    "Real scopes move with site count, seat count and how much cleanup the existing setup needs. These are honest starting points — the written plan after your systems review carries the firm number.",
    heroMedia(300, slot("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80", "Planning session", "Photo by Helloquence on Unsplash", "https://unsplash.com/@helloquence", ""))) +
  '<section style="background: #f2f5fa; color: #131a28; padding: 56px 32px 72px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px; margin-bottom: 28px;">' + cards + '</div>' +
      '<div style="background: #fff; border: 1px solid #1e5fe0; border-radius: 14px; padding: 26px 30px; margin-bottom: 56px; display: grid; grid-template-columns: auto 1fr; gap: 20px; align-items: center;">' +
        icon("M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6zM9 12l2 2 4-4", 34, "#1e5fe0") +
        '<div>' +
          '<div style="font-size: 18px; font-weight: 800; color: #0c1220; margin-bottom: 4px;">No Contracts. Cancel Anytime.</div>' +
          '<div style="font-size: 14.5px; color: #46536b; line-height: 1.55;">Prorated refund policy: if you prepay for a service and cancel before the billing period ends, the unused portion is refunded on a prorated basis. Every project starts with a written plan and a firm number — "starting at" prices exist because every scope is different.</div>' +
        '</div>' +
      '</div>' +
      '<h2 style="font-size: 30px; font-weight: 800; margin: 0 0 22px; color: #0c1220;">Service starting points</h2>' +
      '<div class="table-scroll" style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; overflow: hidden;">' +
        '<div style="display: grid; grid-template-columns: 2fr 1.2fr 1.4fr; padding: 14px 24px; border-bottom: 2px solid #dbe3f0; font-size: 12.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #62708a;">' +
          '<span>Service</span><span>Group</span><span>Starting at</span>' +
        '</div>' + tableRows +
      '</div>' +
      '<div style="margin-top: 20px; font-size: 14px; color: #62708a; line-height: 1.5; max-width: 70ch;">These figures are placeholders pending your final price list — published prices are a commitment, so confirm each against your cost model before launch.</div>' +
    '</div>' +
  '</section>' +
  '</main>';
}

function industriesPage() {
  const blocks = industries.map(ind =>
    '<div class="grid-ind" style="border-bottom: 1px solid #dbe3f0; padding: 48px 0; display: grid; grid-template-columns: 1fr 1.3fr; gap: 56px; align-items: start;">' +
      '<div>' +
        '<span style="padding: 5px 12px; border-radius: 999px; font-size: 13px; font-weight: 700; background: rgba(30,95,224,0.09); color: #1e5fe0; border: 1px solid rgba(30,95,224,0.25);">' + ind.tag + '</span>' +
        '<h2 style="font-size: 34px; font-weight: 800; line-height: 1.05; margin: 16px 0 14px; color: #0c1220;">' + ind.name + '</h2>' +
        '<p style="font-size: 15.5px; line-height: 1.6; color: #46536b; margin: 0 0 22px;">' + ind.body + '</p>' +
        '<div style="border: 1px solid #dbe3f0; border-radius: 12px; overflow: hidden; height: 190px; position: relative; background: #fff;">' +
          slot(ind.imgSrc, ind.name, ind.imgCredit, ind.imgCreditHref, "") +
        '</div>' +
      '</div>' +
      '<div class="grid-cases" style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px;">' +
        ind.cells.map(c =>
          '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 12px; padding: 22px;">' +
            '<div style="font-size: 18px; font-weight: 700; margin-bottom: 8px; color: #0c1220;">' + c.name + '</div>' +
            '<div style="font-size: 14px; line-height: 1.5; color: #46536b;">' + c.detail + '</div>' +
          '</div>').join("") +
      '</div>' +
    '</div>').join("");

  return '<main>' +
  pageHero("Industries",
    "We go deep where downtime costs real money.",
    "Medical practices, fuel &amp; convenience retail, restaurants, law firms and local retail — environments where the systems can't stop.",
    heroMedia(300, slot("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80", "Client storefronts", "Photo by Sean Pollock on Unsplash", "https://unsplash.com/@seanpollock", ""))) +
  '<section style="background: #f2f5fa; color: #131a28; padding: 24px 32px 72px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' + blocks + '</div>' +
  '</section>' +
  '</main>';
}

function aboutPage() {
  const factRows = facts.map(f =>
    '<div style="display: flex; justify-content: space-between; gap: 24px; padding: 11px 0; border-bottom: 1px dashed #dbe3f0;">' +
      '<span style="font-size: 13.5px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #62708a;">' + f.k + '</span>' +
      '<span style="font-size: 15px; text-align: right; color: #0c1220;">' + f.v + '</span>' +
    '</div>').join("");

  const prCards = principles.map(p =>
    '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 28px;">' +
      '<div style="font-size: 21px; font-weight: 700; color: #0c1220; margin-bottom: 10px;">' + p.name + '</div>' +
      '<div style="font-size: 15px; line-height: 1.55; color: #46536b;">' + p.body + '</div>' +
    '</div>').join("");

  return '<main>' +
  pageHero("About Us",
    "Houston-Based Technology.<br>Built Around Your Business.",
    "AxisForce helps businesses build, secure, automate and support the technology they depend on — from IT infrastructure and security to business software, medical billing technology and digital growth.",
    heroMedia(300, slot("/assets/images/axisforce-about-hero.webp", "AxisForce technology professional working at a multi-monitor workstation in a server environment", "", "", "", "about-hero-img"))) +
  '<section style="background: #f2f5fa; color: #131a28; padding: 56px 32px 72px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div class="grid-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 56px; margin-bottom: 56px;">' +
        '<div>' +
          '<p style="font-size: 17px; line-height: 1.65; color: #34415c; margin: 0 0 18px;">AxisForce is a Houston-based technology company helping businesses simplify the systems behind their operations. We bring IT support, security, automation, software, business intelligence and digital solutions together under one technology partner.</p>' +
          '<p style="font-size: 17px; line-height: 1.65; color: #34415c; margin: 0 0 28px;">Our approach is practical: understand how the business operates, identify what is slowing it down or creating risk, and build the right solution around it. Whether that means supporting an existing environment or developing something new, our focus is technology that produces measurable business value.</p>' +
          '<div style="border: 1px solid #dbe3f0; border-radius: 12px; overflow: hidden; height: 280px; position: relative; background: #fff;">' +
            slot("/assets/images/axisforce-about-secondary.webp", "Laptop, tablet and AxisForce-branded notebook alongside network equipment and a security camera", "", "", "", "about-secondary-img") +
          '</div>' +
        '</div>' +
        '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 32px; align-self: start; box-shadow: 0 2px 10px rgba(19,26,40,0.05);">' +
          '<div style="font-size: 13.5px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 20px;">Facts sheet</div>' +
          factRows +
        '</div>' +
      '</div>' +
      '<h2 style="font-size: 32px; font-weight: 800; margin: 80px 0 28px; scroll-margin-top: 96px; color: #0c1220;">How we work</h2>' +
      '<div class="grid-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px;">' + prCards + '</div>' +
    '</div>' +
  '</section>' +
  '</main>';
}

const managedItHandled = [
  { name: "Unlimited Remote IT Support", body: "Ongoing help desk support for your team, whenever something isn't working.", icon: I.headset },
  { name: "Computer & Software Troubleshooting", body: "Fast diagnosis and fixes for day-to-day technology issues.", icon: I.code },
  { name: "Microsoft 365 Support", body: "Setup, management and troubleshooting across your Microsoft 365 environment.", icon: I.globe },
  { name: "User & Device Management", body: "Provisioning, permissions and device oversight for your whole team.", icon: I.users },
  { name: "Monitoring & Patching", body: "Proactive system monitoring and regular security patching.", icon: I.chart },
  { name: "Backups & Recovery", body: "Backup systems in place so your data is protected and recoverable.", icon: I.clock },
  { name: "Network & Wi-Fi Support", body: "Keeping your connectivity fast, stable and secure.", icon: I.wifi },
  { name: "IT Security Support", body: "Guidance and support to help keep your systems and data protected.", icon: I.shield },
  { name: "Vendor Coordination", body: "We work directly with your software and hardware vendors so you don't have to.", icon: I.briefcase },
  { name: "Employee Onboarding & Offboarding", body: "Accounts, access and devices set up and retired properly, every time.", icon: I.growth }
];

const managedItPlanning = [
  { no: "01", name: "Proactive Monitoring", detail: "We watch for issues before they turn into downtime, not after." },
  { no: "02", name: "Infrastructure Management", detail: "Networks, servers and cloud systems kept current, documented and reliable." },
  { no: "03", name: "Security & Data Protection", detail: "Practical safeguards to help protect your systems and business data." },
  { no: "04", name: "Long-Term IT Planning", detail: "A technology roadmap that grows with your business, not just a break-fix relationship." }
];

const managedItPricing = [
  { name: "Essential", price: "$399", unit: "per month", body: "Up to 3 users. Unlimited remote help, monitoring and patching for small teams getting started with managed IT.", featured: false },
  { name: "Professional", price: "$750", unit: "per month", body: "Up to 10 users. Unlimited remote help plus proactive monitoring, backups and vendor coordination as your team grows.", featured: true },
  { name: "Advanced", price: "$1,500", unit: "per month", body: "Up to 25 users. Full managed IT coverage — unlimited remote help, monitoring, backups, network support and device management.", featured: false },
  { name: "Enterprise", price: "Starting at $2,500", unit: "per month", body: "25+ users or custom scope. Unlimited remote help, scaled for larger organizations, multi-location businesses, clinics and healthcare organizations.", featured: false }
];

const managedItWhy = [
  { name: "One Technology Partner", body: "IT, networking, software and vendors — coordinated by one accountable team instead of juggled across several." },
  { name: "Responsive Support", body: "Real people who know your systems, ready to help when something isn't working." },
  { name: "Predictable Pricing", body: "Flat monthly plans with no surprise invoices." },
  { name: "Documentation", body: "Clear records of your systems and configurations, so nothing lives only in someone's head." },
  { name: "Security-Minded Practices", body: "Sensible safeguards built into how we manage your systems day to day." },
  { name: "Scalable Support", body: "Plans that grow with your team, from a handful of users to a full organization." }
];

function managedITPage() {
  const trust = ['Unlimited Remote Help', 'Houston-Based', 'No Long-Term Contracts'].map((label, i) =>
    '<div style="display: flex; align-items: center; gap: 9px; font-size: 14.5px; font-weight: 600; color: #cfd8ea; padding: 0 18px; border-left: 1px solid ' +
    (i === 0 ? "transparent" : "rgba(255,255,255,0.12)") + ';">' + icon([I.headset, I.pin, I.shield][i], 18, "#2f7bff") + label + "</div>").join("");

  const handledCards = managedItHandled.map(h =>
    '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 26px 24px;">' +
      '<div style="width: 46px; height: 46px; border-radius: 12px; background: rgba(30,95,224,0.08); border: 1px solid rgba(30,95,224,0.25); display: grid; place-items: center; margin-bottom: 16px;">' +
        icon(h.icon, 22, "#1e5fe0") + '</div>' +
      '<div style="font-size: 17px; font-weight: 700; margin-bottom: 6px; color: #0c1220;">' + h.name + '</div>' +
      '<div style="font-size: 14px; line-height: 1.5; color: #46536b;">' + h.body + '</div>' +
    '</div>').join("");

  const planningRows = managedItPlanning.map(f =>
    '<div style="display: grid; grid-template-columns: 30px 1fr; gap: 14px; padding: 14px 0; border-bottom: 1px dashed rgba(124,174,255,0.25);">' +
      '<span style="color: #4d8dff; font-weight: 700; font-size: 15px;">' + f.no + '</span>' +
      '<div><div style="font-size: 17px; font-weight: 700;">' + f.name + '</div>' +
      '<div style="font-size: 14px; color: #8b95ab; line-height: 1.45;">' + f.detail + '</div></div>' +
    '</div>').join("");

  const pricingCards = managedItPricing.map(t =>
    '<div class="card-hover" style="background: #fff; border: 1px solid ' + (t.featured ? "#1e5fe0" : "#dbe3f0") + '; border-radius: 14px; padding: 28px 26px; display: flex; flex-direction: column; box-shadow: 0 2px 10px rgba(19,26,40,0.05); position: relative;">' +
      (t.featured ? '<div style="position: absolute; top: -12px; left: 26px; background: linear-gradient(180deg, #3f87ff, #1e5fe0); color: #fff; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 12px; border-radius: 999px;">Most Common</div>' : "") +
      '<div style="font-size: 13.5px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #1e5fe0;">' + t.name + '</div>' +
      '<div style="font-size: 28px; font-weight: 800; line-height: 1.1; margin: 12px 0 4px; color: #0c1220;">' + t.price + '</div>' +
      '<div style="font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #62708a; margin-bottom: 14px;">' + t.unit + '</div>' +
      '<div style="font-size: 14.5px; line-height: 1.55; color: #46536b; margin-bottom: 18px;">' + t.body + '</div>' +
      '<div style="margin-top: auto;">' + btnPrimary("Get Free Consultation", "contact", "12px 18px", "14.5px", false) + '</div>' +
    '</div>').join("");

  const whyCards = managedItWhy.map(w =>
    '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 26px;">' +
      '<div style="font-size: 18px; font-weight: 700; color: #0c1220; margin-bottom: 8px;">' + w.name + '</div>' +
      '<div style="font-size: 14.5px; line-height: 1.55; color: #46536b;">' + w.body + '</div>' +
    '</div>').join("");

  return '<main>' +
  '<section style="position: relative; border-bottom: 1px solid rgba(255,255,255,0.06);">' +
    '<div class="hero-grid-cols" style="max-width: 1280px; margin: 0 auto; padding: 64px 32px 88px; display: grid; grid-template-columns: minmax(0,1.05fr) minmax(0,0.95fr); gap: 48px; align-items: center;">' +
      '<div style="min-width: 0;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Managed IT Support</div>' +
        '<h1 style="font-size: 48px; font-weight: 800; line-height: 1.06; margin: 0 0 18px;">Your IT Department.<br>Without the Overhead.</h1>' +
        '<p style="font-size: 18px; line-height: 1.6; color: #aeb8cd; margin: 0 0 28px; max-width: 54ch;">AxisForce becomes the technology team behind your business — proactive support, monitoring and <strong style="color: #eef2fa;">unlimited remote help</strong> so your team can stop worrying about IT and focus on the work that matters.</p>' +
        '<div style="margin-bottom: 30px;">' + btnPrimary("Get Free Consultation &nbsp;→", "contact", "15px 26px", "16px") + '</div>' +
        '<div style="display: flex; align-items: center; flex-wrap: wrap;">' + trust + '</div>' +
      '</div>' +
      heroMedia(360, slot("/assets/images/axisforce-managed-it-hero.webp", "AxisForce managed IT dashboard on a laptop with the AxisForce logo displayed on an office monitor in the background", "", "", "")) +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 76px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 48px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">What We Handle</div>' +
        '<h2 style="font-size: 38px; font-weight: 800; margin: 0 0 14px; color: #0c1220;">Everyday IT, Fully Covered</h2>' +
        '<p style="font-size: 16.5px; color: #46536b; max-width: 62ch; margin: 0 auto; line-height: 1.6;">From the help desk to the network closet, here is everything included when AxisForce becomes your IT department.</p>' +
      '</div>' +
      '<div class="grid-handled" style="display: grid; gap: 18px;">' + handledCards + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06);">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; padding: 76px 32px; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;">' +
      '<div style="border-radius: 14px; overflow: hidden; height: 420px; position: relative;">' +
        slot("/assets/images/axisforce-managed-it-team.webp", "AxisForce technician monitoring client systems across multiple screens", "", "", "") +
      '</div>' +
      '<div>' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Technology Partner</div>' +
        '<h2 style="font-size: 34px; font-weight: 800; margin: 0 0 18px; line-height: 1.1;">More Than a Help Desk.</h2>' +
        '<p style="font-size: 16.5px; line-height: 1.6; color: #aeb8cd; margin: 0 0 8px; max-width: 46ch;">Managed IT with AxisForce goes beyond fixing what breaks — it is a long-term technology partnership built around your business.</p>' +
        planningRows +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 76px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 44px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">Pricing</div>' +
        '<h2 style="font-size: 38px; font-weight: 800; margin: 0; color: #0c1220;">Simple, Transparent Plans</h2>' +
      '</div>' +
      '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px;">' + pricingCards + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 0 32px 84px;">' +
    '<div style="max-width: 1280px; margin: 0 auto; border-top: 1px solid #dbe3f0; padding-top: 56px;">' +
      '<div style="text-align: center; margin-bottom: 44px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">Why AxisForce</div>' +
        '<h2 style="font-size: 38px; font-weight: 800; margin: 0; color: #0c1220;">A Technology Partner You Can Count On</h2>' +
      '</div>' +
      '<div class="grid-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;">' + whyCards + '</div>' +
    '</div>' +
  '</section>' +
  '</main>';
}

const aiAutomationHandled = [
  { name: "Custom AI Agents", body: "AI agents built around your specific workflows and business processes.", icon: I.bot },
  { name: "Voice AI", body: "AI-powered voice handling for calls, intake and routine conversations.", icon: I.headset },
  { name: "Workflow Automation", body: "Multi-step processes automated from trigger to completion.", icon: I.code },
  { name: "Customer Support Automation", body: "Automated responses and routing that keep customers moving without waiting.", icon: I.users },
  { name: "Lead Follow-Up & Appointment Automation", body: "Automated follow-ups, reminders and scheduling that do not fall through the cracks.", icon: I.clock },
  { name: "Document Processing", body: "Extracting, organizing and summarizing documents automatically.", icon: I.billing },
  { name: "CRM Automation", body: "Records updated and interactions tracked without manual data entry.", icon: I.chart },
  { name: "Email & Communication Automation", body: "Automated replies, routing and follow-up across email and messaging.", icon: I.globe },
  { name: "Reporting & Dashboards", body: "Real-time visibility into what is automated and what it is saving you.", icon: I.growth },
  { name: "System Integrations", body: "Connecting the tools you already use so data moves automatically between them.", icon: I.wifi }
];

const aiAutomationProcess = [
  { no: "01", name: "Discover", detail: "We understand your business, processes and pain points." },
  { no: "02", name: "Automate", detail: "We build custom workflows and AI-powered solutions." },
  { no: "03", name: "Integrate", detail: "We connect your tools, systems and data seamlessly." },
  { no: "04", name: "Improve", detail: "We monitor performance and continuously optimize." }
];

const aiAutomationWhy = [
  { name: "Practical, Not Hype", body: "We build automation that solves real problems, not automation for its own sake." },
  { name: "Custom-Built", body: "Every automation is scoped around how your business actually works." },
  { name: "Integrates With What You Have", body: "We connect to your existing tools instead of asking you to replace them." },
  { name: "Measurable Improvements", body: "Automation scoped and measured against the time and cost it actually saves." },
  { name: "Human Oversight", body: "AI handles the repetitive work while your team stays in control of judgment calls." },
  { name: "Ongoing Support", body: "We monitor, adjust and improve your automation as your business changes." }
];

function aiAutomationPage() {
  const trust = ['AI Agents', 'Workflow Automation', 'Voice AI', 'Smart Integrations'].map((label, i) =>
    '<div style="display: flex; align-items: center; gap: 9px; font-size: 14.5px; font-weight: 600; color: #cfd8ea; padding: 0 18px; border-left: 1px solid ' +
    (i === 0 ? "transparent" : "rgba(255,255,255,0.12)") + ';">' + icon([I.bot, I.code, I.headset, I.wifi][i], 18, "#2f7bff") + label + "</div>").join("");

  const handledCards = aiAutomationHandled.map(h =>
    '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 26px 24px;">' +
      '<div style="width: 46px; height: 46px; border-radius: 12px; background: rgba(30,95,224,0.08); border: 1px solid rgba(30,95,224,0.25); display: grid; place-items: center; margin-bottom: 16px;">' +
        icon(h.icon, 22, "#1e5fe0") + '</div>' +
      '<div style="font-size: 17px; font-weight: 700; margin-bottom: 6px; color: #0c1220;">' + h.name + '</div>' +
      '<div style="font-size: 14px; line-height: 1.5; color: #46536b;">' + h.body + '</div>' +
    '</div>').join("");

  const processRows = aiAutomationProcess.map(f =>
    '<div style="display: grid; grid-template-columns: 30px 1fr; gap: 14px; padding: 14px 0; border-bottom: 1px dashed rgba(124,174,255,0.25);">' +
      '<span style="color: #4d8dff; font-weight: 700; font-size: 15px;">' + f.no + '</span>' +
      '<div><div style="font-size: 17px; font-weight: 700;">' + f.name + '</div>' +
      '<div style="font-size: 14px; color: #8b95ab; line-height: 1.45;">' + f.detail + '</div></div>' +
    '</div>').join("");

  const whyCards = aiAutomationWhy.map(w =>
    '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 26px;">' +
      '<div style="font-size: 18px; font-weight: 700; color: #0c1220; margin-bottom: 8px;">' + w.name + '</div>' +
      '<div style="font-size: 14.5px; line-height: 1.55; color: #46536b;">' + w.body + '</div>' +
    '</div>').join("");

  return '<main>' +
  '<section style="position: relative; border-bottom: 1px solid rgba(255,255,255,0.06);">' +
    '<div class="hero-grid-cols" style="max-width: 1280px; margin: 0 auto; padding: 64px 32px 88px; display: grid; grid-template-columns: minmax(0,1.05fr) minmax(0,0.95fr); gap: 48px; align-items: center;">' +
      '<div style="min-width: 0;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">AI &amp; Business Automation</div>' +
        '<h1 style="font-size: 44px; font-weight: 800; line-height: 1.08; margin: 0 0 18px;">Automate the Work That Slows Your Business Down.</h1>' +
        '<p style="font-size: 18px; line-height: 1.6; color: #aeb8cd; margin: 0 0 28px; max-width: 54ch;">AxisForce builds custom AI agents and automation that reduce repetitive work, connect your systems and improve day-to-day operations — scoped to your business, not a generic template.</p>' +
        '<div style="margin-bottom: 30px;">' + btnPrimary("Get Free AI Consultation &nbsp;→", "contact", "15px 26px", "16px") + '</div>' +
        '<div style="display: flex; align-items: center; flex-wrap: wrap; row-gap: 12px;">' + trust + '</div>' +
      '</div>' +
      heroMedia(360, slot("/assets/images/axisforce-ai-automation-hero.webp", "Laptop showing an automation dashboard on a desk with an AxisForce-branded mug", "", "", "")) +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 76px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 48px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">What We Automate</div>' +
        '<h2 style="font-size: 38px; font-weight: 800; margin: 0 0 14px; color: #0c1220;">Your Business. Smarter, Faster, Automated.</h2>' +
        '<p style="font-size: 16.5px; color: #46536b; max-width: 62ch; margin: 0 auto; line-height: 1.6;">From the first customer touchpoint to the reporting at the end of the month, here is where automation can take the repetitive work off your plate.</p>' +
      '</div>' +
      '<div class="grid-handled" style="display: grid; gap: 18px;">' + handledCards + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06);">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; padding: 76px 32px; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;">' +
      '<div style="border-radius: 14px; overflow: hidden; height: 420px; position: relative;">' +
        slot("/assets/images/axisforce-ai-automation-process.webp", "AxisForce team member reviewing automation performance dashboards across multiple screens", "", "", "") +
      '</div>' +
      '<div>' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Our Process</div>' +
        '<h2 style="font-size: 34px; font-weight: 800; margin: 0 0 18px; line-height: 1.1;">A Practical Path to Automation.</h2>' +
        '<p style="font-size: 16.5px; line-height: 1.6; color: #aeb8cd; margin: 0 0 8px; max-width: 46ch;">We start with the problem your business actually has, then build the automation around it — not the other way around.</p>' +
        processRows +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="padding: 76px 32px;">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; background: linear-gradient(120deg, #0d1526, #12203c 60%, #0e2a5c); border: 1px solid rgba(124,174,255,0.25); border-radius: 16px; padding: 48px 56px; display: grid; grid-template-columns: 1.3fr 1fr; gap: 48px; align-items: center; position: relative; overflow: hidden;">' +
      '<div style="position: absolute; right: -60px; bottom: -80px; width: 380px; height: 380px; border-radius: 50%; background: radial-gradient(circle, rgba(47,123,255,0.25), transparent 65%); pointer-events: none;"></div>' +
      '<div>' +
        '<div style="font-size: 13.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #4d8dff; margin-bottom: 14px;">No Two Businesses Automate the Same Way</div>' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0; line-height: 1.1; letter-spacing: -0.01em;">Let’s Find What You Can Automate.</h2>' +
      '</div>' +
      '<div>' +
        '<p style="font-size: 16.5px; line-height: 1.6; color: #cfd8ea; margin: 0 0 22px;">AI automation varies by project, so we do not publish fixed packages here. Tell us what is eating your team’s time and we’ll identify where automation can make the biggest impact first.</p>' +
        btnPrimary("Get Free AI Consultation &nbsp;→", "contact", "15px 26px", "16px") +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 0 32px 84px;">' +
    '<div style="max-width: 1280px; margin: 0 auto; border-top: 1px solid #dbe3f0; padding-top: 56px;">' +
      '<div style="text-align: center; margin-bottom: 44px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">Why AxisForce</div>' +
        '<h2 style="font-size: 38px; font-weight: 800; margin: 0; color: #0c1220;">Automation Built Around Your Business</h2>' +
      '</div>' +
      '<div class="grid-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;">' + whyCards + '</div>' +
    '</div>' +
  '</section>' +
  '</main>';
}

const medicalBillingHandled = [
  { name: "Eligibility Verification", body: "Confirming insurance eligibility and benefits before every visit.", icon: I.shield },
  { name: "Charge Entry", body: "Accurate charge entry using current coding and payer guidelines.", icon: I.billing },
  { name: "Claim Submission", body: "Clean claims submitted electronically for faster processing.", icon: I.globe },
  { name: "Payment Posting", body: "Payments posted promptly and patient balances kept current.", icon: I.chart },
  { name: "Denial Management", body: "Identifying, appealing and resolving denied claims.", icon: I.cross },
  { name: "A/R Follow-Up", body: "Following up on unpaid claims so nothing sits unworked.", icon: I.clock },
  { name: "Reporting & Analytics", body: "Regular reporting so you can see where your revenue stands.", icon: I.growth },
  { name: "Insurance Follow-Up", body: "Staying on top of payers until claims are resolved.", icon: I.headset },
  { name: "Patient Balance Management", body: "Clear, accurate patient statements and balance tracking.", icon: I.users },
  { name: "Billing Performance Monitoring", body: "Ongoing monitoring of your billing metrics and trends.", icon: I.wifi }
];

const medicalBillingProcess = [
  { no: "01", name: "Eligibility", detail: "Coverage verified before the visit." },
  { no: "02", name: "Charge Entry", detail: "Accurate coding entered promptly." },
  { no: "03", name: "Claim Submission", detail: "Clean claims submitted electronically." },
  { no: "04", name: "Payment Posting", detail: "Payments posted and balances updated." },
  { no: "05", name: "Denial Management", detail: "Denials identified and resolved." },
  { no: "06", name: "A/R Follow-Up", detail: "Unpaid claims followed up until resolved." },
  { no: "07", name: "Reporting", detail: "Regular visibility into your billing performance." }
];

const medicalBillingWhy = [
  { name: "End-to-End Billing", body: "From eligibility to final payment, we manage the entire revenue cycle." },
  { name: "Focused on Collections", body: "Our priority is getting your claims paid, not just submitted." },
  { name: "Denial Follow-Up", body: "We stay on denied claims until they are resolved." },
  { name: "Transparent Reporting", body: "Clear visibility into your claims, collections and A/R." },
  { name: "Technology-Driven Workflow", body: "Modern billing systems built for accuracy and speed." },
  { name: "Dedicated Support", body: "A team that knows your account, not a rotating call center." }
];

function medicalBillingPage() {
  const trust = [
    { label: "Complete Revenue Cycle Management", icon: I.billing },
    { label: "Dedicated Billing Support", icon: I.headset },
    { label: "3% of Collections", icon: I.chart }
  ].map((c, i) =>
    '<div style="display: flex; align-items: center; gap: 9px; font-size: 14.5px; font-weight: 600; color: #cfd8ea; padding: 0 18px; border-left: 1px solid ' +
    (i === 0 ? "transparent" : "rgba(255,255,255,0.12)") + ';">' + icon(c.icon, 18, "#2f7bff") + c.label + "</div>").join("");

  const handledCards = medicalBillingHandled.map(h =>
    '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 26px 24px;">' +
      '<div style="width: 46px; height: 46px; border-radius: 12px; background: rgba(30,95,224,0.08); border: 1px solid rgba(30,95,224,0.25); display: grid; place-items: center; margin-bottom: 16px;">' +
        icon(h.icon, 22, "#1e5fe0") + '</div>' +
      '<div style="font-size: 17px; font-weight: 700; margin-bottom: 6px; color: #0c1220;">' + h.name + '</div>' +
      '<div style="font-size: 14px; line-height: 1.5; color: #46536b;">' + h.body + '</div>' +
    '</div>').join("");

  const processRows = medicalBillingProcess.map(f =>
    '<div style="display: grid; grid-template-columns: 30px 1fr; gap: 14px; padding: 14px 0; border-bottom: 1px dashed rgba(124,174,255,0.25);">' +
      '<span style="color: #4d8dff; font-weight: 700; font-size: 15px;">' + f.no + '</span>' +
      '<div><div style="font-size: 17px; font-weight: 700;">' + f.name + '</div>' +
      '<div style="font-size: 14px; color: #8b95ab; line-height: 1.45;">' + f.detail + '</div></div>' +
    '</div>').join("");

  const whyCards = medicalBillingWhy.map(w =>
    '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 26px;">' +
      '<div style="font-size: 18px; font-weight: 700; color: #0c1220; margin-bottom: 8px;">' + w.name + '</div>' +
      '<div style="font-size: 14.5px; line-height: 1.55; color: #46536b;">' + w.body + '</div>' +
    '</div>').join("");

  return '<main>' +
  '<section style="position: relative; border-bottom: 1px solid rgba(255,255,255,0.06);">' +
    '<div class="hero-grid-cols" style="max-width: 1280px; margin: 0 auto; padding: 64px 32px 88px; display: grid; grid-template-columns: minmax(0,1.05fr) minmax(0,0.95fr); gap: 48px; align-items: center;">' +
      '<div style="min-width: 0;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Medical Billing Services</div>' +
        '<h1 style="font-size: 46px; font-weight: 800; line-height: 1.08; margin: 0 0 18px;">We Handle the Billing.<br>You Focus on Care.</h1>' +
        '<p style="font-size: 18px; line-height: 1.6; color: #aeb8cd; margin: 0 0 28px; max-width: 54ch;">AxisForce provides end-to-end revenue cycle management for healthcare practices — helping improve collections, manage denials, and free providers to focus on patients.</p>' +
        '<div style="margin-bottom: 30px;">' + btnPrimary("Get Free Billing Consultation &nbsp;→", "contact", "15px 26px", "16px") + '</div>' +
        '<div style="display: flex; align-items: center; flex-wrap: wrap; row-gap: 12px;">' + trust + '</div>' +
      '</div>' +
      heroMedia(360, slot("/assets/images/axisforce-medical-billing-hero.webp", "Revenue cycle dashboard on a monitor next to a stethoscope and an AxisForce-branded mug", "", "", "")) +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 76px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 48px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">What We Handle</div>' +
        '<h2 style="font-size: 38px; font-weight: 800; margin: 0 0 14px; color: #0c1220;">Your Revenue Cycle, Fully Managed</h2>' +
      '</div>' +
      '<div class="grid-handled" style="display: grid; gap: 18px;">' + handledCards + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06);">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; padding: 76px 32px; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;">' +
      '<div style="border-radius: 14px; overflow: hidden; height: 280px; position: relative;">' +
        slot("/assets/images/axisforce-medical-billing-process.webp", "Revenue cycle overview dashboard showing collections and claim status", "", "", "") +
      '</div>' +
      '<div>' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Billing Process</div>' +
        '<h2 style="font-size: 34px; font-weight: 800; margin: 0 0 18px; line-height: 1.1;">Our Billing Process</h2>' +
        '<p style="font-size: 16.5px; line-height: 1.6; color: #aeb8cd; margin: 0 0 8px; max-width: 46ch;">From patient to payment, here is how we manage every claim.</p>' +
        processRows +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 76px 32px;">' +
    '<div style="max-width: 640px; margin: 0 auto; text-align: center;">' +
      '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">Pricing</div>' +
      '<h2 style="font-size: 34px; font-weight: 800; margin: 0 0 32px; color: #0c1220;">Simple, Performance-Based Pricing</h2>' +
      '<div class="card-hover" style="background: #fff; border: 1px solid #1e5fe0; border-radius: 16px; padding: 40px 36px; box-shadow: 0 2px 10px rgba(19,26,40,0.05);">' +
        '<div style="font-size: 56px; font-weight: 800; line-height: 1; color: #1e5fe0;">3%</div>' +
        '<div style="font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #62708a; margin: 8px 0 20px;">of Collections</div>' +
        '<p style="font-size: 16px; line-height: 1.6; color: #34415c; margin: 0 0 24px;">Simple pricing at 3% of collected revenue we manage through your billing cycle.</p>' +
        '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px 20px; text-align: left; margin-bottom: 28px;">' +
          ["No long-term contract", "Transparent monthly reporting", "Billing support included", "Pricing aligned with collections"].map(t =>
            '<div style="font-size: 14.5px; line-height: 1.4; color: #34415c; border-left: 2px solid #9db4dd; padding-left: 10px;">' + t + "</div>").join("") +
        '</div>' +
        btnPrimary("Get Free Billing Consultation &nbsp;→", "contact", "14px 24px", "15.5px", false) +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 0 32px 84px;">' +
    '<div style="max-width: 1280px; margin: 0 auto; border-top: 1px solid #dbe3f0; padding-top: 56px;">' +
      '<div style="text-align: center; margin-bottom: 44px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">Why AxisForce</div>' +
        '<h2 style="font-size: 38px; font-weight: 800; margin: 0; color: #0c1220;">A Billing Partner Focused on Your Revenue Cycle.</h2>' +
      '</div>' +
      '<div class="grid-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;">' + whyCards + '</div>' +
    '</div>' +
  '</section>' +
  '</main>';
}

function productFrame(src, alt, w, h) {
  const dims = (w && h) ? ' width="' + w + '" height="' + h + '"' : '';
  return '' +
  '<div style="position: relative;">' +
    '<div style="position: absolute; inset: -20px; background: radial-gradient(circle at 50% 45%, rgba(47,123,255,0.22), transparent 70%); filter: blur(16px); pointer-events: none;"></div>' +
    '<div style="position: relative; background: #0d1526; border: 1px solid rgba(77,141,255,0.24); border-radius: 16px; overflow: hidden; box-shadow: 0 18px 48px rgba(8,12,24,0.4), 0 2px 12px rgba(30,95,224,0.1);">' +
      '<div style="display: flex; align-items: center; gap: 6px; padding: 10px 14px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.06);">' +
        '<span style="width: 9px; height: 9px; border-radius: 50%; background: #ff5f57; display: inline-block;"></span>' +
        '<span style="width: 9px; height: 9px; border-radius: 50%; background: #febc2e; display: inline-block;"></span>' +
        '<span style="width: 9px; height: 9px; border-radius: 50%; background: #28c840; display: inline-block;"></span>' +
      '</div>' +
      '<img src="' + src + '" alt="' + alt + '" loading="lazy"' + dims + ' style="display: block; width: 100%; height: auto;">' +
    '</div>' +
  '</div>';
}

function heroShowcaseImage(src, alt, pos) {
  return '' +
  '<div style="position: relative;">' +
    '<div style="position: absolute; inset: -30px; background: radial-gradient(circle at 62% 45%, rgba(47,123,255,0.32), transparent 70%); filter: blur(20px); pointer-events: none;"></div>' +
    '<div style="position: relative; border-radius: 20px; overflow: hidden; box-shadow: 0 24px 70px rgba(0,0,0,0.5); aspect-ratio: 1017 / 916;">' +
      '<img src="' + src + '" alt="' + alt + '" width="1717" height="916" style="display: block; width: 100%; height: 100%; object-fit: cover; object-position: ' + (pos || "100% 50%") + ';">' +
    '</div>' +
  '</div>';
}

const billingSoftwareFeatures = [
  { name: "Patient Management", body: "Organize patient information and keep billing records connected.", icon: I.users },
  { name: "Insurance Management", body: "Maintain insurance policy information alongside patient records.", icon: I.shield },
  { name: "Claims Management", body: "Create, track and manage claims through their billing lifecycle.", icon: I.billing },
  { name: "Payment Tracking", body: "Keep visibility into paid and outstanding balances.", icon: I.chart },
  { name: "Document Management", body: "Store and organize billing-related documents in one place.", icon: I.briefcase },
  { name: "Reporting & Analytics", body: "Monitor claims, revenue and billing activity from clear dashboards.", icon: I.growth },
  { name: "Import Claims", body: "Bring claim information into the system through structured imports.", icon: I.wifi },
  { name: "Administration", body: "Manage users and operational settings from a centralized area.", icon: I.code }
];

const billingSoftwareActionPoints = [
  { name: "Claims Visibility", body: "See claim statuses including accepted, created, paid, rejected and submitted." },
  { name: "Financial Overview", body: "Track charges, payments and outstanding balances." },
  { name: "Recent Activity", body: "See important billing activity from one centralized view." },
  { name: "Claims Requiring Attention", body: "Surface items that may need review or follow-up." }
];

const billingSoftwareToolPoints = [
  { name: "Quick Actions", body: "Access common billing tasks without digging through multiple screens." },
  { name: "Document Visibility", body: "Keep recently used billing documents accessible." },
  { name: "Imported Claims", body: "Review recently imported claim information." },
  { name: "A/R Aging", body: "See outstanding balances organized by aging period." },
  { name: "Payer Visibility", body: "Understand the distribution of claims across insurance companies." }
];

const billingSoftwareWorkflow = [
  { no: "01", name: "Patient & Insurance", body: "Maintain patient and coverage information." },
  { no: "02", name: "Claims", body: "Create, import and track billing claims." },
  { no: "03", name: "Payments", body: "Record payments and monitor balances." },
  { no: "04", name: "Follow-Up", body: "Identify outstanding and unresolved items." },
  { no: "05", name: "Reporting", body: "Review revenue, claims and A/R performance." }
];

const billingSoftwareWhy = [
  { name: "Centralized Workspace", body: "Patients, claims, insurance, documents and reporting in one system.", icon: I.briefcase },
  { name: "Clear Billing Visibility", body: "See the information your team needs without relying on scattered spreadsheets.", icon: I.chart },
  { name: "Simple Workflow", body: "Keep everyday billing tasks organized and accessible.", icon: I.clock },
  { name: "Operational Reporting", body: "Monitor billing activity, balances and claim status.", icon: I.growth },
  { name: "Built for Growth", body: "A software foundation that can evolve as operational needs change.", icon: I.globe },
  { name: "Human Support", body: "Work with AxisForce directly when your team needs assistance.", icon: I.headset }
];

function medicalBillingSoftwarePage() {
  const featureStrip = ["Patient Management", "Claims Tracking", "Billing Reports", "Document Management"].map(label =>
    '<div class="hero-tag">' + label + '</div>').join("");

  const featureCards = billingSoftwareFeatures.map(f =>
    '<div class="mbs-feature-card" style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 19px 21px; min-height: 148px;">' +
      '<div style="width: 40px; height: 40px; border-radius: 11px; background: rgba(30,95,224,0.08); border: 1px solid rgba(30,95,224,0.25); display: grid; place-items: center; margin-bottom: 11px;">' +
        icon(f.icon, 19, "#1e5fe0") + '</div>' +
      '<div style="font-size: 16.5px; font-weight: 700; margin-bottom: 5px; color: #0c1220;">' + f.name + '</div>' +
      '<div style="font-size: 13.5px; line-height: 1.45; color: #46536b;">' + f.body + '</div>' +
    '</div>').join("");

  const actionList = billingSoftwareActionPoints.map(p =>
    '<div style="padding: 14px 0; border-bottom: 1px dashed rgba(124,174,255,0.25);">' +
      '<div style="font-size: 17px; font-weight: 700; margin-bottom: 4px;">' + p.name + '</div>' +
      '<div style="font-size: 14px; color: #8b95ab; line-height: 1.45;">' + p.body + '</div>' +
    '</div>').join("");

  const toolList = billingSoftwareToolPoints.map(p =>
    '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 12px; padding: 14px 18px;">' +
      '<div style="font-size: 15.5px; font-weight: 700; margin-bottom: 3px; color: #0c1220;">' + p.name + '</div>' +
      '<div style="font-size: 13.5px; color: #46536b; line-height: 1.4;">' + p.body + '</div>' +
    '</div>').join("");

  const workflowCards = billingSoftwareWorkflow.map(s =>
    '<div class="mbs-wf-step" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(124,174,255,0.2); border-radius: 14px; padding: 24px 20px;">' +
      '<div style="font-size: 26px; font-weight: 800; color: #4d8dff; margin-bottom: 10px;">' + s.no + '</div>' +
      '<div style="font-size: 16px; font-weight: 700; margin-bottom: 6px;">' + s.name + '</div>' +
      '<div style="font-size: 13.5px; color: #8b95ab; line-height: 1.5;">' + s.body + '</div>' +
    '</div>').join("");

  const whyCards = billingSoftwareWhy.map(w =>
    '<div style="border-top: 1px solid #dbe3f0; padding-top: 22px;">' +
      '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">' +
        '<div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(30,95,224,0.08); border: 1px solid rgba(30,95,224,0.22); display: grid; place-items: center; flex-shrink: 0;">' +
          icon(w.icon, 18, "#1e5fe0") + '</div>' +
        '<div style="font-size: 17px; font-weight: 700; color: #0c1220;">' + w.name + '</div>' +
      '</div>' +
      '<div style="font-size: 14.5px; line-height: 1.55; color: #46536b;">' + w.body + '</div>' +
    '</div>').join("");

  return '<main>' +
  '<section style="position: relative; border-bottom: 1px solid rgba(255,255,255,0.06);">' +
    '<div class="hero-grid-cols" style="max-width: 1280px; margin: 0 auto; padding: 64px 32px 96px; display: grid; grid-template-columns: minmax(0,0.85fr) minmax(0,1.05fr); gap: 56px; align-items: center;">' +
      '<div style="min-width: 0;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Medical Billing Software</div>' +
        '<h1 style="font-size: 42px; font-weight: 800; line-height: 1.1; margin: 0 0 18px;">One Platform to Manage Your Billing Workflow.</h1>' +
        '<p style="font-size: 17px; line-height: 1.6; color: #aeb8cd; margin: 0 0 28px; max-width: 50ch;">AxisForce brings patients, insurance, claims, payments, documents and reporting into one organized billing workspace — giving your team clearer visibility across the revenue cycle.</p>' +
        '<div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 26px;">' +
          btnPrimary("Request a Software Demo &nbsp;→", "contact", "15px 26px", "16px") +
          '<span class="go-link" style="font-size: 15px; font-weight: 700; color: #cfd8ea;" onclick="document.getElementById(\'billing-software-features\').scrollIntoView({behavior:\'smooth\'})">Explore Features &nbsp;↓</span>' +
        '</div>' +
        '<div class="hero-tags">' + featureStrip + '</div>' +
      '</div>' +
      '<div style="min-width: 0;">' + heroShowcaseImage("/assets/images/axisforce-medical-billing-software-hero.webp", "AxisForce Medical Billing Software — smarter billing, stronger revenue, shown on a laptop billing dashboard") + '</div>' +
    '</div>' +
  '</section>' +
  '<section id="billing-software-features" style="background: #f2f5fa; color: #131a28; padding: 76px 32px; scroll-margin-top: 96px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 48px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">Built for Billing Operations</div>' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0 0 14px; color: #0c1220;">Everything Your Billing Team Needs in One Place</h2>' +
        '<p style="font-size: 16.5px; color: #46536b; max-width: 62ch; margin: 0 auto; line-height: 1.6;">Replace scattered spreadsheets and disconnected workflows with one centralized workspace for managing day-to-day billing operations.</p>' +
      '</div>' +
      '<div class="grid-services" style="display: grid; gap: 20px;">' + featureCards + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06);">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; padding: 76px 32px; display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 64px; align-items: center;">' +
      '<div style="min-width: 0;">' + productFrame("/assets/images/axisforce-billing-software-claims.webp", "AxisForce Billing Software claims by status, financial summary, recent activity and claims requiring attention", 1300, 568) + '</div>' +
      '<div>' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Your Billing Workspace</div>' +
        '<h2 style="font-size: 32px; font-weight: 800; margin: 0 0 18px; line-height: 1.1;">See the Revenue Cycle More Clearly.</h2>' +
        actionList +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 64px 32px;">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1.25fr 0.75fr; gap: 56px; align-items: center;">' +
      '<div style="min-width: 0;">' + productFrame("/assets/images/axisforce-billing-software-tools.webp", "AxisForce Billing Software quick actions, recent documents, latest imported claims, A/R aging summary and top insurance companies", 1300, 461) + '</div>' +
      '<div>' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">More Than Claim Tracking</div>' +
        '<h2 style="font-size: 30px; font-weight: 800; margin: 0 0 18px; line-height: 1.15; color: #0c1220;">Keep the Details That Matter Within Reach.</h2>' +
        '<div style="display: grid; gap: 10px;">' + toolList + '</div>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 76px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 44px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">From Patient to Payment</div>' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0;">A More Organized Billing Workflow</h2>' +
      '</div>' +
      '<div class="grid-handled" style="display: grid; gap: 18px;">' + workflowCards + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 76px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 44px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">Why AxisForce</div>' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0; color: #0c1220;">Built Around Real Billing Workflows</h2>' +
      '</div>' +
      '<div class="grid-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px 40px;">' + whyCards + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="padding: 76px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 44px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Software or Full-Service Support</div>' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0;">Use the Platform Your Way.</h2>' +
      '</div>' +
      '<div class="grid-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 22px;">' +
        '<div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(124,174,255,0.2); border-radius: 16px; padding: 34px;">' +
          '<div style="display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #4d8dff; background: rgba(77,141,255,0.12); border: 1px solid rgba(77,141,255,0.28); padding: 5px 12px; border-radius: 999px; margin-bottom: 18px;">' +
            icon(I.users, 13, "#4d8dff") + 'Option A — You Manage Billing' +
          '</div>' +
          '<div style="font-size: 21px; font-weight: 800; margin-bottom: 10px;">Medical Billing Software</div>' +
          '<div style="font-size: 15px; line-height: 1.6; color: #aeb8cd; margin-bottom: 22px;">For organizations that want their own team to manage billing using the AxisForce platform.</div>' +
          btnPrimary("Request Software Demo &nbsp;→", "contact", "13px 22px", "15px", false) +
        '</div>' +
        '<div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(124,174,255,0.2); border-radius: 16px; padding: 34px;">' +
          '<div style="display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #4d8dff; background: rgba(77,141,255,0.12); border: 1px solid rgba(77,141,255,0.28); padding: 5px 12px; border-radius: 999px; margin-bottom: 18px;">' +
            icon(I.headset, 13, "#4d8dff") + 'Option B — AxisForce Manages Billing' +
          '</div>' +
          '<div style="font-size: 21px; font-weight: 800; margin-bottom: 10px;">Medical Billing Services</div>' +
          '<div style="font-size: 15px; line-height: 1.6; color: #aeb8cd; margin-bottom: 22px;">For practices that want AxisForce to help manage the revenue cycle.</div>' +
          btnPrimary("Explore Billing Services &nbsp;→", "medical-billing", "13px 22px", "15px", false) +
        '</div>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="padding: 0 32px 64px;">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; background: linear-gradient(120deg, #0d1526, #12203c 60%, #0e2a5c); border: 1px solid rgba(124,174,255,0.25); border-radius: 16px; padding: 48px 56px; display: grid; grid-template-columns: 1.3fr 1fr; gap: 48px; align-items: center; position: relative; overflow: hidden;">' +
      '<div style="position: absolute; right: -60px; bottom: -80px; width: 380px; height: 380px; border-radius: 50%; background: radial-gradient(circle, rgba(47,123,255,0.25), transparent 65%); pointer-events: none;"></div>' +
      '<div>' +
        '<div style="font-size: 13.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #4d8dff; margin-bottom: 14px;">Ready To See It In Action?</div>' +
        '<h2 style="font-size: 34px; font-weight: 800; margin: 0; line-height: 1.15; letter-spacing: -0.01em;">See How AxisForce Can Simplify Your Billing Workflow.</h2>' +
      '</div>' +
      '<div>' +
        '<p style="font-size: 16.5px; line-height: 1.6; color: #cfd8ea; margin: 0 0 22px;">Schedule a conversation with our team to see the platform and discuss how it could fit your billing operation.</p>' +
        btnPrimary("Request a Software Demo &nbsp;→", "contact", "15px 26px", "16px") +
        '<div style="font-size: 15px; font-weight: 600; color: #8b95ab; margin-top: 16px;">Or call us directly: <a href="tel:+13462181253" style="color: #eef2fa; text-decoration: none;">' + PHONE + '</a></div>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '</main>';
}

function secImageFrame(src, alt, ratio, w, h, lazy, objPos) {
  return '' +
  '<div style="position: relative;">' +
    '<div style="position: absolute; inset: -14px; background: radial-gradient(circle at 50% 40%, rgba(47,123,255,0.12), transparent 72%); filter: blur(14px); pointer-events: none;"></div>' +
    '<div style="position: relative; border-radius: 18px; overflow: hidden; border: 1px solid rgba(124,174,255,0.16); box-shadow: 0 20px 50px rgba(4,8,16,0.45); aspect-ratio: ' + ratio + ';">' +
      '<img src="' + src + '" alt="' + alt + '" width="' + w + '" height="' + h + '"' + (lazy ? ' loading="lazy"' : '') + ' style="display: block; width: 100%; height: 100%; object-fit: cover; object-position: ' + (objPos || "50% 50%") + ';">' +
    '</div>' +
  '</div>';
}

const secSolutions = [
  { no: "01", name: "Indoor & Outdoor Cameras", body: "Professional camera placement for entrances, parking areas, offices, sales floors, warehouses, and other important areas.", icon: I.camera },
  { no: "02", name: "NVR / DVR Systems", body: "Centralized recording and organized access to surveillance footage.", icon: I.server },
  { no: "03", name: "Remote Viewing", body: "Access compatible camera systems from your phone, tablet, or computer.", icon: I.wifi },
  { no: "04", name: "System Setup & Configuration", body: "Camera configuration, recording setup, network connectivity, and system testing.", icon: I.code }
];

const secSystemFeatures = [
  { name: "Camera Placement", body: "Position cameras around important areas of your property." },
  { name: "Recording Setup", body: "Configure compatible NVR/DVR recording and storage." },
  { name: "Remote Access", body: "Set up compatible mobile and desktop viewing." },
  { name: "System Testing", body: "Verify cameras, recording, connectivity, and viewing before completion." }
];

const secProtection = [
  { name: "Deter Crime", body: "Visible surveillance can help discourage theft, vandalism, and unauthorized activity.", icon: I.shield },
  { name: "Monitor Remotely", body: "View compatible systems remotely when you are away from the property.", icon: I.wifi },
  { name: "Review Incidents", body: "Recorded footage makes it easier to review activity when something happens.", icon: I.clock },
  { name: "24/7 Recording", body: "Configure compatible systems for continuous recording based on the business's needs.", icon: I.camera }
];

const secIndustries = [
  { name: "Retail Stores", icon: I.bag },
  { name: "Restaurants", icon: I.utensils },
  { name: "Gas Stations", icon: I.fuel },
  { name: "Offices", icon: I.briefcase },
  { name: "Warehouses", icon: I.box },
  { name: "Medical Practices", icon: I.cross },
  { name: "Multi-Location Businesses", icon: I.globe },
  { name: "Large Properties", icon: I.pin }
];

const secSteps = [
  { no: "01", name: "Site Assessment", body: "We discuss the property, coverage areas, existing equipment, and what you want to monitor." },
  { no: "02", name: "System Recommendation", body: "We determine camera placement, equipment requirements, recording, and connectivity." },
  { no: "03", name: "Professional Installation", body: "We install and configure the agreed camera system." },
  { no: "04", name: "Setup & Handoff", body: "We test the system and help configure compatible viewing access." }
];

const secInstallFeatures = ["Camera mounting", "Basic cable routing", "NVR/DVR connection", "Camera configuration", "Recording setup", "Compatible remote-viewing setup", "Final system test"];
const secQuoteFeatures = ["Camera system planning", "Camera and recorder recommendations", "Cabling requirements", "Professional installation", "NVR/DVR configuration", "Remote viewing setup", "System testing"];
const secSupportFeatures = [
  { name: "Remote Troubleshooting", body: "Help diagnose compatible camera and recording-system issues remotely.", icon: I.headset },
  { name: "Camera & NVR Configuration", body: "Assistance with compatible camera, recorder, and system settings.", icon: I.server },
  { name: "Viewing Access Support", body: "Help with compatible mobile and desktop viewing access.", icon: I.wifi },
  { name: "Multi-Location Support", body: "Technical support options for businesses operating multiple locations.", icon: I.globe }
];

function securityCamerasPage() {
  const heroTrustStrip = ["Professional Installation", "Remote Viewing", "NVR/DVR Setup", "Business Security"].map(label =>
    '<div class="hero-tag">' + label + '</div>').join("");

  const solutionCards = secSolutions.map(s =>
    '<div class="mbs-feature-card" style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 22px;">' +
      '<div style="font-size: 12.5px; font-weight: 800; color: #9db4dd; letter-spacing: 0.05em; margin-bottom: 10px;">' + s.no + '</div>' +
      '<div style="width: 42px; height: 42px; border-radius: 11px; background: rgba(30,95,224,0.08); border: 1px solid rgba(30,95,224,0.25); display: grid; place-items: center; margin-bottom: 12px;">' +
        icon(s.icon, 20, "#1e5fe0") + '</div>' +
      '<div style="font-size: 16.5px; font-weight: 700; margin-bottom: 6px; color: #0c1220;">' + s.name + '</div>' +
      '<div style="font-size: 13.5px; line-height: 1.45; color: #46536b;">' + s.body + '</div>' +
    '</div>').join("");

  const systemRows = secSystemFeatures.map(f =>
    '<div style="display: flex; gap: 14px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">' +
      '<div style="width: 26px; height: 26px; border-radius: 50%; background: rgba(30,95,224,0.15); border: 1px solid rgba(77,141,255,0.4); display: grid; place-items: center; flex-shrink: 0; margin-top: 2px;">' +
        icon(I.check, 13, "#4d8dff") + '</div>' +
      '<div>' +
        '<div style="font-size: 16px; font-weight: 700; margin-bottom: 3px;">' + f.name + '</div>' +
        '<div style="font-size: 14px; color: #8b95ab; line-height: 1.45;">' + f.body + '</div>' +
      '</div>' +
    '</div>').join("");

  const protectionBlocks = secProtection.map(p =>
    '<div>' +
      '<div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(30,95,224,0.08); border: 1px solid rgba(30,95,224,0.22); display: grid; place-items: center; margin-bottom: 10px;">' +
        icon(p.icon, 18, "#1e5fe0") + '</div>' +
      '<div style="font-size: 15.5px; font-weight: 700; color: #0c1220; margin-bottom: 4px;">' + p.name + '</div>' +
      '<div style="font-size: 13px; line-height: 1.45; color: #46536b;">' + p.body + '</div>' +
    '</div>').join("");

  const industryBlocks = secIndustries.map(x =>
    '<div style="display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(124,174,255,0.15); border-radius: 12px; padding: 15px 16px;">' +
      '<div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(30,95,224,0.12); border: 1px solid rgba(30,95,224,0.3); display: grid; place-items: center; flex-shrink: 0;">' +
        icon(x.icon, 17, "#4d8dff") + '</div>' +
      '<div style="font-size: 14.5px; font-weight: 600; color: #eef2fa;">' + x.name + '</div>' +
    '</div>').join("");

  const stepCards = secSteps.map(s =>
    '<div style="text-align: center;">' +
      '<div style="width: 44px; height: 44px; border-radius: 50%; background: #fff; border: 2px solid #1e5fe0; display: grid; place-items: center; margin: 0 auto 16px; font-weight: 800; color: #1e5fe0; font-size: 16px;">' + s.no + '</div>' +
      '<div style="font-size: 16.5px; font-weight: 700; margin-bottom: 6px; color: #0c1220;">' + s.name + '</div>' +
      '<div style="font-size: 13.5px; line-height: 1.5; color: #46536b; max-width: 30ch; margin: 0 auto;">' + s.body + '</div>' +
    '</div>').join("");

  const installFeatureList = secInstallFeatures.map(f =>
    '<div style="display: flex; align-items: flex-start; gap: 10px; padding: 6px 0;">' +
      '<span style="flex-shrink: 0; margin-top: 2px;">' + icon(I.check, 15, "#4d8dff") + '</span>' +
      '<span style="font-size: 14.5px; color: #cfd8ea;">' + f + '</span>' +
    '</div>').join("");

  const quoteFeatureList = secQuoteFeatures.map(f =>
    '<div style="display: flex; align-items: flex-start; gap: 10px; padding: 6px 0;">' +
      '<span style="flex-shrink: 0; margin-top: 2px;">' + icon(I.check, 15, "#4d8dff") + '</span>' +
      '<span style="font-size: 14.5px; color: #cfd8ea;">' + f + '</span>' +
    '</div>').join("");

  const supportItems = secSupportFeatures.map(x =>
    '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 12px; padding: 18px 20px;">' +
      '<div style="width: 34px; height: 34px; border-radius: 9px; background: rgba(30,95,224,0.08); border: 1px solid rgba(30,95,224,0.22); display: grid; place-items: center; margin-bottom: 10px;">' +
        icon(x.icon, 16, "#1e5fe0") + '</div>' +
      '<div style="font-size: 14.5px; font-weight: 700; color: #0c1220; margin-bottom: 4px;">' + x.name + '</div>' +
      '<div style="font-size: 12.5px; line-height: 1.4; color: #46536b;">' + x.body + '</div>' +
    '</div>').join("");

  return '<main>' +
  '<section style="position: relative; border-bottom: 1px solid rgba(255,255,255,0.06);">' +
    '<div class="hero-grid-cols" style="max-width: 1280px; margin: 0 auto; padding: 64px 32px 96px; display: grid; grid-template-columns: minmax(0,1.15fr) minmax(0,0.85fr); gap: 56px; align-items: center;">' +
      '<div style="min-width: 0;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Security Camera Systems</div>' +
        '<h1 style="font-size: 42px; font-weight: 800; line-height: 1.1; margin: 0 0 18px;">Protect Your Business.<br><span style="color: #4d8dff;">See What Matters.</span></h1>' +
        '<p style="font-size: 17px; line-height: 1.6; color: #aeb8cd; margin: 0 0 28px; max-width: 50ch;">Professional security camera installation and surveillance solutions for businesses that need clear visibility, reliable recording, and remote access.</p>' +
        '<div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 26px;">' +
          btnPrimary("Get a Free Camera Quote &nbsp;→", "contact", "15px 26px", "16px") +
          '<a href="tel:+13462181253" class="btn btn-ghost-dark" style="padding: 15px 26px; font-size: 16px; text-decoration: none; display: inline-flex; align-items: center;">Call ' + PHONE + '</a>' +
        '</div>' +
        '<div class="hero-tags hero-tags-1col">' + heroTrustStrip + '</div>' +
      '</div>' +
      '<div style="min-width: 0;">' + secImageFrame("/assets/images/axisforce-security-camera-hero.webp", "AxisForce-installed security cameras mounted outside a commercial building at night", "736 / 780", 736, 780, false) + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 76px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 48px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">Built Around Your Property</div>' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0; color: #0c1220;">Security Solutions for the Way You Operate</h2>' +
      '</div>' +
      '<div class="grid-services" style="display: grid; gap: 20px;">' + solutionCards + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06);">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; padding: 76px 32px; display: grid; grid-template-columns: 1fr 1.05fr; gap: 64px; align-items: center;">' +
      '<div style="min-width: 0;">' + secImageFrame("/assets/images/axisforce-security-camera-system.webp", "Security camera system components: a bullet camera, NVR, monitor showing a multi-camera live view, and a remote viewing tablet", "886 / 890", 886, 890, true) + '</div>' +
      '<div>' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Complete Surveillance Setup</div>' +
        '<h2 style="font-size: 32px; font-weight: 800; margin: 0 0 18px; line-height: 1.1;">More Than Just Mounting Cameras.</h2>' +
        '<p style="font-size: 15.5px; line-height: 1.65; color: #aeb8cd; margin: 0 0 8px; max-width: 52ch;">A security system works best when the cameras, recorder, network, storage, and viewing access are configured as one system. AxisForce can help install and configure the components your business needs.</p>' +
        systemRows +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 76px 32px;">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1.05fr; gap: 56px; align-items: center;">' +
      '<div style="min-width: 0;">' + secImageFrame("/assets/images/axisforce-security-camera-realworld.webp", "Close-up of an AxisForce-installed security camera mounted outside a commercial building at night", "756 / 650", 756, 830, true) + '</div>' +
      '<div>' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">Protect What You Built</div>' +
        '<h2 style="font-size: 30px; font-weight: 800; margin: 0 0 16px; line-height: 1.15; color: #0c1220;">Visibility When You Need It.</h2>' +
        '<p style="font-size: 15px; line-height: 1.6; color: #46536b; margin: 0 0 26px; max-width: 52ch;">From storefronts and restaurants to offices, warehouses, gas stations, and larger properties, AxisForce designs camera installations around the areas that matter most to your operation.</p>' +
        '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 22px 20px;">' + protectionBlocks + '</div>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 76px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 40px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Commercial Security</div>' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0 0 14px;">Built for Businesses of Every Size</h2>' +
        '<p style="font-size: 16px; color: #aeb8cd; max-width: 62ch; margin: 0 auto; line-height: 1.6;">Whether you need cameras for one storefront or multiple business locations, we can design an installation around your property and existing infrastructure.</p>' +
      '</div>' +
      '<div class="grid-services" style="display: grid; gap: 16px;">' + industryBlocks + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 62px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 42px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">Simple Installation Process</div>' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0; color: #0c1220;">From Walkthrough to Working System</h2>' +
      '</div>' +
      '<div style="position: relative;">' +
        '<div class="sec-step-line" style="position: absolute; top: 22px; left: 60px; right: 60px; height: 1px; background: rgba(30,95,224,0.2); z-index: 0;"></div>' +
        '<div class="grid-services" style="display: grid; gap: 24px; position: relative; z-index: 1;">' + stepCards + '</div>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 76px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 44px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Straightforward Pricing</div>' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0;">Professional Installation Without Complicated Contracts</h2>' +
      '</div>' +
      '<div class="grid-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-bottom: 28px;">' +
        '<div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(124,174,255,0.2); border-radius: 18px; padding: 36px 34px;">' +
          '<div style="font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #8b95ab; margin-bottom: 16px;">Small Business Installation</div>' +
          '<div style="font-size: 14.5px; color: #8b95ab; margin-bottom: 2px;">Starting at</div>' +
          '<div style="margin-bottom: 18px;">' +
            '<span style="font-size: 44px; font-weight: 800; color: #fff;">$300</span>' +
          '</div>' +
          '<div style="font-size: 14.5px; line-height: 1.6; color: #aeb8cd; margin-bottom: 20px;">For qualifying basic installations where the business already has compatible camera equipment and needs professional installation and setup.</div>' +
          '<div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; margin-bottom: 24px;">' + installFeatureList + '</div>' +
          btnPrimary("Schedule Installation &nbsp;→", "contact", "13px 22px", "15px", false) +
          '<div style="font-size: 13px; line-height: 1.55; color: #9db4dd; margin-top: 16px;">Starting price applies to qualifying basic installations. Final pricing depends on camera quantity, cabling, property layout, installation complexity, and existing equipment.</div>' +
        '</div>' +
        '<div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(124,174,255,0.2); border-radius: 18px; padding: 36px 34px;">' +
          '<div style="font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #8b95ab; margin-bottom: 16px;">Complete Camera System</div>' +
          '<div style="font-size: 32px; font-weight: 800; color: #fff; margin-bottom: 18px;">Custom Quote</div>' +
          '<div style="font-size: 14.5px; line-height: 1.6; color: #aeb8cd; margin-bottom: 20px;">Need cameras, recorder, storage, cabling, and installation? We can recommend and install a complete system based on your property\'s requirements.</div>' +
          '<div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; margin-bottom: 24px;">' + quoteFeatureList + '</div>' +
          btnPrimary("Get a Free Quote &nbsp;→", "contact", "13px 22px", "15px", false) +
          '<div style="font-size: 12.5px; line-height: 1.5; color: #6b7690; margin-top: 16px;">Equipment and installation are quoted based on the property and system requirements.</div>' +
        '</div>' +
      '</div>' +
      '<div style="text-align: center; font-size: 14.5px; color: #8b95ab;">Multi-location business? <span class="go-link" style="color: #4d8dff; font-weight: 700;" onclick="nav(\'contact\')">Contact AxisForce</span> for customized multi-site installation and support pricing.</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 56px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 30px;">' +
        '<h2 style="font-size: 26px; font-weight: 800; margin: 0 0 10px; color: #0c1220;">Need Help After Installation?</h2>' +
        '<p style="font-size: 15px; line-height: 1.6; color: #46536b; margin: 0 auto; max-width: 56ch;">AxisForce can also provide ongoing technical support for compatible camera and recording systems.</p>' +
      '</div>' +
      '<div class="grid-services" style="display: grid; gap: 16px; margin-bottom: 28px;">' + supportItems + '</div>' +
      '<div style="text-align: center;">' + btnPrimary("Ask About Camera Support &nbsp;→", "contact", "14px 24px", "15px", false) + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="padding: 0 32px 64px;">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; background: linear-gradient(120deg, #0d1526, #12203c 60%, #0e2a5c); border: 1px solid rgba(124,174,255,0.25); border-radius: 16px; padding: 48px 56px; display: grid; grid-template-columns: 1.3fr 1fr; gap: 48px; align-items: center; position: relative; overflow: hidden;">' +
      '<div style="position: absolute; right: -60px; bottom: -80px; width: 380px; height: 380px; border-radius: 50%; background: radial-gradient(circle, rgba(47,123,255,0.25), transparent 65%); pointer-events: none;"></div>' +
      '<div>' +
        '<div style="font-size: 13.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #4d8dff; margin-bottom: 14px;">Ready To Protect Your Property?</div>' +
        '<h2 style="font-size: 34px; font-weight: 800; margin: 0; line-height: 1.15; letter-spacing: -0.01em;">Let\'s Build the Right Camera System for Your Business.</h2>' +
      '</div>' +
      '<div>' +
        '<p style="font-size: 16.5px; line-height: 1.6; color: #cfd8ea; margin: 0 0 22px;">Tell us about your property, existing equipment, and the areas you want to monitor. We\'ll help determine the right next step.</p>' +
        btnPrimary("Get a Free Camera Quote &nbsp;→", "contact", "15px 26px", "16px") +
        '<div style="font-size: 15px; font-weight: 600; color: #8b95ab; margin-top: 16px;">Or call us directly: <a href="tel:+13462181253" style="color: #eef2fa; text-decoration: none;">' + PHONE + '</a></div>' +
        '<div style="font-size: 13px; color: #6b7690; margin-top: 10px;">Houston, Texas & surrounding areas</div>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '</main>';
}

const netCoreServices = [
  { no: "01", name: "Business Wi-Fi", body: "Design and configure wireless coverage for offices, restaurants, retail locations, medical practices, warehouses, and other business environments.", icon: I.wifi },
  { no: "02", name: "Wired Networking", body: "Connect computers, phones, printers, cameras, POS systems, and other compatible business devices through organized wired networks.", icon: I.link },
  { no: "03", name: "Network Equipment Setup", body: "Configure compatible routers, switches, access points, and related network equipment around your business requirements.", icon: I.server },
  { no: "04", name: "Network Troubleshooting", body: "Diagnose connectivity, coverage, configuration, and network-performance issues.", icon: I.search }
];

const netInfraFeatures = [
  { name: "Network Planning", body: "Evaluate coverage areas, connected devices, equipment requirements, and business needs." },
  { name: "Equipment Configuration", body: "Configure compatible routers, switches, access points, and network devices." },
  { name: "Structured Cabling", body: "Help organize and route Ethernet connections for compatible business equipment." },
  { name: "Testing & Optimization", body: "Test connectivity and help identify coverage or configuration issues before completion." }
];

const netUseCasePoints = [
  { name: "Business Wi-Fi", body: "Provide wireless coverage throughout compatible areas of your property.", icon: I.wifi },
  { name: "Connected Devices", body: "Support the network connectivity needed by computers, printers, phones, cameras, and other compatible devices.", icon: I.link },
  { name: "Guest & Business Networks", body: "Help configure separate wireless networks when supported by the customer's equipment.", icon: I.users },
  { name: "Coverage Optimization", body: "Position and configure compatible access points around the property's coverage requirements.", icon: I.pin }
];

const netBusinessTypes = [
  { name: "Retail Stores", icon: I.bag },
  { name: "Restaurants", icon: I.utensils },
  { name: "Offices", icon: I.briefcase },
  { name: "Medical Practices", icon: I.cross },
  { name: "Warehouses", icon: I.box },
  { name: "Gas Stations", icon: I.fuel },
  { name: "Multi-Location Businesses", icon: I.globe },
  { name: "Commercial Properties", icon: I.pin }
];

const netSteps = [
  { no: "01", name: "Network Assessment", body: "Discuss the property, current internet connection, devices, coverage areas, and existing network equipment." },
  { no: "02", name: "System Recommendation", body: "Determine equipment, access-point placement, cabling, and configuration requirements." },
  { no: "03", name: "Installation & Configuration", body: "Install and configure the agreed compatible network equipment and connections." },
  { no: "04", name: "Testing & Handoff", body: "Test connectivity, coverage, connected devices, and help the customer understand the completed setup." }
];

const netBasicFeatures = ["Router/network equipment setup", "Access point configuration", "Basic Ethernet connections", "Device connectivity setup", "Wi-Fi configuration", "Basic network testing", "Final connectivity check"];
const netCompleteFeatures = ["Network planning", "Equipment recommendations", "Access point planning", "Switch/router configuration", "Structured cabling requirements", "Professional installation", "Wi-Fi configuration", "Network testing"];

const netSupportItems = [
  { name: "Wi-Fi Troubleshooting", body: "Help diagnose wireless connectivity and coverage issues.", icon: I.search },
  { name: "Network Configuration", body: "Assistance with compatible routers, switches, access points, and network settings.", icon: I.server },
  { name: "Connected Device Support", body: "Help troubleshoot connectivity for compatible computers, printers, phones, cameras, and business devices.", icon: I.link },
  { name: "Multi-Location Support", body: "Technical support options for businesses operating multiple locations.", icon: I.globe }
];

function networkWifiPage() {
  const heroTrustStrip = ["Business Wi-Fi", "Network Setup", "Structured Cabling", "Troubleshooting"].map(label =>
    '<div class="hero-tag">' + label + '</div>').join("");

  const coreServiceCards = netCoreServices.map(s =>
    '<div class="mbs-feature-card" style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 22px;">' +
      '<div style="font-size: 12.5px; font-weight: 800; color: #9db4dd; letter-spacing: 0.05em; margin-bottom: 10px;">' + s.no + '</div>' +
      '<div style="width: 42px; height: 42px; border-radius: 11px; background: rgba(30,95,224,0.08); border: 1px solid rgba(30,95,224,0.25); display: grid; place-items: center; margin-bottom: 12px;">' +
        icon(s.icon, 20, "#1e5fe0") + '</div>' +
      '<div style="font-size: 16.5px; font-weight: 700; margin-bottom: 6px; color: #0c1220;">' + s.name + '</div>' +
      '<div style="font-size: 13.5px; line-height: 1.45; color: #46536b;">' + s.body + '</div>' +
    '</div>').join("");

  const infraRows = netInfraFeatures.map(f =>
    '<div style="display: flex; gap: 14px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">' +
      '<div style="width: 26px; height: 26px; border-radius: 50%; background: rgba(30,95,224,0.15); border: 1px solid rgba(77,141,255,0.4); display: grid; place-items: center; flex-shrink: 0; margin-top: 2px;">' +
        icon(I.check, 13, "#4d8dff") + '</div>' +
      '<div>' +
        '<div style="font-size: 16px; font-weight: 700; margin-bottom: 3px;">' + f.name + '</div>' +
        '<div style="font-size: 14px; color: #8b95ab; line-height: 1.45;">' + f.body + '</div>' +
      '</div>' +
    '</div>').join("");

  const useCaseBlocks = netUseCasePoints.map(p =>
    '<div>' +
      '<div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(30,95,224,0.08); border: 1px solid rgba(30,95,224,0.22); display: grid; place-items: center; margin-bottom: 10px;">' +
        icon(p.icon, 18, "#1e5fe0") + '</div>' +
      '<div style="font-size: 15.5px; font-weight: 700; color: #0c1220; margin-bottom: 4px;">' + p.name + '</div>' +
      '<div style="font-size: 13px; line-height: 1.45; color: #46536b;">' + p.body + '</div>' +
    '</div>').join("");

  const businessTypeBlocks = netBusinessTypes.map(x =>
    '<div style="display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(124,174,255,0.15); border-radius: 12px; padding: 15px 16px;">' +
      '<div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(30,95,224,0.12); border: 1px solid rgba(30,95,224,0.3); display: grid; place-items: center; flex-shrink: 0;">' +
        icon(x.icon, 17, "#4d8dff") + '</div>' +
      '<div style="font-size: 14.5px; font-weight: 600; color: #eef2fa;">' + x.name + '</div>' +
    '</div>').join("");

  const stepCards = netSteps.map(s =>
    '<div style="text-align: center;">' +
      '<div style="width: 44px; height: 44px; border-radius: 50%; background: #fff; border: 2px solid #1e5fe0; display: grid; place-items: center; margin: 0 auto 16px; font-weight: 800; color: #1e5fe0; font-size: 16px;">' + s.no + '</div>' +
      '<div style="font-size: 16.5px; font-weight: 700; margin-bottom: 6px; color: #0c1220;">' + s.name + '</div>' +
      '<div style="font-size: 13.5px; line-height: 1.5; color: #46536b; max-width: 30ch; margin: 0 auto;">' + s.body + '</div>' +
    '</div>').join("");

  const basicFeatureList = netBasicFeatures.map(f =>
    '<div style="display: flex; align-items: flex-start; gap: 10px; padding: 5px 0;">' +
      '<span style="flex-shrink: 0; margin-top: 2px;">' + icon(I.check, 15, "#4d8dff") + '</span>' +
      '<span style="font-size: 14.5px; color: #cfd8ea;">' + f + '</span>' +
    '</div>').join("");

  const completeFeatureList = netCompleteFeatures.map(f =>
    '<div style="display: flex; align-items: flex-start; gap: 10px; padding: 5px 0;">' +
      '<span style="flex-shrink: 0; margin-top: 2px;">' + icon(I.check, 15, "#4d8dff") + '</span>' +
      '<span style="font-size: 14.5px; color: #cfd8ea;">' + f + '</span>' +
    '</div>').join("");

  const supportItems = netSupportItems.map(x =>
    '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 12px; padding: 18px 20px;">' +
      '<div style="width: 34px; height: 34px; border-radius: 9px; background: rgba(30,95,224,0.08); border: 1px solid rgba(30,95,224,0.22); display: grid; place-items: center; margin-bottom: 10px;">' +
        icon(x.icon, 16, "#1e5fe0") + '</div>' +
      '<div style="font-size: 14.5px; font-weight: 700; color: #0c1220; margin-bottom: 4px;">' + x.name + '</div>' +
      '<div style="font-size: 12.5px; line-height: 1.4; color: #46536b;">' + x.body + '</div>' +
    '</div>').join("");

  return '<main>' +
  '<section style="position: relative; background: #060a14; border-bottom: 1px solid rgba(255,255,255,0.06); overflow: hidden;">' +
    '<div class="hero-grid-cols" style="max-width: 1280px; margin: 0 auto; padding: 64px 32px 60px; display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 56px; align-items: center;">' +
      '<div style="min-width: 0;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Network & Wi-Fi Solutions</div>' +
        '<h1 style="font-size: 42px; font-weight: 800; line-height: 1.1; margin: 0 0 18px;">Reliable Networks.<br><span style="color: #4d8dff;">Better Connected Business.</span></h1>' +
        '<p style="font-size: 17px; line-height: 1.6; color: #aeb8cd; margin: 0 0 28px; max-width: 50ch;">Professional network and Wi-Fi installation, configuration, and troubleshooting for businesses that need reliable connectivity across their operation.</p>' +
        '<div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 26px;">' +
          btnPrimary("Get a Free Network Quote &nbsp;→", "contact", "15px 26px", "16px") +
          '<a href="tel:+13462181253" class="btn btn-ghost-dark" style="padding: 15px 26px; font-size: 16px; text-decoration: none; display: inline-flex; align-items: center;">Call ' + PHONE + '</a>' +
        '</div>' +
        '<div class="hero-tags">' + heroTrustStrip + '</div>' +
      '</div>' +
      '<div style="min-width: 0;">' + secImageFrame("/assets/images/axisforce-network-wifi-hero.webp", "Wireless access point broadcasting Wi-Fi coverage across a modern open office", "1260 / 1024", 1260, 1024, false) + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 76px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 48px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">Built for Business Connectivity</div>' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0; color: #0c1220;">Everything Your Business Needs to Stay Connected</h2>' +
      '</div>' +
      '<div class="grid-services" style="display: grid; gap: 20px;">' + coreServiceCards + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06);">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; padding: 76px 32px; display: grid; grid-template-columns: 1fr 1.05fr; gap: 64px; align-items: center;">' +
      '<div style="min-width: 0;">' + secImageFrame("/assets/images/axisforce-network-wifi-infrastructure.webp", "Close-up of a professionally organized network rack with structured cabling and a switch", "1120 / 1024", 1120, 1024, true) + '</div>' +
      '<div>' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Professional Network Infrastructure</div>' +
        '<h2 style="font-size: 32px; font-weight: 800; margin: 0 0 18px; line-height: 1.1;">More Than Just Connecting a Router.</h2>' +
        '<p style="font-size: 15.5px; line-height: 1.65; color: #aeb8cd; margin: 0 0 8px; max-width: 52ch;">A reliable business network depends on properly configured equipment, organized cabling, wireless coverage, and the devices connected throughout your property. AxisForce can help bring those components together into a cleaner, more manageable network.</p>' +
        infraRows +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 76px 32px;">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1.05fr 1fr; gap: 56px; align-items: center;">' +
      '<div style="min-width: 0;">' + secImageFrame("/assets/images/axisforce-network-wifi-realworld.webp", "Restaurant with a wall-mounted wireless access point and a tablet showing network status", "1229 / 1024", 1229, 1024, true) + '</div>' +
      '<div>' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">Connect the Way You Operate</div>' +
        '<h2 style="font-size: 30px; font-weight: 800; margin: 0 0 16px; line-height: 1.15; color: #0c1220;">Connectivity Where Your Business Needs It.</h2>' +
        '<p style="font-size: 15px; line-height: 1.6; color: #46536b; margin: 0 0 26px; max-width: 52ch;">From customer Wi-Fi and employee workstations to POS systems, phones, printers, cameras, and other connected devices, a properly configured network helps keep everyday business technology connected.</p>' +
        '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 22px 20px;">' + useCaseBlocks + '</div>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 76px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 40px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Business Networking</div>' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0 0 14px;">Built for Businesses of Every Size</h2>' +
        '<p style="font-size: 16px; color: #aeb8cd; max-width: 62ch; margin: 0 auto; line-height: 1.6;">Whether you need connectivity for one small office or multiple business locations, AxisForce can design a network setup around your property, devices, and existing internet service.</p>' +
      '</div>' +
      '<div class="grid-services" style="display: grid; gap: 16px;">' + businessTypeBlocks + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 62px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 42px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">Simple Network Setup Process</div>' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0; color: #0c1220;">From Assessment to Connected Network</h2>' +
      '</div>' +
      '<div style="position: relative;">' +
        '<div class="sec-step-line" style="position: absolute; top: 22px; left: 60px; right: 60px; height: 1px; background: rgba(30,95,224,0.2); z-index: 0;"></div>' +
        '<div class="grid-services" style="display: grid; gap: 24px; position: relative; z-index: 1;">' + stepCards + '</div>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 68px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 40px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Straightforward Pricing</div>' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0;">Professional Network Setup Without Complicated Contracts</h2>' +
      '</div>' +
      '<div class="grid-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-bottom: 26px;">' +
        '<div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(124,174,255,0.2); border-radius: 18px; padding: 33px 31px;">' +
          '<div style="font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #8b95ab; margin-bottom: 15px;">Basic Network Setup</div>' +
          '<div style="font-size: 14.5px; color: #8b95ab; margin-bottom: 2px;">Starting at</div>' +
          '<div style="margin-bottom: 16px;">' +
            '<span style="font-size: 44px; font-weight: 800; color: #fff;">$300</span>' +
          '</div>' +
          '<div style="font-size: 14.5px; line-height: 1.6; color: #aeb8cd; margin-bottom: 18px;">For qualifying basic network jobs where the business already has compatible equipment and needs professional installation, configuration, or troubleshooting.</div>' +
          '<div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 14px; margin-bottom: 22px;">' + basicFeatureList + '</div>' +
          btnPrimary("Schedule Network Service &nbsp;→", "contact", "13px 22px", "15px", false) +
          '<div style="font-size: 13px; line-height: 1.55; color: #9db4dd; margin-top: 14px;">Starting price applies to qualifying basic network work. Final pricing depends on property size, equipment quantity, cabling requirements, network complexity, existing infrastructure, and scope of work.</div>' +
        '</div>' +
        '<div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(124,174,255,0.2); border-radius: 18px; padding: 33px 31px;">' +
          '<div style="font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #8b95ab; margin-bottom: 15px;">Complete Business Network</div>' +
          '<div style="font-size: 32px; font-weight: 800; color: #fff; margin-bottom: 16px;">Custom Quote</div>' +
          '<div style="font-size: 14.5px; line-height: 1.6; color: #aeb8cd; margin-bottom: 18px;">Need network equipment, multiple access points, structured cabling, switches, or a larger business network? We can recommend and configure a solution based on your property\'s requirements.</div>' +
          '<div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 14px; margin-bottom: 22px;">' + completeFeatureList + '</div>' +
          btnPrimary("Get a Free Quote &nbsp;→", "contact", "13px 22px", "15px", false) +
          '<div style="font-size: 13px; line-height: 1.55; color: #9db4dd; margin-top: 14px;">Equipment and installation are quoted based on the property, existing infrastructure, and network requirements. Internet service is provided separately by the customer\'s ISP.</div>' +
        '</div>' +
      '</div>' +
      '<div style="text-align: center; font-size: 14.5px; color: #8b95ab;">Multi-location business? <span class="go-link" style="color: #4d8dff; font-weight: 700;" onclick="nav(\'contact\')">Contact AxisForce</span> for customized multi-site network installation and support pricing.</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 56px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 30px;">' +
        '<h2 style="font-size: 26px; font-weight: 800; margin: 0 0 10px; color: #0c1220;">Need Help After Installation?</h2>' +
        '<p style="font-size: 15px; line-height: 1.6; color: #46536b; margin: 0 auto; max-width: 56ch;">AxisForce can also provide ongoing technical support for compatible business network and Wi-Fi systems.</p>' +
      '</div>' +
      '<div class="grid-services" style="display: grid; gap: 16px; margin-bottom: 28px;">' + supportItems + '</div>' +
      '<div style="text-align: center;">' + btnPrimary("Ask About Network Support &nbsp;→", "contact", "14px 24px", "15px", false) + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="padding: 0 32px 64px;">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; background: linear-gradient(120deg, #0d1526, #12203c 60%, #0e2a5c); border: 1px solid rgba(124,174,255,0.25); border-radius: 16px; padding: 48px 56px; display: grid; grid-template-columns: 1.3fr 1fr; gap: 48px; align-items: center; position: relative; overflow: hidden;">' +
      '<div style="position: absolute; right: -60px; bottom: -80px; width: 380px; height: 380px; border-radius: 50%; background: radial-gradient(circle, rgba(47,123,255,0.25), transparent 65%); pointer-events: none;"></div>' +
      '<div>' +
        '<div style="font-size: 13.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #4d8dff; margin-bottom: 14px;">Ready To Improve Your Network?</div>' +
        '<h2 style="font-size: 34px; font-weight: 800; margin: 0; line-height: 1.15; letter-spacing: -0.01em;">Let\'s Build the Right Network for Your Business.</h2>' +
      '</div>' +
      '<div>' +
        '<p style="font-size: 16.5px; line-height: 1.6; color: #cfd8ea; margin: 0 0 22px;">Tell us about your property, existing internet service, equipment, connected devices, and coverage needs. We\'ll help determine the right next step.</p>' +
        btnPrimary("Get a Free Network Quote &nbsp;→", "contact", "15px 26px", "16px") +
        '<div style="font-size: 15px; font-weight: 600; color: #8b95ab; margin-top: 16px;">Or call us directly: <a href="tel:+13462181253" style="color: #eef2fa; text-decoration: none;">' + PHONE + '</a></div>' +
        '<div style="font-size: 13px; color: #6b7690; margin-top: 10px;">Houston, Texas & surrounding areas</div>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '</main>';
}

const mktCoreServices = [
  { no: "01", name: "Website Design", body: "Modern, responsive websites designed around your business, services, customers, and brand.", icon: I.code },
  { no: "02", name: "Digital Marketing", body: "Marketing strategies and campaigns designed to increase visibility and connect your business with potential customers.", icon: I.growth },
  { no: "03", name: "Local SEO", body: "Improve your local online presence and help customers discover your business through search and map results.", icon: I.search },
  { no: "04", name: "Social Media", body: "Build a consistent business presence across relevant social platforms with professional content and account support.", icon: I.users }
];

const mktMarketingFeatures = [
  { name: "Online Presence", body: "Build a consistent digital presence across the channels relevant to your business." },
  { name: "Campaign Management", body: "Plan and manage digital campaigns based on your services, audience, and business objectives." },
  { name: "Local Visibility", body: "Improve how your business is presented across search, maps, and other relevant online platforms." },
  { name: "Performance Reporting", body: "Review available campaign and website data to better understand activity and make informed marketing decisions." }
];

const mktWebsiteFeatures = [
  { name: "Modern Design", body: "Clean, professional layouts designed around your brand and services.", icon: I.code },
  { name: "Mobile Responsive", body: "Pages designed to work properly across desktop, tablet, and mobile devices.", icon: I.device },
  { name: "Clear Calls to Action", body: "Help visitors quickly understand your services and how to contact your business.", icon: I.check },
  { name: "Business-Focused Structure", body: "Organize content around the information your customers need most.", icon: I.briefcase }
];

const mktBusinessTypes = [
  { name: "Medical Practices", icon: I.cross },
  { name: "Restaurants", icon: I.utensils },
  { name: "Retail Stores", icon: I.bag },
  { name: "Professional Services", icon: I.briefcase },
  { name: "Local Businesses", icon: I.pin },
  { name: "Multi-Location Businesses", icon: I.globe },
  { name: "Home & Field Services", icon: I.hardhat },
  { name: "Growing Companies", icon: I.growth }
];

const mktSteps = [
  { no: "01", name: "Discovery", body: "Learn about the business, services, audience, current online presence, and goals." },
  { no: "02", name: "Strategy", body: "Determine the right website, content, search, social, and marketing approach based on the agreed scope." },
  { no: "03", name: "Build & Launch", body: "Design the website and/or prepare the agreed marketing channels and campaigns." },
  { no: "04", name: "Improve", body: "Review available performance data and continue refining the agreed marketing activities over time." }
];

const mktBasicFeatures = ["Digital marketing strategy", "Local online presence support", "Social media management", "Website content updates", "Campaign management", "Performance reporting", "Ongoing optimization"];
const mktCustomFeatures = ["Website design", "Website development", "Multi-page websites", "Search presence", "Social media", "Digital advertising management", "Content support", "Multi-location marketing", "Custom strategy"];

const mktSupportItems = [
  { name: "Website Updates", body: "Help keep website content, services, and business information current.", icon: I.code },
  { name: "Marketing Support", body: "Ongoing assistance with agreed digital marketing activities and campaigns.", icon: I.growth },
  { name: "Social Media", body: "Support with maintaining a consistent business presence across relevant social platforms.", icon: I.users },
  { name: "Multi-Location Marketing", body: "Marketing support options for businesses operating multiple locations.", icon: I.globe }
];

function websitesMarketingPage() {
  const heroTrustStrip = ["Website Design", "Digital Marketing", "Local SEO", "Social Media"].map(label =>
    '<div class="hero-tag">' + label + '</div>').join("");

  const coreServiceCards = mktCoreServices.map(s =>
    '<div class="mbs-feature-card" style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 22px;">' +
      '<div style="font-size: 12.5px; font-weight: 800; color: #9db4dd; letter-spacing: 0.05em; margin-bottom: 10px;">' + s.no + '</div>' +
      '<div style="width: 42px; height: 42px; border-radius: 11px; background: rgba(30,95,224,0.08); border: 1px solid rgba(30,95,224,0.25); display: grid; place-items: center; margin-bottom: 12px;">' +
        icon(s.icon, 20, "#1e5fe0") + '</div>' +
      '<div style="font-size: 16.5px; font-weight: 700; margin-bottom: 6px; color: #0c1220;">' + s.name + '</div>' +
      '<div style="font-size: 13.5px; line-height: 1.45; color: #46536b;">' + s.body + '</div>' +
    '</div>').join("");

  const marketingRows = mktMarketingFeatures.map(f =>
    '<div style="display: flex; gap: 14px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">' +
      '<div style="width: 26px; height: 26px; border-radius: 50%; background: rgba(30,95,224,0.15); border: 1px solid rgba(77,141,255,0.4); display: grid; place-items: center; flex-shrink: 0; margin-top: 2px;">' +
        icon(I.check, 13, "#4d8dff") + '</div>' +
      '<div>' +
        '<div style="font-size: 16px; font-weight: 700; margin-bottom: 3px;">' + f.name + '</div>' +
        '<div style="font-size: 14px; color: #8b95ab; line-height: 1.45;">' + f.body + '</div>' +
      '</div>' +
    '</div>').join("");

  const websiteBlocks = mktWebsiteFeatures.map(f =>
    '<div>' +
      '<div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(30,95,224,0.08); border: 1px solid rgba(30,95,224,0.22); display: grid; place-items: center; margin-bottom: 10px;">' +
        icon(f.icon, 18, "#1e5fe0") + '</div>' +
      '<div style="font-size: 15.5px; font-weight: 700; color: #0c1220; margin-bottom: 4px;">' + f.name + '</div>' +
      '<div style="font-size: 13px; line-height: 1.45; color: #46536b;">' + f.body + '</div>' +
    '</div>').join("");

  const businessTypeBlocks = mktBusinessTypes.map(x =>
    '<div style="display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(124,174,255,0.15); border-radius: 12px; padding: 15px 16px;">' +
      '<div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(30,95,224,0.12); border: 1px solid rgba(30,95,224,0.3); display: grid; place-items: center; flex-shrink: 0;">' +
        icon(x.icon, 17, "#4d8dff") + '</div>' +
      '<div style="font-size: 14.5px; font-weight: 600; color: #eef2fa;">' + x.name + '</div>' +
    '</div>').join("");

  const stepCards = mktSteps.map(s =>
    '<div style="text-align: center;">' +
      '<div style="width: 44px; height: 44px; border-radius: 50%; background: #fff; border: 2px solid #1e5fe0; display: grid; place-items: center; margin: 0 auto 16px; font-weight: 800; color: #1e5fe0; font-size: 16px;">' + s.no + '</div>' +
      '<div style="font-size: 16.5px; font-weight: 700; margin-bottom: 6px; color: #0c1220;">' + s.name + '</div>' +
      '<div style="font-size: 13.5px; line-height: 1.5; color: #46536b; max-width: 30ch; margin: 0 auto;">' + s.body + '</div>' +
    '</div>').join("");

  const basicFeatureList = mktBasicFeatures.map(f =>
    '<div style="display: flex; align-items: flex-start; gap: 10px; padding: 5px 0;">' +
      '<span style="flex-shrink: 0; margin-top: 2px;">' + icon(I.check, 15, "#4d8dff") + '</span>' +
      '<span style="font-size: 14.5px; color: #cfd8ea;">' + f + '</span>' +
    '</div>').join("");

  const customFeatureList = mktCustomFeatures.map(f =>
    '<div style="display: flex; align-items: flex-start; gap: 10px; padding: 5px 0;">' +
      '<span style="flex-shrink: 0; margin-top: 2px;">' + icon(I.check, 15, "#4d8dff") + '</span>' +
      '<span style="font-size: 14.5px; color: #cfd8ea;">' + f + '</span>' +
    '</div>').join("");

  const supportItems = mktSupportItems.map(x =>
    '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 12px; padding: 18px 20px;">' +
      '<div style="width: 34px; height: 34px; border-radius: 9px; background: rgba(30,95,224,0.08); border: 1px solid rgba(30,95,224,0.22); display: grid; place-items: center; margin-bottom: 10px;">' +
        icon(x.icon, 16, "#1e5fe0") + '</div>' +
      '<div style="font-size: 14.5px; font-weight: 700; color: #0c1220; margin-bottom: 4px;">' + x.name + '</div>' +
      '<div style="font-size: 12.5px; line-height: 1.4; color: #46536b;">' + x.body + '</div>' +
    '</div>').join("");

  return '<main>' +
  '<section style="position: relative; background: #060a14; border-bottom: 1px solid rgba(255,255,255,0.06); overflow: hidden;">' +
    '<div class="hero-grid-cols" style="max-width: 1280px; margin: 0 auto; padding: 64px 32px 60px; display: grid; grid-template-columns: minmax(0,1.2fr) minmax(0,1fr); gap: 44px; align-items: center;">' +
      '<div style="min-width: 0;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Websites & Marketing</div>' +
        '<h1 style="font-size: 42px; font-weight: 800; line-height: 1.1; margin: 0 0 18px;">Build Your Presence.<br><span style="color: #4d8dff;">Grow Your Business.</span></h1>' +
        '<p style="font-size: 17px; line-height: 1.6; color: #aeb8cd; margin: 0 0 28px; max-width: 50ch;">Modern websites and practical digital marketing solutions designed to help businesses build a stronger online presence, reach more customers, and support continued growth.</p>' +
        '<div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 26px;">' +
          btnPrimary("Get a Free Marketing Consultation &nbsp;→", "contact", "15px 26px", "16px") +
          '<a href="tel:+13462181253" class="btn btn-ghost-dark" style="padding: 15px 26px; font-size: 16px; text-decoration: none; display: inline-flex; align-items: center;">Call ' + PHONE + '</a>' +
        '</div>' +
        '<div class="hero-tags">' + heroTrustStrip + '</div>' +
      '</div>' +
      '<div style="min-width: 0;">' + secImageFrame("/assets/images/axisforce-websites-marketing-hero.webp", "Website design and marketing dashboard concept shown on a desktop monitor", "845 / 740", 845, 1091, false, "50% 12%") + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 76px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 48px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">Built for Your Digital Presence</div>' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0; color: #0c1220;">Everything Your Business Needs to Stand Out Online</h2>' +
      '</div>' +
      '<div class="grid-services" style="display: grid; gap: 20px;">' + coreServiceCards + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06);">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; padding: 76px 32px; display: grid; grid-template-columns: 1fr 1.05fr; gap: 64px; align-items: center;">' +
      '<div style="min-width: 0;">' + secImageFrame("/assets/images/axisforce-websites-marketing-performance.webp", "Marketing performance dashboard concept shown on a laptop and phone", "1536 / 1024", 1536, 1024, true) + '</div>' +
      '<div>' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Digital Marketing That Supports Growth</div>' +
        '<h2 style="font-size: 32px; font-weight: 800; margin: 0 0 18px; line-height: 1.1;">More Than Just Posting Online.</h2>' +
        '<p style="font-size: 15.5px; line-height: 1.65; color: #aeb8cd; margin: 0 0 8px; max-width: 52ch;">Effective digital marketing requires more than simply creating posts or running occasional ads. AxisForce helps businesses build a coordinated online presence across their website, search visibility, advertising, social media, and performance reporting.</p>' +
        marketingRows +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 76px 32px;">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 56px; align-items: center;">' +
      '<div style="min-width: 0;">' + secImageFrame("/assets/images/axisforce-websites-marketing-strategy.webp", "Website design concept shown on a laptop", "970 / 964", 1536, 964, true, "0% 50%") + '</div>' +
      '<div>' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">Your Digital Front Door</div>' +
        '<h2 style="font-size: 30px; font-weight: 800; margin: 0 0 16px; line-height: 1.15; color: #0c1220;">A Website Built Around Your Business.</h2>' +
        '<p style="font-size: 15px; line-height: 1.6; color: #46536b; margin: 0 0 26px; max-width: 52ch;">Your website is often one of the first places customers learn about your business. AxisForce builds modern, responsive websites designed to clearly present your services, strengthen your professional image, and make it easier for customers to take the next step.</p>' +
        '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 22px 20px;">' + websiteBlocks + '</div>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 76px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 40px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Marketing for Real Businesses</div>' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0 0 14px;">Built for Businesses Ready to Grow Their Presence</h2>' +
        '<p style="font-size: 16px; color: #aeb8cd; max-width: 62ch; margin: 0 auto; line-height: 1.6;">Whether you\'re building your first professional online presence or improving an existing one, AxisForce can tailor website and marketing services around your business and goals.</p>' +
      '</div>' +
      '<div class="grid-services" style="display: grid; gap: 16px;">' + businessTypeBlocks + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 62px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 42px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">A Simple Process</div>' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0; color: #0c1220;">From Strategy to Stronger Digital Presence</h2>' +
      '</div>' +
      '<div style="position: relative;">' +
        '<div class="sec-step-line" style="position: absolute; top: 22px; left: 60px; right: 60px; height: 1px; background: rgba(30,95,224,0.2); z-index: 0;"></div>' +
        '<div class="grid-services" style="display: grid; gap: 24px; position: relative; z-index: 1;">' + stepCards + '</div>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 68px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 40px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Straightforward Pricing</div>' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0;">Professional Marketing Without Complicated Contracts</h2>' +
      '</div>' +
      '<div class="grid-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-bottom: 26px;">' +
        '<div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(124,174,255,0.2); border-radius: 18px; padding: 33px 31px;">' +
          '<div style="font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #8b95ab; margin-bottom: 15px;">Websites & Marketing</div>' +
          '<div style="font-size: 14.5px; color: #8b95ab; margin-bottom: 2px;">Starting at</div>' +
          '<div style="display: flex; align-items: baseline; gap: 6px; margin-bottom: 16px;">' +
            '<span style="font-size: 44px; font-weight: 800; color: #fff;">$800</span>' +
            '<span style="font-size: 15px; color: #8b95ab;">/ month</span>' +
          '</div>' +
          '<div style="font-size: 14.5px; line-height: 1.6; color: #aeb8cd; margin-bottom: 18px;">For qualifying businesses that need ongoing digital marketing support and management of their online presence.</div>' +
          '<div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 14px; margin-bottom: 22px;">' + basicFeatureList + '</div>' +
          btnPrimary("Start a Conversation &nbsp;→", "contact", "13px 22px", "15px", false) +
          '<div style="font-size: 13px; line-height: 1.55; color: #9db4dd; margin-top: 14px;">Starting price applies to qualifying service packages. Final pricing depends on scope, platforms, content requirements, advertising needs, website requirements, and ongoing management needs.</div>' +
          '<div style="font-size: 12.5px; line-height: 1.5; color: #6b7690; margin-top: 10px;">Advertising and media spend are not automatically included in the monthly management fee unless specifically quoted.</div>' +
        '</div>' +
        '<div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(124,174,255,0.2); border-radius: 18px; padding: 33px 31px;">' +
          '<div style="font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #8b95ab; margin-bottom: 15px;">Custom Website & Marketing Plan</div>' +
          '<div style="font-size: 32px; font-weight: 800; color: #fff; margin-bottom: 16px;">Custom Quote</div>' +
          '<div style="font-size: 14.5px; line-height: 1.6; color: #aeb8cd; margin-bottom: 18px;">Need a new website, larger marketing campaign, multiple locations, additional content, or a broader digital strategy? We can prepare a custom solution based on your business requirements.</div>' +
          '<div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 14px; margin-bottom: 22px;">' + customFeatureList + '</div>' +
          btnPrimary("Get a Free Consultation &nbsp;→", "contact", "13px 22px", "15px", false) +
          '<div style="font-size: 13px; line-height: 1.55; color: #9db4dd; margin-top: 14px;">Website projects, advertising budgets, third-party services, and additional marketing requirements are quoted based on scope.</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 56px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 30px;">' +
        '<h2 style="font-size: 26px; font-weight: 800; margin: 0 0 10px; color: #0c1220;">Need Ongoing Marketing Support?</h2>' +
        '<p style="font-size: 15px; line-height: 1.6; color: #46536b; margin: 0 auto; max-width: 56ch;">AxisForce can continue supporting your website and digital presence as your business changes and grows.</p>' +
      '</div>' +
      '<div class="grid-services" style="display: grid; gap: 16px; margin-bottom: 28px;">' + supportItems + '</div>' +
      '<div style="text-align: center;">' + btnPrimary("Ask About Marketing Support &nbsp;→", "contact", "14px 24px", "15px", false) + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="padding: 0 32px 64px;">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; background: linear-gradient(120deg, #0d1526, #12203c 60%, #0e2a5c); border: 1px solid rgba(124,174,255,0.25); border-radius: 16px; padding: 48px 56px; display: grid; grid-template-columns: 1.3fr 1fr; gap: 48px; align-items: center; position: relative; overflow: hidden;">' +
      '<div style="position: absolute; right: -60px; bottom: -80px; width: 380px; height: 380px; border-radius: 50%; background: radial-gradient(circle, rgba(47,123,255,0.25), transparent 65%); pointer-events: none;"></div>' +
      '<div>' +
        '<div style="font-size: 13.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #4d8dff; margin-bottom: 14px;">Ready To Grow Your Online Presence?</div>' +
        '<h2 style="font-size: 34px; font-weight: 800; margin: 0; line-height: 1.15; letter-spacing: -0.01em;">Let\'s Build a Stronger Digital Presence for Your Business.</h2>' +
      '</div>' +
      '<div>' +
        '<p style="font-size: 16.5px; line-height: 1.6; color: #cfd8ea; margin: 0 0 22px;">Tell us about your business, current website, marketing needs, and goals. We\'ll help determine the right next step.</p>' +
        btnPrimary("Get a Free Marketing Consultation &nbsp;→", "contact", "15px 26px", "16px") +
        '<div style="font-size: 15px; font-weight: 600; color: #8b95ab; margin-top: 16px;">Or call us directly: <a href="tel:+13462181253" style="color: #eef2fa; text-decoration: none;">' + PHONE + '</a></div>' +
        '<div style="font-size: 13px; color: #6b7690; margin-top: 10px;">Houston, Texas & surrounding areas</div>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '</main>';
}

function fullImageFrame(src, alt, w, h, lazy) {
  return '' +
  '<div style="position: relative;">' +
    '<div style="position: absolute; inset: -14px; background: radial-gradient(circle at 50% 40%, rgba(47,123,255,0.12), transparent 72%); filter: blur(14px); pointer-events: none;"></div>' +
    '<div style="position: relative; border-radius: 18px; overflow: hidden; border: 1px solid rgba(124,174,255,0.16); box-shadow: 0 20px 50px rgba(4,8,16,0.45); line-height: 0;">' +
      '<img src="' + src + '" alt="' + alt + '" width="' + w + '" height="' + h + '"' + (lazy ? ' loading="lazy"' : '') + ' style="display: block; width: 100%; height: auto; object-fit: contain;">' +
    '</div>' +
  '</div>';
}

const swCoreServices = [
  { no: "01", name: "Internal Portals", body: "Centralized systems for managing business information, workflows, users, and operations.", icon: I.briefcase },
  { no: "02", name: "Dashboards & Reporting", body: "Custom dashboards that turn business data into clear, useful information.", icon: I.chart },
  { no: "03", name: "System Integrations", body: "Connect existing platforms, applications, APIs, and business systems.", icon: I.link },
  { no: "04", name: "Process Automation", body: "Reduce repetitive manual work by automating business processes and workflows.", icon: I.bot },
  { no: "05", name: "Cloud Applications", body: "Modern web applications designed for secure and reliable cloud deployment.", icon: I.cloud },
  { no: "06", name: "Ongoing Support", body: "Continued improvements, maintenance, troubleshooting, and application support.", icon: I.headset }
];

const swApproachFeatures = [
  { name: "Dedicated Development", body: "Software built specifically around your workflow, not adapted from a generic template." },
  { name: "Modern Technology", body: "Applications built using current, reliable web and cloud technologies." },
  { name: "Integration-Ready", body: "Designed to connect with the other systems your business already uses." },
  { name: "Ongoing Collaboration", body: "Regular communication throughout discovery, development, and deployment." }
];

const swWorkflowExamples = [
  { name: "Internal Business Applications", icon: I.briefcase },
  { name: "Customer/Client Portals", icon: I.users },
  { name: "Reporting Dashboards", icon: I.chart },
  { name: "Workflow Automation", icon: I.bot },
  { name: "API Integrations", icon: I.link },
  { name: "Multi-Location Systems", icon: I.globe },
  { name: "Healthcare/Business Applications", icon: I.cross },
  { name: "Custom Operational Tools", icon: I.code }
];

const swSteps = [
  { no: "01", name: "Discovery", body: "Learn about the business, current workflow, and what the software needs to solve." },
  { no: "02", name: "Planning", body: "Define scope, requirements, and a roadmap for the application." },
  { no: "03", name: "Development", body: "Build the application around the agreed scope and requirements." },
  { no: "04", name: "Testing", body: "Verify functionality, reliability, and performance before launch." },
  { no: "05", name: "Deployment", body: "Launch and migrate the application to its production environment." },
  { no: "06", name: "Support", body: "Provide ongoing improvements, maintenance, and troubleshooting." }
];

function customSoftwarePage() {
  const heroTrustStrip = ["Internal Portals", "Dashboards", "Integrations", "Automation"].map(label =>
    '<div class="hero-tag">' + label + '</div>').join("");

  const coreServiceCards = swCoreServices.map(s =>
    '<div class="mbs-feature-card" style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 22px;">' +
      '<div style="font-size: 12.5px; font-weight: 800; color: #9db4dd; letter-spacing: 0.05em; margin-bottom: 10px;">' + s.no + '</div>' +
      '<div style="width: 42px; height: 42px; border-radius: 11px; background: rgba(30,95,224,0.08); border: 1px solid rgba(30,95,224,0.25); display: grid; place-items: center; margin-bottom: 12px;">' +
        icon(s.icon, 20, "#1e5fe0") + '</div>' +
      '<div style="font-size: 16.5px; font-weight: 700; margin-bottom: 6px; color: #0c1220;">' + s.name + '</div>' +
      '<div style="font-size: 13.5px; line-height: 1.45; color: #46536b;">' + s.body + '</div>' +
    '</div>').join("");

  const approachRows = swApproachFeatures.map(f =>
    '<div style="display: flex; gap: 14px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">' +
      '<div style="width: 26px; height: 26px; border-radius: 50%; background: rgba(30,95,224,0.15); border: 1px solid rgba(77,141,255,0.4); display: grid; place-items: center; flex-shrink: 0; margin-top: 2px;">' +
        icon(I.check, 13, "#4d8dff") + '</div>' +
      '<div>' +
        '<div style="font-size: 16px; font-weight: 700; margin-bottom: 3px;">' + f.name + '</div>' +
        '<div style="font-size: 14px; color: #8b95ab; line-height: 1.45;">' + f.body + '</div>' +
      '</div>' +
    '</div>').join("");

  const workflowBlocks = swWorkflowExamples.map(x =>
    '<div style="display: flex; align-items: center; gap: 12px; background: #fff; border: 1px solid #dbe3f0; border-radius: 12px; padding: 15px 16px;">' +
      '<div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(30,95,224,0.08); border: 1px solid rgba(30,95,224,0.25); display: grid; place-items: center; flex-shrink: 0;">' +
        icon(x.icon, 17, "#1e5fe0") + '</div>' +
      '<div style="font-size: 14px; font-weight: 600; color: #0c1220;">' + x.name + '</div>' +
    '</div>').join("");

  const stepCards = swSteps.map(s =>
    '<div style="text-align: center;">' +
      '<div style="width: 44px; height: 44px; border-radius: 50%; background: #060a14; border: 2px solid #4d8dff; display: grid; place-items: center; margin: 0 auto 16px; font-weight: 800; color: #4d8dff; font-size: 16px;">' + s.no + '</div>' +
      '<div style="font-size: 16.5px; font-weight: 700; margin-bottom: 6px; color: #eef2fa;">' + s.name + '</div>' +
      '<div style="font-size: 13.5px; line-height: 1.5; color: #8b95ab; max-width: 32ch; margin: 0 auto;">' + s.body + '</div>' +
    '</div>').join("");

  return '<main>' +
  '<section style="position: relative; background: #060a14; border-bottom: 1px solid rgba(255,255,255,0.06); overflow: hidden;">' +
    '<div class="hero-grid-cols" style="max-width: 1280px; margin: 0 auto; padding: 64px 32px 60px; display: grid; grid-template-columns: minmax(0,1.05fr) minmax(0,1fr); gap: 48px; align-items: center;">' +
      '<div style="min-width: 0;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Custom Software Solutions</div>' +
        '<h1 style="font-size: 40px; font-weight: 800; line-height: 1.15; margin: 0 0 18px;">Software Built Around Your Business.<br><span style="color: #4d8dff;">Not the Other Way Around.</span></h1>' +
        '<p style="font-size: 17px; line-height: 1.6; color: #aeb8cd; margin: 0 0 28px; max-width: 50ch;">Custom applications, internal portals, dashboards, integrations, and automation designed around the way your business actually operates.</p>' +
        '<div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 26px;">' +
          btnPrimary("Request a Custom Software Quote &nbsp;→", "contact", "15px 26px", "16px") +
          '<a href="tel:+13462181253" class="btn btn-ghost-dark" style="padding: 15px 26px; font-size: 16px; text-decoration: none; display: inline-flex; align-items: center;">Call ' + PHONE + '</a>' +
        '</div>' +
        '<div class="hero-tags">' + heroTrustStrip + '</div>' +
      '</div>' +
      '<div style="min-width: 0;">' + fullImageFrame("/assets/images/axisforce-custom-software-hero.webp", "Custom software concept showing a desktop dashboard, tablet, and laptop with the AxisForce build-test-deploy process and technology stack", 1536, 1024, false) + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 76px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 48px;">' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0; color: #0c1220;">Custom Software Designed for Real Business Needs</h2>' +
      '</div>' +
      '<div class="grid-sw-process" style="gap: 20px;">' + coreServiceCards + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06);">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; padding: 76px 32px; display: grid; grid-template-columns: 1.05fr 1fr; gap: 56px; align-items: center;">' +
      '<div style="min-width: 0;">' + fullImageFrame("/assets/images/axisforce-custom-software-solutions.webp", "Custom software solutions concept showing internal portals, dashboards, system integrations, process automation, and a project progress timeline", 1536, 1024, true) + '</div>' +
      '<div>' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">How We Build Software</div>' +
        '<h2 style="font-size: 32px; font-weight: 800; margin: 0 0 18px; line-height: 1.1;">From Concept to Fully Supported Software.</h2>' +
        '<p style="font-size: 15.5px; line-height: 1.65; color: #aeb8cd; margin: 0 0 8px; max-width: 52ch;">Custom software is more than writing code. AxisForce plans, builds, tests, deploys, and supports each application as part of one coordinated process — designed around your business rather than a generic template.</p>' +
        approachRows +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 76px 32px;">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1.05fr; gap: 56px; align-items: center; margin-bottom: 56px;">' +
      '<div style="min-width: 0;">' + fullImageFrame("/assets/images/axisforce-custom-software-dashboard.webp", "AxisForce-branded custom dashboard application shown across a monitor, laptop, and tablet", 1535, 1024, true) + '</div>' +
      '<div>' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">Not One-Size-Fits-All</div>' +
        '<h2 style="font-size: 30px; font-weight: 800; margin: 0 0 16px; line-height: 1.15; color: #0c1220;">Technology That Fits Your Workflow.</h2>' +
        '<p style="font-size: 15px; line-height: 1.6; color: #46536b; margin: 0;">Off-the-shelf software often forces a business to adapt to the tool. AxisForce takes the opposite approach — starting with how your business actually operates, then designing software around that reality.</p>' +
      '</div>' +
    '</div>' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div class="grid-services" style="display: grid; gap: 16px;">' + workflowBlocks + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 76px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 48px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">A Simple Process</div>' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0;">Discovery to Ongoing Support</h2>' +
      '</div>' +
      '<div class="grid-sw-process">' + stepCards + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 76px 32px;">' +
    '<div style="max-width: 700px; margin: 0 auto; text-align: center;">' +
      '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">Straightforward Pricing</div>' +
      '<h2 style="font-size: 32px; font-weight: 800; margin: 0 0 32px; color: #0c1220;">Custom Software, Custom Scope.</h2>' +
      '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 18px; padding: 40px 36px;">' +
        '<div style="font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #62708a; margin-bottom: 14px;">Custom Software</div>' +
        '<div style="font-size: 34px; font-weight: 800; color: #0c1220; margin-bottom: 18px;">Custom Quote</div>' +
        '<div style="font-size: 15px; line-height: 1.6; color: #46536b; margin-bottom: 26px;">Pricing depends on project scope, integrations, complexity, number of users, hosting requirements, and ongoing support needs. We\'ll scope your project before providing a quote.</div>' +
        btnPrimary("Request a Quote &nbsp;→", "contact", "14px 26px", "15.5px") +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="padding: 76px 32px 64px;">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; background: linear-gradient(120deg, #0d1526, #12203c 60%, #0e2a5c); border: 1px solid rgba(124,174,255,0.25); border-radius: 16px; padding: 48px 56px; display: grid; grid-template-columns: 1.3fr 1fr; gap: 48px; align-items: center; position: relative; overflow: hidden;">' +
      '<div style="position: absolute; right: -60px; bottom: -80px; width: 380px; height: 380px; border-radius: 50%; background: radial-gradient(circle, rgba(47,123,255,0.25), transparent 65%); pointer-events: none;"></div>' +
      '<div>' +
        '<div style="font-size: 13.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #4d8dff; margin-bottom: 14px;">Ready To Build Something?</div>' +
        '<h2 style="font-size: 34px; font-weight: 800; margin: 0; line-height: 1.15; letter-spacing: -0.01em;">Have a Process That Should Be Software?</h2>' +
      '</div>' +
      '<div>' +
        '<p style="font-size: 16.5px; line-height: 1.6; color: #cfd8ea; margin: 0 0 22px;">Tell us how your business currently works and what you want to improve. We\'ll help determine whether a custom application, integration, dashboard, or automation is the right solution.</p>' +
        btnPrimary("Start a Conversation &nbsp;→", "contact", "15px 26px", "16px") +
        '<div style="font-size: 15px; font-weight: 600; color: #8b95ab; margin-top: 16px;">Or call us directly: <a href="tel:+13462181253" style="color: #eef2fa; text-decoration: none;">' + PHONE + '</a></div>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '</main>';
}

const crmCoreServices = [
  { no: "01", name: "CRM Implementation", body: "End-to-end setup and configuration of Salesforce, Dynamics 365, HubSpot, or another CRM platform.", icon: I.users },
  { no: "02", name: "CRM Customization", body: "Tailored fields, workflows, and views that match how your team actually sells and operates.", icon: I.code },
  { no: "03", name: "Workflow Automation", body: "Automate repetitive tasks, approvals, and follow-ups so your team spends less time on data entry.", icon: I.bot },
  { no: "04", name: "System Integrations", body: "Connect your CRM with the other tools, platforms, and systems your business already runs on.", icon: I.link },
  { no: "05", name: "Data Migration", body: "Secure, accurate migration of existing customer and business data with minimal disruption.", icon: I.server },
  { no: "06", name: "Dashboards & Reporting", body: "Real-time dashboards and reports that turn raw data into decisions you can act on.", icon: I.chart }
];

const crmPlatforms = [
  { name: "Salesforce CRM", icon: I.cloud },
  { name: "Microsoft Dynamics 365", icon: I.server },
  { name: "HubSpot CRM", icon: I.link },
  { name: "Power BI Analytics", icon: I.chart },
  { name: "Other CRM/Business Systems", icon: I.globe }
];

const crmBenefits = [
  { name: "Centralized Customer Data", body: "One consistent view of every customer, account, and interaction across your business." },
  { name: "Better Visibility", body: "Clear insight into pipeline, performance, and operations without digging through spreadsheets." },
  { name: "Automated Workflows", body: "Less manual data entry and fewer dropped follow-ups, with routine tasks handled automatically." },
  { name: "Improved Reporting", body: "Dashboards and reports built around the metrics that actually matter to your business." },
  { name: "Connected Systems", body: "Your CRM working together with the other platforms your team relies on every day." },
  { name: "Scalable Processes", body: "A setup that grows with your business instead of needing to be rebuilt as you add users." }
];

const crmWhoFor = [
  { name: "Medical Practices", icon: I.cross },
  { name: "Professional Services", icon: I.briefcase },
  { name: "Retail Businesses", icon: I.bag },
  { name: "Multi-Location Businesses", icon: I.globe },
  { name: "Sales Organizations", icon: I.growth },
  { name: "Growing Companies", icon: I.chart }
];

const crmSteps = [
  { no: "01", name: "Discovery", body: "Understand the business, current systems, processes, data, and goals." },
  { no: "02", name: "Solution Design", body: "Determine the appropriate CRM, integrations, automation, and reporting structure." },
  { no: "03", name: "Implementation", body: "Configure, integrate, migrate data, test, and deploy the agreed solution." },
  { no: "04", name: "Support & Optimization", body: "Provide ongoing support and improvements as business requirements evolve." }
];

function crmBusinessIntelligencePage() {
  const heroTrustStrip = ["CRM Implementation", "Automation", "Integrations", "Business Intelligence"].map(label =>
    '<div class="hero-tag">' + label + '</div>').join("");

  const coreServiceCards = crmCoreServices.map(s =>
    '<div class="mbs-feature-card" style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 22px;">' +
      '<div style="font-size: 12.5px; font-weight: 800; color: #9db4dd; letter-spacing: 0.05em; margin-bottom: 10px;">' + s.no + '</div>' +
      '<div style="width: 42px; height: 42px; border-radius: 11px; background: rgba(30,95,224,0.08); border: 1px solid rgba(30,95,224,0.25); display: grid; place-items: center; margin-bottom: 12px;">' +
        icon(s.icon, 20, "#1e5fe0") + '</div>' +
      '<div style="font-size: 16.5px; font-weight: 700; margin-bottom: 6px; color: #0c1220;">' + s.name + '</div>' +
      '<div style="font-size: 13.5px; line-height: 1.45; color: #46536b;">' + s.body + '</div>' +
    '</div>').join("");

  const platformBlocks = crmPlatforms.map(p =>
    '<div style="display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(124,174,255,0.2); border-radius: 12px; padding: 15px 16px;">' +
      '<div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(30,95,224,0.12); border: 1px solid rgba(77,141,255,0.3); display: grid; place-items: center; flex-shrink: 0;">' +
        icon(p.icon, 17, "#4d8dff") + '</div>' +
      '<div style="font-size: 14px; font-weight: 600; color: #eef2fa;">' + p.name + '</div>' +
    '</div>').join("");

  const benefitCards = crmBenefits.map(b =>
    '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 22px;">' +
      '<div style="width: 26px; height: 26px; border-radius: 50%; background: rgba(30,95,224,0.09); border: 1px solid rgba(30,95,224,0.3); display: grid; place-items: center; margin-bottom: 14px;">' +
        icon(I.check, 13, "#1e5fe0") + '</div>' +
      '<div style="font-size: 16.5px; font-weight: 700; margin-bottom: 6px; color: #0c1220;">' + b.name + '</div>' +
      '<div style="font-size: 13.5px; line-height: 1.45; color: #46536b;">' + b.body + '</div>' +
    '</div>').join("");

  const whoForBlocks = crmWhoFor.map(w =>
    '<div style="display: flex; align-items: center; gap: 12px; background: #fff; border: 1px solid #dbe3f0; border-radius: 12px; padding: 15px 16px;">' +
      '<div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(30,95,224,0.08); border: 1px solid rgba(30,95,224,0.25); display: grid; place-items: center; flex-shrink: 0;">' +
        icon(w.icon, 17, "#1e5fe0") + '</div>' +
      '<div style="font-size: 14px; font-weight: 600; color: #0c1220;">' + w.name + '</div>' +
    '</div>').join("");

  const stepCards = crmSteps.map(s =>
    '<div style="text-align: center;">' +
      '<div style="width: 44px; height: 44px; border-radius: 50%; background: #fff; border: 2px solid #1e5fe0; display: grid; place-items: center; margin: 0 auto 16px; font-weight: 800; color: #1e5fe0; font-size: 16px;">' + s.no + '</div>' +
      '<div style="font-size: 16.5px; font-weight: 700; margin-bottom: 6px; color: #0c1220;">' + s.name + '</div>' +
      '<div style="font-size: 13.5px; line-height: 1.5; color: #46536b; max-width: 30ch; margin: 0 auto;">' + s.body + '</div>' +
    '</div>').join("");

  return '<main>' +
  '<section style="position: relative; background: #060a14; border-bottom: 1px solid rgba(255,255,255,0.06); overflow: hidden;">' +
    '<div class="hero-grid-cols" style="max-width: 1280px; margin: 0 auto; padding: 64px 32px 60px; display: grid; grid-template-columns: minmax(0,1.05fr) minmax(0,1fr); gap: 48px; align-items: center;">' +
      '<div style="min-width: 0;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">CRM & Business Intelligence</div>' +
        '<h1 style="font-size: 40px; font-weight: 800; line-height: 1.15; margin: 0 0 18px;">Turn Business Data Into<br><span style="color: #4d8dff;">Better Decisions.</span></h1>' +
        '<p style="font-size: 17px; line-height: 1.6; color: #aeb8cd; margin: 0 0 28px; max-width: 50ch;">AxisForce helps businesses implement, customize, integrate, and optimize CRM and business intelligence solutions built around their operations.</p>' +
        '<div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 26px;">' +
          btnPrimary("Request a CRM & BI Quote &nbsp;→", "contact", "15px 26px", "16px") +
          '<a href="tel:+13462181253" class="btn btn-ghost-dark" style="padding: 15px 26px; font-size: 16px; text-decoration: none; display: inline-flex; align-items: center;">Call ' + PHONE + '</a>' +
        '</div>' +
        '<div class="hero-tags">' + heroTrustStrip + '</div>' +
      '</div>' +
      '<div style="min-width: 0;">' + fullImageFrame("/assets/images/axisforce-crm-hero.webp", "AxisForce CRM and business intelligence dashboard on a laptop showing revenue, pipeline, and reporting connected to customers, sales, automation, and insights", 1536, 1024, false) + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 76px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 48px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">What We Do</div>' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0; color: #0c1220;">CRM & BI Built Around Your Business</h2>' +
      '</div>' +
      '<div class="grid-sw-process" style="gap: 20px;">' + coreServiceCards + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 76px 32px;">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1.05fr 1fr; gap: 56px; align-items: center; margin-bottom: 48px;">' +
      '<div style="min-width: 0;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Platforms We Work With</div>' +
        '<h2 style="font-size: 32px; font-weight: 800; margin: 0 0 18px; line-height: 1.1;">One Connected View of Your Business.</h2>' +
        '<p style="font-size: 15.5px; line-height: 1.65; color: #aeb8cd; margin: 0; max-width: 52ch;">AxisForce connects customer information, operational data, and sales activity into a single, more useful view — whether your business runs on Salesforce, Microsoft Dynamics 365, HubSpot, Power BI, or another platform.</p>' +
      '</div>' +
      '<div style="min-width: 0;">' + fullImageFrame("/assets/images/axisforce-crm-platforms.webp", "Salesforce, Microsoft Dynamics 365, HubSpot, and Power BI platform logos connected to an AxisForce executive dashboard on a laptop", 1536, 1024, true) + '</div>' +
    '</div>' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div class="grid-services" style="display: grid; gap: 16px;">' + platformBlocks + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 76px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 48px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">Why It Matters</div>' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0; color: #0c1220;">Built to Make Your Business Run Smarter</h2>' +
      '</div>' +
      '<div class="grid-sw-process" style="gap: 20px;">' + benefitCards + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 76px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 40px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Who We Work With</div>' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0 0 14px;">CRM & BI Solutions For Growing Businesses</h2>' +
      '</div>' +
      '<div class="grid-services" style="display: grid; gap: 16px;">' + whoForBlocks + '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 62px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div style="text-align: center; margin-bottom: 42px;">' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 12px;">A Simple Process</div>' +
        '<h2 style="font-size: 36px; font-weight: 800; margin: 0; color: #0c1220;">From Discovery to Ongoing Optimization</h2>' +
      '</div>' +
      '<div style="position: relative;">' +
        '<div class="sec-step-line" style="position: absolute; top: 22px; left: 60px; right: 60px; height: 1px; background: rgba(30,95,224,0.2); z-index: 0;"></div>' +
        '<div class="grid-services" style="display: grid; gap: 24px; position: relative; z-index: 1;">' + stepCards + '</div>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="padding: 76px 32px;">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1.05fr; gap: 56px; align-items: center;">' +
      '<div style="min-width: 0;">' + fullImageFrame("/assets/images/axisforce-crm-executive-dashboard.webp", "Business professional reviewing a connected CRM and business intelligence executive dashboard on a desktop monitor", 1536, 1024, true) + '</div>' +
      '<div>' +
        '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Straightforward Pricing</div>' +
        '<h2 style="font-size: 32px; font-weight: 800; margin: 0 0 18px; line-height: 1.1;">Custom CRM & BI Solutions.</h2>' +
        '<p style="font-size: 15.5px; line-height: 1.65; color: #aeb8cd; margin: 0 0 26px; max-width: 52ch;">CRM and business intelligence projects vary considerably depending on users, platforms, integrations, data migration, dashboards, automation, and business requirements — so pricing is scoped individually rather than fixed.</p>' +
        '<div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(124,174,255,0.2); border-radius: 14px; padding: 22px 24px; display: inline-block;">' +
          '<div style="font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #9db4dd; margin-bottom: 10px;">CRM & Business Intelligence</div>' +
          '<div style="font-size: 30px; font-weight: 800; color: #eef2fa; margin-bottom: 16px;">Custom Quote</div>' +
          btnPrimary("Request a Quote &nbsp;→", "contact", "14px 26px", "15.5px") +
        '</div>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="padding: 0 32px 64px;">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; background: linear-gradient(120deg, #0d1526, #12203c 60%, #0e2a5c); border: 1px solid rgba(124,174,255,0.25); border-radius: 16px; padding: 48px 56px; display: grid; grid-template-columns: 1.3fr 1fr; gap: 48px; align-items: center; position: relative; overflow: hidden;">' +
      '<div style="position: absolute; right: -60px; bottom: -80px; width: 380px; height: 380px; border-radius: 50%; background: radial-gradient(circle, rgba(47,123,255,0.25), transparent 65%); pointer-events: none;"></div>' +
      '<div>' +
        '<div style="font-size: 13.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #4d8dff; margin-bottom: 14px;">Let\'s Get Started</div>' +
        '<h2 style="font-size: 34px; font-weight: 800; margin: 0; line-height: 1.15; letter-spacing: -0.01em;">Build a Smarter, More Connected Business.</h2>' +
      '</div>' +
      '<div>' +
        '<p style="font-size: 16.5px; line-height: 1.6; color: #cfd8ea; margin: 0 0 22px;">Tell us about your current CRM, reporting, integration, or automation needs. We\'ll help determine the right combination of platform, configuration, and support for your business.</p>' +
        btnPrimary("Request a CRM & BI Quote &nbsp;→", "contact", "15px 26px", "16px") +
        '<div style="font-size: 15px; font-weight: 600; color: #8b95ab; margin-top: 16px;">Or call us directly: <a href="tel:+13462181253" style="color: #eef2fa; text-decoration: none;">' + PHONE + '</a></div>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '</main>';
}

function contactPage() {
  const rows = contactRows.map(c =>
    '<div class="info-row">' +
      '<span style="font-size: 12.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #62708a; padding-top: 2px;">' + c.k + '</span>' +
      '<span style="font-size: 16px; color: #0c1220;">' + c.v + '</span>' +
    '</div>').join("");

  return '<main>' +
  pageHero("Contact",
    "Tell us what is breaking.",
    "Thirty-minute call, no pitch deck. We will tell you what we would do first and roughly what it costs — even if that is nothing.",
    heroMedia(300, slot("/assets/images/axisforce-contact-hero.webp", "Laptop, coffee mug, and notebook on a desk in a modern office with the AxisForce logo and a city skyline at night", "", "", "", "contact-hero-img"))) +
  '<section style="background: #f2f5fa; color: #131a28; padding: 56px 32px 72px;">' +
    '<div class="contact-layout" style="max-width: 1280px; margin: 0 auto;">' +
      '<div class="contact-left">' +
      '<div class="contact-info">' + rows + '</div>' +
      '<div class="consult-card" style="border: 1px solid #dbe3f0; border-radius: 12px; padding: 28px 32px; background: #fff;">' +
        '<div style="width: 52px; height: 52px; border-radius: 12px; background: rgba(30,95,224,0.08); border: 1px solid rgba(30,95,224,0.25); display: grid; place-items: center; flex-shrink: 0;">' +
          icon("M8 2v4M16 2v4M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", 24, "#1e5fe0") + '</div>' +
        '<div style="flex: 1;">' +
          '<div style="font-size: 17px; font-weight: 700; color: #0c1220; margin-bottom: 4px;">Schedule a Consultation</div>' +
          '<div style="font-size: 13.5px; color: #62708a; line-height: 1.45;">Choose a convenient time for a 30-minute consultation with our team.</div>' +
        '</div>' +
        '<a href="https://calendly.com/sameed-axisforce/30min" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding: 12px 22px; font-size: 14.5px; box-shadow: none; text-decoration: none; display: inline-flex; align-items: center; flex-shrink: 0; white-space: nowrap;">Schedule Consultation &nbsp;→</a>' +
      '</div>' +
      '</div>' +
      '<form style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 36px; box-shadow: 0 2px 10px rgba(19,26,40,0.05); display: grid; gap: 18px;" onsubmit="return contactSubmit(event)">' +
        '<div class="field"><label for="cf-name">Name</label><input id="cf-name" name="name" required placeholder="Jane Okoye"></div>' +
        '<div class="field"><label for="cf-org">Practice or business</label><input id="cf-org" name="company" placeholder="Bayou City Family Medicine"></div>' +
        '<div class="grid-cases" style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px;">' +
          '<div class="field"><label for="cf-email">Email</label><input id="cf-email" name="email" type="email" required placeholder="you@business.com"></div>' +
          '<div class="field"><label for="cf-phone">Phone</label><input id="cf-phone" name="phone" type="tel" placeholder="(346) 000-0000"></div>' +
        '</div>' +
        '<div class="field"><label for="cf-need">What do you need?</label>' +
          '<select id="cf-need" name="service" required>' +
            '<option>Managed IT &amp; helpdesk</option><option>Security cameras &amp; access control</option>' +
            '<option>Network or WiFi buildout</option><option>Medical billing &amp; billing systems</option>' +
            '<option>Website, SEO or ads</option><option>AI automation</option><option>Not sure yet</option>' +
          '</select>' +
        '</div>' +
        '<div class="field"><label for="cf-msg">Details</label><textarea id="cf-msg" name="message" required rows="4" placeholder="Tell us about your business and how we can help."></textarea></div>' +
        '<input type="text" name="_gotcha" style="display: none;" tabindex="-1" autocomplete="off">' +
        '<button type="submit" id="cf-submit" class="btn btn-primary" style="padding: 14px; font-size: 16px; box-shadow: none;">Request the Call</button>' +
        '<div id="cf-thanks" role="status" aria-live="polite" style="display: none; font-size: 14.5px; font-weight: 700; color: #1e5fe0;">Thank you! Your message has been sent. Our team will get back to you soon.</div>' +
        '<div id="cf-error" role="alert" aria-live="assertive" style="display: none; font-size: 14.5px; font-weight: 700; color: #c0392b;">We couldn\'t send your message. Please try again or contact us directly at info@axisforce.net.</div>' +
        '<div style="font-size: 13px; color: #62708a; line-height: 1.45;">We reply within one business day. Nothing sent here is treated as PHI — please do not include patient information.</div>' +
      '</form>' +
    '</div>' +
  '</section>' +
  '</main>';
}

function legalHero(title) {
  return '' +
  '<section style="background: #08101f; border-bottom: 1px solid rgba(255,255,255,0.06); padding: 56px 32px 40px;">' +
    '<div style="max-width: 800px; margin: 0 auto;">' +
      '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Legal</div>' +
      '<h1 style="font-size: 42px; font-weight: 800; line-height: 1.08; margin: 0;">' + title + '</h1>' +
      '<div style="font-size: 14.5px; color: #8b95ab; margin-top: 14px;">Effective Date: August 17, 2026</div>' +
    '</div>' +
  '</section>';
}

function legalSection(html) {
  return '' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 48px 32px 80px;">' +
    '<div style="max-width: 800px; margin: 0 auto; font-size: 16.5px; line-height: 1.7; color: #34415c;">' + html + '</div>' +
  '</section>';
}

const legalH2 = t => '<h2 style="font-size: 24px; font-weight: 800; margin: 40px 0 14px; color: #0c1220;">' + t + '</h2>';
const legalP = t => '<p style="margin: 0 0 16px;">' + t + '</p>';
const legalUl = items => '<ul style="margin: 0 0 16px; padding-left: 22px;">' + items.map(i => '<li style="margin-bottom: 8px;">' + i + '</li>').join("") + '</ul>';

function privacyPage() {
  return '<main>' +
  legalHero("Privacy Policy") +
  legalSection(
    legalP('AxisForce Inc. ("AxisForce," "we," "us," or "our") operates the website axisforce.net (the "Site"). This Privacy Policy explains what information we collect through the Site, how we use it, and the choices you have.') +
    legalH2("Information You Provide to Us") +
    legalP("When you submit a consultation request, contact form, or similar inquiry through the Site, we may collect:") +
    legalUl(["Name", "Email address", "Company or business name", "Service you are interested in", "Message or details about your request", "Phone number (optional)"]) +
    legalP("We only collect information you choose to provide. Phone number is optional and is never required to submit a request.") +
    legalH2("How We Use Your Information") +
    legalP("We use the information you submit to:") +
    legalUl(["Respond to your inquiry and follow up about the services you requested", "Understand your technology needs so we can prepare for a consultation", "Maintain records of business communications"]) +
    legalP("We do not sell, rent, or trade your personal information to third parties.") +
    legalH2("Form Processing &amp; Third-Party Service Providers") +
    legalP('Contact and consultation forms on this Site are processed using Formspree, a third-party form-handling service, which transmits submissions to info@axisforce.net. Formspree may process and briefly store submitted data as part of delivering it to us. We encourage you to review Formspree\'s own privacy practices if you have questions about how they handle data in transit.') +
    legalP("We do not currently use Google Analytics, Meta Pixel, Google Ads conversion tracking, or other advertising or analytics tracking technologies on this Site. If that changes, we will update this Privacy Policy accordingly.") +
    legalH2("Data Protection &amp; Security") +
    legalP("We take reasonable administrative and technical measures to protect information submitted to us. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.") +
    legalH2("Retention") +
    legalP("We retain information submitted through the Site for as long as reasonably necessary to respond to your inquiry and maintain appropriate business records, after which it may be deleted or archived.") +
    legalH2("Disclosure of Information") +
    legalP("We may disclose information if required to do so by law, subpoena, or other legal process, or if we believe in good faith that disclosure is necessary to protect our rights, your safety, or the safety of others.") +
    legalH2("External Links") +
    legalP("The Site may contain links to third-party websites, including social media and review platforms. We are not responsible for the privacy practices or content of external sites and encourage you to review their policies directly.") +
    legalH2("Children's Privacy") +
    legalP("This Site is intended for business audiences and is not directed to children under 13. We do not knowingly collect personal information from children.") +
    legalH2("Changes to This Policy") +
    legalP("We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of the Site after changes are posted constitutes acceptance of the updated policy.") +
    legalH2("Contact Us") +
    legalP('Questions about this Privacy Policy can be directed to:<br>AxisForce Inc.<br>Houston, Texas<br><a href="mailto:info@axisforce.net" style="color:#1e5fe0;font-weight:700;">info@axisforce.net</a>')
  ) +
  '</main>';
}

function termsPage() {
  return '<main>' +
  legalHero("Terms of Service") +
  legalSection(
    legalP('These Terms of Service ("Terms") govern your use of the website axisforce.net (the "Site"), operated by AxisForce Inc. ("AxisForce," "we," "us," or "our"). By accessing or using the Site, you agree to these Terms.') +
    legalP("These Terms apply only to your use of this website. They do not constitute a service agreement, contract, or statement of work for any AxisForce service — including managed IT, medical billing, security camera installation, marketing, Salesforce, or custom software engagements. Those services are governed by separate agreements entered into directly with AxisForce.") +
    legalH2("Use of the Site") +
    legalP("The Site is provided for general informational purposes about AxisForce and its services. You may browse the Site and submit inquiries through our contact and consultation forms for legitimate business purposes.") +
    legalH2("Prohibited Use") +
    legalP("You agree not to:") +
    legalUl(["Use the Site for any unlawful purpose", "Attempt to gain unauthorized access to the Site or its underlying systems", "Interfere with or disrupt the Site's operation", "Submit false, misleading, or malicious information through Site forms", "Scrape, harvest, or misuse content from the Site outside of normal browsing"]) +
    legalH2("Intellectual Property") +
    legalP("All content on the Site, including text, graphics, logos, and images, is the property of AxisForce Inc. or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from Site content without our prior written permission.") +
    legalH2("Third-Party Links") +
    legalP("The Site may link to third-party websites, including social media and review platforms, for your convenience. We do not control and are not responsible for the content, accuracy, or practices of those external sites.") +
    legalH2("No Warranty / Accuracy of Content") +
    legalP('We aim to keep the information on this Site current and accurate, but we do not guarantee that all content is complete, up to date, or error-free at all times. Service descriptions, pricing ranges, and other details are provided for general informational purposes and are subject to change.') +
    legalH2("Limitation of Liability") +
    legalP('To the fullest extent permitted by law, AxisForce Inc. shall not be liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, the Site. The Site is provided on an "as is" and "as available" basis without warranties of any kind, express or implied.') +
    legalH2("Governing Law") +
    legalP("These Terms are governed by the laws of the State of Texas, United States, without regard to conflict-of-law principles. Any disputes arising from these Terms or use of the Site are subject to the exclusive jurisdiction of the courts located in Harris County, Texas.") +
    legalH2("Changes to These Terms") +
    legalP("We may revise these Terms from time to time. Updates will be posted on this page with a new effective date. Continued use of the Site after changes are posted constitutes acceptance of the revised Terms.") +
    legalH2("Contact Us") +
    legalP('Questions about these Terms can be directed to:<br>AxisForce Inc.<br>Houston, Texas<br><a href="mailto:info@axisforce.net" style="color:#1e5fe0;font-weight:700;">info@axisforce.net</a>')
  ) +
  '</main>';
}

function portalLoginPage() {
  return '' +
  '<main class="grid-2 portal-login-grid" style="max-width: 1400px; margin: 0 auto; padding: 96px 32px; display: grid; grid-template-columns: 0.85fr 1.5fr 420px; gap: 40px; align-items: center; min-height: 62vh;">' +
    '<div style="min-width: 0;">' +
      '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Client Portal</div>' +
      '<h1 style="font-size: 52px; font-weight: 800; line-height: 1; margin: 0 0 18px;">Welcome back.</h1>' +
      '<p style="font-size: 18px; line-height: 1.6; color: #aeb8cd; max-width: 34ch; margin: 0 0 28px;">Access your AxisForce services, support requests, billing information, and account resources — all in one secure place.</p>' +
      '<div style="display: flex; flex-wrap: wrap; gap: 8px;">' +
        portalBadges.map(b => '<span style="padding: 5px 13px; border-radius: 999px; font-size: 13px; font-weight: 700; border: 1px solid rgba(124,174,255,0.35); color: #cfd8ea;">' + b + "</span>").join("") +
      '</div>' +
    '</div>' +
    '<div class="portal-login-media" style="min-width: 0; display: flex; align-items: center; justify-content: center;">' +
      '<img src="/assets/images/axisforce-portal-hero.webp" alt="AxisForce client portal security and dashboard preview" width="1672" height="941" style="width: 100%; max-width: 560px; height: auto; display: block;">' +
    '</div>' +
    '<div style="background: rgba(10,16,30,0.85); border: 1px solid rgba(124,174,255,0.25); border-radius: 14px; padding: 34px; display: grid; gap: 18px; box-shadow: 0 20px 60px rgba(0,0,0,0.4);">' +
      '<div class="field field-dark"><label for="pf-email">Work email</label><input id="pf-email" placeholder="you@business.com"></div>' +
      '<div class="field field-dark"><label for="pf-pw">Password</label><input id="pf-pw" type="password" placeholder="••••••••••"></div>' +
      '<button class="btn btn-primary" style="padding: 14px; font-size: 16px;" onclick="signIn()">Sign In</button>' +
      '<div style="display: flex; justify-content: space-between; font-size: 14px; color: #8b95ab;">' +
        '<span style="cursor: pointer;">Forgot password</span><span style="cursor: pointer;">Request access</span>' +
      '</div>' +
      '<div style="font-size: 12.5px; color: #62708a; text-align: center; border-top: 1px solid rgba(124,174,255,0.15); padding-top: 14px; line-height: 1.45;">Your information is protected with secure, encrypted access.</div>' +
    '</div>' +
  '</main>';
}

function portalAppPage() {
  const tabDefs = [["billing", "Billing"], ["claims", "Claims"], ["support", "Support"], ["docs", "Documents"]];
  const tabRow = tabDefs.map(([k, label]) =>
    '<div style="font-size: 16px; font-weight: 700; padding: 0 0 12px; cursor: pointer; border-bottom: 3px solid ' +
    (state.tab === k ? "#1e5fe0" : "transparent") + '; color: ' + (state.tab === k ? "#1e5fe0" : "#62708a") +
    ';" onclick="setTab(\'' + k + '\')">' + label + "</div>").join("");

  const kpiCards = kpis.map(k =>
    '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 12px; padding: 22px;">' +
      '<div style="font-size: 12.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #62708a;">' + k.label + '</div>' +
      '<div style="font-size: 34px; font-weight: 800; line-height: 1.1; margin-top: 6px; color: #0c1220;">' + k.value + '</div>' +
      '<div style="font-size: 13px; color: #62708a; margin-top: 2px;">' + k.note + '</div>' +
    '</div>').join("");

  const pill = r => '<span><span style="padding: 3px 10px; border-radius: 999px; font-size: 12.5px; font-weight: 700; background: ' + r.sbg + '; color: ' + r.sc + ';">' + (r.status || r.priority) + "</span></span>";

  let tabBody = "";
  if (state.tab === "billing") {
    const invRows = invoices.map(i =>
      '<div style="display: grid; grid-template-columns: 1fr 1fr 1fr 0.9fr 0.7fr; padding: 13px 24px; border-bottom: 1px solid #e9eef7; font-size: 14.5px; align-items: center;">' +
        '<span style="font-variant-numeric: tabular-nums; font-weight: 600; color: #0c1220;">' + i.id + '</span>' +
        '<span style="color: #46536b;">' + i.period + '</span>' +
        '<span style="font-variant-numeric: tabular-nums; color: #0c1220;">' + i.amount + '</span>' + pill(i) +
        '<span style="color: #46536b;">' + i.due + '</span>' +
      '</div>').join("");
    tabBody =
    '<div class="grid-portal" style="display: grid; grid-template-columns: 1.6fr 1fr; gap: 36px; align-items: start;">' +
      '<div class="table-scroll" style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; overflow: hidden;">' +
        '<div style="padding: 20px 24px 14px; font-size: 20px; font-weight: 800; color: #0c1220;">Invoices</div>' +
        '<div style="display: grid; grid-template-columns: 1fr 1fr 1fr 0.9fr 0.7fr; padding: 10px 24px; border-bottom: 2px solid #dbe3f0; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #62708a;">' +
          '<span>Invoice</span><span>Period</span><span>Amount</span><span>Status</span><span>Due</span>' +
        '</div>' + invRows +
      '</div>' +
      '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 30px;">' +
        '<div style="font-size: 13px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #1e5fe0;">Balance due</div>' +
        '<div style="font-size: 46px; font-weight: 800; line-height: 1; margin: 10px 0 12px; color: #0c1220;">$4,850.00</div>' +
        '<div style="font-size: 14.5px; color: #46536b; line-height: 1.5; margin-bottom: 22px;">One invoice open. Autopay is on for the 1st of each month via ACH ending 4417.</div>' +
        '<button class="btn btn-primary" style="width: 100%; padding: 13px; font-size: 15.5px; box-shadow: none;">Pay Now</button>' +
        '<button class="btn btn-ghost-light" style="width: 100%; margin-top: 10px; padding: 13px; font-size: 15px;">Download Statements</button>' +
      '</div>' +
    '</div>';
  } else if (state.tab === "claims") {
    const clRows = claims.map(c =>
      '<div style="display: grid; grid-template-columns: 0.9fr 1fr 1.2fr 0.8fr 0.8fr 0.9fr 0.6fr; padding: 13px 24px; border-bottom: 1px solid #e9eef7; font-size: 14.5px; align-items: center;">' +
        '<span style="font-variant-numeric: tabular-nums; font-weight: 600; color: #0c1220;">' + c.id + '</span>' +
        '<span style="color: #46536b;">' + c.patient + '</span>' +
        '<span style="color: #46536b;">' + c.payer + '</span>' +
        '<span style="font-variant-numeric: tabular-nums; color: #0c1220;">' + c.billed + '</span>' +
        '<span style="font-variant-numeric: tabular-nums; color: #0c1220;">' + c.paid + '</span>' + pill(c) +
        '<span style="color: #46536b;">' + c.age + '</span>' +
      '</div>').join("");
    tabBody =
    '<div>' +
      '<div style="display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 18px; gap: 12px; flex-wrap: wrap;">' +
        '<h2 style="font-size: 24px; font-weight: 800; margin: 0; color: #0c1220;">Claims &amp; remittances</h2>' +
        '<span style="padding: 4px 12px; border-radius: 999px; font-size: 12.5px; font-weight: 700; border: 1px solid #c7d2e4; color: #62708a;">Source: Availity · nightly</span>' +
      '</div>' +
      '<div class="table-scroll" style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; overflow: hidden; margin-bottom: 32px;">' +
        '<div style="display: grid; grid-template-columns: 0.9fr 1fr 1.2fr 0.8fr 0.8fr 0.9fr 0.6fr; padding: 10px 24px; border-bottom: 2px solid #dbe3f0; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #62708a;">' +
          '<span>Claim</span><span>Patient</span><span>Payer</span><span>Billed</span><span>Paid</span><span>Status</span><span>Age</span>' +
        '</div>' + clRows +
      '</div>' +
      '<div class="grid-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;">' +
        claimPanels.map(p =>
          '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 12px; padding: 24px;">' +
            '<div style="font-size: 18px; font-weight: 700; margin-bottom: 8px; color: #0c1220;">' + p.name + '</div>' +
            '<div style="font-size: 14.5px; line-height: 1.5; color: #46536b;">' + p.body + '</div>' +
          '</div>').join("") +
      '</div>' +
    '</div>';
  } else if (state.tab === "support") {
    const tkRows = tickets.map(t =>
      '<div style="display: grid; grid-template-columns: 0.7fr 2fr 1fr 0.9fr 0.9fr; padding: 13px 24px; border-bottom: 1px solid #e9eef7; font-size: 14.5px; align-items: center;">' +
        '<span style="font-variant-numeric: tabular-nums; font-weight: 600; color: #0c1220;">' + t.id + '</span>' +
        '<span style="color: #0c1220;">' + t.subject + '</span>' +
        '<span style="color: #46536b;">' + t.site + '</span>' + pill(t) +
        '<span style="color: #46536b;">' + t.updated + '</span>' +
      '</div>').join("");
    tabBody =
    '<div class="grid-portal" style="display: grid; grid-template-columns: 1.6fr 1fr; gap: 36px; align-items: start;">' +
      '<div class="table-scroll" style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; overflow: hidden;">' +
        '<div style="padding: 20px 24px 14px; font-size: 20px; font-weight: 800; color: #0c1220;">Open tickets</div>' +
        '<div style="display: grid; grid-template-columns: 0.7fr 2fr 1fr 0.9fr 0.9fr; padding: 10px 24px; border-bottom: 2px solid #dbe3f0; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #62708a;">' +
          '<span>Ticket</span><span>Subject</span><span>Site</span><span>Priority</span><span>Updated</span>' +
        '</div>' + tkRows +
      '</div>' +
      '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 30px; display: grid; gap: 16px;">' +
        '<div style="font-size: 13px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #1e5fe0;">New request</div>' +
        '<div class="field"><label for="tk-sub">Subject</label><input id="tk-sub" placeholder="Front desk printer offline"></div>' +
        '<div class="field"><label for="tk-pri">Priority</label>' +
          '<select id="tk-pri"><option>Normal</option><option>High</option><option>Business down</option></select></div>' +
        '<div class="field"><label for="tk-note">Details</label><textarea id="tk-note" rows="3" placeholder="Started this morning after the power blip."></textarea></div>' +
        '<button class="btn btn-primary" style="padding: 13px; font-size: 15.5px; box-shadow: none;">Submit Ticket</button>' +
      '</div>' +
    '</div>';
  } else {
    tabBody =
    '<div>' +
      '<h2 style="font-size: 24px; font-weight: 800; margin: 0 0 22px; color: #0c1220;">Documents</h2>' +
      '<div class="grid-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;">' +
        docs.map(d =>
          '<div class="border-hover" style="background: #fff; border: 1px solid #dbe3f0; border-radius: 12px; padding: 24px;">' +
            '<div style="font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 8px;">' + d.kind + '</div>' +
            '<div style="font-size: 18px; font-weight: 700; color: #0c1220;">' + d.name + '</div>' +
            '<div style="font-size: 13.5px; color: #62708a; margin-top: 8px;">' + d.meta + '</div>' +
          '</div>').join("") +
      '</div>' +
    '</div>';
  }

  return '<main>' +
  '<section style="border-bottom: 1px solid rgba(255,255,255,0.06); padding: 40px 32px;">' +
    '<div style="max-width: 1280px; margin: 0 auto; display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; flex-wrap: wrap;">' +
      '<div>' +
        '<div style="font-size: 13px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #4d8dff; margin-bottom: 8px;">Account 1042 · Medical</div>' +
        '<h1 style="font-size: 36px; font-weight: 800; line-height: 1; margin: 0;">Bayou City Family Medicine</h1>' +
      '</div>' +
      '<div style="display: flex; align-items: center; gap: 16px;">' +
        '<span style="font-size: 14px; color: #8b95ab;">Synced 06:12 CT</span>' +
        '<button class="btn btn-ghost-dark" style="color: #cfd8ea; padding: 10px 16px; font-size: 14.5px;" onclick="signOut()">Sign Out</button>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 40px 32px 72px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div class="grid-4" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-bottom: 36px;">' + kpiCards + '</div>' +
      '<div style="display: flex; gap: 26px; border-bottom: 1px solid #dbe3f0; margin-bottom: 32px; flex-wrap: wrap;">' + tabRow + '</div>' +
      tabBody +
    '</div>' +
  '</section>' +
  '</main>';
}

function svcPage(svc) {
  const related = services.filter(s => s.no !== svc.no && s.group === svc.group)
    .concat(services.filter(s => s.no !== svc.no && s.group !== svc.group)).slice(0, 3);

  const items = svc.items.map(it =>
    '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 12px; padding: 18px 20px; display: flex; align-items: center; gap: 12px;">' +
      icon("M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM8 12l3 3 5-6", 20, "#1e5fe0", "flex-shrink: 0;") +
      '<span style="font-size: 15px; font-weight: 600; color: #34415c; line-height: 1.4;">' + it + '</span>' +
    '</div>').join("");

  const relCards = related.map(r =>
    '<div class="border-hover" style="background: #fff; border: 1px solid #dbe3f0; border-radius: 12px; padding: 20px 22px; cursor: pointer;" onclick="nav(\'svc:' + r.no + '\')">' +
      '<div style="font-size: 16.5px; font-weight: 700; color: #0c1220; margin-bottom: 4px;">' + r.name + '</div>' +
      '<div style="font-size: 13.5px; color: #62708a;">' + r.meta + ' &nbsp;·&nbsp; <span style="color: #1e5fe0; font-weight: 700;">View →</span></div>' +
    '</div>').join("");

  return '<main>' +
  '<section style="border-bottom: 1px solid rgba(255,255,255,0.06); overflow: hidden;">' +
    '<div class="hero-grid-cols" style="max-width: 1280px; margin: 0 auto; padding: 56px 32px; display: grid; grid-template-columns: minmax(0,1.05fr) minmax(0,0.95fr); gap: 48px; align-items: center;">' +
      '<div style="min-width: 0;">' +
        '<div class="go-link" style="font-size: 13.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;" onclick="nav(\'services\')">Services · ' + svc.group + ' · ' + svc.no + '</div>' +
        '<h1 style="font-size: 46px; font-weight: 800; line-height: 1.06; margin: 0 0 16px;">' + svc.name + '</h1>' +
        '<p style="font-size: 19px; line-height: 1.55; color: #eef2fa; font-weight: 600; margin: 0 0 12px; max-width: 50ch; text-wrap: pretty;">' + svc.outcome + '</p>' +
        '<p style="font-size: 16.5px; line-height: 1.6; color: #aeb8cd; margin: 0 0 24px; max-width: 52ch; text-wrap: pretty;">' + svc.long + '</p>' +
        '<div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">' +
          btnPrimary("Book Free Consultation &nbsp;→", "contact") +
          '<span style="padding: 6px 14px; border-radius: 999px; font-size: 13.5px; font-weight: 700; border: 1px solid rgba(124,174,255,0.35); color: #cfd8ea;">' + svc.meta + '</span>' +
        '</div>' +
      '</div>' +
      '<div style="position: relative; min-width: 0;">' +
        heroMedia(380, slot(svc.img, svc.name, svc.imgCredit, svc.imgCreditHref, svc.imgFallback)) +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section style="background: #f2f5fa; color: #131a28; padding: 64px 32px 72px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div class="grid-portal" style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 48px; align-items: start;">' +
        '<div>' +
          '<div class="grid-cases" style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 36px;">' +
            '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 12px; padding: 22px 24px;">' +
              '<div style="font-size: 12.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #62708a; margin-bottom: 8px;">The problem</div>' +
              '<div style="font-size: 15px; line-height: 1.55; color: #34415c;">' + svc.problem + '</div>' +
            '</div>' +
            '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 12px; padding: 22px 24px;">' +
              '<div style="font-size: 12.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 8px;">Who it\'s for</div>' +
              '<div style="font-size: 15px; line-height: 1.55; color: #34415c;">' + svc.whoFor + '</div>' +
            '</div>' +
          '</div>' +
          '<h2 style="font-size: 28px; font-weight: 800; margin: 0 0 22px; color: #0c1220;">What\'s included</h2>' +
          '<div class="grid-cases" style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">' + items + '</div>' +
        '</div>' +
        '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 30px; box-shadow: 0 2px 10px rgba(19,26,40,0.05);">' +
          '<div style="font-size: 13px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #1e5fe0;">Pricing</div>' +
          '<div style="font-size: 28px; font-weight: 800; line-height: 1.15; margin: 10px 0 14px; color: #0c1220;">' + svc.meta + '</div>' +
          '<div style="font-size: 14.5px; color: #46536b; line-height: 1.55; margin-bottom: 14px;">Firm number comes with the written plan after your free systems review — no discovery call required to know if we fit your budget.</div>' +
          '<div style="font-size: 13.5px; color: #1e5fe0; font-weight: 700; line-height: 1.5; margin-bottom: 22px;">No contracts. Cancel anytime — unused prepaid service refunded pro-rata.</div>' +
          '<button class="btn btn-primary" style="width: 100%; padding: 13px; font-size: 15.5px; box-shadow: none;" onclick="nav(\'contact\')">Get a Quote</button>' +
          '<button class="btn btn-ghost-light" style="width: 100%; margin-top: 10px; padding: 13px; font-size: 15px;" onclick="nav(\'pricing\')">See All Pricing</button>' +
        '</div>' +
      '</div>' +
      '<div style="margin-top: 56px; border-top: 1px solid #dbe3f0; padding-top: 32px;">' +
        '<div style="font-size: 13px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #62708a; margin-bottom: 16px;">Related services</div>' +
        '<div class="grid-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;">' + relCards + '</div>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '</main>';
}

/* ---------- SEO metadata ---------- */
const PAGE_META = {
  home: { title: "AxisForce — Managed IT, Security & Business Automation | Houston, TX", desc: "AxisForce is a Houston-based technology partner providing managed IT, security camera systems, networking, medical billing technology, CRM & business intelligence and digital marketing for growing businesses." },
  about: { title: "About AxisForce | Houston, TX Technology Company", desc: "AxisForce is a Houston-based technology company helping businesses simplify the systems behind their operations — IT support, security, automation, software and digital growth under one technology partner." },
  services: { title: "Services | AxisForce Managed IT, Security & Automation", desc: "Explore AxisForce's technology services: managed IT support, AI & business automation, medical billing, security cameras, networking, CRM & business intelligence, custom software and digital marketing." },
  industries: { title: "Industries We Serve | AxisForce", desc: "AxisForce supports healthcare, professional services, retail & gas stations, restaurants and construction businesses with technology built for environments that can't go down." },
  pricing: { title: "Pricing | AxisForce Technology Services", desc: "Starting prices for AxisForce's managed IT, security, networking, billing and marketing services — published so you know what to expect before you call." },
  contact: { title: "Contact AxisForce | Houston, TX", desc: "Get in touch with AxisForce for a free consultation on managed IT, security, networking, billing or marketing services in the Houston area." },
  privacy: { title: "Privacy Policy | AxisForce", desc: "Read the AxisForce Privacy Policy covering how we collect, use and protect information submitted through axisforce.net." },
  terms: { title: "Terms of Service | AxisForce", desc: "Terms of Service governing use of the axisforce.net website." },
  "managed-it": { title: "Managed IT Support in Houston, TX | AxisForce", desc: "AxisForce provides managed IT support for Houston businesses — unlimited remote help, monitoring, backups and device management from one accountable technology partner." },
  "ai-automation": { title: "AI & Business Automation in Houston, TX | AxisForce", desc: "AxisForce builds custom AI agents and workflow automation for Houston businesses — reducing repetitive work, connecting systems and improving day-to-day operations." },
  "medical-billing": { title: "Medical Billing Services in Houston, TX | AxisForce", desc: "AxisForce provides end-to-end medical billing and revenue cycle management for Houston healthcare practices — 3% of collections, no long-term contract." },
  "medical-billing-software": { title: "Medical Billing Software | AxisForce", desc: "Medical billing software from AxisForce for managing patients, insurance, claims, payments, documents, A/R and billing reports from one centralized platform." },
  "security-cameras": { title: "Security Camera Systems | AxisForce", desc: "Professional security camera installation for Houston businesses — cameras, NVR/DVR systems, remote viewing and system setup, starting at $300 per site." },
  "network-wifi": { title: "Network & Wi-Fi Solutions | AxisForce", desc: "Professional business network and Wi-Fi installation, configuration and troubleshooting for Houston businesses — wired networking, equipment setup and structured cabling." },
  "websites-marketing": { title: "Websites & Digital Marketing Services | AxisForce Houston", desc: "AxisForce provides website design and digital marketing services for businesses in Houston, including local SEO, social media, digital campaigns, website support, and online presence management." },
  "custom-software": { title: "Custom Software Development | AxisForce Houston", desc: "AxisForce builds custom software, internal portals, dashboards, integrations, and business automation designed around how your business actually operates — not generic off-the-shelf tools." },
  "crm-business-intelligence": { title: "CRM & Business Intelligence | AxisForce Houston", desc: "AxisForce provides CRM implementation, customization, automation, integrations, data migration, dashboards, and reporting for Salesforce, Microsoft Dynamics 365, HubSpot, Power BI, and other business platforms." }
};

function updateMeta() {
  const key = CLEAN_PATHS[state.page] ? state.page : "home";
  const meta = PAGE_META[key] || PAGE_META.home;
  document.title = meta.title;
  let desc = document.querySelector('meta[name="description"]');
  if (!desc) { desc = document.createElement("meta"); desc.setAttribute("name", "description"); document.head.appendChild(desc); }
  desc.setAttribute("content", meta.desc);
  let canon = document.querySelector('link[rel="canonical"]');
  if (!canon) { canon = document.createElement("link"); canon.setAttribute("rel", "canonical"); document.head.appendChild(canon); }
  canon.setAttribute("href", "https://axisforce.net" + (CLEAN_PATHS[key] || "/"));
}

/* ---------- render ---------- */
function render() {
  const p = state.page;
  const svcNo = p.startsWith("svc:") ? p.slice(4) : null;
  const svc = svcNo ? services.find(s => s.no === svcNo) : null;

  let body;
  if (svc) body = svcPage(svc);
  else if (p === "managed-it") body = managedITPage();
  else if (p === "ai-automation") body = aiAutomationPage();
  else if (p === "medical-billing") body = medicalBillingPage();
  else if (p === "medical-billing-software") body = medicalBillingSoftwarePage();
  else if (p === "security-cameras") body = securityCamerasPage();
  else if (p === "network-wifi") body = networkWifiPage();
  else if (p === "websites-marketing") body = websitesMarketingPage();
  else if (p === "custom-software") body = customSoftwarePage();
  else if (p === "crm-business-intelligence") body = crmBusinessIntelligencePage();
  else if (p === "services") body = servicesPage();
  else if (p === "pricing") body = pricingPage();
  else if (p === "industries") body = industriesPage();
  else if (p === "about") body = aboutPage();
  else if (p === "contact") body = contactPage();
  else if (p === "privacy") body = privacyPage();
  else if (p === "terms") body = termsPage();
  else if (p === "portal") body = state.signedIn ? portalAppPage() : portalLoginPage();
  else { state.page = "home"; body = homePage(); }

  const showCta = state.page !== "portal" && state.page !== "contact" && state.page !== "privacy" && state.page !== "terms" && state.page !== "medical-billing-software" && state.page !== "security-cameras" && state.page !== "network-wifi" && state.page !== "websites-marketing" && state.page !== "custom-software" && state.page !== "crm-business-intelligence";
  document.getElementById("app").innerHTML =
    '<div style="min-height: 100vh; background: #060a14; color: #eef2fa;">' +
    header() + body + (showCta ? ctaSection() : "") + footer() +
    "</div>";
  updateMeta();
}

state.page = pageFromLocation();
render();
