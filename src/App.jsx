import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          {/* Add other routes */}
        </Routes>
      </Router>
    </>
  )
}

export default App
