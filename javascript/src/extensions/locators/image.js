import findByXPath from '../lib/xpath';
import log from '../../utils/log';
import reduce from '@arr/reduce';
export default {
	options: {
		'image': {
			locate: function({label, containerElements}) {
				log.debug('Searching for images:', label);

				return reduce(containerElements, (totalResult, containerElement) => {
					let result = findByXPath('.//img[contains(translate(@src, \'ABCDEFGHJIKLMNOPQRSTUVWXYZ\', \'abcdefghjiklmnopqrstuvwxyz\'), translate(\'' + label + '\', \'ABCDEFGHJIKLMNOPQRSTUVWXYZ\', \'abcdefghjiklmnopqrstuvwxyz\'))]', containerElement);
					return totalResult.concat(result);
				}, []);
			}
		}
	}
};