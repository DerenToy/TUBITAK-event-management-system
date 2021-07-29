import React, {useEffect, useState} from "react";
import {AddEvent, EventModel} from "./AddEvent/AddEvent";
import {EventApi, EventQueryResponse} from "./api/EventApi";
import {MessageType} from "./common/dto/MessageResponse";
import {toast} from "react-toastify";
import {EventListForAdmin} from "./EventList/EventListForAdmin";


// Sistemdeki ADMIN yetkisine sahip olan kullanıcıların kullandığı component'tir. Alttaki component'lere buradan
// props geçirilir. EventApi kullanarak back-end ile iletişim kurulur. Gelen mesajlar react-toastify sayesinde ekranda
// gösterilir.
export function AdminView() {

        // Ekleme butonuna basılıp basılamdığına göre AddEvent component'ini sayfaya ekleyip eklemeyeceğimize
        // karar vermemize yardım eder. Sadece state'i değiştirerek birçok şeyi kontrol edebiliriz.
        const [isAddEventModalOpen, setAddEventModelOpen] = useState(false);

        // Etkinliklerin tutulacağı state'dir.
        const [eventQueryResponses, setEventQueryResponses] = useState<EventQueryResponse[]>([]);

        const eventApi = new EventApi();

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
        eventQueryResponses.forEach((event) => {
            currentEvent.push(<EventListForAdmin event={event} updateEvent={updateEvent} deleteEvent={deleteEvent}/>);
        });


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
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-9 padding-right">
                    <div className="features_items">
                        <h2 className="title center">All Events</h2>
                            {currentEvent}
                    </div>
                </div>

                <AddEvent
                    isOpen={isAddEventModalOpen}
                    handleClose={() => setAddEventModelOpen(false)}
                    addEvent={addEvent}/>

            </div>



        );

    }

