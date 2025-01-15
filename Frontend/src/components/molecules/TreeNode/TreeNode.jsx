import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FileIcon } from "../../atoms/fileIcon/FileIcon";
import { useEditorSocketStore } from "../../../stores/editorSocketStore";

export const TreeNode = ({ fileFolderData }) => {
  const [visibility, setVisibility] = useState({});

  const { editorSocket } = useEditorSocketStore();

  function toggleVisibilty(name) {
    setVisibility({
      ...visibility,
      [name]: !visibility[name],
    });
  }

  function handleDoubleClick(fileFolderData) {
    console.log("doubleClickOn", fileFolderData);
    editorSocket.emit("readFile", {
      pathToFileOrFolder: fileFolderData.path,
    });
  }

  return (
    <>
      {fileFolderData && (
        <div
          style={{
            paddingLeft: "10px",
            color: "white",
          }}
        >
          {fileFolderData.children ? (
            <button
              onClick={() => toggleVisibilty(fileFolderData.name)}
              style={{
                border: "none",
                cursor: "pointer",
                outline: "none",
                color: "white",
                backgroundColor: "transparent",
                paddingTop: "10px",
                fontSize: "14px",
              }}
            >
              {" "}
              {visibility[fileFolderData.name] ? (
                <MdKeyboardArrowDown
                  style={{ height: "10px", width: "10px" }}
                />
              ) : (
                <MdKeyboardArrowRight
                  style={{ height: "10px", width: "10px" }}
                />
              )}
              {fileFolderData.name}
            </button>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <FileIcon extension={fileFolderData.name.split(".").pop()} />
              <p
                style={{
                  fontSize: "15px",
                  paddingTop: "5px",
                  cursor: "pointer",
                  marginLeft: "2px",
                  color: "white",
                }}
                onDoubleClick={() => handleDoubleClick(fileFolderData)}
              >
                {fileFolderData.name}
              </p>
            </div>
          )}
          {visibility[fileFolderData.name] &&
            fileFolderData.children &&
            fileFolderData.children.map((child) => (
              <TreeNode fileFolderData={child} key={child.name} />
            ))}
        </div>
      )}
    </>
  );
};
