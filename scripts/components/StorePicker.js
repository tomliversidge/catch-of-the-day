import React from 'react';
import h from '../helpers';
import {History} from 'react-router';

var StorePicker = React.createClass({
    mixins: [History],

    goToStore: function (event) {
        event.preventDefault();
        var storeId = this.refs.storeId.value;
        this.history.pushState(null, '/store/' + storeId)
    },

    render: function () {
        return (
            <form className="store-selector"
                  onSubmit={this.goToStore}>
                <h2>Please Enter A Store</h2>
                <input type="text"
                       defaultValue={h.getFunName()}
                       ref="storeId"
                       required/>
                <input type="Submit"/>
            </form>
        )
    }
});

export default StorePicker;