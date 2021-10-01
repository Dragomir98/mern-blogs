import apis from "../api";
import ReadListContext from "./readlist-context";

export function ReadListProvider(props) {
  const updateReadStatus = async (itemId, payload, toReadLater) => {
    try {
      const updatedData = {
        ...payload,
        toReadLater: !toReadLater,
      };

      const updatedBlog = await apis
        .updateBlogById(itemId, updatedData)
        .then((res) => JSON.parse(res.config.data));
      return updatedBlog;
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  const readListContext = {
    updateReadStatus,
  };

  return (
    <ReadListContext.Provider value={readListContext}>
      {props.children}
    </ReadListContext.Provider>
  );
}
