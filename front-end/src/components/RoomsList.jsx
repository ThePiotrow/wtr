import React, {useEffect, useState} from "react";

export default function RoomsList() {

    let [joinedRooms, setJoinedRooms] = useState([]);
    let [availableRooms, setAvailableRooms] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:3000/rooms", {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => response.json())
            .then(({available, joined}) => {
                setJoinedRooms(joined);
                setAvailableRooms(available);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    return (
        <div>
            <h1>Rooms</h1>
            <ul>
                {joinedRooms && joinedRooms.map((room) => (
                    <li key={room.id}>{room.name}</li>
                ))}
            </ul>
        </div>
    );
}