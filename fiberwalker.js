const dataReqArr = [
  "fetch",
  "axios",
  "http",
  "https",
  "qwest",
  "superagent",
  "XMLHttpRequest",
];

const fiberwalker = (
  node,
  componentStore,
  treedata = { name: "App", children: [] }
) => {
  const dataReqArr = [
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

  if (node.child.sibling) {
    node = node.child.sibling;
    let name;
    if (typeof node.elementType == "string") {
      name = node.elementType;
    } else if (node.elementType.name) {
      name = node.elementType.name;
    } else {
      name = "anon.";
    }
    const currentNode = { name, children: [] };
    if (componentStore[name] !== undefined) {
      if (componentStore[name]) {
        //iterate through every entry and check request type
        const dataRequest = componentStore[name];
        for (let key in dataRequest) {
          if (dataReqArr.includes(dataRequest[key].reqType)) {
            currentNode.attributes = {
              containsFetch: `${dataRequest[key].reqType}`,
            };
          }
        }
      }
    }
    treedata.children.push(currentNode);

    if (node.sibling !== null) {
      node = node.sibling;
      let name;
      if (typeof node.elementType == "string") {
        name = node.elementType;
      } else if (node.elementType.name) {
        name = node.elementType.name;
      } else {
        name = "anon.";
      }
      const currentNode = { name, children: [] };
      if (componentStore[name] !== undefined) {
        if (componentStore[name]) {
          //iterate through every entry and check request type
          const dataRequest = componentStore[name];
          for (let key in dataRequest) {
            if (dataReqArr.includes(dataRequest[key].reqType)) {
              currentNode.attributes = {
                containsFetch: `${dataRequest[key].reqType}`,
              };
            }
          }
          treedata.children.push(currentNode);
        }
      }
      treedata.children.push(currentNode);
      if (node.child != null) {
        fiberwalker(
          node,
          componentStore,
          treedata.children[treedata.children.length - 1]
        );
      }
    }

    if (node.child != null) {
      fiberwalker(
        node,
        componentStore,
        treedata.children[treedata.children.length - 1]
      );
    }
  }

  if (node.child) {
    node = node.child;
    let name;
    if (typeof node.elementType == "string") {
      name = node.elementType;
    } else if (node.elementType.name) {
      name = node.elementType.name;
    } else {
      name = "anon.";
    }
    const currentNode = { name, children: [] };
    if (componentStore[name] !== undefined) {
      if (componentStore[name]) {
        //iterate through every entry and check request type
        const dataRequest = componentStore[name];
        for (let key in dataRequest) {
          if (dataReqArr.includes(dataRequest[key].reqType)) {
            currentNode.attributes = {
              containsFetch: `${dataRequest[key].reqType}`,
            };
          }
          treedata.children.push(currentNode);
        }
      }
    }
    //iterate through every entry and check request type
    treedata.children.push(currentNode);
    if (node.child != null) {
      fiberwalker(
        node,
        componentStore,
        treedata.children[treedata.children.length - 1]
      );
    }
  }
  return treedata;
};

module.exports = fiberwalker;
