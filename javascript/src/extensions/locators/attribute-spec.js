import dom from "../../../test/dom";
import findInAttribute from './attribute';

describe("Locator: Search in attributes", () => {
    let locate = findInAttribute.locator.locate;

    beforeEach(() => {
        document.body.innerHTML = "";
    });

    it("should find exact match", () => {
        dom.render(<img alt="image-name" id="subject"/>);
        locate({
            target: {label: "image-name", options: ["attribute-alt"]},
            containerElements: [document.body]
        }).should.deep.equal([dom.get("subject")]);
    });

    it("should find case insensitive", () => {
        dom.render(<img id="subject"/>);
        locate({
            target: {label: "suBJect", options: ["attribute-id"]},
            containerElements: [document.body]
        }).should.deep.equal([dom.get("subject")]);
    });

    it("should find as contains", () => {
        dom.render(<img id="subject" placeholder="enter first name"/>);
        locate({
            target: {label: "first", options: ["attribute-placeholder"]},
            containerElements: [document.body]
        }).should.deep.equal([dom.get("subject")]);
    });

    it("should not find if missing", () => {
        dom.render(<div id="unique-id"></div>);
        locate({
            target: {label: "missing-id", options: ["attribute-id"]},
            containerElements: [document.body]
        }).should.deep.equal([]);
    });
});