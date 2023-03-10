import React, { useState } from 'react';
import "./addCard.css";
import { Button } from 'antd';

const AddCard = ({data,setDb,bucket}) => {
    const [name,setName] = useState("");
    const [link, setLink] = useState("");

    const addVideo = () =>{
      let val = {"bucket":bucket,"name":name, "link": link};
      data.push(val)
      setDb(data);
      setName("");
      setLink("");
      fetch("http://localhost:3000/buckets/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(val)
      })
    }
  return (
    <div className='addCard'>
            <p>Add a video</p>
            <input className='addVideo' placeholder='Enter Unique Name...' value={name} onChange = {e => setName(e.target.value)} type="text" />
            <input className='addVideo' placeholder='Paste Link Here...' value={link} onChange = {e => setLink(e.target.value)} type="text" />
            <Button type='secondary' className="play-button" onClick={addVideo}>Add</Button>
      
    </div>
  )
}

export default AddCard


