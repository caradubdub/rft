const reqTypeArr = [
  "fetch",
  "axios",
  "http",
  "https",
  "qwest",
  "superagent",
  "XMLHttpRequest",
];

function Node(name) {
  this.name = name;
  this.children = [];
}

const fiberwalker = (
  node,
  treedata = { name: "App", children: [] },
  componentStore
) => {
  if (node.child.sibling) {
    node = node.child.sibling;

    if (node.elementType !== null && typeof node.elementType !== "string") {
      if (node.elementType.name) {
        if (componentStore.node.elementType.name) {
          const currentNode = new Node(node.elementType.name);
          //iterate through every entry and check request type
          const dataRequest = componentStore.node.elementType.name;
          for (let key in dataRequest) {
            if (dataReqArr.includes(dataRequest.key.reqType)) {
              currentNode.attributes = {
                containsFetch: `${dataRequest.key.reqType}`,
              };
            }
          }
        }
        treedata.children.push(currentNode);
        if (node.child !== null) {
          fiberwalker(node, treedata.children[treedata.children.length - 1]);
        }
      } else {
        if (node.child !== null) {
          fiberwalker(node, treedata);
        }
      }
    }
  }

  if (node.child) {
    node = node.child;
    if (node.elementType !== null && typeof node.elementType !== "string") {
      if (node.elementType.name) {
        if (componentStore.node.elementType.name) {
          const currentNode = new Node(node.elementType.name);
          //iterate through every entry and check request type
          const dataRequest = componentStore.node.elementType.name;
          for (let key in dataRequest) {
            if (dataReqArr.includes(dataRequest.key.reqType)) {
              currentNode.attributes = {
                containsFetch: `${dataRequest.key.reqType}`,
              };
            }
          }
        }
      treedata.children.push(currentNode);
      if (node.child != null) {
        fiberwalker(node, treedata.children[treedata.children.length - 1]);
      }
    } else {
      if (node.child !== null) {
        fiberwalker(node, treedata);
      }
    }
  }
  return treedata;
};
let orgChart;

let __ReactFiberDOM;
const devTools = global.__REACT_DEVTOOLS_GLOBAL_HOOK__;

devTools.onCommitFiberRoot = (function (original) {
  return function (...args) {
    __ReactFiberDOM = args[1];
    console.log("dom: ", __ReactFiberDOM.current);
    orgChart = fiberwalker(__ReactFiberDOM.current);
    console.log("orgChart: ", orgChart);

    return original(...args);
  };
})(devTools.onCommitFiberRoot);

module.exports = { fiberwalker, orgChart }
