import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { Separator } from "./ui/separator";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Platform info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">경</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">경기 파트너스</h3>
                <p className="text-sm text-gray-600">시민참여형 문제해결 플랫폼</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              경기도민과 지자체가 함께 만들어가는 새로운 시민참여 플랫폼입니다. 
              단순한 문제 제기를 넘어 구체적인 해결책을 함께 모색하고 실현해나갑니다.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>경기도 수원시 영통구 도청로 30</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>031-8008-1234</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>partners@gyeonggi.go.kr</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">빠른 메뉴</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600">솔루션 토의실</a></li>
              <li><a href="#" className="hover:text-blue-600">진행중인 제안</a></li>
              <li><a href="#" className="hover:text-blue-600">완료된 프로젝트</a></li>
              <li><a href="#" className="hover:text-blue-600">이용 가이드</a></li>
              <li><a href="#" className="hover:text-blue-600">FAQ</a></li>
              <li><a href="#" className="hover:text-blue-600">공지사항</a></li>
            </ul>
          </div>

          {/* Related sites */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">관련 사이트</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 flex items-center">
                  경기도청
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 flex items-center">
                  국민신문고
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 flex items-center">
                  정부민원포털
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 flex items-center">
                  시민참여플랫폼
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 flex items-center">
                  정보공개포털
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="flex flex-wrap items-center space-x-4 mb-4 md:mb-0">
            <span>© 2024 경기도청. All rights reserved.</span>
            <a href="#" className="hover:text-blue-600">개인정보처리방침</a>
            <a href="#" className="hover:text-blue-600">이용약관</a>
            <a href="#" className="hover:text-blue-600">저작권정책</a>
            <a href="#" className="hover:text-blue-600">웹접근성</a>
          </div>
          <div className="text-xs text-gray-400">
            <span>본 사이트는 대한민국 정부의 공식 웹사이트입니다.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}