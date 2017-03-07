import findByCSS from "../lib/css"
import log from "../../log"

export default {
    options: {
        "node-type": {
            locate: function ({target, containerElements}) {
                let {label} = target;

                log.debug("Searching by node type:", label);

                return containerElements.reduce((result, containerElement) => result.concat(findByCSS(`${label}`, containerElement)), []);
            }
        }
    }
}