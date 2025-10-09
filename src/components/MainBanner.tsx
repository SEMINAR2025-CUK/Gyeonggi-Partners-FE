import { ArrowRight, Users, Lightbulb, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function MainBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            시민이 직접 해결책을 제안하는
          </h1>
          <h2 className="text-4xl font-bold text-blue-600 mb-6">
            경기 파트너스
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            단순한 문제 제기를 넘어, 시민과 지자체가 함께 솔루션을 만들어가는 
            새로운 시민참여 플랫폼입니다.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              솔루션 토의실 참여하기
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg">
              플랫폼 가이드 보기
            </Button>
          </div>
        </div>

        {/* Process cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card className="p-6 text-center bg-white shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-3">1. 의견 모으기</h3>
            <p className="text-gray-600">
              같은 문제를 겪고 있는 시민들이 모여 경험과 자료를 공유하며 
              집단 지성으로 문제의 본질을 파악합니다.
            </p>
          </Card>

          <Card className="p-6 text-center bg-white shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-3">2. 솔루션 제안서 작성</h3>
            <p className="text-gray-600">
              논의를 통해 구체적인 해결책을 담은 솔루션 제안서를 
              참여자 전원의 검토와 동의를 거쳐 완성합니다.
            </p>
          </Card>

          <Card className="p-6 text-center bg-white shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-3">3. 원클릭 제출</h3>
            <p className="text-gray-600">
              완성된 제안서를 클릭 한 번으로 정부 공식 민원 사이트에 
              바로 제출할 수 있습니다.
            </p>
          </Card>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">247</div>
            <div className="text-gray-600">활성 토의실</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">1,432</div>
            <div className="text-gray-600">참여 시민</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">89</div>
            <div className="text-gray-600">제출된 제안서</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">34</div>
            <div className="text-gray-600">해결된 문제</div>
          </div>
        </div>
      </div>
    </div>
  );
}