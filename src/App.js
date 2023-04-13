import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
const Home = lazy(() => import("@containers/Home"));
const LoanSchedule = lazy(() => import("@containers/LoanSchedule"));
const LoadingScreen = lazy(() => import("@components/LoadingScreen"));

const App = () => {
  return (
    <Container maxWidth="xl">
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/loan-schedule/user/:userID/loan/:loanID" element={<LoanSchedule />} />
          <Route path="*" element={<div>Could not find page</div>}></Route>
        </Routes>
      </Suspense>
    </Container>
  );
};

export default App;
