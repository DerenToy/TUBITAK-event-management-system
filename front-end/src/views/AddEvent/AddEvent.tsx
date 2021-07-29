import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import {ChangeEvent, useState} from "react";

interface Props {
    isOpen: boolean;
    handleClose: () => void,
    addEvent: (model: EventModel) => void
}

// Adminden etkinlik eklerken almak istediğimiz bilgileri tutan bir model oluşturdum.
export interface EventModel {
    eventName : string;
    startDate : string;
    finishDate : string;
    quota : number;
    imageUrl : string;

}
const initialState: EventModel = {
    eventName : "",
    startDate: "",
    finishDate: "",
    quota : 0,
    imageUrl : ""
};


export function AddEvent(props: Props) {
    const [eventModel, setEventModel] = useState<EventModel>(initialState);


    // Formdaki değişikliklere göre EventModel'in içindeki değerlerin update edilmesini sağlar.
    const onFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.name;
        const value = event.target.value;
        //react-hook-form
        setEventModel(updateFormState(field, value));
    }


        function updateFormState(field: string, value: string) {
            const newModelState = {...eventModel};
            switch (field) {
                case "eventName":
                    newModelState.eventName = value;
                    break;
                case "startDate":
                    newModelState.startDate = value;
                    break;
                case "finishDate":
                    newModelState.finishDate = value;
                    break;
                case "quota":
                    newModelState.quota = Number(value);
                    break;
                case "imageUrl":
                    newModelState.imageUrl = value;
                    break;

            }
            return newModelState;
        }


        return (
            <Dialog
                open={props.isOpen}
                onClose={props.handleClose}>
                <DialogTitle style={{color:'#1976d2'}}>Add Event</DialogTitle>
                <DialogContent>
                    <TextField onChange={onFormChange} fullWidth name="eventName" label="Event Name"/>
                    <TextField onChange={onFormChange} fullWidth name="startDate" label="Start Date"/>
                    <TextField onChange={onFormChange} fullWidth name="finishDate" label="Finish Date"/>
                    <TextField onChange={onFormChange} fullWidth name="quota" label="Quota"/>
                    <TextField onChange={onFormChange} fullWidth name="imageUrl" label="Image Url"/>

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => props.addEvent(eventModel)} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        );


}

