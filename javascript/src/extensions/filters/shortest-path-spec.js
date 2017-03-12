import dom from '../../../test/dom'
import shortestPath from './shortest-path';
let filter = shortestPath.options['shortest-path'].filter;

describe("Shortest scope and container path", () => {
    beforeEach(function () {
        document.body.innerHTML = "";
    });

    it("should get all items if the scope distances to their container are the same", () => {
        dom.render(
            <div>
                <div>
                    <div id="scope-1">scope</div>
                    <div id="target-1">item</div>
                </div>

                <div>
                    <div id="scope-2">scope</div>
                    <div>
                        <div>
                            <div id="target-2">item</div>
                        </div>
                    </div>
                </div>
            </div>
        );

        return filter({
            elements: dom.get('target-1', 'target-2'),
            scopeElements: dom.get('scope-1', 'scope-2')
        }).should.deep.equal(dom.get('target-1', 'target-2'));
    });

    it("should get the items to the scope that has a shorter distance to the container", () => {
        dom.render(
            <div>
                <div>
                    <div>
                        <div id="scope-1">scope</div>
                    </div>
                    <div>
                        <div>
                            <div id="item-1">item</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="scope-2">scope</div>
                    <div id="target">item</div>
                </div>
            </div>
        );

        return filter({
            elements: dom.get('item-1', 'target'),
            scopeElements: dom.get('scope-1', 'scope-2')
        }).should.deep.equal([dom.get('target')]);
    });

    it("should get multiple elements of the same shortest distant", () => {
        dom.render(
            <div>
                <div>
                    <div id="scope-1">scope</div>
                    <div id="target-1">item A</div>
                </div>

                <div>
                    <div id="scope-2">scope</div>
                    <div id="target-2">item A</div>
                </div>
            </div>
        );

        return filter({
            elements: dom.get('target-1', 'target-2'),
            scopeElements: dom.get('scope-1', 'scope-2')
        }).should.deep.equal(dom.get('target-1', 'target-2'));
    });

    it("should get all children", () => {
        dom.render(
            <div id="scope-1" className="item-class">
                <div id="target-1">item</div>
                <div>
                    <div>
                        <div id="target-2">item</div>
                    </div>
                </div>
            </div>
        );

        return filter({
            elements: dom.get("target-1", "target-2"),
            scopeElements: [dom.get("scope-1")]
        }).should.deep.equal(dom.get("target-1", "target-2"));
    });

    it("should get child items instead of cousins", () => {
        dom.render(
            <div>
                <div id="scope-1" className="item-class">
                    <div>
                        <div>
                            <div id="target">item</div>
                        </div>
                    </div>
                </div>
                <div id="item-2">item</div>
            </div>
        );

        return filter({
            elements: dom.get("target", "item-2"),
            scopeElements: [dom.get("scope-1")]
        }).should.deep.equal([dom.get("target")]);
    });
});