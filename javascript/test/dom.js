import React from 'react';
import ReactDOM from 'react-dom';

export default {
	get(...ids) {
		var result = ids.map(id => document.querySelector(`#${id}`));
		return result.length === 1 ? result[0] : result;
	},

	getArray(...ids) {
		return ids.map(id => document.querySelector(`#${id}`));
	},

	render(jsx) {
		document.body.innerHTML = '';
		var div = document.createElement('div');
		document.body.appendChild(div);
		return ReactDOM.render(jsx, div);
	}
};