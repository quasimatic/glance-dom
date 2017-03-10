import Preprocessor from '../command-queue/preprocessor';
import Extensions from '../extensions';
import defaultExtensions from '../extensions/default';
import defaultOptions from '../default-options';
import processCommands from './processor';

function createGlanceSelector() {
    let selector = function (reference) {
        let extensions = new Extensions(defaultExtensions);
        let preprocessor = new Preprocessor({extensions, defaultOptions});

        let commands = preprocessor.create(reference);

        return processCommands({commands, extensions});
    };

    return selector;
}

export default createGlanceSelector();