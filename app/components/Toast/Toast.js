import React from 'react';
import ReactDOM from 'react-dom';
import Icon from 'react-fa';
import './styles/toast.less';

var isMounted = (component) => {
    try {
        ReactDOM.findDOMNode(component);
        return true;
    } catch (e) {
        return false;
    }
};

export default class Toast extends React.Component {

    constructor() {
        super();
        this.state = {
            visible: false,
            message: '',
            icon: <Icon name="close" />,
            duration: 1200,
            callback: null
        }
    }

    show(message, icon, duration, callback) {
        var state = this.state;
        state.visible  = true;
        state.message  = message;
        state.icon     = icon ? icon : state.icon;
        state.duration = duration ? duration : state.duration;
        state.callback = callback ? callback : state.callback;
        this.setState(state);
    }

    hide() {
        clearTimeout(this.timeout);
        this.setState({visible: false});
    }

    render() {

        if(this.state.visible) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(function() {
                if(isMounted(this)) {
                    this.setState({visible: false}, function() {
                        if(this.state.callback) {
                            this.state.callback();
                        }
                    });
                }
            }.bind(this), this.state.duration ? this.state.duration : 1200);
        }


        return (
            <div className={"toast" + (this.state.visible ? "" : " hidden")} style={this.props.style}>
                <p className="icon">{this.state.icon}</p>
                <p className="msg">
                    <span>{this.state.message}</span>
                </p>
            </div>
        );
    }
}