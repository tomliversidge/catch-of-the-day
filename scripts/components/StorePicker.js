import React from 'react';
import h from '../helpers';
import {History} from 'react-router';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';

@autobind
class StorePicker extends React.Component {

    goToStore(event) {
        event.preventDefault();
        var storeId = this.refs.storeId.value;
        this.history.pushState(null, '/store/' + storeId)
    }

    render() {
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
}

reactMixin.onClass(StorePicker, History);

export default StorePicker;