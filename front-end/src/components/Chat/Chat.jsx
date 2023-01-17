import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';

const salons = [
    {
        name: 'Salon 1',
        avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
        lastMessage: 'Hey, How are you?',
        unread: 0
    },
    {
        name: 'Salon 2',
        avatar: 'https://material-ui.com/static/images/avatar/2.jpg',
        lastMessage: 'Hey, How are you?',
        unread: 0
    },
    {
        name: 'Salon 3',
        avatar: 'https://material-ui.com/static/images/avatar/3.jpg',
        lastMessage: 'Hey, How are you?',
        unread: 0
    },
    {
        name: 'Salon 4',
        avatar: 'https://material-ui.com/static/images/avatar/4.jpg',
        lastMessage: 'Hey, How are you?',
        unread: 0
    },
    {
        name: 'Salon 5',
        avatar: 'https://material-ui.com/static/images/avatar/5.jpg',
        lastMessage: 'Hey, How are you?',
        unread: 0
    },

]

const users = [
    {
        firstname: 'Maxime',
        lastname: 'Boussard',
        avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
        lastMessage: 'Hey, How are you?',
        status: 'online',
        unread: 0
    },
    {
        firstname: 'John',
        lastname: 'Doe',
        avatar: 'https://material-ui.com/static/images/avatar/2.jpg',
        lastMessage: 'Hey, How are you?',
        status: 'offline',
        unread: 0
    },
    {
        firstname: 'Zach',
        lastname: 'Braff',
        avatar: 'https://material-ui.com/static/images/avatar/3.jpg',
        lastMessage: 'Hey, How are you?',
        status: 'online',
        unread: 0
    },
    {
        firstname: 'Andrew',
        lastname: 'Doe',
        avatar: 'https://material-ui.com/static/images/avatar/4.jpg',
        lastMessage: 'Hey, How are you?',
        status: 'offline',
        unread: 0
    },
    {
        firstname: 'James',
        lastname: 'Doe',
        avatar: 'https://material-ui.com/static/images/avatar/5.jpg',
        lastMessage: 'Hey, How are you?',
        status: 'online',
        unread: 0
    },

];

const useStyles = makeStyles({
    containerChat : {
        display: 'flex',
    },
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '93vh',
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    },

});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const Chat = ({ socket }) => {
    const classes = useStyles();

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [value, setValue] = React.useState(0);


    const modelMessage = {
        text: String,
        author: Object
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeMessage = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        // e.preventDefault()
        if (message.trim()) {
            messages.push({ text: message, author: 'Maxime' });
            setMessage('');
        }
        // socket.emit('chat message', { message, room: 1, token: localStorage.getItem('token') });
    }

    const handleKeyDown = (event) => {

        if (event.key === 'Enter') {
            // 👇 Get input value
            handleSubmit();
        }
    };

    // Socket Event incoming_message

    return (
        <div className={classes.containerChat}>
            <Grid container>
                <Grid item xs={12} >
                    <Typography variant="h5" className="header-message">Chat</Typography>
                </Grid>
            </Grid>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value}
                                onChange={handleChangeTab}
                                aria-label="basic tabs example"
                                centered
                            >
                                <Tab label="Conversations" {...a11yProps(0)} />
                                <Tab label="Salons" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <List>
                                <ListItem button key="RemySharp">
                                    <ListItemIcon>
                                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                                    </ListItemIcon>
                                    <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                                    <ListItemText secondary="online" align="right"></ListItemText>
                                </ListItem>
                                {
                                    users.map((user, index) => (
                                        <ListItem button key={index}>
                                            <ListItemIcon>
                                                <Avatar alt={user.name} src={user.avatar} />
                                            </ListItemIcon>
                                            <ListItemText primary={user.name}>{user.firstname} {user.lastname} </ListItemText>
                                            <ListItemText secondary={user.status} align="right"></ListItemText>
                                        </ListItem>
                                    ))
                                }
                                <ListItem button key="Alice">
                                    <ListItemIcon>
                                        <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                                    </ListItemIcon>
                                    <ListItemText primary="Alice">Alice</ListItemText>
                                </ListItem>
                            </List>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <List>
                                {
                                    salons.map((salon, index) => (
                                        <ListItem button key={index}>
                                            <ListItemIcon>
                                                <Avatar alt={salon.name
                                                } src={salon.avatar
                                                } />
                                            </ListItemIcon>
                                            <ListItemText primary={salon.name}>{salon.name}</ListItemText>
                                            <ListItemText secondary={salon.status} align="right"></ListItemText>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </TabPanel>
                    </Grid>
                    <Divider />

                </Grid>
                <Grid item xs={9}>
                    <List className={classes.messageArea}>
                        {
                            messages.map((message, index) => (
                                <ListItem key={index}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <ListItemText align={message.author ? "right" : "left"} secondary={message.author}></ListItemText>
                                            <ListItemText align={message.author ? "right" : "left"} primary={message.text}></ListItemText>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ListItemText align={message.author ? "right" : "left"} secondary="10:31"></ListItemText>
                                        </Grid>
                                    </Grid>

                                </ListItem>
                            ))
                        }
                    </List>
                    <Divider />
                    <Grid container style={{ padding: '20px' }}>
                        <Grid item xs={11}>
                            <TextField id="message" label="Votre message" fullWidth value={message} onKeyDown={handleKeyDown} onChange={handleChangeMessage} />
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab color="primary" aria-label="add" onClick={handleSubmit}><SendIcon /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Chat;







// import React from 'react'

// export const Chat = () => {
//   return (
//     <div className='container'>
//       <ul id="messages"></ul>
//       <form id="form" action="">
//         <input id="input" autocomplete="off" /><button>Send</button>
//       </form>
//       {/* <script>
//     var socket = io();

//     var form = document.getElementById('form');
//     var input = document.getElementById('input');

//     form.addEventListener('submit', function (e) {
//       e.preventDefault();
//       if (input.value) {
//         socket.emit('chat message', input.value);
//         input.value = '';
//       }
//     });

//     socket.on('chat message', function (msg) {
//       var item = document.createElement('li');
//       item.textContent = msg;
//       messages.appendChild(item);
//       window.scrollTo(0, document.body.scrollHeight);
//     });
//   </script> */}
//     </div>
//   )
// }
