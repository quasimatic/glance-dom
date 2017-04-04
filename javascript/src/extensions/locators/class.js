import findByCSS from "../lib/css"
import log from "../../utils/log"

export default {
    options: {
        "class": {
            locate: function ({label, containerElements}) {
                log.debug("Searching as class name:", label);

                return containerElements.reduce((result, containerElement) => result.concat(findByCSS(`.${label}`, containerElement)), []);
            }
        }
    }
}
