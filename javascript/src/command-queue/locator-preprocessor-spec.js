import Extensions from '../extensions';
import Preprocessor from './locator-preprocessor';

let extensions = new Extensions([{
    options: {
        'default-locator-1': {
            locate: 'custom'
        }
    }
}]);

let defaultOptions = ['default-locator-1'];

describe('Preprocessor: locators', () => {
    it('should apply default locators', () => {
        let preprocessor = new Preprocessor({extensions, defaultOptions});

        let commands = preprocessor.getLocatorCommands({
            label: 'subject',
            options: [],
            useDefaultOptions: true
        });

        commands.should.deep.equal([
            {
                command: 'locate',
                label: 'subject',
                option: 'default-locator-1'
            }
        ]);
    });

    it('should not apply option without locator', () => {
        let customExtension = {
            options: {
                'custom-filter': () => {
                }
            }
        };

        extensions.add(customExtension);

        let preprocessor = new Preprocessor({extensions, defaultOptions});

        let commands = preprocessor.getLocatorCommands({
            label: 'subject',
            options: ['custom-locator'],
            useDefaultOptions: true
        });

        commands.should.deep.equal([
            {
                command: 'locate',
                label: 'subject',
                option: 'default-locator-1'
            }
        ]);
    });

    it('should apply additional locator by option', () => {
        let customExtension = {
            options: {
                'custom-locator': {
                    locate: 'custom'
                }
            }
        };

        extensions.add(customExtension);

        let preprocessor = new Preprocessor({extensions, defaultOptions});

        let commands = preprocessor.getLocatorCommands({
            label: 'subject',
            options: ['custom-locator'],
            useDefaultOptions: true
        });

        commands.should.deep.equal([
            {
                command: 'locate',
                label: 'subject',
                option: 'default-locator-1'
            },
            {
                command: 'locate',
                label: 'subject',
                option: 'custom-locator'
            }
        ]);
    });

    it('should apply locator by option without defaults', () => {
        extensions.add({
            options: {
                'custom-locator': {
                    locate: 'custom'
                }
            }
        });

        let preprocessor = new Preprocessor({extensions, defaultOptions});

        let commands = preprocessor.getLocatorCommands({
            label: 'subject',
            options: ['custom-locator'],
            useDefaultOptions: false
        });

        commands.should.deep.equal([
            {
                command: 'locate',
                label: 'subject',
                option: 'custom-locator',
            }
        ]);
    });

    it('should apply custom label locator with defaults', () => {
        extensions.add({
            labels: {
                'custom-label': 'custom'
            }
        });

        let preprocessor = new Preprocessor({extensions, defaultOptions});

        let commands = preprocessor.getLocatorCommands({
            label: 'custom-label',
            options: [],
            useDefaultOptions: true
        });

        commands.should.deep.equal([
            {
                command: 'locate',
                label: 'custom-label',
                option: 'custom-label'
            },
            {
                command: 'locate',
                label: 'custom-label',
                option: 'default-locator-1'
            }
        ]);
    });

    it('should apply custom label locator without defaults', () => {
        extensions.add({
            labels: {
                'custom-label': 'custom'
            }
        });

        let preprocessor = new Preprocessor({extensions, defaultOptions});

        let commands = preprocessor.getLocatorCommands({
            label: 'custom-label',
            options: [],
            useDefaultOptions: false
        });

        commands.should.deep.equal([
            {
                command: 'locate',
                label: 'custom-label',
                option: 'custom-label'
            }
        ]);
    });

    it('should apply dynamic locator with defaults', () => {
        extensions.add({
            locator: {
                check: () => true,
                locate: () => {
                }
            }
        });

        let preprocessor = new Preprocessor({extensions, defaultOptions});

        let commands = preprocessor.getLocatorCommands({
            label: 'subject',
            options: ['dynamic'],
            useDefaultOptions: true
        });

        commands.should.deep.equal([
            {
                command: 'locate',
                label: 'subject',
                option: 'default-locator-1'
            },
            {
                command: 'locate',
                label: 'subject',
                option: 'dynamic'
            }
        ]);
    });

    it('should apply dynamic locator without defaults', () => {
        extensions.add({
            locator: {
                check: () => true,
                locate: () => {
                }
            }
        });

        let preprocessor = new Preprocessor({extensions, defaultOptions});

        let commands = preprocessor.getLocatorCommands({
            label: 'subject',
            options: ['dynamic'],
            useDefaultOptions: false
        });

        commands.should.deep.equal([
            {
                command: 'locate',
                label: 'subject',
                option: 'dynamic'
            }
        ]);
    });
});
