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
        let scopes = parser.parse(reference);
        return scopes.reduce((result, scope) => result.concat({command: 'containers'}, this.processIntersect(scope)), []);
    }

    processIntersect(intersects) {
        return intersects.reduce((result, target) => {
            return result.concat(this.locators(target), this.filters(target), {command: 'intersect'});
        }, []);
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
