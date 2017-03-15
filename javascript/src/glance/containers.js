import parentElements from '../utils/parent-elements'

export default function (scopeElements, subjectElements) {
    let containerLookup = new Set([].concat.apply([], parentElements(scopeElements)));
    return parentElements(subjectElements).map(se => se.find(e => containerLookup.has(e)));
};
