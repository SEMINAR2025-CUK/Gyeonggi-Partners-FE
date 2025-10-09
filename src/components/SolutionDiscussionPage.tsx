import { ContentListLayout } from "./ContentListLayout";
import { ContentCardData } from "./ContentCard";
import { FilterOptions } from "./FilterSidebar";

const mockData: ContentCardData[] = [
  {
    id: "1",
    title: "부천역 BJ 스트리머로 인한 소음 및 환경 문제 해결방안",
    description: "부천역 주변에서 활동하는 BJ들로 인해 소음공해와 주변 환경이 더러워지는 문제에 대한 해결책을 함께 논의합니다.",
    category: "환경",
    region: "부천시",
    status: "토론중",
    createdAt: "2025-10-06",
    participants: 124,
    comments: 89,
  },
  {
    id: "2",
    title: "수원시 영통구 야간 주차난 해결 방안",
    description: "영통구 아파트 단지 주변 야간 주차 공간 부족 문제를 개선하기 위한 주민 주도 솔루션을 모색합니다.",
    category: "교통",
    region: "수원시",
    status: "제안서작성중",
    createdAt: "2025-10-05",
    participants: 67,
    comments: 45,
  },
  {
    id: "3",
    title: "성남시 분당구 어린이 놀이터 안전 개선",
    description: "노후화된 놀이터 시설의 안전 점검 및 개선이 필요합니다. 주민들의 의견을 모아 구체적인 개선안을 작성하고 있습니다.",
    category: "안전",
    region: "성남시",
    status: "토론중",
    createdAt: "2025-10-04",
    participants: 89,
    comments: 56,
  },
  {
    id: "4",
    title: "안양시 평촌 문화거리 활성화 프로젝트",
    description: "평촌 문화거리의 공실 증가와 활력 저하 문제를 해결하기 위한 지역 상인 및 주민 협력 방안을 논의합니다.",
    category: "문화",
    region: "안양시",
    status: "토론중",
    createdAt: "2025-10-03",
    participants: 156,
    comments: 102,
  },
  {
    id: "5",
    title: "용인시 수지구 독거노인 돌봄 서비스 확대",
    description: "수지구 독거노인 증가에 따른 돌봄 서비스의 사각지대를 해소하기 위한 주민 참여형 솔루션을 개발합니다.",
    category: "복지",
    region: "용인시",
    status: "제안서작성중",
    createdAt: "2025-10-02",
    participants: 78,
    comments: 34,
  },
  {
    id: "6",
    title: "고양시 일산 전통시장 활성화 및 청년 창업 지원",
    description: "일산 전통시장의 경쟁력 강화와 청년 창업 유치를 위한 복합 솔루션을 주민과 상인이 함께 만들어갑니다.",
    category: "경제",
    region: "고양시",
    status: "토론중",
    createdAt: "2025-10-01",
    participants: 203,
    comments: 145,
  },
];

const filters: FilterOptions = {
  categories: ["교통", "환경", "안전", "문화", "복지", "경제"],
  regions: ["부천시", "수원시", "성남시", "안양시", "용인시", "고양시", "의정부시", "남양주시"],
  statuses: ["토론중", "제안서작성중"],
};

interface SolutionDiscussionPageProps {
  onCardClick?: (id: string) => void;
}

export function SolutionDiscussionPage({ onCardClick }: SolutionDiscussionPageProps) {
  return (
    <ContentListLayout
      title="솔루션 토의실"
      description="지역 문제를 함께 논의하고 해결책을 만들어가는 공간입니다. 관심있는 토의실에 참여하여 의견을 나누세요."
      type="discussion"
      data={mockData}
      filters={filters}
      onCardClick={onCardClick}
    />
  );
}