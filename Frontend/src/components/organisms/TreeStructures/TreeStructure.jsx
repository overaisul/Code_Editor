import { useTreeStructureStore } from "../../../stores/treeStructureStore.js";
import { useEffect } from "react";
import { TreeNode } from "../../molecules/TreeNode/TreeNode.jsx";

export const TreeStructure = () => {
  const { treeStructure, setTreeStructure } = useTreeStructureStore();

  useEffect(() => {
    if (treeStructure) {
      console.log(treeStructure);
    } else {
      setTreeStructure();
    }
  }, [setTreeStructure]);
  return (
    <>
      <div>
        <TreeNode fileFolderData={treeStructure} />
      </div>
    </>
  );
};
