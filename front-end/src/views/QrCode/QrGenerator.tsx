
import {Fab, Grid} from '@material-ui/core'
import {ArrowBack, GetApp} from '@material-ui/icons'
import { Link, useLocation } from "react-router-dom";
import QRcode from 'qrcode.react'
import {Info} from "../ApplyEvent/ApplyEvent";
import LoginService from "../api/LoginApi";


// Qr kodun içinde tutulacak olan bilgiler
interface QrInformation{
    eventId: number
    info: Info

}

// Kullanıcı etkinliğe başvurduktan sonra event ve kullanıcı bilgielriyle qr kod oluşturulmasını sağlar.
export function QrGenerator() {
     const user = LoginService.getCurrentUser();

     const location = useLocation(); //Current url'nin alınmasını sağlar.
     const locationState: QrInformation = location.state as QrInformation;

     // Qr kodu oluşturulurken kullanılacak olan değer
     let qrValue:string = 'Username: ' + user.sub + ' Event Id: ' +locationState.eventId +' Identification Number: ' + locationState.info.identificationNumber +
     ' First Name: ' + locationState.info.firstName + ' Last Name: ' + locationState.info.lastName;


     // Kullanıcının qr kodu indirebilmesini sağlar.
    const downloadQR = () => {
        const canvas = document.getElementById("myqr") as HTMLCanvasElement;
        const pngUrl = canvas.toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "myqr.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };


    return (
        <div className="qrCode">
        <div className="center">
            <Link to="/events/user">
                <Fab style={{marginRight:'10px', marginBottom:'15px'}} color="primary">
                    <ArrowBack/>
                </Fab>
            </Link>
            <span style={{ marginBottom:'15px'}} >QR Code For Event</span>

            <div>
                {
                        <QRcode
                            id="myqr"
                            value={qrValue}
                            size={320}
                            includeMargin={true}
                        />

                }
            </div>
            <div>
                {
                        <Grid item xs={12}>
                            <Fab onClick={downloadQR} style={{marginLeft: '10px', marginTop: '20px', width:'150px'}} color="primary">
                                Download <GetApp/>
                            </Fab>
                        </Grid>


                }
            </div>
        </div>
        </div>
    );
}


