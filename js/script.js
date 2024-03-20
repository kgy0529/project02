//logo
document.addEventListener('DOMContentLoaded', function () {
    // DOM이 로드된 후에 실행되는 코드

    // .hg_btn 요소 선택
    var btn = document.querySelector('#header .h_gnb .hg_btn');

    // .icon1, .icon2, .icon3 요소 선택
    var icon1 = document.querySelector('#header .h_gnb .icon1');
    var icon2 = document.querySelector('#header .h_gnb .icon2');
    var icon3 = document.querySelector('#header .h_gnb .icon3');

    // .h_logo 요소 선택
    var hLogo = document.querySelector('#header .h_logo')

    // .h_gnb 요소 선택
    var gnb = document.querySelector('#header .h_gnb');

    // .hg_btn이 클릭되었을 때 실행될 함수
    btn.addEventListener('click', function () {
        // 각 아이콘에 .on 클래스 추가
        icon1.classList.toggle('on');
        icon2.classList.toggle('on');
        icon3.classList.toggle('on');

        // .h_gnb에도 .on 클래스 추가
        gnb.classList.toggle('on');

        // h_logo .on 클래스 추가
        hLogo.classList.toggle('on');
    });
});

// 슬라이드
let currentSlide = 0;
const slides = document.querySelectorAll('.ci_visual .slide');
const dots = document.querySelectorAll('.ci_visual .slide-dots .slide-dot');
const ciVisual = document.querySelector('.ci_visual');

// 초기에 t1 이미지가 보이도록 설정
showSlide(0);

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.left = '0';
            slide.style.opacity = 1;
            // 초기에는 항상 t1 이미지로 설정
            if (i === 0) {
                ciVisual.style.background = ''; // t1 이미지의 배경을 투명하게 설정
            } else if (slide.classList.contains('t2')) {
                ciVisual.style.background = '#c0dae9';
            } else {
                ciVisual.style.background = ''; // 다른 경우에는 기본값으로 복원
            }
        } else {
            slide.style.left = '-100%'; // 왼쪽으로 이동
            slide.style.opacity = 0;
        }
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});
//옆으로 넘어가게
let isDragging = false;
let startDragX = 0;

ciVisual.addEventListener('mousedown', handleDragStart);
ciVisual.addEventListener('touchstart', handleDragStart, { passive: true });

ciVisual.addEventListener('mousemove', handleDragMove);
ciVisual.addEventListener('touchmove', handleDragMove, { passive: true });

ciVisual.addEventListener('mouseup', handleDragEnd);
ciVisual.addEventListener('touchend', handleDragEnd);

function handleDragStart(event) {
    isDragging = true;
    startDragX = getEventPosition(event);
}

function handleDragMove(event) {
    if (!isDragging) return;

    const currentDragX = getEventPosition(event);
    const dragDistance = currentDragX - startDragX;

    const dragThreshold = 50; // Adjust this value as needed

    if (Math.abs(dragDistance) > dragThreshold) {
        isDragging = false;
        const direction = dragDistance > 0 ? -1 : 1; // Determine the direction of the drag
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        showSlide(currentSlide);
    }
}

function handleDragEnd() {
    isDragging = false;
}

function getEventPosition(event) {
    return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
}

document.addEventListener('DOMContentLoaded', function () {
    const counterElement = document.querySelector('.counter');
  
    // 애니메이션 시작 (0에서 447까지 4초 동안)
    const finalCount = 447;
    const animationDuration = 4000;
  
    animateCount(counterElement, 0, finalCount, animationDuration);
  });
  
  function animateCount(targetElement, start, end, duration) {
    const range = end - start;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    let increment = 1;
    let totalTime = 0;
  
    const updateCount = (timestamp) => {
      if (!totalTime) totalTime = timestamp;
  
      const progress = (timestamp - totalTime) / duration;
      const progressRate = easeOutExpo(progress > 1 ? 1 : progress);
      current = Math.round(start + range * progressRate);
  
      targetElement.textContent = current;
  
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };
  
    requestAnimationFrame(updateCount);
  }
  
  function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }

//-----------
// 페이지 전환 관련 변수 초기화
var currentPage = 1;
var totalPages = 2; // 전체 페이지 수

// 이동 거리 계산 함수
function calculateScrollDistance() {
    return (currentPage - 1) * window.innerHeight;
}

// 스크롤 이벤트 핸들러 등록
window.addEventListener('wheel', function (e) {
    if ($("html, body").is(":animated")) return;

    // 스크롤 방향에 따라 페이지 업데이트
    if (e.deltaY > 0) {
        if (currentPage === totalPages) return;
        currentPage++;
    } else if (e.deltaY < 0) {
        if (currentPage === 1) return;
        currentPage--;
    }

    // 해당 페이지의 상단 위치 계산 및 애니메이션 적용
    var posTop = calculateScrollDistance();
    $("html, body").animate({ scrollTop: posTop }, 600, function () {
        // 페이지 전환이 완료된 후 ci_first와 ci_last를 보이거나 숨기기
        toggleCiElements();
    });
});

// .ci_scroll 클릭 시 스크롤 이벤트를 트리거하여 동일한 동작 수행
var ciScrollButton = document.querySelector('#content .c_intro .wrap .ci_scroll .scroll');
ciScrollButton.addEventListener('click', function (event) {
    event.preventDefault();

    // 특정 섹션으로 스크롤 이동
    var portfolioSection = document.querySelector('.c_portfolio');

    // .c_intro 위치를 벗어나면 ciFirst와 ciLast를 숨기기
    var introSection = document.querySelector('#content .c_intro');
    if (introSection && window.scrollY > introSection.offsetTop + introSection.offsetHeight) {
        toggleCiElements();
    }

    // .c_portfolio로 스크롤 이동
    if (portfolioSection) {
        var posTop = portfolioSection.offsetTop;
        $("html, body").animate({ scrollTop: posTop }, 600, function () {
            // 이동이 완료된 후 ci_first와 ci_last를 숨기기
            toggleCiElements();
        });
    }
});

// ci_first와 ci_last를 보이거나 숨기는 함수
function toggleCiElements() {
    var ciFirst = document.querySelector('#content .c_intro .wrap .ci_first');
    var ciLast = document.querySelector('#content .c_intro .wrap .ci_last');
    
    if (window.scrollY > 0) {
        ciFirst.style.display = 'none';
        ciLast.style.display = 'none';
    } else {
        ciFirst.style.display = 'block';
        ciLast.style.display = 'block';
    }
}
//-----------

//탭메뉴
function showTab(tabId, tabElement) {
    // 모든 탭 내용 숨기기
    var allTabs = document.querySelectorAll('.cp_list');
    allTabs.forEach(function (tab) {
        tab.style.display = 'none';
    });

    // 선택한 탭 내용 보이기
    var selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }

    // 모든 탭에서 'on' 클래스 제거
    var allTabLinks = document.querySelectorAll('.cp_a');
    allTabLinks.forEach(function (link) {
        link.classList.remove('on');
    });

    // 선택한 탭에 'on' 클래스 추가
    tabElement.classList.add('on');
}

// 페이지 로드 시 초기 탭 설정
window.onload = function() {
    // "a_all" 링크를 찾아서 'on' 클래스 추가
    var allTabLink = document.getElementById('a_all');
    if (allTabLink) {
        allTabLink.classList.add('on');
    }

    // "box_all" 탭 내용을 보이도록 설정
    var allTabContent = document.getElementById('box_all');
    if (allTabContent) {
        allTabContent.style.display = 'block';
    }

    // 모든 탭 내용 숨기기
    var allOtherTabs = document.querySelectorAll('.cp_list:not(#box_all)');
    allOtherTabs.forEach(function (tab) {
        tab.style.display = 'none';
    });
}

//스와이퍼
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    loop: true,
    centeredSlides: true
  });



//450까지 올라가는 애니메이션
document.addEventListener('DOMContentLoaded', function () {
    const finalCount = 450; // 최종 카운트
    const animationDuration = 7000; // 애니메이션 지속 시간

    // 모든 요소에 대해 카운터 애니메이션 적용
    const numberElements = document.querySelectorAll('.number');
    numberElements.forEach(function (counterElement) {
        animateCount(counterElement, 0, finalCount, animationDuration);
    });
});

function animateCount(targetElement, start, end, duration) {
    const range = end - start;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    let increment = 1;
    let totalTime = 0;

    const updateCount = (timestamp) => {
        if (!totalTime) totalTime = timestamp;

        const progress = (timestamp - totalTime) / duration;
        const progressRate = easeOutExpo(progress > 1 ? 1 : progress);
        current = Math.round(start + range * progressRate);

        targetElement.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateCount);
        }
    };

    requestAnimationFrame(updateCount);
}

function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}