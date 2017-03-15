import Preprocessor from './filter-preprocessor';
import Extensions from '../extensions';

let extensions = new Extensions([{
    options: {
        'default-filter-1': () => {
        },

        'in-filter': {
            inverse: 'out-filter',
            filter: () => {

            }
        }
    }
}]);

let defaultOptions = ['default-filter-1'];

function formatResult(commands) {
    return commands.map(c => ({command: c.command, label: c.label, option: c.option}));
}

describe('Preprocessor: filters', () => {
    it('should apply default filters', () => {
        let preprocessor = new Preprocessor({extensions, defaultOptions});

        let commands = preprocessor.getFilterCommands({
            label: 'subject',
            options: [],
            useDefaultOptions: true
        });

        formatResult(commands).should.deep.equal([
            {
                command: 'filter',
                label: 'subject',
                option: 'default-filter-1'
            }
        ]);
    });

    it('should not apply option without filter', () => {
        let customExtension = {
            options: {
                'custom-label': {
                    locate: 'custom'
                }
            }
        };

        extensions.add(customExtension);

        let preprocessor = new Preprocessor({extensions, defaultOptions});

        let commands = preprocessor.getFilterCommands({
            label: 'subject',
            options: ['custom-label'],
            useDefaultOptions: true
        });

        formatResult(commands).should.deep.equal([
            {
                command: 'filter',
                label: 'subject',
                option: 'default-filter-1'
            }
        ]);
    });

    it('should apply additional filter by option', () => {
        let customExtension = {
            options: {
                'custom-filter': () => {
                }
            }
        };

        extensions.add(customExtension);

        let preprocessor = new Preprocessor({extensions, defaultOptions});

        let commands = preprocessor.getFilterCommands({
            label: 'subject',
            options: ['custom-filter'],
            useDefaultOptions: true
        });

        formatResult(commands).should.deep.equal([
            {
                command: 'filter',
                label: 'subject',
                option: 'default-filter-1'
            },
            {
                command: 'filter',
                label: 'subject',
                option: 'custom-filter'
            }
        ]);
    });

    it('should apply filter by option without defaults', () => {
        extensions.add({
            options: {
                'custom-filter': () => {
                }

            }
        });

        let preprocessor = new Preprocessor({extensions, defaultOptions});

        let commands = preprocessor.getFilterCommands({
            label: 'subject',
            options: ['custom-filter'],
            useDefaultOptions: false
        });

        formatResult(commands).should.deep.equal([
            {
                command: 'filter',
                label: 'subject',
                option: 'custom-filter'
            }
        ]);
    });

    it('should apply custom label filter with defaults', () => {
        extensions.add({
            labels: {
                'custom-label': {
                    filter: () => {
                    }
                }
            }
        });

        let preprocessor = new Preprocessor({extensions, defaultOptions});

        let commands = preprocessor.getFilterCommands({
            label: 'custom-label',
            options: [],
            useDefaultOptions: true
        });

        formatResult(commands).should.deep.equal([
            {
                command: 'filter',
                label: 'custom-label',
                option: 'custom-label'
            },
            {
                command: 'filter',
                label: 'custom-label',
                option: 'default-filter-1'
            }
        ]);
    });

    it('should apply custom label filter without defaults', () => {
        extensions.add({
            labels: {
                'custom-label': {
                    filter: () => {
                    }
                }
            }
        });

        let preprocessor = new Preprocessor({extensions, defaultOptions});

        let commands = preprocessor.getFilterCommands({
            label: 'custom-label',
            options: [],
            useDefaultOptions: false
        });

        formatResult(commands).should.deep.equal([
            {
                command: 'filter',
                label: 'custom-label',
                option: 'custom-label'
            }
        ]);
    });

    it('should not apply to custom label locator as an array', () => {
        extensions.add({
            labels: {
                'custom-label': ['item-1', 'item-2']
            }
        });

        let preprocessor = new Preprocessor({extensions, defaultOptions});

        let commands = preprocessor.getFilterCommands({
            label: 'custom-label',
            options: [],
            useDefaultOptions: true
        });

        formatResult(commands).should.deep.equal([
            {
                command: 'filter',
                label: 'custom-label',
                option: 'default-filter-1'
            }
        ]);
    });

    it('should apply dynamic filter with defaults', () => {
        extensions.add({
            filter: {
                check: () => true,
                filter: () => {
                }
            }
        });

        let preprocessor = new Preprocessor({extensions, defaultOptions});

        let commands = preprocessor.getFilterCommands({
            label: 'subject',
            options: ['dynamic'],
            useDefaultOptions: true
        });

        formatResult(commands).should.deep.equal([
            {
                command: 'filter',
                label: 'subject',
                option: 'default-filter-1'
            },
            {
                command: 'filter',
                label: 'subject',
                option: 'dynamic'
            }
        ]);
    });

    it('should apply dynamic filter without defaults', () => {
        extensions.add({
            filter: {
                check: () => true,
                filter: () => {
                }
            }
        });

        let preprocessor = new Preprocessor({extensions, defaultOptions});

        let commands = preprocessor.getFilterCommands({
            label: 'subject',
            options: ['dynamic'],
            useDefaultOptions: false
        });

        formatResult(commands).should.deep.equal([
            {
                command: 'filter',
                label: 'subject',
                option: 'dynamic'
            }
        ]);
    });

    it('should apply filter if inverse is not provided', () => {
        let preprocessor = new Preprocessor({extensions, defaultOptions});
        let commands = preprocessor.getFilterCommands({
            label: 'subject',
            options: ['in-filter'],
            useDefaultOptions: false
        });

        formatResult(commands).should.deep.equal([{command: 'filter', label: 'subject', option: 'in-filter'}]);
    });

    it('should apply filter if inverse is not provided with defaults', () => {
        let preprocessor = new Preprocessor({extensions, defaultOptions: defaultOptions.concat('in-filter')});
        let commands = preprocessor.getFilterCommands({
            label: 'subject',
            options: [],
            useDefaultOptions: true
        });

        formatResult(commands).should.deep.equal([
            {
                command: 'filter',
                label: 'subject',
                option: 'default-filter-1'
            },
            {command: 'filter', label: 'subject', option: 'in-filter'}]);
    });

    it('should apply filter if default explicity specified', () => {
        let preprocessor = new Preprocessor({extensions, defaultOptions: ['in-filter'].concat(defaultOptions)});
        let commands = preprocessor.getFilterCommands({
            label: 'subject',
            options: ['in-filter'],
            useDefaultOptions: true
        });

        formatResult(commands).should.deep.equal([
            {
                command: 'filter',
                label: 'subject',
                option: 'default-filter-1'
            },
            {command: 'filter', label: 'subject', option: 'in-filter'}]);
    });


    it('should remove option if filter and inverse declared', () => {
        let preprocessor = new Preprocessor({extensions, defaultOptions});
        let commands = preprocessor.getFilterCommands({
            label: 'subject',
            options: ['in-filter', 'out-filter'],
            useDefaultOptions: false
        });

        formatResult(commands).should.deep.equal([]);
    });

    it('should remove option if filter and inverse declared with defaults', () => {
        let preprocessor = new Preprocessor({extensions, defaultOptions});
        let commands = preprocessor.getFilterCommands({
            label: 'subject',
            options: ['in-filter', 'out-filter'],
            useDefaultOptions: true
        });

        formatResult(commands).should.deep.equal([{
            command: 'filter',
            label: 'subject',
            option: 'default-filter-1'
        }]);
    });

    it('should override default option if inverse is specified', () => {
        let preprocessor = new Preprocessor({extensions, defaultOptions: defaultOptions.concat('in-filter')});
        let commands = preprocessor.getFilterCommands({
            label: 'subject',
            options: ['out-filter'],
            useDefaultOptions: true
        });

        formatResult(commands).should.deep.equal([
            {command: 'filter', label: 'subject', option: 'default-filter-1'},
            {command: 'filter', label: 'subject', option: 'out-filter'}
        ]);
    });

});