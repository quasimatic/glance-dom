import log from '../../utils/log';

function elementsFoundByDisplayProperties(elements, label, inverse) {
	return elements.filter((e) => {
		let displayed = e.innerText.indexOf(label) !== -1
			|| e.value && e.value.indexOf(label) !== -1
			|| e.tagName.toLowerCase() === 'img';

		return inverse ? !displayed : displayed;
	});
}

export default {
	options: {
		'displayed': {
			filter: function visible({elements, label}) {
				log.debug('Filtering for elements matched with displayed properties');

				return elementsFoundByDisplayProperties(elements, label, false);
			}
		},
		'internal': {
			filter: function visible({elements, label}) {
				log.debug('Filtering for elements matched with internal properties');

				return elementsFoundByDisplayProperties(elements, label, true);
			}
		}
	}
};