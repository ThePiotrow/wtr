import React from 'react'
import Chat from '../components/Chat/Chat'

 const ViewChat = ({socket}) => {
    return (
        <>
            <div>ViewChat</div>
            <Chat socket={socket}/>
        </>

    )
}

export default ViewChat