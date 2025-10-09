import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Users, Calendar, FileText, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  ConversationHeader,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

interface DiscussionRoomDetailProps {
  onBack: () => void;
}

interface ChatMessage {
  id: string;
  message: string;
  sender: string;
  direction: "incoming" | "outgoing";
  timestamp: string;
  avatarSrc?: string;
}

export function DiscussionRoomDetail({ onBack }: DiscussionRoomDetailProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      message: "안녕하세요! 야간 버스 노선 확대에 대해 논의하고 싶습니다.",
      sender: "김민준",
      direction: "incoming",
      timestamp: "10:30",
    },
    {
      id: "2",
      message: "저도 이 문제에 관심이 많습니다. 특히 수원역에서 광교 방면이 필요해요.",
      sender: "이서연",
      direction: "incoming",
      timestamp: "10:32",
    },
    {
      id: "3",
      message: "좋은 의견입니다. 심야에 귀가하는 시민들을 위해 꼭 필요한 것 같아요.",
      sender: "나",
      direction: "outgoing",
      timestamp: "10:35",
    },
    {
      id: "4",
      message: "통계 자료를 보니 심야 시간대 택시 이용률이 매우 높더라고요. 버스 노선이 있다면 경제적 부담도 줄일 수 있을 것 같습니다.",
      sender: "박준호",
      direction: "incoming",
      timestamp: "10:38",
    },
    {
      id: "5",
      message: "구체적으로 어떤 노선들이 필요할까요? 수요조사를 해볼 필요가 있을 것 같습니다.",
      sender: "최유진",
      direction: "incoming",
      timestamp: "10:40",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textContent: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      message: textContent,
      sender: "나",
      direction: "outgoing",
      timestamp: new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMessage]);
    setInputValue("");

    // 타이핑 시뮬레이션
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responseMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: "좋은 의견 감사합니다! 함께 구체적인 제안서를 만들어봅시다.",
        sender: "김민준",
        direction: "incoming",
        timestamp: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, responseMessage]);
    }, 2000);
  };

  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      "교통": "bg-blue-50 text-blue-700 border-blue-200",
    };
    return categoryColors[category] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="mb-4 text-gray-600 hover:text-gray-900"
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        목록으로 돌아가기
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chat Area */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden border border-gray-200">
            {/* Room Header */}
            <div className="bg-white border-b border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge className={`${getCategoryColor("교통")} border`}>
                  교통
                </Badge>
                <Badge variant="outline" className="text-gray-600">
                  수원시
                </Badge>
                <Badge className="bg-blue-100 text-blue-700">토론중</Badge>
              </div>
              <h2 className="text-gray-900 mb-2">
                야간 버스 노선 확대 필요성
              </h2>
              <p className="text-gray-600">
                심야 시간대 대중교통 이용 불편을 해소하기 위한 야간 버스 노선 확대가 필요합니다.
              </p>
            </div>

            {/* Chat Container */}
            <div style={{ position: "relative", height: "600px" }}>
              <MainContainer>
                <ChatContainer>
                  <ConversationHeader>
                    <ConversationHeader.Content
                      userName="실시간 토론"
                      info="모두가 함께 의견을 나누는 공간입니다"
                    />
                  </ConversationHeader>
                  <MessageList
                    typingIndicator={
                      isTyping ? <TypingIndicator content="입력 중..." /> : null
                    }
                  >
                    {messages.map((msg) => (
                      <Message
                        key={msg.id}
                        model={{
                          message: msg.message,
                          sentTime: msg.timestamp,
                          sender: msg.sender,
                          direction: msg.direction,
                          position: "single",
                        }}
                      >
                        {msg.direction === "incoming" && (
                          <Avatar
                            name={msg.sender}
                            src={msg.avatarSrc}
                            style={{ width: "32px", height: "32px" }}
                          />
                        )}
                        <Message.Header sender={msg.sender} sentTime={msg.timestamp} />
                      </Message>
                    ))}
                  </MessageList>
                  <MessageInput
                    placeholder="의견을 입력하세요..."
                    onSend={handleSend}
                    attachButton={false}
                    value={inputValue}
                    onChange={(val) => setInputValue(val)}
                  />
                </ChatContainer>
              </MainContainer>
            </div>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Discussion Info */}
          <Card className="p-6 border border-gray-200">
            <h3 className="mb-4 text-gray-900">토의 정보</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>생성일: 2025.01.15</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span>현재 접속: 8명</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FileText className="w-4 h-4" />
                <span>진행 단계: 의견 수렴</span>
              </div>
            </div>
          </Card>

          {/* Quick Summary */}
          <Card className="p-6 border border-gray-200">
            <h3 className="mb-4 text-gray-900">핵심 의견 요약</h3>
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-700">
                  • 수원역 ↔ 광교 노선 필요
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-700">
                  • 심야 택시 이용 부담 감소
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-700">
                  • 수요조사 실시 필요
                </p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <Card className="p-6 border border-gray-200">
            <h3 className="mb-4 text-gray-900">다음 단계</h3>
            <div className="space-y-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                제안서 작성하기
              </Button>
              <Button variant="outline" className="w-full border-gray-300">
                토의 요약 다운로드
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
