import { Editor } from "react-draft-wysiwyg";
import imageUpload from "../../api/imageUpload";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";

const BlogEditor = ({ description, descriptionHandler }) => {
  const uploadCallback = (file) => {
    imageUpload(file);
  };

  return (
    <Editor
      editorState={description}
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
      editorStyle={{ height: "300px", padding: "10px", cursor: "text" }}
      toolbar={{ image: { uploadCallback } }}
      onEditorStateChange={(editorState) => descriptionHandler(editorState)}
    />
  );
};

export default BlogEditor;

export const convertFromJSONToHTML = (text) => {
  try {
    return { __html: stateToHTML(convertFromRaw(text)) };
  } catch (exp) {
    console.log(exp);
    return { __html: "Error" };
  }
};
