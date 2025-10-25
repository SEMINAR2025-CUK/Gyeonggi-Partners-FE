import { useState } from "react";
import { Header } from "./components/Header";
import { MainBanner } from "./components/MainBanner";
import { SolutionRoomList } from "./components/SolutionRoomList";
import { Footer } from "./components/Footer";
import { AuthLayout } from "./components/AuthLayout";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { SolutionDiscussionPage } from "./components/SolutionDiscussionPage";
import { OngoingProposalsPage } from "./components/OngoingProposalsPage";
import { CompletedProjectsPage } from "./components/CompletedProjectsPage";
import { DiscussionRoomDetail } from "./components/DiscussionRoomDetail";
import { PageType } from "./types/types.ts";

import SignupForm from "./components/SignUpForm.tsx"; //회원가입 엔드포인트 확인용
// import { Button } from '@krds-ui/core'

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("main");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedDiscussionId, setSelectedDiscussionId] = useState<
    string | null
  >(null);

  console.log(selectedDiscussionId); // 임시 (추후 삭제 예정)

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("main");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("main");
  };

  const handleRegisterSuccess = () => {
    setCurrentPage("login");
  };

  const handleDiscussionClick = (id: string) => {
    setSelectedDiscussionId(id);
    setCurrentPage("discussionDetail");
  };

  if (currentPage === "login") {
    return (
      <AuthLayout>
        <LoginForm
          onSwitchToRegister={() => setCurrentPage("register")}
          onLoginSuccess={handleLogin}
        />
      </AuthLayout>
    );
  }

  if (currentPage === "register") {
    return (
      <AuthLayout>
        <RegisterForm
          onSwitchToLogin={() => setCurrentPage("login")}
          onRegisterSuccess={handleRegisterSuccess}
        />
      </AuthLayout>
    );
  }

  // 토의실 상세 페이지
  if (currentPage === "discussionDetail") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          isLoggedIn={isLoggedIn}
          onLoginClick={() => setCurrentPage("login")}
          onLogoutClick={handleLogout}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />
        <DiscussionRoomDetail onBack={() => setCurrentPage("discussions")} />
        <Footer />
      </div>
    );
  }

  // 솔루션 토의실 페이지
  if (currentPage === "discussions") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          isLoggedIn={isLoggedIn}
          onLoginClick={() => setCurrentPage("login")}
          onLogoutClick={handleLogout}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />
        <SolutionDiscussionPage onCardClick={handleDiscussionClick} />
        <Footer />
      </div>
    );
  }

  // 진행중인 제안 페이지
  if (currentPage === "proposals") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          isLoggedIn={isLoggedIn}
          onLoginClick={() => setCurrentPage("login")}
          onLogoutClick={handleLogout}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />
        <OngoingProposalsPage />
        <Footer />
      </div>
    );
  }

  // 완료된 프로젝트 페이지
  if (currentPage === "completed") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          isLoggedIn={isLoggedIn}
          onLoginClick={() => setCurrentPage("login")}
          onLogoutClick={handleLogout}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />
        <CompletedProjectsPage />
        <Footer />
      </div>
    );
  }

  // 메인 페이지
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setCurrentPage("login")}
        onLogoutClick={handleLogout}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />

      <main>
        <MainBanner />
        <SignupForm />
        <SolutionRoomList onRoomClick={handleDiscussionClick} />
      </main>
      <Footer />
    </div>
  );
}
