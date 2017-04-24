import dom from "../../../test/dom";
import extension from './class';

describe("Locator: Class", () => {
    let findByClass = extension.options["class"].locate;

    it("should find by class name", () => {
        dom.render(<div className="class-name" id="subject">text</div>);

        findByClass({
            label: "class-name",
            containerElements: [document.documentElement]
        }).should.deep.equal([dom.get("subject")]);
    });

    it("should not find by class name", () => {
        dom.render(<div className="class-name">text</div>);

        findByClass({label: "missing-class", containerElements: [document.documentElement]}).should.deep.equal([]);
    });
});