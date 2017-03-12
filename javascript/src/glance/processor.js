function dispatch({command, extensions, result}) {
    result.subjectElements = result.subjectElements || [];

    switch (command.command) {
        case 'locate':
            let locator = extensions.getLocatorForOption(command.option, command.label);
            result.subjectElements = result.subjectElements.concat(locator({
                label: command.label,
                option: command.option,
                extensions,
                containerElements: [document.body]
            }));

            result.subjectElements = [...new Set(result.subjectElements)];
            break;

        case 'filter':
            let filter = extensions.getFilterForOption(command.option);
            result.subjectElements = filter({
                label: command.label,
                option: command.option,
                extensions,
                elements: result.subjectElements
            });
    }

    return result;
}

export default function ({commands = [], extensions}) {
    let result = commands.reduce((result, command) => dispatch({command, extensions, result}), {});

    return result.subjectElements.length === 1 ? result.subjectElements[0] : result.subjectElements;
};