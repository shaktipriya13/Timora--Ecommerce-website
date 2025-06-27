import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';
import Policy from './pages/Policy';

function App() {
  // const [count, setCount] = useState(0)

  return (
    // Routes act as a container in which we hv all our Route
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/page404' element={<PageNotFound />} />
        <Route path='/policy' element={<Policy />} />
      </Routes>
    </>
  )
}

export default App
