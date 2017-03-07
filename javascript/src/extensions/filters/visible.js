import log from "../../log";

export default {
    options: {
        "visible": {
            filter: function visible({elements}) {
                log.debug("Filtering for visible elements");

                return elements.filter(function (e) {
                    if (e.tagName.toLowerCase() === "option" || e.offsetParent) {
                        return true;
                    }
                    else {
                        let style = window.getComputedStyle(e);
                        return style.position === 'fixed' && style.display !== 'none' && style.visibility !== 'hidden';
                    }
                });
            }
        }
    }
};