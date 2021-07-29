
import React, {useState} from "react"
import {EventQueryResponse} from "../api/EventApi";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {UpdateEvent} from "../UpdateEvent/UpdateEvent";
import {EventModel} from "../AddEvent/AddEvent";


// Component'in içinde css yazmak için makeStyles() kullandım.
const useStyles = makeStyles((theme) => ({
    buttonUpdate: {
        color : 'green',
        marginLeft: 'auto',

    },
    buttonDelete: {
        color: 'red',

    },
    root: {
        marginBottom: '50px',
         width: '800px',
        marginLeft: "20px",
    },
    cover: {
        width: '200px',
        height: '240px',
        paddingTop: '100px',
    },
    titleEvent: {
        color: 'rgba(1,62,93,255)',

    }

}));

// Typescript dosyası olduğu için props'ların tiplerini belirtmek gerekiyor.
interface Props {
    event: EventQueryResponse
    updateEvent: (model: EventModel, id:number) => void
    deleteEvent: (id:number) => void

}


// Bu functional component adminin listeleyeceği etkinlikleri nasıl listeleyeceğini içerir. Burada bulunan update/delete
// butonlarıyla silme, güncelleme işlemleri için gerekli olan işlemler yapılır.
export function EventListForAdmin (props : Props) {

    // State tutarak update event dialogunun açılıp açılmadını kontrol ettim. İlk değerini false olarak verdim ve
    // update butonuna basıldığında bu değeri true olarak set ettim.
    const [isUpdateEventModalOpen, setUpdateEventModelOpen] = useState(false);

    // Üst component'ten gelen bilgilerin alınmasını sağladım.
    const {id, eventName, startDate, finishDate, quota, imageUrl} = {...props.event};

    const classes = useStyles();



    return (
        <div className="col-sm-4">
                    <Card className={classes.root}>
                        <div className='row'>
                            <div className="col-3"  >
                        <CardMedia
                            className={classes.cover}
                            image={imageUrl}
                            title={eventName}
                        />
                            </div>
                            <div className="col-9"  >

                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" className={classes.titleEvent}>
                                    {id}  {eventName}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Start Date:  {startDate}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Finish Date:  {finishDate}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Quota:  {quota}
                                </Typography>
                            </CardContent>
                        </CardActionArea>

                        <CardActions disableSpacing>
                            <Button size="small" className = {classes.buttonUpdate}
                                    onClick={() => setUpdateEventModelOpen(true)}
                            > Update
                                <EditIcon > </EditIcon>
                            </Button>
                            <Button size="small" className = {classes.buttonDelete}
                                    onClick={() => props.deleteEvent(id)}
                            >Delete
                                <DeleteIcon > </DeleteIcon>
                            </Button>

                        </CardActions>
                           </div>
                        </div>

                    </Card>

            <UpdateEvent event={props.event} isOpen={isUpdateEventModalOpen} handleClose={() => setUpdateEventModelOpen(false)} updateEvent={props.updateEvent} />

        </div>


    );

}

