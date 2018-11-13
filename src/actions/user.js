/**
 * User Actions
 */

import { AppAPI, } from '../global/utils';

/**
  * Get My User Data
  */
const loginUser = (email, password) => {
    return AppAPI.login.post(false, {}, { personal_data: { email }, password })
        .then(response => Promise.resolve(response))
        .catch(err => Promise.reject(err));
};

/**
  * Create Account Codes
  * -- Campaign (array of integers )
  * -- Conference (string) (not required)
  * -- Division / Tier (string) (not required)
  * -- Number of Seats (integer)
  * -- Organization/Affiliate Name (string)
  * -- Persona (array of integers )
  */
const createAccountCodes = (authorization, campaigns, conference, division, seats, name, personas) => {
    let bodyObj = { campaigns, seats, name, personas };
    bodyObj.campaigns = campaigns.split(',');
    bodyObj.personas = personas.split(',');
    if(conference.length > 0) {
        bodyObj.conference = conference;
    }
    if(division.length > 0) {
        bodyObj.division = division;
    }
    return AppAPI.account.post(false, {Authorization: authorization.jwt}, bodyObj)
        .then(response => {
            let accountId = response.account.id;
            return Promise.resolve(getAccounts({Authorization: authorization.jwt}, accountId));
        })
        .catch(err => Promise.reject(err));
};

/**
  * Get Account Codes Details
  */
const getAccounts = (header, account_id) => {
    return AppAPI.get_account.get({account_id}, header)
        .then(response => Promise.resolve(response))
        .catch(err => Promise.reject(err));
};

/**
  * Get Account Code Details
  */
const getAccountCodeDetails = (account_code) => {
    return AppAPI.get_account_code.get({account_code})
        .then(response => Promise.resolve(response))
        .catch(err => Promise.reject(err));
};

/**
  * Authorize User
  * - will get new token
  */
const authorizeUser = (authorization, user, userCreds) => {
    let session_token = authorization.session_token;
    let userId = user.id;
    return AppAPI.authorize.post({ userId }, { session_token })
        .then(response => Promise.resolve(response))
        .catch(err => Promise.reject(err));
};

export default {
    authorizeUser,
    createAccountCodes,
    getAccountCodeDetails,
    getAccounts,
    loginUser,
};
