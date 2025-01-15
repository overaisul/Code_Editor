import { FaJs } from "react-icons/fa";
import { GrReactjs } from "react-icons/gr";
import { IoLogoCss3 } from "react-icons/io";
import { TiHtml5 } from "react-icons/ti";

export const FileIcon = ({ extension }) => {
  return (
    <>
      {extension === "js" && (
        <FaJs color="yellow" style={{ fontSize: "20px" }} />
      )}
      {extension === "jsx" && (
        <GrReactjs color="blue" style={{ fontSize: "20px" }} />
      )}
      {extension === "css" && (
        <IoLogoCss3 color="pink" style={{ fontSize: "20px" }} />
      )}
      {extension === "html" && (
        <TiHtml5 color="green" style={{ fontSize: "20px" }} />
      )}
    </>
  );
};
