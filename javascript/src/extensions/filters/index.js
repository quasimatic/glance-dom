import log from '../../log';

export default {
    filter: {
        check: function ({option}) {
            return option !== null && !isNaN(option);
        },
        filter: function ({elements, option}) {
            log.debug('Filtering by index');

            if (option !== null && !isNaN(option)) {
                let position = parseInt(option);
                log.debug('Selecting the', position, 'element out of', elements.length);

                if (position <= 0) {
                    throw new Error('Positions start at 1');
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