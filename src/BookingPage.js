import SideBar from './elements/SideBar';
import Booking from './Booking';
import Popup from './elements/Popup';
import thankyou from "./elements/thankyou.png";
import { useState } from 'react';
export default function BookingPage(props) {
    const [ booking, setBooking] = useState( props.bookingExits);
    const bookingDone = booking.schedule;
    return <>
        <div className='pageWrapper' >
            <SideBar />
            <Booking exitsBookingId={props.exitsBookingId}/>
            <Popup status={bookingDone} link="/intro" >
                <div className='thankyouPopup' >
                    <img src={thankyou} alt="Thankyou"
                        width={"140"} className='thankyouImage'
                        height={"140"} />
                    <h2>Booking Already scheduled !!</h2>
                    <h3>{booking.date_time}</h3>
                    {/* <p className='grey-text'>Booking Detals has been sent to your <br></br>email: <strong>email</strong></p> */}
                    <Popup modalClass="video" status={false} btnclass="classbtn"
                        text="What to expect in your first class" >
                        <iframe src="https://player.vimeo.com/video/668977293?h=3f606f35c0" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                    </Popup> 
                </div>
            </Popup>

        </div>
    </>
}