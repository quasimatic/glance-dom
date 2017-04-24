import dom from '../../../test/dom'
import inputAfter from './input-after'

let filter = inputAfter.options['input-after'].filter;

describe("Input after", function () {
    it("should get input next to label", () => {
        dom.render(
            <div>
                <div>
                    <label id="label-1">name</label>
                    <input id="target"/>
                    <label>another</label>
                    <input id="input-2"/>
                </div>
            </div>
        );

        return filter({
            elements: dom.get("target", "input-2"),
            scopeElements: [dom.get("label-1")]
        }).should.deep.equal([dom.get("target")])
    });

    it("should limit to next sibling", () => {
        dom.render(
            <div>
                <div>name</div>
                <div>something else</div>
                <input/>

                <div>
                    <label id="label-1">name</label>
                    <input id="target-1"/>
                    <label>another</label>
                    <input />
                </div>
                <div>
                    <label id="label-2">name</label>
                    <input id="target-2"/>
                    <label >another</label>
                    <input />
                </div>
            </div>
        );

        return filter({
            elements: dom.get("target-1", "target-2"),
            scopeElements: dom.get("label-1", "label-2")
        }).should.deep.equal(dom.get("target-1", "target-2"))
    });
});