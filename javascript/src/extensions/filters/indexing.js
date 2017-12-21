import log from '../../utils/log';

let index = {
	filter: {
		check: function({option}) {
			return option !== null && !isNaN(option) && parseInt(option) > 0;
		},
		filter: function({elements, option}) {
			log.debug('Filtering by index');

			if (option !== null && !isNaN(option)) {
				let position = parseInt(option);
				log.debug('Selecting the', position, 'element out of', elements.length);

				if (position === 0) {
					throw new Error('Position 0 not supported, must be 1 or greater');
				}

				if (elements.length < position) {
					throw new Error(`Position ${position} out of range`);
				}

				let i = position - 1;

				return [elements[i]];
			}

			return elements;
		}
	}
};

let negativeIndex = {
	filter: {
		check: function({option}) {
			return option !== null && !isNaN(option) && parseInt(option) < 0;
		},
		filter: function({elements, option}) {
			log.debug('Filtering by negative index');

			if (option !== null && !isNaN(option)) {
				let position = parseInt(option);
				log.debug('Selecting the', position, 'element out of', elements.length);

				if (position === 0) {
					throw new Error('Position 0 not supported, must be -1 or lower');
				}

				if (elements.length < Math.abs(position)) {
					throw new Error(`Position ${position} out of range`);
				}

				let i = position;

				return [elements[elements.length + position]];
			}

			return elements;
		}
	}
};

export {index, negativeIndex};
