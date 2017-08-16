import Vue from 'vue'

/* 
 * 全局过滤器: timeFormatter
 * 功能：将iview插件里面返回的时间进行格式化，2017-08-15T16:03:00.801Z   --->  yyyyMMddHHmmss
 * 参数：s，需要格式化的时间. 
 * 返回：返回格式化后的时间字符串. 
 */
Vue.filter("timeFormatter", function(value) {
    function formatTime(s) {
        if(!s){
            return;
        }
        var _str = [];

        //年yyyy
        _str[0] = s.getFullYear();
        //月MM
        s.getMonth() >= 9 ? _str[1] = s.getMonth()+1 : _str[1] = '0' + (s.getMonth()+1);
        //日dd
        s.getDate() > 9 ? _str[2] = s.getDate() : _str[2] = '0' + s.getDate();
        //小时HH
        s.getHours() > 9 ? _str[3] = s.getHours() : _str[3] = '0' + s.getHours();
        //分钟mm
        s.getMinutes() > 9 ? _str[4] = s.getMinutes() : _str[4] = '0' + s.getMinutes();
        //秒钟ss
        s.getSeconds() > 9 ? _str[5] = s.getSeconds() : _str[5] = '0' + s.getSeconds();
        
        return _str.join('');
    }

    return formatTime(value);
});