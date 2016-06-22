import Reflux from 'reflux';
import agent from 'superagent';
import promise from 'promise';
import agentPromise from 'superagent-promise';
import ErrorAction from './Error';

var request = agentPromise(agent, promise);

var actions = Reflux.createActions({
    getVideoList: {children: ["completed", "failed"]}
});

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