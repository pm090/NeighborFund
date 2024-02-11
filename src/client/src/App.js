import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Landing from "./components/landing";
import CauseList from "./components/causes";
import BrowseCauses from "./components/browse_causes";
import CreateCause from "./components/create_cause";

export const serverurl = (path) => {
    return "http://localhost:4000" + path;
}

const App = () => {
    return (
        <div>
            {/*<Navbar /> */}
            <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/my-causes" element={<CauseList />} />
                <Route path="/browse-causes" element={<BrowseCauses />} />
                <Route path="/create-cause" element={<CreateCause />} />
            </Routes>
        </div>
    );
};
export default App;
