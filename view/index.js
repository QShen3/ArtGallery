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
    $("#register-content").css({ "left": (pageWidth - $("#login-content").width()) / 2 + "px" });
    if (pageHeight > 400) {
        $("#login-next").css({ "bottom": '-16em' });
        $("#register-next").css({ "bottom": '-12em' });
        $("#login-next").css({ "right": '0' });
        $("#register-next").css({ "right": '0' });
        if (pageWidth < 330) {
            $("#register-next").css({ "bottom": '-8em' });
            $("#login-next").css({ "bottom": '-12em' });
            $("#login-content").css({ "top": (pageHeight - $("#login-content").height()) / 2 - 60 + "px" });
            $("#register-content").css({ "top": (pageHeight - $("#login-content").height()) / 2 - 60 + "px" });
        } else {
            $("#login-content").css({ "top": (pageHeight - $("#login-content").height()) / 2 - 100 + "px" });
            $("#register-content").css({ "top": (pageHeight - $("#login-content").height()) / 2 - 100 + "px" });
        }

    } else {
        $("#login-content").css({ "top": (pageHeight - $("#login-content").height()) / 2 + "px" });
        $("#login-next").css({ "bottom": '0em' });
        $("#login-next").css({ "right": '-5em' });
        $("#register-content").css({ "top": (pageHeight - $("#login-content").height()) / 2 + "px" });
        $("#register-next").css({ "bottom": '0em' });
        $("#register-next").css({ "right": '-5em' });
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
            $("#login-pre").fadeIn(400, function () {
                $("#home-welcome-content").css('display', 'none');
            });
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
            $("#register-content").fadeIn(400);
            $("#register-content").fadeIn(400);
            $("#register-next").fadeIn(400);
            $("#login-pre").fadeIn(400, function () {
                $("#home-welcome-content").css('display', 'none');
            });
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
            $("#home-welcome-content").fadeIn(400, function () {
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
        $("#register-content").fadeOut(400);
        $("#register-content").fadeOut(400);
        $("#register-next").fadeOut(400);
        $("#register-pre").fadeOut(400);

    }
)


$("#login-next").click(
    function () {
        $("#home-logo").fadeOut(400, function () {
            $("#home-page").fadeIn(400);
            with (location) {
                var newGalleryScroll = new iScroll('new-gallery-slide', {
                    scrollbarClass: 'myScrollbar'
                });

                var newArtScroll = new iScroll('new-art-slide', { scrollbarClass: 'myScrollbar' });
            }
            // newGalleryScroll = new iScroll('new-gallery-slide', {
            //     hScrollbar: false,
            //     vScrollbar: true,
            //     checkDOMChanges: false,
            //     lockDirection: 'h'
            // });

            // newArtScroll = new iScroll('new-art-slide', {
            //     hScrollbar: false,
            //     vScrollbar: true,
            //     checkDOMChanges: true,
            //     lockDirection: 'n'
            // });

        })
        $("#login-content").fadeOut(400);
        $("#login-next").fadeOut(400);
        $("#login-pre").fadeOut(400);

    }
)

$("#register-next").click(
    function () {
        $("#home-logo").fadeOut(400, function () {
            $("#home-page").fadeIn(400);
            with (location) {
                var recGalleryScroll = new iScroll('rec-gallery-slide', {
                    hScrollbar: true,
                    vScroll: true,
                    checkDOMChanges: true,
                    lockDirection: true,
                    bounce: false,
                    onBeforeScrollStart: function (e) {
                        if (this.absDistX > (this.absDistY + 5)) {
                            // user is scrolling the x axis, so prevent the browsers' native scrolling
                            e.preventDefault();
                        }
                    },
                    //解决第一次无法滑动的问题
                    onTouchEnd: function () {
                        var self = this;
                        if (self.touchEndTimeId) {
                            clearTimeout(self.touchEndTimeId);
                        }

                        self.touchEndTimeId = setTimeout(function () {
                            self.absDistX = 0;
                            self.absDistX = 0;
                        }, 200);
                    }
                });

                var newGalleryScroll = new iScroll('new-gallery-slide', {
                    hScrollbar: true,
                    vScroll: true,
                    checkDOMChanges: true,
                    lockDirection: true,
                    bounce: false,
                    onBeforeScrollStart: function (e) {
                        if (this.absDistX > (this.absDistY + 5)) {
                            // user is scrolling the x axis, so prevent the browsers' native scrolling
                            e.preventDefault();
                        }
                    },
                    //解决第一次无法滑动的问题
                    onTouchEnd: function () {
                        var self = this;
                        if (self.touchEndTimeId) {
                            clearTimeout(self.touchEndTimeId);
                        }

                        self.touchEndTimeId = setTimeout(function () {
                            self.absDistX = 0;
                            self.absDistX = 0;
                        }, 200);
                    }
                });

                var newArtScroll = new iScroll('new-art-slide', {
                    hScrollbar: true,
                    vScroll: true,
                    checkDOMChanges: true,
                    lockDirection: true,
                    bounce: false,
                    onBeforeScrollStart: function (e) {
                        if (this.absDistX > (this.absDistY + 5)) {
                            // user is scrolling the x axis, so prevent the browsers' native scrolling
                            e.preventDefault();
                        }
                    },
                    //解决第一次无法滑动的问题
                    onTouchEnd: function () {
                        var self = this;
                        if (self.touchEndTimeId) {
                            clearTimeout(self.touchEndTimeId);
                        }

                        self.touchEndTimeId = setTimeout(function () {
                            self.absDistX = 0;
                            self.absDistX = 0;
                        }, 200);
                    }
                });
            }
        })
        $("#register-content").fadeOut(400);
        $("#register-next").fadeOut(400);
        $("#login-pre").fadeOut(400);

    }
)


$(window).resize(function () {
    ajastDom();
});

$(window).on('orientationchange', function () {

});