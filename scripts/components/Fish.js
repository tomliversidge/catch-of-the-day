import React from 'react';
import h from '../helpers';

var Fish = React.createClass({
    onButtonClick: function () {
        this.props.addToOrder(this.props.index);
    },
    render: function () {
        var details = this.props.details;
        var isAvailable = (details.status === 'available');
        var buttonText = (isAvailable ? 'Add to Order' : 'Sold Out');
        return (
            <li className="menu-fish">
                <img src={details.image} alt={details.name}></img>
                <h3 className="fish-name">
                    {details.name}
                    <span className="price">{h.formatPrice(details.price)}</span>
                </h3>
                <p>{details.desc}</p>
                <button
                    onClick={this.onButtonClick}
                    disabled={!isAvailable}>{buttonText}</button>
            </li>
        )
    },
    propTypes: {
        addToOrder: React.PropTypes.func.isRequired,
        details: React.PropTypes.object.isRequired
    }
});

export default Fish;