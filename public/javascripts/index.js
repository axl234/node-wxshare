(function() {
  // loading
  function doit(end,id, fn){
    var o = document.getElementById(id);
    var i = 0;
    var Interval;
    if(i<end){
      Interval=setInterval(function(){
        o.innerHTML = i.toString();
        i++;
        if(i>end) {
          clearInterval(Interval);
          i = 0;
          fn && fn()
        }
      },10);
    }
    else alert('参数有误');
    
  }
  var jsAd,jsVd;
  jsAd = document.getElementById('ad');
  jsVd = document.getElementById('vd');
  // var player = videojs(jsVd, {
  //   isFullscreen: true
  // });
  // 解决ios 无法自动播放问题
  document.addEventListener("WeixinJSBridgeReady", function () { 
    // document.getElementById('car_audio').play(); 
    document.getElementById('ad').play(); 
    document.getElementById('vd').play(); 
    document.getElementById('vd').pause();
  }, false);

  // 进度条回调
  doit(100, 'loading', function() {
    $(".loading").fadeOut(1000);
    $('#img1').addClass('animated bounceInDown').show();  
    jsAd.play();
  })

  // 翻页
  var mySwiper = new Swiper ('.swiper-container', {
    direction : 'vertical',
    pagination: '.swiper-pagination',
    mousewheelControl : true,
    freeMode: false,
    onInit: function(swiper){
      // swiperAnimateCache(swiper);
      // swiperAnimate(swiper);
	  },
    onSlideChangeEnd: function(swiper){
      if (swiper.activeIndex === 0) {
        jsAd.play();
        // player.pause();
        jsVd.pause();
        $(".arrowUp").hide();
        $(".arrow").show();
        $('#img1').show().addClass('animated bounceInDown');  
      }
      if (swiper.activeIndex === 1) {
        jsAd.pause();
        // player.play();
        jsVd.play();
        $("#img2").hide()
        $(".arrow").hide();
        $(".arrowUp").show();
        $('#img1').removeClass('animated bounceInDown').hide();
      }
    }
  })
    
  $("#mute").click(function() {
    var isMuted = jsVd.muted;
    if (isMuted) {
      $(this).addClass('on').removeClass('off');
    } else {
      $(this).addClass('off').removeClass('on');
    }
    jsVd.muted = !isMuted 
    
  //  $("#vd")[0].muted = true;
  })
  $("#admute").click(function() {
    var isMuted = jsAd.muted;
    if (isMuted) {
      $(this).addClass('on').removeClass('off');
    } else {
      $(this).addClass('off').removeClass('on');
    }
    jsAd.muted = !isMuted 
    
  //  $("#vd")[0].muted = true;
  })
  // 首屏监听 img1 动画结束触发动画二
  var tt = document.querySelector('#img1'); 
  
  tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件 
    $("#img2").fadeIn(1000)
  }, false); 
    
    
})()
