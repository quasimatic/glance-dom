import glanceDOM from '../../src/glance-dom-browser';
import dom from '../dom';

describe('Extensions: locators', () => {
    beforeEach(() => {
        dom.render(<div>
            <div className='item' id="target-1"/>
            <div className='item'/>
            <div className='item' id="target-2"/>
            <div className='item'/>
            <input className='custom-input' id="target-3"/>
        </div>);
    });

    it('should locate elements with a option', () => {
        glanceDOM.addExtension({
            options: {
                'custom-option': {
                    locate: function ({glanceDOM}) {
                        return glanceDOM('custom-input');
                    }
                }
            }
        });

        return glanceDOM('ignored#custom-option').should.deep.equal(dom.get('target-3'));
    });

    it('should locate elements for a custom option as a glance selector', () => {
        glanceDOM.addExtension({
            options: {
                'custom-option': {
                    locate: 'custom-input'
                }
            }
        });

        return glanceDOM('ignored#custom-option').should.deep.equal(dom.get('target-3'));
    });
});