import findByXPath from '../lib/xpath';
import log from '../../utils/log';
import parentElements from '../../utils/parent-elements';

export default {
    options: {
        'contains-text': {
            locate: function({label, containerElements}) {
                log.debug('Searching for text that contains:', label);

                let results = containerElements.reduce((result, containerElement) => result.concat(findByXPath(`.//*[text()]/../*[not(descendant-or-self::script) and not(descendant-or-self::noscript) and not(descendant-or-self::style) and contains(translate(normalize-space(string(.)), 'ABCDEFGHJIKLMNOPQRSTUVWXYZ', 'abcdefghjiklmnopqrstuvwxyz'),translate('${label}', 'ABCDEFGHJIKLMNOPQRSTUVWXYZ', 'abcdefghjiklmnopqrstuvwxyz'))]`, containerElement)), []);
                let lookup = new Set([].concat.apply([], parentElements(results, containerElements, false)));

                return results.filter(r => !lookup.has(r));
            }
        }
    }
};