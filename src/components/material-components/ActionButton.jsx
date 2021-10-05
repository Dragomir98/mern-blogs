import { Tooltip } from "@material-ui/core";

const ActionButton = (props) => (
  <Tooltip title={props.tooltip}>
    <div className={props.action} onClick={props.clickHandler}>
      {props.children}
    </div>
  </Tooltip>
);

export default ActionButton;
