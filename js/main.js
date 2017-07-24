var flyIn = function (target, index) {
    var elementToDrag = $('.' + target);
    if (elementToDrag) {
        setTimeout(function(){
            index++;
            elementToDrag.css({
                'opacity': 0,
                'visibility': 'visible'
            })
            .animate({
                'top': 200 * index + 'px',
                'left': '200px',
                'opacity': 1
            }, 1500, 'easeInOutExpo');
        }, 200 * index);
    }
}
var flyOut = function(target, index){
    var elementToDrag = $('.' + target);
    if (elementToDrag) {
        setTimeout(function(){

            elementToDrag.animate({
                'top': '0',
                'left': '0',
                'opacity': 0
            }, 1500, 'easeInOutExpo', function(){
                elementToDrag.css({
                    'visibility': 'hidden'
                });
            })

        }, 200 * index);
    }
}

var targetArr = [
    'target1',
    'target2',
    'target3'
]

$('#flyInButton').on('click', function(){
    for (var i = 0; i < targetArr.length; i++) {
        flyIn(targetArr[i], i);
    }
});
$('#resetButton').on('click', function(){
    for (var i = targetArr.length - 1, j = 0; i >= 0; i--, j++) {
        flyOut(targetArr[i], j);
    }
});



var $window = $(window),
    scrollLock = true,
    pageHeight = $window[0].outerHeight;

$('body').css({
    'height': (5 * pageHeight) + 'px'
});
$('.page').css({
    'height': pageHeight + 'px'
});

var lastScrollTop = 0;
var currentPage = 1;
var pageTop = $(this).scrollTop();


var keys = {37: 1, 38: 1, 39: 1, 40: 1};


function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}
function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove  = preventDefault; // mobile
        document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
}

$('html, body').animate({
    scrollTop: 1
}, 2000);

var scrollEventKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40];

$(window).on("DOMMouseScroll mousewheel touchmove keydown", function(event){
    debugger
    if (event.originalEvent.detail != 'undefined' || event.originalEvent.wheelDelta != 'undefined') {

        if(event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0
                || event.originalEvent.keyCode == 32 || event.originalEvent.keyCode == 39|| event.originalEvent.keyCode == 34) {
            currentPage++;
        } else if(event.originalEvent.keyCode == 33 || event.originalEvent.keyCode == 38 || event.originalEvent.keyCode == 37){
            currentPage--;
        } else {
            currentPage--;
        }

        if (currentPage < 1) {
            currentPage = 1;
        } else if(currentPage > 6){
            currentPage = 6;
        }

        $('html, body').animate({
            scrollTop: $('.page' + currentPage).offset().top
        }, 2000);

        disableScroll();
        setTimeout(function(){
            enableScroll();
        }, 50);
    } else {
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();
        return false;
    }
});
