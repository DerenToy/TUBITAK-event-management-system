import React, {ChangeEvent, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import LoginService from "../api/LoginApi";
import {EventQueryResponse} from "../api/EventApi";



interface Props {
    event: EventQueryResponse
    isOpen: boolean,
    handleClose: () => void,
    applyEvent: (username:string,info: Info,eventId:number) => void
}

// Kullanıcının etkinliğe kaydolurken gireceği bilgiler
export interface Info {
    identificationNumber : string;
    firstName : string;
    lastName : string;

}
const initialState: Info = {
    identificationNumber : "",
    firstName: "",
    lastName: "",
};

// Kullanıcının etkinliğe başvururken kullandığı component'tir.
export function ApplyEvent(props: Props) {
    const user = LoginService.getCurrentUser();
    const[isLoading, setIsLoading] = useState(false);

    const [info, setInfo] = useState<Info>(initialState);
    const {id} =  {...props.event};

    const onFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.name;
        const value = event.target.value;
        //react-hook-form
        setInfo(updateFormState(field, value));
    }


    function updateFormState(field: string, value: string) {
        const newUserInfo = {...info};
        switch (field) {
            case "identificationNumber":
                newUserInfo.identificationNumber = value;
                break;
            case "firstName":
                newUserInfo.firstName = value;
                break;
            case "lastName":
                newUserInfo.lastName = value;
                break;

        }
        return newUserInfo;
    }

    // Kullanıcı bilgilerini girdikten sonra "apply" butonuna basında bu fonksiyon çalışır. Butonun yanındaki
    // spinner'ı applyEvent fonksiyonu sonuçlandıktan sonra durdurmak için böyle bir fonksiyon oluşturdum.
    // Ayrıca fonksiyonun sonunda, açılan dialog'un kapatılmasını sağladım.
    async function loadQrCode(){
        setIsLoading(true);
        await props.applyEvent(user.sub,info,id)
        setIsLoading(false);
        props.handleClose();

    }


    return (
        <div>
        <Dialog
            open={props.isOpen}
            onClose={props.handleClose}>

            <DialogTitle style ={{color:'#1976d2'}}>Apply Event</DialogTitle>
            <DialogContent>
                <TextField onChange={onFormChange} fullWidth name="identificationNumber" label="Identification Number"/>
                <TextField onChange={onFormChange} fullWidth name="firstName" label="First Name"/>
                <TextField onChange={onFormChange} fullWidth name="lastName" label="Last Name"/>

            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="secondary">
                    Cancel
                </Button>
                <Button
                    disabled={isLoading}
                    onClick={() => loadQrCode()}
                    color="primary">
                    {isLoading && (
                        <span className="spinner-border spinner-border-sm"/>
                    )}
                    <span>Apply</span>
                </Button>

            </DialogActions>
        </Dialog>


        </div>

    );




}