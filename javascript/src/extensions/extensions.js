export default class Extensions {
    static beforeScopeEvent(data, extensions) {
        return extensions.filter(e => e.beforeScope).forEach(e => e.beforeScope(data));
    }

    static afterScopeEvent(data, extensions){
        return extensions.filter(e => e.afterScope).forEach(e => e.afterScope(data));
    }

    static labels(extensions) {
        return extensions
            .filter(e => e.labels)
            .reduce((l, e) => Object.assign(l, e.labels), {});
    }

    static options(extensions) {
        return extensions
            .filter(e => e.options)
            .reduce((l, e) => Object.assign(l, e.options), {});
    }
}