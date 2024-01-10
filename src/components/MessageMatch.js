import React from 'react';
import PropTypes from 'prop-types';
import '../css/messages.css';

function MessageMatch( {giver, receiver, event} ) {
  return (
<div className="message">
    {/* <h1>logo here</h1> */}
    {/* <h2>
        <span>Congratulations {giver.name_first}!<br />You've Been Matched for the Gift Exchange! </span></h2> */}
            <h2>
        <span>Congratulations Mozzy!<br />You've Been Matched for the Gift Exchange! </span></h2>
    <p>Exciting news! You've been successfully matched for the upcoming Gift Exchange. Now, the joy of gift-giving begins! To help you get started, here's some information about your recipient's preferences:</p>
    <div className='hardcoded'>
        <ul className='message-list'>
            <li>Based on the theme, if given carte blanche, the person receiving your gift would like: a bottle of De Venoge Princes Tour Eiffel Champagne</li>
            <li>The category they are most interested in is: food</li>
            <li>Their favorite color is: cobalt blue</li> 
            <li>They ask that you avoid: any meat</li>
        </ul>
    </div>
    {/* <ul className='message-list'>
        <li>Based on the theme, if given carte blanche, the person receiving your gift would like: {receiver.preferred_gift}</li>
        <li>The category they are most interested in is: {receiver.preferred_category}</li>
        <li>Their favorite color is: {receiver.favorite_color}</li> 
        <li>They ask that you avoid: {receiver.gifts_avoid}.join(', )</li>
    </ul> */}
    <div className='hardcoded'>
        <p className=''> You will be sending your gift to:</p>
        <div className='address'>
            <p className='address-street-line'>17 Cherry Tree Lane</p>
            <p className='address-last-line'>Phoenix, AZ 85005</p>
            <p className='last-p-tag-in-div'></p>
        </div>
    
        <p>The minimum spend is $50. This does not include shipping costs. </p>
        <p>
            Important Dates: Your thoughtful gift should be on its way by the SHIPPING DEADLINE on <span className='bold'>January 25, 2024</span>. Once you've sent your gift, update us with the <span className='underline'>carrier, date, and tracking information</span>.
        </p>
        <p className='last-p-tag-in-div'></p>
    </div>

    {/* <p className=''> You will be sending your gift to:<br />
      <p className='address'> 
              {receiver.address_street1},<br />
              {receiver.address_city}, {receiver.address_state} {receiver.address_zip}
      </p>
      </p>
      <p>The minimum spend is ${event.minimum_spend}. This does not include shipping costs. </p>
      <p>
          Important Dates: Your thoughtful gift should be on its way by the SHIPPING DEADLINE on <span className='bold'>{event.shipping_deadline}</span>. Once you've sent your gift, update us with the carrier, date, and tracking information.
      </p> */}

    <p>
        Sharing the Joy: When you receive your gift, don't forget to spread the joy! When you get your gift, upload a picture of it to the gallery to confirm its safe arrival.
    </p>
    <p>
        We hope you have a fantastic time selecting and exchanging gifts. If you have any questions or need assistance, feel free to reach out.
    </p>
    <p>Happy Gifting!</p>
    <p>Best Regards,</p> 
    <p>Happiness Exchange</p>

</div>
  )
}

// MessageMatch.propTypes = {
//     giver: PropTypes.object.isRequired,
//     receiver: PropTypes.object.isRequired,
//     event: PropTypes.object.isRequired,
// };

export default MessageMatch