import findByCSS from "../lib/css"
import log from "../../log"

export default {
    options: {
        "css": {
            locate: function ({target, containerElements}) {
                let {label} = target;
                log.debug("Searching as css:", label);

                return containerElements.reduce((result, containerElement) => result.concat(findByCSS(`${label}`, containerElement)), []);
            }
        }
    }
}