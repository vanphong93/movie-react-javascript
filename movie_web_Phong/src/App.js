import { BrowserRouter, Route, Routes } from "react-router-dom";
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Detail from "./Pages/DetailMovies/Detail";
import HomePage from "./Pages/HomaPage/HomePage";
import Layout from "./Layout/Layout";
import Spiner from "./Components/Spiner/Spiner";
import BookTicket from "./Pages/BuyTicket/BookTicket";
import UserInfo from "./Pages/UserInfor/UserInfo";

function App() {
  return (
    <div>
      <Spiner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            exact
            path="/detail/:id"
            element={
              <Layout>
                <Detail />
              </Layout>
            }
          />
          <Route
            exact
            path="/book/:id"
            element={
              <Layout>
                <BookTicket />
              </Layout>
            }
          />
          <Route
            exact
            path="/user"
            element={
              <Layout>
                <UserInfo />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;