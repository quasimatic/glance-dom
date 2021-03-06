import log from '../../utils/log';

export default {
	options: {
		'lowest-level-matches': {
			check: function({options}) {
				return !options.includes('highest-level-matches');
			},
			filter: function closestdom({elements}) {
				log.debug('Filtering for the lowest level matches');

				return elements.filter(element => !elements.some(e => element !== e && element.contains(e)));
			}
		},
		'highest-level-matches': {
			check: function({options}) {
				return !options.includes('lowest-level-matches');
			},
			filter: function closestdom({elements}) {
				log.debug('Filtering for the highest level matches');

				return elements.filter(element => elements.some(e => element !== e && !e.contains(element)));
			}
		}
	}
};