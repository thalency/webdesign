$(".js-nav-toggle").click(function(){$(".js-nav-target").toggleClass("nav-active")});var windowsize=$(window).width();function hideShowMenu(){(windowsize=$(window).width())<1025?$(".main-nav__ul").css("display","none"):$(".main-nav__ul").css("display","flex")}hideShowMenu(),$(window).resize(function(){hideShowMenu()});