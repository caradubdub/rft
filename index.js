import fiberwalker from "./fiberwalker";
import dependenciesGraph from "./parser";

async function fetchTree(entryFile) {
  //dependenciesFile run with entryFile
  const componentStore = await dependenciesGraph(entryFile);
  console.log(componentStore);
  let orgChart;

  let __ReactFiberDOM;
  const devTools = global.__REACT_DEVTOOLS_GLOBAL_HOOK__;

  devTools.onCommitFiberRoot = (function (original) {
    return function (...args) {
      __ReactFiberDOM = args[1];
      console.log("dom: ", __ReactFiberDOM.current);
      orgChart = fiberwalker(__ReactFiberDOM.current, componentStore);
      console.log("orgChart: ", orgChart);

      return original(...args);
    };
  })(devTools.onCommitFiberRoot);
  return orgChart;
}
