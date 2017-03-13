import containers from './containers';

function dispatch({command, extensions, result}) {
    switch (command.command) {
        case 'containers':
            if (result.scopeElements) {
                result.containerElements = containers(result.scopeElements, result.subjectElements);
            }

            if (result.subjectElements) {
                result.scopeElements = result.subjectElements;
            }

            result.subjectElements = [];
            break;

        case 'locate':
            let locator = extensions.getLocatorForOption(command.option, command.label);
            result.subjectElements = result.subjectElements.concat(locator({
                label: command.label,
                option: command.option,
                extensions,
                containerElements: result.containerElements
            }));

            result.subjectElements = [...new Set(result.subjectElements)];
            break;

        case 'filter':
            let filter = extensions.getFilterForOption(command.option);
            result.subjectElements = filter({
                label: command.label,
                option: command.option,
                extensions,
                elements: result.subjectElements,
                scopeElements: result.scopeElements
            });
            break;
    }

    return result;
}

export default function ({commands = [], extensions}) {
    let result = commands.reduce((result, command) => dispatch({
        command,
        extensions,
        result
    }), {containerElements: [document.body]});

    return result.subjectElements.length === 1 ? result.subjectElements[0] : result.subjectElements;
};