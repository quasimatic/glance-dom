import parser from '../parser';
import LocatorCollector from './locator-preprocessor';
import FilterCollector from './filter-preprocessor';
import Extensions from '../extensions';

export default class Preprocessor {
    constructor({extensions = new Extensions(), defaultOptions = []}) {
        this.extensions = extensions;
        this.defaultOptions = defaultOptions;
    }

    create(reference) {
        let data = parser.parse(reference);
        return data.reduce((result, scopes) => result.concat(this.processScopes(scopes)), []);
    }

    processScopes(scopes) {
        return scopes.reduce((result, target) => result.concat({command: 'containers'}).concat(this.locators(target)).concat(this.filters(target)), []).concat({command: 'intersect'});
    }

    locators(target) {
        let collector = new LocatorCollector(this);
        return collector.getLocatorCommands(target);
    }

    filters(target) {
        let collector = new FilterCollector(this);
        return collector.getFilterCommands(target);
    }
};
