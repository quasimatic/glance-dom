import ReactDOM from 'react-dom';

export default {
    get(...ids) {
        var result = ids.map(function (id) {
            return document.querySelector(`#${id}`);
        });

        return result.length == 1 ? result[0] : result;
    },

    render(jsx) {
        var div = document.createElement("div");
        document.body.appendChild(div);
        return ReactDOM.render(jsx, div);
    }
}