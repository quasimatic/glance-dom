import dom from '../../test/dom';
import containers from './containers';

beforeEach(() => document.body.innerHTML = '');

describe('Containers', () => {
    it('should get container elements for scopes and subjects', () => {
        dom.render(<div>
            <div id="container">
                <div id="scope"></div>
                <div id="subject"></div>
            </div>
        </div>);

        containers([dom.get('scope')], [dom.get('subject')]).should.deep.equal([dom.get('container')]);
    });

    it('should get multiple containers', () => {
        dom.render(<div>
            <div id="container-1">
                <div id="scope-1"></div>
                <div id="subject-1"></div>
            </div>
            <div id="container-2">
                <div id="scope-2"></div>
                <div id="subject-2"></div>
            </div>
        </div>);

        containers(dom.get('scope-1', 'scope-2'), dom.get('subject-1', 'subject-2')).should.deep.equal(dom.get('container-1', 'container-2'));
    });
});
