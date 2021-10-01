import { createContext } from "react";

const ReadListContext = createContext({
  items: [],
  updateReadStatus: () => {},
});

export default ReadListContext;
