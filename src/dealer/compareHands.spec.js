const compareHands = require('./compareHands');

describe('CompareHands', () => {

    it('Should return null if it is same value and same rank', () => {
        const hands = [{
            player: 'Player 1',
            name: 'ONE_PAIR',
            rank: 1,
            value: 1212102022 //4,4,2,10,A
        },{
            player: 'Player 2',
            name: 'ONE_PAIR',
            rank: 1,
            value: 1212102022
        }];
        expect(compareHands(hands[0], hands[1])).toBe(null);
    });

    it('Should return the hand with higher rank', () => {
        const hands = [{
            player: 'Player 1',
            name: 'ONE_PAIR',
            rank: 1,
            value: 1212102022
        },{
            player: 'Player 2',
            name: 'FULL_HOUSE',
            rank: 7,
            value: 1212121313
        }];
        expect(compareHands(hands[0], hands[1]).player).toBe('Player 2');
    });

    it('Should return hand with the highest rank', () => {
        const hands = [{
            player: 'Player 1',
            name: 'ONE_PAIR',
            rank: 2,
            value: 1717111516
        },{
            player: 'Player 2',
            name: 'HIGH_CARD',
            rank: 1,
            value: 1016171821
        }];
        expect(compareHands(hands[0], hands[1]).player).toBe('Player 1');
    });

    it('Should return hand with highest value when same rank', () => {
        const hands = [{
            player: 'Player 1',
            name: 'ONE_PAIR',
            rank: 1,
            value: 1111161822
        },{
            player: 'Player 2',
            name: 'ONE_PAIR',
            rank: 1,
            value: 1313101622
        }];
        expect(compareHands(hands[0], hands[1]).player).toBe('Player 2');
    });

    it('Should return hand with highest value when same rank', () => {
        const hands = [{
            player: 'Player 1',
            name: 'ONE_PAIR',
            rank: 1,
            value: 1313101822
        },{
            player: 'Player 2',
            name: 'ONE_PAIR',
            rank: 1,
            value: 1313101622
        }];
        expect(compareHands(hands[0], hands[1]).player).toBe('Player 1');
    });

});