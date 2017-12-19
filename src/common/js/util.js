/*
 * @Author: hunaisong 
 * @Date: 2017-12-15 16:17:36 
 * @Last Modified by: hunaisong
 * @Last Modified time: 2017-12-18 11:12:20
 */
// 将时间对象 转化为 2017-12-15
export function formatDate(date, num) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate() - num;
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}


//  将21:30:15 转化为 21:30 ，需要在此基础上加上8小时的时差
export function formatLocalHour(time) {
    var arr = time.split(':');
    var h = parseInt(arr[0]) + 8;
    // 这一步容易忘记，加上8，大于24小时制了，需要做判断，然后赋值
    h = h < 24 ? h : h - 24;
    // 对于分钟的格式化，没有加减的处理，不用转换数值类型
    var m = arr[1];
    return h + ':' + m;
}


// 完整的格式化时间
export function formatTimes(time, format) {
    if (!format) {
        format = 'YYYY-MM-DD hh:mm:ss'
    }
    var tf = function(item) {
        item = item < 10 ? '0' + item : item;
        return item;
    }
    var t = new Date(time);
    return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(key) {
        switch (key) {
            case 'YYYY':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'DD':
                return tf(t.getDate());
                break;
            case 'hh':
                return tf(t.getHours());
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
}


// 2017-12-18转化为12月18日
export function formatLocalDate(date) {
    var arr = date.split('-');
    var m = parseInt(arr[1]);
    // m = m < 10 ? '0' + m : m;
    var d = parseInt(arr[2]);
    // d = d < 10 ? '0' + d : d;
    return m + '月' + d + '日';
}