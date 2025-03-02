import './App.css';
import Category from './components/admin/category/Category';
import DisplayAllCategory from './components/admin/category/DisplayAllCategory';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import SubCategory from './components/admin/subcategory/SubCategory';
import DisplayAllSubCategory from './components/admin/subcategory/DisplayAllSubCategory';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Category/>}/>
          <Route  path='/displayallcategory' element={<DisplayAllCategory/>}/>
          <Route path='/subcategory' element={<SubCategory/>}/>
          <Route path='/displayallsubcategory' element={<DisplayAllSubCategory/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
