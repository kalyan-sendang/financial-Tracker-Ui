import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "./site/SiteLayout";

const AppRoutes = () => {
    return (
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<SiteLayout />}/>
            <Route index element = {<HomePage />} />
        </Routes>
        </BrowserRouter>
        );
};
export default AppRoutes;