import {Model} from 'backbone';

/**
 * Model for the VoteDelegate which fetches it's info from the server
 *
 * @constructor
 */
const DelegateApiCall = '/api/delegates/get?username=';

const Delegate = Model.extend({
    url: function() {
        return 'http://45.76.35.175:7000' + DelegateApiCall + this.id;
    },
    parse: function(response){
        return response.delegate;
    }
});

export default Delegate;
