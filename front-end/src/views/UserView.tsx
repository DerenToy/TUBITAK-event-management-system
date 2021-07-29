import React, {useEffect, useState} from "react";
import {EventApi, EventQueryResponse} from "./api/EventApi";
import EventListForUser from "./EventList/EventListForUser";
import {MessageType} from "./common/dto/MessageResponse";
import {toast} from "react-toastify";
import {Info} from "./ApplyEvent/ApplyEvent";
import { useHistory } from "react-router-dom";
import LoginApi from "./api/LoginApi";


// 'USER' yetkisine sahip olan kullanıcıların kullanacağı component'tir. EventListForUser'a props'lar buradan geçirilir.
export  function UserView() {
    const user = LoginApi.getCurrentUser();

    // Bu state'ler sayesinde tüm etkinliklerin mi yoksa sadece kullanıcının kayıt olduğu etkinlikleri mi
    // görüntüleyip görüntülemeyeceğine kolaylıkla karar verilebilir.
    const [eventQueryResponses, setEventQueryResponses] = useState<EventQueryResponse[]>([]);
    const[isRegisteredEvents, setRegisteredEvents] = useState(false);

    const eventApi = new EventApi();

    let history = useHistory();

    // Tüme etkinlikleri alıp kullanmamızı sağlar.
    function fetchEvents() {
        setRegisteredEvents(false);
        eventApi.getNotStartedEvents()
            .then(data => setEventQueryResponses(data));
    }

    // Sadece kullanıcının kayıt oldukları ekinlikleri almasını sağlar.
    function fetchRegisteredEvents(username:string) {
        setRegisteredEvents(true);
        eventApi.getUserRegisteredEvents(username)
            .then(data => setEventQueryResponses(data));
    }

    // Fonksiyonun sadece ilk render işleminde çalıştırılmasını sağlar.
    useEffect(() => {
            fetchEvents();

    }, []);


    // Kullanıcının etkinliğe başvurmasını sağlar. Back-end'e EventApi ile istek atar ve dönen mesajı
    // toastify yardımıyla ekranda gösterir. Eğer etkinliğe başvuru başarılı sonuçlandıysa history objesi
    // kullanılarak sayfa /qr-code url'ine gider. eventId ve info (kullanıcı bilgilerini içerir) QrCodeGenerator'da
    // useLocaiton ile alınıp kullanılır.
    const applyEvent = async (username:string, info: Info, eventId:number) => {
        const messageResponse = await eventApi.applyEvent(username,info,eventId);
        if (messageResponse.messageType === MessageType.SUCCESS) {
            toast.success(messageResponse.message);
            history.push({
                    pathname: '/qr-code',
                    state: { eventId: eventId, info: info }
                }
            )

        } else {
            toast.error(messageResponse.message);
        }
    }



    // eventQueryResponses'ın içindeki etkinliklere göre EventListForUser component'inin sayfaya eklenmesini sağlar.
    let currentEvent:any[] = [];
    eventQueryResponses.forEach((event) => {
        currentEvent.push(<EventListForUser event={event} applyEvent={applyEvent}/>);


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
                                {isRegisteredEvents ?
                                    (<button onClick={() => fetchEvents()}>Show All Events</button>):
                                    (<button onClick={() => fetchRegisteredEvents(user.sub)}>Show Registered
                                        Events</button>)
                                }
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="col-sm-9 padding-right">
            <div className="features_items">
                {isRegisteredEvents ?
                    (<h2 className="title center">Registered Events</h2>) :
                    (<h2 className="title center">All Events</h2>)
                }
                <div className="row">
                {currentEvent}
            </div>
            </div>
        </div>
    </div>


    );



}