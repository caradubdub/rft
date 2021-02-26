import orgChartCreator from "./orgChartCreator";
import Tree from "react-d3-tree";
export default function FetchTree() {
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: "80vw", height: "20vh" }}>
      <Tree data={orgChartCreator()} orientation={"vertical"} />
    </div>
  );
}

