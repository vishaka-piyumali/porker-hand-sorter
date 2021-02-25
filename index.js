var fs = require('fs');

const { getHands, compareHands, resolveHand } = require('./src/dealer/index');

const games = fs.readFileSync('./poker-hands.txt').toString().split("\n");

let player1Wins = 0;
let player2Wins = 0;

games.forEach((game, index) => {
    const playerHands = getHands(game, 2);

    var hand1 = resolveHand(playerHands[0], 'Player 1');
    var hand2 = resolveHand(playerHands[1], 'Player 2');

    const winningHand = compareHands(hand1, hand2);
    player1Wins = winningHand.player === 'Player 1'?player1Wins+1: player1Wins;
    player2Wins = winningHand.player === 'Player 2'?player2Wins+1: player2Wins;

});

console.log('Player 1 wins ' + player1Wins + ' hands');
console.log('Player 2 wins ' + player2Wins + ' hands');
