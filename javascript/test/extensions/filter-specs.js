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

    it('should filter items for option', () => {
        dom.render(
            <div>
                <div id="target-1">1</div>
                <div id="target-2">12</div>
                <div>123</div>
                <div>1234</div>
            </div>
        );

        glanceSelector.addExtension({
            options: {
                'lessthan3characters': function ({elements}) {
                    return elements.filter(e => e.innerHTML.length < 3);
                }
            }
        });

        return glanceSelector('1#lessthan3characters').should.deep.equal(dom.get('target-1', 'target-2'));
    });

    it('should support setting the locator', () => {
        dom.render(
            <div>
                <div>item</div>
                <div id="target">something</div>
            </div>
        );

        glanceSelector.addExtension({
            options: {
                'exact-match': {
                    locate: function ({label, containerElements}) {
                        return [dom.get('target')];
                    }
                }
            }
        });

        return glanceSelector('something custom#exact-match').should.deep.equal(dom.get('target'));
    });

    it("should still use default filters if specified options don't have filters", function () {
        dom.render(<span id="target"></span>)

        glanceSelector.addExtension({
            options: {
                "optionwithoutfilter": {}
            }
        });

        return glanceSelector("span#optionwithoutfilter").should.deep.equal(dom.get('target'));
    });
});