import React from 'react';

import './styles/main.less';

export default class Video extends React.Component {
    constructor() {
        super();
    }

    onSelect(video) {
        this.props.onSelect && this.props.onSelect(video);
    }

    render() {
        return (
            <div className="video" onClick={this.onSelect.bind(this, this.props.video)}>
                <img className="thumb" src={this.props.video.thumb}/>
                <div className="content">
                    <div className="title">{this.props.video.title}</div>
                    <div className="meta">
                        <span>时长: {this.props.video.duration}分钟</span>
                    </div>
                </div>
            </div>
        );
    }
}

Video.defaultProps = {
    video: {
        thumb: 'http://i0.letvimg.com/lc03_lejunew/201511/15/11/57/cug218gzembv-115729.jpg',
        title: '人大李嘉欣人大李嘉欣人大李嘉欣'
    }
};
