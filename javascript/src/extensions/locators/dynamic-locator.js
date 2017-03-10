// import log from "../../log"
//
// export default {
//     options: {
//         "dynamic-locator": {
//             locate: function (data) {
//                 let {target, extensions} = data;
//                 let {label} = target;
//
//                 log.debug("Searching by label extension:", label);
//
//                 let locate = extensions.getLocatorForOption(label, target);
//
//                 return locate(data);
//             }
//         }
//     }
// }