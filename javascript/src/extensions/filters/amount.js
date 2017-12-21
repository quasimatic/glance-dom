import log from '../../utils/log';

let single = {
	options: {
		single: {
			check: function({options}) {
				if (options.indexOf('single') !== -1 && options.indexOf('many') !== -1)
					throw new Error('Using single and many together is not supported. Please pick one');

				return true;
			},
			filter: function({elements}) {
				log.debug('Returning single element');

				if (elements.length === 0) {
					throw new Error('No element found');
				}

				if (elements.length > 1) {
					throw new Error('More than one element found');
				}

				return elements[0];
			}
		}
	}
};

let many = {
	options: {
		many: {
			check: function({options}) {
				if (options.indexOf('single') !== -1 && options.indexOf('many') !== -1)
					throw new Error('Using single and many together is not supported. Please pick one');

				return true;
			},
			filter: function({elements, options}) {
				log.debug('Return all elements');

				return elements;
			}
		}
	}
};

export {single, many};
