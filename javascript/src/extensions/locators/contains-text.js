import findByXPath from '../lib/xpath';
import log from '../../log';
import parentElements from '../../utils/parent-elements';

export default {
    options: {
        'contains-text': {
            locate: function ({label, containerElements}) {
                log.debug('Searching for text that contains:', label);

                let results = containerElements.reduce((result, containerElement) => result.concat(findByXPath('.//*[not(self::script) and not(self::noscript) and not(self::style) and text()]/../*[contains(translate(normalize-space(string(.)), \'ABCDEFGHJIKLMNOPQRSTUVWXYZ\', \'abcdefghjiklmnopqrstuvwxyz\'),translate(\'' + label + '\', \'ABCDEFGHJIKLMNOPQRSTUVWXYZ\', \'abcdefghjiklmnopqrstuvwxyz\'))]', containerElement)), []);
                let lookup = new Set([].concat.apply([], parentElements(results, false)));

                return results.filter(r => !lookup.has(r));
            }
        }
    }
};