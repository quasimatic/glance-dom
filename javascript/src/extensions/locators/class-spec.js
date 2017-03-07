import dom from "../../../test/dom";
import extension from './class';

describe("Locator: Class", () => {
    let findByClass = extension.options["class"].locate;

    beforeEach(() => {
        document.body.innerHTML = "";
    });

    it("should find by class name", () => {
        dom.render(<div className="class-name" id="subject">text</div>);

        findByClass({
            target: {label: "class-name"},
            containerElements: [document.body]
        }).should.deep.equal([dom.get("subject")]);
    });

    it("should not find by class name", () => {
        dom.render(<div className="class-name">text</div>);

        findByClass({target: {label: "missing-class"}, containerElements: [document.body]}).should.deep.equal([]);
    });
});