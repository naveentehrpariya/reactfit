import React, { useEffect, useState, useRef, useContext } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DatePicker from "react-datepicker";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from './elements/Popup';
import Spin from './elements/Spin';
import './booking.css'
import thankyou from "./elements/thankyou.png";
import { UserContext } from './context/UserContext';
import { addDays } from 'date-fns';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import BookingControl from './api/BookingControl';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        padding: 10,
        fontSize: theme.typography.pxToRem(14),
        border: '1px solid #dadde9',
    }, 
}));


export default function Booking(props) {

    const [open, setOpen] = React.useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };


    const { setFormFill, setDateFill, setFormDone, step1, setStep1, step2, setStep2 } = useContext(UserContext);
    const queryParams = new URLSearchParams(window.location.search)
    const s = queryParams.get("s")

    const [noslots, setnoslots] = useState(true);
    const [load, setLoad] = useState();
    const [slots, setSlots] = useState([]);
    const [locations, setLocations] = React.useState('');
    const [location, setLocation] = React.useState('');

    const [startDate, setStartDate] = useState('');
    const [bookingDate, setBookingDate] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState('');
    const [bookingId, setBookingId] = useState(props.exitsBookingId);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const months = [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12'
    ];

    useEffect(() => {
        const response = fetch(`https://mayweatherdeals.com/api/gyms`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => {
            return res.json();
        }).then((jsonResp) => {
            setLocations(jsonResp);
        }).catch(error => {
            console.log("server error", error);
        });
    }, []);

    const handleChange = (event) => {
        setLocation(event.target.value);
    };

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
        return currentDate.getTime() < selectedDate.getTime();
    };

    let nameattr, valueattr;
    const handleInput = (e) => {
        nameattr = e.target.name;
        valueattr = e.target.value;
        setFormData({ ...formData, [nameattr]: valueattr });
    }

    function handleTimeSlot(e) {
        const value = e.target.value;
        setTime(value);
        setnoslots(false);
        setDateFill(true);
    }

    const dateInput = useRef();
    const valueInput = dateInput && dateInput.current && dateInput.current.input && dateInput.current.input.value;

    const highlights = [new Date(), addDays(new Date(), 1), addDays(new Date(), 2)];
    // const handleDateChange = async (d) => {
    //     setDateFill(false);
    //     setTime('');
    //     const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    //     const dt = d.getFullYear() + '-' + months[d.getMonth()] + '-' + day;
    //     setDate(d.getFullYear() + '-' + months[d.getMonth()] + '-' + day);
    //     setBookingDate(day + '-' + months[d.getMonth()] + '-' + d.getFullYear());
    //     setStartDate(d);
    //     setBookingDate();
    //     const response = await fetch('https://mayweatherdeals.com/api/get-slots', {
    //         method: 'POST',
    //         body: JSON.stringify({ date: dt }),
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     }).then(res => {
    //         return res.json();
    //         toast.error("success");
    //     }).then((jsonResp) => {
    //         setSlots('');
    //         if (jsonResp.status) {
    //             setSlots(jsonResp.slots);

    //         } else {
    //             console.log(jsonResp.errors);
    //         }
    //     }).catch(error => {
    //         console.log("server error", error);
    //     });
    // }
    const [bookingDone, setBookingDone] = useState(false);

    // async function finalizeBooking() {
    //     if (time) {
    //         setLoad(true);
    //         const response = await fetch(`https://mayweatherdeals.com/api/${bookingId}/finalize-prospect`, {
    //             method: 'POST',
    //             body: JSON.stringify({
    //                 date: date,
    //                 time: time,
    //             }),
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json'
    //             }
    //         }).then(res => {
    //             return res.json();
    //             toast.error("success");
    //         }).then((jsonResp) => {
    //             if (jsonResp.status) {
    //                 setLoad(false);
    //                 setFormDone(true);
    //                 setBookingDone(true);
    //                 // console.log("setBookingDone", bookingDone);
    //                 toast.success("Booking Created !!");
    //             } else {
    //                 console.log(jsonResp.errors);
    //                 setFormDone(false);
    //             }
    //         }).catch(error => {
    //             console.log("server error", error);
    //         });
    //     } else {
    //         toast.error("Please select available time slot.");
    //     }
    // }

    const main = new BookingControl;
    const acceptForm = () => {
        const main = new BookingControl;
        const data = new FormData;
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("gym_location_id", formData.location);
        data.append("gym_staff_id", s ? s : null);
        const resp = main.createBooking(data);
        resp.then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
            const errors = error.response.data.errors;
                Object.keys(errors).map((key) => {
                    console.table('err:', errors[key]);
                    let err = errors[key];
                    err.map((m, i) => {
                        toast.error(m);
                    });
                });
        });
    }

    const handleDateChange = async (d) => {
        const resp = main.getSlots();
        setDateFill(false);
        setTime('');
        const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
        const dt = d.getFullYear() + '-' + months[d.getMonth()] + '-' + day;
        setDate(d.getFullYear() + '-' + months[d.getMonth()] + '-' + day);
        setBookingDate(day + '-' + months[d.getMonth()] + '-' + d.getFullYear());
        setStartDate(d);
        setBookingDate();
        const data = new FormData;
        data.append("date", date);
        resp.then((res) => {
            setSlots('');
            if (res.status) {
                setSlots(res.slots);

            } else {
                console.log(res.errors);
            }
        }).catch((error) => {
            const errors = error.response.data.errors;
            Object.keys(errors).map((key) => {
                console.table('err:', errors[key]);
                let err = errors[key];
                err.map((m, i) => {
                    toast.error(m);
                });
            });
        });
    }


    async function finalizeBooking() {
        if (time) {
            setLoad(true);
            const data = new FormData;
            data.append("date", date);
            data.append("time", time);
            const resp = main.finalizeBooking(data, bookingId);
            resp.then((res) => {
                console.log(res);
                if (res.status) {
                    setFormDone(true);
                    setBookingDone(true);
                    setLoad(false);
                    toast.success("Booking Created !!");
                }
                else {
                    setLoad(false);
                }
            }).catch((error) => {
                console.log(error);
                const errors = error.response.data.errors;
                Object.keys(errors).map((key) => {
                    console.table('err:', errors[key]);
                    let err = errors[key];
                    err.map((m, i) => {
                        toast.error(m);
                    });
                });
            });
        } else {
            toast.error("Please select available time slot.");
        }
    }

    return <>
        <div className='pageWrap'>
            {step1 ? <>
                <div className='formBooking' >
                    <h2 className='heading border-bottom' >Book your free class now!</h2>
                    <p className='blue-text' >Enter the information below and a member of our team will call you to verify your booking</p>
                    <div className='formOuter'>
                        <div className="field__wrap">
                            <input className="field__input"
                                onChange={handleInput} value={formData.name}
                                type="text" name="name"
                                placeholder="Your Name" autoComplete="none"
                            />
                            <div className="field__icon">
                                <AccountCircleIcon />
                            </div>
                        </div>
                        <div className="field__wrap">
                            <input className="field__input"
                                onChange={handleInput} value={formData.phone}
                                type="number" name="phone" placeholder="Phone"
                                autoComplete="none" />
                            <div className="field__icon">
                                <PhoneIcon />
                            </div>
                        </div>
                        <div className="field__wrap">
                            <input className="field__input"
                                onChange={handleInput} value={formData.email}
                                type="email" name="email" placeholder="example@gmail.com"
                                autoComplete="none" />
                            <div className="field__icon">
                                <MailOutlineIcon />
                            </div>
                        </div>
                        <div className="field__wrap select-wrap">
                            <FormControl fullWidth>
                                <Select
                                    id="demo-simple-select"
                                    value={location} displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    onChange={handleChange} >
                                    <MenuItem value="" ><em>Gym Location</em></MenuItem>
                                    {locations && Object.entries(locations).map(([key, value], i) =>
                                        <MenuItem key={i} value={key}> {value} </MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <div className="field__icon">
                                <EditLocationIcon />
                            </div>
                        </div>
                        <button className="mainbtn" onClick={acceptForm} >Continue</button>
                    </div>
                    <p className='grey-text'>You will opt in to Text Messages for this Booking & Specials. Message & Data Rates may Apply. Reply <span>STOP</span> to opt out. To view our privacy policy click here <a href='https://mayweatherdeals.com/privacy'>Privacy Policy</a></p>
                </div>
            </> : ''}
            {step2 ? <>
                <div className='dateTimePicker position-relative'  >
                    {load ? <Spin /> : ''}
                    <div className='grey-bg' >
                        <div className='secTitle'>
                            <h2>Date & Time</h2>
                        </div>
                        <p className='grey-text' >Choose a time and date to experience the best workout of your life.</p>
                        <div className='timeDateSelector'>
                            <div className='d-selector mb-2 dateSel' >
                                <label>Date</label>
                                <CalendarMonthIcon />
                                <DatePicker
                                    minDate={new Date}
                                    // minDate={moment().toDate()}
                                    id='inputBox' disabledKeyboardNavigation
                                    selected={startDate} ref={dateInput}
                                    onChange={(date) => handleDateChange(date)}
                                    strictParsing filterTime={filterPassedTime}
                                    dateFormat="MMMM d, yyyy"
                                    highlightDates={highlights}
                                    onFocus={e => e.target.blur()} />
                                <div className='offerInfo' >
                                    <ClickAwayListener onClickAway={handleTooltipClose}>
                                        <div>
                                            <Tooltip
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                onClose={handleTooltipClose}
                                                open={open}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title=" Book a free class within the next 72 hours and receive 22% off your members if you sign up on your first visit."
                                            >
                                                <Button onClick={handleTooltipOpen}><svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm.5 17h-1v-9h1v9zm-.5-12c.466 0 .845.378.845.845 0 .466-.379.844-.845.844-.466 0-.845-.378-.845-.844 0-.467.379-.845.845-.845z" /></svg>
                                                    <p>Special Offer!</p></Button>
                                            </Tooltip>
                                        </div>
                                    </ClickAwayListener>
                                </div>

                            </div>
                            <div className='avilableSlot' >
                                {slots ? <>
                                    <h2>Available Slots</h2>
                                    <div className='slotList' >
                                        {Object.entries(slots).map(([key, m], i) => <>
                                            <div key={i} className='slot' >
                                                <input onChange={handleTimeSlot} type="radio" id={`slot${m.slot_start_time}`} value={m.slot_start_time} name="slot" />
                                                <label htmlFor={`slot${m.slot_start_time}`} >{m.slot_start_time}</label>
                                            </div>
                                        </>)}
                                    </div>
                                </>
                                    : <p className='NotimeSlot' >No Time Slots Available !!</p>}

                            </div>
                        </div>
                        <button onClick={finalizeBooking}
                            className='mainbtn reschedule'>Create Booking</button>

                        {bookingDone ? <>
                            <Popup status={bookingDone} link="/intro" >
                                <div className='thankyouPopup' >
                                    <img src={thankyou} alt="Thankyou"
                                        width={"140"} className='thankyouImage'
                                        height={"140"} />
                                    <h2>Booking Successful!</h2>
                                    <h3>{valueInput} by {time}</h3>
                                    {formData.email && <p className='grey-text'>Booking Detals has been sent to your <br></br>email: <strong>{formData.email}</strong></p>}
                                    <Popup modalClass="video" status={false} btnclass="classbtn"
                                        text="What to expect in your first class" >
                                        <iframe src="https://player.vimeo.com/video/668977293?h=3f606f35c0" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                                    </Popup>
                                </div>
                            </Popup>
                        </> : null}
                    </div>
                </div>
            </> : ''}
        </div>
        <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </>
}
