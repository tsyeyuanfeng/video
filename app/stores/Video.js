import Reflux from 'reflux';
import VideoAction from '../actions/Video';

var store = Reflux.createStore({
    listenables: [VideoAction],

    videoList: null,

    onGetVideoListCompleted: function(data) {
        this.videoList = data;
        this.trigger(this.videoList);
    }
});

export default store;