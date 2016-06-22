import React from 'react';

import Video from '../Video';

import './styles/main.less';

export default class VideoList extends React.Component {
    constructor() {
        super();
    }

    onSelect(video) {
        this.props.onSelect && this.props.onSelect(video);
    }

    render() {
        var videoList;
        if (this.props.videoList && this.props.videoList.length > 0)
            videoList = this.props.videoList.map((video, index) => {
                return <div key={'video-' + index} className="video-wrapper"><Video video={video} onSelect={this.onSelect.bind(this)} /></div>;
            });

        return (
            <div className="video-list">
                {videoList}
            </div>
        );
    }
}

VideoList.defaultProps = {
    videoList: [
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
    ]
};