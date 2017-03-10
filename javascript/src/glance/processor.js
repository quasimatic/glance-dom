function dispatch({command, extensions}) {
    switch (command.command) {
        case 'locate':
            let locator = extensions.getLocatorForOption(command.option, command.label);
            let result = locator({
                label: command.label,
                option: command.option,
                extensions,
                containerElements: [document.body]
            });
            return result;

    }
    return [];
}

export default function ({commands = [], extensions}) {
    return commands.reduce((result, command) => result.concat(dispatch({command, extensions})), []);
};