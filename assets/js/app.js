"use strict";

/* ---------- config (design props) ---------- */
const PHONE = "(346) 218-1253";
const HERO_VARIANT = "itdept";       // itdept | running | buildsecure | protected
const SHOW_PARTNERS = true;

/* ---------- state + router ---------- */
const state = { page: "home", signedIn: false, tab: "billing" };

const CLEAN_PATHS = { home: "/", about: "/about/", services: "/services/", industries: "/industries/", pricing: "/pricing/", contact: "/contact/", privacy: "/privacy.html", terms: "/terms.html" };
const PATH_TO_PAGE = { "": "home", "/about": "about", "/services": "services", "/industries": "industries", "/pricing": "pricing", "/contact": "contact", "/privacy.html": "privacy", "/terms.html": "terms" };

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
function contactSubmit(e) {
  e.preventDefault();
  const note = document.getElementById("cf-thanks");
  if (note) note.style.display = "block";
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
  code: "M8 6L2 12l6 6M16 6l6 6-6 6M14 4l-4 16"
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
  { no: "01", name: "Managed IT Support", meta: "Starting at $399 / month", group: "Technology Operations",
    problem: "Downtime, security gaps and “the computer guy is unreachable” cost real money.",
    long: "We become your IT department: unlimited remote support, monitoring, patching, backups, Microsoft 365, networking and device management — with every vendor coordinated for you.",
    outcome: "Reduce downtime, secure your systems, and give your employees technology that just works.",
    whoFor: "Businesses of 5–50 staff that need accountable IT without hiring internally.",
    items: ["Unlimited remote support", "Monitoring & patching", "Backups & recovery", "Microsoft 365 management", "Networking & device management", "Vendor coordination"] },
  { no: "02", name: "AI & Business Automation", meta: "Request a Quote", group: "Automation & Software",
    problem: "Your team spends hours every week on intake, follow-up and reporting a machine could do.",
    long: "Custom AI agents, voice AI, workflow automation, document processing, CRM automation and reporting dashboards — scoped small, proven on one process, then extended.",
    outcome: "Hours of repetitive admin removed weekly, with a human in the loop where judgment matters.",
    whoFor: "Operators drowning in repetitive processes: intake, scheduling, documents, reporting.",
    items: ["Custom AI agents", "Voice AI", "Workflow automation", "Document processing", "CRM automation", "Reporting dashboards & portals"] },
  { no: "03", name: "Medical Billing Services", meta: "3% of collections", group: "Medical Revenue",
    problem: "Claims sit unworked, denials pile up, and nobody can tell you what's stuck where.",
    long: "Full revenue cycle management: eligibility verification, charge entry, claim submission, payment posting, denial management, A/R follow-up and reporting.",
    outcome: "Cleaner claims, faster payment, and visibility into every dollar in flight.",
    whoFor: "Independent practices that want billing handled — not just software.",
    items: ["Eligibility verification", "Charge entry & claim submission", "Payment posting", "Denial management", "A/R follow-up", "Monthly reporting"] },
  { no: "04", name: "Medical Billing Software", meta: "Starting at $250 / month", group: "Automation & Software",
    problem: "Legacy billing systems are slow, overpriced and built for hospital groups — not independent practices.",
    long: "A cloud-hosted platform: patient management, insurance, claims, documents, reporting and role-based access — on an AI-ready, HIPAA-ready architecture.",
    outcome: "One modern system your front desk and biller actually like using.",
    whoFor: "Independent medical practices running their own billing.",
    items: ["Patient management", "Insurance & claims", "Document management", "Reporting", "Role-based access", "HIPAA-ready architecture"] },
  { no: "05", name: "Security Camera Systems", meta: "Starting at $300", group: "Security",
    problem: "When something happens, the first question is always: did the cameras catch it?",
    long: "Commercial-grade design and installation: NVR configuration, network integration, remote viewing and ongoing maintenance — placed to answer the questions you'll actually ask.",
    outcome: "Reviewable footage of the moments that matter, from your phone.",
    whoFor: "Storefronts, practices, stations and offices that need reliable recording.",
    items: ["Professional installation", "Commercial-grade systems", "NVR configuration", "Network integration", "Remote viewing", "Maintenance"] },
  { no: "06", name: "Network & Wi-Fi Solutions", meta: "Custom quote per site", group: "Technology Operations",
    problem: "Dead zones, dropped payments, and one consumer router doing a building's worth of work.",
    long: "Structured cabling, firewalls, segmented Wi-Fi and failover internet — designed for the building you actually have, and documented so you own it.",
    outcome: "Fast, secure connectivity that survives rush hour and audits alike.",
    whoFor: "Any site where the network carries payments, phones or patient data.",
    items: ["Site survey & design", "Structured cabling", "Firewall & VLAN segmentation", "Guest / staff separation", "Failover internet", "As-built documentation"] },
  { no: "07", name: "Websites & SEO", meta: "Starting at $800 / month", group: "Growth",
    problem: "A 9pm Google search should end with your phone ringing — not a competitor's.",
    long: "Professional website, local SEO, Google Business Profile, analytics, lead generation, maintenance and hosting — measured against booked work, not clicks.",
    outcome: "More calls from people already looking for exactly what you sell.",
    whoFor: "Local businesses that win by being found first.",
    items: ["Professional website", "Local SEO", "Google Business Profile", "Analytics & lead tracking", "Maintenance & hosting", "Monthly reporting"] },
  { no: "08", name: "Custom Software & Portals", meta: "Request a Quote", group: "Automation & Software",
    problem: "Off-the-shelf tools almost fit — so your team lives in spreadsheets and workarounds.",
    long: "Custom internal portals, dashboards and integrations built around your actual process — like our fuel reconciliation and medical billing platforms.",
    outcome: "Software shaped to your operation, owned by you.",
    whoFor: "Businesses with a process worth automating properly.",
    items: ["Internal portals", "Dashboards & reporting", "System integrations", "Process automation", "Cloud hosting", "Ongoing support"] },
  { no: "09", name: "CRM & Business Intelligence", meta: "Request a Quote", group: "Automation & Software",
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
  { k: "Founded", v: "2024" },
  { k: "Based", v: "Houston, TX — serving Greater Houston" },
  { k: "Active clients", v: "Confirm number" },
  { k: "Primary vertical", v: "Independent medical practices" },
  { k: "Certifications", v: "List credentials here" },
  { k: "Insurance", v: "General liability + E&O" },
  { k: "Response target", v: "Same business day, 1 hr for down" }
];

const principles = [
  { name: "Documented, not improvised", body: "Every network we touch gets an as-built diagram and a credential record you own. If you fire us, you keep everything." },
  { name: "Fix the risk first", body: "Backups, patching and access control before anything shiny. We will tell you when a project should wait." },
  { name: "One throat to choke", body: "We coordinate with your EHR, ISP, and equipment vendors so you are not the one relaying messages." }
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
    { label: "Managed IT Support", go: "svc:01" }, { label: "AI & Business Automation", go: "svc:02" },
    { label: "Medical Billing Services", go: "svc:03" }, { label: "Medical Billing Software", go: "svc:04" },
    { label: "Security Cameras", go: "svc:05" }, { label: "Network & Wi-Fi", go: "svc:06" },
    { label: "Websites & Marketing", go: "svc:07" }, { label: "CRM & Business Intelligence", go: "svc:09" },
    { label: "Custom Software", go: "svc:08" } ] },
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
      '<button class="btn btn-primary" style="padding: 12px 18px; font-size: 15px;" onclick="nav(\'contact\')">Free Consultation</button>' +
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
        '<button class="hdr-cta btn btn-primary" style="padding: 11px 20px; font-size: 15px; white-space: nowrap; box-shadow: 0 4px 18px rgba(47,123,255,0.35);" onclick="nav(\'contact\')">Free Consultation</button>' +
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
    '<div class="grid-4" style="max-width: 1280px; margin: 0 auto; padding: 52px 32px 32px; display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 32px;">' +
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
      '<div style="max-width: 1280px; margin: 0 auto; padding: 22px 32px; display: flex; align-items: center; gap: 28px; flex-wrap: wrap;">' +
      '<span style="font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #4d8dff; white-space: nowrap;">Technologies We Work With</span>' +
      '<div style="display: flex; flex-wrap: wrap; gap: 24px; flex: 1; justify-content: flex-end;">' +
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
    '<div class="svc-row" style="display: grid; grid-template-columns: 72px 1fr 1.1fr; gap: 48px; padding: 44px 0; border-bottom: 1px solid #dbe3f0; align-items: start;">' +
      '<div style="font-size: 32px; font-weight: 800; color: #9db4dd; line-height: 1;">' + s.no + '</div>' +
      '<div>' +
        '<h2 class="svc-title" style="font-size: 28px; font-weight: 800; margin: 0 0 10px; line-height: 1.1; color: #0c1220;" onclick="nav(\'svc:' + s.no + '\')">' + s.name + '</h2>' +
        '<p style="font-size: 15.5px; line-height: 1.6; color: #46536b; margin: 0 0 14px;">' + s.long + '</p>' +
        '<div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">' +
          '<span style="padding: 5px 12px; border-radius: 999px; font-size: 13px; font-weight: 700; background: #e8edf6; color: #34415c;">' + s.meta + '</span>' +
          '<span class="go-link" style="font-size: 14px; font-weight: 700; color: #1e5fe0;" onclick="nav(\'svc:' + s.no + '\')">View service page →</span>' +
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
    "Your entire technology department. Nine service lines.",
    "Every service explains the problem it solves, what you get, and an honest starting price. Most clients start with one line and add others as the relationship proves out — no long-term contracts, ever.",
    heroMedia(320, slot("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80", "Hands-on engineering work", "Photo by ThisisEngineering on Unsplash", "https://unsplash.com/@thisisengineering", ""))) +
  '<section style="background: #f2f5fa; color: #131a28; padding: 40px 32px 72px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' + rows +
      '<div style="padding-top: 32px; display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap;">' +
        '<div style="font-size: 16.5px; color: #46536b; max-width: 52ch;">Every line above has a published starting range. No discovery call required to find out whether we are in your budget.</div>' +
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
    "A Houston shop that answers the phone.",
    "AxisForce builds and runs the technology a small operation depends on — the network, the endpoints, the cameras, the compliance paperwork, and the systems that get you paid.",
    heroMedia(300, slot("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80", "The team at work", "Photo by Amy Hirschi on Unsplash", "https://unsplash.com/@amyhirschi", ""))) +
  '<section style="background: #f2f5fa; color: #131a28; padding: 56px 32px 72px;">' +
    '<div style="max-width: 1280px; margin: 0 auto;">' +
      '<div class="grid-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 56px; margin-bottom: 56px;">' +
        '<div>' +
          '<p style="font-size: 17px; line-height: 1.65; color: #34415c; margin: 0 0 18px;">We work with a deliberately small book of clients so the person who scoped your project is the person who picks up. Today that means medical practices, with restaurants, law firms, retail and fuel stations coming online.</p>' +
          '<p style="font-size: 17px; line-height: 1.65; color: #34415c; margin: 0 0 28px;">Both are businesses where an hour of downtime is measured in real dollars.</p>' +
          '<div style="border: 1px solid #dbe3f0; border-radius: 12px; overflow: hidden; height: 280px; position: relative; background: #fff;">' +
            slot("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80", "The AxisForce team", "Photo by Marvin Meyer on Unsplash", "https://unsplash.com/@marvelous", "") +
          '</div>' +
        '</div>' +
        '<div style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 32px; align-self: start; box-shadow: 0 2px 10px rgba(19,26,40,0.05);">' +
          '<div style="font-size: 13.5px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #1e5fe0; margin-bottom: 20px;">Facts sheet</div>' +
          factRows +
          '<div style="font-size: 13px; color: #62708a; margin-top: 14px; line-height: 1.45;">Confirm every line before launch — this block is where prospects check whether you are real.</div>' +
        '</div>' +
      '</div>' +
      '<h2 style="font-size: 32px; font-weight: 800; margin: 0 0 28px; color: #0c1220;">How we work</h2>' +
      '<div class="grid-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px;">' + prCards + '</div>' +
    '</div>' +
  '</section>' +
  '</main>';
}

function contactPage() {
  const rows = contactRows.map(c =>
    '<div style="display: grid; grid-template-columns: 130px 1fr; gap: 24px; padding: 16px 0; border-bottom: 1px solid #dbe3f0;">' +
      '<span style="font-size: 12.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #62708a; padding-top: 2px;">' + c.k + '</span>' +
      '<span style="font-size: 16px; color: #0c1220;">' + c.v + '</span>' +
    '</div>').join("");

  return '<main>' +
  pageHero("Contact",
    "Tell us what is breaking.",
    "Thirty-minute call, no pitch deck. We will tell you what we would do first and roughly what it costs — even if that is nothing.",
    heroMedia(300, slot("https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80", "On a call with a client", "Photo by Cytonn Photography on Unsplash", "https://unsplash.com/@cytonn_photography", ""))) +
  '<section style="background: #f2f5fa; color: #131a28; padding: 56px 32px 72px;">' +
    '<div class="grid-2" style="max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1.1fr; gap: 56px; align-items: start;">' +
      '<div>' + rows +
        '<div class="grid-cases" style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 28px;">' +
          '<div style="border: 1.5px dashed #c7d2e4; border-radius: 12px; padding: 28px 22px; text-align: center; background: #fff;">' +
            icon(I.pin, 30, "#62708a", "margin-bottom: 8px;") +
            '<div style="font-size: 14.5px; font-weight: 700; color: #34415c;">Google Map</div>' +
            '<div style="font-size: 13px; color: #62708a; margin-top: 4px;">Embed goes here once the office address is public.</div>' +
          '</div>' +
          '<div style="border: 1.5px dashed #c7d2e4; border-radius: 12px; padding: 28px 22px; text-align: center; background: #fff;">' +
            icon("M8 2v4M16 2v4M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", 30, "#62708a", "margin-bottom: 8px;") +
            '<div style="font-size: 14.5px; font-weight: 700; color: #34415c;">Book Directly</div>' +
            '<div style="font-size: 13px; color: #62708a; margin-top: 4px;">Calendly embed goes here — send your booking link.</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<form style="background: #fff; border: 1px solid #dbe3f0; border-radius: 14px; padding: 36px; box-shadow: 0 2px 10px rgba(19,26,40,0.05); display: grid; gap: 18px;" onsubmit="return contactSubmit(event)">' +
        '<div class="field"><label for="cf-name">Name</label><input id="cf-name" placeholder="Jane Okoye"></div>' +
        '<div class="field"><label for="cf-org">Practice or business</label><input id="cf-org" placeholder="Bayou City Family Medicine"></div>' +
        '<div class="grid-cases" style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px;">' +
          '<div class="field"><label for="cf-email">Email</label><input id="cf-email" type="email" placeholder="you@business.com"></div>' +
          '<div class="field"><label for="cf-phone">Phone</label><input id="cf-phone" placeholder="(346) 000-0000"></div>' +
        '</div>' +
        '<div class="field"><label for="cf-need">What do you need?</label>' +
          '<select id="cf-need">' +
            '<option>Managed IT &amp; helpdesk</option><option>Security cameras &amp; access control</option>' +
            '<option>Network or WiFi buildout</option><option>Medical billing &amp; billing systems</option>' +
            '<option>Website, SEO or ads</option><option>AI automation</option><option>Not sure yet</option>' +
          '</select>' +
        '</div>' +
        '<div class="field"><label for="cf-msg">Details</label><textarea id="cf-msg" rows="4" placeholder="Four providers, two locations, Athena EHR, current IT guy is unreachable."></textarea></div>' +
        '<button type="submit" class="btn btn-primary" style="padding: 14px; font-size: 16px; box-shadow: none;">Request the Call</button>' +
        '<div id="cf-thanks" style="display: none; font-size: 14.5px; font-weight: 700; color: #1e5fe0;">Thanks — we reply within one business day.</div>' +
        '<div style="font-size: 13px; color: #62708a; line-height: 1.45;">We reply within one business day. Nothing sent here is treated as PHI — please do not include patient information.</div>' +
      '</form>' +
    '</div>' +
  '</section>' +
  '</main>';
}

function legalHero(title) {
  return '' +
  '<section style="border-bottom: 1px solid rgba(255,255,255,0.06); padding: 56px 32px 40px;">' +
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
  '<main class="grid-2" style="max-width: 1280px; margin: 0 auto; padding: 96px 32px; display: grid; grid-template-columns: 1fr 420px; gap: 72px; align-items: center; min-height: 62vh;">' +
    '<div>' +
      '<div style="font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4d8dff; margin-bottom: 12px;">Client Portal</div>' +
      '<h1 style="font-size: 52px; font-weight: 800; line-height: 1; margin: 0 0 18px;">Sign in.</h1>' +
      '<p style="font-size: 18px; line-height: 1.6; color: #aeb8cd; max-width: 44ch; margin: 0 0 28px;">Invoices, claim status, remittances and open tickets — one place, updated nightly from Availity and our ticketing system.</p>' +
      '<div style="display: flex; flex-wrap: wrap; gap: 8px;">' +
        portalBadges.map(b => '<span style="padding: 5px 13px; border-radius: 999px; font-size: 13px; font-weight: 700; border: 1px solid rgba(124,174,255,0.35); color: #cfd8ea;">' + b + "</span>").join("") +
      '</div>' +
    '</div>' +
    '<div style="background: rgba(10,16,30,0.85); border: 1px solid rgba(124,174,255,0.25); border-radius: 14px; padding: 34px; display: grid; gap: 18px; box-shadow: 0 20px 60px rgba(0,0,0,0.4);">' +
      '<div class="field field-dark"><label for="pf-email">Work email</label><input id="pf-email" placeholder="you@business.com"></div>' +
      '<div class="field field-dark"><label for="pf-pw">Password</label><input id="pf-pw" type="password" placeholder="••••••••••"></div>' +
      '<button class="btn btn-primary" style="padding: 14px; font-size: 16px;" onclick="signIn()">Sign In</button>' +
      '<div style="display: flex; justify-content: space-between; font-size: 14px; color: #8b95ab;">' +
        '<span style="cursor: pointer;">Forgot password</span><span style="cursor: pointer;">Request access</span>' +
      '</div>' +
      '<div style="font-size: 13px; color: #8b95ab; border-top: 1px dashed rgba(124,174,255,0.25); padding-top: 14px; line-height: 1.45;">Prototype — press Sign In to view the demo account (Bayou City Family Medicine).</div>' +
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
  home: { title: "AxisForce — Managed IT, Security & Business Automation | Houston, TX", desc: "AxisForce is a Houston-based technology partner providing managed IT, security camera systems, networking, medical billing technology, Salesforce solutions and digital marketing for growing businesses." },
  about: { title: "About AxisForce | Houston, TX Technology Partner", desc: "Learn how AxisForce partners with Houston businesses to manage IT, security, networking, billing systems and growth — without the overhead of an internal team." },
  services: { title: "Services | AxisForce Managed IT, Security & Automation", desc: "Explore AxisForce's technology services: managed IT support, AI & business automation, medical billing, security cameras, networking, Salesforce solutions, custom software and digital marketing." },
  industries: { title: "Industries We Serve | AxisForce", desc: "AxisForce supports healthcare, professional services, retail & gas stations, restaurants and construction businesses with technology built for environments that can't go down." },
  pricing: { title: "Pricing | AxisForce Technology Services", desc: "Starting prices for AxisForce's managed IT, security, networking, billing and marketing services — published so you know what to expect before you call." },
  contact: { title: "Contact AxisForce | Houston, TX", desc: "Get in touch with AxisForce for a free consultation on managed IT, security, networking, billing or marketing services in the Houston area." },
  privacy: { title: "Privacy Policy | AxisForce", desc: "Read the AxisForce Privacy Policy covering how we collect, use and protect information submitted through axisforce.net." },
  terms: { title: "Terms of Service | AxisForce", desc: "Terms of Service governing use of the axisforce.net website." }
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
  else if (p === "services") body = servicesPage();
  else if (p === "pricing") body = pricingPage();
  else if (p === "industries") body = industriesPage();
  else if (p === "about") body = aboutPage();
  else if (p === "contact") body = contactPage();
  else if (p === "privacy") body = privacyPage();
  else if (p === "terms") body = termsPage();
  else if (p === "portal") body = state.signedIn ? portalAppPage() : portalLoginPage();
  else { state.page = "home"; body = homePage(); }

  const showCta = state.page !== "portal" && state.page !== "contact" && state.page !== "privacy" && state.page !== "terms";
  document.getElementById("app").innerHTML =
    '<div style="min-height: 100vh; background: #060a14; color: #eef2fa;">' +
    header() + body + (showCta ? ctaSection() : "") + footer() +
    "</div>";
  updateMeta();
}

state.page = pageFromLocation();
render();
