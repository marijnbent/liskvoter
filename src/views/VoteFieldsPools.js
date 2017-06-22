import {View} from 'backbone';
import _ from 'underscore';

/**
 * Object representing the pools in the VoteFields
 *
 * @constructor
 */

const VoteFieldsPools = View.extend({
    templateVotes: '',
    templateError: '',

    events: {
        'click button': 'submitHandler'
    },

    initialize: function ()
    {
        //Set templates to use later on
        this.templatePools = _.template(this.$('#template-pools').html());
        this.templatePoolsError = _.template(this.$('#template-pools-error').html());

        this.loadPools();
    },

    /**
     * Wrapper function to load the pools through the collection
     */
    loadPools: function ()
    {
        this.collection.fetch({
            success: (collection) => this.loadPoolsSuccessHandler(collection),
            error: (collection, response) => this.loadPoolsErrorHandler(collection, response)
        });
    },

    /**
     * Submit handler for pools functionality
     */
    submitHandler: function(e) {
        e.preventDefault();

        let selectDOM = document.getElementById('pools');
        let pool = selectDOM.options[selectDOM.selectedIndex].value;
        pool = pool.split(',');

        let textarea = document.getElementById('vote-fields-votes');
        let string = '';
        
        _.each(pool, (delegate) => {
            string = string + delegate + '\n';
        });
        
        textarea.value = string;
    },

    /**
     * Success Handler will add HTML of delegates to this $el
     *
     * @param collection
     */
    loadPoolsSuccessHandler: function (collection)
    {
        this.$el.html(this.templatePools({pools: collection.models}));
    },

    /**
     * On error, show error message in this $el
     *
     * @param collection
     * @param response
     */
    loadPoolsErrorHandler: function (collection, response)
    {
        this.$el.html(this.templatePoolsError({message: response.responseJSON.error}));
    }
});

export default VoteFieldsPools;
