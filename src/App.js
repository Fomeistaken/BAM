import{BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Classes from './Components/Classes';
import Error from './Components/Error';
import Profile from './Components/Profile';
import Video from './Components/Video';
import Blog from './Blog/Blog';

function App() {
  return (
   <>
   <Router>
    <Navbar/>
    <div className='min-h-screen'>
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/' element={<Home/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/blog' element={<Blog/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/courses' element={<Classes/>} />
      <Route path='/videos/:id' element={<Video/>} />
      <Route path='/profile' element={<Profile/>} />
      {/* <Route path='/lol' element={<VideoData/>} />  */}
      <Route path='*' element={<Error/>} />

    </Routes>
    </div>
    <Footer/>
   </Router>
   </>
  );
}

export default App;
