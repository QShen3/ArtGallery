var recGallery = new Array();
var newGallery = new Array();
var newArtWorks = new Array();
var seaArtWorks = new Array();
var colArtWorks = new Array();

var pagenow;

$("#search-button").click(function () {
    $("#search-page-content").fadeIn(400);
    $("#home-page").fadeOut(400);
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
                }
            }
        }
    })
});


//如果cookie存在，直接加载到home
if ($.cookie("authToken") != null) {
    $("#home-logo").css('display', 'none');
    $("#home-page").css('display', 'block');
    $("#nav-slide-content").css('display', 'block');
    with (location) {
        var recGalleryScroll = new IScroll('#rec-gallery-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

        var newGalleryScroll = new IScroll('#new-gallery-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

        var newArtScroll = new IScroll('#new-art-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
    }
    $("#login-button").css('display', 'none');
    $("#register-button").css('display', 'none');
    pageChanged = true;
    $("#home-welcome-content").unbind();
    clearTimer();
    $("#home-welcome-text").css('display', 'none');
    $("#home-welcome-content").css('display', 'none');

    var $defaultNew;
    var $defaultRec;
    var $defaultNewArt;
    var $defaultColArt;
    $.get("/v1/user/recent", function (recentGallery, result) {
        if (result == "success") {
            // reArrangeArray(candidates.data);
            if (!(recentGallery.recent instanceof Array)) {
                console.error("Parameter wrong : {" + recentGallery.recent + "} is not an Array");
                return null;
            };
            recGallery = recentGallery.recent;
            if (recGallery.length != 0) {
                $defaultRec = $("#rec-gallery-slide table tr td:eq(0)").remove();//删除默认节点 
                for (var i = 0; i < recGallery.length; i++) {
                    $("#rec-gallery-slide table tr").append("<td id=" + 'newGatTd' + recGallery[i]._id + "><div class='slide-part-content'><div class='slide-part-img-0' style='background:url(" + recGallery[i].info.avatar + ");background-size:cover;'></div><p class='slide-part-name'>" + recGallery[i].info.name + '的' + recGallery[i].info.galleryName + "</p></div></td>");
                };
                var tds = $("#rec-gallery-slide table tr td").toArray();
                for (var i in tds) {
                    tds[i].onclick = function (ii) {
                        return function () {
                            $("#home-page").fadeOut(400);
                            $("#gallery-page-content").fadeIn(400);
                            $.get("/v1/art/list?uid=" + tds[ii].attributes.id.nodeValue.substring(8), function (artworks, result) {
                                if (result == "success") {
                                    artworks = artworks.lists;
                                    $("#gallery-page table tr td:eq(0)").remove();
                                    $("#gallery-page-content p").text(artworks[0].author.info.galleryName);
                                    for (var j in artworks) {
                                        $("#gallery-page table tr").append("<td><div class='slide-part-content'><div class='slide-part-img-0' style='background:url(" + artworks[j].cover + ");background-size:cover;'></div><p class='slide-part-name'>" + artworks[j].title + "</p></div></td>");
                                    }
                                    var tdss = $("#gallery-page table tr td").toArray();
                                    for (var j in tdss) {
                                        tdss[j].onclick = function (ii) {
                                            return function () {
                                                var index = 0;
                                                $("#artwork-page-content div.go-next").click(function () {
                                                    if (index < newArtWorks[ii].urls.length - 1) {
                                                        index++;
                                                        $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + newArtWorks[ii].urls[index] + ')');
                                                    }
                                                });
                                                $("#artwork-page-content div.go-pre").click(function () {
                                                    if (index > 0) {
                                                        index--;
                                                        $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + newArtWorks[ii].urls[index] + ')');
                                                    }
                                                });

                                                $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + newArtWorks[ii].urls[index] + ')');
                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro-m").html(newArtWorks[ii].profile);
                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").html(newArtWorks[ii].title + " 来自");
                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").append("<span class='slide-part-from'>" + newArtWorks[ii].author.info.name + "的</span>");
                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").append("<span class='slide-part-from'>" + newArtWorks[ii].author.info.galleryName + "</span>");

                                                $("#gallery-page-content").fadeOut(400);
                                                $("#artwork-page-content").fadeIn(400);
                                            }
                                        }(j)
                                    }
                                }
                            });
                        }
                    }(i)
                }
            }
            // alert(recentGallery.lists[0].info.name)

        }
    });

    $.get("/v1/user/latest", function (latestGallery, result) {
        if (result == "success") {
            // reArrangeArray(candidates.data);
            if (!(latestGallery.lists instanceof Array)) {
                console.error("Parameter wrong : {" + recentGallery.data + "} is not an Array");
                return null;
            };
            newGallery = latestGallery.lists;
            if (newGallery.length != 0) {
                $defaultNew = $("#new-gallery-slide table tr td:eq(0)").remove();//删除默认节点 
                for (var i = 0; i < newGallery.length; i++) {
                    $("#new-gallery-slide table tr").append("<td id=" + 'newGatTd' + newGallery[i]._id + "><div class='slide-part-content'><div class='slide-part-img' style='background:url(" + newGallery[i].info.avatar + ");background-size:cover;'></div><p class='slide-part-name'>" + newGallery[i].info.name + '的' + newGallery[i].info.galleryName + "</p></div></td>");
                };
                var tds = $("#new-gallery-slide table tr td").toArray();
                for (var i in tds) {
                    tds[i].onclick = function (ii) {
                        return function () {
                            $("#home-page").fadeOut(400);
                            $("#gallery-page-content").fadeIn(400);
                            $.get("/v1/art/list?uid=" + tds[ii].attributes.id.nodeValue.substring(8), function (artworks, result) {
                                if (result == "success") {
                                    artworks = artworks.lists;
                                    $("#gallery-page table tr td:eq(0)").remove();
                                    $("#gallery-page-content p").text(artworks[0].author.info.galleryName);
                                    for (var j in artworks) {
                                        $("#gallery-page table tr").append("<td><div class='slide-part-content'><div class='slide-part-img-0' style='background:url(" + artworks[j].cover + ");background-size:cover;'></div><p class='slide-part-name'>" + artworks[j].title + "</p></div></td>");
                                    }
                                    var tdss = $("#gallery-page table tr td").toArray();
                                    for (var j in tdss) {
                                        tdss[j].onclick = function (ii) {
                                            return function () {
                                                var index = 0;
                                                $("#artwork-page-content div.go-next").click(function () {
                                                    if (index < newArtWorks[ii].urls.length - 1) {
                                                        index++;
                                                        $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + newArtWorks[ii].urls[index] + ')');
                                                    }
                                                });
                                                $("#artwork-page-content div.go-pre").click(function () {
                                                    if (index > 0) {
                                                        index--;
                                                        $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + newArtWorks[ii].urls[index] + ')');
                                                    }
                                                });

                                                $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + newArtWorks[ii].urls[index] + ')');
                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro-m").html(newArtWorks[ii].profile);
                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").html(newArtWorks[ii].title + " 来自");
                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").append("<span class='slide-part-from'>" + newArtWorks[ii].author.info.name + "的</span>");
                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").append("<span class='slide-part-from'>" + newArtWorks[ii].author.info.galleryName + "</span>");

                                                $("#gallery-page-content").fadeOut(400);
                                                $("#artwork-page-content").fadeIn(400);
                                            }
                                        }(j)
                                    }
                                }
                            });
                        }
                    }(i)
                }
            }
            // alert(latestGallery.lists[0].info.name)

        }
    });
    $.get("/v1/art/latest", function (latestArtWrok, result) {
        if (result == "success") {
            // reArrangeArray(candidates.data);
            if (!(latestArtWrok.lists instanceof Array)) {
                console.error("Parameter wrong : {" + recentGallery.data + "} is not an Array");
                return null;
            };
            newArtWorks = latestArtWrok.lists;
            if (newArtWorks.length != 0) {
                $defaultNewArt = $("#new-art-slide table tr td:eq(0)").remove();//删除默认节点 
                for (var i = 0; i < newArtWorks.length; i++) {
                    $("#new-art-slide table tr").append("<td id=" + 'newArtWorkTd' + newArtWorks[i]._id + "><div class='slide-part-content'><div class='slide-part-img-2' style='background:url(" + newArtWorks[i].cover + ");background-size:cover;'></div><p class='slide-part-intro'>" + newArtWorks[i].title + '来自' + '<span class="slide-part-from">' + newArtWorks[i].author.info.name + '的' + newArtWorks[i].author.info.galleryName + "</span></p></div></td>");
                };
                var tds = $("#new-art-slide table tr td").toArray();
                for (var i in tds) {
                    tds[i].onclick = function (ii) {
                        return function () {
                            //urls[ii] = newArtWorks[ii].urls;
                            var index = 0;
                            $("#artwork-page-content div.go-next").click(function () {
                                if (index < newArtWorks[ii].urls.length - 1) {
                                    index++;
                                    $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + newArtWorks[ii].urls[index] + ')');
                                }
                            });
                            $("#artwork-page-content div.go-pre").click(function () {
                                if (index > 0) {
                                    index--;
                                    $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + newArtWorks[ii].urls[index] + ')');
                                }
                            });

                            $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + newArtWorks[ii].urls[index] + ')');
                            $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro-m").html(newArtWorks[ii].profile);
                            $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").html(newArtWorks[ii].title + " 来自");
                            $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").append("<span class='slide-part-from'>" + newArtWorks[ii].author.info.name + "的</span>");
                            $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").append("<span class='slide-part-from'>" + newArtWorks[ii].author.info.galleryName + "</span>");
                            $("#artwork-page-content").fadeIn(400);
                            $("#home-page").fadeOut(400);
                        }
                    }(i)
                }
            }
            // alert(latestArtWrok.lists[0].info.name)

        }
    });
    $.get("/v1/user/collection", function (collectArtWork, result) {
        if (result == "success") {
            if (!(collectArtWork.collections instanceof Array)) {
                console.error("Parameter wrong : {" + recentGallery.collections + "} is not an Array");
                return null
            };
            colArtWorks = collectArtWork.collections;
            if (colArtWorks.length != 0) {
                $defaultColArt = $("#collection-page-content div:eq(0)").remove();
                for (var i in colArtWorks) {
                    $("#collection-page-content").append("<div class='search-part-content'><div class='search-part-img' style='background:url(" + colArtWorks[i].cover + ");background-size:cover;'></div><p class='slide-part-intro-m'>" + colArtWorks[i].profile + "</p><p class='slide-part-intro'>" + colArtWorks[i].title + "来自" + "<span class='slide-part-from'>" + colArtWorks[i].author.info.name + "的</span><span class='slide-part-from'>" + colArtWorks[i].author.info.galleryName + "</span></p></div>");
                }
                var divs = $("#collection-page-content div").toArray();
                for (var i in divs) {
                    divs[i].onclick = function (ii) {
                        return function () {
                            var index = 0;
                            $("#artwork-page-content div.go-next").click(function () {
                                if (index < newArtWorks[ii].urls.length - 1) {
                                    index++;
                                    $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + newArtWorks[ii].urls[index] + ')');
                                }
                            });
                            $("#artwork-page-content div.go-pre").click(function () {
                                if (index > 0) {
                                    index--;
                                    $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + newArtWorks[ii].urls[index] + ')');
                                }
                            });

                            $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + newArtWorks[ii].urls[index] + ')');
                            $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro-m").html(newArtWorks[ii].profile);
                            $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").html(newArtWorks[ii].title + " 来自");
                            $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").append("<span class='slide-part-from'>" + newArtWorks[ii].author.info.name + "的</span>");
                            $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").append("<span class='slide-part-from'>" + newArtWorks[ii].author.info.galleryName + "</span>");
                            $("#artwork-page-content").fadeIn(400);
                            $("#home-page").fadeOut(400);
                        }
                    }(i)
                }
            }
        }
    });
    // var $defaultNew = $("#rec-gallery-slide table tr td:eq(0)").remove();//删除默认节点 
    // $("#new-gallery-slide table tr").append($defaultNew);//恢复默认节点 

};

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
        $("#loginForm").ajaxSubmit({
            type: 'post',
            url: '/v1/user/login',
            success: function (data) { // data 保存提交后返回的数据
                if (data.info.code == 200) {
                    // $("#all-tab").append("<li class='head' id='candidate" + candidates[i].studentNumber + "'><div class='crown'></div><img class='graphoto' id='candidate_avatar" + candidates[i].studentNumber + "' src='" + candidates[i].small_pic + "'/><span  class='tab-name' id='candiate_name" + candidates[i].studentNumber + "'>" + candidates[i].name + "</span><br/>" + "<span class='tab-zan' id='candiate_zan" + candidates[i].studentNumber + "'>" + getZan(candidates[i].studentNumber) + "赞" + "</span>" + "</br><span class='tab-college' id='candiate_college" + candidates[i].studentNumber + "'>" + candidates[i].college + "</span>");
                    $("#home-logo").fadeOut(400, function () {
                        $("#home-page").fadeIn(400);
                        $("#nav-slide-content").fadeIn(400);
                        with (location) {
                            var recGalleryScroll = new IScroll('#rec-gallery-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

                            var newGalleryScroll = new IScroll('#new-gallery-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

                            var newArtScroll = new IScroll('#new-art-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
                        }
                    })
                    $("#login-content").fadeOut(400);
                    $("#login-next").fadeOut(400);
                    $("#login-pre").fadeOut(400);
                    var $defaultNew;
                    var $defaultRec;
                    var $defaultNewArt;
                    $.get("/v1/user/recent", function (recentGallery, result) {
                        if (result == "success") {
                            // reArrangeArray(candidates.data);
                            if (!(recentGallery.lists instanceof Array)) {
                                console.error("Parameter wrong : {" + recentGallery.data + "} is not an Array");
                                return null;
                            };
                            recGallery = recentGallery.lists;
                            if (recGallery.length != 0) {
                                $defaultRec = $("#rec-gallery-slide table tr td:eq(0)").remove();//删除默认节点 
                                for (var i = 0; i < recGallery.length; i++) {
                                    $("#rec-gallery-slide table tr").append("<td id=" + 'newGatTd' + recGallery[i]._id + "><div class='slide-part-content'><div class='slide-part-img-0' style='background:url(" + recGallery[i].recent.info.avatar + ");background-size:cover;'></div><p class='slide-part-name'>" + recGallery[i].recent.info.name + '的' + recGallery[i].recent.info.galleryName + "</p></div></td>");
                                };
                            }
                            // alert(recentGallery.lists[0].info.name)

                        }
                    });

                    $.get("/v1/user/latest", function (latestGallery, result) {
                        if (result == "success") {
                            // reArrangeArray(candidates.data);
                            if (!(latestGallery.lists instanceof Array)) {
                                console.error("Parameter wrong : {" + recentGallery.data + "} is not an Array");
                                return null;
                            };
                            newGallery = latestGallery.lists;
                            if (newGallery.length != 0) {
                                $defaultNew = $("#new-gallery-slide table tr td:eq(0)").remove();//删除默认节点 
                                for (var i = 0; i < newGallery.length; i++) {
                                    $("#new-gallery-slide table tr").append("<td id=" + 'newGatTd' + newGallery[i]._id + "><div class='slide-part-content'><div class='slide-part-img' style='background:url(" + newGallery[i].info.avatar + ");background-size:cover;'></div><p class='slide-part-name'>" + newGallery[i].info.name + '的' + newGallery[i].info.galleryName + "</p></div></td>");
                                };
                            }
                            // alert(latestGallery.lists[0].info.name)

                        }
                    });
                    $.get("/v1/art/latest", function (latestArtWrok, result) {
                        if (result == "success") {
                            // reArrangeArray(candidates.data);
                            if (!(latestArtWrok.lists instanceof Array)) {
                                console.error("Parameter wrong : {" + recentGallery.data + "} is not an Array");
                                return null;
                            };
                            newArtWorks = latestArtWrok.lists;
                            if (newArtWorks.length != 0) {
                                $defaultNewArt = $("#new-art-slide table tr td:eq(0)").remove();//删除默认节点 
                                for (var i = 0; i < newArtWorks.length; i++) {
                                    $("#new-art-slide table tr").append("<td id=" + 'newArtWorkTd' + newArtWorks[i]._id + "><div class='slide-part-content'><div class='slide-part-img-2' style='background:url(" + newArtWorks[i].cover + ");background-size:cover;'></div><p class='slide-part-intro'>" + newArtWorks[i].title + '来自' + '<span class="slide-part-from">' + newArtWorks[i].author.name + newArtWorks[i].author.galleryName + "</span></p></div></td>");
                                };
                            }
                            // alert(latestArtWrok.lists[0].info.name)

                        }
                    });
                    // var $defaultNew = $("#new-art-slide table tr td:eq(0)").remove();//删除默认节点 
                    // $("#new-art-slide table tr").append($defaultNew);//恢复默认节点 
                } else {
                    alert("no")
                }
            },
            error: function (data) { // data 保存提交后返回的数据
                $("#home-logo").css('color', 'red');
                $("#home-logo").text("登陆");
                $("#email-text").css('color', 'red');
                $("#email-text").text("请检查电子邮件地址");
                $("#pwd-text").css('color', 'red');
                $("#pwd-text").text("请检查密码");
                $("input").css('borderBottom', '3px solid red')
                $("#home-logo").css('backgroundImage', 'url()');
                $("#home-logo").fadeIn(400);
            }
        });
        // $(this).resetForm(); // 提交后重置表单
        return false; // 阻止表单自动提交事件
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