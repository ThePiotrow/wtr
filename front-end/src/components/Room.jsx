import React from 'react';
import { useParams } from "react-router-dom";

export default function Room() {

    const { id } = useParams();
    const [room, setRoom] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch(`http://localhost:3000/rooms/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
            }),
        })
            .then(response => response.json())
            .then(data => {
                setRoom(data);
                setLoading(false);
            });
    }, []);


    return (
        <>
            Hello

        </>
    );
};
