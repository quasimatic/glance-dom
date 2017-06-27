import dom from '../../../test/dom';
import image from './image';

describe('Locator: Image', () => {
    let findImage = image.options['image'].locate;

    it('should find in src attribute', () => {
        dom.render(<img id='subject' src='picture.jpg'/>);

		findImage({
            label: 'picture',
            containerElements: [document.documentElement]
        }).should.deep.equal([dom.get('subject')]);
    });
});