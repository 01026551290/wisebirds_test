import {BrowserRouter, Route, Routes} from "react-router-dom";
import Campaign from "@/pages/Campaign";
import User from "@/pages/User";

function App() {

  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path={'/'} element={<Campaign/>}/>
              <Route path={'/user'} element={<User/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
