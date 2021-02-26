import fiberwalker from "./fiberwalker";
import componentObj from "./componentStore";

export default function orgChartCreator() {
  console.log('hello', componentObj);
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
  return orgChart;
}





