import parentElements from '../utils/parent-elements'

export default function (scopeElements, subjectElements, containerElements) {
    let containerLookup = new Set([].concat.apply([], parentElements(scopeElements, containerElements)));
    return parentElements(subjectElements, containerElements).map(se => se.find(e => containerLookup.has(e)));
};
