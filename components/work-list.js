import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

// Renders every project as one list. Light DOM on purpose: shadow roots hid this
// markup from the accessibility tree and from every static scan of the page.
export class WorkList extends LitElement {
  createRenderRoot() { return this; }

  connectedCallback() {
    // The production build includes these cards for crawlers and no-JS users.
    // Lit owns the host after upgrade, so discard that copy before first render.
    if (this.hasAttribute('data-prerendered')) {
      this.replaceChildren();
      this.removeAttribute('data-prerendered');
    }
    super.connectedCallback();
  }

  // Card facts shown at rest. Titles key into `items` below, which keeps the
  // gallery slides and their captions.
  static meta = {
    '2K Build Lab': {
      no: '01', status: 'live', statusLabel: 'Shipped',
      role: 'Solo — design, engineering, business',
      summary: 'A build optimizer for NBA 2K. Name the ratings you care about and it searches the legal build space for the cheapest configuration that hits all of them. The cost of a correct answer was rebuilding the game’s own rating engine from its binary tuning file: cap-breaker price depends on the entire attribute vector through a 15-row archetype classifier, so there is no price list to look up and no shortcut around searching. What it still gets wrong — an early readiness heuristic hard-blocked configurations that were genuinely buildable, and that class of over-blocking is documented in the codebase rather than closed. Runs as a business with paying customers.',
    },
    'Destination Home': {
      no: '02', status: 'client', statusLabel: 'Client MVP',
      role: 'Solo — product, engineering, consulting',
      summary: 'A chat-first relocation assistant for corporate transferees, built for Sterling Lexicon. The original brief centered on OpenAI with web search. I proposed extending that approach with structured data sources for local amenities, rents and other facts that shape a relocation decision, then implemented those additions. Intake happens as a conversation, program questions get answered only where a cited passage supports them, and neighborhoods are ranked by deterministic code over sourced measurements rather than by the model, which is what makes the ranking auditable under fair-housing scrutiny. The hard part was not the chat. It was deciding what the system is allowed to claim: absent data stays null with a coverage figure instead of becoming a neutral score, and a factor that cannot be measured well enough simply does not publish. Where it stands: a pre-production MVP. It works end to end, but hosting, identity and the profile integration were blocked on client dependencies, and the program corpus it answers from is placeholder content.',
    },
    'Casa Agent': {
      no: '03', status: 'internal', statusLabel: 'Prototype',
      role: 'Product and engineering',
      summary: 'An assistant for the recurring questions between property managers and their contractors. Retrieves procedures within each contact’s role and property scope, keeps the manager’s instructions above reviewed additions, and requires approval before an answer becomes reusable knowledge. The difficult part is the lifecycle: an obsolete instruction must stop reaching future replies, and a one-time approval must not become standing permission. The six-change review preserved 66/66 passing scenarios against the earlier decision code, with higher token use. Production WhatsApp delivery and a supervised customer pilot remain unfinished.',
    },
    'VacationHolm': {
      no: '04', status: 'internal', statusLabel: 'Shipped · On hold',
      role: 'Product and engineering',
      summary: 'A direct-booking marketplace for holiday rentals in the Azores and Madeira. My partner brought the regional business premise; I defined most of the product and implemented it end to end. Guests can search, price a stay and inquire without the platform taking payment; hosts manage listings, calendars, conversations and reported outcomes. The hard part was making those workflows agree: one server quote follows the stay into the inquiry, imported calendar blocks keep their source, reply drafts use only current approved knowledge, and Insights state their denominators and missing data. The product shipped and is now on hold while my partner pursues Portuguese government funding. The September enhancements were verified locally; their deployment has not been verified in this review.',
    },
    'StellarGPT': {
      no: '05', status: 'internal', statusLabel: 'Adopted by Stellar',
      role: 'Application extension and integration',
      summary: 'Extended Microsoft’s Azure OpenAI sample into StellarGPT, a BIM documentation assistant built for and adopted by Stellar. Added reasoning-model support through the Responses API, selectable deployments, assistant presets with typed tool configuration, and model and assistant metadata in conversation history. The integration keeps two different API response formats readable in the existing chat interface. Microsoft supplied the application foundation; my work connects the new model and assistant flows across Python, React and Cosmos DB. The reviewed source still needs request isolation and focused regression tests. Screenshots use fictional records and scripted answers; retrieval accuracy and time savings have not been established.',
    },
    'beeline.com': {
      no: '06', status: 'live', statusLabel: 'Shipped',
      role: 'Lead Vue.js developer',
      summary: 'Rebuilt Beeline’s corporate site from WordPress into a Vue application — my first large Vue project — converting the existing templates and writing new ones against Salesforce and Pardot. Delivered in about a year against a projected year and a half to two. The cost sat in integration and coordination rather than in the frontend: two marketing systems, a design lead, and a stakeholder list that all had to agree. Worth being straight about it — nothing here is algorithmically hard. The result is the schedule and the integrations, not the engineering.',
    },
    'Beeline - Business Case Tool': {
      no: '07', status: 'internal', statusLabel: 'Adopted by Beeline',
      role: 'Lead Nuxt.js developer',
      summary: 'Adopted internally by Beeline. A client acquisition tool migrated off a legacy PHP site onto Nuxt and Cosmos DB, my first Nuxt project. Prospects configure who owns each step of their process, and the tool models the time and cost that moves. What it produces is a model, not a measurement: the output is only ever as good as the ownership and the rates a prospect types in, and it was never instrumented against what those clients went on to actually spend.',
    },
    'Chatbot Decision Tree': {
      no: '08', status: 'internal', statusLabel: 'Adopted by Beeline',
      role: 'Original concept and end-to-end implementation',
      summary: 'I originated the idea and built the tool end to end at Beeline, where it was adopted internally. An assistant whose conversation paths are authored as an explicit decision tree rather than left to the model, with Application Insights wired in so the paths people actually take are measurable. The cost is the authoring: every branch started as a row in a spreadsheet of if-then conditions and had to be drawn, first in Figma and then in a journey editor, before it could answer anything. That is also the limit — it is reliable exactly as far as somebody authored it, and a question the tree does not cover gets routed to the closest branch that exists.',
    },
    'OpenAI Feedback Classifier': {
      no: '09', status: 'internal', statusLabel: 'Adopted by Beeline',
      role: 'Original concept and end-to-end implementation',
      summary: 'I originated the idea and built it end to end. It became Beeline’s first adopted AI project. Triages incoming product feedback so nobody has to read all of it — built to find out why users of one product kept reverting to its legacy version, across more than 50,000 entries. Scores an F1 of 0.98. The cost was in the labelled data and the prompt, iterated with a data analyst, not in the model. The number needs its caveat: it is one labelled set for one product’s feedback, and the per-class counts behind it are thin — some classes are scored on around a dozen test labels, which is not enough to trust a per-class figure.',
    },
    'Brood': {
      no: '10', status: 'internal', statusLabel: 'Adopted by Beeline',
      role: 'Original concept and end-to-end implementation',
      summary: 'I originated the idea and built the tool end to end at Beeline, where it was adopted internally. An internal platform for sourcing and voting on hackathon ideas ahead of the event, built in free time, with single sign-on through Azure AD so participation cost nobody an account and posting could stay anonymous. The cost was scope discipline: it is a submit-and-upvote list on purpose, and it does nothing to help run the event once it starts. The lift in ideas is what organisers observed rather than something the platform measured — no instrumentation was ever added to prove it.',
    },
    'Vue Devtools Auditor': {
      no: '11', status: 'internal', statusLabel: 'Internal',
      role: 'Original concept and end-to-end implementation',
      summary: 'I originated the idea and built the tool end to end at Beeline. An accessibility auditor that reports violations at the component level instead of the page, so a finding names the component that owns it rather than a line of rendered output. It also audits colour against the design system, suggesting the nearest token by smallest delta, and keeps results in Cosmos DB so compliance can be tracked over time. Component-level attribution cost a walk of Vue’s component tree rather than the rendered DOM. Its ceiling is every automated auditor’s ceiling: it catches what is mechanically decidable and cannot make the judgement calls — whether alt text is actually useful, whether an order is actually logical.',
    },
  };

  static items = [
    {
      title: 'StellarGPT',
      caseStudy: '/portfolio/azure-openai-assistant/',
      categories: ['Python', 'Quart', 'React', 'TypeScript', 'Azure OpenAI', 'Cosmos DB'],
      img: '/images/azure-openai-assistant.png',
      slides: [
        { src: '/images/azure-openai-assistant/model-selection.png', thumb: '/images/azure-openai-assistant/model-selection.png', description: '<b>Choosing a deployment</b>: The added picker exposes GPT-4o and o4-mini in the existing chat interface. Real UI with fictional local configuration. The menu descriptions are product copy, not performance measurements.' },
        { src: '/images/azure-openai-assistant/assistant-preset.png', thumb: '/images/azure-openai-assistant/assistant-preset.png', description: '<b>A task-specific preset</b>: Selecting BIM SOPs changes the heading, description and displayed model. The fixture server acknowledges selection without running the production backend or a model.' },
        { src: '/images/azure-openai-assistant/document-question.png', thumb: '/images/azure-openai-assistant/document-question.png', description: '<b>A document question in context</b>: The real chat renders a scripted handoff checklist from fictional history. The page reference is illustrative, not a validated citation or live retrieval result. Model and assistant labels preserve context in the interface.' },
      ],
    },
    {
      title: 'Casa Agent',
      caseStudy: '/portfolio/casa-agent/',
      categories: ['Python', 'Next.js', 'React', 'TypeScript', 'Supabase', 'pgvector', 'OpenAI', 'RAG evaluation'],
      img: '/images/casa-agent.png',
      slides: [
        {"src": "/images/casa-agent/sop-library.png", "thumb": "/images/casa-agent/sop-library.png", "description": "<b>Scoped procedures</b>: The real instruction editor keeps role and property scope beside the procedure. Fictional demo records; no customer data."},
        {"src": "/images/casa-agent/contacts.png", "thumb": "/images/casa-agent/contacts.png", "description": "<b>Contact policy</b>: A fictional caretaker has a spending threshold, Portuguese language preference and reply mode. These are contact settings, not evidence of live delivery."},
        {"src": "/images/casa-agent/proposal-review.png", "thumb": "/images/casa-agent/proposal-review.png", "description": "<b>Review before reuse</b>: A proposed linen check appears beside its original evidence and rationale. The fictional example preserves purchase approval as a separate decision."},
        {"src": "/images/casa-agent/attention.png", "thumb": "/images/casa-agent/attention.png", "description": "<b>Waiting work</b>: A fictional purchase request needs the manager. Property chips show the contact’s assigned scope; they do not prove the escalation’s target property."},
        {"src": "/images/casa-agent/property-scope.png", "thumb": "/images/casa-agent/property-scope.png", "description": "<b>Who works where</b>: Property detail connects assigned workers to the instruction sheets that apply. Fictional names and procedures throughout."},
      ],
    },
    {
      title: 'VacationHolm',
      caseStudy: '/portfolio/vacationholm/',
      categories: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'iCal', 'OpenAI'],
      img: '/images/vacationholm.png',
      slides: [
        {"src": "/images/vacationholm/guest-search.png", "thumb": "/images/vacationholm/guest-search.png", "description": "<b>Guest search</b>: The real search page with fictional stays, selected dates and stay pricing. Illustrative property data; this is not live inventory."},
        {"src": "/images/vacationholm/guest-inquiry.png", "thumb": "/images/vacationholm/guest-inquiry.png", "description": "<b>From stay to inquiry</b>: The guest reviews dates, party details and the stay quote before contacting the host. Fictional listing and inquiry; no request was sent."},
        {"src": "/images/vacationholm/host-dashboard.png", "thumb": "/images/vacationholm/host-dashboard.png", "description": "<b>The host workspace</b>: Owned listings and waiting work in the real host dashboard, populated with fictional records. Calendar and conversation actions remain under host control."},
        {"src": "/images/vacationholm/reply-drafting.png", "thumb": "/images/vacationholm/reply-drafting.png", "description": "<b>Reviewing a response draft</b>: The real conversation view presents a proposed response and its supporting evidence for the host to review. The draft is a fixture, not a model evaluation or a sent message."},
        {"src": "/images/vacationholm/insights-overview.png", "thumb": "/images/vacationholm/insights-overview.png", "description": "<b>The Insights dashboard</b>: The real portfolio overview, with fictional activity. It connects reporting to host decisions; the figures do not represent customer performance."},
        {
          src: '/images/vacationholm/questions.png',
          thumb: '/images/vacationholm/questions.png',
          description: '<b>Recurring questions</b>: The host sees signals for unanswered messages, no-match drafts, dismissed suggestions and substantial edits, plus a fictional example that can be saved for review. The records exercise the real component; they are not customer results.'
        },
        {
          src: '/images/vacationholm/funnel.png',
          thumb: '/images/vacationholm/funnel.png',
          description: '<b>One ordered journey</b>: Search impression, listing visit, quote view, inquiry start, server-confirmed inquiry and host-reported booking are counted in sequence. Every percentage names the immediately preceding step as its denominator.'
        },
        {
          src: '/images/vacationholm/changes.png',
          thumb: '/images/vacationholm/changes.png',
          description: '<b>Measure a completed change</b>: Equal before-and-after windows put a photo addition beside observed funnel and question metrics. The interface says what the comparison cannot prove: timing beside a change is not causal evidence.'
        },
      ],
    },
    {
      title: '2K Build Lab',
      url: '2kbuildlab.com',
      caseStudy: '/portfolio/2k-build-lab',
      categories: ['React', 'Rust', 'WebAssembly', 'Node', 'Google Cloud Run', 'Supabase', 'Stripe', 'Reverse Engineering', 'Combinatorial Search'],
      img: '/images/2kbuildlab.png',
      slides: [
        {
          src: "/images/2kbuildlab/landing.png",
          thumb: "/images/2kbuildlab/landing.png",
          description: `<b>Landing</b>: A build optimizer for NBA 2K. You name the ratings you care about, and it searches the legal build space for the cheapest configuration that hits all of them. The hero card shows the shape of a real answer: body geometry, target ratings, and the cap breakers needed to reach them.`
        },
        {
          src: "/images/2kbuildlab/builder.png",
          thumb: "/images/2kbuildlab/builder.png",
          description: `<b>The builder</b>: Twenty-one attributes across six categories, each showing a live ceiling. Anything left at its baseline of 25 counts as unset, so the optimizer can spend those points wherever they buy the most.`
        },
        {
          src: "/images/2kbuildlab/targets.png",
          thumb: "/images/2kbuildlab/targets.png",
          description: `<b>Declaring targets</b>: Every slider release re-runs a constraint-closure pass in a Web Worker, inside a three-second budget on weak hardware. It recalculates each attribute's reachable ceiling from every other target already set, which is why the ceilings move while you type.`
        },
        {
          src: "/images/2kbuildlab/cap-breakers.png",
          thumb: "/images/2kbuildlab/cap-breakers.png",
          description: `<b>Cap breakers</b>: Cap breakers apply after the natural attribute budget is spent, so they change which builds are reachable, not merely what they cost. Declaring how many you hold reshapes the search rather than adjusting a number at the end.`
        },
        {
          src: "/images/2kbuildlab/conflicts.png",
          thumb: "/images/2kbuildlab/conflicts.png",
          description: `<b>Conflict detection</b>: 95 three-point and 95 driving dunk do not fit on one legal body. The app catches that in the browser before a credit is spent, and it names both ways out plus what each costs you elsewhere. The build title comes from a forward engine rebuilt out of the game's own bitmask-to-string-table lookup.`
        },
        {
          src: "/images/2kbuildlab/readiness.png",
          thumb: "/images/2kbuildlab/readiness.png",
          description: `<b>Build readiness</b>: A five-state recommendation machine drives the copy, icon and colour from one shared map, so desktop and mobile cannot drift apart. It advises and never blocks. A heuristic that hard-blocked genuinely buildable configurations is a documented regression class in this codebase.`
        },
        {
          src: "/images/2kbuildlab/result.png",
          thumb: "/images/2kbuildlab/result.png",
          description: `<b>The result</b>: Every attribute the search committed to, the body that makes it legal, and the exact cap-breaker plan. Read the plan closely: five cap breakers buy +5 three-point, while one buys +5 driving dunk. That non-linearity is the whole problem. Cap-breaker cost depends on the entire attribute vector through a 15-row archetype classifier, so there is no price list to look up and no shortcut around searching.`
        },
        {
          src: "/images/2kbuildlab/measurements.png",
          thumb: "/images/2kbuildlab/measurements.png",
          description: `<b>Measured performance work</b>: Roughly 70 percent off solve latency across eight independently A/B tested changes, plus the infrastructure and payload work. Speed that changes the answer is not speed, so every one of these had to return the identical winning build before it counted, and each ships behind an environment-variable kill switch.`
        },
        {
          src: "/images/2kbuildlab/badges.png",
          thumb: "/images/2kbuildlab/badges.png",
          description: `<b>Build by badges</b>: The inverse workflow. Pick badges at the tiers you want and the attributes get derived. Every threshold and height gate here came out of the game's binary tuning file, verified cell by cell against the live in-game builder.`
        },
        {
          src: "/images/2kbuildlab/tradeoffs.png",
          thumb: "/images/2kbuildlab/tradeoffs.png",
          description: `<b>Showing the path, not the verdict</b>: The optimizer separates what you must set naturally from what cap breakers cover, and surfaces the attributes that dependencies already force upward for free. Those are the points players most often waste buying something they already had.`
        },
        {
          src: "/images/2kbuildlab/sign-in-gate.png",
          thumb: "/images/2kbuildlab/sign-in-gate.png",
          description: `<b>The funnel, honestly</b>: The sample report carries the label "EXAMPLE REPORT, NOT YOUR BUILD" in the interface itself. Its numbers are a hand-picked archetype built from real attribute and badge identifiers, deliberately not a fabricated personalised result, for an audience that would spot the difference immediately.`
        },
        {
          src: "/images/2kbuildlab/pricing.png",
          thumb: "/images/2kbuildlab/pricing.png",
          description: `<b>Pricing and the fairness rule</b>: Credits get reserved when a job is queued and debited only when the optimizer returns a viable build. No-builds, conflicts and errors cost nothing, enforced in the ledger rather than promised in the copy, and surfaced at every decision point in the funnel.`
        },
        {
          src: "/images/2kbuildlab/how-it-works.png",
          thumb: "/images/2kbuildlab/how-it-works.png",
          description: `<b>Five steps, end to end</b>: Set targets, choose how much body flexibility to allow, declare cap breakers, compare optimized paths, then commit. Leaving position, height, weight and wingspan open makes the search far larger, which is exactly the work the tool exists to absorb.`
        },
        {
          src: "/images/2kbuildlab/mobile.png",
          thumb: "/images/2kbuildlab/mobile.png",
          description: `<b>Mobile</b>: The desktop rail becomes a bottom sheet. The saved-result PNG export forces desktop width while it captures, a detail with its own regression test, because media queries key off the viewport and not the element.`
        }
      ]
    },
    {
      title: 'Destination Home',
      caseStudy: '/portfolio/destination-home',
      categories: ['Angular 22', '.NET 8', 'C#', 'EF Core', 'SQL Server', 'OpenAI Responses', 'Python', 'DuckDB Spatial', 'Geospatial', 'Responsible AI'],
      img: '/images/destination-home.png',
      slides: [
        {
          src: "/images/destination-home/neighborhoods.png",
          thumb: "/images/destination-home/neighborhoods.png",
          description: `<b>The whole product in one frame</b>: A conversation on the left, a plan that fills in as you talk on the right. The ranked areas were ordered by deterministic C# over sourced measurements, never by the model, and the note above them names which factors were actually counted on the ground.`
        },
        {
          src: "/images/destination-home/welcome.png",
          thumb: "/images/destination-home/welcome.png",
          description: `<b>The screen before the conversation</b>: Every item is a fact from the transferee's file rather than a claim about the product. The prototype version counted its own features and promised "AI support" here, which is the wrong thing to say to someone deciding whether the tool knows who they are.`
        },
        {
          src: "/images/destination-home/on-file.png",
          thumb: "/images/destination-home/on-file.png",
          description: `<b>Employer-owned facts</b>: The client, program and allowance come from the employer, so a transferee can query them but not overwrite them. A query routes to the named consultant, is retractable, and the suggested prompts stop quoting the disputed figure while it is open.`
        },
        {
          src: "/images/destination-home/grounded-answer.png",
          thumb: "/images/destination-home/grounded-answer.png",
          description: `<b>Answered from the file, and only from the file</b>: Citation is an act rather than an inference. The source line appears only when the model calls the citation tool with a valid passage id. Read the last clause: temporary housing may be payable but the terms do not list it, so the answer says so instead of smoothing it over.`
        },
        {
          src: "/images/destination-home/free-text.png",
          thumb: "/images/destination-home/free-text.png",
          description: `<b>One message, several cards</b>: Free text answers whole cards ahead of their turn and the flow catches up rather than re-asking. Note the last row of the plan: "close to a decent taco truck" is not a factor the scorer can rank, so it stays in the transferee's own words instead of being quietly dropped.`
        },
        {
          src: "/images/destination-home/provenance.png",
          thumb: "/images/destination-home/provenance.png",
          description: `<b>Every score carries its measurement</b>: Not "highly walkable" but 625 street junctions within a mile, with the dataset and release date behind it. A factor with no measurement for that area says so rather than showing a bar, because a fabricated neutral score would rank a thin-data city below a well-known one.`
        },
        {
          src: "/images/destination-home/escalation.png",
          thumb: "/images/destination-home/escalation.png",
          description: `<b>Where the machine stops</b>: Schools, healthcare and community groups go to a person who arranges them directly. Schools are refused as a ranking input by design, and a test keeps the scripted offline fallback from offering them either.`
        },
        {
          src: "/images/destination-home/account.png",
          thumb: "/images/destination-home/account.png",
          description: `<b>Erasure is a route, not a promise</b>: Erasure removes what is keyed to a person, retention sweeps what is stale, and the anonymous analytics rows sit outside both because they describe nobody. The client reports failure, because the delete route was once missing and the swallowed 405 cleared the local view while the server row survived.`
        },
        {
          src: "/images/destination-home/confirm-dialog.png",
          thumb: "/images/destination-home/confirm-dialog.png",
          description: `<b>Accessibility on the platform's terms</b>: A native dialog, so the focus trap, the escape key and the inert background come from the browser rather than from hand-written code. The safe action is primary and focused, and the copy says what goes with it and that there is no undo.`
        },
        {
          src: "/images/destination-home/mobile.png",
          thumb: "/images/destination-home/mobile.png",
          description: `<b>Phone</b>: The plan moves behind a sheet and the copy follows the input method, so this reads "tap" where the desktop build says "click". Streaming text renders at the same cadence as scripted text through a rAF pump that carries fractional character credit between frames.`
        }
      ]
    },
    {
      title: 'beeline.com',
      categories: ['VueJS', 'Salesforce', 'Pardot', 'Headless Wordpress', 'Gulp', 'EJS'],
      img: '/images/beeline-com.png',
      url: 'beeline.com',
      description: `<div>
        <b>Role</b>: Lead Vue.js Developer<br />
        <b>Timeline</b>: Completed in 1 Year (Projected 1.5-2 Years)<br />
        <b>Technologies</b>: Vue.js, Salesforce/Pardot APIs, WordPress<br />
        <b>Collaboration</b>: Worked closely with Garrett (Design Lead) and the Marketing Team<br />
<br />
        <b>Project Overview</b>: Spearheaded the redevelopment of Beeline's corporate website, transitioning from a WordPress-based site to a dynamic, Vue.js-driven web application. This first major Vue project involved transforming existing templates and creating new ones from scratch, adhering to design directions while also contributing to design decisions.<br />
<br />
        <h5 class="mb-3"><b>Key Contributions and Achievements</b></h5>

        <b>Rapid Development</b>: Accelerated the project timeline, delivering the fully functional website in approximately one year—ahead of the initial 1.5 to 2-year schedule.<br />
        <b>Technical Leadership</b>: Played a pivotal role in developing the site, taking charge of the majority of the development work from conceptualization to deployment, demonstrating strong technical proficiency in Vue.js.<br />
        <b>Collaborative Design</b>: Collaborated effectively with the design team, led by Garrett, balancing adherence to design specifications with the flexibility to introduce innovative design elements.<br />
        <b>API Integration</b>: Successfully integrated Salesforce/Pardot APIs, enhancing the website's functionality and enabling seamless data synchronization and marketing capabilities.<br />
        <b>Parrot Integration</b>: Implemented Parrot integration, further extending the website's interactive and operational features.<br />
        <b>Outcome</b>: The project's success was marked by its on-time delivery, enhanced website performance, and improved user engagement, showcasing my ability to lead and execute complex web development projects with tight deadlines and multiple stakeholders.
      </div>`,
      slides: []
    },
    {
      title: 'Beeline - Business Case Tool',
      description: `<b>Role</b>: Lead Nuxt.js Developer<br />
      <b>Collaboration</b>: Partnered with Tim (Senior Digital Marketing Director) and the Design Team<br />
      <b>Technologies</b>: Nuxt.js, Vue.js, Cosmos DB, PHP<br />
      <b>Objective</b>: Transform a dated PHP website into a modern, efficient client acquisition tool<br />
      <br />
      <b>Project Overview</b>: Led the development of a cutting-edge client acquisition platform by migrating a legacy PHP site to a Nuxt.js application, backed by Cosmos DB. This initiative marked my first venture into using Nuxt.js, setting a new standard for customer engagement strategies within the company.<br />
      <br />
      <h5 class="mb-3"><b>Key Contributions and Achievements</b></h5>

      <b>Strategic Collaboration</b>: Worked closely with Tim, the senior digital marketing director, ensuring that marketing insights and priorities shaped the development process. Our collaboration ensured that the platform not only met but exceeded marketing objectives.<br />
      <b>Design Leadership</b>: Held significant responsibility for the platform's design, balancing creative freedom with valuable input from the design team. This collaborative approach resulted in a user-friendly and visually appealing interface.<br />
      <b>Technology Migration</b>: Successfully transitioned from a traditional PHP architecture to a robust and scalable Nuxt.js framework, leveraging Vue.js for the frontend and Cosmos DB for data management.<br />
      <b>Efficiency and Engagement</b>: Focused on optimizing customer engagement processes, the platform significantly improved the efficiency of client acquisition efforts, demonstrating a tangible impact on the company's digital marketing strategy.<br />
      <b>Outcome</b>: The successful launch of the client acquisition platform showcased my ability to lead a technical migration project while collaborating effectively with cross-functional teams. It also highlighted my design decision-making capabilities and my proficiency in modern web technologies, contributing to enhanced customer engagement and operational efficiency.`,
      categories: ['VueJS', 'Nuxt', 'Cosmos DB'],
      img: '/images/bct.png',
      slides: [
        {
          src: "/images/bct/tour.png",
          thumb: "/images/bct/tour.png",
          description: `<b>Interactive Tour Feature</b>: This feature provides a step-by-step guide of the dashboard, offering users a detailed walkthrough of all functionalities or specific sections. Tailored to enhance user familiarity and ease navigation, it ensures a comprehensive understanding of the platform's tools and features, enabling efficient and effective utilization.`
        },
        {
          video: {
            source: [{ src: "/images/bct/process-steps.mp4", type:"video/mp4" }],
          },
          thumb: "/images/bct/process-steps.png",
          description: '<b>Process Steps Configuration Feature</b>: This feature lets users personalize their workflow by selecting who manages each step—themselves or Beeline—and assesses current time investments for these tasks. It fosters a collaborative environment, optimizing process efficiency by allowing for a tailored approach to task management and duration analysis, enhancing operational insights.'
        },
        {
          src: "/images/bct/chart.png",
          thumb: "/images/bct/chart.png",
          description: '</b>Apex Charts Visualization</b>: Utilizes Apex Charts to dynamically illustrate potential savings for clients, offering a clear, interactive representation of financial advantages. This feature aids in forecasting and demonstrating the tangible benefits of strategic financial planning, making it a vital tool for client engagement and decision-making.'
        },
        {
          src: "/images/bct/settings.png",
          thumb: "/images/bct/settings.png",
          description: '<b>Settings</b>: Allows in-depth tweaking of business cases, including adjusting mean salaries by position for accurate cost analysis. This feature provides a granular level of control over financial assumptions, facilitating precise and customized economic evaluations.'
        },
        {
          video: {
            source: [{ src: "/images/bct/hard-savings.mp4", type:"video/mp4" }],
          },
          thumb: "/images/bct/hard-savings.png",
          description: `<b>Hard Cost Savings Feature</b>: Offers granular control over cost-saving categories, displaying year-over-year value saved. This tool empowers users to fine-tune savings strategies, providing a clear visualization of financial benefits achieved through strategic adjustments, thereby underscoring the platform's impact on enhancing fiscal efficiency.`
        },
      ]
    },
    {
      title: 'Brood',
      description: `<b>Role</b>: Project Lead & Developer<br />
      <b>Technologies</b>: Vue.js, Nuxt.js, Single Sign-On (SSO)<br />
      <b>Objective</b>: Create a dynamic web application to enhance idea generation and collaboration for hackathon events.<br />
      <br />
      <b>Project Overview</b>: "Brood" represents a passion project conceptualized and developed during my free time, marking my first foray into combining Vue.js and Nuxt.js with Single Sign-On technology. Designed to facilitate the sourcing and voting of ideas, this internal platform was aimed at enriching the preparatory phase of our hackathons, both in the quality and quantity of contributions.<br />
      <br />
      <h5 class="mb-3"><b>Key Contributions and Achievements</b></h5>

      <b>Innovation and Implementation</b>: From concept to code, I spearheaded the development of "Brood," leveraging Vue.js and Nuxt.js to ensure a seamless, user-friendly experience. The introduction of SSO simplified access, enhancing user participation across the organization.<br />
      <b>Engagement and Impact</b>: By providing a structured yet intuitive platform for idea submission and voting, "Brood" significantly increased employee engagement in hackathon events. It led to a noticeable uplift in both the quality and quantity of ideas generated, fostering a more vibrant and innovative hackathon culture.<br />
      <b>Autonomous Development</b>: Undertaken as an independent project, "Brood" showcased my ability to identify organizational needs, conceptualize a solution, and execute the development end-to-end, demonstrating significant self-motivation and technical versatility.<br />
      <b>Outcome</b>: The launch of the "Brood" platform transformed the ideation process for our hackathons, resulting in a more engaged community and a richer pool of ideas for innovation. This project not only enhanced my technical skills in Vue.js and Nuxt.js but also underscored my commitment to leveraging technology for community and organizational development.`,
      categories: ['VueJS', 'Nuxt', 'Auth0', 'Pinia', 'Cypress', 'SASS', 'Cosmos DB', 'Azure Identity', 'Azure Storage'],
      img: '/images/brood.png',
      slides: [
        {
          src: "/images/brood/overview.png",
          thumb: "/images/brood/overview.png",
          description: `<b>Idea Browsing & Upvoting</b>: Displays the platform's interface for reviewing and upvoting submitted ideas. Users can filter ideas, search for specific concepts, and support favorite suggestions, facilitating a collaborative and democratic selection process for hackathon topics, all seamlessly integrated with Cosmos DB.`
        },
        {
          src: "/images/brood/auth.png",
          thumb: "/images/brood/auth.png",
          description: `<b>Authentication Feature</b>: Showcases "Brood's" integration of OAuth via Azure WAAD for Single Sign-On (SSO), simplifying secure access and enhancing user experience. This feature demonstrates the seamless merging of advanced security practices with user convenience, encouraging wider participation and engagement across the organization.`
        },
        {
          src: "/images/brood/create.png",
          thumb: "/images/brood/create.png",
          description: `<b>Idea Submission Interface</b>: Features the 'Post an Idea' function with title and description fields, enabling community innovation. Anonymous posting encourages diverse input. Submissions are stored securely in Cosmos DB, ensuring data integrity and support for scalable collaboration.`
        },
        {
          video: {
            source: [{ src: "/images/brood/post.mp4", type:"video/mp4" }],
          },
          thumb: "/images/brood/post.png",
          description: '<b>Detailed Idea Review</b>: Showcases a single post viewing with options for in-depth reading, engagement through likes and comments, and the ability to share insightful contributions.'
        },
        {
          video: {
            source: [{ src: "/images/brood/teams.mp4", type:"video/mp4" }],
          },
          thumb: "/images/brood/teams.png",
          description: 'Teams Integration Feature Screenshot: Illustrates seamless Teams integration for meeting scheduling and instant messaging within "Brood", enhancing collaboration on hackathon ideas. It simplifies the coordination of brainstorming sessions and accelerates communication among participants.'
        }
      ]
    },
    {
      title: 'OpenAI Feedback Classifier',
      description: `<b>Role</b>: Lead Developer and Concept Creator<br />
      <b>Technologies</b>: Azure Language Studio, OpenAI, Custom Data Analysis Tools<br />
      <b>Collaboration</b>: Worked alongside a Data Analyst<br />
      <b>Achievement</b>: Achieved an F1 score of 0.98 in feedback classification accuracy<br />
      <br />
      <b>Project Overview</b>: In an initiative to address the challenge of unstructured client feedback for the digital product "HMX", I conceptualized and coded a sophisticated feedback classifier in my free time. The project aimed at categorizing feedback accurately to understand why users were reverting to a legacy version, "Classic", identifying key areas for product enhancement.<br />
      <br />
      <h5 class="mb-3"><b>Key Contributions and Achievements</b></h5>

      <b>Innovative Solution Development</b>: Spearheaded the creation of an advanced classification tool using Azure Language Studio and OpenAI technologies, transforming raw, unstructured feedback into actionable insights.<br />
      <b>Collaborative Precision Tuning</b>: Collaboratively refined the classifier's prompt and training data alongside a skilled data analyst, meticulously iterating until we achieved a near-perfect F1 score of 0.98, ensuring high accuracy in feedback categorization.<br />
      <b>Impactful Outcome</b>: The classifier significantly improved the process of analyzing client feedback for "HMX", enabling precise identification of user concerns across multiple categories such as Authentication, Data, Navigation, Notification, Performance, and UI.<br />
      <b>Outcome</b>: The Feedback Classifier project stands as a testament to leveraging cutting-edge AI and data analysis technologies to address real-world problems. It underscored the importance of precise feedback analysis in product development cycles and fostered a culture of innovation within the organization, proving instrumental in guiding product enhancements based on user feedback.`,
      categories: ['Azure OpenAI', 'Text Classification', 'Triage'],
      img: '/images/feedback.png',
      slides: [
        {
          src: "/images/feedback/listen.png",
          thumb: "/images/feedback/listen.png",
          description: `<b>Customer Feedback Analysis</b>: This visual showcases the project’s capacity to process and classify large volumes of customer feedback, over 50,000 entries, effectively 'listening' at scale. The system sorts through comments, like those from 'John Doe', to identify and triage issues, which is pivotal for improving client satisfaction and product development.`
        },
        {
          src: "/images/feedback/system-prompt.png",
          thumb: "/images/feedback/system-prompt.png",
          description: `<b>Feedback Classification System Prompt</b>: Exhibits the detailed system prompt used in OpenAI's classifier, meticulously crafted to discern user feedback for "HMX". It outlines the nuanced criteria for each category, ensuring the AI's responses are accurate and relevant. This prompt is the foundation for the classifier's high-precision results, demonstrating the importance of thoughtful input for effective machine learning.`
        },
        {
          src: "/images/feedback/als-results.png",
          thumb: "/images/feedback/als-results.png",
          description: '<b>Azure Language Studio Results</b>: This image reflects initial outcomes from Azure Language Studio, with an F1 score signaling room for improvement. It poses a challenge: to harness the capabilities of OpenAI to replicate the quantifiable success achieved in other projects, aiming for a robust feedback classification system that meets high standards of precision and recall.'
        },
        {
          src: "/images/feedback/playground.png",
          thumb: "/images/feedback/playground.png",
          description: '<b>Azure OpenAI Studio Training</b>: Shows the meticulous process of refining and training the feedback classifier using Azure OpenAI Studio. The interface illustrates how user feedback is categorized and analyzed, honing the AI to discern nuanced feedback for the "HMX" product, leading to the impressive F1 score of 0.98 in classification accuracy.'
        },
        {
          src: "/images/feedback/oai-results.png",
          thumb: "/images/feedback/oai-results.png",
          description: '<b>OpenAI Results Detail</b>: The screenshot details the exceptional performance metrics of the feedback classification achieved with OpenAI. Each category shows high precision and recall rates, culminating in an overall F1 score of 0.98. These metrics not only validate the efficacy of the classifier but also reflect the meticulous tuning and capacity of OpenAI to extract meaningful insights from nuanced data.'
        }
      ]
    },
    {
      title: 'Chatbot Decision Tree',
      description: `<b>Role</b>: Lead Developer and Designer<br />
      <b>Technologies</b>: OpenAI, Custom Backend Tools<br />
      <b>Objective</b>: Develop an intelligent chatbot to streamline the creation of personalized user guide experiences<br />
      <br />
      <b>Project Overview</b>: Undertook the ambitious project of designing and coding an advanced Chatbot, envisioned to transform user interactions into customized guide journeys. This project was conceptualized to not only enhance the end-user experience by intuitively capturing user intents through a series of contextual questions but also to empower MSPs and suppliers with tools to tailor their service journeys. This project is design to classify feedback from the following list: "<b>Authentication</b>, <b>Data</b>, <b>Instructed</b>, <b>Navigation</b>, <b>Notification</b>, <b>Performance</b>, <b>UI</b>". <br />
      <br />
      <h5 class="mb-3"><b>Key Contributions and Achievements</b></h5>

      <b>AI-Powered Interactions</b>: Implemented OpenAI functionalities, enabling the chatbot to understand and predict user intentions accurately, thereby creating a dynamic 'guideme' experience. This feature stands out for its ability to engage users with a conversational interface that anticipates and addresses their needs proactively.<br />
      <b>Customization Capability</b>: Developed a sophisticated backend tool that allows MSPs and suppliers to customize and build their own user journey templates. This innovative tool provides a flexible framework for creating diverse and meaningful user experiences, tailored to specific user queries and scenarios.<br />
      <b>Design and Development Leadership</b>: Balancing multiple responsibilities, I spearheaded the chatbot's development and design, ensuring a seamless integration of AI capabilities with user-friendly design principles. The project demanded a keen eye for design and a deep understanding of user experience, alongside technical coding expertise.<br />
      <b>Instructional Design Optimization</b>: Fine-tuned the chatbot's instructional flow, leveraging OpenAI's advanced natural language processing capabilities to guide the conversation based on user responses. This optimization process involved iterative testing and adjustments to ensure the chatbot delivers accurate, context-aware guidance.<br />
      <b>Outcome</b>: The deployment of the Guideme Chatbot marked a significant milestone in enhancing digital interactions, offering users a tailored, interactive guide through complex processes or services. The project exemplified innovative use of AI to improve service delivery and user satisfaction, showcasing my ability to blend technical prowess with user-centered design in creating impactful digital solutions.`,
      categories: ['VueJS', 'Vite', 'OpenAI Assistant', 'Microsoft Application Insights', 'Pinia'],
      img: '/images/chatbot.png',
      slides: [
        {
          src: "/images/chatbot/spreadsheet.png",
          thumb: "/images/chatbot/spreadsheet.png",
          description: `<b>Guideme Chatbot Genesis</b>: Illustrates the project's origins—a spreadsheet of if-then conditions—that evolved into an automated, AI-driven 'guideme' experience. Reflecting the chatbot's foundation, it shows the systematic conversion of logical pathways into interactive conversations, laying the groundwork for personalized user journeys and showcasing the transition from static data to dynamic interaction design.`
        },
        {
          video: {
            source: [{ src: "/images/chatbot/bot.mp4", type:"video/mp4" }],
          },
          thumb: "/images/chatbot/bot.png",
          description: `<b>Guideme Chatbot Interaction</b>: Demonstrates the bot's intent-recognition feature, which leads users through a targeted questionnaire to swiftly arrive at a solution. It showcases the AI's capacity to streamline complex processes into efficient, user-focused interactions, culminating in quick and personalized end results.`
        },
        {
          src: "/images/chatbot/openai-studio.png",
          thumb: "/images/chatbot/openai-studio.png",
          description: `<b>Chatbot Development in Azure OpenAI Studio</b>: Highlights the 'guideme' function creation, which leverages Azure OpenAI APIs to discern user intent. This visual underscores the project's use of powerful APIs to construct a chatbot capable of sophisticated conversational logic and seamless user guide experiences.`
        },
        {
          src: "/images/chatbot/inspo.png",
          thumb: "/images/chatbot/inspo.png",
          description: '<b>Decision Tree Backend Mockup</b>: This mockup visualizes the logical flow from the spreadsheet, conceptualized as a decision tree for the chatbot backend. It illustrates how user choices branch out, reflecting the design thought process that translates complex logic into a clear, navigable structure.'
        },
        {
          src: "/images/chatbot/figma.png",
          thumb: "/images/chatbot/figma.png",
          description: `<b>Figma Decision Tree Prototype</b>: Captures the evolution of the chatbot's logic from spreadsheet to a decision tree within Figma. This prototype visualizes the branching choices and pathways that guide the bot's conversational flow, detailing the meticulous design process behind the Guideme Chatbot’s intelligent user interactions.`
        },
        {
          src: "/images/chatbot/overview.png",
          thumb: "/images/chatbot/overview.png",
          description: '<b>Finalized Decision Tree</b>: A direct visualization from inspiration to reality, this image showcases the finished decision tree. It clearly delineates the path from the initial question to various outcomes, integrating roadblocks and decision points, as informed by the Figma prototype. This final iteration represents the decision-making logic that drives the user journey within the Guideme Chatbot system.'
        },
        {
          video: {
            source: [{ src: "/images/chatbot/editor.mp4", type:"video/mp4" }],
          },
          thumb: "/images/chatbot/editor.png",
          description: '<b>Chatbot Journey Editor</b>: Exhibits the editing features where more answer options can be added to extend existing paths or modify the journey with new answer sets. This flexibility allows for continual refinement and expansion of the decision-making pathways, adapting to the evolving needs of users and enhancing the bot’s guidance accuracy.'
        },
        {
          video: {
            source: [{ src: "/images/chatbot/legend.mp4", type:"video/mp4" }],
          },
          thumb: "/images/chatbot/legend.png",
          description: `<b>Chatbot Decision Tree Legend</b>: Showcases the legend panel of the decision tree, providing clarity on the symbols and color coding used within the chatbot's journey editor. This key aids in navigating and understanding the various elements and pathways, ensuring that the design and editing process is intuitive and accessible.`
        },
        {
          video: {
            source: [{ src: "/images/chatbot/journey.mp4", type:"video/mp4" }],
          },
          thumb: "/images/chatbot/journey.png",
          description: `<b>Chatbot Streamlined Journey Panel</b>: Depicts the journey panel, which simplifies and visualizes the decision path actively being taken. This panel aids in providing a focused view of the current user's path through the chatbot's logic, making the decision-making process as streamlined and clear as possible for designers and end-users alike.`
        },
        {
          video: {
            source: [{ src: "/images/chatbot/bot-preview.mp4", type:"video/mp4" }],
          },
          thumb: "/images/chatbot/bot-preview.png",
          description: `<b>Chatbot Preview Functionality</b>: Captures the bot preview feature, enabling real-time interaction testing as the decision tree is configured. This tool provides developers with immediate feedback on the bot's conversational flow, ensuring that each path and response aligns with the intended user experience as it's being built.`
        }
      ]
    },
    {
      title: 'Vue Devtools Auditor',
      description: `<b>Role</b>: Project Lead & Developer<br />
      <b>Technologies</b>: Vue.js, Cosmos DB, Accessibility (A11Y) Standards<br />
      <b>Objective</b>: Create a developer tool for comprehensive accessibility and design audits within Vue applications<br />
      <br />
      <b>Project Overview</b>: Motivated by a commitment to digital inclusivity and design excellence, I conceptualized and developed the Vue Devtools Auditor in my free time. This innovative tool is designed to assist developers in identifying and prioritizing accessibility violations in Vue applications, directly aligning with A11Y standards. Additionally, it ensures adherence to established design system guidelines, fostering consistency across digital products.<br />
      <br />
      <h5 class="mb-3"><b>Key Contributions and Achievements</b></h5>

      <b>Accessibility Insight</b>: Implemented functionality to meticulously scan Vue applications, identifying accessibility issues at the component level. The tool categorizes these findings by severity, enabling developers to address the most critical violations first, thereby streamlining the remediation process.<br />
      <b>Design System Compliance</b>: Engineered the tool to audit application elements against our internal design system guidelines, alerting developers of deviations. This feature promotes design consistency and helps maintain a coherent visual and functional user experience across platforms.<br />
      <b>Data Tracking and Synchronization</b>: Integrated Cosmos DB to track and store audit results, providing a persistent database for monitoring accessibility and design compliance over time. This enables a historical view of improvements and ensures ongoing compliance efforts are data-driven.<br />
      <b>Developer Enablement</b>: By offering actionable insights and prioritizing corrections, the tool empowers developers to enhance application accessibility and adhere to design guidelines efficiently, contributing to a more inclusive and user-friendly digital environment.<br />
      <b>Outcome</b>: The Vue Devtools Auditor has become an essential part of our development toolkit, significantly improving our Vue applications' accessibility and design fidelity. It not only reflects my technical innovation and dedication to digital accessibility but also my ability to create tools that have a real-world impact on enhancing user experience standards and compliance.`,
      categories: ['VueJS', 'Vue Devtools', 'Cosmos DB'],
      img: '/images/devtools.png',
      slides: [
        {
          src: "/images/auditor/overview.png",
          thumb: "/images/auditor/overview.png",
          description: `<b>Vue Devtools Auditor Overview</b>: Displays the auditing tool, which organizes accessibility issues by component, allowing developers to quickly identify and address the main culprits. It's an essential aid for prioritizing and streamlining the remediation of A11Y violations to ensure a compliant and accessible application.`
        },
        {
          src: "/images/auditor/inspect-component-instance.png",
          thumb: "/images/auditor/inspect-component-instance.png",
          description: '<b>Component Instance Highlighting</b>: This feature of the Vue Devtools Auditor allows developers to highlight specific component instances, pinpointing where accessibility violations occur within the application, enabling precise and targeted remediation.'
        },
        {
          src: "/images/auditor/violation-details.png",
          thumb: "/images/auditor/violation-details.png",
          description: '<b>Violation Details Review</b>: This aspect of the Vue Devtools Auditor provides an in-depth look at each accessibility issue, offering details like impact level and remediation guidance. Developers can delve into the specifics of each violation, equipping them with the knowledge to make informed corrections for enhanced accessibility compliance.'
        },
        {
          src: "/images/auditor/color-audit.png",
          thumb: "/images/auditor/color-audit.png",
          description: `<b>Design System Color Audit</b>: The Vue Devtools Auditor's color audit functionality scans applications for color usage, cross-referencing with the predefined design system. It flags deviations and suggests the nearest color match from the system, considering the smallest delta for visual consistency and design integrity.`
        },
      ]
    }
  ]

  // Three sizes off one source path, all WebP, none of them loaded on page load:
  // full (<=1920px) opens in the gallery, thumb feeds its filmstrip, card is the
  // list figure. Sources stay on disk as the originals; nothing ships a PNG.
  // Only rasters have derived sizes; .mp4 slides must pass
  // through untouched, or the gallery asks for a video that was never converted.
  static variant(src, dir) {
    return src && src.endsWith('.png')
      ? src.replace('/images/', `/images/${dir}/`).replace(/\.png$/, '.webp')
      : src;
  }

  static fullFor(src) { return WorkList.variant(src, 'full'); }

  static thumbFor(src) { return WorkList.variant(src, 'thumbs'); }

  static cardFor(item) { return WorkList.variant(item.img, 'cards'); }

  static attachGalleryVideos(gallery, button, slides) {
    let activeIndex = -1;
    const reset = (video) => {
      video.pause();
      video.currentTime = 0;
    };
    const stop = () => {
      activeIndex = -1;
      gallery.outer.get().querySelectorAll('video').forEach(reset);
    };
    button.addEventListener('lgHasVideo', ({ detail: { index } }) => {
      const slide = slides[index];
      if (!slide.video) return;
      const container = gallery.getSlideItem(index).get().querySelector('.lg-video-cont');
      if (!container || container.querySelector('video')) return;
      const video = document.createElement('video');
      video.className = 'lg-video-object lg-html5 lg-object';
      video.controls = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.poster = slide.videoPoster;
      for (const source of slide.video.source) {
        const element = document.createElement('source');
        element.src = source.src;
        element.type = source.type;
        video.append(element);
      }
      // A queued play or a native control must never play an inactive slide.
      video.addEventListener('play', () => {
        if (activeIndex !== index) reset(video);
      });
      container.append(video);
    });
    button.addEventListener('lgBeforeSlide', stop);
    button.addEventListener('lgBeforeClose', stop);
    button.addEventListener('lgAfterSlide', ({ detail: { index } }) => {
      activeIndex = index;
      const video = gallery.getSlideItem(index).get().querySelector('video');
      if (!video) return;
      reset(video);
      // Browsers can reject autoplay; native controls remain available.
      video.play().catch(() => {});
    });
  }

  openGallery(item, button) {
    if (button.dataset.ready === 'true') return;
    const slides = item.slides.map((slide) => ({
      src: WorkList.fullFor(slide.src),
      thumb: WorkList.thumbFor(slide.thumb),
      video: slide.video,
      videoPoster: slide.video ? WorkList.fullFor(slide.thumb) : undefined,
      subHtml: `<div class="lg-cap">${item.url ? `<h4><a href="https://${item.url}">${item.url}</a></h4>` : ''}<p>${slide.description}</p></div>`,
    }));
    const gallery = window.lightGallery(button, {
      dynamic: true,
      plugins: [window.lgZoom, window.lgThumbnail].filter(Boolean),
      dynamicEl: slides,
      gotoNextSlideOnVideoEnd: false,
    });
    WorkList.attachGalleryVideos(gallery, button, slides);
    button.dataset.ready = 'true';
    gallery.openGallery(0);
    button.addEventListener('click', () => gallery.openGallery(0));
  }

  render() {
    const order = Object.keys(WorkList.meta);
    return html`${order.map((title) => {
      const item = WorkList.items.find((i) => i.title === title);
      if (!item) return '';
      const m = WorkList.meta[title];
      const hasGallery = Array.isArray(item.slides) && item.slides.length > 0;
      const featured = m.no === '01';
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const shot = html`<img src="${WorkList.cardFor(item)}" width="1000" height="563"
        loading="${featured ? 'eager' : 'lazy'}" decoding="async" alt="Screenshot of ${title}">`;
      return html`
        <article class="proj ${featured ? 'featured' : ''}" id="${id}">
          ${item.caseStudy
            ? html`<a class="proj-shot" href="${item.caseStudy}" tabindex="-1" aria-hidden="true">${shot}</a>`
            : html`<div class="proj-shot">${shot}</div>`}
          <div class="proj-head">
            <h3>${item.caseStudy ? html`<a href="${item.caseStudy}">${title}</a>` : title}</h3>
            <span class="badge ${m.status}">${m.statusLabel}</span>
          </div>
          <p class="proj-role">${m.role}</p>
          <p class="sum">${m.summary}</p>
          <ul class="tech">${item.categories.map((c) => html`<li>${c}</li>`)}</ul>
          <div class="actions">
            ${item.caseStudy ? html`<a class="btn primary" href="${item.caseStudy}">Read the case study</a>` : ''}
            ${item.url ? html`<a class="btn" href="https://${item.url}" target="_blank" rel="noopener noreferrer">
              Visit ${item.url}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>
            </a>` : ''}
            ${hasGallery ? html`<button class="btn" type="button"
              @click="${(e) => this.openGallery(item, e.currentTarget)}">
              ${item.slides.length} annotated screens
            </button>` : ''}
          </div>
        </article>`;
    })}`;
  }
}

customElements.define('work-list', WorkList);
