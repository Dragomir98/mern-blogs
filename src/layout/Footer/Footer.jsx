import { Box, Container, Divider, Grid, Typography, Link } from "@mui/material";
import FooterItem from "./FooterItem";

export default function Footer() {
  return (
    <Box component="footer" display="flex" flexDirection="column" p={2}>
      <Container maxWidth="lg">
        <address>
          <Grid container spacing={5}>
            <FooterItem textAlign="left" title="Email us:">
              <Link href="mailto:test@test.com">test@email.com</Link>
            </FooterItem>
            <FooterItem textAlign="left" title="Call us:">
              <Link href="tel:012-345-6789">0123456789</Link>
            </FooterItem>
          </Grid>
        </address>
        <Box component={Divider} my={2} variant="middle" />
      </Container>
      <Typography align={"center"} variant={"h6"}>
        All rights reserved Company &copy; 2021
      </Typography>
    </Box>
  );
}
