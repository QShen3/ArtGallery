var recGallery = new Array();
var newGallery = new Array();
var newArtWorks = new Array();
var seaArtWorks = new Array();
var colArtWorks = new Array();
var artworksLocal = new Array();
var userNow;
var userNowContent;

var pageNow = ['index'];//页面栈 
var pagenow;
var currentArtwork;
var inputNewBool = false;

var currentImg = new Array();

$("#exit-button").click(function () {
    $.cookie('authToken', null, { expires: -1, path: '/' });
    $.cookie('email', null, { expires: -1, path: '/' });
    location.reload();
});


$.get("v1/user/info", function (user, result) {
    if (result == "success") {
        userNowContent = user;
    }
})


function changeWorkSize(aheight, awidth, gheight) {
    // if(aheight>)
}

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
            if (result.info.code == "200") {

            }
        }
    });
}

function addArt() {
    $("#addArtworkForm").ajaxSubmit({
        type: "post",
        url: "/v1/art/update",
        success: function (result) {
            if (result.info.code == "200") {

            }
        }
    });
}



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
                                $("#artwork-page-content").fadeIn(400);
                                $("#home-page").fadeOut(400);
                            }
                        }(i)
                    }
                }
            }
        }
    })
});

$("#collection-a").click(
    function () {
        everyThingIsGrey();
        $("#collection-page-content ").html('<p class="slide-title">收藏</p>');//每次点击都更新一遍
        if (colArtWorks.length == 0) {
            $("#collection-page-content").html("<p class='slide-title'>收藏</p><div class='search-part-content'><p class='slide-part-no' style='font-size:4em'>无</p></div>");//每次点击都更新一遍
        } else {

            for (var i = 0; i < colArtWorks.length; i++) {
                $("#collection-page-content").append("<div class='search-part-content'><div class='search-part-img' style='background:url(" + colArtWorks[i].cover + ");background-size:cover;'></div><p class='slide-part-intro-m'>" + colArtWorks[i].profile + "</p><p class='slide-part-intro'>" + colArtWorks[i].title + "来自" + "<span class='slide-part-from'>" + colArtWorks[i].author.info.name + "的</span><span class='slide-part-from'>" + colArtWorks[i].author.info.galleryName + "</span></p></div>");
            }
        }


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
$("#artwork-go-top").click(function () {
    $("#nav-slide-content").fadeIn(400);
    pageNow.push(pageNow[pageNow.length - 2]);
    fadeoutNow();
    fadeinNow();
    // console.log(pageNow.pop());
});

$("#gallery-go-top").click(function () {

    for (var j = 2; j < pageNow.length; j++) {
        if (pageNow[pageNow.length - j] != 'artworks' && pageNow[pageNow.length - j] != 'gallery' && pageNow[pageNow.length - j] != 'edita') {
            pageNow.push(pageNow[pageNow.length - j]);

            break;
        }
    }
    // fadeinNow();

    if (inputNewBool) {
        $.get("/v1/art/latest", function (latestArtWrok, result) {
            if (result == "success") {

                $("#nav-slide-content").fadeIn(400);
                $("#gallery-a-li").css('border-bottom', 'none');
                // pageNow.push(pageNow[pageNow.length - 2]);
                $("#add-button-td").fadeOut(400);
                // reArrangeArray(candidates.data);
                if (!(latestArtWrok.lists instanceof Array)) {
                    console.error("Parameter wrong : {" + recentGallery.data + "} is not an Array");
                    return null;
                };
                newArtWorks = latestArtWrok.lists;
                var Artindex = new Array();
                if (newArtWorks.length != 0) {
                    $defaultNewArt = $("#new-art-slide table tr td:eq(0)").remove();//删除默认节点 
                    var artworkInCollection = new Array();
                    for (var i = 0; i < newArtWorks.length; i++) {
                        if (colArtWorks.length != 0) {
                            // next:
                            for (var j = 0; j < colArtWorks.length; j++) {
                                if (newArtWorks[i]._id == colArtWorks[j]._id) {
                                    artworkInCollection.push(i);
                                    console.log(artworkInCollection.join("|"));
                                }
                            }

                        }

                    };

                    $("#new-art-slide table tr").html('');
                    for (var i = 0; i < newArtWorks.length; i++) {
                        if (contains(artworkInCollection, i)) {
                            console.log("collected" + i)
                            $("#new-art-slide table tr").append("<td id=" + 'newArtWorkTd' + newArtWorks[i]._id + "><div class='slide-part-content'>" + '<div class="collecte-button" style="background:url(./icons/collection_fill.png);background-size:cover;"' + 'id=collecte-button' + newArtWorks[i]._id + '></div>' + "<div class='slide-part-img-2' style='background:url(" + newArtWorks[i].cover + ");background-size:cover;'>" + "</div><p class='slide-part-intro'>" + newArtWorks[i].title + '来自' + '<span class="slide-part-from">' + newArtWorks[i].author.info.name + '的' + newArtWorks[i].author.info.galleryName + "</span></p></div></td>");
                        } else {
                            console.log("uncollected" + i)
                            $("#new-art-slide table tr").append("<td id=" + 'newArtWorkTd' + newArtWorks[i]._id + "><div class='slide-part-content'>" + '<div class="collecte-button"' + 'id=collecte-button' + newArtWorks[i]._id + '></div>' + "<div class='slide-part-img-2' style='background:url(" + newArtWorks[i].cover + ");background-size:cover;'>" + "</div><p class='slide-part-intro'>" + newArtWorks[i].title + '来自' + '<span class="slide-part-from">' + newArtWorks[i].author.info.name + '的' + newArtWorks[i].author.info.galleryName + "</span></p></div></td>");
                        }
                    };

                    var tds = $("#new-art-slide table tr td .slide-part-img-2").toArray();
                    for (var i in tds) {
                        tds[i].onclick = function (ii) {
                            return function () {
                                //urls[ii] = newArtWorks[ii].urls;
                                var artworkLeft = (pageWidth - $("#id-artwork-intro").width()) / 2 + 'px';
                                var artworkGoTop = ((pageHeight - $("#nav-slide-content").height()) - $("#artwork-go-next").height()) / 2 + 'px';
                                pageNow.push("artworks");
                                $("#nav-slide-content").fadeOut(400);
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

                    var colButton = $("#new-art-slide table tr td .slide-part-content .collecte-button").toArray();
                    for (var i in colButton) {
                        colButton[i].onclick = function (ii) {
                            return function () {
                                $.post("/v1/user/collection/add", { aid: newArtWorks[ii]._id }, function (data, status) {
                                    if (status == "success") {//
                                        if (data.status) {
                                            $("#collecte-button" + newArtWorks[ii]._id).fadeOut(100, function () {
                                                $("#collecte-button" + newArtWorks[ii]._id).css({ background: 'url(./icons/collection_fill.png)', backgroundSize: 'cover' });
                                                $("#collecte-button" + newArtWorks[ii]._id).fadeIn(100);
                                                colArtWorks.push(newArtWorks[ii]);
                                            })
                                        } else {
                                            $("#collecte-button" + newArtWorks[ii]._id).fadeOut(100, function () {
                                                $("#collecte-button" + newArtWorks[ii]._id).css({ background: 'url(./icons/collection.png)', backgroundSize: 'cover' });
                                                $("#collecte-button" + newArtWorks[ii]._id).fadeIn(100);
                                                removeById(colArtWorks, newArtWorks[ii]._id);
                                            })
                                        }
                                    }
                                });
                            }
                        }(i)
                    }
                    fadeoutNow();
                    fadeinNow();
                }
                // alert(latestArtWrok.lists[0].info.name)

            }
        });
        inputNewBool = false;
    } else {
        fadeoutNow();
        fadeinNow();
    }


    // pageNow.push(pageNow[pageNow.length - 2]);
    // $("#gallery-go-top").fadeOut(400);
    // $("#gallery-page-content").fadeOut(400);
    console.log(pageNow.join('|g|'));

});

$("#edit-button").click(function () {
    $("#add-button-td").fadeIn(400);
    $("#no-artwork").fadeOut(400);
});

$("#gallery-a").click(
    function () {

        $("#edit-button").fadeIn(300);
        $("#nav-slide-content").fadeOut(100, function () {

        });
        pageNow.push("gallery");
        fadeoutNow();
        $("#gallery-page-content").fadeIn(300);
        $("#gallery-a-li").css('border-bottom', 'none');
        // everyThingIsGrey();
        $("#gallery-a-li").css('border-bottom', 'none');

        searchFoldedBool = true;
        $("#unfold-search-block").slideDown(200);
        $("#search-back-top").slideUp(200, function () {
        });
        $("#unfold-search-block").css({ position: 'relative', left: "0px", paddingLeft: '20px' });
        // $("#unfold-search-block").animate({opacity:0},10);
        $("#folded").slideUp(200, function () {
            // $("#folded").css('height',47+'px');
        });
        // pageNow.push("gallery");
        // $("#home-page").fadeOut(400);
        // $("#gallery-page-content").fadeIn(400);
        $.get("v1/user/info", function (user, result) {
            if (result == "success") {
                $.get("/v1/art/list?uid=" + user._id, function (artworks, result) {
                    if (result == "success") {
                        var userInfo = artworks.userInfo;
                        artworks = artworks.lists;
                        artworksLocal = artworks.lists;
                        $("#gallery-page table tr").html('');
                        $("#gallery-page table tr").append("<td id='add-button-td' style='display:none'><div class='add-button' id='add-works-button'></div></td>");
                        if (artworks.length == 0) {
                            $("#gallery-page table tr").append('<td id="no-artwork"><div class="slide-part-content"><p class="slide-part-no" style="font-size:4em">无</p></div></td>');
                        }
                        $("#gallery-page-content p").text(userInfo.galleryName);
                        $("#add-works-button").click(function () {
                            $("input").css('borderBottom', '3px solid ' + 'black');
                            pageNow.push("edita");
                            fadeinNow();
                            fadeoutNow();
                        });

                        for (var j in artworks) {
                            $("#gallery-page table tr").append("<td><div class='slide-part-content'><div class='slide-part-img-0' style='background:url(" + artworks[j].cover + ");background-size:cover;'></div><p class='slide-part-name'>" + artworks[j].title + "</p></div></td>");
                        }

                        var tdss = $("#gallery-page table tr td .slide-part-content").toArray();
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
        var recGalleryScroll = new IScroll('#rec-gallery-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false, scrollbars: false });

        var newGalleryScroll = new IScroll('#new-gallery-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false, scrollbars: false });

        var newArtScroll = new IScroll('#new-art-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false, scrollbars: false });
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
                    $("#rec-gallery-slide table tr").append("<td id=" + 'newGatTd' + recGallery[i]._id + "><div class='slide-part-content'><div class='slide-part-img-0' style='background:url(" + recGallery[i].info.avatar + ");background-size:cover;'></div><p class='slide-part-name'>" + recGallery[i].info.name + '的<br>' + recGallery[i].info.galleryName + "</p></div></td>");
                };
                var tds = $("#rec-gallery-slide table tr td").toArray();
                for (var i in tds) {
                    tds[i].onclick = function (ii) {
                        return function () {
                            $("#edit-button").css('display', 'none');
                            if (tds[ii].attributes.id.nodeValue.substring(8) == userNowContent._id) {
                                console.log('thisGallery' + tds[ii].attributes.id.nodeValue.substring(8) + '|' + 'usernow' + userNowContent._id)
                                $("#edit-button").fadeIn(300);
                            }
                            $("#nav-slide-content").fadeOut(300);
                            var artworkLeft = (pageWidth - $("#id-artwork-intro").width()) / 2 + 'px';
                            var artworkGoTop = ((pageHeight - $("#nav-slide-content").height()) - $("#artwork-go-next").height()) / 2 + 'px';
                            pageNow.push("gallery");
                            $("#home-page").fadeOut(400);
                            $("#gallery-page-content").fadeIn(400);
                            $("#gallery-page table tr").html("");
                            $.get("/v1/art/list?uid=" + tds[ii].attributes.id.nodeValue.substring(8), function (artworks, result) {
                                if (result == "success") {
                                    var artworkLeft = (pageWidth - $("#id-artwork-intro").width()) / 2 + 'px';
                                    var artworkGoTop = ((pageHeight - $("#nav-slide-content").height()) - $("#artwork-go-next").height()) / 2 + 'px';
                                    var userInfo = artworks.userInfo;
                                    artworks = artworks.lists;

                                    $("#gallery-page table tr").html('');
                                    $("#gallery-page table tr").append("<td id='add-button-td' style='display:none'><div class='add-button' id='add-works-button'></div></td>");
                                    if (artworks.length == 0) {
                                        $("#gallery-page table tr").append('<td id="no-artwork"><div class="slide-part-content"><p class="slide-part-no" style="font-size:4em">无</p></div></td>');
                                    }
                                    $("#gallery-page-content p").text(userInfo.galleryName);
                                    for (var j in artworks) {
                                        $("#gallery-page table tr").append("<td><div class='slide-part-content'><div class='slide-part-img-0' style='background:url(" + artworks[j].cover + ");background-size:cover;'></div><p class='slide-part-name'>" + artworks[j].title + "</p></div></td>");
                                    }

                                    $("#add-works-button").click(function () {
                                        pageNow.push("edita");
                                        fadeinNow();
                                        fadeoutNow();
                                    });

                                    var tdss = $("#gallery-page table tr td .slide-part-img-0").toArray();
                                    for (var j in tdss) {
                                        tdss[j].onclick = function (ii) {
                                            return function () {
                                                pageNow.push("artworks");
                                                var index = 0;
                                                $("#artwork-page-content div.go-next").click(function () {
                                                    if (index < artworks[ii].urls.length - 1) {
                                                        index++;
                                                        $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + artworks[ii].urls[index] + ')');
                                                    }
                                                });
                                                $("#artwork-page-content div.go-pre").click(function () {
                                                    if (index > 0) {
                                                        index--;
                                                        $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + artworks[ii].urls[index] + ')');
                                                    }
                                                });

                                                $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + artworks[ii].urls[index] + ')');
                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro-m").html(artworks[ii].profile);
                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").html(artworks[ii].title + " 来自");
                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").append("<span class='slide-part-from'>" + artworks[ii].author.info.name + "的</span>");
                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").append("<span class='slide-part-from'>" + artworks[ii].author.info.galleryName + "</span>");
                                                artworkLeft = (pageWidth - $("#id-artwork-intro").width()) / 2 + 'px';
                                                $("#id-artwork-intro").css('left', artworkLeft);
                                                //$("#gallery-page-content").fadeOut(400);
                                                //$("#artwork-page-content").fadeIn(400);
                                                pageNow.push("artworks");
                                                fadeoutNow();
                                                fadeinNow();
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

                            $("#nav-slide-content").fadeOut(300);
                            $("#edit-button").css('display', 'none');
                            if (tds[ii].attributes.id.nodeValue.substring(8) == userNowContent._id) {
                                console.log('thisGallery' + tds[ii].attributes.id.nodeValue.substring(8) + '|' + 'usernow' + userNowContent._id)
                                $("#edit-button").fadeIn(300);
                            }
                            everyThingIsGrey();
                            $("#home-page").fadeOut(400);
                            $("#gallery-page-content").fadeIn(400);
                            $("#gallery-page table tr").html("");
                            $.get("/v1/art/list?uid=" + tds[ii].attributes.id.nodeValue.substring(8), function (artworks, result) {
                                if (result == "success") {
                                    var userInfo = artworks.userInfo;
                                    artworks = artworks.lists;

                                    $("#gallery-page table tr").html('');
                                    $("#gallery-page table tr").append("<td id='add-button-td' style='display:none'><div class='add-button' id='add-works-button'></div></td>");
                                    if (artworks.length == 0) {
                                        $("#gallery-page table tr").append('<td id="no-artwork"><div class="slide-part-content"><p class="slide-part-no" style="font-size:4em">无</p></div></td>');
                                    }
                                    $("#gallery-page-content p").text(userInfo.galleryName);
                                    for (var j in artworks) {
                                        $("#gallery-page table tr").append("<td><div class='slide-part-content'><div class='slide-part-img-0' style='background:url(" + artworks[j].cover + ");background-size:cover;'></div><p class='slide-part-name'>" + artworks[j].title + "</p></div></td>");
                                    }

                                    $("#add-works-button").click(function () {
                                        pageNow.push("edita");
                                        fadeinNow();
                                        fadeoutNow();
                                    });

                                    var tdss = $("#gallery-page table tr td .slide-part-img-0").toArray();
                                    for (var j in tdss) {
                                        tdss[j].onclick = function (ii) {
                                            return function () {
                                                pageNow.push("artworks");
                                                var index = 0;
                                                $("#artwork-page-content div.go-next").click(function () {
                                                    if (index < artworks[ii].urls.length - 1) {
                                                        index++;
                                                        $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + artworks[ii].urls[index] + ')');
                                                    }
                                                });
                                                $("#artwork-page-content div.go-pre").click(function () {
                                                    if (index > 0) {
                                                        index--;
                                                        $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + artworks[ii].urls[index] + ')');
                                                    }
                                                });

                                                $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + artworks[ii].urls[index] + ')');
                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro-m").html(artworks[ii].profile);
                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").html(artworks[ii].title + " 来自");
                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").append("<span class='slide-part-from'>" + artworks[ii].author.info.name + "的</span>");
                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").append("<span class='slide-part-from'>" + artworks[ii].author.info.galleryName + "</span>");
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

    function contains(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    }

    function removeById(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i]._id == val) {
                arr.splice(i, 1);
                break;
            }
        }
    }

    $.get("/v1/art/latest", function (latestArtWrok, result) {
        if (result == "success") {
            // reArrangeArray(candidates.data);
            if (!(latestArtWrok.lists instanceof Array)) {
                console.error("Parameter wrong : {" + recentGallery.data + "} is not an Array");
                return null;
            };
            newArtWorks = latestArtWrok.lists;
            var Artindex = new Array();
            if (newArtWorks.length != 0) {
                $defaultNewArt = $("#new-art-slide table tr td:eq(0)").remove();//删除默认节点 
                var artworkInCollection = new Array();
                for (var i = 0; i < newArtWorks.length; i++) {
                    if (colArtWorks.length != 0) {
                        // next:
                        for (var j = 0; j < colArtWorks.length; j++) {
                            if (newArtWorks[i]._id == colArtWorks[j]._id) {
                                artworkInCollection.push(i);
                                console.log(artworkInCollection.join("|"));
                            }
                        }

                    }

                };

                for (var i = 0; i < newArtWorks.length; i++) {
                    if (contains(artworkInCollection, i)) {
                        console.log("collected" + i)
                        $("#new-art-slide table tr").append("<td id=" + 'newArtWorkTd' + newArtWorks[i]._id + "><div class='slide-part-content'>" + '<div class="collecte-button" style="background:url(./icons/collection_fill.png);background-size:cover;"' + 'id=collecte-button' + newArtWorks[i]._id + '></div>' + "<div class='slide-part-img-2' style='background:url(" + newArtWorks[i].cover + ");background-size:cover;'>" + "</div><p class='slide-part-intro'>" + newArtWorks[i].title + '来自' + '<span class="slide-part-from">' + newArtWorks[i].author.info.name + '的' + newArtWorks[i].author.info.galleryName + "</span></p></div></td>");
                    } else {
                        console.log("uncollected" + i)
                        $("#new-art-slide table tr").append("<td id=" + 'newArtWorkTd' + newArtWorks[i]._id + "><div class='slide-part-content'>" + '<div class="collecte-button"' + 'id=collecte-button' + newArtWorks[i]._id + '></div>' + "<div class='slide-part-img-2' style='background:url(" + newArtWorks[i].cover + ");background-size:cover;'>" + "</div><p class='slide-part-intro'>" + newArtWorks[i].title + '来自' + '<span class="slide-part-from">' + newArtWorks[i].author.info.name + '的' + newArtWorks[i].author.info.galleryName + "</span></p></div></td>");
                    }
                };

                var tds = $("#new-art-slide table tr td .slide-part-img-2").toArray();
                for (var i in tds) {
                    tds[i].onclick = function (ii) {
                        return function () {
                            //urls[ii] = newArtWorks[ii].urls;
                            var artworkLeft = (pageWidth - $("#id-artwork-intro").width()) / 2 + 'px';
                            var artworkGoTop = ((pageHeight - $("#nav-slide-content").height()) - $("#artwork-go-next").height()) / 2 + 'px';
                            pageNow.push("artworks");
                            $("#nav-slide-content").fadeOut(400);
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

                var colButton = $("#new-art-slide table tr td .slide-part-content .collecte-button").toArray();
                for (var i in colButton) {
                    colButton[i].onclick = function (ii) {
                        return function () {
                            $.post("/v1/user/collection/add", { aid: newArtWorks[ii]._id }, function (data, status) {
                                if (status == "success") {//
                                    if (data.status) {
                                        $("#collecte-button" + newArtWorks[ii]._id).fadeOut(100, function () {
                                            $("#collecte-button" + newArtWorks[ii]._id).css({ background: 'url(./icons/collection_fill.png)', backgroundSize: 'cover' });
                                            $("#collecte-button" + newArtWorks[ii]._id).fadeIn(100);
                                            colArtWorks.push(newArtWorks[ii]);
                                        })
                                    } else {
                                        $("#collecte-button" + newArtWorks[ii]._id).fadeOut(100, function () {
                                            $("#collecte-button" + newArtWorks[ii]._id).css({ background: 'url(./icons/collection.png)', backgroundSize: 'cover' });
                                            $("#collecte-button" + newArtWorks[ii]._id).fadeIn(100);
                                            removeById(colArtWorks, newArtWorks[ii]._id);
                                        })
                                    }
                                }
                            });
                        }
                    }(i)
                }
            }
            // alert(latestArtWrok.lists[0].info.name)

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
            $("#home-logo").css('color', 'black');
            $("#email-text").css('color', 'black');
            $("#email-text").text("电子邮件地址");
            $("#pwd-text").css('color', 'black');
            $("#pwd-text").text("密码");
            $("input").css('borderBottom', '3px solid ' + 'black');

            $("#re-email-text").css('color', 'black');
            $("#re-email-text").text("电子邮件地址");
            $("#re-pwd-text").css('color', 'black');
            $("#re-gallery-text").css('color', 'black');
            $("#re-pwd-text").text("密码");
            $("#re-gallery-text").text("您的画廊叫什么");
            $("input").css('borderBottom', '3px solid ' + 'black');
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
                        $("input").css('borderBottom', "none");
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
                                    $("#rec-gallery-slide table tr").append("<td id=" + 'newGatTd' + recGallery[i]._id + "><div class='slide-part-content'><div class='slide-part-img-0' style='background:url(" + recGallery[i].info.avatar + ");background-size:cover;'></div><p class='slide-part-name'>" + recGallery[i].info.name + '的<br>' + recGallery[i].info.galleryName + "</p></div></td>");
                                };
                                var tds = $("#rec-gallery-slide table tr td").toArray();
                                for (var i in tds) {
                                    tds[i].onclick = function (ii) {
                                        return function () {
                                            $("#edit-button").css('display', 'none');
                                            if (tds[ii].attributes.id.nodeValue.substring(8) == userNowContent._id) {
                                                console.log('thisGallery' + tds[ii].attributes.id.nodeValue.substring(8) + '|' + 'usernow' + userNowContent._id)
                                                $("#edit-button").fadeIn(300);
                                            }
                                            $("#nav-slide-content").fadeOut(300);
                                            var artworkLeft = (pageWidth - $("#id-artwork-intro").width()) / 2 + 'px';
                                            var artworkGoTop = ((pageHeight - $("#nav-slide-content").height()) - $("#artwork-go-next").height()) / 2 + 'px';
                                            pageNow.push("gallery");
                                            $("#home-page").fadeOut(400);
                                            $("#gallery-page-content").fadeIn(400);
                                            $("#gallery-page table tr").html("");
                                            $.get("/v1/art/list?uid=" + tds[ii].attributes.id.nodeValue.substring(8), function (artworks, result) {
                                                if (result == "success") {
                                                    var artworkLeft = (pageWidth - $("#id-artwork-intro").width()) / 2 + 'px';
                                                    var artworkGoTop = ((pageHeight - $("#nav-slide-content").height()) - $("#artwork-go-next").height()) / 2 + 'px';
                                                    var userInfo = artworks.userInfo;
                                                    artworks = artworks.lists;

                                                    $("#gallery-page table tr").html('');
                                                    $("#gallery-page table tr").append("<td id='add-button-td' style='display:none'><div class='add-button' id='add-works-button'></div></td>");
                                                    if (artworks.length == 0) {
                                                        $("#gallery-page table tr").append('<td id="no-artwork"><div class="slide-part-content"><p class="slide-part-no" style="font-size:4em">无</p></div></td>');
                                                    }
                                                    $("#gallery-page-content p").text(userInfo.galleryName);
                                                    for (var j in artworks) {
                                                        $("#gallery-page table tr").append("<td><div class='slide-part-content'><div class='slide-part-img-0' style='background:url(" + artworks[j].cover + ");background-size:cover;'></div><p class='slide-part-name'>" + artworks[j].title + "</p></div></td>");
                                                    }

                                                    $("#add-works-button").click(function () {
                                                        pageNow.push("edita");
                                                        fadeinNow();
                                                        fadeoutNow();
                                                    });

                                                    var tdss = $("#gallery-page table tr td .slide-part-img-0").toArray();
                                                    for (var j in tdss) {
                                                        tdss[j].onclick = function (ii) {
                                                            return function () {
                                                                pageNow.push("artworks");
                                                                var index = 0;
                                                                $("#artwork-page-content div.go-next").click(function () {
                                                                    if (index < artworks[ii].urls.length - 1) {
                                                                        index++;
                                                                        $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + artworks[ii].urls[index] + ')');
                                                                    }
                                                                });
                                                                $("#artwork-page-content div.go-pre").click(function () {
                                                                    if (index > 0) {
                                                                        index--;
                                                                        $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + artworks[ii].urls[index] + ')');
                                                                    }
                                                                });

                                                                $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + artworks[ii].urls[index] + ')');
                                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro-m").html(artworks[ii].profile);
                                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").html(artworks[ii].title + " 来自");
                                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").append("<span class='slide-part-from'>" + artworks[ii].author.info.name + "的</span>");
                                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").append("<span class='slide-part-from'>" + artworks[ii].author.info.galleryName + "</span>");
                                                                artworkLeft = (pageWidth - $("#id-artwork-intro").width()) / 2 + 'px';
                                                                $("#id-artwork-intro").css('left', artworkLeft);
                                                                //$("#gallery-page-content").fadeOut(400);
                                                                //$("#artwork-page-content").fadeIn(400);
                                                                pageNow.push("artworks");
                                                                fadeoutNow();
                                                                fadeinNow();
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

                                            $("#nav-slide-content").fadeOut(300);
                                            $("#edit-button").css('display', 'none');
                                            if (tds[ii].attributes.id.nodeValue.substring(8) == userNowContent._id) {
                                                console.log('thisGallery' + tds[ii].attributes.id.nodeValue.substring(8) + '|' + 'usernow' + userNowContent._id)
                                                $("#edit-button").fadeIn(300);
                                            }
                                            everyThingIsGrey();
                                            $("#home-page").fadeOut(400);
                                            $("#gallery-page-content").fadeIn(400);
                                            $("#gallery-page table tr").html("");
                                            $.get("/v1/art/list?uid=" + tds[ii].attributes.id.nodeValue.substring(8), function (artworks, result) {
                                                if (result == "success") {
                                                    var userInfo = artworks.userInfo;
                                                    artworks = artworks.lists;

                                                    $("#gallery-page table tr").html('');
                                                    $("#gallery-page table tr").append("<td id='add-button-td' style='display:none'><div class='add-button' id='add-works-button'></div></td>");
                                                    if (artworks.length == 0) {
                                                        $("#gallery-page table tr").append('<td id="no-artwork"><div class="slide-part-content"><p class="slide-part-no" style="font-size:4em">无</p></div></td>');
                                                    }
                                                    $("#gallery-page-content p").text(userInfo.galleryName);
                                                    for (var j in artworks) {
                                                        $("#gallery-page table tr").append("<td><div class='slide-part-content'><div class='slide-part-img-0' style='background:url(" + artworks[j].cover + ");background-size:cover;'></div><p class='slide-part-name'>" + artworks[j].title + "</p></div></td>");
                                                    }

                                                    $("#add-works-button").click(function () {
                                                        pageNow.push("edita");
                                                        fadeinNow();
                                                        fadeoutNow();
                                                    });

                                                    var tdss = $("#gallery-page table tr td .slide-part-img-0").toArray();
                                                    for (var j in tdss) {
                                                        tdss[j].onclick = function (ii) {
                                                            return function () {
                                                                pageNow.push("artworks");
                                                                var index = 0;
                                                                $("#artwork-page-content div.go-next").click(function () {
                                                                    if (index < artworks[ii].urls.length - 1) {
                                                                        index++;
                                                                        $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + artworks[ii].urls[index] + ')');
                                                                    }
                                                                });
                                                                $("#artwork-page-content div.go-pre").click(function () {
                                                                    if (index > 0) {
                                                                        index--;
                                                                        $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + artworks[ii].urls[index] + ')');
                                                                    }
                                                                });

                                                                $("#artwork-page-content div.artwork-page-content div.artwork-part-img").css('background-image', 'url(' + artworks[ii].urls[index] + ')');
                                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro-m").html(artworks[ii].profile);
                                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").html(artworks[ii].title + " 来自");
                                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").append("<span class='slide-part-from'>" + artworks[ii].author.info.name + "的</span>");
                                                                $("#artwork-page-content div.artwork-page-content div.artwork-intro p.artwork-part-intro").append("<span class='slide-part-from'>" + artworks[ii].author.info.galleryName + "</span>");
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

                    function contains(arr, obj) {
                        var i = arr.length;
                        while (i--) {
                            if (arr[i] === obj) {
                                return true;
                            }
                        }
                        return false;
                    }

                    function removeById(arr, val) {
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i]._id == val) {
                                arr.splice(i, 1);
                                break;
                            }
                        }
                    }

                    $.get("/v1/art/latest", function (latestArtWrok, result) {
                        if (result == "success") {
                            // reArrangeArray(candidates.data);
                            if (!(latestArtWrok.lists instanceof Array)) {
                                console.error("Parameter wrong : {" + recentGallery.data + "} is not an Array");
                                return null;
                            };
                            newArtWorks = latestArtWrok.lists;
                            var Artindex = new Array();
                            if (newArtWorks.length != 0) {
                                $defaultNewArt = $("#new-art-slide table tr td:eq(0)").remove();//删除默认节点 
                                var artworkInCollection = new Array();
                                for (var i = 0; i < newArtWorks.length; i++) {
                                    if (colArtWorks.length != 0) {
                                        // next:
                                        for (var j = 0; j < colArtWorks.length; j++) {
                                            if (newArtWorks[i]._id == colArtWorks[j]._id) {
                                                artworkInCollection.push(i);
                                                console.log(artworkInCollection.join("|"));
                                            }
                                        }

                                    }

                                };

                                for (var i = 0; i < newArtWorks.length; i++) {
                                    if (contains(artworkInCollection, i)) {
                                        console.log("collected" + i)
                                        $("#new-art-slide table tr").append("<td id=" + 'newArtWorkTd' + newArtWorks[i]._id + "><div class='slide-part-content'>" + '<div class="collecte-button" style="background:url(./icons/collection_fill.png);background-size:cover;"' + 'id=collecte-button' + newArtWorks[i]._id + '></div>' + "<div class='slide-part-img-2' style='background:url(" + newArtWorks[i].cover + ");background-size:cover;'>" + "</div><p class='slide-part-intro'>" + newArtWorks[i].title + '来自' + '<span class="slide-part-from">' + newArtWorks[i].author.info.name + '的' + newArtWorks[i].author.info.galleryName + "</span></p></div></td>");
                                    } else {
                                        console.log("uncollected" + i)
                                        $("#new-art-slide table tr").append("<td id=" + 'newArtWorkTd' + newArtWorks[i]._id + "><div class='slide-part-content'>" + '<div class="collecte-button"' + 'id=collecte-button' + newArtWorks[i]._id + '></div>' + "<div class='slide-part-img-2' style='background:url(" + newArtWorks[i].cover + ");background-size:cover;'>" + "</div><p class='slide-part-intro'>" + newArtWorks[i].title + '来自' + '<span class="slide-part-from">' + newArtWorks[i].author.info.name + '的' + newArtWorks[i].author.info.galleryName + "</span></p></div></td>");
                                    }
                                };

                                var tds = $("#new-art-slide table tr td .slide-part-img-2").toArray();
                                for (var i in tds) {
                                    tds[i].onclick = function (ii) {
                                        return function () {
                                            //urls[ii] = newArtWorks[ii].urls;
                                            var artworkLeft = (pageWidth - $("#id-artwork-intro").width()) / 2 + 'px';
                                            var artworkGoTop = ((pageHeight - $("#nav-slide-content").height()) - $("#artwork-go-next").height()) / 2 + 'px';
                                            pageNow.push("artworks");
                                            $("#nav-slide-content").fadeOut(400);
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

                                var colButton = $("#new-art-slide table tr td .slide-part-content .collecte-button").toArray();
                                for (var i in colButton) {
                                    colButton[i].onclick = function (ii) {
                                        return function () {
                                            $.post("/v1/user/collection/add", { aid: newArtWorks[ii]._id }, function (data, status) {
                                                if (status == "success") {//
                                                    if (data.status) {
                                                        $("#collecte-button" + newArtWorks[ii]._id).fadeOut(100, function () {
                                                            $("#collecte-button" + newArtWorks[ii]._id).css({ background: 'url(./icons/collection_fill.png)', backgroundSize: 'cover' });
                                                            $("#collecte-button" + newArtWorks[ii]._id).fadeIn(100);
                                                            colArtWorks.push(newArtWorks[ii]);
                                                        })
                                                    } else {
                                                        $("#collecte-button" + newArtWorks[ii]._id).fadeOut(100, function () {
                                                            $("#collecte-button" + newArtWorks[ii]._id).css({ background: 'url(./icons/collection.png)', backgroundSize: 'cover' });
                                                            $("#collecte-button" + newArtWorks[ii]._id).fadeIn(100);
                                                            removeById(colArtWorks, newArtWorks[ii]._id);
                                                        })
                                                    }
                                                }
                                            });
                                        }
                                    }(i)
                                }
                            }
                            // alert(latestArtWrok.lists[0].info.name)

                        }
                    });

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
                $("input").css('borderBottom', '3px solid ' + 'red');
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
        $("#registerForm1").ajaxSubmit({
            type: "post",
            url: "/v1/user/register",
            success: function (result) {
                if (result.info.code == "200") {
                    console.log("register complete");
                    $("#home-logo").fadeOut(400, function () {
                        $("#home-logo").text("完善信息");
                        $("#home-logo").fadeIn(400);
                    });
                    $("#registe2-page-content").fadeIn(400);
                    $("#register-content").fadeOut(400);
                    $("#login-pre").fadeOut(400);
                    $("#register-next2").css('display', 'block');
                }
            },
            error: function () {
                $("#home-logo").css('color', 'red');
                $("#home-logo").text("注册");
                $("#re-email-text").css('color', 'red');
                $("#re-email-text").text("请检查电子邮件地址的合法性");
                $("#re-pwd-text").css('color', 'red');
                $("#re-gallery-text").css('color', 'red');
                $("#re-pwd-text").text("请检查密码的合法性");
                $("input").css('borderBottom', '3px solid ' + 'red');
                $("#re-gallery-text").text("您的画廊叫什么");
                $("#home-logo").css('backgroundImage', 'url()');
                $("#home-logo").fadeIn(400);
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


function WorksUpImg() {
    var nowHeadUrl = $.cookie("email");
    $('#editForm2').find('#RurlWorksName').val(nowHeadUrl + getRandomString(6));

    var strSrc = $("#works-file").val();
    img = new Image();
    img.src = getFullPath(strSrc);
    console.log('imgsrc' + getFullPath(strSrc))
    //验证上传文件格式是否正确  
    var pos = strSrc.lastIndexOf(".");
    var lastname = strSrc.substring(pos, strSrc.length)
    if (lastname.toLowerCase() != ".jpg" && lastname.toLowerCase() != ".png" && lastname.toLowerCase() != ".gif" && lastname.toLowerCase() != ".jpeg") {
        alert("您上传的文件类型为" + lastname + "，Gallery仅接受 JPG/PNG/GIF 类型的图像格式");
        return false;
    }

    //验证上传文件是否超出了大小  
    if (img.fileSize / 1024 > 4096) {
        alert("请您上传4M以内的作品图片，谢谢。");
        return false;
    }
    var imgObject = document.getElementById('works-file');
    var getImageSrc = getFullPath(imgObject); // 本地路径
    var srcs = window.URL.createObjectURL(imgObject.files[0]);
    $("#edit-img-page-slide-table tr").append("<td><div class='slide-part-content'><div class='slide-part-img-0' style='background:url(" + srcs + ");background-size:cover;'></div></td>");

    $("#editForm2").ajaxSubmit({
        type: "post",
        url: "/v1/res/upload",
        success: function (urll) {
            console.log("editForm2");
            currentImg.push(urll.url);
            $('#editForm1').find('#urlsid').val(currentImg.join(','));
            console.log($('#editForm1').find('#urlsid').val());
        },
        error: function () {
            alert("请检查图片的合法性")
        }
    })

}

function RigisterUpHead() {
    var nowHeadUrl = $.cookie("email");
    $('#registerForm2').find('#RurlName').val(nowHeadUrl);

    var strSrc = $("#head-file").val();
    img = new Image();
    img.src = getFullPath(strSrc);
    console.log('imgsrc' + getFullPath(strSrc))
    //验证上传文件格式是否正确  
    var pos = strSrc.lastIndexOf(".");
    var lastname = strSrc.substring(pos, strSrc.length)
    if (lastname.toLowerCase() != ".jpg" && lastname.toLowerCase() != ".png" && lastname.toLowerCase() != ".gif" && lastname.toLowerCase() != ".jpeg") {
        alert("您上传的文件类型为" + lastname + "，Gallery仅接受 JPG/PNG/GIF 类型的图像格式");
        return false;
    }
    //验证上传文件宽高比例  

    if (img.height / img.width > 0.9 || img.height / img.width < 1.1) {
        alert("您的画廊封面会被裁剪，我们推荐您上传正方形的画廊封面");
    }
    //验证上传文件是否超出了大小  
    if (img.fileSize / 1024 > 4096) {
        alert("请您上传4M以内的画廊封面");
        return false;
    }
    var imgObject = document.getElementById('head-file');
    var getImageSrc = getFullPath(imgObject); // 本地路径
    var srcs = window.URL.createObjectURL(imgObject.files[0]);
    $("#register-head-fake").css({ background: 'url(' + srcs + ')' });


    $("#registerForm2").ajaxSubmit({
        type: "post",
        url: "/v1/res/upload",
        success: function (urll) {
            console.log("register2");
            $('#registerForm3').find('#headurlavareg').val(urll.url);
            console.log($('#registerForm3').find('#headurlavareg').val());
        },
        error: function () {
            alert("请检查图片的合法性")
        }
    })

}

function ModifyUpHead() {
    var nowHeadUrl = $.cookie("email");
    $('#registerForm4').find('#RurlName').val(nowHeadUrl);

    var strSrc = $("#me-head-file").val();
    img = new Image();
    img.src = getFullPath(strSrc);
    console.log('imgsrc' + getFullPath(strSrc))
    //验证上传文件格式是否正确  
    var pos = strSrc.lastIndexOf(".");
    var lastname = strSrc.substring(pos, strSrc.length)
    if (lastname.toLowerCase() != ".jpg" && lastname.toLowerCase() != ".png" && lastname.toLowerCase() != ".gif" && lastname.toLowerCase() != ".jpeg") {
        alert("您上传的文件类型为" + lastname + "，Gallery仅接受 JPG/PNG/GIF 类型的图像格式");
        return false;
    }
    //验证上传文件宽高比例  

    if (img.height / img.width > 0.9 || img.height / img.width < 1.1) {
        alert("您的画廊封面会被裁剪，我们推荐您上传正方形的画廊封面");
    }
    //验证上传文件是否超出了大小  
    if (img.fileSize / 1024 > 4096) {
        alert("请您上传4M以内的画廊封面");
        return false;
    }
    var imgObject = document.getElementById('me-head-file');
    var getImageSrc = getFullPath(imgObject); // 本地路径
    var srcs = window.URL.createObjectURL(imgObject.files[0]);
    $("#modify-head-fake").css({ background: 'url(' + srcs + ')' });


    $("#registerForm4").ajaxSubmit({
        type: "post",
        url: "/v1/res/upload",
        success: function (urll) {
            console.log("register4(modifyhead)");
            $('#registerForm5').find('#headurlavamod').val(urll.url);
            console.log($('#registerForm5').find('#headurlavamod').val());
        },
        error: function () {
            alert("请检查图片的合法性")
        }
    })

}

function getFullPath(obj) {  //得到图片的完整路径
    if (obj) {
        if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
            obj.select();
            return document.selection.createRange().text;

        } else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
            if (obj.files) {
                return window.URL.createObjectURL(obj.files[0]);
            }
            return obj.value;
        }
        return obj.value;
    }
}

$("#save-button").click(function () {
    $("#editForm1").ajaxSubmit({
        type: "post",
        url: "/v1/art/add",
        success: function (result) {
            console.log("editForm1");
            if (result.info.code == "200") {
                $("input").css('borderBottom', "none");
                // location.reload();
                //添加成功
                // artworksLocal.push();
                inputNewBool = true;
                pageNow.push('gallery');
                fadeinNow();
                fadeoutNow();
                $.get("v1/user/info", function (user, result) {
                    if (result == "success") {
                        $.get("/v1/art/list?uid=" + user._id, function (artworks, result) {
                            if (result == "success") {
                                var userInfo = artworks.userInfo;
                                artworks = artworks.lists;
                                artworksLocal = artworks.lists;
                                $("#gallery-page table tr").html('');
                                $("#gallery-page table tr").append("<td id='add-button-td' style='display:none'><div class='add-button' id='add-works-button'></div></td>")
                                $("#gallery-page-content p").text(userInfo.galleryName);
                                $("#add-works-button").click(function () {
                                    pageNow.push("edita");
                                    fadeinNow();
                                    fadeoutNow();
                                });
                                for (var j in artworks) {
                                    $("#gallery-page table tr").append("<td><div class='slide-part-content'><div class='slide-part-img-0' style='background:url(" + artworks[j].cover + ");background-size:cover;'></div><p class='slide-part-name'>" + artworks[j].title + "</p></div></td>");
                                }
                                var tdss = $("#gallery-page table tr td .slide-part-content").toArray();
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
                $('#add-button-td').fadeIn(400);
            }
        },
        error: function () {
            alert("请检查输入的合法性")
        }
    })
});

$("#edit-pre").click(function () {
    $("input").css('borderBottom', 'none');
    pageNow.push("gallery");
    fadeinNow();
    fadeoutNow();
}
);

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
                console.log("register3");
                if (result.info.code == "200") {
                    location.reload();
                }
            },
            error: function () {
                alert("请检查画廊合法性")
            }
        })
    }
)

$("#modify-button").click(
    function () {
        // $("#home-logo").fadeOut(400, function () {

        // with (location) {
        // var recGalleryScroll = new IScroll('#rec-gallery-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

        // var newGalleryScroll = new IScroll('#new-gallery-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

        // var newArtScroll = new IScroll('#new-art-slide', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
        // var newArtScroll = new IScroll('#gallery-page', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

        // }
        // })

        $("#registerForm5").ajaxSubmit({
            type: "post",
            url: "/v1/user/update",
            success: function (result) {
                console.log("register5");
                if (result.info.code == "200") {
                    alert("修改成功")
                    location.reload();
                }
            },
            error: function () {
                alert("请检查画廊合法性")
            }
        })
    }
)

$("#nav-ul-me").click(
    function () {
        pageNow.push("me");
        $("input").css('borderBottom', '3px solid ' + 'black');
        $.get("v1/user/info", function (user, result) {
            if (result == "success") {
                userNow = user.userInfo;
                $("#registerForm5").find('#me-name').val(userNow.name);
                $("#registerForm5").find('#me-galleyName').val(userNow.galleryName);
                $("#modify-head-fake").css('background', 'url(' + userNow.avatar + ')');
                $("#modify-head-fake").css('backgroundSize', 'cover');
                $("#mod-exit").fadeIn(400);
                $("#me-page-content").fadeIn(400);
            }
        })

        $("#nav-slide-content").fadeOut(400);
        fadeoutNow();
    }
);

$("#me-pre").click(
    function () {
        $("input").css('borderBottom', 'none');
        $("#me-page-content").fadeOut(400);
        $("#nav-slide-content").fadeIn(400);
        $("#mod-exit").fadeOut(400);
        pageNow.push(pageNow[pageNow.length - 2]);
        fadeinNow();
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
    if (pageNow[pageNow.length - 2] == "edita") {
        $("#edit-addArtWroks-page-content").fadeOut(400);
    };
}

function fadeinNow() {
    console.log(pageNow.join("|"));
    if (pageNow[pageNow.length - 1] == "home") {
        $("#home-page").fadeIn(400);
    };
    if (pageNow[pageNow.length - 1] == "search") {
        $("#search-page-content").fadeIn(400);
    };
    if (pageNow[pageNow.length - 1] == "collection") {
        $("#collection-page-content").fadeIn(400);
    };
    if (pageNow[pageNow.length - 1] == "gallery") {
        $("#gallery-page-content").fadeIn(400);
    };
    if (pageNow[pageNow.length - 1] == "artworks") {
        $("#artwork-page-content").fadeIn(400);
    };
    if (pageNow[pageNow.length - 1] == "edita") {
        $("#edit-addArtWroks-page-content").fadeIn(400);
    };

}