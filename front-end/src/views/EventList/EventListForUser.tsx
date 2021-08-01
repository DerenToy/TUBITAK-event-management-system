import {EventQueryResponse} from "../api/EventApi";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography
} from "@material-ui/core";
import React, { useState} from "react";
import {ApplyEvent, Info} from "../ApplyEvent/ApplyEvent";
import {makeStyles} from "@material-ui/core/styles";


// Component'in içinde css yazmak için makeStyles() kullandım.
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 350,
        height:  500
    },
    media: {
        paddingTop: '100%',
    },
    buttonApply: {
        color : 'red',
        marginLeft: 'auto',
    }

}));

// Typescript dosyası olduğu için props'ların tiplerini belirtmek gerekiyor.
interface Props {
    event: EventQueryResponse,
    applyEvent: (username:string,info: Info,eventId:number) => void
}

export default function EventListForUser(props : Props) {

    const classes = useStyles();

    // Üst component'ten gelen bilgilerin alınmasını sağladım.
    const {eventName, startDate, finishDate,imageUrl} =  {...props.event};

    // State tutarak bir nevi "Apply Event" butonuna basılıp basılmadığını tutmuş oldum. Basıldığı zaman
    // setApplyEventModelOpen'a true değerini vererek 'ApplyEvent' component'inin sayfaya eklenmesini sağladım.
    const [isApplyEventModalOpen, setApplyEventModelOpen] = useState(false);



    return (
        <div className="col-sm-4">
        <div className="single-event">
            <div className="eventInfo">
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia className={classes.media}
                                       image={imageUrl}
                                       title={eventName}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {eventName}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    The start date of the event is {startDate} and the end date is {finishDate}. Click the 'Apply Event' button to register for the event!
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" className={classes.buttonApply}
                                    onClick={() => setApplyEventModelOpen(true)}
                            >
                                Apply Event
                            </Button>

                        </CardActions>

                    </Card>
                    <ApplyEvent event={props.event} isOpen={isApplyEventModalOpen}
                                handleClose={() => setApplyEventModelOpen(false)}
                                applyEvent={props.applyEvent}/>

                </div>
            </div>
        </div>


);



}