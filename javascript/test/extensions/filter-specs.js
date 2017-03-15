import glanceSelector from '../../src/glance';
import dom from '../dom';

describe('Extensions: filters', () => {
    beforeEach(() => {
        dom.render(<div>
            <div className='item' id="target-1"/>
            <div className='item'/>
            <div className='item' id="target-2"/>
            <div className='item'/>
            <input className='custom-input' id="target-3"/>
        </div>);
    });

    it('should filter elements', () => {
        glanceSelector.addExtension({
            options: {
                'every-other': {
                    filter: function ({elements}) {
                        let i = 0;
                        return elements.filter(e => ++i % 2);
                    }
                }
            }
        });

        return glanceSelector('item#every-other').should.deep.equal(dom.get('target-1', 'target-2'));
    });

    it('should filter elements as a function', () => {
        glanceSelector.addExtension({
            options: {
                'every-other': function ({elements}) {
                    let i = 0;
                    return elements.filter(e => ++i % 2);
                }
            }
        });

        return glanceSelector('item#every-other').should.deep.equal(dom.get('target-1', 'target-2'));
    });
});