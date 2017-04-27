import findByCSS from '../lib/css';
import log from '../../utils/log';

export default {
	options: {
		'id': {
			locate: function({label}) {
				log.debug('Searching for ID:', label);

				let element = document.getElementById(label);
				return element ? [element] : [];
			}
		}
	}
};
