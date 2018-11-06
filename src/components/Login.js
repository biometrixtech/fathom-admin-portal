// import React specific components
import React, { Component } from 'react';
import { connect } from 'react-redux';

// import assets
import logo from '../assets/logo.png';
import '../styles/App.css';

// import third-party libraries
import { Button, Form, } from 'semantic-ui-react';
import _ from 'lodash';

// import global components
import { AppUtils, } from '../global/utils';
import { UserActions, } from '../actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error:       '',
            form_inputs: {
                email:    '',
                password: '',
            },
            loading: false,
        };
        this.defaultFormInputs = {
            email:    '',
            password: '',
        };
    }

    componentDidMount = () => {
        if(this.props.userReducer && this.props.userReducer.authorization && this.props.userReducer.user) {
            this.props.history.push('/account_codes');
        }
    }

    _handleFormChange = e => {
        let newFormInputs = _.update(this.state.form_inputs, e.target.name, () => e.target.value);
        this.setState({ form_inputs: newFormInputs, });
    }

    _handleLoginFormSubmit = () => {
        const { email, password, } = this.state.form_inputs;
        this.setState({ loading: true, });
        let formValidation = AppUtils.isLoginFormValid(email, password);
        if(formValidation.isValid) {
            UserActions.loginUser(email, password)
                .then(res => {
                    this.props.dispatch({
                        type: 'SET_USER',
                        data: res,
                    })
                    this.setState({ loading: false, });
                    this.props.history.push('/account_codes');
                })
                .catch(err => {
                    this.setState({ loading: false, });
                    this.setState({ error: err.message, });
                });
        } else {
            this.setState({ error: formValidation.errorMsg, loading: false, });
        }
    }

    render = () => {
        let { email, password, } = this.state.form_inputs;
        return (
            <div className={'App'}>
                <header className={'App-header'}>
                    <img
                        alt={'logo'}
                        className={'App-logo'}
                        src={logo}
                    />
                    <h2 className={'oswald-normal'}>{'LOG IN'}</h2>
                    { this.state.error !== '' ?
                        <div className={'error-wrapper'}>
                            <p className={'error-text oswald-normal'}>{this.state.error.toUpperCase()}</p>
                        </div>
                        :
                        <div />
                    }
                    <Form className={'fathom-form'}>
                        <Form.Field>
                            <label>{'email'}<span>{'*'}</span></label>
                            <input
                                autoComplete={'email'}
                                className={'fathom-input roboto-normal'}
                                onChange={this._handleFormChange}
                                name={'email'}
                                placeholder={'email'}
                                required={true}
                                type={'email'}
                                value={email}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>{'password'}<span>{'*'}</span></label>
                            <input
                                autoComplete={'current-password'}
                                className={'fathom-input roboto-normal'}
                                onChange={this._handleFormChange}
                                name={'password'}
                                placeholder={'password'}
                                required={true}
                                type={'password'}
                                value={password}
                            />
                        </Form.Field>
                        <br />
                        <Button
                            className={'fathom-button roboto-normal'}
                            disabled={this.state.loading}
                            loading={this.state.loading}
                            onClick={this._handleLoginFormSubmit}
                            type={'button'}
                        >
                            {'Log In'}
                        </Button>
                    </Form>
                </header>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state,
});

export default connect(mapStateToProps)(Login);
