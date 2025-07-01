//ScrollTop
function initScrollTop() {
  $(window).scroll(function () {
    if ($(window).scrollTop() == "0") $("div.scrollToTop").fadeOut("slow");
    else $("div.scrollToTop").fadeIn("slow");
  });

  $("div.scrollToTop a").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });
}
//fatfooter 關閉紐設定
function initFatfooter(closeText, openText) {
  $(".fatbtn").click(function () {
    $(".fat-wrap").toggleClass("fat-open");
    $(".fat-content").slideToggle(500);
    $(".fatbtn").toggleText(closeText, openText);
    return false;
  });
  jQuery.fn.extend({
    toggleText: function (a, b) {
      var that = this;
      if (that.text() != a && that.text() != b) {
        that.text(a);
      } else if (that.text() == a) {
        that.text(b);
      } else if (that.text() == b) {
        that.text(a);
      }
      return this;
    },
  });
}
//無障礙設定
function initAccessible() {
  if ($(".social_links").length > 0) {
    $(".social-links").show(); //社群分享
  }
  if ($(".header_search").length > 0) {
    $(".header_search").show(); //搜尋區塊
  }
}
//搜尋區塊
function initSearchBlock() {
  var $search_btn = $(".search-parent");
  $search_close = $(".search-close");
  $mask = $(".header-search");
  //展開
  $search_btn.click(function () {
    $(this).toggleClass("search-open");
    $mask.toggleClass("search-mask");
  });
  //檢查是否還在搜尋區塊內，不是就將區塊隱藏
  $(document).on("click", function (e) {
    if ($(e.target).parents(".search-content").length == 0) {
      $search_btn.removeClass("search-open");
      $mask.removeClass("search-mask");
    }
  });
  //檢查畫面高度是否為 0，不是就將區塊隱藏
  $(window).scroll(function () {
    if ($(window).scrollTop() > "0") $search_btn.removeClass("search-open");
    $mask.removeClass("search-mask");
  });
  //關閉
  $search_close.click(function () {
    $search_btn.removeClass("search-open");
    $mask.removeClass("search-mask");
  });
  //跳過關閉鈕，blur時，將區塊隱藏
  $search_close.blur(function () {
    $search_btn.removeClass("search-open");
    $mask.removeClass("search-mask");
  });
}
//社群分享
function initShareOnSocialNetwork() {
  var containerShare = $("#divShareLinks");
  containerShare.children("a[class*=social]").each(function () {
    var locUrl = encodeURIComponent(location.href);
    var aLinkId = $(this).prop("id");

    if (aLinkId.indexOf("aFacebookShareLink") >= 0) {
      //var fbLink = "javascript: void(window.open('http://www.facebook.com/share.php?u='.concat(encodeURIComponent(location.href)), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600' ));";
      //$(this).attr("href", fbLink);

      var func = function (e) {
        e.preventDefault;
        var redirectUrl = "http://www.facebook.com/share.php?u=" + locUrl;
        window.open(
          redirectUrl,
          "ShareFB",
          "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"
        );
        return false;
      };
      $(this).keypress(func);
      $(this).click(func);
    } else if (aLinkId.indexOf("aGoolgeShareLink") >= 0) {
      //var ggLink = "javascript: void(window.open('https://plus.google.com/share?url='.concat(encodeURIComponent(location.href)), 'ShareGoogle', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'));";
      //$(this).attr("href", ggLink);

      var func = function (e) {
        e.preventDefault;
        var redirectUrl = "https://plus.google.com/share?url=" + locUrl;
        window.open(
          redirectUrl,
          "ShareGoogle",
          "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"
        );
        return false;
      };
      $(this).keypress(func);
      $(this).click(func);
    } else if (aLinkId.indexOf("aTwitterShareLink") >= 0) {
      //var ttLink = "javascript: void(window.open('http://twitter.com/home/?status='.concat(encodeURIComponent(document.title)) .concat(' ') .concat(encodeURIComponent(location.href)), 'ShareTweeter', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'));";
      //$(this).attr("href", ttLink);

      var func = function (e) {
        e.preventDefault;
        locurl = "https://twitter.com/intent/tweet?text="
          .concat(encodeURIComponent(document.title))
          .concat(" ")
          .concat(encodeURIComponent(location.href));
        var redirectUrl = "https://twitter.com/intent/tweet?text=" + locUrl;
        window.open(
          redirectUrl,
          "ShareTweeter",
          "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"
        );
        return false;
      };
      $(this).keypress(func);
      $(this).click(func);
    } else if (aLinkId.indexOf("aPlurkShareLink") >= 0) {
      //var plLink = "javascript: void(window.open('http://www.plurk.com/?qualifier=shares&status='.concat(encodeURIComponent(location.href)) .concat(' ') .concat('(') .concat(encodeURIComponent(document.title)) .concat(')'), 'SharePlurk', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'));";
      //$(this).attr("href", plLink);

      var func = function (e) {
        e.preventDefault;
        var redirectUrl = "http://www.plurk.com/?qualifier=shares&status="
          .concat(encodeURIComponent(location.href))
          .concat(" ")
          .concat("(")
          .concat(encodeURIComponent(document.title))
          .concat(")");
        window.open(
          redirectUrl,
          "SharePlurk",
          "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"
        );
        return false;
      };
      $(this).keypress(func);
      $(this).click(func);
    } else if (aLinkId.indexOf("aLineShareLink") >= 0) {
      //var lineLink = "javascript: void(window.open('http://line.naver.jp/R/msg/text/?'.concat(encodeURIComponent(document.title)) .concat(' ') .concat(encodeURIComponent(location.href)), 'ShareLine', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'));";
      //$(this).attr("href", lineLink);

      var func = function (e) {
        e.preventDefault;
        var redirectUrl = "http://line.naver.jp/R/msg/text/?"
          .concat(encodeURIComponent(document.title))
          .concat(" ")
          .concat(encodeURIComponent(location.href));
        window.open(
          redirectUrl,
          "ShareLine",
          "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"
        );
        return false;
      };
      $(this).keypress(func);
      $(this).click(func);
    }
  });
  if ($(".sc_social").length > 0) {
    var $socialbtn = $(".sc_social");
    var $lastsocial = $(".social_links a:last-child");
    var $sociallinks = $(".social_links");

    $socialbtn.click(function () {
      $socialbtn.toggleClass("sc_social-open");
      $sociallinks.toggleClass("open");
    });

    //檢查是否還在社群選單，不是就隱藏
    $(document).on("click", function (e) {
      if ($(e.target).parents(".contents_function_inner").length == 0) {
        $socialbtn.removeClass("sc_social-open");
        $sociallinks.removeClass("open");
      }
    });
    //隱藏社群選單，跳到最後一個時，blur時，將選單隱藏
    $lastsocial.blur(function () {
      $socialbtn.removeClass("sc_social-open");
      $sociallinks.removeClass("open");
    });
  }
}
//下拉選單(ex語言列)
function initSlideMenu(className) {
  if ($("." + className).length > 0) {
    //build menu with ID="myslidemenu" on page:
    jqueryslidemenu.buildmenu(className, arrowimages);

    //隱藏選單，跳到最後一個時，blur時，將選單隱藏
    $("." + className)
      .children("li")
      .last()
      .children("a")
      .on("blur", function () {
        $("." + className).hide();
      });
  }
}
//語言版本(點選出現)
function initNavlang() {
  if ($(".nav_lang_parent").length > 0) {
    var $chooselang = $(".nav_lang_parent");
    $lastlang = $(".nav_lang li:last-child a");
    //展開
    $chooselang.click(function () {
      $(this).toggleClass("lang-open");
    });
    //檢查是否還在語系選單，不是就將選單隱藏
    $(document).on("click", function (e) {
      if ($(e.target).parents("#nav_lang").length == 0) {
        $chooselang.removeClass("lang-open");
      }
    });
    //隱藏語系選單，跳到最後一個時，blur時，將選單隱藏
    $lastlang.blur(function () {
      $chooselang.removeClass("lang-open");
    });
  }
}
//列印設定
function printScreen(block) {
  var cssIncludeFiles = [];
  $("link[rel=stylesheet]").each(function () {
    var cssInclude = $(this).get()[0].outerHTML;
    cssIncludeFiles.push(cssInclude);
  });

  var html =
    "<html><head>" +
    cssIncludeFiles.join("") +
    "</head><body onload='(function() { window.print(); window.close(); })()'><div style='font-size:120%; background-color:#fff;'>" +
    block.innerHTML +
    "</div></body></html>";

  var printPage = window.open("", "printPage", "");
  printPage.document.open();
  printPage.document.write(html);
  printPage.document.close();
}
//左側選單
function initLeftMenu() {
  var pageurl = $(".breadcrumbs_u")
    .children("li")
    .last()
    .children("a")
    .attr("href");
  //console.log(pageurl);

  var root1 = $(".sidenav_u1");
  if (root1.length > 0) {
    root1.children(".leftbgli01").each(function () {
      var root2 = $(this).children(".sidenav_u2");
      if (root2.length > 0) {
        var isShowRoot2 = false;
        root2.children(".leftbgli02").each(function () {
          var root3 = $(this).children(".sidenav_u3");
          if (root3.length > 0) {
            //有第三層時
            var isShowRoot3 = false;
            root3.children(".leftbgli03").each(function () {
              if ($(this).children("a").attr("href").indexOf(pageurl) >= 0) {
                isShowRoot2 = true;
                isShowRoot3 = true;
              }
              var root4 = $(this).children(".sidenav_u4");
              if (root4.length > 0) {
                var isShowRoot4 = false;
                root4.children(".leftbgli04").each(function () {
                  if (
                    $(this).children("a").attr("href").indexOf(pageurl) >= 0
                  ) {
                    isShowRoot2 = true;
                    isShowRoot3 = true;
                    isShowRoot4 = true;
                  }
                });
              }
              if (!isShowRoot4) root4.hide();
              else root4.show();
              if ($(this).children("span").length > 0) {
                var obj = $(this);
                alert(obj.html());
                if ($(this).children("span").children("a").length > 0) {
                  $(this)
                    .children("span")
                    .children("a")
                    .attr("href", "javascript:void(0)");
                  $(this)
                    .children("span")
                    .children("a")
                    .bind("click", function () {
                      $(".leftbgli03").children(".leftbgul04").hide();
                      if (
                        obj.children(".sidenav_u4").eq(0).css("display") ==
                        "none"
                      )
                        obj.children(".sidenav_u4").show();
                      else obj.children(".sidenav_u4").hide();
                    });
                }
              }
            });
          } else {
            //沒有第三層時
            if ($(this).children("a").attr("href").indexOf(pageurl) >= 0) {
              isShowRoot2 = true;
            }
          }
          if (!isShowRoot3) root3.hide();
          else root3.show();
          if ($(this).children("a").length > 0) {
            var obj = $(this);
            $(this)
              .children("a")
              .each(function () {
                var childnodecount = $(this).next("ul").length;
                if (childnodecount > 0) {
                  $(this).attr("href", "javascript:void(0)");
                  $(this).bind("click", function () {
                    $(".sidenav_u2").children(".leftbgul03").hide();
                    if (
                      obj.children(".sidenav_u3").eq(0).css("display") == "none"
                    )
                      obj.children(".sidenav_u3").show();
                    else obj.children(".sidenav_u3").hide();
                  });
                }
              });
          }
        });
        if (!isShowRoot2) root2.hide();
        else root2.show();

        if ($(this).children("span").length > 0) {
          var obj = $(this);
          if ($(this).children("span").children("a").length > 0) {
            $(this)
              .children("span")
              .children("a")
              .attr("href", "javascript:void(0)");
            $(this)
              .children("span")
              .children("a")
              .bind("click", function () {
                $(".sidenav_u1").children(".sidenav_u2").hide();
                if (obj.children(".sidenav_u2").eq(0).css("display") == "none")
                  obj.children(".sidenav_u2").show();
                else obj.children(".sidenav_u2").hide();
              });
          }
        }
      } else {
      }
    });
  }
}
//objfit
function objfit() {
  // Internet Explorer 6-11
  var isIE = false || !!document.documentMode;
  if (isIE == true) {
    //objfit-contain
    $(".obj-img-contain .embed-responsive, .obj-img-contain figure").each(
      function () {
        var $container = $(this);
        imgUrl = $container.find("img").prop("src");
        // 核心處理的函式
        if (imgUrl) {
          $container
            .css("backgroundImage", "url(" + imgUrl + ")")
            .addClass("ie-object-fit-contain");
        }
      }
    );
    //objfit-cover
    $(".obj-img-cover .embed-responsive, .obj-img-cover figure").each(
      function () {
        var $container = $(this);
        imgUrl = $container.find("img").prop("src");
        // 核心處理的函式
        if (imgUrl) {
          $container
            .css("backgroundImage", "url(" + imgUrl + ")")
            .addClass("ie-object-fit-cover");
        }
      }
    );
    return false;
  }
}
//字級切換 (大小切換 按鈕樣式與字體放大)
function initFontchange() {
  var $font_normal = $(".sc_font");
  $font_content = $(".main_content");

  $font_normal.click(function () {
    $font_normal.toggleClass("font_bigger");
    $font_content.toggleClass("font_bigger");
  });
}
//字級切換 (大中小切換)
function initChangeFontSize(language) {
  //預設值
  var fontSize = "M";
  var fontSizeCookieName = "fontsize";

  //取得字型大小Cookie
  var cookieFontSize = getCookie(fontSizeCookieName);
  if (cookieFontSize != null) fontSize = cookieFontSize;

  setButtonStyle(fontSize);
  setContentFontSize(fontSize, language);

  $("[id*=aLinkFont]").click(function (e) {
    e.preventDefault();

    if ($(this).prop("id") == "aLinkFont") {
      if ($(this).hasClass("tc_font_change_bigger")) {
        fontSize = "M"; //大改為中
      } else {
        fontSize = "L"; //中改為大
      }
    } else {
      fontSize = $(this).prop("id").replace("aLinkFont", "");
    }

    //儲存字型大小Cookie
    setCookie(fontSizeCookieName, fontSize, 7);
    setButtonStyle(fontSize);
    setContentFontSize(fontSize, language);
  });
}
//設定按鈕樣式
function setButtonStyle(fontSize, language) {
  //console.log('setButtonStyle=' + fontSize);
  if ($("#aLinkFont").length > 0) {
    //大小切換
    var $fontChangeButton = $("#aLinkFont");

    var zoomInStr = "Zoom in";
    var zoomOutStr = "Zoom out";
    if (language == 1028) {
      zoomInStr = "放大";
      zoomOutStr = "縮小";
    }

    if (fontSize == "L") {
      $fontChangeButton.addClass("tc_font_change_bigger");
      $fontChangeButton.attr("title", zoomOutStr);
    } else {
      $fontChangeButton.removeClass("tc_font_change_bigger");
      $fontChangeButton.attr("title", zoomInStr);
    }
  } else if ($("[id*=aLinkFont]").length > 0) {
    //大中小切換
    $("[id*=aLinkFont]").removeClass("active");
    $("[id*=aLinkFont" + fontSize + "]").addClass("active");
  }
}
//設定區塊字型大小
function setContentFontSize(fontSize) {
  var style = "font-size:100%;";
  switch (fontSize) {
    case "L":
      style = "font-size:120%;";
      break;
    case "S":
      style = "font-size:80%;";
      break;
    default:
      style = "font-size:100%;";
      break;
  }
  //切換大小的區塊
  $(".main_body").attr("style", style);
}
//取得cookies(若有localstorage則先取)
function getCookie(cookieName) {
  var fontSize = null;
  if (window.localStorage) {
    var storage = window.localStorage;
    var font_size_localStorage = storage.getItem(cookieName);
    if (font_size_localStorage != null) {
      fontSize = font_size_localStorage;
    }
  } else {
    var cookieArr = document.cookie.split(";");
    for (var i = 0; i < cookieArr.length; i++) {
      if (cookieArr[i].indexOf(cookieName + "=") >= 0) {
        fontSize = cookieArr[i].split("=")[1];
      }
    }
  }
  return fontSize;
}
//設定Cookies(若有localstorage則先存)
function setCookie(cookieName, fontSize, days) {
  if (window.localStorage) {
    var storage = window.localStorage;
    storage.setItem(cookieName, fontSize);
  } else {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = date.toUTCString();
    }
    document.cookie =
      cookieName + "=" + (fontSize || "") + "; expires=" + expires + "; path=/";
  }
}
