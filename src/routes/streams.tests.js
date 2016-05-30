import chai from 'chai';

chai.should();

describe('a sum', () => {
    it('is associative', () => {
        const sum = 2 + 3;
        sum.should.equal(3 + 2);
    });
});
