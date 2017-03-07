import log from "../../log"

/*
 Searching the dom by xpath or css for value only gets the default. Inputs dynamically set don't update the dom which
 xpath and css won't find. The method is used to get search those dynamic values as well.
 */
export default {
    options: {
        "value": {
            locate: function ({target, containerElements}) {
                let {label} = target;
                log.debug("Searching in value:", label);

                return containerElements.reduce((result, scope) => {
                    let results = scope.querySelectorAll("button,input,option,param");

                    let elements = Array.prototype.slice.apply(results);

                    return result.concat(elements.filter(function (input) {
                        return input.value && input.value.toLowerCase().indexOf(label.toLowerCase()) !== -1;
                    }));
                }, []);
            }
        }
    }
}