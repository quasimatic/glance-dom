import Preprocessor from './preprocessor';
import defaultExtensions from '../extensions/default.js';
import defaultOptions from '../default-options';
import Extension from '../extensions';

let extensions = new Extension(defaultExtensions);

describe('Preprocessor', () => {

    it('should queue up for subject', () => {
        let preprocessor = new Preprocessor({extensions, defaultOptions});
        let commands = preprocessor.create('subject');

        commands.should.deep.equal([
            {command: 'containers'},
            {command: 'locate', option: 'custom-label', label: 'subject'},
            {command: 'locate', option: 'contains-text', label: 'subject'},
            {command: 'locate', option: 'value', label: 'subject'},
            {command: 'locate', option: 'attribute-placeholder', label: 'subject'},
            {command: 'locate', option: 'attribute-name', label: 'subject'},
            {command: 'locate', option: 'attribute-id', label: 'subject'},
            {command: 'locate', option: 'class', label: 'subject'},
            {command: 'locate', option: 'attribute-alt', label: 'subject'},
            {command: 'locate', option: 'attribute-type', label: 'subject'},
            {command: 'locate', option: 'node-type', label: 'subject'},
            {command: 'filter', option: 'visible', label: 'subject'},
            {command: 'filter', option: 'leaf-node-target', label: 'subject'},
            {command: 'filter', option: 'input-after', label: 'subject'},
            {command: 'filter', option: 'shortest-path', label: 'subject'},
            {command: 'intersect'}
        ]);
    });

    it('should queue up for scope and subject', () => {
        let preprocessor = new Preprocessor({extensions, defaultOptions});
        let commands = preprocessor.create('scope > subject');

        commands.should.deep.equal([
            {command: 'containers'},
            {command: 'locate', option: 'custom-label', label: 'scope'},
            {command: 'locate', option: 'contains-text', label: 'scope'},
            {command: 'locate', option: 'value', label: 'scope'},
            {command: 'locate', option: 'attribute-placeholder', label: 'scope'},
            {command: 'locate', option: 'attribute-name', label: 'scope'},
            {command: 'locate', option: 'attribute-id', label: 'scope'},
            {command: 'locate', option: 'class', label: 'scope'},
            {command: 'locate', option: 'attribute-alt', label: 'scope'},
            {command: 'locate', option: 'attribute-type', label: 'scope'},
            {command: 'locate', option: 'node-type', label: 'scope'},
            {command: 'filter', option: 'visible', label: 'scope'},
            {command: 'filter', option: 'leaf-node-target', label: 'scope'},
            {command: 'filter', option: 'input-after', label: 'scope'},
            {command: 'filter', option: 'shortest-path', label: 'scope'},
            {command: 'intersect'},
            {command: 'containers'},
            {command: 'locate', option: 'custom-label', label: 'subject'},
            {command: 'locate', option: 'contains-text', label: 'subject'},
            {command: 'locate', option: 'value', label: 'subject'},
            {command: 'locate', option: 'attribute-placeholder', label: 'subject'},
            {command: 'locate', option: 'attribute-name', label: 'subject'},
            {command: 'locate', option: 'attribute-id', label: 'subject'},
            {command: 'locate', option: 'class', label: 'subject'},
            {command: 'locate', option: 'attribute-alt', label: 'subject'},
            {command: 'locate', option: 'attribute-type', label: 'subject'},
            {command: 'locate', option: 'node-type', label: 'subject'},
            {command: 'filter', option: 'visible', label: 'subject'},
            {command: 'filter', option: 'leaf-node-target', label: 'subject'},
            {command: 'filter', option: 'input-after', label: 'subject'},
            {command: 'filter', option: 'shortest-path', label: 'subject'},
            {command: 'intersect'}
        ]);
    });
});