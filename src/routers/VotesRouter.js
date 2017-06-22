import {Router} from 'backbone';

/**
 * Router for the login
 *
 * @constructor
 */
const VotesRouter = Router.extend({
    routes: {
        'votes/:address': 'addressAction'
    },

    /**
     * Route callback, used to trigger global event
     *
     * @param address
     */
    addressAction: function (address)
    {
        App.events.trigger('getVotes', {
            address: address
        });
    }
});

export default VotesRouter;
