const resolveHand = require('./resolveHand');

describe('ResolveHand', () => {
    it('Should resolve to ROYAL_FLUSH with rank 10', () => {
        const hand = resolveHand(['KH', 'QH', 'JH', 'TH', 'AH']);
        expect(hand.rank).toBe(10);
        expect(hand.name).toBe('ROYAL_FLUSH');
    });

    it('Should resolve to STRAIGHT_FLUSH with rank 9', () => {
        const hand = resolveHand(['KH', 'QH', 'JH', 'TH', '9H']);
        expect(hand.rank).toBe(9);
        expect(hand.name).toBe('STRAIGHT_FLUSH');

        const hand2 = resolveHand(['8H', 'QH', 'JH', 'TH', '9H']);
        expect(hand2.rank).toBe(9);
        expect(hand2.name).toBe('STRAIGHT_FLUSH');
    });

    it('Should resolve to STRAIGHT with rank 5', () => {
        const hand = resolveHand(['KS', 'QH', 'JC', 'TH', '9H']);
        expect(hand.rank).toBe(5);
        expect(hand.name).toBe('STRAIGHT');

        const hand2 = resolveHand(['8H', 'QC', 'JH', 'TH', '9H']);
        expect(hand2.rank).toBe(5);
        expect(hand2.name).toBe('STRAIGHT');
    });

    it('Should resolve to FLUSH with rank 6', () => {
        const hand = resolveHand(['KS', 'QS', '8S', 'TS', '9S']);
        expect(hand.rank).toBe(6);
        expect(hand.name).toBe('FLUSH');

        const hand2 = resolveHand(['2H', 'QH', 'JH', 'TH', '3H']);
        expect(hand2.rank).toBe(6);
        expect(hand2.name).toBe('FLUSH');
    });

    it('Should resolve to FOUR_OF_A_KIND with rank 8', () => {
        const hand = resolveHand(['KS', 'KD', 'KD', 'TS', 'KS']);
        expect(hand.rank).toBe(8);
        expect(hand.name).toBe('FOUR_OF_A_KIND');
    });

    it('Should resolve to THREE_OF_A_KIND with rank 4', () => {
        const hand = resolveHand(['KS', 'KD', 'KD', 'TS', '5S']);
        expect(hand.rank).toBe(4);
        expect(hand.name).toBe('THREE_OF_A_KIND');
    });

    it('Should resolve to TWO_PAIR with rank 3', () => {
        const hand = resolveHand(['KS', 'KD', '2D', '2S', '5S']);
        expect(hand.rank).toBe(3);
        expect(hand.name).toBe('TWO_PAIR');
    });

    it('Should resolve to ONE_PAIR with rank 3', () => {
        const hand = resolveHand(['KS', 'KD', '2D', '3S', '5S']);
        expect(hand.rank).toBe(2);
        expect(hand.name).toBe('ONE_PAIR');
    });

    it('Should resolve to HIGH_CARD with rank 1', () => {
        const hand = resolveHand(['KS', '2D', '3D', '4S', '5S']);
        expect(hand.rank).toBe(1);
        expect(hand.name).toBe('HIGH_CARD');
    });

    it('Should resolve to HIGH_CARD with value 2113121110', () => {
        const hand = resolveHand(['KS', '2D', '3D', '4S', '5S']);
        expect(hand.rank).toBe(1);
        expect(hand.name).toBe('HIGH_CARD');
        expect(hand.value).toBe('2113121110');
    });

    it('Should resolve to ONE_PAIR with value 2121131211', () => {
        const hand = resolveHand(['KS', 'KD', '3D', '4S', '5S']);
        expect(hand.rank).toBe(2);
        expect(hand.name).toBe('ONE_PAIR');
        expect(hand.value).toBe('2121131211');
    });
});