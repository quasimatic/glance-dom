import log from '../../utils/log';
import filter from '@arr/filter';

export default {
	options: {
		'input-after': {
			filter: function inputafter({elements, scopeElements = []}) {
				log.debug('Filtering for sibling input next to scope');

				let siblings = filter(elements, function(e) {
					if (e.nodeName.toLowerCase() === 'input') {
						return e.previousElementSibling && e.previousElementSibling.nodeName.toLowerCase() !== 'input' && scopeElements.indexOf(e.previousElementSibling) !== -1;
					}

					return false;
				});

				return siblings.length === 0 ? elements : siblings;

			}
		}
	}
};