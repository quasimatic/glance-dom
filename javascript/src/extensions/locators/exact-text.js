import findByXPath from "../lib/xpath";
import log from "../../utils/log"
import reduce from '@arr/reduce';
export default {
    options: {
        "exact-text": {
            locate: function ({label, containerElements}) {
                log.debug("Searching for text that exact matches:", label);

                return reduce(containerElements, (result, containerElement) => result.concat(findByXPath(".//*[not(self::script) and text()='" + label + "']", containerElement)), []);
            }
        }
    }
};
