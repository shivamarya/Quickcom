import './App.css';
import Category from './components/admin/category/Category';
import DisplayAllCategory from './components/admin/category/DisplayAllCategory';

function App() {
  return (
    <div style={{fontFamily:'Kanit',display:'flex',flexDirection:'column'}}>
      {/* <Category /> */}
      <DisplayAllCategory />
    </div>
  );
}

export default App;
