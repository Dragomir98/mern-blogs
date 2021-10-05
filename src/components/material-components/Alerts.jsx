import { Alert } from "@material-ui/lab";

export const ErrorAlert = ({ message }) => (
  <Alert variant="filled" severity="error">
    <strong>{message}</strong>
  </Alert>
);

export const SuccessAlert = ({ message }) => (
  <Alert variant="filled" severity="success">
    <strong>{message}</strong>
  </Alert>
);

export const NotLoggedInAlert = (props) => {
  return (
    <Alert severity="info" className={props.classes}>
      <strong>{props.message}</strong>
    </Alert>
  );
};
