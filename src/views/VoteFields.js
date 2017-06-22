import {View} from 'backbone';
import _ from 'underscore';
import Delegate from '../models/VoteDelegate';
import Vote from '../models/Vote';

/**
 * Object which allows users to vote.
 *
 * @constructor
 */

const VoteFields = View.extend({

    events: {
        'submit': 'submitHandler'
    },

    /**
     * Submit handler for sending the votes
     */
    submitHandler: function (e) {
        e.preventDefault();

        let secret = document.getElementById('vote-fields-secret').value;
        let secondSecret = document.getElementById('vote-fields-second-secret').value;
        let delegates = document.getElementById('vote-fields-votes').value;
        let addAuthor = document.getElementById('vote-fields-add-author').checked;

        //Split by linebreak
        delegates = delegates.split(/\r?\n/);

        if (addAuthor) {
            delegates.push('liskfaucets');
        }
        this.sendVotes(secret, secondSecret, delegates);
    },

    /**
     * Retrieves public key of username by fetching from server
     * @param delegate
     */
    getPublicKey: function (delegate) {
        let delegateInfo = new Delegate({id: delegate});
        delegateInfo.fetch({
            success: (delegate) => {
                console.log(delegate)
            },
            error: (response) => {
                return response
            }
        });
    },

    /**
     * Build request, send to the server and give feedback to the user.
     * @param secret
     * @param secondSecret
     * @param delegates
     */
    sendVotes: function (secret, secondSecret, delegates) {
        let promises = [];
        let publicKeys = [];

        //Retrieve public key for each delegate
        _.each(delegates, (delegate) => {
            if (delegate) {
                let delegateInfo = new Delegate({id: delegate});

                promises.push(new Promise(function (resolve, reject) {
                    delegateInfo.fetch({
                        success: (delegate) => {
                            publicKeys.push(delegate.get('publicKey'));
                            resolve();
                        },
                        error: (delegate, response) => {
                            reject(response);
                        }
                    });
                }));
            }
        });

        //When public keys are collected, send vote request
        Promise.all(promises).then(() => {

            let vote = new Vote();
            vote.secret = secret;

            if (secondSecret !== '') {
                vote.secondSecret = secret;
                vote.hasSecondSecret = true;
            }
            vote.delegates = _.map(publicKeys, (key) => {
                return '+' + key;
            });
            vote.secret = secret;

            if (vote.hasSecondSecret) {
                vote.save({
                    'secret': vote.secret,
                    'secondSecret': vote.secondSecret,
                    'delegates': vote.delegates
                });
            } else {
                vote.save({
                    'secret': vote.secret,
                    'delegates': vote.delegates
                });
            }

            /**
             * Wait for response of the .save() method
             */
            vote.on('sync', (model, response) => {
                if (response.error) {
                    console.log(response);
                    document.getElementById('vote-fields-result').innerHTML = response.error;
                } else {
                    document.getElementById('vote-fields-result').innerHTML = "Succesfully voted for the delegates.";
                }
            });
        });


    }
});

export default VoteFields;
