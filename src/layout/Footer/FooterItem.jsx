import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  footerItem: {
    display: "flex",
  },
  [theme.breakpoints.up("sm")]: {
    footerItem: {
      flexDirection: "row",
      alignItems: "center",
    },
    itemTitle: {
      paddingRight: theme.spacing(1),
    },
  },
  [theme.breakpoints.down("sm")]: {
    footerItem: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
}));

const FooterItem = ({ textAlign, title, children }) => {
  const classes = useStyles();

  return (
    <Grid item={true} xs={12} sm={6}>
      <Box textAlign={textAlign}>
        <div className={classes.footerItem}>
          <Typography className={classes.itemTitle}>{title}</Typography>
          {children}
        </div>
      </Box>
    </Grid>
  );
};

export default FooterItem;
