import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { Eye, EyeOff, Shield, AlertCircle } from "lucide-react";

import { Link } from "react-router-dom"; // 라우팅

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onLoginSuccess: () => void;
}

export function LoginForm({
  onSwitchToRegister,
  onLoginSuccess,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 로그인 로직 구현 시 이 부분을 대체
    console.log("로그인 시도:", formData);
    onLoginSuccess();
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-gray-900">
          경기 파트너스 로그인
        </CardTitle>
        <CardDescription className="text-gray-600">
          시민과 지역이 함께하는 협력적 거버넌스 플랫폼
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">아이디</Label>
            <Input
              id="username"
              type="text"
              placeholder="아이디를 입력하세요"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className="h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="h-12 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) =>
                  handleChange("rememberMe", checked as boolean)
                }
              />
              <Label htmlFor="remember" className="text-sm text-gray-600">
                로그인 상태 유지
              </Label>
            </div>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              비밀번호 찾기
            </button>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700"
          >
            로그인
          </Button>
        </form>

        <div className="relative">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">또는</span>
          </div>
        </div>

        <div className="space-y-3">
          {/* 회원가입 버튼 누르면 회원가입 페이지로 이동 */}
          <Button asChild variant="outline" className="w-full h-12">
            <Link to="/signup">회원가입</Link>
          </Button>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">보안 안내</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li>공공장소에서는 로그인 후 반드시 로그아웃하세요</li>
                  <li>비밀번호는 정기적으로 변경해주세요</li>
                  <li>
                    개인정보 보호를 위해 브라우저 종료 시 자동 로그아웃됩니다
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-xs text-gray-500">
            회원가입 시{" "}
            <button className="text-blue-600 hover:underline">이용약관</button>{" "}
            및{" "}
            <button className="text-blue-600 hover:underline">
              개인정보처리방침
            </button>
            에 동의한 것으로 간주됩니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
