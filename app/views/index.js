import React from 'react';
import Icon from 'react-fa';
import request from 'superagent';

import VideoList from '../components/VideoList';
import Player from '../components/Player';

import './styles/main.less';

export default class index extends React.Component {
    constructor() {
        super();

        this.state = {
            error: '',

            loading: true,

            page: 1,

            totalPage: 0,

            size: 10,

            videoList: null,

            isPlayerVisible: false,

            playerUrl: 'http://www.w3school.com.cn/i/movie.mp4'
        }
    }

    componentWillMount() {

        request
            .get('videos')
            .query({page: this.state.page, size: this.state.size})
            .end((err, res)=>{
                if (err) {
                    console.log(err);
                    this.setState({loading: false, error: err});
                }
                else {
                    var result = res.body;
                    if (result.status == 200) {
                        var data = result.data;
                        this.setState({loading: false, videoList: data.videoList, });
                    }
                    else {
                        this.setState({loading: false, error: result.message});
                    }
                }
            });

        this.setState({loading: false, videoList: [
            {
                thumb: 'http://i0.letvimg.com/lc03_lejunew/201511/15/11/57/cug218gzembv-115729.jpg',
                title: '人大李嘉欣人大李嘉欣人大李嘉欣',
                url: 'http://www.w3school.com.cn/i/movie.mp4'
            },

            {
                thumb: 'http://i0.letvimg.com/lc03_lejunew/201511/15/11/57/cug218gzembv-115729.jpg',
                title: '人大李嘉欣人大李嘉欣人大李嘉欣',
                url: 'http://www.w3school.com.cn/i/movie.mp4'
            },

            {
                thumb: 'http://i0.letvimg.com/lc03_lejunew/201511/15/11/57/cug218gzembv-115729.jpg',
                title: '人大李嘉欣人大李嘉欣人大李嘉欣',
                url: 'http://www.w3school.com.cn/i/movie.mp4'
            },

            {
                thumb: 'http://i0.letvimg.com/lc03_lejunew/201511/15/11/57/cug218gzembv-115729.jpg',
                title: '人大李嘉欣人大李嘉欣人大李嘉欣',
                url: 'http://www.w3school.com.cn/i/movie.mp4'
            },
            {
                thumb: 'http://i0.letvimg.com/lc03_lejunew/201511/15/11/57/cug218gzembv-115729.jpg',
                title: '人大李嘉欣人大李嘉欣人大李嘉欣',
                url: 'http://www.w3school.com.cn/i/movie.mp4'
            },

            {
                thumb: 'http://i0.letvimg.com/lc03_lejunew/201511/15/11/57/cug218gzembv-115729.jpg',
                title: '人大李嘉欣人大李嘉欣人大李嘉欣',
                url: 'http://www.w3school.com.cn/i/movie.mp4'
            },

            {
                thumb: 'http://i0.letvimg.com/lc03_lejunew/201511/15/11/57/cug218gzembv-115729.jpg',
                title: '人大李嘉欣人大李嘉欣人大李嘉欣',
                url: 'http://www.w3school.com.cn/i/movie.mp4'
            },

            {
                thumb: 'http://i0.letvimg.com/lc03_lejunew/201511/15/11/57/cug218gzembv-115729.jpg',
                title: '人大李嘉欣人大李嘉欣人大李嘉欣',
                url: 'http://www.w3school.com.cn/i/movie.mp4'
            }
        ]}, function() {

        });
    }

    onSelect(video) {
        console.log(video);
        this.setState({playerUrl: video.url, isPlayerVisible: true});
    }

    onCancel() {
        console.log('asdf');
        this.setState({
            isPlayerVisible: false,
            playerUrl: ''
        });
    }

    render() {

        if(this.state.error) {
            var mask = (
                <div className="mask">
                    <div className="msg">{this.state.error}</div>
                </div>
            );
        }
        else if(this.state.loading) {
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
                    <div className="msg">抱歉, 没有读取到视频数据</div>
                </div>
            );
        }

        return (
            <div className="index-page">
                <VideoList videoList={this.state.videoList} onSelect={this.onSelect.bind(this)}/>
                
                <Player
                    visible={this.state.isPlayerVisible}
                    url={this.state.playerUrl}
                    onCancel={this.onCancel.bind(this)} />

                {this.state.page < this.state.totalPage ? <button className="btn-load">{this.state.loading ? '加载中...' : '加载更多'}</button> : ''}
                {mask}
            </div>
        );
    }
}
