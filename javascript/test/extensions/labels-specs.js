import glanceDOM from '../../src/glance-dom';
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
        glanceDOM.addExtension({
            labels: {
                'custom-label': {
                    locate: function ({glanceDOM}) {
                        return glanceDOM('target');
                    }
                }
            }
        });

        return glanceDOM('custom-label').should.deep.equal(dom.get('target'));
    });

    it('should locate elements for a custom label as a function', () => {
        glanceDOM.addExtension({
            labels: {
                'custom-label': function ({glanceDOM}) {
                    return glanceDOM('target');
                }
            }
        });

        return glanceDOM('custom-label').should.deep.equal(dom.get('target'));
    });

    it('should locate elements for a custom label as a glanceDOM selector', () => {
        glanceDOM.addExtension({
            labels: {
                'custom-label': 'target'
            }
        });

        return glanceDOM('custom-label').should.deep.equal(dom.get('target'));
    });

    it('should locate elements for a custom label as an array', () => {
        glanceDOM.addExtension({
            labels: {
                'custom-label': ['missing', 'target', 'another']
            }
        });

        return glanceDOM('custom-label').should.deep.equal(dom.get('target', 'another'));
    });

    it('should locate elements with a scope as a custom label as an array', () => {
        glanceDOM.addExtension({
            labels: {
                'custom-label': ['missing', 'target', 'something-else']
            }
        });

        return glanceDOM('custom-label > item-1').should.deep.equal(dom.get('item-1'));
    });
});