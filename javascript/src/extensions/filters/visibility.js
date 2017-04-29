import log from '../../utils/log';

export default {
	options: {
		'visible': {
			check: function({options}) {
				return !options.includes('hidden');
			},
			filter: function visible({elements}) {
				log.debug('Filtering for visible elements');

				return elements.filter(function(e) {
					if (e.tagName.toLowerCase() === 'option' || e.offsetParent) {
						return true;
					}
					else {
						let style = window.getComputedStyle(e);
						return style.position === 'fixed' && style.display !== 'none' && style.visibility !== 'hidden';
					}
				});
			}
		},
		'hidden': {
			check: function({options}) {
				return !options.includes('visible');
			},
			filter: function visible({elements}) {
				log.debug('Filtering for hidden elements');

				return elements.filter(function(e) {
					let style = window.getComputedStyle(e);
					return style.display === 'none' || style.visibility === 'hidden';
				});
			}
		}
	}
};