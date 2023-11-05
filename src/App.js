// DEPENDENCIES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

/* Import all page components here  */
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Header from './components/Header'
import SignupLogin from './pages/SignupLogin';
import AllEvents from './pages/AllEvents';
import CurrentEvent from './pages/CurrentEvent';
import Gallery from './pages/Gallery';
import Profile from './pages/Profile';
import Account from './pages/Account';
import PageNotFound from "./pages/PageNotFound"; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Router>
        <Navbar />
        <main>
          <Header/>
          <Routes>
            <Route path="/" element={ <Home />} />
            <Route path="/about" element = { <About /> } />
            <Route path='/signup' element = { <SignupLogin /> } />
            <Route path="/events" element = { <AllEvents /> } />
            <Route path="/currentevent" element = { <CurrentEvent /> } />
            <Route path="/gallery" element = { <Gallery /> } />
            <Route path="/allevents" element = { <AllEvents /> } />
            <Route path="/profile" element = { <Profile /> } />
            <Route path="/account" element = { <Account /> } />
            <Route path="*" element = { <PageNotFound /> } />
          </Routes>
        </main>
        <Footer/>
      </Router>

    </div>
  );
}

export default App;
