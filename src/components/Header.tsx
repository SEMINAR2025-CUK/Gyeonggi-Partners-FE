import { useEffect } from "react";

export function Header() {
  // ✅ KRDS PC GNB 동작을 담당하는 순수 DOM 제어 객체
  // - init()에서 DOM을 훑어 기본 속성/ID/이벤트를 세팅
  // - toggleMainMenu / toggleSubMenu가 2/3뎁스 토글 담당
  // - backdrop/스크롤잠금/키보드 내비게이션 등 보조 기능 포함
  const krds_mainMenuPC = {
    backdrop: undefined as HTMLDivElement | undefined,

    init() {
      // 데모/샘플이 아닌 실제 메뉴 컨테이너
      const gnbMenu = document.querySelector(
        ".krds-main-menu:not(.sample) .gnb-menu"
      ) as HTMLElement | null;
      if (!gnbMenu) return;

      // 접근성: 메뉴 그룹 레이블 지정
      gnbMenu.setAttribute("aria-label", "메인 메뉴");

      // 백드롭 요소 확보(없으면 생성)
      this.backdrop =
        (document.querySelector(".gnb-backdrop") as HTMLDivElement | null) ||
        this.createBackdrop();

      // 1뎁스/2뎁스 트리거 수집 및 초기 속성 세팅
      const mainTriggers = gnbMenu.querySelectorAll<HTMLButtonElement>(".gnb-main-trigger");
      const subTriggers = gnbMenu.querySelectorAll<HTMLButtonElement>(
        ".gnb-sub-trigger:not(.is-link)"
      );

      // 각 1뎁스 트리거 → aria-controls/expanded/haspopup 등 설정 + 하위 서브트리거 준비
      mainTriggers.forEach((mainTrigger) => this.setupMainTrigger(mainTrigger));

      // 클릭/키보드 등 이벤트 바인딩
      this.attachEvents(mainTriggers, subTriggers);

      // Home/End/방향키 포커스 이동 지원
      this.setupKeyboardNavigation(mainTriggers);
    },

    setupMainTrigger(mainTrigger: HTMLElement) {
      // 1뎁스 다음에 오는 2뎁스 컨테이너(.gnb-toggle-wrap)
      const toggleWrap = mainTrigger.nextElementSibling as HTMLElement | null;
      if (toggleWrap) {
        // 고유 id 연결(aria-controls ↔ id)
        const uniqueIdx = `gnb-main-menu-${Math.random()
          .toString(36)
          .substring(2, 9)}`;
        mainTrigger.setAttribute("aria-controls", uniqueIdx);
        mainTrigger.setAttribute("aria-expanded", "false");
        mainTrigger.setAttribute("aria-haspopup", "true");
        toggleWrap.setAttribute("id", uniqueIdx);

        // 2뎁스 리스트(.gnb-main-list) 내부에 3뎁스가 있는 경우 초기 활성 처리
        const mainList = toggleWrap.querySelector(".gnb-main-list") as HTMLElement | null;
        if (mainList?.getAttribute("data-has-submenu") === "true") {
          const subTriggers = mainList.querySelectorAll<HTMLButtonElement>(".gnb-sub-trigger");
          subTriggers.forEach((subTrigger) => this.setupSubTrigger(subTrigger));
          // 첫 3뎁스 트리거를 기본 활성화(링크형은 제외)
          if (subTriggers.length > 0 && !subTriggers[0].classList.contains("is-link")) {
            subTriggers[0].classList.add("active");
            subTriggers[0].setAttribute("aria-expanded", "true");
            subTriggers[0].nextElementSibling?.classList.add("active"); // 해당 .gnb-sub-list
          }
        }
      }
    },

    setupSubTrigger(subTrigger: HTMLElement) {
      // 3뎁스 컨테이너 연결(aria-controls ↔ id)
      const hasMenu = subTrigger.nextElementSibling as HTMLElement | null;
      if (hasMenu) {
        const uniqueIdx = `gnb-sub-menu-${Math.random()
          .toString(36)
          .substring(2, 9)}`;
        subTrigger.setAttribute("aria-controls", uniqueIdx);
        subTrigger.setAttribute("aria-expanded", "false");
        subTrigger.setAttribute("aria-haspopup", "true");
        hasMenu.setAttribute("id", uniqueIdx);
      }
    },

    toggleMainMenu(mainTrigger: HTMLElement) {
      const isActive = mainTrigger.classList.contains("active");
      const isDropDown = mainTrigger.classList.contains("is-dropdown"); // 드롭다운형 예외

      if (!isActive && mainTrigger.nextElementSibling) {
        // 새로 열리는 경우: 다른 메뉴 초기화 후 현재 오픈
        this.resetMainMenu();
        mainTrigger.setAttribute("aria-expanded", "true");
        mainTrigger.classList.add("active");
        mainTrigger.nextElementSibling.classList.add("is-open");

        // 드롭다운이 아닌 “확장형 패널”일 때: 배경/스크롤 처리 + 서브 높이 보정
        if (!isDropDown) {
          this.toggleBackdrop(true);
          this.toggleScrollbar(true);
          this.adjustSubMenuHeight(
            mainTrigger.nextElementSibling.querySelector(".gnb-main-list") as HTMLElement | null
          );
        }
      } else {
        // 이미 열려있으면 닫기
        this.closeMainMenu();
      }
    },

    toggleSubMenu(subTrigger: HTMLElement) {
      // 같은 2뎁스 그룹 내 다른 3뎁스 활성 해제
      const containerUl = subTrigger.closest("ul");
      const otherSubTriggers =
        containerUl?.querySelectorAll<HTMLButtonElement>(".gnb-sub-trigger:not(.is-link)") ?? [];
      otherSubTriggers.forEach((trigger) => {
        trigger.classList.remove("active");
        trigger.setAttribute("aria-expanded", "false");
        trigger.nextElementSibling?.classList.remove("active");
      });

      // 현재 3뎁스 활성
      subTrigger.classList.add("active");
      subTrigger.setAttribute("aria-expanded", "true");
      subTrigger.nextElementSibling?.classList.add("active");

      // 활성된 3뎁스 높이에 맞춰 2뎁스 컨테이너 min-height 보정
      this.adjustSubMenuHeight(
        subTrigger.closest(".gnb-main-list") as HTMLElement | null
      );
    },

    createBackdrop() {
      // GNB 열릴 때 body 뒤에 까는 반투명 레이어
      const backdrop = document.createElement("div");
      backdrop.classList.add("gnb-backdrop");
      document.body.appendChild(backdrop);
      return backdrop;
    },

    toggleBackdrop(isOpen: boolean) {
      // 백드롭 on/off + body 상태 클래스 토글
      this.backdrop?.classList.toggle("active", isOpen);
      document.body.classList.toggle("is-gnb-web", isOpen);
    },

    adjustSubMenuHeight(target: HTMLElement | null) {
      // 현재 활성된 .gnb-sub-list 높이를 읽어 컨테이너 min-height 지정
      const activeSubList = target?.querySelector(".gnb-sub-list.active") as HTMLElement | null;
      const height = activeSubList?.scrollHeight ?? 0;
      if (target) target.style.minHeight = `${height}px`;
    },

    toggleScrollbar(isEnabled: boolean) {
      // 페이지 전체 높이가 뷰포트보다 크면 Y 스크롤 잠금 클래스를 토글
      const isScrollNeeded = document.body.scrollHeight > window.innerHeight;
      document.body.classList.toggle("hasScrollY", isEnabled && isScrollNeeded);
    },

    resetMainMenu() {
      // 모든 1뎁스 비활성 + 2뎁스 패널 닫기
      document
        .querySelectorAll<HTMLElement>(
          ".krds-main-menu:not(.sample) .gnb-main-trigger:not(.is-link)"
        )
        .forEach((mainTrigger) => {
          mainTrigger.classList.remove("active");
          mainTrigger.setAttribute("aria-expanded", "false");
        });
      document
        .querySelectorAll<HTMLElement>(".krds-main-menu:not(.sample) .gnb-toggle-wrap")
        .forEach((toggleWrap) => {
          toggleWrap.classList.remove("is-open");
        });
    },

    closeMainMenu() {
      // 전체 닫기 + 보조 상태 초기화
      this.resetMainMenu();
      this.toggleBackdrop(false);
      this.toggleScrollbar(false);
    },

    attachEvents(
      mainTriggers: NodeListOf<HTMLButtonElement>,
      subTriggers: NodeListOf<HTMLButtonElement>
    ) {
      // 메뉴 외부 클릭 → 닫기
      document.addEventListener("click", ({ target }) => {
        const el = target as HTMLElement;
        if (!el.closest(".krds-main-menu")) this.closeMainMenu();
      });

      // 키보드: ESC로 닫기 / 탭 이동으로 영역 벗어났을 때 닫기
      document.addEventListener("keyup", (event) => {
        const el = event.target as HTMLElement;
        if (event.code === "Escape" || !el.closest(".krds-main-menu")) {
          this.closeMainMenu();
        }
      });

      // 1뎁스: 클릭 시 2뎁스 열고 닫기
      mainTriggers.forEach((mainTrigger) => {
        mainTrigger.addEventListener("click", () => this.toggleMainMenu(mainTrigger));
      });

      // 2뎁스(=3뎁스 트리거): 클릭 시 3뎁스 영역 전환
      subTriggers.forEach((subTrigger) => {
        subTrigger.addEventListener("click", () => this.toggleSubMenu(subTrigger));
      });
    },

    setupKeyboardNavigation(mainTriggers: NodeListOf<HTMLElement>) {
      // 1뎁스 사이 포커스 이동(접근성 향상)
      const focusMenuItem = (element: HTMLElement | null) => element?.focus();

      const findFocusableElement = (element: HTMLElement, direction: "next" | "prev") => {
        const sibling = direction === "next" ? "nextElementSibling" : "previousElementSibling";
        const liSibling = element.closest("li")?.[sibling] as HTMLElement | null;
        return liSibling ? (liSibling.querySelector("[data-trigger]") as HTMLElement | null) : null;
      };

      document.addEventListener("keydown", (event) => {
        const target = event.target as HTMLElement;
        // data-trigger 속성으로 키보드 내비를 적용할 요소를 한정
        if (target.getAttribute("data-trigger")) {
          switch (event.key) {
            case "Home":
              event.preventDefault();
              focusMenuItem(mainTriggers[0]); // 첫 항목
              break;
            case "End":
              event.preventDefault();
              focusMenuItem(mainTriggers[mainTriggers.length - 1]); // 마지막 항목
              break;
            case "ArrowRight":
            case "ArrowDown": {
              event.preventDefault();
              const nextElement = findFocusableElement(target, "next");
              focusMenuItem(nextElement);
              break;
            }
            case "ArrowLeft":
            case "ArrowUp": {
              event.preventDefault();
              const previousElement = findFocusableElement(target, "prev");
              focusMenuItem(previousElement);
              break;
            }
            default:
              break;
          }
        }
      });
    },
  };

  // ✅ React 마운트 이후 DOM이 준비되면 초기화
  useEffect(() => {
    krds_mainMenuPC.init();
  }, []);

  return (
    <>
      {/* 상단 안내 띠(전자정부 안내 등) */}
      <div id="krds-masthead">
        <div className="toggle-wrap">
          <div className="toggle-head">
            <div className="inner">
              <span className="nuri-txt">
                이 누리집은 대한민국 공식 전자정부 누리집입니다.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ====== 헤더 시작 ====== */}
      <header id="krds-header">
        {/* 헤더 컨테이너 */}
        <div className="header-in">
          {/* 헤더 상단: 유틸/브랜딩 */}
          <div className="header-container">
            <div className="inner">
              {/* 유틸리티 영역 */}
              <div className="header-utility">
                <ul className="utility-list">
                  {/* 외부 링크 버튼 예시 */}
                  <li>
                    <a href="#" className="krds-btn small text" target="_blank" title="새 창 열기">
                      메뉴명 <i className="svg-icon ico-go"></i>
                    </a>
                  </li>

                  {/* 드롭다운 예시 1 */}
                  <li>
                    <div className="krds-drop-wrap">
                      <button type="button" className="krds-btn small text drop-btn">
                        메뉴명 <i className="svg-icon ico-toggle"></i>
                      </button>
                      <div className="drop-menu">
                        <div className="drop-in">
                          <ul className="drop-list">
                            <li><a href="#" className="item-link">메뉴명</a></li>
                            <li><a href="#" className="item-link">메뉴명</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>

                  {/* 드롭다운 예시 2: 글자 크기 조절 등 */}
                  <li>
                    <div className="krds-drop-wrap krds-resize">
                      <button type="button" className="krds-btn small text drop-btn">
                        메뉴명 <i className="svg-icon ico-toggle"></i>
                      </button>
                      <div className="drop-menu">
                        <div className="drop-in">
                          <ul className="drop-list">
                            <li><button type="button" className="item-link sm">메뉴명</button></li>
                            <li><button type="button" className="item-link md active">메뉴명</button></li>
                            <li><button type="button" className="item-link lg">메뉴명</button></li>
                            <li><button type="button" className="item-link xlg">메뉴명</button></li>
                            <li><button type="button" className="item-link xxlg">메뉴명</button></li>
                          </ul>
                          <div className="drop-bottom">
                            <button type="button" className="krds-btn medium text">
                              <i className="svg-icon ico-reset"></i> 초기화
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  {/* 드롭다운 예시 3: 외부 링크 목록 */}
                  <li>
                    <div className="krds-drop-wrap">
                      <button type="button" className="krds-btn small text drop-btn">
                        메뉴명 <i className="svg-icon ico-toggle"></i>
                      </button>
                      <div className="drop-menu">
                        <div className="drop-in">
                          <ul className="drop-list">
                            <li><a href="#" className="item-link ico-go" target="_blank" title="새 창 열림">메뉴명</a></li>
                            <li><a href="#" className="item-link ico-go" target="_blank" title="새 창 열림">메뉴명</a></li>
                            <li><a href="#" className="item-link ico-go" target="_blank" title="새 창 열림">메뉴명</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* 좌측 로고 + 우측 사용자 액션(검색/로그인 등) */}
              <div className="header-branding">
                <h2 className="logo">
                  <a href="#">
                    <span className="sr-only">KRDS - Korea Design System</span>
                  </a>
                </h2>

                <div className="header-actions">
                  {/* 검색/로그인/회원가입 및 마이 메뉴 드롭다운 */}
                  <button type="button" className="btn-navi sch" title="통합검색 레이어">통합검색</button>
                  <a href="#" className="btn-navi login">로그인</a>
                  <button type="button" className="btn-navi join">회원가입</button>

                  <div className="krds-drop-wrap my-drop">
                    <button type="button" className="btn-navi my drop-btn">나의 GOV</button>
                    <div className="drop-menu">
                      <div className="drop-in">
                        <div className="drop-top">
                          <p className="my-name">홍길동님</p>
                          <dl className="my-time">
                            <dt>로그아웃까지 남은 시간</dt>
                            <dd>
                              <span className="time">12:00</span>
                              <button type="button" className="krds-btn medium text">시간 연장</button>
                            </dd>
                          </dl>
                        </div>
                        <ul className="drop-list">
                          <li><a href="#" className="item-link">나의 GOV 홈</a></li>
                          <li><a href="#" className="item-link">나의 신청내역</a></li>
                          <li><a href="#" className="item-link">나의 생활정보</a></li>
                          <li><a href="#" className="item-link">나의 정보관리</a></li>
                        </ul>
                        <div className="drop-bottom">
                          <button type="button" className="krds-btn medium text">
                            <i className="svg-icon ico-logout"></i> 로그아웃
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 모바일 전체메뉴 열기 버튼(모바일 네비 토글용) */}
                  <button type="button" className="btn-navi all" aria-controls="mobile-nav">
                    전체메뉴
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ====== 메인 메뉴 (데스크탑) ====== */}
          <nav className="krds-main-menu">
            <div className="inner">
              <ul className="gnb-menu" /* aria-label은 init()에서 지정 */>
                <li>
                  {/* 1뎁스 트리거: 클릭 시 .gnb-toggle-wrap 열기 */}
                  <button type="button" className="gnb-main-trigger" data-trigger="gnb">
                    1Depth
                  </button>

                  {/* 2뎁스 전체영역 */}
                  <div className="gnb-toggle-wrap">
                    {/* 2뎁스 리스트: data-has-submenu=true면 3뎁스 존재 */}
                    <div className="gnb-main-list" data-has-submenu="true">
                      <ul>
                        <li>
                          {/* 3뎁스 트리거(버튼형) */}
                          <button type="button" className="gnb-sub-trigger" data-trigger="gnb">
                            2Depth
                          </button>

                          {/* 3뎁스 컨테이너 */}
                          <div className="gnb-sub-list">
                            <div className="gnb-sub-content">
                              <h2 className="sub-title">
                                2Depth title
                                <a href="#" className="krds-btn link basic small">
                                  <span className="underline">바로가기</span>
                                  <i className="svg-icon ico-angle right"></i>
                                </a>
                              </h2>
                              <ul>
                                <li><a href="#">Last depth</a></li>
                                <li><button type="button">Last depth</button></li>
                              </ul>
                            </div>

                            {/* 3뎁스 우측 배너(보조영역) */}
                            <div className="gnb-sub-banner">
                              <span className="krds-badge bg-secondary">신규 서비스</span>
                              <button type="button" className="krds-btn medium text">
                                메뉴명 <i className="svg-icon ico-angle right"></i>
                              </button>
                            </div>
                          </div>
                        </li>

                        <li>
                          <button type="button" className="gnb-sub-trigger" data-trigger="gnb">
                            2Depth
                          </button>
                          {/* between 클래스: 배너 우측 배치 레이아웃 */}
                          <div className="gnb-sub-list between">
                            <div className="gnb-sub-content">
                              <h2 className="sub-title">
                                2Depth title
                                <a href="#" className="krds-btn link basic small">
                                  <span className="underline">바로가기</span>
                                  <i className="svg-icon ico-angle right"></i>
                                </a>
                              </h2>
                              <ul>
                                <li><a href="#">Last depth</a></li>
                                <li><button type="button">Last depth</button></li>
                                <li><button type="button">Last depth</button></li>
                              </ul>
                            </div>
                            <div className="gnb-sub-banner">
                              <span className="krds-badge bg-secondary">신규 서비스</span>
                              <button type="button" className="krds-btn medium text">
                                메뉴명 <i className="svg-icon ico-angle right"></i>
                              </button>
                            </div>
                          </div>
                        </li>

                        {/* 링크형 3뎁스: .is-link → 토글 대상 아님 */}
                        <li>
                          <a href="#" className="gnb-sub-trigger is-link" data-trigger="gnb">
                            2Depth
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="gnb-sub-trigger is-link external-link"
                            data-trigger="gnb"
                            target="_blank"
                            title="새 창 열림"
                          >
                            2Depth
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>

                {/* 동일 패턴의 또 다른 1뎁스 그룹 */}
                <li>
                  <button type="button" className="gnb-main-trigger" data-trigger="gnb">
                    1Depth
                  </button>
                  <div className="gnb-toggle-wrap">
                    <div className="gnb-main-list" data-has-submenu="true">
                      <ul>
                        <li>
                          <button type="button" className="gnb-sub-trigger" data-trigger="gnb">
                            2Depth
                          </button>
                          <div className="gnb-sub-list">
                            <div className="gnb-sub-content">
                              <h2 className="sub-title"><span>2Depth title</span></h2>
                              {/* 설명형 항목(type-description) */}
                              <ul className="type-description">
                                <li>
                                  <h3 className="tit">
                                    <a href="#" target="_blank" title="새 창 열림">
                                      3Depth title <i className="svg-icon ico-go"></i>
                                    </a>
                                  </h3>
                                  <p className="txt">
                                    메뉴명과 메뉴에 관한 간략한 설명이 표시되는 스타일입니다.
                                  </p>
                                </li>
                              </ul>
                            </div>
                            <div className="gnb-sub-banner">
                              <span className="krds-badge bg-secondary">신규 서비스</span>
                              <button type="button" className="krds-btn medium text">
                                메뉴명 <i className="svg-icon ico-angle right"></i>
                              </button>
                            </div>
                          </div>
                        </li>

                        <li>
                          <button type="button" className="gnb-sub-trigger" data-trigger="gnb">
                            2Depth
                          </button>
                          <div className="gnb-sub-list between">
                            <div className="gnb-sub-content">
                              <h2 className="sub-title"><span>2Depth title</span></h2>
                              <ul className="type-description">
                                <li>
                                  <h3 className="tit">
                                    <a href="#" target="_blank" title="새 창 열림">
                                      3Depth title <i className="svg-icon ico-go"></i>
                                    </a>
                                  </h3>
                                  <p className="txt">
                                    메뉴명과 메뉴에 관한 간략한 설명이 표시되는 스타일입니다.
                                  </p>
                                </li>
                              </ul>
                            </div>
                            <div className="gnb-sub-banner">
                              <span className="krds-badge bg-secondary">신규 서비스</span>
                              <button type="button" className="krds-btn medium text">
                                메뉴명 <i className="svg-icon ico-angle right"></i>
                              </button>
                            </div>
                          </div>
                        </li>

                        <li>
                          <a href="#" className="gnb-sub-trigger is-link" data-trigger="gnb">
                            2Depth
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="gnb-sub-trigger is-link external-link"
                            data-trigger="gnb"
                            target="_blank"
                            title="새 창 열림"
                          >
                            2Depth
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>

                {/* 2뎁스가 없이 3뎁스 리스트만 단일 노출하는 케이스 */}
                <li>
                  <button type="button" className="gnb-main-trigger" data-trigger="gnb">
                    1Depth
                  </button>
                  <div className="gnb-toggle-wrap">
                    <div className="gnb-main-list">
                      <div className="gnb-sub-list single-list between">
                        <div className="gnb-sub-content">
                          <h2 className="sub-title"><span>2Depth title</span></h2>
                          <ul>
                            {/* 마지막 단계 링크/버튼 목록 */}
                            <li><a href="#">Last depth</a></li>
                            <li><a href="#">Last depth</a></li>
                            <li><a href="#">Last depth</a></li>
                            <li><a href="#">Last depth</a></li>
                            <li><a href="#">Last depth</a></li>
                            <li><a href="#">Last depth</a></li>
                            <li><a href="#">Last depth</a></li>
                            <li><a href="#">Last depth</a></li>
                            <li><a href="#">Last depth</a></li>
                          </ul>
                        </div>
                        <div className="gnb-sub-banner">
                          <span className="krds-badge bg-secondary">신규 서비스</span>
                          <button type="button" className="krds-btn medium text">
                            메뉴명 <i className="svg-icon ico-angle right"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                {/* 1뎁스가 링크(anchor)인 경우(토글X) */}
                <li>
                  <a href="#" className="gnb-main-trigger is-link" data-trigger="gnb">
                    링크(anchor)
                  </a>
                </li>
                <li>
                  <button type="button" className="gnb-main-trigger is-link" data-trigger="gnb">
                    링크(anchor)
                  </button>
                </li>
              </ul>
            </div>
          </nav>
          {/* ====== /메인 메뉴 (데스크탑) ====== */}
        </div>

        {/* ====== 모바일 메뉴 ======
            - 버튼/앵커 클래스는 KRDS 모바일 스크립트 규약에 맞춰 구성
            - 이 컴포넌트에서는 PC용 init만 하고 있지만,
              모바일용 제어 스크립트를 쓸 경우 별도 init이 필요할 수 있음 */}
        <div id="mobile-nav" className="krds-main-menu-mobile">
          <div className="gnb-wrap">
            {/* 모바일 헤더(유틸/로그인/바로가기/검색 등) */}
            <div className="gnb-header">
              {/* 상단 유틸 */}
              <div className="gnb-utils">
                <ul className="utility-list">
                  <li><button type="button" className="krds-btn xsmall text">메뉴명</button></li>
                  <li><button type="button" className="krds-btn xsmall text">메뉴명</button></li>
                </ul>
              </div>

              {/* 로그인 상태/안내 */}
              <div className="gnb-login">
                {/* 로그인 상태에 따라 스위칭 */}
                {/* <span className="user">홍길동님</span>
                <button type="button" className="krds-btn large text"><i className="svg-icon ico-logout"></i> 로그아웃</button> */}
                <button type="button" className="krds-btn large text">
                  <i className="svg-icon ico-log"></i> 로그인을 해주세요
                </button>
              </div>

              {/* 서비스 바로가기 링크 모음 */}
              <div className="gnb-service-menu">
                <a href="#" className="link">메뉴명</a>
                <a href="#" className="link">메뉴명</a>
                <a href="#" className="link">메뉴명</a>
                <a href="#" className="link">메뉴명</a>
              </div>

              {/* 검색 */}
              <div className="sch-input">
                <input
                  type="text"
                  className="krds-input"
                  placeholder="찾고자 하는 메뉴명을 입력해 주세요"
                  title="찾고자 하는 메뉴명 입력"
                />
                <button type="button" className="krds-btn medium icon ico-search">
                  <span className="sr-only">검색</span>
                  <i className="svg-icon ico-sch"></i>
                </button>
              </div>
            </div>

            {/* 모바일 바디: 좌측 메인/우측 서브 구조 */}
            <div className="gnb-body">
              {/* 1뎁스 목록 */}
              <div className="gnb-menu">
                <div className="menu-wrap">
                  <ul>
                    {/* 각 앵커가 우측 .submenu-wrap 내 id와 연결 */}
                    <li><a href="#mGnb-anchor1" className="gnb-main-trigger">1Depth</a></li>
                    <li><a href="#mGnb-anchor2" className="gnb-main-trigger">1Depth</a></li>
                    <li><a href="#mGnb-anchor3" className="gnb-main-trigger">1Depth</a></li>
                    <li><a href="#mGnb-anchor4" className="gnb-main-trigger">1Depth</a></li>
                    <li><a href="#mGnb-anchor5" className="gnb-main-trigger">1Depth</a></li>
                  </ul>
                </div>

                {/* 2/3/4뎁스 컨테이너 */}
                <div className="submenu-wrap">
                  {/* 2뎁스 섹션 #1 */}
                  <div className="gnb-sub-list" id="mGnb-anchor1">
                    <h2 className="sub-title">1Depth</h2>
                    <ul>
                      <li><a href="#" className="gnb-sub-trigger">2Depth</a></li>
                      <li><a href="#" className="gnb-sub-trigger">2Depth</a></li>
                      <li><a href="#" className="gnb-sub-trigger">2Depth</a></li>
                    </ul>
                  </div>

                  {/* 2뎁스 섹션 #2 */}
                  <div className="gnb-sub-list" id="mGnb-anchor2">
                    <h2 className="sub-title">1Depth</h2>
                    <ul>
                      <li><a href="#" className="gnb-sub-trigger">2Depth</a></li>
                      <li><a href="#" className="gnb-sub-trigger">2Depth</a></li>
                      <li><a href="#" className="gnb-sub-trigger">2Depth</a></li>
                    </ul>
                  </div>

                  {/* 3/4뎁스 예시 포함 섹션 #3 */}
                  <div className="gnb-sub-list" id="mGnb-anchor3">
                    <h2 className="sub-title">1Depth</h2>
                    <ul>
                      <li>
                        <a href="#" className="gnb-sub-trigger has-depth3">2Depth</a>
                        <div className="depth3-wrap">
                          <ul>
                            <li>
                              {/* 4뎁스가 있는 3뎁스 */}
                              <a href="#" className="depth3-trigger has-depth4">3Depth</a>
                              <div className="depth4-wrap">
                                <div className="depth4-head">
                                  <button type="button" className="krds-btn icon trigger-prev">
                                    <span className="sr-only">이전화면</span>
                                    <i className="svg-icon ico-angle left"></i>
                                  </button>
                                  <button type="button" className="krds-btn icon trigger-close">
                                    <span className="sr-only">전체메뉴 닫기</span>
                                    <i className="svg-icon ico-popup-close"></i>
                                  </button>
                                </div>
                                <ul className="depth4-body">
                                  <h4 className="sub-title">4Depth title</h4>
                                  <ul className="depth4-ul">
                                    <li><a href="#">depth title</a></li>
                                    <li><a href="#">depth title</a></li>
                                    <li><a href="#">depth title</a></li>
                                    <li><a href="#">depth title</a></li>
                                  </ul>
                                </ul>
                              </div>
                            </li>
                            <li><a href="#" className="depth3-trigger">3Depth</a></li>
                            <li><a href="#" className="depth3-trigger">3Depth</a></li>
                          </ul>
                        </div>
                      </li>
                      <li><a href="#" className="gnb-sub-trigger">2Depth</a></li>
                      <li><a href="#" className="gnb-sub-trigger">2Depth</a></li>
                    </ul>
                  </div>

                  {/* 2뎁스 섹션 #4 */}
                  <div className="gnb-sub-list" id="mGnb-anchor4">
                    <h2 className="sub-title">1Depth</h2>
                    <ul>
                      <li><a href="#" className="gnb-sub-trigger">2Depth</a></li>
                      <li><a href="#" className="gnb-sub-trigger">2Depth</a></li>
                      <li><a href="#" className="gnb-sub-trigger">2Depth</a></li>
                    </ul>
                  </div>

                  {/* 2뎁스 섹션 #5 */}
                  <div className="gnb-sub-list" id="mGnb-anchor5">
                    <h2 className="sub-title">1Depth</h2>
                    <ul>
                      <li><a href="#" className="gnb-sub-trigger">2Depth</a></li>
                      <li><a href="#" className="gnb-sub-trigger">2Depth</a></li>
                      <li><a href="#" className="gnb-sub-trigger">2Depth</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 모바일 하단 퀵 링크 */}
              <div className="gnb-bottom">
                <a href="#" className="krds-btn medium text">
                  메뉴명 <i className="svg-icon ico-angle right"></i>
                </a>
                <a href="#" className="krds-btn medium text" target="_blank" title="새 창 열기">
                  {" "}메뉴명 <i className="svg-icon ico-go"></i>
                </a>
              </div>
            </div>

            {/* 모바일 닫기 버튼 */}
            <button type="button" className="krds-btn medium icon" id="close-nav">
              <span className="sr-only">전체메뉴 닫기</span>
              <i className="svg-icon ico-popup-close"></i>
            </button>
          </div>
        </div>
        {/* ====== /모바일 메뉴 ====== */}
      </header>
      {/* ====== /헤더 ====== */}
    </>
  );
}
