import matches from '../../utils/matches';

export default function(selector, containerElement) {
    try {
        let results = [];

        if (matches(selector, containerElement))
            results.push(containerElement);

        return results.concat(Array.prototype.slice.apply(containerElement.querySelectorAll(selector)));
    }
    catch (e) {
        if (e instanceof DOMException)
            return [];

        throw e;
    }
};
