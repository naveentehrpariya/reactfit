import './elements/intro.css'
import Banner from './elements/img/banner2.png'
//import logolight from './elements/img/logo-light.png'
import BookingPage from './BookingPage'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from './context/UserContext'
export default function Intro(props) {
    const { setFormDone, setDateFill, setFormFill, page1, setPage1, step1, setStep1, step2, setStep2 } = useContext(UserContext);
    const [bookingExits, setBookingExits] = useState([]);
    const [exitsBookingId, setExitsBookingId] = useState();
    const [exitsBookingEmailId, setExitsBookingEmailId] = useState();
    const queryParams = new URLSearchParams(window.location.search)
    const t = queryParams.get("t");
    const s = queryParams.get("s");

    useEffect(() => {
        if (t) {
            const response = fetch(`https://mayweatherdeals.com/api/${t}/exist`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(res => {
                return res.json();
            }).then((jsonResp) => {
                if(jsonResp.schedule) {
                    setPage1(false);
                    setStep1(false);
                    setStep2(true);
                    setFormFill(true);  
                    setFormDone(true);
                    setDateFill(true);
                    setBookingExits(jsonResp);
                }
                if (jsonResp.status) {
                    if (!jsonResp.schedule) {
                        setFormFill(true);
                        setPage1(false);
                        setStep1(false);
                        setStep2(true);
                        setExitsBookingId(jsonResp.booking);
                        setExitsBookingEmailId(jsonResp.email); 
                    }
                }
            }).catch(error => {
                console.log("server error", error);
            });
        }
        if (s) {
            pageBooking();
        }
    }, []);

    function pageBooking() {
        setPage1(false);
    }

    return <>
        {page1 ? <>
            <div className="introwrap" >
               
                <div className='introSec'>
                    <div className='container'>
                        <h2 className='introTitle' >Mayweather Boxing + Fitness - Uptown</h2>
                        <div className='row sectop' >
                            <div className='col-md-6' >
                                <div className='landingBanner' >
                                    <img src={Banner} className="img-fluid" alt='gym' />
                                </div>
                            </div>
                            <div className='col-md-6' >
                                <div className='textWrap' >
                                    <h2>Get Your Gear and Get Your First Class Free</h2>
                                    <p> Mayweather Boxing + Fitness offers an authentic experience for those who want to learn from Floyd's techniques and training regimens.
                                    </p>
                                    <a onClick={pageBooking} className='bookNow' to="/booking">Book Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </> : <><BookingPage exitsBookingEmailId={exitsBookingEmailId} exitsBookingId={exitsBookingId} bookingExits={bookingExits} /></>}
    </>
}