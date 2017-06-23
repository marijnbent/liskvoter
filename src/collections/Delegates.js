import {Collection} from 'backbone';
import Delegate from '../models/Delegate';

/**
 * Collection of the delegates
 *
 * @constructor
 */
const DelegatesApiCall = '/api/accounts/delegates?address=';

const Delegates = Collection.extend({
    model: Delegate,
    baseUrl: 'https://testnet.lisk.io' + DelegatesApiCall,
    parse: function(response){
        return response.delegates;
    },
    setApiUrl: function(address) {
        this.url = this.baseUrl + address;
    }
    
});

export default Delegates;
