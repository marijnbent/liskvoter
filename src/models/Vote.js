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
    url: 'http://45.76.35.175:7000/api/accounts/delegates',
    isNew: function() {
        return false;
    }

});

export default Vote;
