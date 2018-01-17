import log from '../../utils/log';
import filter from '@arr/filter';

export default {
	options: {
		'leaf-node': {
			filter: function visible({elements}) {
				log.debug('Filtering for leaf node targets');

				return filter(elements, function(e) {
					return !e.childNodes
						|| e.childNodes.length === 0
						|| [].slice.call(e.childNodes).every(function(c) {
							return c.nodeType === Node.TEXT_NODE;
						});
				});
			}
		}
	}
};