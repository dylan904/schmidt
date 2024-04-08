import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

function waitForLightGalleryToLoad(callback, attempt = 0) {
  if (typeof window.lightGallery === 'function') {
    console.log('lightGallery is now available.');
    callback();
  } else if (attempt < 20) { // Try for up to 10 seconds
    setTimeout(() => {
      waitForLightGalleryToLoad(callback, attempt + 1);
    }, 500);
  } else {
    console.error('Failed to load lightGallery.');
  }
}

export class MyElement extends LitElement {
  static properties = {
    title: { type: String }
  };

  item = null;
  slides = [];
  contentLightbox = {};

  static items = [
    {
      title: 'beeline.com',
      categories: ['VueJS', 'Salesforce', 'Pardot', 'Headless Wordpress', 'Gulp', 'EJS'],
      img: 'images/beeline-com.png',
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
      img: 'images/bct.png',
      slides: [
        {
          src: "images/bct/tour.png",
          thumb: "images/bct/tour.png",
          description: `<b>Interactive Tour Feature</b>: This feature provides a step-by-step guide of the dashboard, offering users a detailed walkthrough of all functionalities or specific sections. Tailored to enhance user familiarity and ease navigation, it ensures a comprehensive understanding of the platform's tools and features, enabling efficient and effective utilization.`
        },
        {
          video: {
            source: [{ src: "images/bct/process-steps.mp4", type:"video/mp4" }], 
            attributes: { preload: false, controls: true, autoplay: true }
          },
          thumb: "images/bct/process-steps.png",
          description: '<b>Process Steps Configuration Feature</b>: This feature lets users personalize their workflow by selecting who manages each step—themselves or Beeline—and assesses current time investments for these tasks. It fosters a collaborative environment, optimizing process efficiency by allowing for a tailored approach to task management and duration analysis, enhancing operational insights.'
        },
        {
          src: "images/bct/chart.png",
          thumb: "images/bct/chart.png",
          description: '</b>Apex Charts Visualization</b>: Utilizes Apex Charts to dynamically illustrate potential savings for clients, offering a clear, interactive representation of financial advantages. This feature aids in forecasting and demonstrating the tangible benefits of strategic financial planning, making it a vital tool for client engagement and decision-making.'
        },
        {
          src: "images/bct/settings.png",
          thumb: "images/bct/settings.png",
          description: '<b>Settings</b>: Allows in-depth tweaking of business cases, including adjusting mean salaries by position for accurate cost analysis. This feature provides a granular level of control over financial assumptions, facilitating precise and customized economic evaluations.'
        },
        {
          video: {
            source: [{ src: "images/bct/hard-savings.mp4", type:"video/mp4" }], 
            attributes: { preload: false, controls: true, autoplay: true }
          },
          thumb: "images/bct/hard-savings.png",
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
      img: 'images/brood.png',
      slides: [
        {
          src: "images/brood/overview.png",
          thumb: "images/brood/overview.png",
          description: `<b>Idea Browsing & Upvoting</b>: Displays the platform's interface for reviewing and upvoting submitted ideas. Users can filter ideas, search for specific concepts, and support favorite suggestions, facilitating a collaborative and democratic selection process for hackathon topics, all seamlessly integrated with Cosmos DB.`
        },
        {
          src: "images/brood/auth.png",
          thumb: "images/brood/auth.png",
          description: `<b>Authentication Feature</b>: Showcases "Brood's" integration of OAuth via Azure WAAD for Single Sign-On (SSO), simplifying secure access and enhancing user experience. This feature demonstrates the seamless merging of advanced security practices with user convenience, encouraging wider participation and engagement across the organization.`
        },
        {
          src: "images/brood/create.png",
          thumb: "images/brood/create.png",
          description: `<b>Idea Submission Interface</b>: Features the 'Post an Idea' function with title and description fields, enabling community innovation. Anonymous posting encourages diverse input. Submissions are stored securely in Cosmos DB, ensuring data integrity and support for scalable collaboration.`
        },
        {
          video: {
            source: [{ src: "images/brood/post.mp4", type:"video/mp4" }], 
            attributes: { preload: false, controls: true, autoplay: true }
          },
          thumb: "images/brood/post.png",
          description: '<b>Detailed Idea Review</b>: Showcases a single post viewing with options for in-depth reading, engagement through likes and comments, and the ability to share insightful contributions.'
        },
        {
          video: {
            source: [{ src: "images/brood/teams.mp4", type:"video/mp4" }], 
            attributes: { preload: false, controls: true, autoplay: true }
          },
          thumb: "images/brood/teams.png",
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
      <b>Collaborative Precision Tuning</b>: Collaboratively refined the classifier's prompt and training data alongside a skilled data analyst, meticulously iterating until we achieved a near-perfect F1 score of 0.97, ensuring high accuracy in feedback categorization.<br />
      <b>Impactful Outcome</b>: The classifier significantly improved the process of analyzing client feedback for "HMX", enabling precise identification of user concerns across multiple categories such as Authentication, Data, Navigation, Notification, Performance, and UI.<br />
      <b>Outcome</b>: The Feedback Classifier project stands as a testament to leveraging cutting-edge AI and data analysis technologies to address real-world problems. It underscored the importance of precise feedback analysis in product development cycles and fostered a culture of innovation within the organization, proving instrumental in guiding product enhancements based on user feedback.`,
      categories: ['Azure OpenAI', 'Text Classification', 'Triage'],
      img: 'images/feedback.png',
      slides: [
        {
          src: "images/feedback/listen.png",
          thumb: "images/feedback/listen.png",
          description: `<b>Customer Feedback Analysis</b>: This visual showcases the project’s capacity to process and classify large volumes of customer feedback, over 50,000 entries, effectively 'listening' at scale. The system sorts through comments, like those from 'John Doe', to identify and triage issues, which is pivotal for improving client satisfaction and product development.`
        },
        {
          src: "images/feedback/system-prompt.png",
          thumb: "images/feedback/system-prompt.png",
          description: `<b>Feedback Classification System Prompt</b>: Exhibits the detailed system prompt used in OpenAI's classifier, meticulously crafted to discern user feedback for "HMX". It outlines the nuanced criteria for each category, ensuring the AI's responses are accurate and relevant. This prompt is the foundation for the classifier's high-precision results, demonstrating the importance of thoughtful input for effective machine learning.`
        },
        {
          src: "images/feedback/als-results.png",
          thumb: "images/feedback/als-results.png",
          description: '<b>Azure Language Studio Results</b>: This image reflects initial outcomes from Azure Language Studio, with an F1 score signaling room for improvement. It poses a challenge: to harness the capabilities of OpenAI to replicate the quantifiable success achieved in other projects, aiming for a robust feedback classification system that meets high standards of precision and recall.'
        },
        {
          src: "images/feedback/playground.png",
          thumb: "images/feedback/playground.png",
          description: '<b>Azure OpenAI Studio Training</b>: Shows the meticulous process of refining and training the feedback classifier using Azure OpenAI Studio. The interface illustrates how user feedback is categorized and analyzed, honing the AI to discern nuanced feedback for the "HMX" product, leading to the impressive F1 score of 0.98 in classification accuracy.'
        },
        {
          src: "images/feedback/oai-results.png",
          thumb: "images/feedback/oai-results.png",
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
      img: 'images/chatbot.png',
      slides: [
        {
          src: "images/chatbot/spreadsheet.png",
          thumb: "images/chatbot/spreadsheet.png",
          description: `<b>Guideme Chatbot Genesis</b>: Illustrates the project's origins—a spreadsheet of if-then conditions—that evolved into an automated, AI-driven 'guideme' experience. Reflecting the chatbot's foundation, it shows the systematic conversion of logical pathways into interactive conversations, laying the groundwork for personalized user journeys and showcasing the transition from static data to dynamic interaction design.`
        },
        {
          video: {
            source: [{ src: "images/chatbot/bot.mp4", type:"video/mp4" }], 
            attributes: { preload: false, controls: true, autoplay: true }
          },
          thumb: "images/chatbot/bot.png",
          description: `<b>Guideme Chatbot Interaction</b>: Demonstrates the bot's intent-recognition feature, which leads users through a targeted questionnaire to swiftly arrive at a solution. It showcases the AI's capacity to streamline complex processes into efficient, user-focused interactions, culminating in quick and personalized end results.`
        },
        {
          src: "images/chatbot/openai-studio.png",
          thumb: "images/chatbot/openai-studio.png",
          description: `<b>Chatbot Development in Azure OpenAI Studio</b>: Highlights the 'guideme' function creation, which leverages Azure OpenAI APIs to discern user intent. This visual underscores the project's use of powerful APIs to construct a chatbot capable of sophisticated conversational logic and seamless user guide experiences.`
        },
        {
          src: "images/chatbot/inspo.png",
          thumb: "images/chatbot/inspo.png",
          description: '<b>Decision Tree Backend Mockup</b>: This mockup visualizes the logical flow from the spreadsheet, conceptualized as a decision tree for the chatbot backend. It illustrates how user choices branch out, reflecting the design thought process that translates complex logic into a clear, navigable structure.'
        },
        {
          src: "images/chatbot/figma.png",
          thumb: "images/chatbot/figma.png",
          description: `<b>Figma Decision Tree Prototype</b>: Captures the evolution of the chatbot's logic from spreadsheet to a decision tree within Figma. This prototype visualizes the branching choices and pathways that guide the bot's conversational flow, detailing the meticulous design process behind the Guideme Chatbot’s intelligent user interactions.`
        },
        {
          src: "images/chatbot/overview.png",
          thumb: "images/chatbot/overview.png",
          description: '<b>Finalized Decision Tree</b>: A direct visualization from inspiration to reality, this image showcases the finished decision tree. It clearly delineates the path from the initial question to various outcomes, integrating roadblocks and decision points, as informed by the Figma prototype. This final iteration represents the decision-making logic that drives the user journey within the Guideme Chatbot system.'
        },
        {
          video: {
            source: [{ src: "images/chatbot/editor.mp4", type:"video/mp4" }], 
            attributes: { preload: false, controls: true, autoplay: true }
          },
          thumb: "images/chatbot/editor.png",
          description: '<b>Chatbot Journey Editor</b>: Exhibits the editing features where more answer options can be added to extend existing paths or modify the journey with new answer sets. This flexibility allows for continual refinement and expansion of the decision-making pathways, adapting to the evolving needs of users and enhancing the bot’s guidance accuracy.'
        },
        {
          video: {
            source: [{ src: "images/chatbot/legend.mp4", type:"video/mp4" }], 
            attributes: { preload: false, controls: true, autoplay: true }
          },
          thumb: "images/chatbot/legend.png",
          description: `<b>Chatbot Decision Tree Legend</b>: Showcases the legend panel of the decision tree, providing clarity on the symbols and color coding used within the chatbot's journey editor. This key aids in navigating and understanding the various elements and pathways, ensuring that the design and editing process is intuitive and accessible.`
        },
        {
          video: {
            source: [{ src: "images/chatbot/journey.mp4", type:"video/mp4" }], 
            attributes: { preload: false, controls: true, autoplay: true }
          },
          thumb: "images/chatbot/journey.png",
          description: `<b>Chatbot Streamlined Journey Panel</b>: Depicts the journey panel, which simplifies and visualizes the decision path actively being taken. This panel aids in providing a focused view of the current user's path through the chatbot's logic, making the decision-making process as streamlined and clear as possible for designers and end-users alike.`
        },
        {
          video: {
            source: [{ src: "images/chatbot/bot-preview.mp4", type:"video/mp4" }], 
            attributes: { preload: false, controls: true, autoplay: true }
          },
          thumb: "images/chatbot/bot-preview.png",
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
      img: 'images/devtools.png',
      slides: [
        {
          src: "images/auditor/overview.png",
          thumb: "images/auditor/overview.png",
          description: `<b>Vue Devtools Auditor Overview</b>: Displays the auditing tool, which organizes accessibility issues by component, allowing developers to quickly identify and address the main culprits. It's an essential aid for prioritizing and streamlining the remediation of A11Y violations to ensure a compliant and accessible application.`
        },
        {
          src: "images/auditor/inspect-component-instance.png",
          thumb: "images/auditor/inspect-component-instance.png",
          description: '<b>Component Instance Highlighting</b>: This feature of the Vue Devtools Auditor allows developers to highlight specific component instances, pinpointing where accessibility violations occur within the application, enabling precise and targeted remediation.'
        },
        {
          src: "images/auditor/violation-details.png",
          thumb: "images/auditor/violation-details.png",
          description: '<b>Violation Details Review</b>: This aspect of the Vue Devtools Auditor provides an in-depth look at each accessibility issue, offering details like impact level and remediation guidance. Developers can delve into the specifics of each violation, equipping them with the knowledge to make informed corrections for enhanced accessibility compliance.'
        },
        {
          src: "images/auditor/color-audit.png",
          thumb: "images/auditor/color-audit.png",
          description: `<b>Design System Color Audit</b>: The Vue Devtools Auditor's color audit functionality scans applications for color usage, cross-referencing with the predefined design system. It flags deviations and suggests the nearest color match from the system, considering the smallest delta for visual consistency and design integrity.`
        },
      ]
    }
  ]
  
  static styles = css`
    .wrap {
      padding: 16px;
      border: 3px solid #3e63dd;
      border-radius: 4px;
      margin-bottom: 32px;
      transition: background-color 0.3s ease;
      margin-bottom: 30px;
    }

    .wrap:hover {
      background-color: white;
    }

    .project {
      width: 100%;
      height: 360px;
      position: relative;
      z-index: 0; 
      display: flex;
      justify-content:center;
      align-items: center;
      cursor: default;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center; 
    }

    .project[data-title="Brood"] {
      background-size: cover;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      content: '';
      opacity: 0;
      background: #0090FF;
      z-index: -1;
      transition: opacity 0.3s ease; 
    }

    .text {
      max-width: 80%;
      z-index: 1;
      opacity: 0;
      transition: all 0.3s ease; 
      color: #ffffff;
    }

    h3 {
      font-size: 20px; 
      color: #fff; 
    }

    .text span {
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 14px;
      font-weight: 600; 
      white-space: nowrap;
    }

    .wrap:hover .overlay, .project:focus .overlay {
      opacity: .98; 
    }

    .wrap:hover .text, .project:focus .text {
      opacity: 1; 
    }

.btn {
  display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    font-size: 1rem;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    padding: 9px 12px;
    border-radius: 2px;
    box-shadow: 0px 24px 36px -11px rgba(0, 0, 0, 0.09);
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 8px 16px;
    margin-top: 20px;
    margin-right: 16px;
}

.btn.btn-white {
    background: #fff !important;
    border: 1px solid #fff !important;
    color: #000000 !important;
}
  `;

  firstUpdated() {
    this.item = MyElement.items.find(item => item.title === this.title);
    console.log('tryitem', this.title, MyElement.items)
    if (this.item) {
      if (this.item.url) {

      }
      else {
        this.slides = this.item.slides.map(slide => ({
          src: slide.src,
          thumb: slide.thumb,
          video: slide.video,
          subHtml: `<div class="lightGallery-captions">${ this.item.url ? `<h4>Project URL <a href="https://${ this.item.url }">${ this.item.url }</a></h4>` : `` }
              <p>${ slide.description }</p>
            </div>`
        }))
        console.log('got item', this.item, this.slides)
      }
      this.requestUpdate();
      this.contentLightbox = GLightbox({
        elements: [
          {
            content: `<div id="inline-example">
                          <div class="inline-inner text-center">
                              <h2>${ this.item.title }</h2>
                              <div style="text-align: left; color: #5C5F5F">
                                  <p>${ this.item.description }</p>
                              </div>
                              <a class="gtrigger-close btn btn-primary p-4 py-3 mt-3" href="#">Close</a>
                          </div>
                      </div>`
          }
        ]
      });
    }

    const trigger = this.renderRoot.querySelector('#gallery-trigger');

    setTimeout(() => {
      const dynamicGallery = window.lightGallery(trigger, {
        dynamic: true,
        plugins: [lgZoom, lgThumbnail, lgVideo],
        dynamicEl: this.slides, // Make sure 'slides' is correctly defined as your slides data
        gotoNextSlideOnVideoEnd: false // This is your initial attempt to prevent auto-slide. Keeping it here assuming it doesn't hurt to have, but focusing on manual control below.
      });
  
      trigger.addEventListener("click", () => dynamicGallery.openGallery(0));
    }, 1000);
  }

  readMore() {
    this.contentLightbox.open()
  }

  render() {
    console.log('renderit', this.item?.url, this.item)
    return html`
      <div class="wrap">
        <div class="project" data-title="${ this.item?.title }" style="background-image: url(${ this.item?.img })">
          <div class="overlay"></div>
          <div class="text text-center p-4">
            <h3>${ this.title }</h3>
              ${this.item?.categories.flatMap((cat, index) => [index > 0 ? html` • ` : '', html`<span>${cat}</span>`])}
              <div class="actions">
                <button class="btn btn-white" @click="${ this.readMore }">Read more</button>

                ${this.item?.url
                  ? html`<a class="btn btn-white" target="_blank" href="https://${ this.item.url}">View Site</a>`
                  : html`<button class="btn btn-white" id="gallery-trigger">View gallery</button>`
                }
                <div>
        
              </div>
          </div>
        </div>
      </div>

              
    `;
  }
}

customElements.define('portfolio-item', MyElement);
