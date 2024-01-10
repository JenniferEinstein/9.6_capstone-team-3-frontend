// DEPENDENCIES
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
// import { initializeApp } from 'firebase/app';

// STYLING
import "../css/Events.css"
// APT
const API = process.env.REACT_APP_API_URL;

export default function EventSignUp({ userData, userId }) {
    
    const { eventId } = useParams()
    // console.log('userId:', userId); // working 12/20
    let navigate = useNavigate()

    const [showDetails, setShowDetails] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [userDataForEvents, setUserDataForEvents] = useState({
        favorite_color: [], 
        shirt_size: '', 
        pants_size: '',
        shoe_size: '',
        preferred_category: '', 
        preferred_gift: '', 
        gifts_avoid :'',
        events_joined: [],
        // eventId:eventId 
    })
    // I can't continue with updating values until I have a user authentication status or trigger - done
    //UPDATE
    const userEventRegistration = async (updatedUser) => {
        try {
            const response = await axios.put(`${API}/users/${userId}`, updatedUser)
            // console.log(`API Response:`, response.data)
            // console.log(userId)
        } catch(error) {
            console.error(error)
            throw error
        }
    }  
    
    const handleInputChange = (event) => {
        const { id, value } = event.target;
        if (id === 'favorite_color') {
        // if (id === null) {
            const colorsArray = value.split(',').map(color => color.trim()).filter(String)
            console.log('Colors array:', colorsArray)
            setUserDataForEvents((prevUserData) => ({ ...prevUserData, favorite_color: colorsArray }))
        } else if (id === 'events_joined') {
            setUserDataForEvents((prevUserData) => ({
               ...prevUserData,
               events_joined: [...prevUserData.events_joined, value],
            }))
        } else {
            setUserDataForEvents((prevUserData) => ({ ...prevUserData, [id]: value }))
        }
        // console.log('id:', id, 'value:', value)
    }

    const handleOptionChange = (event) => {
        event.preventDefault()
        setSelectedOption(event.target.value)
        handleInputChange(event)
    }

    const handleConfirmation = async (event) => {
        event.preventDefault()
        try {
            // console.log(`Event Id:`, eventId)
            // console.log(`User Id:`, userId)
            // console.log(userDataForEvents)

            if (selectedOption === 'No') {
                alert("Please be advised that we try our best to ensure gifts are based on the desires of the receiver, but sometimes there are chances of being gifted an item you already own. As this may not be desired, it is reality, and therefore we require that everyone who joins any event understands and accepts this possibility to be able to join. If you don't mind, please change your response to 'No'.")
                setShowConfirmation(showConfirmation)
            } else if (selectedOption === 'Yes') {
                // Update the state and get the updated user data
                const updatedUserData = {
                    ...userDataForEvents,
                    events_joined: [...userDataForEvents.events_joined, eventId]
                }
                setUserDataForEvents(updatedUserData)
                setShowConfirmation(!showConfirmation)
                userData.level += 1
                userData.points +=100
                console.log("Submitting User Data:", updatedUserData)
                await userEventRegistration(updatedUserData)
                console.log("Submitted successfully")
                navigate(`/profile/${userId}`)
            }
        } catch (error) {
            console.error(`Error Submitting`, error)
        }
    }

    const handleIconClick = () => {
        setShowDetails(!showDetails);
    }
    
    return (
        <div className='event-signup-container'>
        <div className=''>
            <h1 className='welcome'>You're One Step Away From</h1>
            <h1 className='welcome-2'>Making Someone Feel Special!</h1>
        </div>
        <div className='intro-container '>
            <h2 className='section-header'>To join an event; please complete the form. </h2>
            <span onClick={handleIconClick} className="question-mark-icon">
                <svg xmlns="http://www.w3.org/2000/svg"  
                className="bi bi-question-circle" 
                viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
                </svg>
            </span>
        </div>
        {showDetails && (
            <div className="details-box">
                <p><strong>WHY COMPLETE A QUESTIONAIRE? </strong>
                    <br />
                    You won't be matched if the form is not submitted. Please be as detailed as possible and accept the terms to ensure recieve/give a gift that best suits you and your match that adheres to our guidelines. </p>
            </div>
        )}
        
        <form className='signup-form'>
            <label htmlFor="preferred_gift"> Considering the event theme, kindly specify the type of gift you desire most.</label>
            <input type="text" id="preferred_gift" onChange={handleInputChange} value={userDataForEvents.preferred_gift} placeholder='e.g., travel bag' required/>
            <br />
            <label htmlFor="gifts_avoid">Considering the event theme, kindly specify the type of gifts your match should avoid.</label>
            <input type="text" id="gifts_avoid" onChange={handleInputChange} value={userDataForEvents.gifts_avoid} placeholder=' e.g., no cosmetics please' required/>
            <br />
            <label htmlFor="favorite_color"> What's your favorite color?</label>
            <br />
            <input type="text" id="favorite_color"  onChange={handleInputChange} value={userDataForEvents.favorite_color} placeholder='e.g., brown' required/>
            <br />
            <label htmlFor="preferred_category">Considering the theme, specify the type or category of gift you are most eager to receive?</label>
            <input type="text" id="preferred_category" onChange={handleInputChange} value={userDataForEvents.preferred_category} placeholder='e.g., technology, fashion, books, etc.' required/>
            <br />
            {/* <label className="clothes" htmlFor="clothes" > If desired, 
            <br />
                <label className='clothes-labels' htmlFor="shirt_size">Shirt Size:
                <input type="text" id="shirt_size" onChange={handleInputChange} value={userDataForEvents.shirt_size} placeholder=' e.g., womens S'/>
                </label>
                <label className='clothes-labels' htmlFor="pants_size">Pants Size:
                <input type="text" id="pants_size" onChange={handleInputChange} value={userDataForEvents.pants_size} placeholder=' e.g., womens M' />
                </label>
                <label className='clothes-labels' htmlFor="shoe_size">Shoes Size:
                <input type="text" id="shoe_size" onChange={handleInputChange} value={userDataForEvents.shoe_size} placeholder='e.g., womens 5'/>
                </label>
            <br />
            </label> */}
            <label className="duplicate" htmlFor="duplicate"> Are you open to receiving duplicate items or similar versions of those you already own? 
                <select id="duplicate" value={selectedOption} onChange={handleOptionChange} required>
                    <option value=""></option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </label>
            <br />
            <h3
            className="d-inline-flex gap-1 rules-h3"
            data-bs-toggle="collapse" 
            data-bs-target="#collapseRulesForEvent" 
            // aria-expanded="false" 
            aria-controls="collapseRulesForEvent"
            >
            Rules For <span className='rules-every'>EVERY</span> Event
          </h3>
             <div className="collapse-container row">
            <div className="collapse collapse-details collapse-vertical col" id="collapseRulesForEvent">
              <div className="collapse-card">
              <ul className='rules-container'>
                <li className='rules'>Failure to meet shipping and tracking deadlines or violation of any terms poses a risk of indefinite suspension following investigation by our team. Additionally, your assigned gift giver may choose to withhold their gift as an interim consequence.</li>
                <li className='rules'>The fundamental principle of each event is "Secret Santa," meaning the person you are assigned to gift may differ from the one assigned to gift you.</li>
                <li className='rules'>We <span className='rules-not'>strictly</span> prohibit derogatory, sexually explicit, or discriminatory actions, including hate speech, bullying, and racially insensitive comments or gifts. Maintaining a friendly and respectful environment is crucial, as our goal is to uplift and bring joy to everyone's lives.</li>
                <li className='rules'>The minimum spending requirement ensures that everyone stays within a specified range when selecting gifts. Keep in mind that spending beyond the minimum is at the discretion of the gift giver and can vary.</li>
                <li className='rules'>Under no circumstances are you allowed to contact other users to request gifts. <span className='rules-not'>NOR</span>, disclosing the details of the gift you've selected for your match before they've had a chance to open it is strictly prohibited!</li>
            </ul>
              </div>
            </div>
          </div>
            <div className='terms-container'>
                <label htmlFor="terms-checkbox" id='terms-text'>
                <input type="checkbox" id="terms-checkbox" required /> Do You Agree To The Terms? </label>
                <br />
                <button className="confirm button" onClick={handleConfirmation} >Confirm</button>
            </div>
        </form>
            {showConfirmation && (
                <div className='conclusion'>
                    <h2 className='concluson-h2'>Form is complete, you're added to the event. </h2>
                    <h3 className='conclusion-h3'>Exciting news awaits you! Head over to your profile page for the latest updates buzzing in your app messages. Stay connected and be in the know!</h3>
                </div>
            )}
        <div className=''>
        </div>
    </div>
  )
}