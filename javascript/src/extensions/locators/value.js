import log from '../../utils/log';
import reduce from '@arr/reduce';
import filter from '@arr/filter';
/*
 Searching the dom by xpath or css for value only gets the default. Inputs dynamically set don't update the dom which
 xpath and css won't find. The method is used to get search those dynamic values as well.
 */
export default {
	options: {
		'value': {
			locate: function({label, containerElements}) {
				log.debug('Searching in value:', label);

				return reduce(containerElements, (result, scope) => {
					let results = scope.querySelectorAll('button,input,option,param');

					let elements = Array.prototype.slice.apply(results);

					return result.concat(filter(elements, function(input) {
						return input.value && input.value.toLowerCase().indexOf(label.toLowerCase()) !== -1;
					}));
				}, []);
			}
		}
	}
};