import fiberwalker from "./fiberwalker";
import componentObj from "./componentStore";
import React from "react";
import Tree from "react-d3-tree";

export default function Fetchtree() {
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: "80vw", height: "80vh" }}>
      <Tree data={orgChart} orientation={"vertical"} />
    </div>
  );
}

let orgChart;

let __ReactFiberDOM;
const devTools = global.__REACT_DEVTOOLS_GLOBAL_HOOK__;

devTools.onCommitFiberRoot = (function (original) {
  return function (...args) {
    __ReactFiberDOM = args[1];
    console.log("dom: ", __ReactFiberDOM.current);
    orgChart = fiberwalker(__ReactFiberDOM.current, componentObj);
    console.log("orgChart: ", orgChart);

    return original(...args);
  };
})(devTools.onCommitFiberRoot);
