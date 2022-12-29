import React from 'react';
import { useParams } from "react-router-dom";

export default function Room() {

    const { id } = useParams();
    const [room, setRoom] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch(`http://localhost:3000/rooms/${id}`)
            .then(response => response.json())
            .then(data => {
                setRoom(data);
                setLoading(false);
            });
    }, []);
    
    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <h1>Salon : { room.name }</h1>
        </>
    );    
};
