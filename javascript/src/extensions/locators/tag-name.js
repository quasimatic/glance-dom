import findByCSS from "../lib/css"
import log from "../../utils/log"
import reduce from '@arr/reduce';
export default {
    options: {
        "tag-name": {
            locate: function ({label, containerElements}) {
                log.debug("Searching by node type:", label);

                return reduce(containerElements, (result, containerElement) => result.concat(findByCSS(`${label}`, containerElement)), []);
            }
        }
    }
}