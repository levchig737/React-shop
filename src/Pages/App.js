import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddItem from "./pages/AddItem";
import AddBrand from "./pages/AddBrand";
import Items from "./pages/Items";
import Update from "./pages/Update";
import Brands from "./pages/Brands";
import Categories from "./pages/Categories";
import AddCategory from "./pages/AddCategory";
import AddImage from "./pages/AddImage";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Items />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/brands/add" element={<AddBrand />} />
          <Route path="/categories/add" element={<AddCategory />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/images/add/:id" element={<AddImage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
