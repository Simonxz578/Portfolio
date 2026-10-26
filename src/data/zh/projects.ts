import type { CaseStudy } from "@data/en/projects";

export const projects: CaseStudy[] = [
  {
    "slug": "ninefold",
    "organisation": "独立产品",
    "featured": true,
    "title": "Ninefold 九境生息｜角色陪伴的物理、数学与实验学习世界",
    "shortTitle": "Ninefold 九境生息",
    "kicker": "旗舰项目 · AI学习产品 · 物理与数学",
    "period": "2026年6月至今",
    "status": "已上线的中英文公开 Beta",
    "summary": "把物理、数学、原创练习与交互实验连接在同一个角色陪伴的学习世界。学习者用语音或文字说出思路，通过操控模型、分层提示与自主练习，把问题一步步想明白。",
    "question": "怎样让 AI 角色帮助学习者持续推理，从一个问题走到证据与自主练习？",
    "users": [
      "学习物理与数学的国际课程中学生",
      "沿 IGCSE、A-Level、ESAT/BPhO 或 UKMT/AMC 路径探索的学习者"
    ],
    "constraints": [
      "让确定性系统控制科学模型、数值答案与课程范围",
      "让 AI 在经过核对的策略与提示中作出受约束的选择，并保留回退路径"
    ],
    "role": "独立负责学习者问题定义、课程路径、角色交互、模型路由、语音输入、教学边界、评估与发布验收。",
    "decisions": [
      "把物理、数学与实验探索放进同一个持续存在的角色世界",
      "采用 DeepSeek 主路由与 GLM 受约束回退，不按学科硬拆模型",
      "把 Whisper ASR 接成可编辑、由学习者确认提交的输入",
      "在本地学习记忆中区分独立完成与使用提示后的完成"
    ],
    "workflow": [
      {
        "label": "选择",
        "detail": "选择学科、知识点或实验"
      },
      {
        "label": "表达",
        "detail": "用语音或文字提出问题"
      },
      {
        "label": "引导",
        "detail": "取得经过核对的方法提示"
      },
      {
        "label": "探索",
        "detail": "操作模型或尝试解题方法"
      },
      {
        "label": "练习",
        "detail": "在原创题中应用理解"
      },
      {
        "label": "回看",
        "detail": "记录完成情况与提示使用"
      }
    ],
    "evaluation": [
      "已核对当前物理、数学、实验与逐题角色辅导的代码和线上界面。",
      "下一步重点验证提示后的独立重做、实验解释和再次进入学习的体验，不将功能上线等同于学习或留存效果提升。"
    ],
    "outcomes": [
      "已上线物理、数学与交互实验，连接课程学习、逐题辅导与原创练习。",
      "DeepSeek 主路由、GLM 回退与 Whisper 语音识别，将自然语言提问接入角色引导。",
      "用本地完成记录、提示使用情况与每日三题目标，支持学习者继续学习。"
    ],
    "limitations": [
      "课程按专题覆盖；虚拟实验与原创练习反馈不能替代真实实验或官方考核。",
      "学习效果与持续使用价值仍需真实学习者验证。"
    ],
    "learning": "角色的价值在于让下一步学习行动更清楚：帮助学习者表达问题、取得证据和自主尝试，同时把学科事实与数值答案留在受控系统中。",
    "capabilities": [
      "AI产品策略",
      "角色陪伴学习",
      "物理与数学",
      "DeepSeek / GLM",
      "Whisper ASR",
      "受约束教学"
    ],
    "links": [
      {
        "href": "https://ninefold-65f.pages.dev/#/zh/world",
        "label": "进入 Ninefold"
      },
      {
        "href": "https://ninefold-65f.pages.dev/#/zh/experiments",
        "label": "探索交互实验"
      }
    ]
  },
  {
    slug: "industrial-ai-agent-rag-workflow", title: "工业AI Agent与RAG工作流", shortTitle: "工业AI Agent与RAG", kicker: "应用AI · 工业工作流", period: "2024", organisation: "北京经纬恒润", status: "公开版项目案例",
    summary: "部署并评估本地与API语言模型，将检索、网页抓取和多模态处理接入工业检测场景。", question: "如何把多种模型能力组成一套可用的工程工作流？", users: ["从事PCB包装检测的工程师", "负责模型部署与集成的技术协作者"], constraints: [],
    role: "我与团队及清华大学合作者共同部署、调试和评估GLM-4、GLM-4V、Qwen1.5-14B与GPT-4o，并将模型接入检索、网页抓取和多模态处理流程。",
    decisions: ["同时测试本地部署和API接入", "把检索与上下文组装作为工作流的一部分", "连接文本检索、网页抓取和多模态处理", "用抽象架构说明设计逻辑，保护内部实现"],
    workflow: [{label:"检测场景",detail:"PCB包装问题与参考资料"},{label:"检索",detail:"组织RAG上下文和网页信息"},{label:"模型接入",detail:"调用本地模型与API"},{label:"Agent工作流",detail:"编排文本与多模态处理"},{label:"工程复核",detail:"由工程人员判断输出是否可用"}],
    evaluation: ["工作包含部署调试和模型对比。", "我从整个流程判断模型和检索能否支持检测任务。"], outcomes: ["形成连接模型部署、检索与工业检测的工作流。", "积累了从单点模型能力走向Agent流程的实践经验。", "明确了集成方式和流程责任人与模型选择同样重要。"], limitations: [], learning: "模型能力只有接入合适的场景、界面和人工复核节点，才能转化为可用产品。", capabilities: ["LLM部署","RAG","Agent工作流","API集成","多模态处理","模型评估"], featured: true
  },
  {
    slug: "ai-enhanced-science-education", title: "AI与教师经验", shortTitle: "AI与教师经验", kicker: "用户研究 · 教育科技", period: "2024–2026", organisation: "伦敦大学学院", status: "教育学硕士论文 · IJSE论文已发表（2026）",
    summary: "研究科学教师使用生成式AI时的信心与教学选择，并将发现转化为有关场景匹配、信任和采用的产品问题。", question: "面对信心、学科经验和使用目标各不相同的教师，AI产品应该怎样提供支持？", users: ["考虑在工作中使用AI的科学教师", "需要决定学生能否以及如何使用AI的教师", "设计教育产品的团队"], constraints: ["教师使用与学生使用面对不同风险", "信心并不直接代表能力、信任或教学适配", "本案例不重复刊载论文的研究数据和结论"],
    role: "我完成了关于科学教师使用生成式AI经验的硕士研究，并与 M. J. Reiss 合著论文，于2026年发表于 International Journal of Science Education。", decisions: ["分别分析教师端和学生端的使用场景", "把信心与任务匹配、信任和专业判断共同考虑", "把教学问题转化为时机、控制、反馈和结果检查等产品问题", "用技术、教学法和学科知识的关系指导设计"],
    workflow: [{label:"教学任务",detail:"备课、讲解、反馈或课堂活动"},{label:"使用方式",detail:"教师辅助或学生直接使用"},{label:"专业判断",detail:"判断与学科、教学法和学生需求是否匹配"},{label:"信任判断",detail:"确认结果是否容易检查"},{label:"采用选择",detail:"使用、调整、延后或拒绝"}],
    evaluation: ["研究关注教师信心和教学判断。", "产品评估应考察任务匹配、可检查性、控制权和信息质量。"], outcomes: ["区分教师端与学生端的产品需求。", "形成连接信心、教学法、信任与工作流的采用问题。", "论文已发表于 International Journal of Science Education（2026）。"], limitations: ["本案例不重复刊载已发表论文的研究数据和结论。", "不推断因果关系或跨情境推广。"], learning: "教育AI需要贴合教师的具体任务和判断标准。控制权、可检查性与教学目的应当一起设计。", capabilities: ["用户研究","教育科技","信任","产品采用","研究综合","产品洞察"], relatedResearch: "Zhang, X., & Reiss, M. J. (2026). Investigating science teachers’ experiences of generative AI in science teaching and learning from a GenAI-TPACK perspective. International Journal of Science Education, 1–20. https://doi.org/10.1080/09500693.2026.2733687", links: [{href:"https://doi.org/10.1080/09500693.2026.2733687",label:"阅读已发表论文"}], featured: true
  },
  {
    slug: "ai-policy-teacher-agency", title: "AI政策、教师能动性与组织采用", shortTitle: "AI政策与教师能动性", kicker: "AI采用 · 政策与工作流研究", period: "2025–2026", organisation: "剑桥大学", status: "教育学硕士研究项目",
    summary: "研究英格兰中学教师如何理解AI政策与校内指引，以及这些要求如何进入日常专业判断。", question: "一份AI政策如何走到教师面对真实教学决策的那一刻？", users: ["需要理解AI指引的中学教师", "把政策转化为校内做法的学校管理者", "为教育场景设计工具与流程的团队"], constraints: ["政策语言与日常实践的具体程度不同", "专业判断无法简化成合规勾选", "公开页面不披露参与者资料和未发布结果"],
    role: "我围绕AI政策下的教师能动性设计硕士研究，把政策解释、学校实践和教师判断之间的关系转化为产品团队可以使用的问题。", decisions: ["区分国家政策、校内指引与教师判断三个实施层级", "把学习质量和教师责任放在采用过程中心", "定位含糊、信任和流程设计影响实施的位置", "把产品启示写成可测试的问题"],
    workflow: [{label:"政策目标",detail:"指引希望学校和教师实现什么"},{label:"学校解释",detail:"把原则转化为可执行要求"},{label:"专业判断",detail:"教师结合场景作决定"},{label:"学习表现",detail:"判断AI使用如何影响学习质量"},{label:"反馈调整",detail:"用实施经验修订要求"}],
    evaluation: ["关注政策在使用现场是否容易理解。", "可从清晰度、决策负担、升级路径和信息质量评估工具。"], outcomes: ["建立分析政策目标与专业实践落差的结构。", "把AI采用拆解为指引、信任、工作流和责任之间的关系。", "形成可用于后续产品评估的问题。"], limitations: ["本页呈现研究设计，不发布参与者资料或研究结果。", "结论只适用于具体教育情境。"], learning: "AI采用是技术与组织共同作用的结果。责任不清或流程不合适时，强大的模型也很难真正落地。", capabilities: ["政策分析","利益相关者分析","组织采用","信任","评估设计","工作流分析"], relatedResearch: "剑桥大学教育学硕士（教育政策、领导力与改进）", featured: true
  },
  {
    slug: "formal-hall-networking-society-website", title: "Formal Hall Networking Society 网站", shortTitle: "FHNS网站", kicker: "0→1产品 · 系统提示词 · Agent协作交付", period: "2025–2026", organisation: "Formal Hall Networking Society", status: "已上线网站",
    summary: "我主导完成剑桥学生社团官网的设计与上线，把跨学院社区、创始历史、活动信息和加入入口整合为可长期维护的产品。", question: "如何把一个社区的历史、运营和加入方式整理成下一届团队也能维护的公开产品？", users: ["希望了解并加入协会的新成员", "查找活动信息的参与者", "负责后续运营与发布的委员会", "页面中提及但不代表背书的学院与场地"], constraints: ["只发布确认过的姓名、日期、照片和活动信息", "私人社群记录与参与者资料不进入网站", "清楚说明学生组织的独立身份", "网站需要轻量、易访问、易维护"],
    role: "我负责产品定位、用户与利益相关者分析、信息架构、内容层级、隐私要求、无障碍体验、响应式设计、部署和后续更新流程。", decisions: ["把需求定义为长期可用的公开产品", "明确可公开内容、AI可操作范围和完成标准", "将要求写成系统提示词，监督Codex完成实现", "亲自复核内容、设计、功能和发布结果", "采用便于换届维护的静态架构和交接文档"],
    workflow: [{label:"社区需求",detail:"跨学院网络需要稳定的公开身份"},{label:"产品定义",detail:"明确用户、目的和范围"},{label:"内容规则",detail:"确定事实、隐私和机构关系要求"},{label:"系统提示",detail:"把要求转换为Codex可执行指令"},{label:"协作开发",detail:"完成代码、响应式调整和重复任务"},{label:"人工QA",detail:"检查内容、设计、隐私和无障碍"},{label:"发布",detail:"通过GitHub Pages和自定义域名上线"},{label:"交接",detail:"为下一届委员会留下更新流程"}],
    evaluation: ["在桌面端和移动端检查布局、键盘操作、图片、内部链接和浏览器错误。", "我负责内容准确性、隐私、设计和最终验收。", "通过本地构建、Git检查和线上页面完成发布验证。"], outcomes: ["交付协会公开身份、创始年记录、加入入口和维护流程。", "网站已在camformal.com上线。", "跑通从问题定义、AI任务分配到QA、部署和交接的产品流程。"], limitations: ["网站运行时不使用生成式AI；AI用于开发过程。", "Codex负责辅助实现，产品目标和发布决定由我负责。"], learning: "清晰的任务范围和人工复核让AI开发更可靠。产品负责人需要决定做什么、为谁做，以及何时可以发布。", capabilities: ["问题定义","产品范围","信息架构","内容治理","隐私与机构风险","系统提示词","人机任务分配","AI辅助开发","无障碍与响应式QA","部署与维护"], links: [{href:"https://camformal.com/",label:"访问网站"},{href:"https://github.com/Simonxz578/formal-hall-networking-society",label:"公开代码仓库"}], featured: true
  }
];

export const featuredProjects = projects.filter((project) => project.featured);
