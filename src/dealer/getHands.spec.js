const getHands = require('./getHands');

describe('GetHands', () => {

    it('Should make 2 hands when valid data is passed', () => {
        const hands = getHands('KH 6D 6S TH TD AC JS QC 7D 5C', 2);
        expect(hands).toHaveLength(2);
        expect(hands[0]).toHaveLength(5);
        expect(hands[1]).toHaveLength(5);
        expect(['KH', '6D', '6S', 'TH', 'TD']).toEqual(expect.arrayContaining(hands[0]));
        expect(['AC', 'JS', 'QC', '7D', '5C']).toEqual(expect.arrayContaining(hands[1]));
    });

    it('Should throw an error', () => {
        expect(() => {
            getHands('KH 6D 6S TH TD AC JS QC 7D 5C', 3);
        }).toThrowError('Incorrect hand');
    });

});