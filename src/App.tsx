import FrogList from './components/FrogList';
import Navbar from './components/Navbar';
import styles from './css/index.module.css';
import {Routes, Route} from 'react-router-dom';
import AddNewFrog from './components/AddNewFrog';
import FrogDetail from './components/FrogDetail';

function App() {
  return (
    <div className={styles.App}>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<FrogList/>}/>
        <Route path="/add-new" element={<AddNewFrog/>}/>
        <Route path="/frog/:id" element={<FrogDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
