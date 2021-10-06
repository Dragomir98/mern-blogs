import { Alert } from '@mui/material';

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

export const AlertMessage = ({ children, type, classes }) => {
  return (
    <Alert severity={type} className={classes}>
      {children}
    </Alert>
  );
};
