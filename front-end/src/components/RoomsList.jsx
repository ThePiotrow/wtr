import React, { useEffect, useState } from "react";

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
            .then(({ available, joined }) => {
                setJoinedRooms(joined);
                setAvailableRooms(available);
                console.log(joined, available)
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        console.log(e.target)
        fetch("http://localhost:3000/rooms/4/leave", {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            });
    }

    return (
        <div>
            <h1>Tous les salons</h1>
            <ul>
                {[...availableRooms, ...joinedRooms].map((room) => (
                    <li key={room.id}>
                        <a href={`/rooms/${room.id}`}>{room.name}</a>
                        {joinedRooms.findIndex((r) => r.id === room.id) === -1 && (
                            <button onClick={handleClick}>Rejoindre</button>)}
                    </li>
                ))}
            </ul>
        </div >
    );
}