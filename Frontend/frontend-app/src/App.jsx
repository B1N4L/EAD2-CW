
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes.jsx';

function App() {

  return (
    <div className="App">
      <Router>
        <AppRoutes/>
      </Router>
    </div>
  )
}

export default App
