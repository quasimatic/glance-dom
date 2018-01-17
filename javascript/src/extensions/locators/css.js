import findByCSS from '../lib/css';
import log from '../../utils/log';
import reduce from '@arr/reduce';

export default {
	options: {
		'css': {
			locate: function({label, containerElements}) {
				log.debug('Searching as css:', label);

				return reduce(containerElements, (result, containerElement) => result.concat(findByCSS(`${label}`, containerElement)), []);
			}
		}
	}
};