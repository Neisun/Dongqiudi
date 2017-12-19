// 获取资讯
import axios from '../common/js/http'

export function getNews(page) {
    let url=`/mobile/tab/1/archives?page=${page}`
    return axios.request({
        method:'get',
        url:url
    })
}