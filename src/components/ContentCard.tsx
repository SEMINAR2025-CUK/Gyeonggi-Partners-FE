import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Users, MessageSquare, Calendar, Building2, CheckCircle2, Clock } from "lucide-react";
import { Button } from "./ui/button";

export type ContentType = "discussion" | "proposal" | "completed";

export interface ContentCardData {
  id: string;
  title: string;
  description: string;
  category: string;
  region: string;
  status: string;
  createdAt: string;
  // 솔루션 토의실
  participants?: number;
  comments?: number;
  // 진행중인 제안
  submittedAt?: string;
  department?: string;
  // 완료된 프로젝트
  completedAt?: string;
  solution?: string;
}

interface ContentCardProps {
  data: ContentCardData;
  type: ContentType;
  onClick?: () => void;
}

export function ContentCard({ data, type, onClick }: ContentCardProps) {
  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      "토론중": "bg-blue-100 text-blue-700",
      "제안서작성중": "bg-purple-100 text-purple-700",
      "제출됨": "bg-green-100 text-green-700",
      "검토중": "bg-yellow-100 text-yellow-700",
      "답변대기": "bg-orange-100 text-orange-700",
      "해결완료": "bg-green-100 text-green-700",
      "기각": "bg-gray-100 text-gray-700",
    };
    return statusColors[status] || "bg-gray-100 text-gray-700";
  };

  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      "교통": "bg-blue-50 text-blue-700 border-blue-200",
      "환경": "bg-green-50 text-green-700 border-green-200",
      "안전": "bg-red-50 text-red-700 border-red-200",
      "문화": "bg-purple-50 text-purple-700 border-purple-200",
      "복지": "bg-pink-50 text-pink-700 border-pink-200",
      "경제": "bg-orange-50 text-orange-700 border-orange-200",
    };
    return categoryColors[category] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <Card 
      className="p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className={`${getCategoryColor(data.category)} border`}>
            {data.category}
          </Badge>
          <Badge variant="outline" className="text-gray-600">
            {data.region}
          </Badge>
          <Badge className={getStatusColor(data.status)}>
            {data.status}
          </Badge>
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-gray-900 line-clamp-2">
        {data.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-4 line-clamp-2">
        {data.description}
      </p>

      {/* Meta Information */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        {type === "discussion" && (
          <>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{data.createdAt}</span>
            </div>
          </>
        )}

        {type === "proposal" && (
          <>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>제출: {data.submittedAt}</span>
            </div>
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              <span>{data.department}</span>
            </div>
          </>
        )}

        {type === "completed" && (
          <>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>완료: {data.completedAt}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>제안: {data.createdAt}</span>
            </div>
          </>
        )}
      </div>

      {/* Action Button */}
      <Button 
        variant="outline" 
        className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
      >
        {type === "discussion" && "토의실 참여하기"}
        {type === "proposal" && "진행상황 보기"}
        {type === "completed" && "결과 보기"}
      </Button>
    </Card>
  );
}