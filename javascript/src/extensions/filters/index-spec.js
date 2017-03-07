import dom from '../../../test/dom';
import index from './index';

describe("Filter: Index", () => {
    let filter = index.filter.apply;

    beforeEach(function () {
        document.body.innerHTML = "";

        dom.render(<div>
            <div id="target-1">item</div>
            <div id="target-2">item</div>
            <div id="target-3">item</div>
        </div>);
    });

    it("should return all items if no position supplied", () => {
        filter({
            elements: dom.get("target-1", "target-2", "target-3"),
            target: {options: []}
        }).should.deep.equal(dom.get("target-1", "target-2", "target-3"));
    });

    it("should return a single item for the specified index", () => {
        filter({
            elements: dom.get("item-1", "target", "item-3"),
            target: {options: [2]}
        }).should.deep.equal([dom.get("target")]);
    });

    it("should start at one", () => {
        filter({
            elements: dom.get("target", "item-2", "item-3"),
            target: {options: [1]}
        }).should.deep.equal([dom.get("target")]);
    });

    it("should not filter if option is not a number", () => {
        filter({
            elements: [dom.get("target")],
            target: {options: ["non-number"]}
        }).should.deep.equal([dom.get("target")]);
    });

    it("should throw an error if the index is out of range", () => {
        (() => filter({
            elements: [dom.get("target")],
            target: {options: [2]}
        })).should.throw("Position 2 out of range");
    });

    it("should throw an error if the index is less than 1", () => {
        (() => filter({
            elements: [dom.get("target")],
            target: {options: [-1]}
        })).should.throw("Positions start at 1");
    })
});