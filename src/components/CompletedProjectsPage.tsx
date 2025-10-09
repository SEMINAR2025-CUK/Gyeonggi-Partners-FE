import { ContentListLayout } from "./ContentListLayout";
import { ContentCardData } from "./ContentCard";
import { FilterOptions } from "./FilterSidebar";

const mockData: ContentCardData[] = [
  {
    id: "1",
    title: "안산시 고잔동 횡단보도 신호 시간 조정",
    description: "어르신들의 안전한 도로 횡단을 위해 신호 시간을 10초 연장하는 솔루션이 채택되어 완료되었습니다.",
    category: "안전",
    region: "안산시",
    status: "해결완료",
    createdAt: "2025-08-15",
    completedAt: "2025-09-30",
    solution: "횡단보도 보행자 신호 시간 10초 연장, CCTV 추가 설치",
  },
  {
    id: "2",
    title: "구리시 수택동 쓰레기 무단투기 방지",
    description: "주민 제안으로 CCTV와 안내판을 설치하여 무단투기가 95% 감소했습니다.",
    category: "환경",
    region: "구리시",
    status: "해결완료",
    createdAt: "2025-07-20",
    completedAt: "2025-09-25",
    solution: "CCTV 3대 설치, 경고 안내판 설치, 주민 자율 감시단 운영",
  },
  {
    id: "3",
    title: "양주시 덕정동 버스 노선 신설",
    description: "교통 사각지대 해소를 위한 버스 노선이 주민 제안으로 신설되었습니다.",
    category: "교통",
    region: "양주시",
    status: "해결완료",
    createdAt: "2025-07-01",
    completedAt: "2025-09-20",
    solution: "마을버스 노선 1개 신설, 배차 간격 15분",
  },
  {
    id: "4",
    title: "포천시 소흘읍 공공 와이파이 확대",
    description: "디지털 소외 지역에 무료 공공 와이파이를 설치하여 정보 접근성이 향상되었습니다.",
    category: "복지",
    region: "포천시",
    status: "해결완료",
    createdAt: "2025-06-15",
    completedAt: "2025-09-15",
    solution: "공공장소 10곳에 무료 와이파이 설치, 이용 안내 책자 배포",
  },
  {
    id: "5",
    title: "여주시 세종대왕릉 관광 안내 시스템 개선",
    description: "외국인 관광객을 위한 다국어 안내 시스템이 구축되었습니다.",
    category: "문화",
    region: "여주시",
    status: "해결완료",
    createdAt: "2025-06-01",
    completedAt: "2025-09-10",
    solution: "다국어 안내판 설치(한/영/중/일), 스마트폰 QR 가이드 도입",
  },
  {
    id: "6",
    title: "연천군 전곡읍 소상공인 공동 배송 시스템",
    description: "지역 소상공인들의 배송비 부담을 줄이는 공동 배송 시스템이 시범 운영되었으나 효과가 미미하여 종료되었습니다.",
    category: "경제",
    region: "연천군",
    status: "기각",
    createdAt: "2025-05-20",
    completedAt: "2025-09-05",
    solution: "3개월 시범 운영 후 참여율 저조(15%)로 사업 종료",
  },
];

const filters: FilterOptions = {
  categories: ["교통", "환경", "안전", "문화", "복지", "경제"],
  regions: ["안산시", "구리시", "양주시", "포천시", "여주시", "연천군", "가평군", "양평군"],
  statuses: ["해결완료", "기각"],
};

interface CompletedProjectsPageProps {
  onCardClick?: (id: string) => void;
}

export function CompletedProjectsPage({ onCardClick }: CompletedProjectsPageProps) {
  return (
    <ContentListLayout
      title="완료된 프로젝트"
      description="주민들의 제안으로 완료된 프로젝트들의 성과와 결과를 확인할 수 있습니다. 성공 사례를 통해 더 나은 제안을 만들어보세요."
      type="completed"
      data={mockData}
      filters={filters}
      onCardClick={onCardClick}
    />
  );
}