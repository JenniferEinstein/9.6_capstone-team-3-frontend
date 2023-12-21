import React from 'react'

const FAQ = ({ id }) => {
  return (
    <div id={id} className='faq' >
      <h2>FAQs</h2>
        <ul className='list faq-list'>
            <li>I didn't receive a gift; what do I do?</li>
            <li>Do I really have to upload a picture of the gift I got?</li>
            <li>What if I get an inappropriate gift?</li>
            <li>What if I don't like what I got?</li>
            <li>How many accounts can I have?</li>
            <li>How much should I spend?</li>
            <li>Will I be gifting the same person who is giving me?</li>
            <li>Is this safe?</li>
            <li>What if I don't send a gift?</li>
            <li>How do I make a gallery post/upload my picture?</li>
            <li>How do I mark that I shipped my gift?</li>
            <li>Can I send anything I want?</li>
        </ul>
    </div>
  )
}

export default FAQ