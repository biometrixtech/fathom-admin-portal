// import React specific components
import React, { Component } from 'react';
import { connect } from 'react-redux';

// import assets
import logo from '../assets/logo.png';
import '../styles/App.css';

// import third-party libraries
import Loader from 'react-loader-spinner';

// import global components
import { AppUtils, } from '../global/utils';
import { UserActions, } from '../actions';

class SingleAccountCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account:     false,
            error:       '',
        };
    }

    componentDidMount = () => {
        const { history, match, userReducer, } = this.props;
        if(!AppUtils.isAuthorized(userReducer)) {
            history.push('/account_code');
        }
        UserActions.getAccountCodeDetails(match.params.account_code.toUpperCase())
            .then(res => this.setState({ account: res.account, }))
            .catch(err => this.setState({ error: err, }));
    }

    render = () => {
        console.log(this.state.account);
        const { account, error, } = this.state;
        return (
            <div className={'App'}>
                <header className={'App-header'}>
                    <img
                        alt={'logo'}
                        className={'App-logo'}
                        src={logo}
                    />
                    <h2 className={'oswald-normal'}>{'SINGLE ACCOUNT CODE'}</h2>
                    { error !== '' ?
                        <div className={'error-wrapper'}>
                            <p className={'error-text oswald-normal'}>{error.toUpperCase()}</p>
                        </div>
                        :
                        null
                    }
                    { account ?
                        <div className={'account-code-wrapper'}>
                            <h3>{`Account Code: ${account.code}`}</h3>
                            <p>{`Organization Name: ${account.name}`}</p>
                            <p>{`Persona: ${account.personas}`}</p>
                            <p>{`Number of Seats: ${account.seats}`}</p>
                            <p>{`Campaign: ${account.campaigns}`}</p>
                            { account.division ?
                                <p>{`Division/Tier: ${account.division}`}</p>
                                :
                                null
                            }
                            { account.conference ?
                                <p>{`Conference: ${account.conference}`}</p>
                                :
                                null
                            }
                        </div>
                        :
                        <Loader
                            color={'#ebba2d'}
                            height={100}
                            type={'TailSpin'}
                            width={100}
                        />
                    }
                </header>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state,
});

export default connect(mapStateToProps)(SingleAccountCode);
