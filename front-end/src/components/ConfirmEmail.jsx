import React from 'react'
import { useEffect } from 'react';
import { useSearchParams } from "react-router-dom";

const ConfirmEmail = () => {
    const [loading, setLoading] = React.useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    
    useEffect(() => {
        const token = searchParams.get("token");
        
        const data = fetch(`http://localhost:3000/auth/confirm?token=${token}`, {
            method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => {             
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
        })

        console.log(data);
    }, []);

    return (
        <div>
            <h1>Confirmation de votre emaile</h1>

            {
                loading ? <p>Chargement...</p> : <p>Confirmation effectuée</p>
            }
        </div>
    );
}

export default ConfirmEmail