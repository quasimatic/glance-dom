function getParentElements(elements) {
    return elements.reduce((result, element) => {
        let parent = element;
        let parents = [];
        while (parent !== null && parent.outerHTML !== null) {
            parents.push(parent);
            parent = parent.parentNode;
        }

        result.push(parents);
        return result;
    }, []);
}

export default function (scopeElements, subjectElements) {
    let containerLookup = new Set([].concat.apply([], getParentElements(scopeElements)));
    return getParentElements(subjectElements).map(se => se.find(e => containerLookup.has(e)));
};
