import containers from './containers';

function dispatch({command, extensions, glanceSelector, result}) {
    switch (command.command) {
        case 'containers':
            if (result.scopeElements) {
                result.containerElements = containers(result.scopeElements, result.subjectElements);
            }

            if (result.subjectElements) {
                result.scopeElements = result.subjectElements;
            }

            result.targetElements = [];
            result.subjectElements = [];
            break;

        case 'intersect':
            if (result.subjectElements.length > 0) {
                let subjectLookup = new Set(result.subjectElements);
                result.subjectElements = result.targetElements.filter(e => subjectLookup.has(e));
            }
            else {
                result.subjectElements = result.targetElements;
            }

            result.targetElements = [];
            break;

        case 'locate':
            let locator = extensions.getLocatorForOption(command.option, command.label);

            result.targetElements = result.targetElements.concat(locator({
                ...command,
                extensions,
                glanceSelector,
                containerElements: result.containerElements
            }));

            result.targetElements = [...new Set(result.targetElements)];

            break;

        case 'filter':
            let filter = extensions.getFilterForOption(command.option);
            result.targetElements = filter({
                ...command,
                extensions,
                elements: result.targetElements,
                scopeElements: result.scopeElements
            });
            break;
    }

    return result;
}

export default function ({commands = [], extensions, glanceSelector, containerElements}) {
    let result = commands.reduce((result, command) => dispatch({
        command,
        extensions,
        glanceSelector,
        result
    }), {containerElements});

    return result.subjectElements.length === 1 ? result.subjectElements[0] : result.subjectElements;
};