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
