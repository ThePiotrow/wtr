import React, {useEffect, useState} from "react";

export default function RoomsList() {

    let [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/rooms")
            .then((response) => response.json())
            .then((data) => {
                setRooms(data);
            });
    }, []);

    return (
        <div>
            <h1>Rooms</h1>
            <ul>
                {rooms.map((room) => (
                    <li key={room.id}>{room.name}</li>
                ))}
            </ul>
        </div>
    );
}