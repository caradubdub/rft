// const fiberwalker = (node, treedata = { name: "App", children: [] }) => {
//   if (node.child.sibling) {
//     node = node.child.sibling;

//     if (node.elementType !== null && typeof node.elementType !== "string") {
//       if (node.elementType.name) {
//         treedata.children.push({
//           name: node.elementType.name,
//           children: [],
//         });
//         if (node.child !== null) {
//           fiberwalker(node, treedata.children[treedata.children.length - 1]);
//         }
//       } else {
//         if (node.child !== null) {
//           fiberwalker(node, treedata);
//         }
//       }
//     }
//   }

//   if (node.child) {
//     node = node.child;
//     if (node.elementType !== null && typeof node.elementType !== "string") {
//       treedata.children.push({ name: node.elementType.name, children: [] });
//       if (node.child != null) {
//         fiberwalker(node, treedata.children[treedata.children.length - 1]);
//       }
//     } else {
//       if (node.child !== null) {
//         fiberwalker(node, treedata);
//       }
//     }
//   }
//   return treedata;
// };
// let orgChart;

// let __ReactFiberDOM;
// const devTools = global.__REACT_DEVTOOLS_GLOBAL_HOOK__;

// devTools.onCommitFiberRoot = (function (original) {
//   return function (...args) {
//     __ReactFiberDOM = args[1];
//     console.log("dom: ", __ReactFiberDOM.current);
//     orgChart = fiberwalker(__ReactFiberDOM.current);
//     console.log("orgChart: ", orgChart);

//     return original(...args);
//   };
// })(devTools.onCommitFiberRoot);

// module.exports = { fiberwalker, orgChart };
