import {Model} from 'backbone';

/**
 * Model for every vote in the collection
 *
 * @constructor
 */
const Vote = Model.extend({
    secret: '',
    hasSecondSecret: false,
    secondSecret: '',
    delegates: [],
    url: 'https://testnet.lisk.io/api/accounts/delegates',

    //Use PUT instead of POST
    isNew: function() {
        return false;
    }

});

export default Vote;
