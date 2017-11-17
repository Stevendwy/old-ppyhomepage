//首页浏览器检测
function myBrowser() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串


    // alert(userAgent)

    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1 || userAgent.indexOf('Gecko') > -1 && userAgent.indexOf('KHTML') == 1) {
        return "FF";
    } //判断是否Firefox浏览器
    if ((userAgent.indexOf("iPad") > -1 && userAgent.indexOf("AppleWebKit") > -1) || (userAgent.indexOf("iPhone") > -1 && userAgent.indexOf("AppleWebKit") > -1) || userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}

$(".notAgain").on("click", function() {
    var src = $(".notAgain img").attr('src');
    if (src == "/img/icon_zhifuxuanzhe.png") {
        $(".notAgain img").attr("src", "/img/icon_zhifuxuanzhe_dian.png");
        localStorage.isShow = "none";
    } else {
        $(".notAgain img").attr("src", "/img/icon_zhifuxuanzhe.png");
        localStorage.isShow = "show";
    }
})
$(".close").on("click", function() {
    $('#root').css("filter", "none")
    $("#browserChange").hide();
})

function toAlert() {
    if (!localStorage.isShow) {
        $("#browserChange").show();

    } else {
        if (localStorage.isShow == "none") {

        } else {
            $("#browserChange").show();
        }
    }
}

//以下是调用上面的函数
var mb = myBrowser();
switch (mb) {
    case "IE":
        toAlert();
        break;
    case "FF":
        break;
    case "Chrome":
        break;
    case "Opera":
        toAlert();
        break;
    case "Safari":
        toAlert();
        break;
    default:
        toAlert();
        break;
}
