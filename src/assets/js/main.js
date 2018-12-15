$('.js-nav-toggle').click(function () {
    $('.js-nav-target').toggleClass('nav-active');
});

var windowsize = $(window).width();
hideShowMenu();

$(window).resize(function() {
    hideShowMenu();
});

function hideShowMenu() {
    windowsize = $(window).width();
    if (windowsize < 1025) {
        $('.main-nav__ul').css('display', 'none');
    } else {
        $('.main-nav__ul').css('display', 'flex');
    }
}