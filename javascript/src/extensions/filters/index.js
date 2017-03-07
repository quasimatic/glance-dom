import log from "../../log";

export default {
    filter: {
        useDefaultFiltersIfFirst: true,
        apply: function ({elements, target}) {
            log.debug("Filtering by index");

            let attributes = target.options.filter(p => p !== null && !isNaN(p));

            if (attributes.length > 0) {
                return attributes.reduce((result, attribute) => {
                    let position = attribute;
                    log.debug("Selecting the", position, "element out of", elements.length);

                    if (position <= 0) {
                        throw new Error("Positions start at 1");
                    }

                    if (elements.length < position) {
                        throw new Error(`Position ${position} out of range`);
                    }

                    let i = position - 1;
                    return result.concat(elements[i]);
                }, []);
            }

            return elements;
        }
    }
};