import log from '../../utils/log';

export default {
	options: {
		'leaf-node': {
			filter: function visible({elements}) {
				log.debug('Filtering for leaf node targets');

				return elements.filter(function(e) {
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