/*
 * @Author: hunaisong 
 * @Date: 2017-12-18 11:27:06 
 * @Last Modified by: hunaisong
 * @Last Modified time: 2017-12-18 14:16:18
 */

// https://www.dongqiudi.com/mobile/tab/43/archives?page=0 不可描述
// https://www.dongqiudi.com/mobile/tab/11/archives?page=0 集锦
import axios from '../common/js/http'
// 暂时先只展示不可描述部分数据
export function getVideo(curPage,type) {
    let url = `/mobile/tab/${type}/archives?page=${curPage}`;
    return axios.request({
        method:'get',
        url:url
    })
}