/**
 * Compare two poker hands firstly based on the rank and secondly the face value
 *  in cases of comparing both hands of Royal Flush the value is same hence returns a draw
 * @param hand1 {Object Hand}
 * @param hand2 {Object Hand}
 * @returns {hand || null}
 * Hand:{
 *      player: {String},
 *      name: {String}',
 *      rank: {Number},
 *      value: {Number}
 *}
 * */

function compareHands(hand1, hand2) {
    return hand1.rank > hand2.rank? hand1: hand1.rank < hand2.rank? hand2: hand1.value > hand2.value? hand1: hand1.value < hand2.value? hand2: null;
}

module.exports = compareHands;