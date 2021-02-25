var _ = require('lodash');

/**
 * This will take stack of cards in form of a string array and
 * convert array of poker hands consists of 5 cards per each player
 * @param cards {String} a strings in the form of 'KH 6D 6S TH TD AC JS QC 7D 5C'
 * @returns {array || Error} array of poker hands -> ['KH', '6D', '6S', 'TH', 'TD', 'AC', 'JS', 'QC', '7D', '5C']
 *
 * The cards are valued in the order: 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace
 * and respectively represented as 2, 3, 4, 5, 6, 7, 8, 9, T, J, Q, K, A
 *
 * Suits are: Diamonds (D), Hearts (H), Spades (S), Clubs (C)
 *
 */

function getHands(cards, noOfPlayers) {
    const allCards = cards.toUpperCase().trim().split(' ');
    //check if the input has correct no of cards
    if (allCards.length !== (5 * noOfPlayers)) {
        throw new Error('Incorrect hand');
    } else {
        return _.chunk(allCards, 5)
    }
}

module.exports = getHands;