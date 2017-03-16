import Preprocessor from '../command-queue/preprocessor';
import Extensions from '../extensions';
import DefaultExtensions from '../extensions/default';
import DefaultOptions from '../default-options';
import processCommands from './processor';
import requiredParameter from '../utils/required-parameter';
import Parser from '../parser';
import log from '../utils/log';

function createGlanceSelector() {
    this.extensions = new Extensions(DefaultExtensions);
    this.selector = (reference = requiredParameter('Selector required'), config = {}) => {
        let {containerElements = [document.documentElement]} = config;

        let preprocessor = new Preprocessor({extensions: this.extensions, defaultOptions: DefaultOptions});

        let commands = preprocessor.create(reference);

        return processCommands({commands, extensions: this.extensions, glanceSelector: this.selector, containerElements});
    };

    this.selector.addExtension = (extension) => {
        this.extensions.add(extension);
    };

    this.selector.setLogLevel = (level) => {
        log.setLogLevel(level);
    };

    return this.selector;
}

export default new createGlanceSelector();
export {Parser, DefaultExtensions, DefaultOptions};