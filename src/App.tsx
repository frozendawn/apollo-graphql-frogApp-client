import FrogList from './components/FrogList';
import Navbar from './components/Navbar';
import styles from './css/index.module.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import AddNewFrog from './components/AddNewFrog';
import FrogDetail from './components/FrogDetail';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import ModeratorRoute from './components/ModeratorRoute';

function App() {
  return (
    <div className={styles.App}>
      <Navbar />
      <Routes>
        <Route path="/" element={<FrogList/>}/>
        <Route element={<ProtectedRoute/>}>
         <Route path="/add-new" element={<AddNewFrog/>}/>
        </Route>
        <Route element={<ModeratorRoute/>}>
         <Route path="/dashboard" element={<Dashboard/>}/>
        </Route>
        <Route path="/frog/:id" element={<FrogDetail/>}/>
        <Route path="/frog/:id" element={<FrogDetail/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </div>
  );
}

export default App;
