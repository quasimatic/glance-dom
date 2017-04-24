import log from '../../utils/log';

export default {
    options: {
        'visible': {
            inverse: 'hidden',

            filter: function visible({elements}, inverse = false) {
                log.debug('Filtering for visible elements');

                return elements.filter(function (e) {
                    if (!inverse) {
                        if (e.tagName.toLowerCase() === 'option' || e.offsetParent) {
                            return true;
                        }
                        else {
                            let style = window.getComputedStyle(e);
                            return style.position === 'fixed' && style.display !== 'none' && style.visibility !== 'hidden';
                        }
                    }
                    else {
                        let style = window.getComputedStyle(e);
                        return style.display === 'none' || style.visibility === 'hidden';
                    }
                });
            }
        }
    }
};