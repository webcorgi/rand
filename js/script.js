$(function () {
    mainVisualSlider()
    mainLivecasinoSlider()
    mainLiveSlotsSlider()
    clickNav()
    clickUserinfo()
    activePopup()
    clickTableTr()
    circleProgressbar()
    wheelAction()
    selectFaker()
    activeTabWallet();
    activeBtnCategory()
    activePopupMember()
    mainMsgMore()
    visualAnimation1()
    wheelanimation()
    mainMultiPopup()
})

function visualAnimation1(){
    const leftElements = document.querySelectorAll('.swiper-slide-item.visual1 .left');

    leftElements.forEach(element => {
        // 조명 컨테이너
        const container = document.createElement('div');
        container.className = 'light-container';

        // 6개의 원형 조명
        for (let i = 0; i < 6; i++) {
            const light = document.createElement('div');
            light.className = 'circle-light';
            container.appendChild(light);
        }

        // 기본 오버레이
        const overlay = document.createElement('div');
        overlay.className = 'light-overlay';

        // 글로우 효과
        const glow = document.createElement('div');
        glow.className = 'glow-effect';

        element.appendChild(container);
        element.appendChild(overlay);
        element.appendChild(glow);
    });
}

function mainVisualSlider() {
    var swiper = new Swiper(".main__visualslider", {
        slidesPerView: 1,
        autoplay:{
            delay: 3000,
        },
        loop:true,
        pagination: {
            el: '.swiper-pagination', // 페이지네이션 요소의 CSS 선택자
            clickable: true,          // 페이지네이션 버튼 클릭 가능 여부
            type: 'bullets',          // 페이지네이션 유형 ('bullets', 'fraction', 'progressbar', 'custom')
        },
    });
}

function mainLivecasinoSlider() {
    var swiper = new Swiper(".main__livecasinoslider", {
        slidesPerView: 6,
        spaceBetween: 15,
        navigation: {
            nextEl: ".main__livecasino .swiper-button-next",
            prevEl: ".main__livecasino .swiper-button-prev"
        },
        autoplay:true,
        breakpoints:{
            1024:{
                slidesPerView:6,
            },
            320:{
                slidesPerView:3,
                spaceBetween: 10,
            }
        },
        loop:true,
    });
}

function mainLiveSlotsSlider() {
    var swiper = new Swiper(".main__liveslotslider", {
        slidesPerView: 6,
        spaceBetween: 15,
        navigation: {
            nextEl: ".main__liveslotslider__outer .swiper-button-next",
            prevEl: ".main__liveslotslider__outer .swiper-button-prev"
        },
        autoplay:true,
        breakpoints:{
            1024:{
                slidesPerView:6,
            },
            320:{
                slidesPerView:3,
                spaceBetween: 10,
            }
        },
        loop:true,
    });
}
function clickNav(){
    const $nav = $('nav').eq(0)
    $('.btn-menu').on('click', function(){
        $nav.toggleClass('active')
    })
}

function clickUserinfo(){
    $('.btn-polygondown').on('click', function(){
        $('.sideProfile__outer').toggleClass('active')
        $('.img-polygondown').toggleClass('active')
    })
}

function changeWalletType(type){
    let idx = type==='deposit' ? 0 : 1
    $('.popup .firstTab button').eq(idx).addClass('active').siblings().removeClass('active')
    $('.popup__divider>div').removeClass('active').eq(idx).addClass('active')
}

function activePopup(){
    $('.aside__wallet').on('click', function(){
        showWallet()
    })
    $('.btn-deposit').on('click', function(){
        showWallet('deposit')
    })
    $('.btn-withdrawal').on('click', function(){
        showWallet('withdrawal')
    })

    function showWallet(type){
        $('.popup.wallet').css({display:'flex'})
        let idx = 0;
        if( type==='deposit' ){
            idx = 0
        }else if( type==='withdrawal' ){
            idx = 1
        }
        $('.popup .firstTab button').eq(idx).addClass('active').siblings().removeClass('active')
        $('.popup__divider>div').removeClass('active').eq(idx).addClass('active')
    }
    /* close */
    $('.popup .btn-close, .popup .bg').on('click', function(){
        $('.popup').hide()
    })

}

function clickTableTr(){
    $('.mypage__table .tr_top').on('click', function(){
        const $this = $(this)
        if( $this.hasClass('active') ){
            $this.removeClass('active')
        }else{
            $('.mypage__table .tr_top').removeClass('active')
            $this.addClass('active')
        }
    })
}


function circleProgressbar(){
    if( !$('.progress-bar').length ) return;
    const circle = document.querySelector('.progress-bar');
    const valueDisplay = document.querySelector('#progress-value');
    const maxValue = document.querySelector('#progress-value-default');
    const circumference = 2 * Math.PI * 70; // 원의 둘레 계산

    circle.style.strokeDasharray = circumference;
    
    function setProgress() {
        const currentValue = parseInt(valueDisplay.getAttribute('data-nowValue')) || 0;
        const maxNum = parseInt(maxValue.textContent) || 100000;
        const percent = (currentValue / maxNum) * 100;
        
        const offset = circumference - (percent / 100 * circumference);
        circle.style.strokeDashoffset = offset;
        
        // 숫자 표시 업데이트
        valueDisplay.textContent = currentValue.toLocaleString();
        maxValue.textContent = maxNum.toLocaleString();
    }

    // 초기 실행
    setProgress();

    // data-nowValue 값이 변경될 때마다 업데이트하기 위한 Observer 설정
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-nowValue') {
                setProgress();
            }
        });
    });

    observer.observe(valueDisplay, {
        attributes: true,
        attributeFilter: ['data-nowValue']
    });
}

function wheelAction(){
    if(!$('.wheel_action').length) return
    const startButton = document.querySelector('.btn-spin.start');
    const centerImage = document.querySelector('.wheel-circle');
    let isSpinning = false;
    let currentRotation = 0;  // 현재 회전 각도를 저장


    function start(){
        if (isSpinning) return;

        isSpinning = true;

        // 기본 회전 수 (9.5바퀴 = 3420도) + 랜덤 추가 회전 (0-359도)
        const additionalRotation = Math.floor(Math.random() * 360);
        const totalRotation = 3420 + additionalRotation;

        // 현재 각도에서 새로운 각도만큼 추가 회전
        currentRotation += totalRotation;

        // 애니메이션 적용
        centerImage.style.transition = 'transform 5s cubic-bezier(0.32, 0, 0.39, 1)';
        centerImage.style.transform = `rotate(${currentRotation}deg)`;

        // 애니메이션 완료 후 상태 초기화
        setTimeout(() => {
            isSpinning = false;
            // transition 제거 (다음 회전을 위해)
            centerImage.style.transition = 'none';
        }, 5000);
    }

    startButton.addEventListener('click', function() {
        start()
    });
}

function selectFaker(){
    if( !$('.select__fake').length ) return;
    $('.select__fake').each(function(){
        const $this = $(this)
        const $selected = $this.find('.selected')
        const $option = $this.find('.option')

        $selected.on('click', function(){
            $(this).toggleClass('active')
        })
        $option.on('click', function(){
            $selected.empty().append($(this).children().clone())
            $selected.removeClass('active')
        })
    })
}

function activeBtnCategory() {
    $('.btn-category').on('click', function() {
        $(this).toggleClass('active');
    });
}

function activeTabWallet() {
    $('.popup.wallet').each(function(){
        $(this).find('.tab button').on('click', function() {
            $(this).addClass('active').siblings().removeClass('active');
        })
    });
}


function activePopupMember(){
    $('.btn-member.signup').on('click', function(){
        $('.popup.signup').css({display:'flex'})
    })
    $('.showSignupPopup').on('click', function(){
        $('.popup.signup').css({display:'flex'})
    })

    $('.btn-member.login').on('click', function(){
        $('.popup.login').css({display:'flex'})
    })


}

function mainMsgMore(){
    const $msg = $('.main__msg')
    $msg.find('.btn-readmore').on('click', function(){
        $msg.toggleClass('active')
        if( $msg.hasClass('active') ){
            $(this).text('Read less...')
        }else{
            $(this).text('Read more...')
        }
    })
}

function wheelanimation(){
    const title_wonderwheel_each = $('.title_wonderwheel_each')
    if( !title_wonderwheel_each.length ) return;
    const title_wonderwheel = $('.title_wonderwheel')
/* 
    setTimeout(() => {
        title_wonderwheel_each.hide()
        title_wonderwheel.css({opacity:1})
    },3000) */
}

function popupBasicOpen(){
    $('.popup__basic').show()
}
function popupBasicClose(){
    $('.popup__basic').hide()
}


function mainMultiPopup(){
    // 모든 종류의 팝업을 선택
    const popupContainer = document.getElementById('popup1');
    const popupContents = document.querySelectorAll('.popup__text__cont, .popup__image__cont');
    const closeButtons = document.querySelectorAll('.popup-close');
    const todayCloseButtons = document.querySelectorAll('.btn-todayclose');
    const background = document.querySelector('.bg');
    const body = document.querySelector('body');

    // 팝업 상태 관리
    let popupQueue = [];
    let activePopups = new Set();

    // 화면 크기에 따른 최대 팝업 개수 설정
    const getMaxVisiblePopups = () => {
        return window.innerWidth >= 768 ? 3 : 1;
    };

    // 쿠키 관련 유틸리티 함수
    const createCookie = (name, value, days) => {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = `; expires=${date.toGMTString()}`;
        }
        document.cookie = `${name}=${value}${expires}; path=/`;
    };

    const readCookie = (name) => {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    // initializePopupQueue 함수 내부에 추가
    const initializePopupQueue = () => {
        popupQueue = [];
        activePopups.clear();

        // 화면 크기에 따른 초기 표시 개수 설정
        const maxVisible = getMaxVisiblePopups();
        
        popupContents.forEach((popup, index) => {
            const popupId = `popup_${index + 1}`;
            if (!readCookie(popupId)) {
                if (index < maxVisible) {
                    // 초기에 표시될 팝업
                    popup.style.display = 'block';
                    activePopups.add(index);
                } else {
                    // 대기 큐에 추가될 팝업
                    popup.style.display = 'none';
                    popupQueue.push({
                        element: popup,
                        index: index,
                        type: popup.classList.contains('popup__text__cont') ? 'text' : 'image'
                    });
                }
            } else {
                popup.style.display = 'none';
            }
        });

        // 표시될 팝업이 있는 경우 컨테이너 표시
        if (activePopups.size > 0) {
            popupContainer.style.display = 'block';
            body.style.overflow = 'hidden';
            background.style.display = 'block';
        }
    };


    // 다음 팝업 표시
    const showNextPopup = () => {
        const maxVisible = getMaxVisiblePopups();

        // 활성 팝업이 최대 개수보다 적고, 대기 중인 팝업이 있는 경우
        while (activePopups.size < maxVisible && popupQueue.length > 0) {
            const nextPopup = popupQueue.shift();
            if (nextPopup) {
                nextPopup.element.style.display = 'block';
                activePopups.add(nextPopup.index);
            }
        }

        // 컨테이너 상태 업데이트
        updateContainerState();
    };

    // 컨테이너 상태 업데이트
    const updateContainerState = () => {
        if (activePopups.size > 0) {
            popupContainer.style.display = 'flex';
            body.style.overflow = 'hidden';
            background.style.display = 'block';
        } else {
            popupContainer.style.display = 'none';
            body.style.overflow = 'auto';
            background.style.display = 'none';
        }
    };

    // 팝업 닫기
    const closePopup = (popupContent, withCookie = false) => {
        const popupIndex = Array.from(popupContents).indexOf(popupContent);
        const popupId = `popup_${popupIndex + 1}`;
        
        // 팝업 숨기기
        popupContent.style.display = 'none';
        activePopups.delete(popupIndex);
        
        if (withCookie) {
            createCookie(popupId, 'true', 1);
        }

        // 다음 팝업 표시
        showNextPopup();
    };

    // 화면 크기 변경에 따른 팝업 재조정
    const adjustPopupsOnResize = () => {
        const maxVisible = getMaxVisiblePopups();
        const currentVisible = activePopups.size;

        if (currentVisible > maxVisible) {
            // 초과하는 팝업을 큐로 되돌리기
            const activePopupArray = Array.from(activePopups);
            for (let i = maxVisible; i < currentVisible; i++) {
                const popupIndex = activePopupArray[i];
                const popup = popupContents[popupIndex];
                popup.style.display = 'none';
                activePopups.delete(popupIndex);
                popupQueue.unshift({
                    element: popup,
                    index: popupIndex,
                    type: popup.classList.contains('popup__text__cont') ? 'text' : 'image'
                });
            }
        } else if (currentVisible < maxVisible) {
            // 추가로 표시할 수 있는 팝업 표시
            showNextPopup();
        }
    };

    // 이벤트 리스너 등록
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const popupContent = button.closest('.popup__text__cont, .popup__image__cont');
            closePopup(popupContent);
        });
    });

    todayCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const popupContent = button.closest('.popup__text__cont, .popup__image__cont');
            closePopup(popupContent, true);
        });
    });

    // 화면 크기 변경 시 팝업 개수 조정
    window.addEventListener('resize', adjustPopupsOnResize);

    // 초기 팝업 설정 및 표시
    initializePopupQueue();
    showNextPopup();
}