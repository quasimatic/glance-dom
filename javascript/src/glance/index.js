import Preprocessor from '../command-queue/preprocessor';
import Extensions from '../extensions';
import defaultExtensions from '../extensions/default';
import defaultOptions from '../default-options';
import processCommands from './processor';
import requiredParameter from '../utils/required-parameter';

function createGlanceSelector() {
    this.extensions = new Extensions(defaultExtensions);
    this.selector = (reference = requiredParameter('Selector required')) => {
        let preprocessor = new Preprocessor({extensions: this.extensions, defaultOptions});

        let commands = preprocessor.create(reference);

        return processCommands({commands, extensions: this.extensions, glanceSelector: this.selector});
    };

    this.selector.addExtension = (extension) => {
        this.extensions.add(extension);
    };

    return this.selector;
}

export default new createGlanceSelector();