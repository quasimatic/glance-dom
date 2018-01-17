import findByXPath from '../lib/xpath';
import log from '../../utils/log';
import parentElements from '../../utils/parent-elements';
import reduce from '@arr/reduce';
import filter from '@arr/filter';

export default {
	options: {
		'contains-text': {
			locate: function({label, containerElements}) {
				log.debug('Searching for text that contains:', label);

				let results = reduce(containerElements, (result, containerElement) => result.concat(findByXPath(`.//*[text()]/../*[not(descendant-or-self::script) and not(descendant-or-self::noscript) and not(descendant-or-self::style) and contains(translate(normalize-space(string(.)), 'ABCDEFGHJIKLMNOPQRSTUVWXYZ', 'abcdefghjiklmnopqrstuvwxyz'),translate('${label}', 'ABCDEFGHJIKLMNOPQRSTUVWXYZ', 'abcdefghjiklmnopqrstuvwxyz'))]`, containerElement)), []);
				let lookup = new Set([].concat.apply([], parentElements(results, containerElements, false)));

				return filter(results, r => !lookup.has(r));
			}
		}
	}
};