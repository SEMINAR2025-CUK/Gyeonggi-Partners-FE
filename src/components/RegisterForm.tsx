import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Eye, EyeOff, UserPlus, CheckCircle, AlertCircle } from "lucide-react";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onRegisterSuccess: () => void;
}

export function RegisterForm({ onSwitchToLogin, onRegisterSuccess }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    phone: "",
    region: "",
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.username.length < 4) {
      newErrors.username = "아이디는 4자 이상이어야 합니다";
    }

    if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
    }

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요";
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "올바른 이메일 주소를 입력해주세요";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "연락처를 입력해주세요";
    }

    if (!formData.region) {
      newErrors.region = "거주지역을 선택해주세요";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "이용약관에 동의해주세요";
    }

    if (!formData.agreePrivacy) {
      newErrors.agreePrivacy = "개인정보처리방침에 동의해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("회원가입 시도:", formData);
      onRegisterSuccess();
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Card className="shadow-lg border-0 max-w-lg mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-gray-900">경기 파트너스 회원가입</CardTitle>
        <CardDescription className="text-gray-600">
          지역 문제 해결의 파트너가 되어주세요
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 기본 정보 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">기본 정보</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">아이디 *</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="4자 이상"
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  className={`h-11 ${errors.username ? "border-red-500" : ""}`}
                />
                {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">이름 *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="실명 입력"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={`h-11 ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호 *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="8자 이상, 영문+숫자+특수문자"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className={`h-11 pr-10 ${errors.password ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">비밀번호 확인 *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="비밀번호 재입력"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  className={`h-11 pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* 연락처 정보 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">연락처 정보</h3>
            
            <div className="space-y-2">
              <Label htmlFor="email">이메일 *</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`h-11 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">연락처 *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={`h-11 ${errors.phone ? "border-red-500" : ""}`}
                />
                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="region">거주지역 *</Label>
                <Select value={formData.region} onValueChange={(value) => handleChange("region", value)}>
                  <SelectTrigger className={`h-11 ${errors.region ? "border-red-500" : ""}`}>
                    <SelectValue placeholder="지역 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="수원시">수원시</SelectItem>
                    <SelectItem value="성남시">성남시</SelectItem>
                    <SelectItem value="고양시">고양시</SelectItem>
                    <SelectItem value="용인시">용인시</SelectItem>
                    <SelectItem value="부천시">부천시</SelectItem>
                    <SelectItem value="안산시">안산시</SelectItem>
                    <SelectItem value="안양시">안양시</SelectItem>
                    <SelectItem value="남양주시">남양주시</SelectItem>
                    <SelectItem value="화성시">화성시</SelectItem>
                    <SelectItem value="평택시">평택시</SelectItem>
                    <SelectItem value="other">기타</SelectItem>
                  </SelectContent>
                </Select>
                {errors.region && <p className="text-xs text-red-500">{errors.region}</p>}
              </div>
            </div>
          </div>

          {/* 약관 동의 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">약관 동의</h3>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => handleChange("agreeTerms", checked as boolean)}
                  className={errors.agreeTerms ? "border-red-500" : ""}
                />
                <div className="flex-1">
                  <Label htmlFor="agreeTerms" className="text-sm">
                    [필수] 이용약관에 동의합니다
                  </Label>
                  <button type="button" className="text-xs text-blue-600 hover:underline ml-2">
                    내용보기
                  </button>
                </div>
              </div>
              {errors.agreeTerms && <p className="text-xs text-red-500 ml-6">{errors.agreeTerms}</p>}
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onCheckedChange={(checked) => handleChange("agreePrivacy", checked as boolean)}
                  className={errors.agreePrivacy ? "border-red-500" : ""}
                />
                <div className="flex-1">
                  <Label htmlFor="agreePrivacy" className="text-sm">
                    [필수] 개인정보 수집·이용에 동의합니다
                  </Label>
                  <button type="button" className="text-xs text-blue-600 hover:underline ml-2">
                    내용보기
                  </button>
                </div>
              </div>
              {errors.agreePrivacy && <p className="text-xs text-red-500 ml-6">{errors.agreePrivacy}</p>}
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreeMarketing"
                  checked={formData.agreeMarketing}
                  onCheckedChange={(checked) => handleChange("agreeMarketing", checked as boolean)}
                />
                <div className="flex-1">
                  <Label htmlFor="agreeMarketing" className="text-sm text-gray-600">
                    [선택] 마케팅 정보 수신에 동의합니다
                  </Label>
                  <button type="button" className="text-xs text-blue-600 hover:underline ml-2">
                    내용보기
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">회원가입 안내</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li>모든 개인정보는 암호화되어 안전하게 보관됩니다</li>
                  <li>실명 인증 후 솔루션 토의실 참여가 가능합니다</li>
                  <li>부적절한 사용 시 계정이 제한될 수 있습니다</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 pt-4">
            <Button type="submit" className="w-full h-12 bg-green-600 hover:bg-green-700">
              회원가입
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full h-12"
              onClick={onSwitchToLogin}
            >
              이미 계정이 있으신가요? 로그인
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}