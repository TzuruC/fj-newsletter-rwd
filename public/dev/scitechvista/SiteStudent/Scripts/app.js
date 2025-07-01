$(function () {
    initLoadPage();
    initWorkList();
});

function initLoadPage() {
    var page = getParameterByName("page");
    if ($.trim(page) == "") {
        return;
    }

    if (window.location.pathname.toLowerCase().indexOf("full.html") > -1) {
        $(".center_body").load(page + " .kf_full");
    }
    else {
        $(".center_body").load(page + " .main_body");
    }
}

function initWorkList() {
    if ($(".construct").length > 0) {

        $(".construct").on("click", "a", function (e) {
            if ($("#chkOriginal").is(":checked")) {
                return;
            }
            if ($(this).hasClass("master_full")) {

                e.preventDefault();
                var pageName = $(this).prop("href");
                window.open("main-v01.html?page=" + pageName, "_blank");
                //window.location.href = "MainFull.html?page=" + pageName;
                return;
            }
            if ($(this).hasClass("nomaster")) {
                return;
            }

            e.preventDefault();
            var pageName = $(this).prop("href");
            window.open("main-v01.html?page=" + pageName, "_blank");
            //window.location.href = "Main.html?page=" + pageName;
        });
    }

}

function getParameterByName(name) {
    var regexS = "[\\?&]" + name + "=([^&#]*)",
  regex = new RegExp(regexS),
  results = regex.exec(window.location.search);
    if (results == null) {
        return "";
    } else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}
