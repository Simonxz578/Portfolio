import type { ExperienceItem } from "@data/en/experience";

/** Public résumé facts, shared by the Chinese one-page experience. */
export const selectedExperience: ExperienceItem[] = [
  {
    period: "2025–2026",
    organisation: "剑桥大学",
    role: "硕士研究 · AI政策与教师能动性",
    summary: "研究AI政策和学校层面的指引如何进入教师的专业实践。"
  },
  {
    period: "2025",
    organisation: "Harris St John’s Wood，伦敦",
    role: "科学（物理）教师",
    summary: "参与真实课堂教学、课堂观察，并根据学生反馈调整教学。"
  },
  {
    period: "2024–2026",
    organisation: "伦敦大学学院",
    role: "硕士研究 · AI与科学教育",
    summary: "Zhang, X., & Reiss, M. J. (2026). Investigating science teachers’ experiences of generative AI in science teaching and learning from a GenAI-TPACK perspective. International Journal of Science Education, 1–20. https://doi.org/10.1080/09500693.2026.2733687"
  },
  {
    period: "2024",
    organisation: "经纬恒润，北京",
    role: "硬件项目经理实习",
    summary: "参与模型部署、评估、RAG检索和Agent工作流在工业场景中的集成。"
  },
  {
    period: "2023.08–2023.10",
    organisation: "西门子，北京",
    role: "技术产品经理实习",
    summary: "协同业务、IT 及研发部门完成 PRD 撰写，使用 Axure 与 Visio 设计交互原型及业务流程，构建多维度产品评价体系，推动材料检索、选型至生产落地的全流程优化，降低平均任务耗时。"
  }
];

export const education = [
  {
    period: "2025–2026",
    institution: "剑桥大学",
    degree: "教育学（教育政策、领导力与改进）哲学硕士"
  },
  {
    period: "2024–2025",
    institution: "伦敦大学学院",
    degree: "教育学（科学）文学硕士"
  },
  {
    period: "2020–2023",
    institution: "曼彻斯特大学",
    degree: "物理学理学学士"
  }
] as const;

export const capabilities = [
  { group: "应用AI", items: ["LLM部署", "RAG", "Agent工作流", "API集成", "多模态流程", "模型评估"] },
  { group: "产品", items: ["用户研究", "工作流分析", "产品设计", "采用与信任", "真实用户反馈"] },
  { group: "研究", items: ["定性研究", "研究综合", "政策分析", "评估设计", "利益相关者分析"] },
  { group: "领导力", items: ["社群建设", "项目运营", "项目交付", "跨团队协作", "交接规划"] }
] as const;
