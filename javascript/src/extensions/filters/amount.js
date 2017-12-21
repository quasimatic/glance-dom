import log from '../../utils/log';

let single = {
	options: {
		single: {
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
			filter: function({elements}) {
				log.debug('Return all elements');

				return elements;
			}
		}
	}
};

export {single, many};
