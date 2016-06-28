import React from 'react';

import './styles/main.less';

export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            url: props.url
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            visible: props.visible,
            url: props.url
        });
    }


    onCancel(event) {
        event = event || window.event;
        if (event.target.tagName == 'VIDEO')
            return;

        this.props.onCancel && this.props.onCancel();
    }

    render() {

        var video = this.state.visible ? <video src={this.state.url} controls autoPlay /> : '';

        return (
            <div
                className={this.state.visible ? "player" : "player hidden"}
                onClick={this.onCancel.bind(this)}>
                {video}
            </div>
        );
    }
}