var _ = require('lodash');

/**
 * This will take stack of cards in form of a string array and
 * convert array of poker hands consists of 5 cards per each player
 * It will also validate and resolve the poker hand with a name, value and ranking
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