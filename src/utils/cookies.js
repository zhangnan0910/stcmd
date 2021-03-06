// https://www.cnblogs.com/maderlzp/p/7843365.html
// 设置
var setCookie = function (name, value, day) {
    console.log(value)
    console.log(JSON.parse(value).expires_in)
    if (day !== 0) {     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
        //var expires = day * 24 * 60 * 60 * 1000;
        // 后台返回过期时间
        var expires = JSON.parse(value).expires_in * 1000;
        var date = new Date(+new Date() + expires);
        document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
    } else {
        document.cookie = name + "=" + escape(value);
    }
};

// 获取
var getCookie = function (name) {
    var arr;
    var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return escape(arr[2]);
    else
        return null;
};


// 删除
var delCookie = function (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
};
export {
    delCookie,// 删除
    getCookie,//获取
    setCookie
}