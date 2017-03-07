export default function (label, containerElement) {
    let results = [];

    let xpathResult = document.evaluate(label, containerElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    for (let i = 0; i < xpathResult.snapshotLength; i++) {
        results.push(xpathResult.snapshotItem(i));
    }

    return results;
}