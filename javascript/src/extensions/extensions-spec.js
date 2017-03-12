import Extensions from './index';

describe('Extensions', () => {
    it('should get locator for option', () => {
        let extensions = new Extensions([{
            options: {
                'option-1': {
                    locate: 'custom'
                }
            }
        }]);

        extensions.getLocatorForOption('option-1', {label: 'subject', options: ['option-1']}).should.be.a('function');
    });

    it('should get filter for option', () => {
        let extensions = new Extensions([{
            options: {
                'option-1': () => {
                }
            }
        }]);

        extensions.getFilterForOption('option-1', {label: 'subject', options: ['option-1']}).should.be.a('function');
    });
});