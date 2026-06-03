export type CoreSkill = {
  name: string
  icon: string
  ctx: string
  badge: string
}

export type SkillItem = {
  name: string
  icon: string | null
  aura?: boolean
}

export type SkillGroup = {
  category: string
  items: SkillItem[]
}

export const coreSkills: CoreSkill[] = [
  { name: 'Java',        icon: 'devicon-java-plain',       ctx: 'Microservices · SOLID',           badge: '3.5 yrs commercial' },
  { name: 'Spring Boot', icon: 'devicon-spring-original',     ctx: 'RESTful · WebSocket · Hibernate', badge: '3.5 yrs commercial' },
  { name: 'Angular',     icon: 'devicon-angularjs-plain',  ctx: 'RxJS · NgRx · TypeScript',        badge: '1.5 yrs commercial' },
  { name: 'TypeScript',  icon: 'devicon-typescript-plain', ctx: 'Strict · SDK design',             badge: 'Daily driver'       },
  { name: 'PostgreSQL',  icon: 'devicon-postgresql-plain', ctx: 'Relational · Indexing · Queries', badge: 'Production'         },
  { name: 'Docker',      icon: 'devicon-docker-plain',     ctx: 'Compose · Swarm · CI/CD',         badge: 'Production'         },
  { name: 'Kubernetes',  icon: 'devicon-kubernetes-plain', ctx: 'Orchestration · Distributed',     badge: 'Production'         },
  { name: 'Python',      icon: 'devicon-python-plain',     ctx: 'ML · Vertex AI · LangChain',      badge: 'AI / ML'            },
]

export const experience = [
  {
    title: 'Full-Stack Software Engineer',
    company: 'Cuurios',
    period: 'Nov 2024 – Present',
    duration: '1.5 years',
    stack: ['Spring Boot 3', 'Java', 'Angular 20', 'MS SQL', 'AWS', 'Python', 'Kubernetes', 'GCloud Vertex AI'],
    bullets: [
      'Engineered a Java Structure of Arrays data model for an RCPSP solver, achieving 12× performance gains by minimising heap allocations on the hot path.',
      'Developed full-stack features including a TOML-based pipeline configuration module that reduced setup time and increased platform adaptability.',
      'Architected AI/ML solutions in Python with GCloud Vertex AI Gemini and built a LangChain-inspired query execution tool for automated training data generation.',
      'Led infrastructure modernisation: legacy migration, Kubernetes distributed execution pipelines, and client GCloud deployment.',
    ],
  },
  {
    title: 'Spring Boot Web Developer',
    company: 'Enigma Information Security Systems',
    period: 'Apr 2023 – Sep 2024',
    duration: '1.5 years',
    stack: ['Spring Framework', 'Hibernate', 'Querydsl', 'Docker Swarm', 'TeamCity', 'PKI'],
    bullets: [
      'Developed and maintained internal services for mass client, partner, and order management for digital signatures (PKI) using Spring Frameworks with Swagger-documented RESTful APIs.',
      'Built efficient data models using Hibernate and Querydsl.',
      'Managed development and testing environments using Docker Swarm and TeamCity.',
    ],
  },
  {
    title: 'Java Intern',
    company: 'Grid Dynamics',
    period: 'Aug 2022 – Feb 2023',
    duration: '6 months',
    stack: ['Spring Boot', 'Java', 'PostgreSQL'],
    bullets: [
      'Developed and maintained Spring Boot applications, enhancing functionality and performance.',
      'Utilised PostgreSQL for database management and data manipulation tasks.',
      'Collaborated with a corporate development team in a large-scale agile environment.',
    ],
  },
]

export const projects = [
  {
    title: 'Game Room Management Platform',
    shortTitle: 'GRMP',
    description:
      'A distributed, extensible gaming platform with a plugin architecture that lets games deploy at runtime without platform rebuilds.',
    stack: [
      'Java 25',
      'Spring Boot 4',
      'WebSocket / STOMP',
      'PostgreSQL',
      'Redis',
      'React 18',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'nginx',
      'JWT',
      'Docker',
      'Testcontainers',
    ],
    bullets: [
      'Designed an extensible game plugin system — games deploy at runtime without platform rebuilds; frontend games run as sandboxed iframes communicating via a custom TypeScript SDK and postMessage protocol.',
      'Built a distributed microservices backend (REST auth + stateful WebSocket game host) with JWT-secured inter-service communication and a React/TypeScript SPA for real-time lobby and gameplay.',
      'Containerised the full stack with Docker Compose (nginx, PostgreSQL, Redis) and an automated end-to-end deployment pipeline.',
      "Delivered Seven Wonders: Duel as a PoC plugin, validating the platform's ability to host complex, stateful turn-based games.",
    ],
    github: 'https://github.com/JayHubPL',
  },
]

export const skills: SkillGroup[] = [
  {
    category: 'Backend',
    items: [
      { name: 'Java',              icon: 'devicon-java-plain'           },
      { name: 'Spring Boot',       icon: 'devicon-spring-original'         },
      { name: 'Python',            icon: 'devicon-python-plain'         },
      { name: 'Hibernate',         icon: null                           },
      { name: 'Querydsl',          icon: null                           },
      { name: 'nginx',             icon: 'devicon-nginx-original'          },
      { name: 'REST APIs',         icon: null                           },
      { name: 'WebSocket',         icon: null                           },
      { name: 'Swagger / OpenAPI', icon: null                           },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'Angular',      icon: 'devicon-angularjs-plain'   },
      { name: 'React',        icon: 'devicon-react-original'    },
      { name: 'TypeScript',   icon: 'devicon-typescript-plain'  },
      { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-original' },
      { name: 'Vite',         icon: 'devicon-vitejs-plain'      },
      { name: 'HTML',         icon: 'devicon-html5-plain'       },
      { name: 'CSS',          icon: 'devicon-css3-plain'        },
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain'              },
      { name: 'MS SQL',     icon: 'devicon-microsoftsqlserver-plain'       },
      { name: 'MongoDB',    icon: 'devicon-mongodb-plain'                 },
      { name: 'Redis',      icon: 'devicon-redis-plain'                   },
    ],
  },
  {
    category: 'DevOps & Cloud',
    items: [
      { name: 'Docker',          icon: 'devicon-docker-plain'                    },
      { name: 'Kubernetes',      icon: 'devicon-kubernetes-plain'                },
      { name: 'Terraform',       icon: 'devicon-terraform-plain'                 },
      { name: 'Ansible',         icon: 'devicon-ansible-plain',    aura: true    },
      { name: 'AWS',             icon: 'devicon-amazonwebservices-plain-wordmark' },
      { name: 'Azure',           icon: 'devicon-azure-plain'                     },
      { name: 'GCloud',          icon: 'devicon-googlecloud-plain'               },
      { name: 'GitHub Actions',  icon: 'devicon-github-original',  aura: true    },
      { name: 'GitLab CI',       icon: null                                      },
      { name: 'Jenkins',         icon: null                                      },
    ],
  },
  {
    category: 'Other',
    items: [
      { name: 'Git',                icon: 'devicon-git-plain'       },
      { name: 'Agile / Scrum / XP', icon: null                     },
      { name: 'C++',                icon: 'devicon-cplusplus-plain' },
      { name: 'Rust',               icon: 'devicon-rust-original',     aura: true },
      { name: 'Haskell',            icon: 'devicon-haskell-plain'  },
    ],
  },
]

export const education = [
  {
    degree: "Master's in Software Engineering",
    institution: 'University of Amsterdam',
    period: 'Sep 2024 – Present',
    note: 'Thesis writing',
  },
  {
    degree: 'Bachelor of Computer Science',
    institution: 'Warsaw University of Technology',
    period: 'Oct 2020 – Feb 2024',
    note: 'Summa Cum Laude',
  },
]

export const certificates = [
  { name: 'CAE C2 English Certificate', issuer: 'British Council' },
  { name: 'AZ-900 Azure Fundamentals', issuer: 'Microsoft' },
  { name: 'Lakehouse Fundamentals', issuer: 'Databricks' },
]

export const contact = {
  email: 'mazurhubert.praca@gmail.com',
  phone: '+31 645059919',
  location: 'Amsterdam, Netherlands',
  linkedin: 'https://www.linkedin.com/in/hubert-mazur-34b5b8254',
  github: 'https://github.com/JayHubPL',
}
