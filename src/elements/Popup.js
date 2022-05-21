import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { UserContext } from '../context/UserContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(5),
    }
}));

export default function Popup(props) {

    const {  page1, setPage1 } = React.useContext(UserContext);

    const status = props && props.status;
    const [open, setOpen] = React.useState(status);
    const handleClickOpen = () => {
        setOpen(true);
    };
 
    const handleClose = () => {
        setOpen(false);
        if(props.link){ 
            setPage1(true);
            window.location.reload();
        }
    };

    return <>
        <div  >
            {props.text ? <>
                <Button onClick={handleClickOpen} variant="outlined" className={`${props.btnclass} mainbtn`} onClick={handleClickOpen}>
                    {props.text}
                </Button>
            </> : null}
            <BootstrapDialog className={`${props.modalClass}`}
                onClose={handleClose}
                open={open} >
                {props.children}
                <Button className='closePop' onClick={handleClose}> <CloseIcon /></Button>
            </BootstrapDialog>
        </div>
    </>
}


