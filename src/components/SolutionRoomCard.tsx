import { MessageCircle, Users, Clock, MapPin, Tag, ArrowRight } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface SolutionRoomCardProps {
  title: string;
  description: string;
  location: string;
  participants: number;
  messages: number;
  timeAgo: string;
  status: "논의중" | "제안서작성" | "제출완료";
  tags: string[];
  priority: "높음" | "보통" | "낮음";
  onClick?: () => void;
}

export function SolutionRoomCard({
  title,
  description,
  location,
  participants,
  messages,
  timeAgo,
  status,
  tags,
  priority,
  onClick
}: SolutionRoomCardProps) {
  const statusColors = {
    "논의중": "bg-blue-100 text-blue-800",
    "제안서작성": "bg-orange-100 text-orange-800",
    "제출완료": "bg-green-100 text-green-800"
  };

  const priorityColors = {
    "높음": "bg-red-100 text-red-800",
    "보통": "bg-yellow-100 text-yellow-800",
    "낮음": "bg-gray-100 text-gray-800"
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200" onClick={onClick}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={statusColors[status]}>{status}</Badge>
            <Badge className={priorityColors[priority]}>{priority}</Badge>
          </div>
          <h3 className="font-semibold text-lg text-gray-900 mb-2 leading-tight">
            {title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-3">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-500 mb-3">
        <MapPin className="w-4 h-4 mr-1" />
        <span className="mr-4">{location}</span>
        <Clock className="w-4 h-4 mr-1" />
        <span>{timeAgo}</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            <Tag className="w-3 h-3 mr-1" />
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{participants}명 접속중</span>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
          참여하기
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </Card>
  );
}