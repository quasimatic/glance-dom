import log from '../../utils/log';

function sqr(x) {
	return x * x;
}

function distance(base, item) {
	return sqr(base.x - item.x) + sqr(base.y - item.y);
}

function distToSegment(base, item1, item2) {
	let l = distance(item1, item2);

	if (l === 0) return distance(base, item1);
	let t = ((base.x - item1.x) * (item2.x - item1.x) + (base.y - item1.y) * (item2.y - item1.y)) / l;

	if (t < 0) return distance(base, item1);
	if (t > 1) return distance(base, item2);

	return distance(base, {
		x: item1.x + t * (item2.x - item1.x),
		y: item1.y + t * (item2.y - item1.y)
	});
}

function getSizeAndLocation(element) {
	let rect = element.getBoundingClientRect();

	return {
		element,
		...rect,
		x: rect.left,
		y: rect.top
	};
}

function shortestDistance(a, t) {
	let p1 = t;
	let p2 = {
		x: t.x + t.width,
		y: t.y
	};
	let p3 = {
		x: t.x + t.width,
		y: t.y + t.height
	};
	let p4 = {
		x: t.x,
		y: t.y + t.height
	};

	return Math.min(distToSegment(a, p1, p2), distToSegment(a, p2, p3), distToSegment(a, p4, p3), distToSegment(a, p1, p4));
}

export default {
	options: {
		'closest': {
			filter: function({elements, scopeElements}) {
				log.debug('Filtering for closest element to scope');

				return scopeElements.map(scope => {
					let base = getSizeAndLocation(scope);

					let baseID = base.element;
					let a = base;

					a.x = a.x + (base.width / 2);
					a.y = a.y + (base.height / 2);

					let targets = elements.map(e => getSizeAndLocation(e));

					let sorted = targets.filter((t) => t.element !== baseID).sort(function(x, y) {
						let l = shortestDistance(a, x);
						let r = shortestDistance(a, y);
						return (l < r) ? -1 : (l > r) ? 1 : 0;
					});

					return sorted[0].element;
				});
			}
		}
	}
};