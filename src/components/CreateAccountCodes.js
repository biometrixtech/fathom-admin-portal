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

class CreateAccountCodes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code:        '',
            error:       '',
            form_inputs: {
                campaign:          '', // (array of integers )
                conference:        '', // (string) (not required)
                division_tier:     '', // (string) (not required)
                number_of_seats:   '', // integer
                organization_name: '', // string
                persona:           '', // (array of integers )
            },
            loading: false,
        };
        this.defaultFormInputs = {
            campaign:          '', // (array of integers )
            conference:        '', // (string) (not required)
            division_tier:     '', // (string) (not required)
            number_of_seats:   '', // integer
            organization_name: '', // string
            persona:           '', // (array of integers )
        };
    }

    componentDidMount = () => {
        const { userReducer, } = this.props;
        if(!AppUtils.isAuthorized(userReducer) || userReducer.user) {
            return this.props.history.push('/');
        }
    }

    _handleFormChange = e => {
        let newFormInputs = _.update(this.state.form_inputs, e.target.name, () => e.target.value);
        this.setState({ form_inputs: newFormInputs, });
    }

    _handleLoginFormSubmit = () => {
        const { campaign, conference, division_tier, number_of_seats, organization_name, persona, } = this.state.form_inputs;
        this.setState({ code: '', loading: true, });
        let formValidation = AppUtils.isAccountCodesFormValid(campaign, conference, division_tier, number_of_seats, organization_name, persona);
        if(formValidation.isValid) {
            UserActions.createAccountCodes(this.props.userReducer.authorization, campaign, conference, division_tier, number_of_seats, organization_name, persona)
                .then(res => {
                    this.setState(
                        { code: res.account.code, form_inputs: this.defaultFormInputs, loading: false, },
                        () => this.props.history.push(`/account_code/${res.account.code}`)
                    );
                })
                .catch(err => {
                    this.setState({ error: err, loading: false, });
                });
        } else {
            this.setState({ error: formValidation.errorMsg, loading: false, });
        }
    }

    render = () => {
        const { campaign, conference, division_tier, number_of_seats, organization_name, persona, } = this.state.form_inputs;
        return (
            <div className={'App'}>
                <header className={'App-header'}>
                    <img
                        alt={'logo'}
                        className={'App-logo'}
                        src={logo}
                    />
                    <h2 className={'oswald-normal'}>{'CREATE ACCOUNT CODES'}</h2>
                    { this.state.error && this.state.error !== '' ?
                        <div className={'error-wrapper'}>
                            <p className={'error-text oswald-normal'}>{this.state.error.toUpperCase()}</p>
                        </div>
                        :
                        null
                    }
                    { this.state.code && this.state.code !== '' ?
                        <div className={'code-wrapper'}>
                            <p className={'code-text oswald-normal'}>{this.state.code.toUpperCase()}</p>
                        </div>
                        :
                        null
                    }
                    <Form className={'fathom-form'}>
                        <Form.Field>
                            <label>{'organization name'}<span>{'*'}</span></label>
                            <input
                                autoComplete={'off'}
                                className={'fathom-input roboto-normal'}
                                onChange={this._handleFormChange}
                                name={'organization_name'}
                                placeholder={'organization name'}
                                required={true}
                                type={'text'}
                                value={organization_name}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>{'persona'}<span>{'*'}</span></label>
                            <input
                                autoComplete={'off'}
                                className={'fathom-input roboto-normal'}
                                onChange={this._handleFormChange}
                                name={'persona'}
                                placeholder={'persona'}
                                required={true}
                                type={'text'}
                                value={persona}
                            />
                            <small className={'helper'}>{'comma separated string. i.e. 0,1,2,3'}</small>
                        </Form.Field>
                        <Form.Field>
                            <label>{'number of seats'}<span>{'*'}</span></label>
                            <input
                                autoComplete={'off'}
                                className={'fathom-input roboto-normal'}
                                onChange={this._handleFormChange}
                                name={'number_of_seats'}
                                placeholder={'number of seats'}
                                required={true}
                                type={'number'}
                                value={number_of_seats}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>{'campaign'}<span>{'*'}</span></label>
                            <input
                                autoComplete={'off'}
                                className={'fathom-input roboto-normal'}
                                onChange={this._handleFormChange}
                                name={'campaign'}
                                placeholder={'campaign'}
                                required={true}
                                type={'text'}
                                value={campaign}
                            />
                            <small className={'helper'}>{'comma separated numbers. i.e. 0,1,2,3'}</small>
                        </Form.Field>
                        <Form.Field>
                            <label>{'division / tier'}</label>
                            <input
                                autoComplete={'off'}
                                className={'fathom-input roboto-normal'}
                                onChange={this._handleFormChange}
                                name={'division_tier'}
                                placeholder={'division / tier'}
                                required={false}
                                type={'text'}
                                value={division_tier}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>{'conference'}</label>
                            <input
                                autoComplete={'off'}
                                className={'fathom-input roboto-normal'}
                                onChange={this._handleFormChange}
                                name={'conference'}
                                placeholder={'conference'}
                                required={false}
                                type={'text'}
                                value={conference}
                            />
                        </Form.Field>
                        <br />
                        <Button
                            className={'fathom-button roboto-normal'}
                            disabled={this.state.loading}
                            loading={this.state.loading}
                            onClick={() => this._handleLoginFormSubmit()}
                            type={'button'}
                        >
                            {'Submit'}
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

export default connect(mapStateToProps)(CreateAccountCodes);
