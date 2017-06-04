// new Vue({
//   el: '#transition-components-demo',
//   data: {
//     view: 'v-a'
//   },
//   components: {
//     'v-a': {
//       template: '<div>Component A</div>'
//     },
//     'v-b': {
//       template: '<div>Component B</div>'
//     }
//   }
// })

var pageWidth = window.innerWidth,
    pageHeight = window.innerHeight;

if (typeof pageWidth != "number") {
    if (document.compatMode == "CSS1Compat") {
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
    } else {
        pageWidth = document.body.clientWidth;
        pageHeight = document.body.clientHeight;
    }
}

var artworkLeft = (pageWidth - $("#id-artwork-intro").width()) / 2 + 'px';
var artworkGoTop = ((pageHeight - $("#nav-slide-content").height()) - $("#artwork-go-next").height()) / 2 + 'px';

ajastDom();
function ajastDom() {
    pageWidth = window.innerWidth,
        pageHeight = window.innerHeight;

    if (typeof pageWidth != "number") {
        if (document.compatMode == "CSS1Compat") {
            pageWidth = document.documentElement.clientWidth;
            pageHeight = document.documentElement.clientHeight;
        } else {
            pageWidth = document.body.clientWidth;
            pageHeight = document.body.clientHeight;
        }
    }

    // $("#mod-exit").css({ "width": pageWidth + "px" });
    $("#me-page-content").css('left', (pageWidth - $("#me-page-content").width()) / 2 + 'px');
    artworkLeft = (pageWidth - $("#id-artwork-intro").width()) / 2 + 'px';
    $("#id-artwork-intro").css('left', artworkLeft);

    artworkGoTop = ((pageHeight - $("#nav-slide-content").height()) - $("#artwork-go-next").height()) / 2 + 'px';
    $("#artwork-go-next").css('top', artworkGoTop);
    $("#artwork-go-pre").css('top', artworkGoTop);
    if (pageWidth > 768) {
        $("#home-welcome-content").css({ "height": pageHeight - 400 + "px" });
        $("#home-welcome-content").css({ "top": (pageHeight - $("#home-welcome-content").height() - 170) / 2 + "px", "left": (pageWidth - $("#home-welcome-content").width()) / 2 + "px" });
        $("#home-welcome-text").css({ "top": (pageHeight + $("#home-welcome-content").height()) / 2 + -75 + "px", "left": (pageWidth - $("#home-welcome-content").width()) / 2 + "px" });
        // $("#login-button").css({ "top": (pageHeight + $("#home-welcome-content").height()) / 2 + -75 +40+ "px", "left": (pageWidth - $("#home-welcome-content").width()) / 2 + "px" });
        $("#login-register").css({ "top": (pageHeight + $("#home-welcome-content").height()) / 2 + -95 + 100 + "px" });
        $("#mod-exit").css({ "top": (pageHeight + $("#me-page-content").height()) / 2 + -95 + 100 + "px" });
    } else {
        $("#home-welcome-content").css({ "height": pageHeight - 250 + "px" });
        $("#home-welcome-content").css({ "top": (pageHeight - $("#home-welcome-content").height() - 40) / 2 + "px", "left": (pageWidth - $("#home-welcome-content").width()) / 2 + "px" });
        $("#home-welcome-text").css({ "top": (pageHeight + $("#home-welcome-content").height()) / 2 - 10 + "px", "left": (pageWidth - $("#home-welcome-content").width()) / 2 + "px" });
        // $("#login-button").css({ "top": (pageHeight + $("#home-welcome-content").height()) / 2 +20 + "px", "left": (pageWidth - $("#home-welcome-content").width()) / 2 + "px" });
        $("#login-register").css({ "top": (pageHeight + $("#home-welcome-content").height()) / 2 + 30 + "px" });
        $("#mod-exit").css({ "top": (pageHeight + $("#me-page-content").height()) / 2 + -95 + 100 + "px" });
    }
    $("#login-pre").css({ "left": (pageWidth - $("#login-content").width()) / 2 + "px" });
    $("#register2-pre").css({ "left": (pageWidth - $("#login-content").width()) / 2 + "px" });
    $("#home-logo").css({ "left": (pageWidth - $("#home-logo").width()) / 2 + "px" });
    $("#login-content").css({ "left": (pageWidth - $("#login-content").width()) / 2 + "px" });
    $("#register-content").css({ "left": (pageWidth - $("#login-content").width()) / 2 + "px" });
    $("#registe2-page-content").css({ "left": (pageWidth - $("#registe2-page-content").width()) / 2 + "px" });
    if (pageHeight > 400) {
        $("#login-next").css({ "bottom": '-16em' });
        $("#register-next").css({ "bottom": '-12em' });
        $("#register-next2").css({ "bottom": '-8em' });
        $("#login-next").css({ "right": '0' });
        $("#register-next").css({ "right": '0' });
        $("#register-next2").css({ "right": '0' });
        if (pageWidth < 330) {
            $("#register-next").css({ "bottom": '-8em' });
            $("#register-next2").css({ "bottom": '-5em' });
            $("#login-next").css({ "bottom": '-12em' });
            $("#login-content").css({ "top": (pageHeight - $("#login-content").height()) / 2 - 60 + "px" });
            $("#register-content").css({ "top": (pageHeight - $("#login-content").height()) / 2 - 60 + "px" });
            $("#registe2-page-content").css({ "top": (pageHeight - $("#login-content").height()) / 2 - 60 + "px" });
        } else {
            $("#login-content").css({ "top": (pageHeight - $("#login-content").height()) / 2 - 100 + "px" });
            $("#register-content").css({ "top": (pageHeight - $("#login-content").height()) / 2 - 100 + "px" });
            $("#registe2-page-content").css({ "top": (pageHeight - $("#login-content").height()) / 2 - 100 + "px" });
        }

    } else {
        $("#login-content").css({ "top": (pageHeight - $("#login-content").height()) / 2 + "px" });
        $("#login-next").css({ "bottom": '0em' });
        $("#login-next").css({ "right": '-5em' });
        $("#register-content").css({ "top": (pageHeight - $("#login-content").height()) / 2 + "px" });
        $("#registe2-page-content").css({ "top": (pageHeight - $("#login-content").height()) / 2 + "px" });
        $("#register-next").css({ "bottom": '0em' });
        $("#register-next").css({ "right": '-5em' });
        $("#register-next2").css({ "bottom": '0em' });
        $("#register-next2").css({ "right": '-5em' });
    }
    $("#edit-content").css({ "left": (pageWidth - $("#edit-content").width()) / 2 + "px" });
    $("#edit-content").css({ "top": (pageHeight - $("#edit-content").height()) / 2 - 60 + "px" })
}

var textIndex = 0;
var t;
var nt;
var WelcomeText = ['来自吷买井页的Gallery', 'From Howto\'s Gallery', 'ようこそGallery', 'Bienvenue à la galerie'];
var WelcomeImg = ['./img/wimg1.png', './img/wimg2.jpg', './img/wimg3.jpg', './img/wimg4.png'];
var pageChanged = false;
var tn = setTimeout("timedCount()", 2000);
function timedCount() {
    // $("#home-welcome-text").fadeOut(800,function(){
    // $("#home-welcome-text").text(WelcomeText[textIndex]);
    //     $("#home-welcome-text").fadeIn(400,function() {
    //     });
    // });

    $("#home-welcome-content").stop(true, false).fadeOut(800, function () {
        $("#home-welcome-content").css('background-image', 'url(' + WelcomeImg[textIndex] + ')');
        $("#home-welcome-text").text(WelcomeText[textIndex]);
        $("#home-welcome-content").css('background-size', 'cover');
        $("#home-welcome-content").stop(true, false).fadeIn(400, function () {
            if (!pageChanged) {
                t = setTimeout("timedCount()", 2000);
            }
        });
    });

    textIndex >= 3 ? textIndex = 0 : textIndex++;
}

// $("#home-welcome-content").hover(function(){
//     clearTimeout(t);
// },function(){
// });

function clearTimer() {
    clearTimeout(tn);
    clearTimeout(t);
    clearTimeout(nt);
}

iniPages();

// function changePages() {
//     $("#login-button").fadeOut(400);
//     $("#register-button").fadeOut(400);
//     pageChanged = true;
//     $("#home-welcome-content").unbind();
//     clearTimer();
//     $("#home-welcome-text").fadeOut(400, function () {

//     });
//     $("#home-welcome-content").fadeOut(400, function () {
//         $("#home-welcome-content").css('background-image', 'url()');
//         $("#home-welcome-content").stop(true, false).fadeIn(400, function () {

//         });
//     });
// }

function iniPages() {
    $("#login-button").fadeIn(400);
    $("#register-button").fadeIn(400);
    $("#home-welcome-content").mouseover(function () {
        clearTimeout(tn);
        clearTimeout(t);
        clearTimeout(nt);
    });

    $("#home-welcome-content").mouseout(function () {
        nt = setTimeout("timedCount()", 2000);
    });


    // $("#register-button").mouseover(function(){
    //     clearTimeout(tn);
    //     clearTimeout(t);
    //     clearTimeout(nt);
    // });

    // $("#login-button").mouseout(function () {
    //     nt = setTimeout("timedCount()", 2000);
    // })

    // $("#login-button").mouseover(function(){
    //     clearTimeout(tn);
    //     clearTimeout(t);
    //     clearTimeout(nt);
    // });

    // $("#register-button").mouseout(function () {
    //     nt = setTimeout("timedCount()", 2000);
    // })

    $("#home-welcome-content").on("swipeleft", function () {
        clearTimer();
        $("#home-welcome-content").stop(true, false).fadeOut(800, function () {
            $("#home-welcome-content").css('background-image', 'url(' + WelcomeImg[textIndex] + ')');
            $("#home-welcome-text").text(WelcomeText[textIndex]);
            $("#home-welcome-content").css('background-size', 'cover');
            $("#home-welcome-content").stop(true, false).fadeIn(400, function () {

            });
        });

        textIndex >= 3 ? textIndex = 0 : textIndex++;
    });

    $("#home-welcome-content").on("swiperight", function () {
        clearTimer();
        $("#home-welcome-content").stop(true, false).fadeOut(800, function () {
            $("#home-welcome-content").css('background-image', 'url(' + WelcomeImg[textIndex] + ')');
            $("#home-welcome-text").text(WelcomeText[textIndex]);
            $("#home-welcome-content").css('background-size', 'cover');
            $("#home-welcome-content").stop(true, false).fadeIn(400, function () {

            });
        });

        textIndex <= 0 ? textIndex = 3 : textIndex--;
    });

    ajastDom();

}

// $("#login-button").click(
//     function () {

//         changePages();
//         $("#home-logo").fadeOut(400, function () {
//             $("#home-welcome-content").css('display', 'none');
//             $("#home-logo").text("登录");
//             $("#home-logo").css('backgroundImage', 'url()');
//             $("#home-logo").fadeIn(400);
//             $("#login-content").fadeIn(400);
//             $("#login-content").fadeIn(400);
//             $("#login-next").fadeIn(400);
//             $("#login-pre").fadeIn(400, function () {
//                 $("#home-welcome-content").css('display', 'none');
//             });
//         })
//     }
// )

// $("#register-button").click(
//     function () {
//         $("#login-button").fadeOut(400);
//         $("#register-button").fadeOut(400);
//         changePages();
//         $("#home-logo").fadeOut(400, function () {
//             $("#home-welcome-content").css('display', 'none');
//             $("#home-logo").text("注册");
//             $("#home-logo").css('backgroundImage', 'url()');
//             $("#home-logo").fadeIn(400);
//             $("#register-content").fadeIn(400);
//             $("#register-content").fadeIn(400);
//             $("#register-next").fadeIn(400);
//             $("#login-pre").fadeIn(400, function () {
//                 $("#home-welcome-content").css('display', 'none');
//             });
//         })
//     }
// )

// var pageReint = false;
// $("#login-pre").click(
//     function () {
//         $("#login-button").fadeOut(400);
//         $("#register-button").fadeOut(400);
//         changePages();
//         $("#home-logo").fadeOut(400, function () {
//             $("#home-logo").text("");
//             $("#home-logo").css('backgroundImage', 'url(./icons/galley-logo-c.png)');
//             $("#home-logo").fadeIn(400);
//             $("#home-welcome-content").fadeIn(400, function () {
//                 t = setTimeout("timedCount()", 2000);
//                 pageChanged = false;
//             });
//             $("#home-welcome-text").fadeIn(400);
//             $("#login-register").fadeIn(400);
//             iniPages();
//             $("#home-welcome-content").css('background-image', 'url(' + WelcomeImg[textIndex] + ')');

//         })


//         $("#login-content").fadeOut(400);
//         $("#login-content").fadeOut(400);
//         $("#login-next").fadeOut(400);
//         $("#login-pre").fadeOut(400);
//         $("#register-content").fadeOut(400);
//         $("#register-content").fadeOut(400);
//         $("#register-next").fadeOut(400);
//         $("#register-pre").fadeOut(400);

//     }
// )


// $("#login-next").click(
//     function () {
//         $("#home-logo").fadeOut(400, function () {
//             $("#home-page").fadeIn(400);
//             with (location) {
//                 var recGalleryScroll = new IScroll('#rec-gallery-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

//                 var newGalleryScroll = new IScroll('#new-gallery-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

//                 var newArtScroll = new IScroll('#new-art-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
//             }
//         })
//         $("#login-content").fadeOut(400);
//         $("#login-next").fadeOut(400);
//         $("#login-pre").fadeOut(400);

//     }
// )

// $("#register-next").click(
//     function () {
//         $("#home-logo").fadeOut(400, function () {
//             $("#home-page").fadeIn(400);
//             with (location) {
//                 // var recGalleryScroll = new IScroll('#rec-gallery-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

//                 // var newGalleryScroll = new IScroll('#new-gallery-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

//                 // var newArtScroll = new IScroll('#new-art-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
//                 // var newArtScroll = new IScroll('#gallery-page', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

//             }
//         })
//         $("#register-content").fadeOut(400);
//         $("#register-next").fadeOut(400);
//         $("#login-pre").fadeOut(400);

//     }
// )
var searchFoldedBool = true;
$("#unfold-search-block").click(
    function () {
        searchFoldedBool = false;
        var px = $('#unfold-search-block').css('marginLeft');
        $("#unfold-search-block").css({ position: 'absolute', left: px });
        $("#unfold-search-block-fake").css('display', 'block');
        $("#unfold-search-block-fake").slideUp(200);
        $("#unfold-search-block").fadeOut(200);
        $("#search-back-top").slideDown(200);
        $("#folded").slideDown(200);
        // $("#folded").fadeIn(200);
        // $("#folded").animate({height:"157px"},200);
        // $("#folded").animate({opacity:1});
    }
);

$("#search-back-top").click(
    function () {
        searchFoldedBool = true;
        $("#unfold-search-block").slideDown(200);
        $("#search-back-top").slideUp(200, function () {
        });
        $("#unfold-search-block").css({ position: 'relative', left: "0px", paddingLeft: '20px' });
        // $("#unfold-search-block").animate({opacity:0},10);
        $("#folded").slideUp(200, function () {
            // $("#folded").css('height',47+'px');
        });

    }
);

$("#gallery-go-top").click(
    function () {
        alert("sds")

    }
);

var beforeScrollTop = document.body.scrollTop; //  判断滚动方向

var op2 = 255;
var op=1;

window.onscroll = function () {

    var afterScrollTop = document.body.scrollTop; //  判断滚动方向
    var delta = afterScrollTop - beforeScrollTop;
    beforeScrollTop = afterScrollTop;
    var initscrollTop = 0;
    var scollTopNow = jQuery(window).scrollTop();
    console.log(jQuery(window).scrollTop());
    if (op2 >= 0 && op >= 0) {
            op = 1 - (scollTopNow) / 55;
            op2 = 255 - (255 / 55) * (scollTopNow);
            console.log("op:"+op);
            console.log('op2:' + op2);
        } else {
            op2 = 0;
            op = 0;
        }

    if (pageNow[pageNow.length - 1] == "home") {
        $("#home-a-li").css('border-bottom', '3px solid ' + 'rgb' + '(' + op2 + ',' + op2 + ',' + op2 + ')');
    };
    if (pageNow[pageNow.length - 1] == "search") {
        $("#search-a-li").css('border-bottom', '3px solid ' + 'rgb' + '(' + op2 + ',' + op2 + ',' + op2 + ')');
    };
    if (pageNow[pageNow.length - 1] == "collection") {
        $("#collection-a-li").css('border-bottom', '3px solid ' + 'rgb' + '(' + op2 + ',' + op2 + ',' + op2 + ')');
    };
    if (pageNow[pageNow.length - 1] == "gallery") {
        $("#gallery-a-li").css('border-bottom', '3px solid ' + 'rgb' + '(' + op2 + ',' + op2 + ',' + op2 + ')');
    };

    $("#nav-slide-content").css('background', 'rgba' + '(153,153,153,' + op + ')');
    console.log('rgb' + '(' + op2 + ',' + op2 + ',' + op2 + ')')
    $("#art-nav-b").css('color', 'rgb' + '(' + op2 + ',' + op2 + ',' + op2 + ')');
    $("#art-nav-b").css('color', 'rgb' + '(' + op2 + ',' + op2 + ',' + op2 + ')');

    if (scollTopNow > 0) {
        searchFoldedBool = true;
        $("#unfold-search-block").slideDown(300);
        $("#search-back-top").slideUp(300, function () {
        });
        $("#unfold-search-block").css({ position: 'relative', left: "0px", paddingLeft: '20px' });
        // $("#unfold-search-block").animate({opacity:0},10);
        $("#folded").slideUp(300, function () {
            // $("#folded").css('height',47+'px');
        });
    } else if (scollTopNow < 0) {
        // var px = $('#unfold-search-block').css('marginLeft');
        // $("#unfold-search-block").fadeOut(100);
        // $("#search-back-top").slideDown(100);
        // $("#folded").slideDown(100);
    }

    if (scollTopNow == 0) {
        $("#art-nav-b").css('background', "none");
        $("#art-nav-b").css('position', 'relative');
        $("#art-nav-b-fake").css('position', 'fixed');
        $("#nav-slide-content").css('background', 'rgb' + '(153,153,153)');
    } else if (scollTopNow >= 73) {
        $("#art-nav-b").css('background', 'rgb' + '(255,255,255)');
        // $("#art-nav-b").css('color', 'rgb' + '(0,0,0)');
        $("#art-nav-b-fake").css('position', 'relative');
        $("#art-nav-b").css('position', 'fixed');
    } else {
        $("#art-nav-b").css('background', "none");
        $("#art-nav-b").css('position', 'relative');
        $("#art-nav-b-fake").css('position', 'fixed');
    }

    setTimeout(function () {
        console.log("timeout");
        var afterScrollTop = document.body.scrollTop; //  判断滚动方向
        var delta = afterScrollTop - beforeScrollTop;
        beforeScrollTop = afterScrollTop;
        var initscrollTop = 0;
        var scollTopNow = jQuery(window).scrollTop();
        console.log(jQuery(window).scrollTop());
        // op = 1 - (scollTopNow) / 55;
        // op2 = 255 - (255 / 55) * (scollTopNow);
        // console.log(op);
        // console.log('op2' + op2);

        if (op2 >= 0 && op >= 0) {
            op = 1 - (scollTopNow) / 55;
            op2 = 255 - (255 / 55) * (scollTopNow);
            console.log("op:"+op);
            console.log('op2:' + op2);
        } else {
            op2 = 0;
            op = 0;
        }
        if (pageNow[pageNow.length - 1] == "home") {
            $("#home-a-li").css('border-bottom', '3px solid ' + 'rgb' + '(' + op2 + ',' + op2 + ',' + op2 + ')');
        };
        if (pageNow[pageNow.length - 1] == "search") {
            $("#search-a-li").css('border-bottom', '3px solid ' + 'rgb' + '(' + op2 + ',' + op2 + ',' + op2 + ')');
        };
        if (pageNow[pageNow.length - 1] == "collection") {
            $("#collection-a-li").css('border-bottom', '3px solid ' + 'rgb' + '(' + op2 + ',' + op2 + ',' + op2 + ')');
        };
        if (pageNow[pageNow.length - 1] == "gallery") {
            $("#gallery-a-li").css('border-bottom', '3px solid ' + 'rgb' + '(' + op2 + ',' + op2 + ',' + op2 + ')');
        };

        $("#nav-slide-content").css('background', 'rgba' + '(153,153,153,' + op + ')');
        console.log('rgb' + '(' + op2 + ',' + op2 + ',' + op2 + ')')
        $("#art-nav-b").css('color', 'rgb' + '(' + op2 + ',' + op2 + ',' + op2 + ')');
        $("#art-nav-b").css('color', 'rgb' + '(' + op2 + ',' + op2 + ',' + op2 + ')');

        console.log("time" + scollTopNow)
        if (scollTopNow > 0) {
            searchFoldedBool = true;
            $("#unfold-search-block").slideDown(300);
            $("#search-back-top").slideUp(300, function () {
            });
            $("#unfold-search-block").css({ position: 'relative', left: "0px", paddingLeft: '20px' });
            // $("#unfold-search-block").animate({opacity:0},10);
            $("#folded").slideUp(300, function () {
                // $("#folded").css('height',47+'px');
            });
        } else if (scollTopNow < 0) {
            // var px = $('#unfold-search-block').css('marginLeft');
            // $("#unfold-search-block").fadeOut(100);
            // $("#search-back-top").slideDown(100);
            // $("#folded").slideDown(100);
        }

        if (scollTopNow == 0) {
            $("#art-nav-b").css('background', "none");
            $("#art-nav-b").css('position', 'relative');
            $("#art-nav-b-fake").css('position', 'fixed');
            $("#nav-slide-content").css('background', 'rgb' + '(153,153,153)');
        } else if (scollTopNow >= 73) {
            $("#art-nav-b").css('background', 'rgb' + '(255,255,255)');
            // $("#art-nav-b").css('color', 'rgb' + '(0,0,0)');
            $("#art-nav-b-fake").css('position', 'relative');
            $("#art-nav-b").css('position', 'fixed');
        } else {
            $("#art-nav-b").css('background', "none");
            $("#art-nav-b").css('position', 'relative');
            $("#art-nav-b-fake").css('position', 'fixed');
        }
    }, 100);

    if (delta > 0) {
        // $("#howto-cover-content").css({ 'top': parseInt(coverContentTop) + 1 + "px" });
    } else {
        // $("#howto-cover-content").css({ 'top': parseInt(coverContentTop) - 1 + "px" });
    }
};


var ArtworkImg = ['./img/wimg1.png', './img/wimg2.jpg', './img/wimg3.jpg', './img/wimg4.png'];
var artwiIndex = 0;
$("artwork-go-next").click(function () {
    $("#artwork-part-img").stop(true, false).fadeOut(800, function () {
        $("#artwork-part-img").css('background-image', 'url(' + ArtworkImg[artwiIndex] + ')');
        $("#home-welcome-content").css('background-size', 'cover');
        $("#home-welcome-content").stop(true, false).fadeIn(400, function () {
        });
    });

    artwiIndex >= ArtworkImg.length ? artwiIndex = 0 : artwiIndex++;
});

$("artwork-go-pre").click(function () {
    $("#artwork-part-img").stop(true, false).fadeOut(800, function () {
        $("#artwork-part-img").css('background-image', 'url(' + ArtworkImg[artwiIndex] + ')');
        $("#home-welcome-content").css('background-size', 'cover');
        $("#home-welcome-content").stop(true, false).fadeIn(400, function () {
        });
    });

    artwiIndex <= 0 ? artwiIndex = ArtworkImg.length : artwiIndex--;
});


$("#artwork-go-next").on("swipeleft", function () {
    $("#artwork-part-img").stop(true, false).fadeOut(800, function () {
        $("#artwork-part-img").css('background-image', 'url(' + ArtworkImg[artwiIndex] + ')');
        $("#home-welcome-content").css('background-size', 'cover');
        $("#home-welcome-content").stop(true, false).fadeIn(400, function () {
        });
    });

    artwiIndex >= ArtworkImg.length ? artwiIndex = 0 : artwiIndex++;
});

$("#home-welcome-content").on("swiperight", function () {
    $("#artwork-part-img").stop(true, false).fadeOut(800, function () {
        $("#artwork-part-img").css('background-image', 'url(' + ArtworkImg[artwiIndex] + ')');
        $("#home-welcome-content").css('background-size', 'cover');
        $("#home-welcome-content").stop(true, false).fadeIn(400, function () {
        });
    });

    artwiIndex <= 0 ? artwiIndex = ArtworkImg.length : artwiIndex--;
});

function anyClick(index) {
    if (index == 0) {
        var galleryName = $('input[name=galleryName]').val();
        if (galleryName == "所有画廊") {
            $('input[name=galleryName]').val("");
        }
    } else if (index == 1) {
        var style = $('input[name=style]').val();
        if (style == "所有描述") {
            $('input[name=style]').val("");
        }
    } else if (index == 2) {
        var key = $('input[name=key]').val();
        if (key == "所有作品") {
            $('input[name=key]').val("");
        }
    }

}

function anyBlur(index) {
    var style = $('input[name=style]').val();
    if (style == "") {
        $('input[name=style]').val("所有描述");
        $("#any-s-span").text("所有描述");
    } else {
        $("#any-s-span").text($('input[name=style]').val());
    }
    var key = $('input[name=key]').val();
    if (key == "") {
        $('input[name=key]').val("所有作品");
        $("#any-a-span").text("所有作品");
    } else {
        $("#any-a-span").text($('input[name=key]').val());

    }
    var galleryName = $('input[name=galleryName]').val();
    if (galleryName == "") {
        $('input[name=galleryName]').val("所有画廊");
        $("#any-gallery-span").text("所有画廊");
    } else {
        $("#any-gallery-span").text($('input[name=galleryName]').val());

    }
}

function everyThingIsGrey() {
    $("#home-a-li").css('border-bottom', 'none');
    $("#search-a-li").css('border-bottom', 'none');
    $("#collection-a-li").css('border-bottom', 'none');
    $("#gallery-a-li").css('border-bottom', 'none');
}

$("#search-a").click(
    function () {
        // everyThingIsGrey();
        // $("#search-a").css('color','white');
        if (pageNow[pageNow.length - 1] != "search") {

            everyThingIsGrey();
            $("#search-a-li").css('border-bottom', '3px solid ' + 'rgb' + '(' + op2 + ',' + op2 + ',' + op2 + ')');
            if (searchFoldedBool) {
                if ($('body').scrollTop() > 55) {
                    $('body,html').animate({ scrollTop: 0 }, 200, function () {
                        searchFoldedBool = false;
                        var px = $('#unfold-search-block').css('marginLeft');
                        $("#unfold-search-block").css({ position: 'absolute', left: px });
                        $("#unfold-search-block-fake").css('display', 'block');
                        $("#unfold-search-block-fake").slideUp(200);
                        $("#unfold-search-block").fadeOut(200);
                        $("#search-back-top").slideDown(200);
                        $("#folded").slideDown(200);
                    });
                } else {
                    searchFoldedBool = false;
                    var px = $('#unfold-search-block').css('marginLeft');
                    $("#unfold-search-block").css({ position: 'absolute', left: px });
                    $("#unfold-search-block-fake").css('display', 'block');
                    $("#unfold-search-block-fake").slideUp(200);
                    $("#unfold-search-block").fadeOut(200);
                    $("#search-back-top").slideDown(200);
                    $("#folded").slideDown(200);
                }

            }

            pageNow.push("search");
            $("#search-page-content").fadeIn(400);
            fadeoutNow();
            var $defaultSea;
            $("#searchForm").ajaxSubmit({
                type: "get",
                url: "/v1/art/search",
                success: function (result) {
                    console.log("here");
                    if (result.info.code == "200") {
                        if (!(result.lists instanceof Array)) {
                            console.error("Parameter wrong : {" + result.lists + "} is not an Array");
                            return null;
                        }
                        seaArtWorks = result.lists;
                        if (seaArtWorks.length != 0) {
                            $defaultSea = $("#search-page-content div:eq(0)").remove();
                            $("#search-page-content").html("");
                            $("#search-page-content").append("<p class='slide-title'>检索</p>");
                            for (var i in seaArtWorks) {
                                $("#search-page-content").append("<div class='search-part-content'><div class='search-part-img' style='background:url(" + seaArtWorks[i].cover + ");background-size:cover;'></div><p class='slide-part-intro-m'>" + seaArtWorks[i].profile + "</p><p class='slide-part-intro'>" + seaArtWorks[i].title + " 来自" + "<span class='slide-part-from'>" + seaArtWorks[i].author.info.name + "</span><span class='slide-part-from'>" + "的" + seaArtWorks[i].author.info.galleryName + "</span></p></div>");
                            }
                            var divs = $("#search-page-content div").toArray();
                            for (var i in divs) {
                                divs[i].onclick = function (ii) {
                                    return function () {
                                        var index = 0;
                                        $("#artwork-page-content div.go-next").click(function () {
                                            if (index < seaArtWorks[ii].urls.length - 1) {
                                                index++;
                                                $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + seaArtWorks[ii].urls[index] + ')');
                                            }
                                        });
                                        $("#artwork-page-content div.go-pre").click(function () {
                                            if (index > 0) {
                                                index--;
                                                $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + seaArtWorks[ii].urls[index] + ')');
                                            }
                                        });

                                        $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + seaArtWorks[ii].urls[index] + ')');
                                        $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro-m").html(seaArtWorks[ii].profile);
                                        $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").html(seaArtWorks[ii].title + " 来自");
                                        $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").append("<span class='slide-part-from'>" + seaArtWorks[ii].author.info.name + "的</span>");
                                        $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").append("<span class='slide-part-from'>" + seaArtWorks[ii].author.info.galleryName + "</span>");
                                        artworkLeft = (pageWidth - $("#id-artwork-intro").width()) / 2 + 'px';
                                        $("#id-artwork-intro").css('left', artworkLeft);
                                        //$("#artwork-page-content").fadeIn(400);
                                        //$("#home-page").fadeOut(400);
                                        pageNow.push("artworks");
                                        fadeoutNow();
                                        fadeinNow();
                                    }
                                }(i)
                            }
                        }
                    }
                }
            })

        }
    }
);

$(window).resize(function () {
    ajastDom();
});

$(window).on('orientationchange', function () {

});