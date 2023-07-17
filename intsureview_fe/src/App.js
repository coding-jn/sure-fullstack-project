import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route exact path='/' element={<Dashboard />} />
          <Route element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
