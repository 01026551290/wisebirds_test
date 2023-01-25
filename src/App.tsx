import {BrowserRouter, Route, Routes} from "react-router-dom";
import Campaign from "@/pages/Campaign";
import User from "@/pages/User";
import styled from "styled-components";

function App() {

  return (
    <$wrap>
      <BrowserRouter>
          <Routes>
              <Route path={'/'} element={<Campaign/>}/>
              <Route path={'/user'} element={<User/>}/>
          </Routes>
      </BrowserRouter>
    </$wrap>
  )
}

const $wrap = styled.div`
    width: 100vw;
`;

export default App
