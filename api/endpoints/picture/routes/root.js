const router = require('express').Router();

const { debug } = require('../../../../dev');

/**
 * controller that interacts with the users table in database
 */
const userCTR = require('../../../users/controller');
const photoCTR = require('../../../photos/controller');
/**
 * general helper functions for all api endpoints
 */
const validate = require('../../../helpers/validate/index');
const sanitize = require('../../../helpers/sanitize');
const authenticate = require('../../../helpers/authenticate');
// const transform = require('../../../photos/transform');
// const r = require('../../../helpers/responses');

module.exports = router;
