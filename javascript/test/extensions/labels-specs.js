import glanceSelector from '../../src/glance';
import dom from '../dom';

describe('Extensions: labels', () => {
    beforeEach(() => {
        dom.render(<div>
            <div id="target"/>
            <div id="another"/>
            <div id="something-else">
                <div id="item-1"/>
            </div>
        </div>);
    });

    it('should locate elements for a custom label', () => {
        glanceSelector.addExtension({
            labels: {
                'custom-label': {
                    locate: function ({glanceSelector}) {
                        return glanceSelector('target');
                    }
                }
            }
        });

        return glanceSelector('custom-label').should.deep.equal(dom.get('target'));
    });

    it('should locate elements for a custom label as a function', () => {
        glanceSelector.addExtension({
            labels: {
                'custom-label': function ({glanceSelector}) {
                    return glanceSelector('target');
                }
            }
        });

        return glanceSelector('custom-label').should.deep.equal(dom.get('target'));
    });

    it('should locate elements for a custom label as a glanceSelector selector', () => {
        glanceSelector.addExtension({
            labels: {
                'custom-label': 'target'
            }
        });

        return glanceSelector('custom-label').should.deep.equal(dom.get('target'));
    });

    it('should locate elements for a custom label as an array', () => {
        glanceSelector.addExtension({
            labels: {
                'custom-label': ['missing', 'target', 'another']
            }
        });

        return glanceSelector('custom-label').should.deep.equal(dom.get('target', 'another'));
    });

    it('should locate elements with a scope as a custom label as an array', () => {
        glanceSelector.addExtension({
            labels: {
                'custom-label': ['missing', 'target', 'something-else']
            }
        });

        return glanceSelector('custom-label > item-1').should.deep.equal(dom.get('item-1'));
    });
});