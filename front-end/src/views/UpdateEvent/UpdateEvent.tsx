
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import {ChangeEvent, useState} from "react";
import {EventModel} from "../AddEvent/AddEvent";
import {EventQueryResponse} from "../api/EventApi";


interface Props {
    event: EventQueryResponse,
    isOpen: boolean;
    handleClose: () => void,
    updateEvent: (model: EventModel, id:number) => void

}

// Kullanıcının etkinliği güncelleyeceği zaman kullandığı component'tir.
export function UpdateEvent(props: Props) {

    // State tutarak etkinliğin en güncel haline eventModeli set edebiliriz.
    const [eventModel, setEventModel] = useState<EventQueryResponse>(props.event);

    const onFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.name;
        const value = event.target.value;
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

    async function closeModelAndUpdateEvent(){
        await props.updateEvent(eventModel,  props.event.id);
        props.handleClose();
    }


    return (
        <Dialog
            open={props.isOpen}
            onClose={props.handleClose}>
            <DialogTitle style={{color:'#1976d2'}}>Update Event</DialogTitle>
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
                <Button onClick={() => closeModelAndUpdateEvent()} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );


}
