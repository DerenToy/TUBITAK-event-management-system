import React, {useEffect, useState} from "react";
import {AddEvent, EventModel} from "./AddEvent/AddEvent";
import {EventApi, EventQueryResponse} from "./api/EventApi";
import {MessageType} from "./common/dto/MessageResponse";
import {toast} from "react-toastify";
import {EventListForAdmin} from "./EventList/EventListForAdmin";
import { Bar } from 'react-chartjs-2';
import {makeStyles} from "@material-ui/core/styles";

const options = {

    scales: {
        yAxes: [
            {
                scaleLabel: {
                    display: true,
                    labelString: '# of Participants'
                },
                ticks: {
                    beginAtZero: true,
                },
            }],
        xAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Event Name'
            }
        }],

    },
};


// Component'in içinde css yazmak için makeStyles() kullandım.
const useStyles = makeStyles((theme) => ({

    barchart: {
        width: '600px',
        height: '300px',

    },
    button: {
        textAlign: "left",

    }



}));

// Sistemdeki ADMIN yetkisine sahip olan kullanıcıların kullandığı component'tir. Alttaki component'lere buradan
// props geçirilir. EventApi kullanarak back-end ile iletişim kurulur. Gelen mesajlar react-toastify sayesinde ekranda
// gösterilir.
export function AdminView() {

        // Ekleme butonuna basılıp basılamdığına göre AddEvent component'ini sayfaya ekleyip eklemeyeceğimize
        // karar vermemize yardım eder. Sadece state'i değiştirerek birçok şeyi kontrol edebiliriz.
        const [isAddEventModalOpen, setAddEventModelOpen] = useState(false);

        // Etkinliklerin tutulacağı state'dir.
        const [eventQueryResponses, setEventQueryResponses] = useState<EventQueryResponse[]>([]);

        // Etkinlik - Katılımcı sayısı bar chart'ının state'ini tutar.
        const [isParticipantsBarChartOpen, setParticipantsBarChartOpen] = useState(false);

        const eventApi = new EventApi();
        const classes = useStyles();

        // Back-end'den gelen bilgiye göre state'i set etmemizi sağlar.
        function fetchEvents() {
            eventApi.getAllEvents()
                .then(data => setEventQueryResponses(data));
        }

        // fetchEvents() fonksiyonun sadece ilk yüklenme işlemi sırasında çalışmasını istediğimiz için
        // useEffect'i aşağıdaki şekilde kullanırız. Sayfada herhangi bir şeyin değişmesi ya da her değişiklikte
        // çalışması için daha farklı bir şekilde tanımlanması gerekir.
        useEffect(() => {
            fetchEvents();
        }, []);


        // Etkinlik eklememizi sağlar, gelen MessageResponse'u ekranda gösterir.
        const addEvent = async (model: EventModel) => {
            const messageResponse = await eventApi.addEvent(model);
            if (messageResponse.messageType === MessageType.SUCCESS) {
                toast.success(messageResponse.message);
                setAddEventModelOpen(false);
                fetchEvents();
            } else {
                toast.error(messageResponse.message);
            }
        }

        // Etkinliği güncelleyeceğimiz zaman kullanırız. Gelen MessageResponse'u ekranda gösterir.
        const updateEvent = async (model: EventModel, id:number) => {
            const messageResponse = await eventApi.updateEvent(model,id);

            if (messageResponse.messageType === MessageType.SUCCESS) {
                toast.success(messageResponse.message);
                fetchEvents();
            } else {
                toast.error(messageResponse.message);
            }
        }

        // Etkinliği sileceğimiz zaman kullanırız. Gelen MessageResponse'u ekranda gösterir.
        const deleteEvent = async (id:number) => {
            const messageResponse = await eventApi.deleteEvent(id);
            console.log(messageResponse);
            if (messageResponse.messageType === MessageType.SUCCESS) {
                toast.success(messageResponse.message);
                fetchEvents();
            } else {
                toast.error(messageResponse.message);
            }
        }

        // eventQueryResponses'ın içinde bulunan her EventQueryResponse için EventListForAdmin component'inin eklenmesini
        // sağlar.
        let currentEvent:any[] = [];
        eventQueryResponses.forEach((event: EventQueryResponse) => {
            currentEvent.push(<EventListForAdmin event={event} updateEvent={updateEvent} deleteEvent={deleteEvent}/>);
        });

        let numberOfParticipants: number[] =[];
        eventQueryResponses.forEach((event: EventQueryResponse ) =>{
            numberOfParticipants.push(event.numberOfParticipants);
        });

        let eventNames: string[] = [];
        eventQueryResponses.forEach((event: EventQueryResponse ) =>{
            eventNames.push(event.eventName);
        });

    const data = {
        labels: eventNames,
        datasets: [
            {
                label: '# of Participants',
                data: numberOfParticipants,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                width: 700,
                height : 350,
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


        return (
            <div className="row">
                <div className="col-sm-3">
                    <div className="left-sidebar">
                        <h2>Action</h2>
                        <div className="panel-group actions" >
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4 className="panel-title">
                                       <button onClick={() =>  setAddEventModelOpen(true)}>Add New Event</button>):
                                    </h4>
                                </div>
                                <div className="panel-heading">
                                    <h4 className="panel-title">
                                        {isParticipantsBarChartOpen ? ( <button className= {classes.button} onClick={() =>  setParticipantsBarChartOpen(false)}>All Events</button>):
                                            ( <button className= {classes.button} onClick={() =>  setParticipantsBarChartOpen(true)}>Number of Participants Bar Chart</button>)}

                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-9 padding-right">
                    <div className="features_items">

                        {isParticipantsBarChartOpen ?
                            (  <h2 className="title center"> Event - Participants Bar Chart</h2>):
                            ( <h2 className="title center">All Events</h2>)
                        }

                        {isParticipantsBarChartOpen ?
                        (
                            <Bar data={data} options={options}/>
                       ) :
                            (currentEvent)

                        }


                    </div>
                </div>

                <AddEvent
                    isOpen={isAddEventModalOpen}
                    handleClose={() => setAddEventModelOpen(false)}
                    addEvent={addEvent}/>


            </div>



        );

    }

