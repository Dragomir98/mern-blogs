import { Link } from "@material-ui/core";
import { Box, Container, Divider, Grid, Typography } from "@material-ui/core";

export default function Footer() {
  return (
    <Box component="footer" display="flex" flexDirection="column" p={2}>
      <Container maxWidth="md">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Box textAlign="left">
              <span>
                Email us:{" "}
                <Link href="mailto: test@email.com">test@email.com</Link>
              </span>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box textAlign="left">
              <span>
                Call us: <Link href="tel:012-345-6789">0123456789</Link>
              </span>
            </Box>
          </Grid>
        </Grid>
        <Box component={Divider} my={2} variant="middle" />
      </Container>
      <Typography align={"center"} variant={"h6"}>
        All rights reserved Company &copy; 2021
      </Typography>
    </Box>
  );
}
