import { useEffect, useState } from "react";

//추후 환경변수 설정 예정 현재는 EC2 기본값을 url 주소로 설정
const API_BASE =
  (import.meta as any)?.env?.VITE_API_BASE_URL ?? "http://3.39.207.166:8080";

/** JSON 파싱 실패시 화면에서 파싱 오류 던짐*/
async function parseJsonSafe(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

/** 이메일 인증번호 발송 */
async function sendEmailCode(email: string) {
  const res = await fetch(`${API_BASE}/api/users/email/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const json = await (async () => {
    try {
      return await res.json();
    } catch {
      return null;
    }
  })();
  if (!res.ok) {
    const msg =
      json?.message || json?.error || `이메일 인증번호 발송 실패 (${res.status})`;
    throw new Error(msg);
  }
  return { message: json?.message ?? "인증번호를 발송했습니다. (유효시간 5분)" };
}

/** 이메일 인증번호 검증 */
async function verifyEmailCode(email: string, code: string) {
  const res = await fetch(`${API_BASE}/api/users/email/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  const json = await (async () => {
    try {
      return await res.json();
    } catch {
      return null;
    }
  })();
  if (!res.ok) {
    const msg =
      json?.message || json?.error || `인증번호 검증 실패 (${res.status})`;
    throw new Error(msg);
  }
  return { message: json?.message ?? "이메일 인증이 완료되었습니다." };
}

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

  // 이메일 인증 관련 상태
  const [emailMsg, setEmailMsg] = useState<string | null>(null);
  const [emailLoading, setEmailLoading] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [leftSec, setLeftSec] = useState(0); // 5분 카운트다운

  // 타이머
  useEffect(() => {
    if (leftSec <= 0) return;
    const t = setInterval(() => setLeftSec((s) => s - 1), 1000);// 발송 성공 시 5분 카운팅 시작
    return () => clearInterval(t); //검증 성공 시 setLeftSec(0)으로 즉시 정지
  }, [leftSec]);

  // 인풋 변경
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
  };

  // 인증번호 발송
  const handleSendCode = async () => {
    setEmailMsg(null);
    setVerified(false);
    if (!form.email.trim()) {
      setEmailMsg("이메일을 입력해 주세요.");
      return;
    }
    setEmailLoading(true);
    try {
      const { message } = await sendEmailCode(form.email.trim());
      setEmailMsg(message);
      setLeftSec(300); // 5분
    } catch (e: any) {
      setEmailMsg(e?.message || "인증번호 발송 중 오류가 발생했습니다.");
    } finally {
      setEmailLoading(false);
    }
  };

  // 인증번호 검증
  const handleVerifyCode = async () => {
    setEmailMsg(null);
    if (!verifyCode.trim()) {
      setEmailMsg("인증번호 6자리를 입력해 주세요.");
      return;
    }
    setEmailLoading(true);
    try {
      const { message } = await verifyEmailCode(
        form.email.trim(),
        verifyCode.trim()
      );
      setEmailMsg(message);
      setVerified(true);
      setLeftSec(0);
    } catch (e: any) {
      setVerified(false);
      setEmailMsg(e?.message || "인증번호가 올바르지 않습니다.");
    } finally {
      setEmailLoading(false);
    }
  };

  // 회원가입
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    // 최소 required만 체크
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

    if (!verified) {
      setMsg("이메일 인증을 완료해 주세요.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        // 세션-쿠키 방식이면 필요:
        // credentials: "include",
      });

      // 서버가 항상 JSON을 주지 않을 수 있어 안전 처리
      const data: any = await parseJsonSafe(res);

      if (!res.ok) {
        setMsg(
          (data && (data.message || data.error || data.msg)) ||
            `회원가입 실패 (${res.status})`
        );
        return;
      }

      setMsg(data?.message ?? "회원가입에 성공했습니다.");

      // 초기화
      setForm({
        loginId: "",
        password: "",
        name: "",
        nickname: "",
        email: "",
        phoneNumber: "",
      });
      setVerifyCode("");
      setVerified(false);
      setLeftSec(0);
      setEmailMsg(null);
    } catch (err: any) {
      setMsg(`네트워크/파싱 오류: ${String(err?.message || err)}`);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div style={{ padding: 24, maxWidth: 560, margin: "0 auto" }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>
        회원가입
      </h1>
      <p style={{ color: "#64748b", marginBottom: 20 }}>
        이메일 인증 후 가입이 완료됩니다.
      </p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <div>
          <label htmlFor="loginId" style={{ display: "block", fontSize: 14, marginBottom: 6 }}>
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
          <label htmlFor="password" style={{ display: "block", fontSize: 14, marginBottom: 6 }}>
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
            placeholder="8자 이상, 특수문자 포함 권장"
            className="krds-input"
          />
        </div>

        <div>
          <label htmlFor="name" style={{ display: "block", fontSize: 14, marginBottom: 6 }}>
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
          <label htmlFor="nickname" style={{ display: "block", fontSize: 14, marginBottom: 6 }}>
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
          <label htmlFor="email" style={{ display: "block", fontSize: 14, marginBottom: 6 }}>
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => {
              // 이메일 바뀌면 인증 초기화 이메일만 따로 onCHange를 둔 이유
              setForm((f) => ({ ...f, email: e.target.value }));
              setVerified(false);
              setVerifyCode("");
              setLeftSec(0);
              setEmailMsg(null);
            }}
            required
            placeholder="hong@example.com"
            className="krds-input"
          />

          <div style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center", flexWrap: "wrap" }}>
            <button type="button" onClick={handleSendCode} disabled={emailLoading || !form.email}>
              {leftSec > 0
                ? `재전송 (${Math.floor(leftSec / 60)}:${String(leftSec % 60).padStart(2, "0")})`
                : "인증번호 발송"}
            </button>

            <input
              placeholder="인증번호 6자리"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              maxLength={6}
              style={{ width: 140 }}
              className="krds-input"
            />

            <button type="button" onClick={handleVerifyCode} disabled={emailLoading || !verifyCode}>
              인증 확인
            </button>
          </div>

          {verified && (
            <small style={{ color: "#16a34a", display: "block", marginTop: 6 }}>✔ 이메일 인증 완료</small>
          )}
          {emailMsg && (
            <div style={{ marginTop: 6, color: "#2563eb" }}>{emailMsg}</div>
          )}
        </div>

        <div>
          <label htmlFor="phoneNumber" style={{ display: "block", fontSize: 14, marginBottom: 6 }}>
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

        <button type="submit" className="krds-btn primary" disabled={loading || !verified}>
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
