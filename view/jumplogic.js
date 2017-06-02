
function addCol() {
    $.post("/v1/user/collection/add", { aid: currentArtwork }, function (data, status) {
        if (status == "success") {

        }
    });
}

function addArt() {
    $("#addArtworkForm").ajaxSubmit({
        type: "post",
        url: "/v1/art/add",
        success: function (result) {
            if(result.info.code == "200"){

            }
        }
    });
}

function addArt() {
    $("#addArtworkForm").ajaxSubmit({
        type: "post",
        url: "/v1/art/update",
        success: function (result) {
            if(result.info.code == "200"){
                
            }
        }
    });
}


var recGallery = new Array();
var newGallery = new Array();
var newArtWorks = new Array();
var seaArtWorks = new Array();
var colArtWorks = new Array();

var pageNow = ['index'];//页面栈 
var pagenow;
var currentArtwork;

$("#search-button").click(function () {
    everyThingIsGrey();
    $("#search-a-li").css('border-bottom', '3px solid ' + 'rgb' + '(' + op2 + ',' + op2 + ',' + op2 + ')');
    pageNow.push("search");
    $("#search-page-content").fadeIn(400);
    $("#home-page").fadeOut(400);
    var $defaultSea;
    $("#searchForm").ajaxSubmit({
        type: "get",
        url: "/v1/art/search",
        success: function (result) {
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

$("#collection-a").click(
    function () {
        everyThingIsGrey();
        $("#collection-a-li").css('border-bottom', '3px solid ' + 'rgb' + '(' + op2 + ',' + op2 + ',' + op2 + ')');
        pageNow.push("collection");
        fadeoutNow();
        $("#collection-page-content").fadeIn(400);
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

$("#gallery-a").click(
    function () {
        everyThingIsGrey();
        $("#gallery-a-li").css('border-bottom', '3px solid ' + 'rgb' + '(' + op2 + ',' + op2 + ',' + op2 + ')');
        pageNow.push("gallery");
        fadeoutNow();
        $("#gallery-page-content").fadeIn(400);
        searchFoldedBool = true;
        $("#unfold-search-block").slideDown(200);
        $("#search-back-top").slideUp(200, function () {
        });
        $("#unfold-search-block").css({ position: 'relative', left: "0px", paddingLeft: '20px' });
        // $("#unfold-search-block").animate({opacity:0},10);
        $("#folded").slideUp(200, function () {
            // $("#folded").css('height',47+'px');
        });
        pageNow.push("gallery");
        $("#home-page").fadeOut(400);
        $("#gallery-page-content").fadeIn(400);
        $.get("v1/user/info", function (user, result) {
            if (result == "success") {
                $.get("/v1/art/list?uid=" + user._id, function (artworks, result) {
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
                                    pageNow.push("artworks");
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
                                    artworkLeft = (pageWidth - $("#id-artwork-intro").width()) / 2 + 'px';
                                    $("#id-artwork-intro").css('left', artworkLeft);
                                    $("#gallery-page-content").fadeOut(400);
                                    $("#artwork-page-content").fadeIn(400);
                                }
                            }(j)
                        }
                    }
                });
            }
        })


    }
);
//如果cookie存在，直接加载到home
if ($.cookie("authToken") != null) {
    pageNow.push("home");
    everyThingIsGrey();
    // $("#home-a").css('color', 'white');
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
                            var artworkLeft = (pageWidth - $("#id-artwork-intro").width()) / 2 + 'px';
                            var artworkGoTop = ((pageHeight - $("#nav-slide-content").height()) - $("#artwork-go-next").height()) / 2 + 'px';
                            pageNow.push("gallery");
                            $("#home-page").fadeOut(400);
                            $("#gallery-page-content").fadeIn(400);
                            $.get("/v1/art/list?uid=" + tds[ii].attributes.id.nodeValue.substring(8), function (artworks, result) {
                                if (result == "success") {
                                    var artworkLeft = (pageWidth - $("#id-artwork-intro").width()) / 2 + 'px';
                                    var artworkGoTop = ((pageHeight - $("#nav-slide-content").height()) - $("#artwork-go-next").height()) / 2 + 'px';
                                    artworks = artworks.lists;
                                    $("#gallery-page table tr").html("");
                                    $("#gallery-page-content p").text(artworks[0].author.info.galleryName);
                                    for (var j in artworks) {
                                        $("#gallery-page table tr").append("<td><div class='slide-part-content'><div class='slide-part-img-0' style='background:url(" + artworks[j].cover + ");background-size:cover;'></div><p class='slide-part-name'>" + artworks[j].title + "</p></div></td>");
                                    }
                                    var tdss = $("#gallery-page table tr td").toArray();
                                    for (var j in tdss) {
                                        tdss[j].onclick = function (ii) {
                                            return function () {
                                                pageNow.push("artworks");
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
                                                artworkLeft = (pageWidth - $("#id-artwork-intro").width()) / 2 + 'px';
                                                $("#id-artwork-intro").css('left', artworkLeft);
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
                            var artworkLeft = (pageWidth - $("#id-artwork-intro").width()) / 2 + 'px';
                            var artworkGoTop = ((pageHeight - $("#nav-slide-content").height()) - $("#artwork-go-next").height()) / 2 + 'px';
                            pageNow.push("gallery");
                            everyThingIsGrey();
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
                                                pageNow.push("artworks");
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
                                                artworkLeft = (pageWidth - $("#id-artwork-intro").width()) / 2 + 'px';
                                                $("#id-artwork-intro").css('left', artworkLeft);
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
                    $("#new-art-slide table tr").append("<td id=" + 'newArtWorkTd' + newArtWorks[i]._id + "><div class='slide-part-content'><div class='slide-part-img-2' style='background:url(" + newArtWorks[i].cover + ");background-size:cover;'>"+'<div class="collecte-button"></div>'+"</div><p class='slide-part-intro'>" + newArtWorks[i].title + '来自' + '<span class="slide-part-from">' + newArtWorks[i].author.info.name + '的' + newArtWorks[i].author.info.galleryName + "</span></p></div></td>");
                };
                var tds = $("#new-art-slide table tr td").toArray();
                for (var i in tds) {
                    tds[i].onclick = function (ii) {
                        return function () {
                            //urls[ii] = newArtWorks[ii].urls;
                            var artworkLeft = (pageWidth - $("#id-artwork-intro").width()) / 2 + 'px';
                            var artworkGoTop = ((pageHeight - $("#nav-slide-content").height()) - $("#artwork-go-next").height()) / 2 + 'px';
                            pageNow.push("artworks");
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
                            artworkLeft = (pageWidth - $("#id-artwork-intro").width()) / 2 + 'px';
                            $("#id-artwork-intro").css('left', artworkLeft);
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
                            artworkLeft = (pageWidth - $("#id-artwork-intro").width()) / 2 + 'px';
                            $("#id-artwork-intro").css('left', artworkLeft);
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
        pageNow.push("login");
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
        pageNow.push("rigister");
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
        pageNow.push("index");
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
                    pageNow.push("home");
                    $("#home-logo").fadeOut(400, function () {
                        // everyThingIsGrey();
                        // $("#home-a").css('color', 'white');
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
                                    $("#new-art-slide table tr").append("<td id=" + 'newArtWorkTd' + newArtWorks[i]._id + "><div class='slide-part-content'><div class='slide-part-img-2' style='background:url(" + newArtWorks[i].cover + ");background-size:cover;'>"+'<div class="collecte-button"></div>'+"</div><p class='slide-part-intro'>" + newArtWorks[i].title + '来自' + '<span class="slide-part-from">' + newArtWorks[i].author.name + newArtWorks[i].author.galleryName + "</span></p></div></td>");
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
                pageNow.push("login");
                $("#home-logo").css('color', 'red');
                $("#home-logo").text("登陆");
                $("#email-text").css('color', 'red');
                $("#email-text").text("请检查电子邮件地址");
                $("#pwd-text").css('color', 'red');
                $("#pwd-text").text("请检查密码");
                $("input").css('borderBottom', '3px solid ' + 'rgb' + '(' + op2 + ',' + op2 + ',' + op2 + ')')
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
        // $("#home-logo").fadeOut(400, function () {

        // with (location) {
        // var recGalleryScroll = new IScroll('#rec-gallery-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

        // var newGalleryScroll = new IScroll('#new-gallery-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

        // var newArtScroll = new IScroll('#new-art-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
        // var newArtScroll = new IScroll('#gallery-page', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

        // }
        // })
        $("#registerForm1").ajaxSubmit({
            type: "post",
            url: "/v1/user/register",
            success: function (result) {
                console.log("register1");
                if (result.info.code == "200") {
                    // var urlname = $('#registerForm1').find('#emailInput').val();
                    // $('#registerForm2').find('#RurlName').val(urlname);
                    // alert(urlname);
                    $("#registe2-page-content").fadeIn(400);
                    // $("#register2-pre").css('display', 'block');
                    $("#register-content").fadeOut(400);
                    $("#login-pre").fadeOut(400);
                    $("#register-next2").css('display', 'block');
                }
            },
            error: function () {
                alert("请检查输入的合法性")
            }
        })
    }
)

// 获取长度为len的随机字符串  
function getRandomString(len) {  
    len = len || 32;  
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1  
    var maxPos = $chars.length;  
    var pwd = '';  
    for (i = 0; i < len; i++) {  
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));  
    }  
    return pwd;  
} 

var nowHeadUrl = $.cookie("email");
function RigisterUpHead() {

    $('#registerForm2').find('#RurlName').val(getRandomString(10));
    $("#registerForm2").ajaxSubmit({
        type: "post",
        url: "/v1/res/upload",
        success: function (urll) {
            console.log("register2");
            $('#registerForm1').find('#headurlavareg').val(urll.url);
        },
        error: function () {
            alert("请检查图片的合法性")
        }
    })
}

$("#register-next2").click(
    function () {
        // $("#home-logo").fadeOut(400, function () {

        // with (location) {
        // var recGalleryScroll = new IScroll('#rec-gallery-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

        // var newGalleryScroll = new IScroll('#new-gallery-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

        // var newArtScroll = new IScroll('#new-art-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
        // var newArtScroll = new IScroll('#gallery-page', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

        // }
        // })

        $("#registerForm3").ajaxSubmit({
            type: "post",
            url: "/v1/user/update",
            success: function (result) {
                console.log("register1");
                if (result.info.code == "200") {
                    $("#registe2-page-content").fadeIn(400);
                    // $("#register2-pre").css('display', 'block');
                    $("#register-content").fadeOut(400);
                    $("#login-pre").fadeOut(400);
                    $("#register-next2").css('display', 'block');
                }
            },
            error: function () {
                alert("请检查输入合法性")
            }
        })
    }
)

$("#nav-ul-me").click(
    function () {
        pageNow.push("me");
        $("#me-page-content").fadeIn(400);
        $("#nav-slide-content").fadeOut(400);
        fadeoutNow();
    }
);

$("#me-pre").click(
    function () {
        $("#me-page-content").fadeOut(400);
        $("#nav-slide-content").fadeIn(400);
        fadeinNow();
        pageNow.push(pageNow[pageNow.length - 2]);

    }
)

$("#home-a").click(
    function () {
        everyThingIsGrey();
        $("#home-a-li").css('border-bottom', '3px solid ' + 'rgb' + '(' + op2 + ',' + op2 + ',' + op2 + ')');
        if (pageNow[pageNow.length - 1] != "home") {
            pageNow.push("home");
            $("#home-page").fadeIn(400);
            fadeoutNow();
        }
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
)

$("#register2-pre").click(function () {
    $("#registe2-page-content").fadeOut(400);
    $("#register-content").fadeIn(400);
    $("#register2-pre").fadeOut(400);
    $("#register-next2").fadeOut(400);
    $("#registe1-page-content").fadeIn(400);
    $("#register1-pre").fadeIn(400);
    $("#register1-next").fadeIn(400);
})

function fadeoutNow() {
    console.log(pageNow.join("|"));
    if (pageNow[pageNow.length - 2] == "home") {
        $("#home-page").fadeOut(400);
    };
    if (pageNow[pageNow.length - 2] == "search") {
        $("#search-page-content").css('display', 'none');
    };
    if (pageNow[pageNow.length - 2] == "collection") {
        $("#collection-page-content").css('display', 'none');
    };
    if (pageNow[pageNow.length - 2] == "gallery") {
        $("#gallery-page-content").fadeOut(400);
    };
    if (pageNow[pageNow.length - 2] == "artworks") {
        $("#artwork-page-content").fadeOut(400);
    };
}

function fadeinNow() {
    console.log(pageNow.join("|"));
    if (pageNow[pageNow.length - 2] == "home") {
        $("#home-page").fadeIn(400);
    };
    if (pageNow[pageNow.length - 2] == "search") {
        $("#search-page-content").fadeIn(400);
    };
    if (pageNow[pageNow.length - 2] == "collection") {
        $("#collection-page-content").fadeIn(400);
    };
    if (pageNow[pageNow.length - 2] == "gallery") {
        $("#gallery-page-content").fadeIn(400);
    };
    if (pageNow[pageNow.length - 2] == "artworks") {
        $("#artwork-page-content").fadeIn(400);
    };

}