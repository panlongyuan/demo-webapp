/*REM*/

// (function(){
//     const baseSize = 100;
//     function setrem() {
//         let scale = document.documentElement.clientWidth / 750
//         document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
//     }
//     setrem()
//     window.onresize = function () {
//         setrem()
//     }
// })();

(function ($) {
    let computed = ()=>{
        let value = 100;
        let winW = $(document.documentElement)[0].clientWidth;
        let scale = winW / 750;
        value = winW < 750 ? scale*value : value
        $(document.documentElement).css('fontSize', value)
    }
    computed();
    $(window).on('resize', computed)
})(Zepto);

/*HEADER*/
let headerRender = (function ($) {
    let $headerBox = $('.headerBox'),
        $menu = $headerBox.find('.menu'),
        $navBox = $headerBox.find('.navBox'),
        flag = false;

    return {
        init:function () {
            $menu.tap(function () {
                // alert(1000)
                if (flag === false){
                    $navBox.css({padding:'.16rem 0',height:'1.28rem'})
                    flag = true;
                    return
                }else {
                    $navBox.css({padding:'0',height:'0'})
                    flag = false;
                }

            })
        }
    }
})(Zepto);
headerRender.init();

/*BANNER*/
let bannerRender = (function ($) {
    let bannerSwiper = null,
        $bannerBox = $('.bannerBox'),
        $wrapper = $bannerBox.find('.swiper-wrapper'),
        $plan = $.Callbacks();

    $plan.add((res)=>{
        $bannerBox.css('display','block');
        let str = ``;
        res.forEach((item, index)=>{
            str += `<div class="swiper-slide">
                <a href="javascript:;">
                    <img data-src="${item.src}" alt="" class="swiper-lazy">
                    <p>${item.title}</p>
                </a>
            </div>`
        })
        $wrapper.html(str)
    });

    $plan.add(()=>{
        bannerSwiper = new Swiper ('.bannerBox', {
            autoplay:5000,
            loop: true,
            autoplayDisableOnInteraction:false,
            pagination: '.swiper-pagination',
            paginationType : 'fraction',
            lazyLoading : true,
            lazyLoadingInPrevNext : true,
        })
    })

    return {
        init:function () {
            $.ajax({
                url:'js/banner.json',
                method:'GET',
                dataType:'json',
                cache:false,
                success:(res)=>{
                    $plan.fire(res);
                }
            })
        }
    }
})(Zepto);
bannerRender.init();

/*LIVE*/
let liveRender = (function ($) {
    let $liveBox = $('.liveBox'),
        $wrapper = $liveBox.find('.swiper-wrapper'),
        $plan = $.Callbacks(),
        $liveSwiper = null;

    $plan.add((res)=>{
        let str = ``;
        res.forEach((item, index)=>{
            str += `<div class="swiper-slide"><a href="javascript:;">${item.title}</a></div>`
        });
        $wrapper.html(str);
    });

    $plan.add(()=>{
        $liveSwiper = new Swiper('.liveCon', {
            direction:'vertical',
            autoplay: 2000,
            loop: true
        })
    });

    return {
        init:function () {
            $.ajax({
                url: 'js/aside.json',
                method: 'GET',
                dataType: 'json',
                cache: false,
                success:(res)=>{
                    $plan.fire(res)
                }
            });
        }
    }
})(Zepto);
liveRender.init();
