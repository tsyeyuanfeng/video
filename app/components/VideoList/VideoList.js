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
        var videoList = this.props.videoList.map((video, index) => {
            return <div className="video-wrapper"><Video key={'video-' + index} video={video} onSelect={this.onSelect.bind(this)} /></div>;
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