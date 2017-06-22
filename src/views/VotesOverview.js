import {View} from 'backbone';
import _ from 'underscore';

/**
 * Object which collects and show the votes by an user
 *
 * @constructor
 */
const VotesOverview = View.extend({
    templateVotes: '',
    templateError: '',

    initialize: function ()
    {
        //Set templates to use later on
        this.templateVotes = _.template(this.$('#template-votes').html());
        this.templateError = _.template(this.$('#template-error').html());

        App.events.on('getVotes', this.loadVotes, this);
    },

    /**
     * Wrapper function to load the votes through the collection when requested
     *
     * @param data
     */
    loadVotes: function (data)
    {
        this.collection.setApiUrl(data.address);
        this.collection.fetch({
            success: (collection) => this.loadDelegatesSuccessHandler(collection),
            error: (collection, response) => this.loadDelegatesErrorHandler(collection, response)
        });
    },

    /**
     * Success Handler will add HTML of delegates to this $el
     *
     * @param collection
     */
    loadDelegatesSuccessHandler: function (collection)
    {
        this.$el.html(this.templateVotes({delegates: collection.models}));
    },

    /**
     * On error, show error message in this $el
     *
     * @param collection
     * @param response
     */
    loadDelegatesErrorHandler: function (collection, response)
    {
        this.$el.html(this.templateError({message: response.responseJSON.error}));
    }
});

export default VotesOverview;
