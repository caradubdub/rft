// const express = require("express");
// const app = express();
// const path = require("path");

// app.use(express.static(path.join(__dirname, "./public")));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// start

import React, { useState, useEffect } from "react";
import ReactDOM, { render } from "react-dom";

import { findNodeByComponentName, Utils } from "react-fiber-traverse";
import Tree from "react-d3-tree";

console.log("ran");
function Fetchtree() {
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: "80vw", height: "20vh" }}>
      <Tree data={orgChart} orientation={"vertical"} />
    </div>
  );
}

// function ProfilePage() {
//   const [user, setUser] = useState(null);
//   const [character, setCharacter] = useState(1);

//   useEffect(() => {
//     fetchUser(character).then((u) => setUser(u));
//   }, [character]);

//   if (user === null) {
//     return <p>Loading profile...</p>;
//   }
//   return (
//     <div>
//       <h1>{user}</h1>
//       <ProfileTimeline user={user} character={character} />
//       <button onClick={() => setCharacter(character + 1)}>
//         Change Character
//       </button>
//     </div>
//   );
// }

// function ProfileTimeline(props) {
//   const [posts, setPosts] = useState(null);

//   useEffect(() => {
//     fetchPosts(props.character).then((p) => setPosts(p));
//   }, [props.character]);

//   if (posts === null) {
//     return <h2>Loading posts...</h2>;
//   }
//   return (
//     <div>
//       {posts.length === 1 ? (
//         <h5>
//           {props.user} has been seen on {posts.length} starship
//         </h5>
//       ) : (
//         <h5>
//           {props.user} has been seen on {posts.length} starships
//         </h5>
//       )}
//       <ul>
//         {posts.map((post, idx) => (
//           <li key={idx}>{post}</li>
//         ))}
//       </ul>
//       <Fetchtree />
//     </div>
//   );
// }

// const rootElement = document.getElementById("root");
// render(<ProfilePage />, rootElement);

const fiberwalker = (node, treedata = { name: "App", children: [] }) => {
  if (node.child.sibling) {
    node = node.child.sibling;

    if (node.elementType !== null && typeof node.elementType !== "string") {
      if (node.elementType.name) {
        treedata.children.push({
          name: node.elementType.name,
          children: [],
        });
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
      treedata.children.push({ name: node.elementType.name, children: [] });
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
const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

devTools.onCommitFiberRoot = (function (original) {
  //root
  return function (...args) {
    //if (count === 0) {
    __ReactFiberDOM = args[1];
    console.log("dom: ", __ReactFiberDOM.current);
    orgChart = fiberwalker(__ReactFiberDOM.current);
    console.log("orgChart: ", orgChart);
    // count++;
    //}
    return original(...args);
  };
})(devTools.onCommitFiberRoot);



//end

// app.listen(8080, () =>
//   console.log(`${path.join(__dirname, "./public/index.html")}`)
// );


module.exports = {fiberwalker, orgChart};