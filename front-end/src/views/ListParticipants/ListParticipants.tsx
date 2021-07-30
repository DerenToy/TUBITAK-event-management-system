import React, {useEffect, useState} from "react";
import {EventApi, EventRegistirationResponse} from "../api/EventApi";
import {DataGrid,  GridToolbar} from "@material-ui/data-grid";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        '& .super-app-theme--header': {
          color: 'rgba(22,147,198,1)',
          fontWeight: "bold",
        },
    },
});

export function ListParticipants() {

    let eventApi = new EventApi();

    const [participantsQueryResponses, setParticipantsQueryResponses] = useState<EventRegistirationResponse[]>([]);


    function fetchParticipants() {
        eventApi.getParticipants()
            .then(data => setParticipantsQueryResponses(data));
    }


    useEffect(() => {
        fetchParticipants();
    }, []);

    const classes = useStyles();

    const tableColumns = [
        {field: "id", headerName: "ID", headerClassName: "super-app-theme--header", width: 120},
        {field: "eventName", headerName: "Event Name", headerClassName: "super-app-theme--header", width: 200},
        {field: "username", headerName: "Username",headerClassName: "super-app-theme--header", width: 150},
        {field: "identificationNumber", headerName: "Identification Number", headerClassName: "super-app-theme--header",width: 250},
        {field: "firstName", headerName: "First Name", headerClassName: "super-app-theme--header",width: 200},
        {field: "lastName", headerName: "Last Name",headerClassName: "super-app-theme--header", width: 190},
        {field: "registeredAt", headerName: "Registered At",headerClassName: "super-app-theme--header", width: 180},
    ];



    return(

        <div className="col padding-right">
            <div className="features_items">

                <h2 className="title center">Participants</h2>

                <div className={classes.root} style={{height: 400, width: '1300px', marginRight:'auto', marginLeft: 'auto'}}>

                    <DataGrid columns={tableColumns} rows={participantsQueryResponses} pageSize={5}
                              components={{
                                  Toolbar: GridToolbar,
                              }}
                              filterModel={{
                                  items: [
                                      {columnField: 'eventName', operatorValue: 'contains', value: ''},
                                  ],

                              }}

                    />

                </div>
            </div>
        </div>






)



}