// import dom from '../../../test/dom';
// import dynamicLocatorExtension from './dynamic-locator';
// import Extensions from '../index';
//
// describe('Locator: Dynamic Locator', () => {
//     let dynamicLocator = dynamicLocatorExtension.options['dynamic-locator'].locate;
//
//     beforeEach(() => document.body.innerHTML = '');
//
//     it('should find by custom label', () => {
//         dom.render(<p id="subject">complex</p>);
//
//         dynamicLocator({
//             target: {label: 'custom'},
//             containerElements: [document.body],
//             extensions: new Extensions([
//                 {
//                     locator: {
//                         check: () => true,
//                         locate: () => dom.get('subject')
//                     }
//                 }
//             ])
//         }).should.deep.equal([dom.get('subject')]);
//     });
// });