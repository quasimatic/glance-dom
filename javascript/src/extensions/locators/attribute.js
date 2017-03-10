import findByXPath from '../lib/xpath';
import log from '../../log';

export default {
    locator: {
        check: function ({option}) {
            return isNaN(option) && option.indexOf('attribute-') > -1;
        },
        locate: function ({label, option, containerElements}) {
            if (isNaN(option) && option.indexOf('attribute-') > -1) {
                return containerElements.reduce((totalResult, containerElement) => {
                    let key = option.slice('attribute-'.length);

                    log.debug('Searching ' + key + ' attribute:', label);

                    let result = findByXPath('.//*[contains(translate(@' + key + ', \'ABCDEFGHJIKLMNOPQRSTUVWXYZ\', \'abcdefghjiklmnopqrstuvwxyz\'), translate(\'' + label + '\', \'ABCDEFGHJIKLMNOPQRSTUVWXYZ\', \'abcdefghjiklmnopqrstuvwxyz\'))]', containerElement);

                    return totalResult.concat(result);
                }, []);
            }

            return [];
        }
    }
};
