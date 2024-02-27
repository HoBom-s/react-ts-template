import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Main } from "@/pages";

export const PublicRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};
