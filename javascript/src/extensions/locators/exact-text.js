import findByXPath from "../lib/xpath";
import log from "../../log"

export default {
    options: {
        "exact-text": {
            locate: function ({target, containerElements}) {
                let {label} = target;
                log.debug("Searching for text that exact matches:", label);

                return containerElements.reduce((result, containerElement) => result.concat(findByXPath(".//*[not(self::script) and text()='" + label + "']", containerElement)), []);
            }
        }
    }
};
