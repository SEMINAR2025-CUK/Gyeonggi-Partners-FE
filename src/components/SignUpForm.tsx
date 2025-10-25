import { useState } from "react";

// 최소 필드만, 최소 검증만, 최소 UI로 적용,,
// 서버가 요구하는 페이로드 형식 { loginId, password, name, nickname, email, phoneNumber("010-1234-5678") }

const API_BASE = "http://localhost:8080";
await fetch(`${API_BASE}/signup`, {
  /* ... */
});
//요청 URL 주소 나올 경우 "http://localhost:8080"; 변경하기
//Base URL 설정 이후 env 파일 관리하면 좋음
//axios 객체 이용해서 리팩토링 예정

export default function SignupForm() {
  const [form, setForm] = useState({
    loginId: "",
    password: "",
    name: "",
    nickname: "",
    email: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    // 최소 required만 체크 추기 유효성ㅇ 검사 체크 필요!
    //zod를 이용한 검증 알고리즘 추가 예정
    const required = [
      "loginId",
      "password",
      "name",
      "nickname",
      "email",
      "phoneNumber",
    ] as const;
    for (const key of required) {
      if (!form[key].trim()) {
        setMsg("모든 항목을 입력해 주세요.");
        return;
      }
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          loginId: form.loginId,
          password: form.password,
          name: form.name,
          nickname: form.nickname,
          email: form.email,
          phoneNumber: form.phoneNumber, // 그대로 전송 (하이픈 포함한 값)
        }),
      });
      const data = await res.json();
      if (res.ok && data?.code === "SUCCESS") {
        setMsg(data.message || "회원가입에 성공했습니다.");
        // 입력 초기화
        setForm({
          loginId: "",
          password: "",
          name: "",
          nickname: "",
          email: "",
          phoneNumber: "",
        });
      } else {
        setMsg(data?.message || "회원가입에 실패했습니다.");
      }
    } catch (err) {
      setMsg("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 520, margin: "0 auto" }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>
        회원가입 (최소)
      </h1>
      <p style={{ color: "#64748b", marginBottom: 20 }}>
        아래 필드만 맞춰 전송합니다.
      </p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <div>
          <label
            htmlFor="loginId"
            style={{ display: "block", fontSize: 14, marginBottom: 6 }}
          >
            아이디
          </label>
          <input
            id="loginId"
            value={form.loginId}
            onChange={onChange}
            required
            placeholder="new_user"
            className="krds-input"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            style={{ display: "block", fontSize: 14, marginBottom: 6 }}
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
            placeholder="password123!"
            className="krds-input"
          />
        </div>

        <div>
          <label
            htmlFor="name"
            style={{ display: "block", fontSize: 14, marginBottom: 6 }}
          >
            이름
          </label>
          <input
            id="name"
            value={form.name}
            onChange={onChange}
            required
            placeholder="홍길동"
            className="krds-input"
          />
        </div>

        <div>
          <label
            htmlFor="nickname"
            style={{ display: "block", fontSize: 14, marginBottom: 6 }}
          >
            닉네임
          </label>
          <input
            id="nickname"
            value={form.nickname}
            onChange={onChange}
            required
            placeholder="길동이"
            className="krds-input"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            style={{ display: "block", fontSize: 14, marginBottom: 6 }}
          >
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            placeholder="hong@example.com"
            className="krds-input"
          />
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            style={{ display: "block", fontSize: 14, marginBottom: 6 }}
          >
            휴대폰 번호
          </label>
          <input
            id="phoneNumber"
            value={form.phoneNumber}
            onChange={onChange}
            required
            placeholder="010-1234-5678"
            className="krds-input"
          />
        </div>

        <button type="submit" className="krds-btn primary" disabled={loading}>
          {loading ? "처리 중..." : "회원가입"}
        </button>
      </form>

      {msg && (
        <div style={{ marginTop: 16 }}>
          <span className="krds-badge">{msg}</span>
        </div>
      )}
    </div>
  );
}
