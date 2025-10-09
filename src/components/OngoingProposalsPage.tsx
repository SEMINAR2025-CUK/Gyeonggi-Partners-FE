import { ContentListLayout } from "./ContentListLayout";
import { ContentCardData } from "./ContentCard";
import { FilterOptions } from "./FilterSidebar";

const mockData: ContentCardData[] = [
  {
    id: "1",
    title: "광명시 철산역 무인택배함 추가 설치 제안",
    description: "철산역 주변 아파트 단지의 택배 수령 불편을 해소하기 위한 무인택배함 추가 설치를 제안합니다.",
    category: "복지",
    region: "광명시",
    status: "검토중",
    createdAt: "2025-09-28",
    submittedAt: "2025-10-01",
    department: "광명시청 주민복지과",
  },
  {
    id: "2",
    title: "시흥시 정왕동 보행자 전용도로 확충",
    description: "통학로 안전을 위한 보행자 전용도로 확충 및 신호등 추가 설치를 제안합니다.",
    category: "안전",
    region: "시흥시",
    status: "답변대기",
    createdAt: "2025-09-25",
    submittedAt: "2025-09-30",
    department: "시흥시청 도시계획과",
  },
  {
    id: "3",
    title: "파주시 운정신도시 공원 야간 조명 개선",
    description: "야간 공원 이용자의 안전을 위한 조명 시설 확충 및 개선을 요청합니다.",
    category: "안전",
    region: "파주시",
    status: "제출됨",
    createdAt: "2025-09-20",
    submittedAt: "2025-10-05",
    department: "파주시청 공원녹지과",
  },
  {
    id: "4",
    title: "화성시 동탄2신도시 자전거 도로 연결",
    description: "단절된 자전거 도로를 연결하여 안전한 자전거 이용 환경을 조성하자는 제안입니다.",
    category: "교통",
    region: "화성시",
    status: "검토중",
    createdAt: "2025-09-15",
    submittedAt: "2025-09-28",
    department: "화성시청 교통과",
  },
  {
    id: "5",
    title: "평택시 고덕국제신도시 도서관 확충",
    description: "인구 증가에 따른 도서관 부족 문제 해결을 위한 추가 도서관 건립을 제안합니다.",
    category: "문화",
    region: "평택시",
    status: "답변대기",
    createdAt: "2025-09-10",
    submittedAt: "2025-09-25",
    department: "평택시청 문화체육과",
  },
  {
    id: "6",
    title: "의왕시 내손동 소상공인 지원 프로그램 확대",
    description: "지역 소상공인의 경영 안정화를 위한 맞춤형 지원 프로그램 확대를 제안합니다.",
    category: "경제",
    region: "의왕시",
    status: "검토중",
    createdAt: "2025-09-05",
    submittedAt: "2025-09-20",
    department: "의왕시청 일자리경제과",
  },
];

const filters: FilterOptions = {
  categories: ["교통", "환경", "안전", "문화", "복지", "경제"],
  regions: ["광명시", "시흥시", "파주시", "화성시", "평택시", "의왕시", "하남시", "오산시"],
  statuses: ["제출됨", "검토중", "답변대기"],
};

interface OngoingProposalsPageProps {
  onCardClick?: (id: string) => void;
}

export function OngoingProposalsPage({ onCardClick }: OngoingProposalsPageProps) {
  return (
    <ContentListLayout
      title="진행중인 제안"
      description="정부에 제출된 솔루션 제안서의 처리 현황을 확인하고 진행 상황을 추적할 수 있습니다."
      type="proposal"
      data={mockData}
      filters={filters}
      onCardClick={onCardClick}
    />
  );
}