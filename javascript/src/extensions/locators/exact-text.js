import findByXPath from "../lib/xpath";
import log from "../../utils/log"

export default {
    options: {
        "exact-text": {
            locate: function ({label, containerElements}) {
                log.debug("Searching for text that exact matches:", label);

                return containerElements.reduce((result, containerElement) => result.concat(findByXPath(".//*[not(self::script) and text()='" + label + "']", containerElement)), []);
            }
        }
    }
};
