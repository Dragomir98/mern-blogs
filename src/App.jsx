import "./App.scss";
import { Redirect, Route, Switch } from "react-router-dom";
import BlogsList from "./components/blog-pages/BlogsList";
import Layout from "./layout/Layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lazy } from "react";
import { Suspense } from "react";
import Loading from "./components/material-components/Loading";

const theme = createTheme({
  palette: {
    primary: {
      main: "#b84252",
    },
    secondary: {
      main: "#7351c4",
    },
  },
  spacing: [0, 5, 10, 15, 25, 50],
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
});

const BlogsAdd = lazy(() => import("./components/blog-pages/BlogsAdd"));
const BlogsUpdate = lazy(() => import("./components/blog-pages/BlogsUpdate"));
const BlogDetails = lazy(() => import("./components/blog-pages/BlogsDetails"));
const UserData = lazy(() => import("./components/account/UserData"));
const PageNotFound = lazy(() => import("./404"));
const Readlist = lazy(() => import("./components/readlist/Readlist"));

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/blogs" />
            </Route>
            <Route path="/blogs" exact component={BlogsList} />
            <Route path="/blogs/read-later" exact component={Readlist} />
            <Route path="/blogs/:id" exact component={BlogDetails} />
            <Route path="/blog/add" exact component={BlogsAdd} />
            <Route path="/blogs/update/:id" exact component={BlogsUpdate} />
            <Route path="/account" exact component={UserData} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Suspense>
      </Layout>
    </ThemeProvider>
  );
}
