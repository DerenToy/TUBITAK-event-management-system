// Mesajların mesaj türü ve mesaj textini birlikte içerilebilmesini sağlamak için MessageResponse'u yarattım
export interface MessageResponse {
    messageType: MessageType;
    message: string
}

export enum MessageType {
    SUCCESS = "SUCCESS", INFO = "INFO", WARNING = "WARNING", ERROR = "ERROR"
}