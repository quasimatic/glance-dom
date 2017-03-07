import findByCSS from "../lib/css"
import log from "../../log"

export default {
    options: {
        "class": {
            locate: function ({target, containerElements}) {
                let {label} = target;
                log.debug("Searching as class name:", label);

                return containerElements.reduce((result, containerElement) => result.concat(findByCSS(`.${label}`, containerElement)), []);
            }
        }
    }
}
