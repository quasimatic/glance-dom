import log from '../../utils/log';

export default {
	options: {
		'displayed': {
			inverse: 'internal',

			filter: function visible({elements, label}, inverse = false) {
				log.debug('Filtering for elements matched with displayed properties');

				return elements.filter((e) => {
					let displayed = (e.innerText.indexOf(label) !== -1
						|| e.value && e.value.indexOf(label) !== -1
						|| e.tagName.toLowerCase() === "img");

					return !inverse ? displayed : !displayed;
				});
			}
		}
	}
};