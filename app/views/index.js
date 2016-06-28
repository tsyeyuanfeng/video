import React from 'react';
import Icon from 'react-fa';

import VideoList from '../components/VideoList';
import Player from '../components/Player';
import Toast from '../components/Toast';

import VideoAction from '../actions/Video';

import VideoStore from '../stores/Video';
import ErrorStore from '../stores/Error';

import './styles/main.less';

export default class index extends React.Component {
    constructor() {
        super();

        this.state = {
            error: '',

            loading: true,

            page: 0,

            totalPage: 0,

            size: 10,

            videoList: [],

            isPlayerVisible: false,

            playerUrl: 'http://www.w3school.com.cn/i/movie.mp4',

            pageEnd: false
        }
    }

    componentDidMount() {
        this.unsubscribeVideoStore    = VideoStore.listen(this.onVideoStoreChange.bind(this));
        this.unsubscribeErrorStore     = ErrorStore.listen(this.onErrorStoreChange.bind(this));

        this.fetchVideoList(1, this.state.size);
    }

    componentWillUnmount() {
        this.unsubscribeVideoStore();
        this.unsubscribeErrorStore();
    }

    fetchVideoList (page, size) {
        VideoAction.getVideoList(page, size);
        this.setState({loading: true});
    }

    onVideoStoreChange(data) {
        console.log(data);
        var videoList = data.videoList;
        var meta      = data.meta;

        if (!videoList || videoList.length <= 0) {//提示错误
            this.setState({loading: false, pageEnd: true}, function () {
            });
        }
        else {
            this.setState({loading: false, videoList: this.state.videoList.concat(videoList), page: parseInt(meta.page)});
        }
    }

    onErrorStoreChange(error) {
        console.log(error);
        if (this.state.videoList.length > 0) {
            this.setState({loading: false}, function () {
                this.refs.toast.show(error.message);
            });
        }
        else
            this.setState({error: error.message, loading: false});
    }

    onSelect(video) {
        this.setState({playerUrl: video.url, isPlayerVisible: true});
    }

    onCancel() {
        this.setState({
            isPlayerVisible: false,
            playerUrl: ''
        });
    }

    loadMore() {
        this.fetchVideoList(parseInt(this.state.page) + 1, this.state.size);
    }

    render() {

        if(this.state.error) {
            var mask = (
                <div className="mask">
                    <div className="msg">{this.state.error}</div>
                </div>
            );
        }
        else if(this.state.loading && this.state.videoList.length <= 0) {
            var mask = (
                <div className="mask">
                    <div className="icon-loading">
                        <Icon spin name="gear" />
                    </div>
                </div>
            );
        }
        else if(!this.state.videoList || this.state.videoList.length <= 0) {
            var mask = (
                <div className="mask">
                    <div className="msg">没有视频数据</div>
                </div>
            );
        }

        return (
            <div className="index-page">
                <header className="header">健康卫星传播网</header>
                <VideoList videoList={this.state.videoList} onSelect={this.onSelect.bind(this)}/>
                
                <Player
                    visible={this.state.isPlayerVisible}
                    url={this.state.playerUrl}
                    onCancel={this.onCancel.bind(this)} />

                <Toast ref="toast"/>

                {
                    !this.state.pageEnd &&
                    <button className="btn-load" onClick={this.loadMore.bind(this)}>
                        {this.state.loading ? '加载中...' : '加载更多'}
                    </button>
                }

                {mask}
            </div>
        );
    }
}
