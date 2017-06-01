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
                var recGalleryScroll = new IScroll('#rec-gallery-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

                var newGalleryScroll = new IScroll('#new-gallery-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

                var newArtScroll = new IScroll('#new-art-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
            }
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
                // var recGalleryScroll = new IScroll('#rec-gallery-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

                // var newGalleryScroll = new IScroll('#new-gallery-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

                // var newArtScroll = new IScroll('#new-art-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
                // var newArtScroll = new IScroll('#gallery-page', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

            }
        })
        $("#register-content").fadeOut(400);
        $("#register-next").fadeOut(400);
        $("#login-pre").fadeOut(400);

    }
)