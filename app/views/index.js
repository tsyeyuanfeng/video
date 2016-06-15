import React from 'react';
import Icon from 'react-fa';
import request from 'superagent';

import VideoList from '../components/VideoList';

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

            videoList: null
        }
    }

    componentWillMount() {
        this.setState({loading: false, videoList: [
            {
                thumb: 'http://i0.letvimg.com/lc03_lejunew/201511/15/11/57/cug218gzembv-115729.jpg',
                title: '人大李嘉欣人大李嘉欣人大李嘉欣'
            },

            {
                thumb: 'http://i0.letvimg.com/lc03_lejunew/201511/15/11/57/cug218gzembv-115729.jpg',
                title: '人大李嘉欣人大李嘉欣人大李嘉欣'
            },

            {
                thumb: 'http://i0.letvimg.com/lc03_lejunew/201511/15/11/57/cug218gzembv-115729.jpg',
                title: '人大李嘉欣人大李嘉欣人大李嘉欣'
            },

            {
                thumb: 'http://i0.letvimg.com/lc03_lejunew/201511/15/11/57/cug218gzembv-115729.jpg',
                title: '人大李嘉欣人大李嘉欣人大李嘉欣'
            },
            {
                thumb: 'http://i0.letvimg.com/lc03_lejunew/201511/15/11/57/cug218gzembv-115729.jpg',
                title: '人大李嘉欣人大李嘉欣人大李嘉欣'
            },

            {
                thumb: 'http://i0.letvimg.com/lc03_lejunew/201511/15/11/57/cug218gzembv-115729.jpg',
                title: '人大李嘉欣人大李嘉欣人大李嘉欣'
            },

            {
                thumb: 'http://i0.letvimg.com/lc03_lejunew/201511/15/11/57/cug218gzembv-115729.jpg',
                title: '人大李嘉欣人大李嘉欣人大李嘉欣'
            },

            {
                thumb: 'http://i0.letvimg.com/lc03_lejunew/201511/15/11/57/cug218gzembv-115729.jpg',
                title: '人大李嘉欣人大李嘉欣人大李嘉欣'
            }
        ]}, function() {

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
                <VideoList videoList={this.state.videoList}/>

                {this.state.page < this.state.totalPage ? <button className="btn-load">{this.state.loading ? '加载中...' : '加载更多'}</button> : ''}
                {mask}
            </div>
        );
    }
}
