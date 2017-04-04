import log from '../../utils/log';

export default {
	options: {
		'shortest-path': {
			filter: function closestdom({elements, containerElements = [document.documentElement], scopeElements = [], target}) {
				log.debug('Filtering for shortest scope and target');

				let containerLookup = new Set(containerElements.map(c => c.parentNode));
				let elementsForDistance = [];
				let distanceToScopeLookup = {};

				function addToLookup(element, distance) {
					elementsForDistance.push(element);
					let i = elementsForDistance.indexOf(element);
					distanceToScopeLookup[i] = distance;
				}

				function lookup(element) {
					let i = elementsForDistance.indexOf(element);
					if (i === -1) return null;

					return distanceToScopeLookup[i];
				}

				function siblingDistanceToParent(element) {
					return Array.prototype.indexOf.call(element.parentNode.childNodes, element);
				}

				if (scopeElements.length === 0) return elements;

				scopeElements.forEach(function(v) {
					let p = v;
					let i = 0;

					while (p !== null && p.outerHTML !== null) {
						let distanceToScope = lookup(p);

						if (!distanceToScope || i < distanceToScope) {
							addToLookup(p, i);
						}

						++i;

						p = p.parentNode;

						if (containerLookup.has(p)) break;
					}
				});

				let closestLevel = -1;
				let closestElements = [];

				elements.forEach(function(element) {
					let parent = element;
					let distanceToScope = lookup(parent);
					let distance = 0;

					while ((closestLevel === -1 || !distanceToScope || distanceToScope + distance <= closestLevel) && parent !== null && parent.outerHTML !== null) {
						if (distanceToScope || distanceToScope === 0) {
							distanceToScope += distance;

							if (distanceToScope < closestLevel) {
								closestElements = [];
							}

							closestLevel = distanceToScope;
							closestElements.push(element);
							break;
						}

						distance = Math.max(siblingDistanceToParent(parent), distance);

						parent = parent.parentNode;

						if (containerLookup.has(parent)) break;

						distanceToScope = lookup(parent);
					}
				});

				return closestElements;
			}
		}
	}
};