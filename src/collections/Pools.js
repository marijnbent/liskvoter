import {Collection} from 'backbone';
import Pool from '../models/Pool';

/**
 * Collection of the pools
 *
 * @constructor
 */
const Pools = Collection.extend({
    model: Pool,
    url: '/liskvoter/pools-testnet.json'
});

export default Pools;
