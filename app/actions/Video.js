import Reflux from 'reflux';
import agent from 'superagent';
import promise from 'promise';
import agentPromise from 'superagent-promise';
import ErrorAction from './Error';

var request = agentPromise(agent, promise);

var actions = Reflux.createActions({
    getVideoList: {children: ["completed", "failed"]}
});

var mock = {
    videoList: [
        {
            thumb: 'http://i0.letvimg.com/lc03_lejunew/201511/15/11/57/cug218gzembv-115729.jpg',
            title: '人大李嘉欣人大李嘉欣人大李嘉欣人大李嘉欣人大李嘉欣人大李嘉欣人大李嘉欣人大李嘉欣人大李嘉欣人大李嘉欣人大李嘉欣人大李嘉欣人大李嘉欣人大李嘉欣人大李嘉欣人大李嘉欣人大李嘉欣人大李嘉欣人大李嘉欣人大李嘉欣人大李嘉欣人大李嘉欣人大李嘉欣人大李嘉欣',
            duration: 10
        },

        {
            thumb: 'http://i0.letvimg.com/lc03_lejunew/201511/15/11/57/cug218gzembv-115729.jpg',
            title: '人大李嘉欣人大李嘉欣人大李嘉欣',
            duration: 10
        },

        {
            thumb: 'http://i0.letvimg.com/lc03_lejunew/201511/15/11/57/cug218gzembv-115729.jpg',
            title: '人大李嘉欣人大李嘉欣人大李嘉欣',
            duration: 10
        },

        {
            thumb: 'http://i0.letvimg.com/lc03_lejunew/201511/15/11/57/cug218gzembv-115729.jpg',
            title: '人大李嘉欣人大李嘉欣人大李嘉欣',
            duration: 10
        }
    ],
    meta: {
        page: 1
    }
};

/**
 * 获取K线数据
 * @param page Number
 * @param size Number
 */
actions.getVideoList.listen(function(page, size) {
    request
        .get('video.php')
        .query({page: page, size: size})
        .end()
        .then(
            (res)=>{
                console.log(res);
                var result = JSON.parse(res.text);
                console.log(result);
                if(result.status == 200) {
                    console.log(result.data);
                    this.completed(result.data);
                }
                else {
                    ErrorAction.customError(result.status, result.message);
                    this.failed(result);
                }
            },

            (err)=>{
                console.log(err.message);
                ErrorAction.connectionError('网络连接错误');
            }
        );
});

export default actions;