var React = require('react');
var ReactDOM = require('react-dom')

var App = React.createClass({
    render: function () {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header/>
                </div>
                <Order/>
                <Inventory/>
            </div>
        )
    }
});

var Header = React.createClass({
    render: function(){
        return (
            <p>Order</p>
        )
    }
});

var Order = React.createClass({
    render: function(){
        return (
            <p>Header</p>
        )
    }
});

var Inventory = React.createClass({
    render: function(){
        return (
            <p>Inventory</p>
        )
    }
});
var StorePicker = React.createClass({

    render: function () {

        return (
            <form className="store-selector">
                <h2>Please enter a store</h2>
                <input type="text" ref="storeId" required/>
                <input type="submit"/>
            </form>
        )
    }
});

ReactDOM.render(<App/>, document.getElementById('main'))
