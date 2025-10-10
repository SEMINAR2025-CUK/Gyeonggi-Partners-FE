import { useState } from "react";
import { Search, Filter, Plus, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { SolutionRoomCard } from "./SolutionRoomCard";
import { Badge } from "./ui/badge";

interface SolutionRoomListProps {
  onRoomClick?: (id: string) => void;
}

export function SolutionRoomList({ onRoomClick }: SolutionRoomListProps = {}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [statusFilter, setStatusFilter] = useState("all");

  const sampleRooms = [
    {
      id: "room-1",
      title: "부천역 BJ 방송으로 인한 소음공해 및 환경 개선 방안",
      description: "부천역 일대에서 개인방송(BJ) 촬영으로 인한 소음 문제와 쓰레기 투기 문제가 심각해지고 있습니다. 상인들과 주민들의 고충이 커지고 있어 근본적인 해결책이 필요한 상황입니다.",
      location: "부천시 소사구",
      participants: 23,
      messages: 47,
      timeAgo: "2시간 전",
      status: "논의중" as const,
      tags: ["소음공해", "환경개선", "상권보호"],
      priority: "높음" as const
    },
    {
      id: "room-2", // id 추가
      title: "어린이 놀이터 안전시설 개선 및 관리 방안",
      description: "우리 동네 어린이 놀이터의 노후된 시설물과 안전 문제를 개선하기 위한 구체적인 방안을 논의하고 있습니다. 부모님들의 적극적인 참여를 바랍니다.",
      location: "성남시 분당구",
      participants: 31,
      messages: 89,
      timeAgo: "5시간 전",
      status: "제안서작성" as const,
      tags: ["어린이안전", "놀이시설", "관리개선"],
      priority: "높음" as const
    },
    {
      id: "room-3", // id 추가
      title: "도시농업 활성화를 위한 옥상정원 조성 프로젝트",
      description: "도심 속 녹지공간 확보와 시민들의 도시농업 참여를 위한 공공건물 옥상정원 조성 방안을 함께 만들어보려고 합니다.",
      location: "수원시 영통구",
      participants: 18,
      messages: 34,
      timeAgo: "1일 전",
      status: "논의중" as const,
      tags: ["도시농업", "녹지조성", "환경개선"],
      priority: "보통" as const
    },
    {
      id: "room-4", // id 추가
      title: "대중교통 접근성 개선을 위한 버스 노선 신설 제안",
      description: "신도시 지역의 교통 불편을 해소하기 위한 새로운 버스 노선 계획이 주민들의 의견을 바탕으로 완성되어 제출되었습니다.",
      location: "화성시 동탄",
      participants: 67,
      messages: 134,
      timeAgo: "3일 전",
      status: "제출완료" as const,
      tags: ["대중교통", "접근성", "노선개선"],
      priority: "높음" as const
    },
    {
      id: "room-5", // id 추가
      title: "전통시장 활성화를 위한 디지털 마케팅 플랫폼 구축",
      description: "지역 전통시장의 경쟁력 강화와 젊은 고객층 유치를 위한 온라인 플랫폼 구축 방안을 논의하고 있습니다.",
      location: "안양시 만안구",
      participants: 15,
      messages: 28,
      timeAgo: "2일 전",
      status: "논의중" as const,
      tags: ["전통시장", "디지털전환", "지역경제"],
      priority: "보통" as const
    },
    {
      id: "room-6", // id 추가
      title: "반려동물 동반 가능한 공원 조성 및 시설 개선",
      description: "반려동물과 함께 이용할 수 있는 공원 시설과 관련 편의시설 설치에 대한 구체적인 계획을 세우고 있습니다.",
      location: "고양시 일산서구",
      participants: 42,
      messages: 76,
      timeAgo: "6시간 전",
      status: "제안서작성" as const,
      tags: ["반려동물", "공원시설", "편의개선"],
      priority: "보통" as const
    }
  ];

  const filteredRooms = sampleRooms.filter(room => {
    const matchesSearch = room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || room.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">솔루션 토의실</h2>
          <p className="text-gray-600">시민들이 함께 만들어가는 지역 문제 해결 공간</p>
        </div>
        <Button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          새 토의실 만들기
        </Button>
      </div>

      {/* Trending topics */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <div className="flex items-center mb-3">
          <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
          <span className="font-medium text-blue-900">인기 토의 주제</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {["교통개선", "환경보호", "안전시설", "문화시설", "주차문제", "소음공해"].map((topic) => (
            <Badge key={topic} variant="secondary" className="cursor-pointer hover:bg-blue-100">
              {topic}
            </Badge>
          ))}
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="토의실 제목, 내용, 태그로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="상태 필터" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 상태</SelectItem>
              <SelectItem value="논의중">논의중</SelectItem>
              <SelectItem value="제안서작성">제안서작성</SelectItem>
              <SelectItem value="제출완료">제출완료</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="정렬" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">최신순</SelectItem>
              <SelectItem value="participants">참여자순</SelectItem>
              <SelectItem value="messages">댓글순</SelectItem>
              <SelectItem value="priority">우선순위순</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-600">
          총 <span className="font-medium text-blue-600">{filteredRooms.length}</span>개의 토의실
        </p>
      </div>

      {/* Room cards */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        {filteredRooms.map((room, index) => (
          <SolutionRoomCard key={index} {...room} onClick={() => onRoomClick?.(room.id)} />
        ))}
      </div>

      {/* Load more */}
      {filteredRooms.length > 0 && (
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            더 많은 토의실 보기
          </Button>
        </div>
      )}
    </div>
  );
}