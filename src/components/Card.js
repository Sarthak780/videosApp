import React,{ useState} from 'react'
import "./card.css"
import { Modal, Button } from 'antd';


const Card = ({name,link,id,sourceBucket,data, setDb}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
    
    const onDragStart = (e,sourceBucket) => {
        e.dataTransfer.setData("sourceBucket", sourceBucket);
        e.dataTransfer.setData("id", id);
    }
    const onPlay = () => {
      setIsModalVisible(true);
      const date = new Date();
      fetch("http://localhost:3000/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"name" : name, "link" : link, "time": date})
      })


    }

  return (
    <>
    <Modal style={{textAlign:"center",}} width="70vw" bodyStyle={{height:"60vh",padding:"10px"}} footer={null} title={name}
    open={isModalVisible} onOk={() => setIsModalVisible(false)} onCancel={() => setIsModalVisible(false)} >
    <iframe src={link} style={{height:"50vh",width:"50vw",margin:0,padding:0,border:"1px solid black"}}></iframe>
    
   </Modal>
    <div className='card-container' draggable onDragStart={(e) => onDragStart(e,sourceBucket)} >
        <p className='card-title'>{name}</p>
        <div className='buttons'>
        <Button className='play-button' type='secondary'>Edit</Button>
        <Button className='play-button' type="secondary" onClick={() => {onPlay()}}> Play </Button>
        <Button className='play-button' type='secondary'>Delete</Button>
      </div>
    </div>
    </>
  )
}

export default Card
