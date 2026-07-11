export type ProjectStep = {
  label: string;
  detail: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  shortTitle: string;
  kicker: string;
  period: string;
  organisation: string;
  status: string;
  summary: string;
  question: string;
  users: string[];
  constraints: string[];
  role: string;
  decisions: string[];
  workflow: ProjectStep[];
  evaluation: string[];
  outcomes: string[];
  limitations: string[];
  learning: string;
  capabilities: string[];
  relatedResearch?: string;
  featured: boolean;
};

export const projects: CaseStudy[] = [
  {
    slug: "industrial-ai-agent-rag-workflow",
    title: "Industrial AI Agent and RAG Workflow",
    shortTitle: "Industrial AI Agent & RAG",
    kicker: "Applied AI · Industrial workflow",
    period: "2024",
    organisation: "Hirain, Beijing",
    status: "Public-safe case study",
    summary:
      "Deploying and evaluating local and API-based language models, then connecting retrieval, web crawling and multimodal processing to an industrial inspection context.",
    question:
      "How can several model capabilities become a coherent engineering workflow rather than a set of disconnected demonstrations?",
    users: [
      "Engineers working around PCB packaging inspection",
      "Technical collaborators responsible for model deployment and integration"
    ],
    constraints: [
      "A short industrial placement with multiple local and hosted model paths",
      "Internal code, data and company documents cannot be published",
      "The source material does not include an approved benchmark, latency study or cost analysis"
    ],
    role:
      "Worked with a team including Tsinghua University collaborators to deploy, debug and evaluate GLM-4, GLM-4V, Qwen1.5-14B and GPT-4o; connected model access to retrieval, crawling and multimodal workflow components; and applied RAG retrieval in a PCB packaging-inspection context.",
    decisions: [
      "Used both local deployment and API integration rather than assuming one model-access pattern.",
      "Treated retrieval and context assembly as workflow components, not prompt decoration.",
      "Connected model calls to an agent workflow spanning retrieval, web crawling and multimodal processing.",
      "Kept the public architecture sanitised so it communicates design logic without exposing internal implementation."
    ],
    workflow: [
      { label: "Inspection context", detail: "PCB packaging questions and available reference material" },
      { label: "Retrieval", detail: "RAG context assembly and web-crawling inputs" },
      { label: "Model access", detail: "Local deployment and API-based model calls" },
      { label: "Agent workflow", detail: "Orchestration across text and multimodal processing" },
      { label: "Engineering review", detail: "Outputs returned to the inspection workflow for technical judgement" }
    ],
    evaluation: [
      "Deployment debugging and comparative model evaluation were part of the placement.",
      "Operational fit was considered at workflow level: whether retrieval and model access could support the inspection context.",
      "No quantitative result is published because the supplied evidence does not include an approved test set or evaluation report."
    ],
    outcomes: [
      "A connected workflow pattern linking model deployment, retrieval and an industrial inspection use case.",
      "Practical experience moving from individual model capabilities to an agentic workflow.",
      "A reusable lesson: integration choices and workflow ownership matter as much as model selection."
    ],
    limitations: [
      "No public repository or live demo is available.",
      "Confidential code, internal data and commercial claims are deliberately omitted.",
      "Error analysis, privacy controls, latency and cost evidence are not available in the supplied materials."
    ],
    learning:
      "Applied AI becomes useful when model capability is connected to the right context, interfaces and human review point. The work strengthened my preference for evaluating the whole workflow—not only the model response.",
    capabilities: ["LLM deployment", "RAG", "Agent workflows", "API integration", "Multimodal processing", "Model evaluation"],
    featured: true
  },
  {
    slug: "ai-policy-teacher-agency",
    title: "AI Policy, Teacher Agency and Organisational Adoption",
    shortTitle: "AI Policy & Teacher Agency",
    kicker: "AI adoption · Policy and workflow research",
    period: "2025–2026",
    organisation: "University of Cambridge",
    status: "MPhil research project",
    summary:
      "Examining how secondary-school teachers in England interpret AI policy and school-level guidance, with attention to professional judgement and implementation.",
    question:
      "What happens between an AI policy document and the moment a teacher must make a real decision about evidence, learning and acceptable use?",
    users: [
      "Secondary-school teachers interpreting AI guidance",
      "School leaders translating policy into local practice",
      "Teams designing tools and workflows for educational settings"
    ],
    constraints: [
      "Policy language and day-to-day practice operate at different levels of specificity",
      "Professional judgement cannot be reduced to a simple compliance checkbox",
      "Approved methodology and findings were not supplied for public release"
    ],
    role:
      "Developed an MPhil research project around teacher agency under AI policy, focusing on how teachers interpret policy and school guidance. This public case study translates the verified research question into an organisational-adoption lens without publishing participant data or unsupported findings.",
    decisions: [
      "Separated national policy, school-level guidance and professional judgement as distinct implementation layers.",
      "Centred learning evidence and teacher responsibility rather than treating adoption as software rollout alone.",
      "Used an organisational lens to locate where ambiguity, trust and workflow design can shape implementation.",
      "Presented product implications as questions for design and evaluation, not universal research conclusions."
    ],
    workflow: [
      { label: "Policy intent", detail: "What guidance asks schools and teachers to achieve" },
      { label: "Local interpretation", detail: "How a school converts broad guidance into usable expectations" },
      { label: "Professional judgement", detail: "How teachers decide what is appropriate in context" },
      { label: "Learning evidence", detail: "How AI use affects what counts as trustworthy evidence" },
      { label: "Feedback to policy", detail: "Where implementation experience should inform revision" }
    ],
    evaluation: [
      "The project asks whether policy is interpretable at the point of use, not only whether it exists.",
      "A product team could evaluate clarity, decision burden, escalation paths and the quality of evidence available to teachers.",
      "No sample, method or empirical result is stated here because those materials were not supplied for publication."
    ],
    outcomes: [
      "A structured way to examine the implementation gap between policy intent and professional practice.",
      "A product-relevant framing of AI adoption as a relationship between guidance, trust, evidence and workflow.",
      "Design questions that can inform future tool evaluation without overstating the research."
    ],
    limitations: [
      "The public page presents the research framing, not findings.",
      "Participant information, interview material and school-level data are not published.",
      "The work concerns a specific education context and should not be generalised to every organisation."
    ],
    learning:
      "Adoption is socio-technical: a capable model can still fail when responsibility is unclear, evidence is difficult to judge or guidance does not fit the real workflow.",
    capabilities: ["Policy analysis", "Stakeholder analysis", "Organisational adoption", "Trust", "Evaluation design", "Workflow analysis"],
    relatedResearch: "MPhil in Education (Education Policy & Leadership), University of Cambridge",
    featured: true
  },
  {
    slug: "ai-enhanced-science-education",
    title: "AI-enhanced Science Education and Teacher Confidence",
    shortTitle: "AI & Teacher Confidence",
    kicker: "User research · Education technology",
    period: "2024–2025",
    organisation: "University College London",
    status: "MA dissertation · Manuscript under revision",
    summary:
      "Research into science teachers’ confidence and pedagogical approaches when using AI, translated into product questions about fit, trust and adoption.",
    question:
      "How should an AI product support teachers whose confidence, subject knowledge and intended use can vary across planning, feedback and classroom activity?",
    users: [
      "Science teachers considering AI for their own work",
      "Teachers deciding whether and how students should use AI",
      "Education-product teams designing for pedagogical fit"
    ],
    constraints: [
      "Teacher-facing and student-facing uses carry different risks and expectations",
      "Confidence does not necessarily equal capability, trust or pedagogical fit",
      "The manuscript is not published and the full study materials were not supplied"
    ],
    role:
      "Completed an MA dissertation on teachers’ confidence and pedagogical approaches with AI in science education. The associated manuscript is under revision following a major-revision decision at the International Journal of Science Education.",
    decisions: [
      "Distinguished teacher-facing uses from student-facing uses instead of grouping all AI adoption together.",
      "Treated confidence as one input to adoption, alongside trust, task fit and professional judgement.",
      "Translated pedagogical questions into product questions about timing, control, feedback and evidence.",
      "Used the relationship between technology, pedagogy and subject knowledge—the concern often described through AI-TPACK—as a design lens, not a marketing label."
    ],
    workflow: [
      { label: "Teaching task", detail: "Planning, explanation, feedback or classroom activity" },
      { label: "Use mode", detail: "Teacher-facing support or student-facing interaction" },
      { label: "Professional judgement", detail: "Fit with subject, pedagogy and learner needs" },
      { label: "Trust decision", detail: "Whether the output can be checked and used responsibly" },
      { label: "Adoption signal", detail: "Use, adapt, defer or reject in the actual workflow" }
    ],
    evaluation: [
      "The research centres teachers’ confidence and pedagogical judgement rather than adoption counts alone.",
      "For product evaluation, the relevant questions include task fit, reviewability, control and the quality of evidence presented to the teacher.",
      "This page does not publish a sample size, statistical result or universal finding because the underlying evidence was not supplied."
    ],
    outcomes: [
      "A research-led framing for distinguishing teacher-facing and student-facing product needs.",
      "A set of adoption questions that connect confidence with pedagogy, trust and workflow fit.",
      "A manuscript currently under revision; it is not described as published."
    ],
    limitations: [
      "The manuscript, decision letter and approved public findings are not included in the project materials.",
      "The page does not infer causal effects or generalise beyond the study context.",
      "No public dataset, repository or live product is attached."
    ],
    learning:
      "Useful education AI must fit the teacher’s task and evidence standards. Product adoption is more credible when control, review and pedagogical purpose are designed together.",
    capabilities: ["User research", "Education technology", "Trust", "Adoption", "Evidence synthesis", "Product implications"],
    relatedResearch: "MA in Education (Science), University College London",
    featured: true
  }
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): CaseStudy | undefined {
  return projects.find((project) => project.slug === slug);
}

