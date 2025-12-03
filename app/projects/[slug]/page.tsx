"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Calendar, User, Lightbulb, ExternalLink, Code } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getProjectBySlug } from "@/lib/projects"

type ChallengeItem = {
  problemTitle: string
  problem: string
  solutionTitle: string
  solution: string
}

type TechWhyItem = {
  title: string
  body: string
}

type LearningItem = {
  title: string
  body: string
}

export default function ProjectDetailPage() {
  const params = useParams()
  const slugParam = params?.slug
  const slug = typeof slugParam === "string" ? slugParam : Array.isArray(slugParam) ? slugParam[0] : ""
  const project = getProjectBySlug(slug)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            entry.target.classList.remove("opacity-0")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
        <h1 className="text-3xl font-bold mb-4">Project not found</h1>
        <p className="text-muted-foreground mb-8">요청하신 프로젝트를 찾을 수 없습니다.</p>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-[#6366F1] hover:text-[#6366F1] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to projects
        </Link>
      </div>
    )
  }

  const heroTitle = project.title
  const overviewText =
    project.body ??
    "기존 제품의 한계를 분석하고, 나만의 아키텍처와 사용자 경험을 설계하기 위해 진행한 프로젝트입니다."
  const period = project.period ?? "기간 미정"
  const role = project.role ?? "역할 정보 미정"
  const techBadges = project.techStack ?? project.tags ?? []
  const hasLive = Boolean(project.live) || slug === "galmal"
  const isLiveDemoReady = Boolean(project.live && project.live !== project.github)
  const hasGithub = Boolean(project.github) || slug === "galmal"

  const challenges: ChallengeItem[] = (() => {
    if (slug === "apilog") {
      return [
        {
          problemTitle: "Ollama 기반 JSON 리포트 불안정",
          problem:
            "로컬 Ollama 모델로 긴 JSON 리포트를 생성하려 했지만, 응답이 중간에 잘리거나 스키마가 깨져 안정적인 리포트 파이프라인을 만들기 어려웠습니다.",
          solutionTitle: "OpenAI SDK 기반 리포트 엔진으로 전환",
          solution:
            "리포트 JSON 스키마를 먼저 정의하고, OpenAI SDK로 응답을 생성한 뒤 스키마 기준으로 파싱·검증하는 구조로 전환해 항상 같은 형태의 리포트가 나오도록 만들었습니다.",
        },
        {
          problemTitle: "InfluxDB 스키마 설계 미스로 인한 타임아웃",
          problem:
            "path_raw를 필드로 저장해 페이지별 필터 쿼리가 인덱스를 전혀 타지 못했고, 리포트 요청마다 전체 스캔이 발생해 타임아웃과 CPU 100% 상황이 반복되었습니다.",
          solutionTitle: "시계열 스키마 재설계 및 쿼리 최적화",
          solution:
            "시계열 특성에 맞게 path_raw를 태그로 옮기고, 자주 조회되는 필드를 태그/필드로 재구성해 쿼리 경로를 최적화했습니다. 그 결과 리포트 생성이 타임아웃 내에 안정적으로 완료되도록 개선했습니다.",
        },
        {
          problemTitle: "플러그인 아키텍처 및 기여자 경험 설계",
          problem:
            "위젯·AI 인사이트 기능을 오픈소스 형태로 확장하고 싶었지만, 코어 코드와 확장 모듈의 경계가 모호해 외부 기여자가 구조를 이해하기 어려웠습니다.",
          solutionTitle: "코어/플러그인 분리와 컨트리뷰션 가이드 정리",
          solution:
            "코어/플러그인 레이어를 명확하게 분리하고, 플러그인 위젯이 구현해야 할 인터페이스와 라이프사이클을 문서화했습니다. 컨트리뷰션 가이드·커밋 컨벤션을 정리해 PR 플로우를 표준화했습니다.",
        },
      ]
    }

    if (slug === "see-you-letter") {
      return [
        {
          problemTitle: "편지 생성 품질 저하 및 응답 지연",
          problem:
            "하루치 회고 데이터를 한 번에 LLM에 넣어 편지를 만들자, 기계적인 요약 수준의 텍스트가 나오고 응답도 40초 이상 걸렸습니다.",
          solutionTitle: "역할 분리와 핵심 에피소드 중심 프롬프트 설계",
          solution:
            "감정/키워드 분석과 편지 생성을 분리하고, 전체 회고 중 핵심 에피소드만 편지 소재로 사용하도록 프롬프트를 설계해 품질과 응답 시간을 동시에 개선했습니다.",
        },
        {
          problemTitle: "GPU 학습 기반 음성 복제의 비용·시간 문제",
          problem:
            "사용자마다 별도 TTS 모델을 학습하는 방식은 학습 비용·시간이 과도해 실제 서비스 운영에 적합하지 않았습니다.",
          solutionTitle: "Zero-shot TTS로 전환 및 CosyVoice2 선정",
          solution:
            "Zero-shot TTS 접근으로 전환하고 여러 모델을 비교한 끝에, 한국어 억양/톤이 가장 자연스러운 CosyVoice2를 선택했습니다. 10~30초 샘플만으로 목소리 편지를 생성하는 파이프라인을 구성했습니다.",
        },
        {
          problemTitle: "GPU 워커·MinIO·LLM 간 파이프라인 안정성",
          problem:
            "GPU 워커가 MinIO를 폴링하면서 긴 편지를 처리하는 과정에서, 토큰 에러와 중복 합성 문제가 발생했습니다.",
          solutionTitle: "Chunking·Idempotent 처리로 안정화",
          solution:
            "텍스트를 문장/글자 단위로 Chunking해 배치 처리하고, 해시 기반 완료 마커를 두어 같은 요청이 재합성되지 않도록 설계해 제한된 GPU 환경에서도 안정적으로 동작하도록 만들었습니다.",
        },
      ]
    }

    if (slug === "galmal") {
      return [
        {
          problemTitle: "영수증 중복 업로드로 인한 정산 꼬임",
          problem:
            "같은 영수증을 여러 번 업로드해도 구분할 수 있는 키가 없어, 정산 금액이 중복 반영되거나 상태가 꼬이는 문제가 발생했습니다.",
          solutionTitle: "tracking ID와 고유 제약 추가",
          solution:
            "영수증마다 tracking ID를 부여하고 DB 레벨에서 고유 제약을 걸어, 중복 업로드를 사전에 차단했습니다. 업로드 단계에서 충돌을 감지해 사용자에게 바로 피드백하도록 설계했습니다.",
        },
        {
          problemTitle: "MySQL–MongoDB 간 ID 직렬화 불일치",
          problem:
            "그룹 채팅방 ID를 MySQL에서는 문자열, MongoDB에서는 ObjectId로 관리하면서 두 시스템 간 참조가 어긋나 기능 연동이 불안정했습니다.",
          solutionTitle: "그룹 스키마 기준의 ID 정책 통일",
          solution:
            "groups 테이블의 chat_room_id를 기준 키로 삼고, MongoDB에도 문자열 기반 ID를 사용하도록 직렬화 규칙을 통일해 정산·일정·채팅이 하나의 그룹 키로 묶이게 했습니다.",
        },
        {
          problemTitle: "정산·지각비·일정 데이터 흐름 단절",
          problem:
            "정산, 지각비, 일정, 역할 데이터가 서로 다른 스키마에 흩어져 있어 한 그룹의 상태를 한 번에 파악하기 어렵고, 누락/불일치가 자주 발생했습니다.",
          solutionTitle: "그룹 단위 단일 컨텍스트 스키마 설계",
          solution:
            "“여행 그룹”을 단일 컨텍스트로 보고, 정산·일정·지각비·채팅이 모두 그룹 ID를 중심으로 연결되도록 스키마를 재설계해 데이터 흐름을 단순화했습니다.",
        },
      ]
    }

    return [
      {
        problemTitle: "기능·성능·UX 간 균형 맞추기",
        problem:
          "새로운 기능을 빠르게 추가하면서도 성능과 사용자 경험을 동시에 유지하는 것이 항상 어려운 과제였습니다.",
        solutionTitle: "우선순위 재조정과 점진적 개선",
        solution:
          "핵심 플로우를 먼저 안정화하고, 모니터링 지표를 기준으로 병목 지점을 하나씩 개선하는 식으로 점진적인 리팩토링을 진행했습니다.",
      },
      {
        problemTitle: "초기 설계가 커진 스코프를 따라가지 못함",
        problem:
          "처음에 가볍게 잡았던 구조가 기능이 늘어나면서 한계가 드러나고, 수정 비용이 점점 커지는 문제가 있었습니다.",
        solutionTitle: "폴더 구조와 책임 재정의",
        solution:
          "도메인 중심으로 폴더 구조와 레イヤ를 다시 나누고, 컴포넌트·서비스·훅의 책임 범위를 재정의해 이후 개발 속도를 회복했습니다.",
      },
      {
        problemTitle: "협업 시 규칙 부재로 인한 코드 스타일 혼선",
        problem:
          "팀원마다 다른 스타일과 패턴을 사용하면서 PR 리뷰 시간이 길어지고, 코드 일관성이 떨어졌습니다.",
        solutionTitle: "코딩 컨벤션과 리뷰 규칙 수립",
        solution:
          "Lint/Format 설정과 함께 PR 템플릿·리뷰 체크리스트를 도입해 협업 시 서로 기대하는 기준을 명확히 했습니다.",
      },
    ]
  })()

  const techWhyItems: TechWhyItem[] = (() => {
    if (slug === "apilog") {
      return [
        {
          title: "FastAPI & Python",
          body: "로그 수집 API와 AI 리포트 엔드포인트를 빠르게 구축하기 위해 FastAPI를 사용하고, Python 생태계의 데이터/AI 라이브러리로 실험과 프로토타이핑 속도를 높였습니다.",
        },
        {
          title: "InfluxDB 3",
          body: "대량의 이벤트 로그를 시계열로 저장하고 롤업/집계를 빠르게 처리하기 위해 InfluxDB 3를 사용했습니다. 태그/필드 설계를 통해 쿼리 성능과 표현력을 동시에 확보했습니다.",
        },
        {
          title: "React + TypeScript + Vite + Docker Compose",
          body: "대시보드는 React + TypeScript + Vite로 구현해 개발 경험과 런타임 성능을 챙겼고, Docker Compose로 API·DB·프론트엔드를 한 번에 올릴 수 있는 로컬/운영 일관 환경을 구성했습니다.",
        },
      ]
    }

    if (slug === "see-you-letter") {
      return [
        {
          title: "Spring Boot + JPA + MySQL",
          body: "사용자, 편지, 타임캡슐 데이터를 안정적으로 관리하기 위해 Spring Boot + JPA + MySQL 조합으로 관계형 모델과 트랜잭션을 명확히 가져갔습니다.",
        },
        {
          title: "Docker + Jenkins + AWS EC2",
          body: "Docker로 서비스 전체를 컨테이너화하고 Jenkins 파이프라인(Source → Build → Test → Dockerize → Deploy)으로 배포를 자동화했으며, AWS EC2에 배포해 실제 운영 환경에서 검증했습니다.",
        },
        {
          title: "IPFS + Ethereum(NFT) + CosyVoice2",
          body: "편지·음성을 장기 보존하고 소유권을 표현하기 위해 IPFS + NFT 조합을 사용했고, 감성적인 목소리 편지를 위해 CosyVoice2 기반 Zero-shot 음성 합성을 도입했습니다.",
        },
      ]
    }

    if (slug === "galmal") {
      return [
        {
          title: "Spring Boot + MySQL",
          body: "정산, 지각비, 일정처럼 관계와 제약이 중요한 데이터를 안정적으로 관리하기 위해 Spring Boot + MySQL 조합을 사용해 정산 로직과 트랜잭션을 명확히 했습니다.",
        },
        {
          title: "MongoDB",
          body: "여행 중 채팅 로그처럼 양이 많고 구조가 유연한 데이터를 저장하기 위해 MongoDB를 사용했습니다. ObjectId 기반 타임라인 정렬과 실시간 기능 구현에 유리했습니다.",
        },
        {
          title: "Google Vision OCR + OpenAI API",
          body: "영수증 인식과 항목 정규화에는 Google Vision OCR을, 금액 분배·텍스트 정리·예외 처리에는 OpenAI API를 사용해 ‘영수증 사진 한 장으로 정산이 끝나는 경험’을 목표로 구현했습니다.",
        },
      ]
    }

    return [
      {
        title: "Next.js & React",
        body: "SSR/SSG와 클라이언트 렌더링을 상황에 맞게 선택할 수 있어, 초기 로딩과 상호작용 성능을 모두 챙길 수 있었습니다.",
      },
      {
        title: "TypeScript",
        body: "규모가 커질수록 타입 안정성이 중요해지기 때문에, 도메인 모델을 타입으로 잡아두고 리팩토링 시 안전망을 확보했습니다.",
      },
      {
        title: "Docker 기반 개발 환경",
        body: "로컬과 서버 환경을 최대한 비슷하게 맞추기 위해 Docker를 사용해, 환경 차이로 인한 버그를 줄였습니다.",
      },
    ]
  })()

  const learningItems: LearningItem[] = (() => {
    if (slug === "apilog") {
      return [
        {
          title: "시계열 스키마 설계가 곧 성능이다",
          body: "태그/필드 설계가 쿼리 성능과 비용에 직접적인 영향을 준다는 걸 체감했고, 시계열 DB는 초기에 워크로드를 가정하고 스키마를 신중하게 설계해야 한다는 교훈을 얻었습니다.",
        },
        {
          title: "LLM 파이프라인은 모델보다 구조가 중요하다",
          body: "어떤 모델을 쓰느냐보다 JSON 스키마·파싱·에러 핸들링을 어떻게 설계하느냐가 안정성과 운영 비용에 훨씬 큰 영향을 준다는 걸 배웠습니다.",
        },
        {
          title: "오픈소스를 전제로 한 아키텍처 설계",
          body: "처음부터 플러그인 구조와 기여자 경험을 고려해 구조를 잡으면, 이후 기능 확장과 외부 기여를 받을 때 훨씬 수월하다는 걸 느꼈습니다.",
        },
      ]
    }

    if (slug === "see-you-letter") {
      return [
        {
          title: "LLM 역할 분리가 품질과 속도를 동시에 올린다",
          body: "분석·질문 생성·편지 작성을 하나의 모델에 몰아넣기보다, 역할을 분리하고 모델을 다르게 가져가는 편이 응답 속도와 내용 품질을 동시에 잡을 수 있다는 걸 경험했습니다.",
        },
        {
          title: "Zero-shot TTS는 실서비스에 적합한 접근",
          body: "사용자마다 모델을 따로 학습하는 방식보다 Zero-shot TTS를 활용하는 것이 비용·시간·운영 복잡도 측면에서 훨씬 현실적인 선택이라는 걸 배웠습니다.",
        },
        {
          title: "인프라·AI·UX를 함께 보는 시야",
          body: "CI/CD, AI 파이프라인, UX를 모두 직접 만져보면서 어느 한쪽만 좋아서는 실제 사용자에게 만족스러운 경험을 줄 수 없다는 걸 체감했습니다.",
        },
      ]
    }

    if (slug === "galmal") {
      return [
        {
          title: "이종 DB 환경에서의 정합성 유지",
          body: "MySQL과 MongoDB를 함께 사용할 때는 ID 정책과 직렬화 규칙을 초기에 명확히 정의해야 한다는 걸 배웠습니다.",
        },
        {
          title: "도메인 중심 스키마가 UX를 단순하게 만든다",
          body: "정산/일정/채팅을 따로 보는 대신 ‘여행 그룹’이라는 도메인 기준으로 스키마를 설계하자, 코드 구조와 사용자 경험이 함께 단순해졌습니다.",
        },
        {
          title: "AI를 입힌 정산 경험 설계",
          body: "OCR과 LLM을 그냥 붙이는 것만으로는 부족하고, 사용자가 ‘사진만 올렸는데 다 끝났다’고 느끼게 만드는 플로우와 예외 처리 설계가 중요하다는 걸 깨달았습니다.",
        },
      ]
    }

    return [
      {
        title: "기본 설계가 프로젝트 수명을 좌우",
        body: "초기에 잡은 폴더 구조와 레이어링이 프로젝트 후반의 개발 속도와 유지보수성을 크게 좌우한다는 걸 다시 한번 느꼈습니다.",
      },
      {
        title: "데이터 모델 먼저, 화면은 그 다음",
        body: "UI부터 만들기보다, 먼저 데이터 모델과 도메인 규칙을 정리하면 변경에 훨씬 강한 구조가 된다는 걸 배웠습니다.",
      },
      {
        title: "문서화와 기록의 힘",
        body: "문제와 해결 과정을 짧게라도 기록해두면, 비슷한 문제를 다시 만났을 때 해결 속도가 크게 빨라진다는 걸 체감했습니다.",
      },
    ]
  })()

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold hover:text-[#6366F1] transition-colors">
            Portfolio
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm hover:text-[#6366F1] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Projects
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-8 overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={project.image || "/placeholder.jpg"}
            alt={project.title}
            className="w-full h-full object-cover opacity-15"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <div className="mb-16">
            <h1 className="text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-on-scroll opacity-0">
              {heroTitle}
            </h1>

            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mb-10 animate-on-scroll opacity-0">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-6 animate-on-scroll opacity-0">
              {hasLive && (
                <a
                  href={isLiveDemoReady && project.live ? project.live : "#"}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-colors ${
                    isLiveDemoReady
                      ? "bg-[#6366F1] text-white hover:bg-[#6366F1]/90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                  onClick={(e) => {
                    if (!isLiveDemoReady) {
                      e.preventDefault()
                      alert("데모 준비중입니다.")
                    }
                  }}
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </a>
              )}

              {hasGithub && (
                <a
                  href={project.github || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-card border-2 border-border rounded-full font-semibold hover:border-[#6366F1] transition-colors"
                  onClick={(e) => {
                    if (slug === "galmal") {
                      e.preventDefault()
                      alert("준비 중입니다.")
                    }
                  }}
                >
                  <Code className="w-5 h-5" />
                  View Code
                </a>
              )}
            </div>

            <div className="mt-4 inline-flex items-center gap-4 px-5 py-2 rounded-full bg-background/85 border border-border/70 shadow-sm backdrop-blur-md text-xs md:text-sm text-muted-foreground animate-on-scroll opacity-0">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">{period}</span>
              </div>
              <span className="text-muted-foreground/60">·</span>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{role}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Tech Stack strip */}
      {techBadges.length > 0 && (
        <section className="py-8 px-8">
          <div className="max-w-6xl mx-auto animate-on-scroll opacity-0">
            <div className="flex flex-col gap-4">
              <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-3">
                {techBadges.map((tech) => (
                  <Badge
                    key={tech}
                    className="text-sm md:text-base px-4 py-2 bg-background/80 text-foreground border border-border hover:border-[#6366F1]/60 hover:bg-background transition-colors"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* See You Letter 전용 GIF 프리뷰 */}
      {slug === "see-you-letter" && (
        <section className="py-12 px-8">
          <div className="max-w-6xl mx-auto animate-on-scroll opacity-0">
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Experience Flow</h3>
                <p className="text-muted-foreground">
                  편지 열기, 감정 캘린더, 회고 화면까지 이어지는 실제 인터랙션을 GIF로 담았습니다.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  { title: "Open Letter", src: "/OpenLetter.gif" },
                  { title: "Calendar", src: "/Calendar.gif" },
                  { title: "Retrospective", src: "/Retrospective.gif" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-border bg-card/60 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="aspect-[4/5] w-full bg-muted">
                      <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 text-center bg-background/80 border-t border-border/60">
                      <span className="text-lg font-semibold">{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* See You Letter 전용 GIF 프리뷰 */}
      {slug === "see-you-letter" && (
        <section className="py-12 px-8">
          <div className="max-w-6xl mx-auto animate-on-scroll opacity-0">
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Experience Flow</h3>
                <p className="text-muted-foreground">
                  편지 열기, 감정 캘린더, 회고 화면까지 이어지는 실제 인터랙션을 GIF로 담았습니다.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  { title: "Open Letter", src: "/OpenLetter.gif" },
                  { title: "Calendar", src: "/Calendar.gif" },
                  { title: "Retrospective", src: "/Retrospective.gif" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-border bg-card/60 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="aspect-[4/5] w-full bg-muted">
                      <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 text-center bg-background/80 border-t border-border/60">
                      <span className="text-lg font-semibold">{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 갈래말래 전용 이미지 프리뷰 */}
      {slug === "galmal" && (
        <section className="py-12 px-8">
          <div className="max-w-6xl mx-auto animate-on-scroll opacity-0">
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Group Experience</h3>
                <p className="text-muted-foreground">
                  그룹 생성부터 일정 관리, 그룹 정산 화면까지 핵심 흐름을 캡처했습니다.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  { title: "Group First Page", src: "/group_first_page.png" },
                  { title: "Group Photo", src: "/group_photo.png" },
                  { title: "Group Pay", src: "/GroupPay.png" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-border bg-card/60 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="aspect-[4/5] w-full bg-muted">
                      <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 text-center">
                      <span className="text-lg font-semibold">{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* APILog 전용 튜토리얼 GIF */}
      {slug === "apilog" && (
        <section className="pb-12 px-8">
          <div className="max-w-6xl mx-auto animate-on-scroll opacity-0">
            <div className="rounded-3xl overflow-hidden border border-border/60 bg-card/50">
              <img
                src="/dashboard-tutorial-1_kr.gif"
                alt={`${heroTitle} dashboard tutorial`}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Overview */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl lg:text-6xl font-bold mb-12 animate-on-scroll opacity-0">
            Project <span className="text-[#6366F1]">Overview</span>
          </h2>
          <p className="text-xl lg:text-2xl leading-relaxed text-muted-foreground animate-on-scroll opacity-0">
            {overviewText}
          </p>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-20 px-8 bg-gradient-to-b from-transparent to-[#6366F1]/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl lg:text-6xl font-bold mb-12 animate-on-scroll opacity-0">
            Key <span className="text-[#6366F1]">Achievements</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 animate-on-scroll opacity-0">
            {project.impact && (
              <div className="p-10 rounded-3xl bg-card border border-border hover:shadow-2xl hover:border-[#6366F1]/50 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-3">Business Impact</h3>
                <p className="text-muted-foreground leading-relaxed">{project.impact}</p>
              </div>
            )}
            {project.highlights?.[0] && (
              <div className="p-10 rounded-3xl bg-card border border-border hover:shadow-2xl hover:border-[#6366F1]/50 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-3">Key Highlight</h3>
                <p className="text-muted-foreground leading-relaxed">{project.highlights[0]}</p>
              </div>
            )}
            {project.highlights?.[1] && (
              <div className="p-10 rounded-3xl bg-card border border-border hover:shadow-2xl hover:border-[#6366F1]/50 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-3">Key Highlight</h3>
                <p className="text-muted-foreground leading-relaxed">{project.highlights[1]}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Significance */}
      <section className="py-20 px-8 bg-gradient-to-b from-transparent to-[#6366F1]/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl lg:text-6xl font-bold mb-12 animate-on-scroll opacity-0">
            Project <span className="text-[#6366F1]">Significance</span>
          </h2>

          <div className="p-12 rounded-3xl bg-gradient-to-br from-[#6366F1]/10 via-purple-500/5 to-blue-500/10 border border-[#6366F1]/20 hover:shadow-2xl transition-all duration-300 animate-on-scroll opacity-0">
            <p className="text-xl leading-relaxed text-muted-foreground mb-6">
              {project.problem ??
                "기존 서비스의 한계를 극복하고, 현대적인 기술 스택을 활용해 사용자 경험과 개발 생산성을 함께 끌어올리는 것을 목표로 한 프로젝트입니다."}
            </p>
            {project.solution && (
              <p className="text-xl leading-relaxed text-muted-foreground">{project.solution}</p>
            )}
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl lg:text-6xl font-bold mb-16 animate-on-scroll opacity-0">
            Challenges & <span className="text-[#6366F1]">Solutions</span>
          </h2>

          <div className="space-y-16">
            {challenges.map((item, index) => (
              <div key={index} className="grid lg:grid-cols-2 gap-8 animate-on-scroll opacity-0">
                <div className="p-10 rounded-3xl bg-card border-2 border-red-500/20 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-lg font-bold text-red-600">
                      {index + 1}
                    </div>
                    <div className="text-sm font-semibold text-red-600 uppercase tracking-wider">Problem</div>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{item.problemTitle}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">{item.problem}</p>
                </div>

                <div className="p-10 rounded-3xl bg-card border-2 border-[#6366F1]/20 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#6366F1]/20 flex items-center justify-center text-lg font-bold text-[#6366F1]">
                      {index + 1}
                    </div>
                    <div className="text-sm font-semibold text-[#6366F1] uppercase tracking-wider">Solution</div>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{item.solutionTitle}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack & Why */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl lg:text-6xl font-bold mb-12 animate-on-scroll opacity-0">
            Tech Stack & <span className="text-[#6366F1]">Why</span>
          </h2>

          <div className="space-y-10 animate-on-scroll opacity-0">
            {techWhyItems.map((item) => (
              <div
                key={item.title}
                className="p-10 rounded-3xl bg-card border border-border hover:border-[#6366F1]/50 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Learnings */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl lg:text-6xl font-bold mb-16 animate-on-scroll opacity-0">
            Key <span className="text-[#6366F1]">Learnings</span>
          </h2>

          <div className="space-y-8">
            {learningItems.map((item) => (
              <div
                key={item.title}
                className="p-10 rounded-3xl bg-gradient-to-br from-[#6366F1]/10 to-transparent border border-[#6366F1]/20 hover:shadow-2xl transition-all duration-300 animate-on-scroll opacity-0"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Lightbulb className="w-8 h-8 text-[#6366F1]" />
                  <h3 className="text-3xl font-bold">{item.title}</h3>
                </div>
                <p className="text-xl leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-16 px-8 border-t">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-muted-foreground">© 2025 Portfolio. All rights reserved.</div>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-[#6366F1] hover:underline font-medium"
          >
            View All Projects
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </footer>
    </div>
  )
}
