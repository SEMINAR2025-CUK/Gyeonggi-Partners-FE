import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { Eye, EyeOff, Shield, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // ✅ 추가

// .env에 VITE_API_BASE_URL이 있으면 사용, 없으면 EC2 기본값
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://3.39.207.166:8080";

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onLoginSuccess?: () => void; //  선택값으로 변경 로그인 동작 성공시 넘겨줌 (없어도 동작)
}

export function LoginForm({  onLoginSuccess }: LoginFormProps) {//LoginFormProps 타입을 따르는 props를 받음
  const navigate = useNavigate(); 

  const [showPassword, setShowPassword] = useState(false); //비밀번호 보이게
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleChange = (field: string, value: string | boolean) => {//폼 여러 필드 값 업데이트
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {//제출용 핸들러
    e.preventDefault();
    setMsg(null);

    if (!formData.loginId.trim() || !formData.password.trim()) {
      setMsg("아이디와 비밀번호를 입력해 주세요.");
      return;
    }

    setLoading(true); //로그인 api 호출
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          loginId: formData.loginId,
          password: formData.password,
        }),
      });

      const text = await res.text().catch(() => "");
      let data: any = null;
      //안전한 파싱을 위에서 텍스트로 받고, 이후 가능하면 json 변환
      try { data = text ? JSON.parse(text) : null; } catch {}

      if (!res.ok) {
        setMsg((data && (data.message || data.error || data.msg)) || `로그인 실패 (${res.status})`);
        return;
      }

      // JWT 토큰 케이스 저장(있을 때만)
      const accessToken = data?.accessToken || data?.token || data?.jwt || null;
      if (accessToken) {
        const storage = formData.rememberMe ? localStorage : sessionStorage;
        storage.setItem("accessToken", accessToken);
      }

      setMsg("로그인 성공!");
      if (typeof onLoginSuccess === "function") onLoginSuccess(); // (옵션) 부모 콜백
      navigate("/", { replace: true }); //  여기서 바로 홈으로 이동
    } catch (err) {
      setMsg("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-gray-900">경기 파트너스 로그인</CardTitle>
        <CardDescription className="text-gray-600">
          시민과 지역이 함께하는 협력적 거버넌스 플랫폼
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="loginId">아이디</Label>
            <Input
              id="loginId"
              type="text"
              placeholder="아이디를 입력하세요"
              value={formData.loginId}
              onChange={(e) => handleChange("loginId", e.target.value)}
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
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => handleChange("rememberMe", checked === true)}
              />
              <Label htmlFor="remember" className="text-sm text-gray-600">
                로그인 상태 유지
              </Label>
            </div>
            <button type="button" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
              비밀번호 찾기
            </button>
          </div>

          <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700" disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </Button>
        </form>

        {msg && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
            {msg}
          </div>
        )}

        <div className="relative">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">또는</span>
          </div>
        </div>

        <div className="space-y-3">
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
                  <li>브라우저 종료 시 자동 로그아웃될 수 있습니다</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
