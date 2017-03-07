import findByXPath from "../lib/xpath"
import log from "../../log"

export default {
    locator: {
        check: function ({target}) {
            let attributes = target.options.filter(p => isNaN(p) && p.indexOf("attribute-") > -1);
            return attributes.length > 0;
        },
        locate: function ({target, containerElements}) {
            let {label} = target;
            let attributes = target.options.filter(p => isNaN(p) && p.indexOf("attribute-") > -1);

            if (attributes.length > 0) {
                return containerElements.reduce((totalResult, containerElement) => {
                    let xxx = attributes.reduce((result, attribute) => {
                        let key = attribute.slice("attribute-".length);
                        log.debug("Searching " + key + " attribute:", label);

                        return result.concat(findByXPath(".//*[contains(translate(@" + key + ", 'ABCDEFGHJIKLMNOPQRSTUVWXYZ', 'abcdefghjiklmnopqrstuvwxyz'), translate('" + label + "', 'ABCDEFGHJIKLMNOPQRSTUVWXYZ', 'abcdefghjiklmnopqrstuvwxyz'))]", containerElement));
                    }, []);

                    return totalResult.concat(xxx);
                }, []);
            }

            return [];
        }
    }
}
