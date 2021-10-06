import { Button } from "@mui/material";

const LoggedOutMenu = (props) => (
  <Button variant="contained" color="secondary" onClick={props.onLogin}>
    Login
  </Button>
);

export default LoggedOutMenu;
