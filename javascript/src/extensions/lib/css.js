export default function (label, containerElement) {
        try {
            let results = [];

            let matches = (containerElement.matches || containerElement.matchesSelector || containerElement.msMatchesSelector || containerElement.mozMatchesSelector || containerElement.webkitMatchesSelector || containerElement.oMatchesSelector);
            if (matches && matches.call(containerElement, label))
                results.push(containerElement);

            return results.concat(Array.prototype.slice.apply(containerElement.querySelectorAll(label)));
        }
        catch (e) {
            if (e instanceof DOMException)
                return [];

            throw e;
        }
}
