const order = "23456789TJQKA";

// We are using the index number to refer as the ranking
const rankings = ['',
    'HIGH_CARD',
    'ONE_PAIR',
    'TWO_PAIR',
    'THREE_OF_A_KIND',
    'STRAIGHT',
    'FLUSH',
    'FULL_HOUSE',
    'FOUR_OF_A_KIND',
    'STRAIGHT_FLUSH',
    'ROYAL_FLUSH' ]

/**
 * This module will analyze an array of string
 * to validate and resolve the poker hand with the name, value and ranking
 *
 *
 * @param {Array} [array] The array to iterate over. e.g. ['4H', '4C', '6S', '7S', 'KD']
 * @returns {Object} Returns the sanitised and resolved PokerHand as per below.
 * {
 *     name: {String} of type 'HIGH_CARD', 'ONE_PAIR', 'TWO_PAIR', 'THREE_OF_A_KIND', 'STRAIGHT', 'FLUSH', 'FULL_HOUSE',
 *                            'FOUR_OF_A_KIND', 'STRAIGHT_FLUSH', 'ROYAL_FLUSH'
 *     rank: {Number} 1-9
 *     value: {Number} grouped and sorted face values joined together to decide the highest value when compared
 * }
 */

function resolveHand(hand, player) {

    //Suits are: Diamonds (D), Hearts (H), Spades (S), Clubs (C)
    const suits = hand.map(a => a[1]).sort();

    // since we have sorted suits, just first and last needs to be same to make a FLUSH
    const flush = suits[0] === suits[4];

    // we need to convert card faces to something comparable
    // get a 2 digit code between 10 and 22, 10 mapping to face value '2' and 22 mapping to value 'A'
    const faces = hand.map(a => order.indexOf(a[0]) + 10).sort();

    //first face value after sorted
    const first = faces[0];

    //we compare first with the rest of the card face values to determine if it is a straight
    const straight = faces.every((f, index) => f - first === index);

    const straightFlush = flush && straight;

    // To determine if it is a ROYAL_FLUSH we check if it is a straight flush ending with 'A' where value is '22'
    const royalFlush = straightFlush && faces[4] === 22;

    // we group the values e.g. - returns {20: 1, 22: 1, 12: 2, 14: 1} --> this is a hand with a one pair
    const counts = faces.reduce(count, {});

    // this is to determine number of duplicates {1: 3, 2: 1} --> one pair and three singles
    const duplicates = Object.values(counts).reduce(count, {});

    const rank = (royalFlush && rankings.indexOf('ROYAL_FLUSH')) ||
        (flush && straight && rankings.indexOf('STRAIGHT_FLUSH')) ||
        (duplicates[4] && rankings.indexOf('FOUR_OF_A_KIND')) ||
        (duplicates[3] && duplicates[2] && rankings.indexOf('FULL_HOUSE')) ||
        (flush && rankings.indexOf('FLUSH')) ||
        (straight && rankings.indexOf('STRAIGHT')) ||
        (duplicates[3] && rankings.indexOf('THREE_OF_A_KIND')) ||
        (duplicates[2] > 1 && rankings.indexOf('TWO_PAIR')) ||
        (duplicates[2] && rankings.indexOf('ONE_PAIR')) ||
        rankings.indexOf('HIGH_CARD');

    var score = faces.sort((a, b) => b-a).sort(byCount);


    //sort the groups first
    function byCount(a, b) {
        //Counts are in reverse order - bigger is better
        const countDiff = counts[b] - counts[a];
        if (countDiff) return countDiff; // If counts don't match return
        return b < a ? -1 : b === a ? 0 : 1
    }

    // returns an object with distinct face values and how many duplicate
    // e.g. [20, 12, 22, 12, 14] --> {20: 1, 22: 1, 12: 2, 14: 1}
    function count(c, index) {
        c[index] = (c[index] || 0) + 1;
        return c
    }


    return {
        player: player,
        name: rankings[rank],
        rank: rank,
        value: score.join("")
    };
}
// module.exports = getHands;
module.exports = resolveHand;
