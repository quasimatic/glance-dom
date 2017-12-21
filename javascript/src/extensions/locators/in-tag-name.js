import findByCSS from "../lib/css"
import log from "../../utils/log"

export default {
    options: {
        "in-tag-name": {
            locate: function ({label, containerElements}) {
                log.debug("Searching by node type:", label);

                return containerElements.reduce((result, containerElement) => result.concat(findByCSS(`${label}`, containerElement)), []);
            }
        }
    }
}