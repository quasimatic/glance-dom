import dom from "../../../test/dom"
import leafNodeTarget from "./leaf-node-target"
let filter = leafNodeTarget.options['leaf-node-target'].filter;

describe("Filter: Target is leaf node", () => {
    beforeEach(function () {
        document.body.innerHTML = "";
    });

    it("should filter out non leaf nodes",  () => {
        dom.render(
            <div>
                <div>
                    <div id="target">item</div>
                </div>
                <div id='item-2' className="item">
                    <div>something else</div>
                </div>
            </div>
        );

        filter({
            elements: dom.get('target', 'item-2'),
            target: {
                type: 'target'
            }
        }).should.deep.equal([dom.get("target")]);
    });

    it("should return container nodes if no leaf nodes in set", () => {
        dom.render(
            <div>
                <div id="target" className="item">
                    <div>something else</div>
                </div>
            </div>
        );

        filter({
            elements: [dom.get('target')],
            target: {
                type: 'target'
            }
        }).should.deep.equal([dom.get("target")]);
    });
});