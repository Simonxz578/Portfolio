export type ExperienceItem = {
  period: string;
  organisation: string;
  role: string;
  summary: string;
};

export const selectedExperience: ExperienceItem[] = [
  {
    period: "2025–2026",
    organisation: "University of Cambridge",
    role: "MPhil research · AI policy and teacher agency",
    summary: "Researching how AI policy and school-level guidance are interpreted in professional practice."
  },
  {
    period: "2024–2025",
    organisation: "University College London",
    role: "MA research · AI in science education",
    summary: "Studied teacher confidence and pedagogical approaches to AI, with a manuscript under revision."
  },
  {
    period: "2024",
    organisation: "Hirain, Beijing",
    role: "Hardware Engineering Intern · LLM workflows",
    summary: "Worked on model deployment, evaluation, RAG retrieval and agent workflow integration in an industrial context."
  },
  {
    period: "2023",
    organisation: "Siemens, Beijing",
    role: "Materials Engineering Intern",
    summary: "Analysed medical-tubing material data and used Python-supported analytical workflows for engineering decisions."
  },
  {
    period: "2025",
    organisation: "Harris St John’s Wood, London",
    role: "Science (Physics) Teacher",
    summary: "Worked directly with classroom practice, observation and student feedback in a real organisational setting."
  }
];

export const education = [
  { institution: "University of Cambridge", degree: "MPhil in Education (Education Policy & Leadership)", period: "2025–2026" },
  { institution: "University College London", degree: "MA in Education (Science)", period: "2024–2025" },
  { institution: "University of Manchester", degree: "BSc (Hons) in Physics", period: "2020–2023" }
] as const;

export const capabilities = [
  {
    group: "Applied AI",
    items: ["LLM deployment", "RAG", "Agent workflows", "API integration", "Multimodal workflows", "Model evaluation"]
  },
  {
    group: "Product",
    items: ["User research", "Workflow analysis", "Product design", "Adoption and trust", "Real-user feedback"]
  },
  {
    group: "Research",
    items: ["Qualitative research", "Evidence synthesis", "Policy analysis", "Evaluation design", "Stakeholder analysis"]
  },
  {
    group: "Leadership",
    items: ["Community building", "Programme operations", "Project delivery", "Cross-team coordination", "Succession planning"]
  }
] as const;

