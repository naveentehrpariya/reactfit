import { createContext, useState } from "react";
export const UserContext = createContext(); 
export default function UserContextProvider(props) {
    const [ formfill, setFormFill ] = useState(false);
    const [ dateFill, setDateFill ] = useState(false);
    const [ formDone, setFormDone ] = useState(false);
    const [ page1, setPage1] = useState(true);
    const [step1, setStep1] = useState(true);
    const [step2, setStep2] = useState(false);
    let values = { step2, setStep2, step1, setStep1, page1, setPage1, formfill, setFormFill, dateFill, setDateFill, formDone, setFormDone}; 
    return <>
        <UserContext.Provider value={values} >
            {props.children} 
        </UserContext.Provider>
    </>
}
