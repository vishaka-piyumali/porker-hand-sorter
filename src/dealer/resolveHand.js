/**
 * This module take an array of cards and the player
 * convert array of poker hands consists of 5 cards per each player
 * @param hand {array} a strings in the form of 'KH 6D 6S TH TD AC JS QC 7D 5C'
 * @returns {Object}
 *  {
        player: {String}, // name of the player
        rank: {number},   // rank of the hand to compare
        value: {string}   // value of the hand for tie break
        name: {String},   // name of the hand
            HIGH_CARD,
            ONE_PAIR,
            TWO_PAIR,
            THREE_OF_A_KIND,
            STRAIGHT,
            FLUSH,
            FULL_HOUSE,
            FOUR_OF_A_KIND,
            STRAIGHT_FLUSH,
            ROYAL_FLUSH
    }
 *
 *  Faces:
 *      2 -> 2,
 *      3 -> 3,
 *      4 -> 4,
 *      5 -> 5,
 *      6 -> 6,
 *      7 -> 7,
 *      8 -> 8,
 *      9 -> 9,
 *      10 -> T,
 *      Jack -> J,
 *      Queen -> Q,
 *      King -> K,
 *      Ace -> A
 *
 *   Suits:
 *      Diamonds -> D,
 *      Hearts   -> H
 *      Spades   -> S
 *      Clubs    -> C
 *
 *    Values:
 *      2 -> 10,
 *      3 -> 11,
 *      4 -> 12,
 *      5 -> 13,
 *      6 -> 14,
 *      7 -> 15,
 *      8 -> 16,
 *      9 -> 17,
 *      10 -> 18,
 *      Jack -> 19,
 *      Queen -> 20,
 *      King -> 21,
 *      Ace -> 22
 */

function resolveHand(hand, player) {

    // Order to determine the face value
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
        'ROYAL_FLUSH' ];

    //Suits are: Diamonds (D), Hearts (H), Spades (S), Clubs (C)
    const suits = hand.map(a => a[1]).sort();

    // since we have sorted suits, just first and last needs to be same to make a FLUSH
    const flush = suits[0] === suits[4];

    // we need to convert card faces to something comparable
    // get a 2 digit code between 10 and 22 for face values, 10 mapping to face value '2' and 22 mapping to value 'A'
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

    // this is to determine number of duplicates {1: 3, 2: 1} --> three singles and one pair
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

    //First Group and then sort in descending order to get the hand value
    var score = faces.sort((a, b) => b - a).sort(byCount);

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
module.exports = resolveHand;
