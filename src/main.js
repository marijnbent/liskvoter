import _ from 'underscore';
import {Events} from 'backbone';
import Delegates from './collections/Delegates';
import Pools from './collections/Pools';
import AddressLogin from './views/AddressLogin';
import VotesOverview from './views/VotesOverview';
import VoteFields from './views/VoteFields';
import VoteFieldsPools from './views/VoteFieldsPools';

(function ()
{
    let setGlobalVariables = function ()
    {
        window.App = {};
        App.events = _.clone(Events);
    };

    /**
     * Run after dom is ready
     */
    let init = function ()
    {
        setGlobalVariables();

        let delegatesCollection = new Delegates();
        let poolsCollection = new Pools();

        //Initialize views
        new AddressLogin({el: "#address-login"});
        new VotesOverview({el: "#votes-overview", collection: delegatesCollection});
        new VoteFields({el: "#vote-fields"});
        new VoteFieldsPools({el: "#vote-fields-pools", collection: poolsCollection});

        Backbone.history.start({pushState: true, root: '/liskvoter/'});
    };

    window.addEventListener('load', init);
})();
