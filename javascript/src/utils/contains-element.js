export default function(parent, child) {
	while (child && child !== parent)
		child = child.parentNode;

	return !!child;
}