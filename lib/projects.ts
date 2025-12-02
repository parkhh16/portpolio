export type Project = {
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
  github?: string
  live?: string
  period?: string
  role?: string
  highlights?: string[]
  techStack?: string[]
  body?: string
  problem?: string
  solution?: string
  impact?: string
}

export const projects: Project[] = [
  {
    slug: "apilog",
    title: "APILog — Open-source AI Web Analytics",
    description: "AI 기반 자동 분석과 실시간 로그 시각화가 가능한 오픈소스 웹 분석 플랫폼",
    image: "/ApilogLogo.webp",
    tags: ["Real-time Analytics", "AI Integration", "Plugin System", "Dashboard"],
    github: "https://github.com/APIL0g/APILog",
    live: "https://github.com/APIL0g/APILog",
    period: "2025.10.13 - 2025.11.20 (5주)",
    role: "Full-stack / DevOps (풀스택·인프라 설계)",
    problem:
      "운영자는 수많은 로그와 대시보드를 가지고 있지만, '그래서 지금 서비스가 어떤 상태인지, 뭐가 문제인지'를 이해하기 위해 매번 수동으로 쿼리를 짜고 지표를 조합해야 했습니다.",
    solution:
      "LLM 기반 자동 리포트 생성, 플러그인 기반 위젯 구조, InfluxDB rollups로 실시간 데이터 수집·요약이 가능한 백엔드를 설계했습니다.",
    impact:
      "설치 후 바로 대시보드를 사용할 수 있고, 사이트 특성에 맞는 위젯과 AI 분석을 자동 생성할 수 있게 되었습니다.",
    highlights: [
      "FastAPI + InfluxDB 기반 데이터 파이프라인 설계",
      "Plugin 기반 대시보드 위젯 시스템 개발",
      "LLM 기반 자동 분석(AI Report) 기능 구현",
      "Docker Compose 기반 로컬·프로덕션 통합 환경 구축",
    ],
    techStack: ["FastAPI", "Python", "InfluxDB 3", "React", "TypeScript", "Vite", "Docker"],
    body: `서비스 로그를 수집해 AI 리포트와 커스텀 위젯을 자동으로 만들어주는 오픈소스 웹 분석 플랫폼입니다. FastAPI + InfluxDB 기반의 고성능 로그 수집/저장 구조를 설계하고, React 기반 대시보드와 AI 자동 분석 기능을 직접 개발했습니다. 플러그인 구조, 위젯 시스템, 실시간 롤업 파이프라인을 설계하여 한 번의 설치로 다양한 웹사이트를 분석할 수 있도록 만들었습니다.`,
  },
  {
    slug: "see-you-letter",
    title: "See You Letter — AI Digital Time Capsule",
    description:
      "음성으로 일상을 기록하면 AI가 감정을 분석해 편지를 만들고, NFT 형태의 디지털 타임캡슐로 선물할 수 있는 서비스",
    image: "/see_you_letter.png",
    tags: ["Voice Cloning", "AI Diary", "NFT Time Capsule", "CI/CD"],
    github: "https://github.com/SeeY0uLetter/SeeYouLetter",
    live: "https://github.com/SeeY0uLetter/SeeYouLetter",
    period: "2025.08.25 - 2025.09.29 (5주)",
    role: "인프라 / AI / 디자인",
    problem:
      "감정과 기억을 디지털로 보존하고, 원하는 시점에 소중한 사람에게 전달할 수 있는 방법이 필요했습니다.",
    solution:
      "Docker 기반 서비스 컨테이너화와 Jenkins 5단계 파이프라인으로 배포를 자동화하고, 음성 → STT → 감정/키워드 분석 → 편지 생성까지 이어지는 AI 기록 파이프라인을 설계했습니다. CosyVoice2 기반 Zero-shot 음성 복제로 10~30초 샘플만으로 자연스러운 목소리 편지를 생성할 수 있도록 구현했습니다.",
    impact:
      "편지 생성 API 응답 시간을 44초에서 15초로 66% 개선했고, 음성 복제 대기 시간을 30분~1시간에서 15초로 99% 단축했습니다. SSAFY 자율 프로젝트 우수상(2등)을 수상했습니다.",
    highlights: [
      "Docker/Jenkins 기반 CI/CD 파이프라인 구축으로 배포 시간 80% 단축",
      "음성 → STT → 감정/키워드 분석 → 편지 생성까지 이어지는 AI 기록 파이프라인 설계",
      "CosyVoice2 기반 Zero-shot 음성 복제로 자연스러운 한국어 목소리 구현",
      "디지털 타임캡슐 콘셉트에 맞는 감성적 UI/UX와 API 요구사항 정의",
    ],
    techStack: [
      "Spring Boot",
      "JPA",
      "MySQL",
      "FastAPI",
      "Docker",
      "Jenkins",
      "AWS EC2",
      "IPFS",
      "Ethereum(NFT)",
    ],
    body: `음성으로 일상을 기록하면 AI가 감정을 분석해 편지를 만들어주고, 이를 NFT 형태의 디지털 타임캡슐로 선물할 수 있는 서비스입니다. 음성 입력을 STT로 텍스트화한 뒤 감정/키워드 분석과 맞춤형 질문·편지 생성을 LLM으로 처리하는 파이프라인을 설계했습니다. 인프라, AI 파이프라인, UI/UX를 함께 담당하며 서비스 전체 흐름을 설계했습니다.`,
  },
  {
    slug: "galmal",
    title: "갈래말래 — 여행 그룹 정산 & 일정 관리 앱",
    description: "OCR 기반 자동 정산과 위치 기반 일정 관리를 제공하는 여행 지원 플랫폼",
    image: "/galmal.webp",
    tags: ["Trip Settlement", "Group Travel", "OCR", "LLM", "Scheduling"],
    period: "2024.03 – 2024.05 (약 2개월, 팀 프로젝트)",
    role: "Full-stack / Backend (정산 로직·DB 모델링·데이터 파이프라인 설계)",
    problem:
      "여행 정산 서비스들은 대부분 수기 입력에 의존해 정산 누락, 지각비 반영 실수, 역할 분담 오류 등이 자주 발생했습니다.",
    solution:
      "그룹 단위로 모든 여행 정보를 관리하는 단일 스키마 구조를 설계하고, OCR 기반 영수증 분석과 LLM 추론을 활용해 정산 과정을 자동화했습니다. MySQL과 MongoDB를 함께 사용하는 복합 구조에서도 정합성이 유지되도록 ID 설계와 직렬화를 정리했습니다.",
    impact:
      "영수증을 사진으로 올리는 것만으로 개인별 정산액·지각비가 자동 계산되고, 그룹 일정·역할·벌금·채팅 기능이 하나의 흐름으로 이어지도록 설계해 여행 운영 경험을 크게 단순화했습니다.",
    highlights: [
      "OCR → GPT 기반 정산 자동화 파이프라인 설계",
      "Group 단위 스키마 통합 (정산·일정·지각비·채팅 흐름 일원화)",
      "MySQL–MongoDB 직렬화 충돌 해결 (ID 불일치 문제 해결)",
    ],
    techStack: ["Spring Boot", "MySQL", "MongoDB", "React", "TypeScript", "Google Vision OCR", "OpenAI API"],
    body: `여행 중 발생하는 영수증 정산, 지각비 계산, 그룹 일정·위치 공유를 한 번에 해결하기 위해 OCR → LLM 분석 → 정산 로직 자동 반영이 가능한 백엔드를 설계했습니다.
MySQL과 MongoDB를 함께 사용하는 복합 구조에서 데이터 정합성을 유지하고, 정산/일정/채팅/벌금 기능을 하나의 그룹 스키마로 통합해 여행에서 자주 발생하는 '정산 꼬임'을 구조적으로 해결했습니다.`,
  },
]

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}

