/**
 * This is a utility to handle default API requests with the Yote server
 */

// Consts and Libs
import { APIConfig, ErrorMessages, } from '../../constants';

// import third-party libraries
import _ from 'lodash';
import fetch from 'isomorphic-fetch';

// Config
const ENDPOINTS = APIConfig.endpoints;
const API_MAP = ['get', 'post', 'patch', 'put', 'delete'];
const baseUrl = APIConfig.hostname;
let baseHeaders = { 'Content-Type': 'application/json' };

/* Helper Functions ==================================================================== */

/**
  * Sends requests to the API
  */
function handleError(err) {
    let error = '';
    if (typeof err === 'string') {
        error = err;
    } else if (err && err.error) {
        error = err.error;
    } else if (err && err.message) {
        error = err.message;
    }
    if (!error) { error = ErrorMessages.default; }
    return error;
}

/**
  * Sends requests to the API
  */
// function fetcher(method, inputEndpoint, inputParams, body, api_enum) {
function fetcher(method, route, params, body, headers = {}) {
    let newHeaders = { ...baseHeaders, ...headers };
    if(params && Object.keys(params).length > 0) {
        _.map(params, (val, key) => {
            if(route.includes(`{${key}}`)) {
                route = route.replace(`{${key}}`, val);
            }
        });
    }
    let newUrl = baseUrl + route;
    return new Promise(async (resolve, reject) => {
        return fetch(newUrl, {
            headers: newHeaders,
            method,
            credentials: 'same-origin',
            body: JSON.stringify(body)
        })
        .then(response => {
            if(response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                let error = {};
                error.response = response;
                throw error;
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(handleError(err.statusText)));
    });
}

/* Create the API Export ==================================================================== */
/**
  * Build services from Endpoints
  * - So we can call AppAPI.users.get() for example
  */
const AppAPI = {
    handleError,
};

ENDPOINTS.forEach((endpoint, key) => {
    AppAPI[key] = {};
    API_MAP.forEach(apiType => {
        AppAPI[key][apiType] = (params, payload, headers) => fetcher(apiType.toUpperCase(), endpoint, params, payload, headers);
    });
});

/* Export ==================================================================== */
export default AppAPI;
