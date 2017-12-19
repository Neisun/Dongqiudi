/*
 * @Author: hunaisong 
 * @Date: 2017-12-18 15:54:28 
 * @Last Modified by: hunaisong
 * @Last Modified time: 2017-12-19 13:26:34
 */
import axios from '../common/js/http'
export function getRank(type, league) {
    let url = '';
    if (type === 'schedule') {
        url = `/data/schedule/?round_id=${league.id}&gameweek=${league.gameweek}`
    } else {
        url = `/data/${type}/${league.league}`
    }
    return axios.request({
        method: 'get',
        url: url
    })
}
/**
 * 请求积分榜
 * /data/team_ranking/51
 * team_ranking
 * 51表示请求的联赛的league，51是中超
 */

/**
 * 射手榜
 * /data/goal_ranking/51
 * goal_ranking
 * 51同上
 */

/**
 * 助攻榜
 * /data/assist_ranking/51
 * assist_ranking
 * 51同上
 */


/**
 * 赛程榜
 * /data/schedule/?round_id=39713&gameweek=30
 * 需要有round_id
 * gameweek
 */