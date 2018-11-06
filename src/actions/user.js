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

export default {
    createAccountCodes,
    getAccounts,
    loginUser,
};
