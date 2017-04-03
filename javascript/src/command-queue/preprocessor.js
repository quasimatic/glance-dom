import parser from 'glance-parser';
import LocatorCollector from './locator-preprocessor';
import FilterCollector from './filter-preprocessor';
import Extensions from '../extensions';

export default class Preprocessor {
    constructor({extensions = new Extensions(), defaultOptions = []} = {
                    extensions: new Extensions(),
                    defaultOptions: []
                }) {
        this.extensions = extensions;
        this.defaultOptions = defaultOptions;
    }

    create(reference) {
        this.targetCount = 0;
        let scopes = parser.parse(reference);
        let totalTargets = scopes.reduce((total, s) => total + s.length, 0);
        let commands = [];

        if (this.extensions.getBeforeAllHooks().length > 0) commands.push({command: 'beforeall'});

        commands = commands.concat(scopes.reduce((result, scope) => result.concat({command: 'containers'}, this.processIntersect(scope, totalTargets)), []));

        if (this.extensions.getAfterAllHooks().length > 0) commands.push({command: 'afterall'});

        return commands;
    }

    processIntersect(intersects, totalTargets) {
        let result = intersects.reduce((result, target, index) => {
            return result.concat(this.locators(target, this.targetCount + index, totalTargets), this.filters(target, this.targetCount + index, totalTargets), {command: 'intersect'});
        }, []);

        this.targetCount += intersects.length;
        return result;
    }

    locators(target, targetIndex, totalTargets) {
        let collector = new LocatorCollector(this);
        return collector.getLocatorCommands(target).map(c => ({...c, targetIndex, totalTargets}));
    }

    filters(target, targetIndex, totalTargets) {
        let collector = new FilterCollector(this);
        return collector.getFilterCommands(target).map(c => ({...c, targetIndex, totalTargets}));
    }
};
