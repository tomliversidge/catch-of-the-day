import React from 'react';
import AddFishForm from './AddFishForm';
import autobind from 'autobind-decorator';
import Firebase from 'firebase';
const ref = new Firebase('https://blazing-torch-4071.firebaseio.com');

@autobind
class Inventory extends React.Component {

    constructor() {
        super();
        this.state = {
            uid: ''
        }
    }

    authenticate() {
        ref.authWithOAuthPopup('github', this.authHandler)
    }

    componentWillMount() {
        console.log('checking if logged in');
        var token = localStorage.getItem('token');
        if (token) {
            ref.authWithCustomToken(token, this.authHandler);
        }
    }

    logout() {
        ref.unauth();
        localStorage.removeItem('token');
        this.setState({
            uid: null
        });
    }

    authHandler(err, authData) {
        if (err) {
            console.err(err);
            return;
        }

        // save the login token in the browser
        localStorage.setItem('token', authData.token);

        const storeRef = ref.child(this.props.params.storeId);
        storeRef.on('value', (snapshot) => {
            var data = snapshot.val() || {};
            if (!data.owner) {
                storeRef.set({
                    owner: authData.uid
                })
            }

            this.setState({
                uid: authData.uid,
                owner: data.owner || authData.uid
            })
        })
    }

    renderLogin() {
        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store's inventory</p>
                <button className="github" onClick={this.authenticate}>Log in with GitHub</button>
            </nav>
        )
    }

    renderInventory(key) {
        return (
            <div className="fish-edit" key={key}>
                <input type="text" valueLink={this.props.linkState('fishes.'+key+'.name')}/>
                <input type="text" valueLink={this.props.linkState('fishes.'+key+'.price')}/>
                <select valueLink={this.props.linkState('fishes.' + key + '.status')}>
                    <option value="unavailable">Sold Out</option>
                    <option value="available">Fresh</option>
                </select>
                <textarea valueLink={this.props.linkState('fishes.'+key+'.desc')}>

                </textarea>
                <input type="text" valueLink={this.props.linkState('fishes.'+key+'.image')}/>
                <button onClick={this.props.removeFish.bind(null, key)}>Remove Fish</button>
            </div>
        )
    }

    render() {

        let logoutButton = <button onClick={this.logout}>Log Out</button>;

        if (!this.state.uid) {
            return (
                <div>
                    {this.renderLogin()}
                </div>
            )
        }

        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry, you do not own this store</p>
                    {logoutButton}
                </div>
            )
        }
        return (
            <div>
                <h2>Inventory</h2>
                {logoutButton}
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm {...this.props}/>
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>

            </div>
        )
    }
}

Inventory.propTypes = {
    loadSamples: React.PropTypes.func.isRequired,
    addFish: React.PropTypes.func.isRequired,
    removeFish: React.PropTypes.func.isRequired,
    linkState: React.PropTypes.func.isRequired,
    fishes: React.PropTypes.object.isRequired
};

export default Inventory;

