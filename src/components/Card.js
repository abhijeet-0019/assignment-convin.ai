import React, { useEffect, useState } from 'react';
import { Tabs, Button } from 'antd';
import ReactPlayer from 'react-player';
import '../antd.css';

const { TabPane } = Tabs;

export default function Card({ id, name, videolink, category, onDelete, onSwitchCategory }) {
    const handleDeleteClick = () => {
        onDelete(id);
    };

    const [playing, setPlaying] = useState(false);

    const handlePlaying = () => {
        console.log("hello there mate")
        const currentTime = new Date().toLocaleString();
        const historyObj = {
            name: name,
            time: currentTime
        };
        fetch(`http://localhost:5000/history`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(historyObj)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    };

    return (
        <div className="card" key={id}>
            <h1>{name}</h1>
            {videolink ? (
                <ReactPlayer
                    url={videolink}
                    playing={playing}
                    width="100%"
                    height="300px"
                    onPlay={handlePlaying}
                />
            ) : (
                <div className="placeholder">
                    <p>Video not available</p>
                </div>
            )}
            <p>Category: {category}</p>
            <Button onClick={handleDeleteClick}>Delete</Button>
            <Button onClick={() => setPlaying(true)}>Play</Button>
            <Button onClick={() => setPlaying(false)}>Pause</Button>
        </div>
    );
};