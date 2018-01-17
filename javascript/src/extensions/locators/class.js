import findByCSS from '../lib/css';
import log from '../../utils/log';
import reduce from '@arr/reduce';

export default {
	options: {
		'class': {
			locate: function({label, containerElements}) {
				log.debug('Searching as class name:', label);

				return reduce(containerElements, (result, containerElement) => result.concat(findByCSS(`.${label}`, containerElement)), []);
			}
		}
	}
};
