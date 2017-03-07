import log from "../../log";

export default {
    options: {
        "shortest-path": {
            filter: function closestdom({elements, scopeElements, target}) {
                log.debug("Filtering for shortest scope and target");

                let {scopeIndex} = target;
                let elementsForDistance = [];
                let distanceToScopeLookup = {};

                function addToLookup(element, distance) {
                    elementsForDistance.push(element);
                    let i = elementsForDistance.indexOf(element);
                    distanceToScopeLookup[i] = distance;
                }

                function lookup(element) {
                    let i = elementsForDistance.indexOf(element);
                    if (i === -1) return null;

                    return distanceToScopeLookup[i];
                }


                if (scopeIndex === 0) return elements;

                scopeElements.forEach(function (v) {
                    let p = v;
                    let i = 0;

                    while (p !== null && p.outerHTML !== null) {
                        let distanceToScope = lookup(p);

                        if (!distanceToScope || i < distanceToScope) {
                            addToLookup(p, i);
                        }

                        ++i;

                        p = p.parentNode;
                    }
                });

                let closestLevel = -1;
                let closestElements = [];

                elements.forEach(function (element) {
                    let parent = element;

                    let distanceToScope = lookup(parent);

                    while ((closestLevel === -1 || !distanceToScope || distanceToScope <= closestLevel) && parent !== null && parent.outerHTML !== null) {
                        if (distanceToScope || distanceToScope === 0) {
                            if (distanceToScope < closestLevel) {
                                closestElements = [];
                            }

                            closestLevel = distanceToScope;
                            closestElements.push(element);
                            break;
                        }

                        parent = parent.parentNode;
                        distanceToScope = lookup(parent);
                    }
                });

                return closestElements;
            }
        }
    }
};