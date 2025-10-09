import { Search, Menu, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface HeaderProps {
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export function Header({ 
  isLoggedIn = false, 
  onLoginClick, 
  onLogoutClick,
  onNavigate,
  currentPage = "main"
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      {/* Top utility bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-8 text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>시민참여 플랫폼</span>
              <span>•</span>
              <span>경기도청 공식 웹사이트</span>
            </div>
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <span className="text-blue-600">로그인됨</span>
                  <span>•</span>
                  <button onClick={onLogoutClick} className="hover:text-blue-600">로그아웃</button>
                </>
              ) : (
                <>
                  <button onClick={onLoginClick} className="hover:text-blue-600">로그인</button>
                  <span>•</span>
                  <button onClick={onLoginClick} className="hover:text-blue-600">회원가입</button>
                </>
              )}
              <span>•</span>
              <a href="#" className="hover:text-blue-600">사이트맵</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and site name */}
          <button 
            onClick={() => onNavigate?.("main")}
            className="flex items-center space-x-4 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">경</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">경기 파트너스</h1>
              <p className="text-sm text-gray-500">Gyeonggi Partners</p>
            </div>
          </button>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="솔루션 토의실 검색"
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>

          {/* User menu */}
          <div className="flex items-center space-x-2">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-1" />
                  내 활동
                </Button>
                <Button variant="ghost" size="sm" onClick={onLogoutClick}>
                  <LogOut className="w-4 h-4 mr-1" />
                  로그아웃
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" onClick={onLoginClick}>
                <User className="w-4 h-4 mr-1" />
                로그인
              </Button>
            )}
            <Button variant="ghost" size="sm">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 h-12 items-center">
            <button 
              onClick={() => onNavigate?.("main")}
              className={`text-white hover:text-blue-100 ${currentPage === "main" ? "font-bold" : ""}`}
            >
              홈
            </button>
            <button 
              onClick={() => onNavigate?.("discussions")}
              className={`text-white hover:text-blue-100 ${currentPage === "discussions" ? "font-bold" : ""}`}
            >
              솔루션 토의실
            </button>
            <button 
              onClick={() => onNavigate?.("proposals")}
              className={`text-white hover:text-blue-100 ${currentPage === "proposals" ? "font-bold" : ""}`}
            >
              진행중인 제안
            </button>
            <button 
              onClick={() => onNavigate?.("completed")}
              className={`text-white hover:text-blue-100 ${currentPage === "completed" ? "font-bold" : ""}`}
            >
              완료된 프로젝트
            </button>
            <button className="text-white hover:text-blue-100">가이드</button>
            <button className="text-white hover:text-blue-100">공지사항</button>
          </nav>
        </div>
      </div>
    </header>
  );
}