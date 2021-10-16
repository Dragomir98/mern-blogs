import "./App.scss";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Layout from "./layout/Layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lazy } from "react";
import { Suspense } from "react";
import Loading from "./components/UI/Loading";

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

const BlogAdd = lazy(() => import("./components/pages/BlogAdd"));
const BlogUpdate = lazy(() => import("./components/pages/BlogUpdate"));
const BlogDetails = lazy(() => import("./components/pages/BlogDetails"));
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
            <Route path="/blogs" exact component={Home} />
            <Route path="/blogs/read-later" exact component={Readlist} />
            <Route path="/blogs/:id" exact component={BlogDetails} />
            <Route path="/blog/add" exact component={BlogAdd} />
            <Route path="/blogs/update/:id" exact component={BlogUpdate} />
            <Route path="/account" exact component={UserData} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Suspense>
      </Layout>
    </ThemeProvider>
  );
}
