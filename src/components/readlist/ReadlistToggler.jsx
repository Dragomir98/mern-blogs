import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Tooltip } from "@mui/material";
import { addToList, removeFromList } from "../../store/readlist-slice";
import { useDispatch } from "react-redux";

const ReadlistToggler = ({ readState, data }) => {
  const dispatch = useDispatch();

  const addToReadlistHandler = () => {
    dispatch(
      addToList({
        id: data._id,
        title: data.title,
        image: data.image,
        description: data.description,
      })
    );
  };

  const removeFromReadlistHandler = () => {
    dispatch(removeFromList(data._id));
  };

  return (
    <Tooltip
      title={`${readState ? "Remove from Readlist" : "Add to Readlist"}`}
    >
      {readState ? (
        <BookmarkIcon
          color="secondary"
          onClick={() => removeFromReadlistHandler()}
        />
      ) : (
        <BookmarkBorderIcon
          color="secondary"
          onClick={() => addToReadlistHandler()}
        />
      )}
    </Tooltip>
  );
};

export default ReadlistToggler;
