import log from '../../utils/log';

export default {
    options: {
        'leaf-node-target': {
            filter: function visible({elements, targetIndex = 0, totalTargets = 1}) {
                log.debug('Filtering for leaf node targets');

                if ((targetIndex + 1) !== totalTargets) return elements;

                let filteredElements = elements.filter(function (e) {
                    return !e.childNodes
                        || e.childNodes.length === 0
                        || [].slice.call(e.childNodes).every(function (c) {
                            return c.nodeType === Node.TEXT_NODE;
                        });
                });

                if (filteredElements.length === 0) {
                    return elements;
                }

                return filteredElements;
            }
        }
    }
};