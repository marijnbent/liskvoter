import {View} from 'backbone';
import VotesRouter from '../routers/VotesRouter';

/**
 * Object representing the AddressLogin element
 *
 * @constructor
 */
const AddressLogin = View.extend({
    router: null,

    events: {
        'submit': 'submitHandler'
    },

    initialize: function ()
    {
        //Initialize the matches router to activate navigation
        this.router = new VotesRouter();
    },

    /**
     * Click handler for form and navigate router
     *
     * @param e
     */
    submitHandler: function (e)
    {
        e.preventDefault();

        let address = document.getElementById('address-login-address');
        let url = 'votes/' + address.value;

        //Use trigger & replace to update URL and make the router listen to change
        this.router.navigate(url, {trigger: true, replace: true});
    }
});

export default AddressLogin;
