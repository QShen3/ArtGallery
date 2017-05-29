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

ajastDom();
function ajastDom() {
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
    if (pageWidth > 768) {
        $("#home-welcome-content").css({ "height": pageHeight - 400 + "px" });
        $("#home-welcome-content").css({ "top": (pageHeight - $("#home-welcome-content").height() - 170) / 2 + "px", "left": (pageWidth - $("#home-welcome-content").width()) / 2 + "px" });
        $("#home-welcome-text").css({ "top": (pageHeight + $("#home-welcome-content").height()) / 2 + -75 + "px", "left": (pageWidth - $("#home-welcome-content").width()) / 2 + "px" });
        // $("#login-button").css({ "top": (pageHeight + $("#home-welcome-content").height()) / 2 + -75 +40+ "px", "left": (pageWidth - $("#home-welcome-content").width()) / 2 + "px" });
        $("#login-register").css({ "top": (pageHeight + $("#home-welcome-content").height()) / 2 + -95 + 100 + "px" });
    } else {
        $("#home-welcome-content").css({ "height": pageHeight - 250 + "px" });
        $("#home-welcome-content").css({ "top": (pageHeight - $("#home-welcome-content").height() - 40) / 2 + "px", "left": (pageWidth - $("#home-welcome-content").width()) / 2 + "px" });
        $("#home-welcome-text").css({ "top": (pageHeight + $("#home-welcome-content").height()) / 2 - 10 + "px", "left": (pageWidth - $("#home-welcome-content").width()) / 2 + "px" });
        // $("#login-button").css({ "top": (pageHeight + $("#home-welcome-content").height()) / 2 +20 + "px", "left": (pageWidth - $("#home-welcome-content").width()) / 2 + "px" });
        $("#login-register").css({ "top": (pageHeight + $("#home-welcome-content").height()) / 2 + 30 + "px" });
    }
    $("#login-pre").css({ "left": (pageWidth - $("#login-content").width()) / 2 + "px" });
    $("#home-logo").css({ "left": (pageWidth - $("#home-logo").width()) / 2 + "px" });
    $("#login-content").css({ "left": (pageWidth - $("#login-content").width()) / 2 + "px" });
    if (pageHeight > 500) {
        $("#login-content").css({ "top": (pageHeight - $("#login-content").height()) / 2 - 100 + "px" });
    } else {
        $("#login-content").css({ "top": (pageHeight - $("#login-content").height()) / 2 + "px" });
        $("#login-next").css({ "bottom": '-4em' });
    }
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

function changePages() {
    $("#login-button").fadeOut(400);
    $("#register-button").fadeOut(400);
    pageChanged = true;
    $("#home-welcome-content").unbind();
    clearTimer();
    $("#home-welcome-text").fadeOut(400, function () {

    });
    $("#home-welcome-content").fadeOut(400, function () {
        $("#home-welcome-content").css('background-image', 'url()');
        $("#home-welcome-content").stop(true, false).fadeIn(400, function () {

        });
    });
}

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

    $("#home-welcome-content").stop(true, false).on("swipeleft", function () {
        clearTimer();
        alert("sl");
        $("#home-welcome-content").stop(true, false).fadeOut(800, function () {
            $("#home-welcome-content").css('background-image', 'url(' + WelcomeImg[textIndex] + ')');
            $("#home-welcome-text").text(WelcomeText[textIndex]);
            $("#home-welcome-content").css('background-size', 'cover');
            $("#home-welcome-content").stop(true, false).fadeIn(400, function () {
            });
        });

        textIndex >= 3 ? textIndex = 0 : textIndex++;
    });

    $("#home-welcome-content").stop(true, false).on("swiperight", function () {
        clearTimer();
        alert("sr");
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

$("#login-button").click(
    function () {
        
        changePages();
        $("#home-logo").fadeOut(400, function () {
            $("#home-welcome-content").css('display', 'none');
            $("#home-logo").text("登录");
            $("#home-logo").css('backgroundImage', 'url()');
            $("#home-logo").fadeIn(400);
            $("#login-content").fadeIn(400);
            $("#login-content").fadeIn(400);
            $("#login-next").fadeIn(400);
            $("#login-pre").fadeIn(400);
        })
    }
)

$("#register-button").click(
    function () {
        $("#login-button").fadeOut(400);
        $("#register-button").fadeOut(400);
        changePages();
        $("#home-logo").fadeOut(400, function () {
            $("#home-welcome-content").css('display', 'none');
            $("#home-logo").text("注册");
            $("#home-logo").css('backgroundImage', 'url()');
            $("#home-logo").fadeIn(400);
            $("#login-next").fadeIn(400);
            $("#login-pre").fadeIn(400);
        })
    }
)

var pageReint = false;
$("#login-pre").click(
    function () {
        $("#login-button").fadeOut(400);
        $("#register-button").fadeOut(400);
        changePages();
        $("#home-logo").fadeOut(400, function () {
            $("#home-logo").text("");
            $("#home-logo").css('backgroundImage', 'url(./icons/galley-logo-c.png)');
            $("#home-logo").fadeIn(400);
            $("#home-welcome-content").fadeIn(400,function() {
                t = setTimeout("timedCount()", 2000);
                pageChanged = false;
            });
            $("#home-welcome-text").fadeIn(400);
            $("#login-register").fadeIn(400);
            iniPages();
            $("#home-welcome-content").css('background-image', 'url(' + WelcomeImg[textIndex] + ')');

        })


        $("#login-content").fadeOut(400);
        $("#login-content").fadeOut(400);
        $("#login-next").fadeOut(400);
        $("#login-pre").fadeOut(400);

    }
)



$(window).resize(function () {
    ajastDom();
});

$(window).on('orientationchange', function () {
    ajastDom();
});