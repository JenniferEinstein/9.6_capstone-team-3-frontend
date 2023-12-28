
// DEPENDENCIES
import axios from "axios"
import React, { useEffect, useState } from "react"
import { auth } from './firebaseConfig'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// STYLING
import './App.css'
// API
const API = process.env.REACT_APP_API_URL

// PAGES
import About from './pages/About'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Gallery from './pages/Gallery'
import PageNotFound from "./pages/PageNotFound"
import Users from './pages/usersIndex'
import AllEvents from './pages/AllEvents'
import ProofPage from "./pages/ProofPage"

// COMPONENTS
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Account from './components/Account'
import Profile from './components/PublicProfiles'
// import UserPictureForm from "./components/UserPictureForm"
// import CurrentEvent from './components/CurrentEvent'
import EventSignUp from "./components/EventSignup"
import LoginModal from "./components/LoginModal"
// import Header from './components/Header'
import MessageMatch from "./components/MessageMatch";
import MessageProof from "./components/MessageProof";


function App() {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [userUid, setUserUid] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      setUser(authUser) // firebase data for user
      if (authUser) {

        const uid = authUser.uid; // Capture uid here
        console.log('authUser:', authUser) // working
        setUser(authUser) // firebase data for user
        console.log(authUser.uid) // working
        setUserUid(authUser.uid) 
        try {
          const response = await axios.get(`${API}/users`)
          console.log(response.data) // working
          const loggedInUser = response.data.find((verifiedUser) => verifiedUser.firebase_uid === uid);
            // console.log(verifiedUser) // working
            // console.log(verifiedUser.firebase_uid === userUid) //working 
            // console.log(loggedInUser.username, `is logged in`) // working
          if (loggedInUser) {
            setUserData(loggedInUser)
            console.log(loggedInUser.username, 'is logged in');
          } else {
            console.error(`User not found in the database, check if user is logged in properly`)
            setUserData(null)
          }
        }
        catch (error) {
          console.error('Error fetching user data:', error)
        } finally {
          setLoading(false)
        }
      } else {
        setUser(null) // helps with logging out
        setUserData(null) // resets data when logged out 
        setLoading(false);
      }
    })
    return () => unsubscribe()
  }, [API])

  const userId = userData?.id; // Use optional chaining to handle potential null values


  // const userId = userData ? userData.id : null 
  const handleLogout = async () => {
    try {
      await auth.signOut()
      console.log(user.displayName, `is logged out.`)
      setUserData(null) // Clear user data
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Router>
      <Navbar handleLogout={handleLogout} user={user} userId={userData?.id} />
        {/* <button onClick={handleLogout}>Logout</button> */}
        <main>
          {/* <Header/> */}
          <Routes>
            <Route path="/" element={ <Home />} />
            <Route path="/about" element = { <About /> } />
            <Route path="/exchanges-proof" element = { <ProofPage />} />
            <Route path="/login" element={<Login userData={userData}  />} />

            {/* USERS CURD NEW-SHOW-EDIT-INDEX*/}
            <Route path="/signup" element={<Signup userData={userData}/>} />

            {/* <Route path="/create-profile" element={<CreateProfile />} /> */}
            <Route path="/profile/:userId" element={<Profile userData={userData}/>} />
            <Route path="/profile/:userId/account-edit" element={<Account userData={userData}/>} />
            <Route path="/users/" element={<Users />} />

            {/* EVENTS CRUD NEW-SHOW-EDIT-INDEX*/}
            <Route path="/events" element={user? <AllEvents userId = {userId} userData={userData}/> : <Login/>} /> 
            {/* <Route path="/events/:eventId" element={<CurrentEvent />} /> */}

            {/* USER EVENTS NEW-SHOW-EDIT-INDEX*/}
            <Route 
              path="/events/:eventId/register/:userId" 
              element={user? <EventSignUp userData={userData} userId={userId}/> : <LoginModal />} />

            <Route path="/gallery" element={<Gallery />} />
            <Route path="/message-match" element={ <MessageMatch /> } />
            <Route path="/message-proof" element={ <MessageProof /> } />
            {/* <Route path="/exchanges-proof" element = { <ProofPage />} /> */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}
export default App;
