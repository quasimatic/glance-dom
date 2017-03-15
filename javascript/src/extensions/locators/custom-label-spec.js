import dom from '../../../test/dom';
import customLabelExtension from './custom-label';
import Extensions from '../index';

describe('Locator: Custom Label', () => {
    let customLabel = customLabelExtension.options['custom-label'].locate;

    it('should find by custom label', () => {
        dom.render(<p id="subject">complex</p>);

        customLabel({
            label: 'custom',
            containerElements: [document.body],
            extensions: new Extensions([
                {
                    labels: {
                        'custom': () => dom.get('subject')
                    }
                }
            ])
        }).should.deep.equal([dom.get('subject')]);
    });
});