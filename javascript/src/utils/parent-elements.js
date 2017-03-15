export default function (elements, includeSelf = true) {
    return elements.reduce((result, element) => {
        let parent = includeSelf ? element : element.parentNode;
        let parents = [];
        while (parent !== null && parent.outerHTML !== null) {
            parents.push(parent);
            parent = parent.parentNode;
        }

        result.push(parents);
        return result;
    }, []);
};