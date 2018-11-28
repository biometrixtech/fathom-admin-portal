// import third-party libraries
import moment from 'moment';

// import constants
import { ErrorMessages, } from '../../constants';

const utils = {

    isEmailValid(email) {
        /*eslint no-useless-escape: 0*/
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
    },

    isPasswordValid(password) {
        // Password Validation
        // - 8-16 characters
        // - Must include uppercase letter, lowercase letter, and a number
        const numbersRegex = /[0-9]/g;
        const upperCaseLettersRegex = /[A-Z]/g;
        const lowerCaseLettersRegex = /[a-z]/g;
        if(
            !password ||
            password.length < 8 ||
            password.length > 16 ||
            !numbersRegex.test(password) ||
            !upperCaseLettersRegex.test(password) ||
            !lowerCaseLettersRegex.test(password)
        ) {
            return false;
        }
        return true;
    },

    isAdminEmail(email) {
        // checking if email addresses are admin emails
        // NOTE: this will later be replaced with user.role authentication
        if(
            /amina[+]mvp@fathomai.com/g.test(email) ||
            /chrisp[+]mvp@fathomai.com/g.test(email) ||
            /chrisp[+]droidtest@fathomai.com/g.test(email) ||
            /chrisp[+]test3@fathomai.com/g.test(email) ||
            /dipesh[+]mvp@fathomai.com/g.test(email) ||
            /gabby[+]mvp@fathomai.com/g.test(email) ||
            /ivonna[+]mvp@fathomai.com/g.test(email) ||
            /mazen[+]mvp@fathomai.com/g.test(email) ||
            /melissa[+]mvp@fathomai.com/g.test(email) ||
            /paul[+]mvp@fathomai.com/g.test(email) ||
            /dipesh@fathomai.com/g.test(email) ||
            /mazen@fathomai.com/g.test(email) ||
            /sean[+]mvp@fathomai.com/g.test(email)
        ) {
            return true;
        }
        return false;
    },

    isLoginFormValid(email, password) {
        let errorMsg = '';
        let isValid = true;
        if(!this.isEmailValid(email) || !this.isAdminEmail(email)) {
            errorMsg = ErrorMessages.invalidEmail;
            isValid = false;
        } else if(!this.isPasswordValid(password)) {
            errorMsg = ErrorMessages.invalidPassword;
            isValid = false;
        }
        return {
            errorMsg,
            isValid,
        }
    },

    isAccountCodesFormValid(campaign, coach_seats, conference, division_tier, number_of_seats, organization_name, persona) {
        let errorMsg = '';
        let isValid = true;
        if(
            campaign.length === 0 ||
            coach_seats.length === 0 ||
            number_of_seats.length === 0 ||
            organization_name.length === 0 ||
            persona.length === 0
        ) {
            errorMsg = ErrorMessages.invalidAccountCodesForm;
            isValid = false;
        }
        return {
            errorMsg,
            isValid,
        }
    },

    isAuthorized(userReducer) {
        if(
            userReducer &&
            userReducer.authorization &&
            userReducer.authorization.jwt &&
            moment().toISOString() <= moment(userReducer.authorization.expires).toISOString() &&
            userReducer.user &&
            userReducer.user.id
        ) {
            return true;
        }
        return false;
    },

}

export default utils;
