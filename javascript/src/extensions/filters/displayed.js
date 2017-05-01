import log from '../../utils/log';

function elementsFoundByDisplayProperties(elements, label, inverse) {
	return elements.filter((e) => {
		let lowercasedLabel = label.toLowerCase();
		let displayed = e.textContent.toLowerCase().indexOf(lowercasedLabel) !== -1
			|| e.value && e.value.toLowerCase().indexOf(lowercasedLabel) !== -1
			|| e.tagName.toLowerCase() === 'img';

		return inverse ? !displayed : displayed;
	});
}

export default {
	options: {
		'displayed': {
			check: function({options}) {
				return !options.includes('internal');
			},
			filter: function visible({elements, label}) {
				log.debug('Filtering for elements matched with displayed properties');

				return elementsFoundByDisplayProperties(elements, label, false);
			}
		},
		'internal': {
			check: function({options}) {
				return !options.includes('displayed');
			},
			filter: function visible({elements, label}) {
				log.debug('Filtering for elements matched with internal properties');

				return elementsFoundByDisplayProperties(elements, label, true);
			}
		},
		'displayed-otherwise-internal': {
			check: function({options}) {
				return !options.includes('displayed') && !options.includes('internal');
			},
			filter: function visible({elements, label}) {
				log.debug('Filtering for elements matched with displayed properties otherwise internal ones');

				let displayedElements = elementsFoundByDisplayProperties(elements, label, false);
				log.debug('DisplayedElements:', displayedElements.length);
				return displayedElements.length !== 0 ? displayedElements : elements;
			}
		}
	}
};