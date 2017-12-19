import axios from '../common/js/http'
import { formatDate } from '../common/js/util'
// 请求接口的形式
// https://www.dongqiudi.com/data/tab/important?start=2017-12-14+16:00:00
// 很明显，需要将当前时间转化一下
// function formatDate(date) {
//     var y = date.getFullYear();
//     var m = date.getMonth() + 1;
//     m = m < 10 ? '0' + m : m;
//     var d = date.getDate();
//     d = d < 10 ? '0' + d : d;
//     return y + '-' + '-' + m + '-' + d;
// }
// 方法我们不在这里写，因为可能别的位置也会用，我们放到common中，新建一个util.js
export function getRace() {
    let curDate = formatDate(new Date(), 1) + ' 16:00:00';
    // console.log(curDate)
    return axios.request({
        method: 'get',
        url: '/data/tab/important',
        params: {
            start: curDate
        }
    })
}