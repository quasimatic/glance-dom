describe('Matches', () => {
    it('should match selector', () => {
        require('./matches').default('html', document.documentElement).should.equal(true);
    });
});
