import './Sidebar.css'
import loginpic from '../elements/img/login-pic2.png'
//import logolight from '../elements/img/logo-light.png'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext';

export default function SideBar() {

    const { formfill, dateFill, formDone } = useContext(UserContext);

    return <>
        <div className="sideBarwrap" >
            <div className='logoSide' >
                <img src={loginpic} className="img-fluid" alt='login pic' />
                <div className='mobileHeader ' >   
                    <h2 className="heading ">Mayweather B + F Uptown</h2>
                </div>

                <ul className="login__list">
                    <li className={`${formfill ? '' : 'listDisabled'}`} >Booking Details</li>
                    <li className={`${dateFill ? '' : 'listDisabled'}`} >Date &amp; Time</li>
                    <li className={`${formDone ? '' : 'listDisabled'}`} >Confirmation</li>
                </ul>
            </div>
        </div>
    </>
}
