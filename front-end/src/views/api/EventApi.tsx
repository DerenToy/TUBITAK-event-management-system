import {EventModel} from "../AddEvent/AddEvent";
import axios from "axios";
import {MessageResponse} from "../common/dto/MessageResponse";
import {Info} from "../ApplyEvent/ApplyEvent";
import authHeader from "./AuthHeader";


export interface EventQueryResponse {
    id: number;
    eventName: string;
    startDate: string;
    finishDate : string;
    quota : number;
    imageUrl: string;
    numberOfParticipants: number;
}


export interface EventRegistirationResponse {
    id: number;
    identificationNumber: string;
    firstName: string;
    lastName : string;
    registeredAt : string;
}

// Axios kullanarak back-end'e istek attığım component. Buradaki fonksiyonların async olması fonksiyondan Promise
// döneceğini belirtirken; await, Promise olan fonksiyonun bitmesini bekler. Böylece asenkron programlama yapmış oluruz.

export class EventApi {

    /* ADMİN OLAN KULLANICILARIN YAPABİLECEĞİ EYLEMLER */

    // Sisteme etkinlik eklenilmesini sağlar. AddEvent'deki formdan alınan bilgilerle EventModel oluşturulur ve
    // back-end'e post ile gönderilir.
    async addEvent(eventModel: EventModel): Promise<MessageResponse> {
        const response = await axios.post<MessageResponse>("http://localhost:8080/events" ,eventModel, {
            headers: authHeader(),
        });
        return response.data;
    }

    // Sistemdeki (veritabanındaki) etkinliklerin hepsini back-end'e get isteği atarak getirir.
    async getAllEvents(): Promise<EventQueryResponse[]> {
        const response = await axios.get<EventQueryResponse[]>("http://localhost:8080/events/admin", {
            headers: authHeader(),
        });
        return response.data;
    }

    // Etkinliğin id'sine göre getirilmesini sağlar.
    async getEventById(id:number): Promise<EventQueryResponse> {
        const response = await axios.get<EventQueryResponse>(`http://localhost:8080/events/admin/${id}`, {
            headers: authHeader(),
        });
        return response.data;
    }


    // Sistemdeki bir etkinliğin güncellenmesini sağlar.
    // id -> Güncellenecek olan etkinliğin id'si iken,
    // eventModel -> Bu etkinlik için UpdateEvent formunda yeni girilmiş değerlerdir.
    async updateEvent(eventModel: EventModel, id: number):Promise<MessageResponse> {
        const response = await axios.put<MessageResponse>(`/events/${id}`,eventModel, {
            headers: authHeader(),
        });

        return response.data;
    }

    // Sistemden id'sine göre etkinliğin silinmesini sağlar.
    async deleteEvent(id: number):Promise<MessageResponse>  {
        const response = await axios.delete<MessageResponse>(`/events/${id}`, {
            headers: authHeader(),
        });

        return response.data;

    }

    // Bu fonksiyon için front-end tasarlamadım.. Adminin kayıtlı kullanıcıları listelemesi için yazmıştım. (Faz-3/1.madde)
    async getParticipants(): Promise<EventRegistirationResponse[]> {
        const response = await axios.get<EventRegistirationResponse[]>("http://localhost:8080/events/admin/participants", {
            headers: authHeader(),
        });
        return response.data;
    }




    /* NORMAL KULLANICININ YAPABİLECEĞİ EYLEMLER */

    // Başlangıç tarihi geçmemiş olan etkinliklerin listelenmesini sağlar.
    async getNotStartedEvents(): Promise<EventQueryResponse[]> {
        const response = await axios.get<EventQueryResponse[]>("/events/user",{
            headers: authHeader(),
        });
        return response.data;
    }

    // Kullanıcının etkinliğe başvurmasını (kayıt olmasını) sağlar.
    // username -> Sistemdeki mevcut kullanıcının kullanıcı adını,
    // info -> Kullanıcının etkinliğe başvururken girdiği tc kimlik no, isim, soy isim bilgilerini,
    // eventId -> Kullanıcının kayıt olmak istediği etkinliğin id'sini tutar.
    async applyEvent(username:string,userInformation: Info,eventId:number):Promise<MessageResponse>{
        const response = await axios.post<MessageResponse>(`/${username}/apply-event/${eventId}`,userInformation,
            {
            headers: authHeader(),
        });
        return response.data;


}
    // Kullanıcının kayıtlı olduğu etkinlikleri görüntülenmesini sağlar.
    async getUserRegisteredEvents(username:string){
        const response = await axios.get<EventQueryResponse[]>(`/user/enrolled-events/${username}`,
            {
                headers: authHeader(),
            });
        return response.data;

    }






}