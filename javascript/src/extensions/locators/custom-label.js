import log from "../../log"

export default {
    options: {
        "custom-label": {
            locate: function (data) {
                let {label, extensions} = data;

                log.debug("Searching by label extension:", label);

                let locator = extensions.getLocatorForLabel(label);

                return [].concat(locator(data));
            }
        }
    }
}