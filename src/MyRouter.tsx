import { FC } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { NoPage } from "./pages/NoPage";
import { CreateRecipePage } from "./pages/recipe/CreateRecipePage";
import { ListRecipePage } from "./pages/recipe/ListRecipePage";
import { RecipePage } from "./pages/recipe/RecipePage";
import { UpdateRecipePage } from "./pages/recipe/UpdateRecipePage";
import { ViewRecipePage } from "./pages/recipe/ViewRecipePage";
import { Layout } from "./pages/shared/Layout";

export const MyRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Nesting routes adds them together, i.e.: "/" + "recipe" = "/recipe" */}
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="recipe" element={<RecipePage />}>
            <Route index element={<ListRecipePage />} />
            <Route path="create" element={<CreateRecipePage />} />
            <Route path="edit" element={<UpdateRecipePage />} />
            <Route path="view" element={<ViewRecipePage />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
