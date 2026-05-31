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

export const skills = [
  {
    category: 'Backend',
    items: ['Java', 'Spring Boot', 'Spring Framework', 'Python', 'Microservices', 'nginx', 'REST APIs'],
  },
  {
    category: 'Frontend',
    items: ['Angular', 'React', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS', 'Vite'],
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'MS SQL', 'MongoDB', 'Redis', 'Hibernate', 'Querydsl'],
  },
  {
    category: 'DevOps & Cloud',
    items: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'GCloud', 'GitHub Actions', 'GitLab CI', 'Jenkins'],
  },
  {
    category: 'Other',
    items: ['Git', 'WebSocket', 'JWT', 'Swagger / OpenAPI', 'Agile / Scrum', 'C++', 'Haskell', 'Rust'],
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
