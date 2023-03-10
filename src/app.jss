import Card from "./components/Card";
import './App.css';
import { useEffect, useState } from "react";
import AddCard from "./components/AddCard";


const App= () => {
  const [db,setDb] = useState([]);
  let Entertainment = [];
  let Education = [];
  let Funny = [];
  db.map(video => {
    if(video.bucket === "Education"){
      Education.push(video);
    }else if(video.bucket === "Entertainment"){
      Entertainment.push(video);
    }else{
      Funny.push(video);
    }
  })


  useEffect(() => {
    fetch("http://localhost:3000/buckets")
    .then(res => res.json())
    .then(res => setDb(res))
    .catch(err => console.log(err));

  },[])


  const onDragOver = e => {
    e.preventDefault();
}

  const onDrop = (e, destBucket) => {
    let sourceChange = null;
    let destChange = null;

  let card = null;
  const index = e.dataTransfer.getData("index");
  const sourceBucket = e.dataTransfer.getData("sourceBucket");
  const id = e.dataTransfer.getData("id");

  let newData = db.filter((video) => {
    if(sourceBucket === video.bucket){
      card = video.videos.splice(index, 1);//returns an array out of array returns removed part of array from index to n
    }
    sourceChange = video;
    return video;
  });
  newData = newData.filter((video) => {
  if(destBucket === video.bucket){
     video.videos.unshift({"name":card[0].name, "link": card[0].link});
  }
  destChange = video;
  return video;
  })

  setDb(newData);
  fetch(`http://localhost:3000/buckets/?bucket=${sourceBucket}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: sourceChange
   
  })
  fetch(`http://localhost:3000/buckets/?bucket=${destBucket}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({destChange})
  })

}

  return (
    <div className="App">
    
    {db.map(({bucket,videos,id},index) => (
      <div key={index} className="bucket-container" onDragOver={e => onDragOver(e)} onDrop={(e) => onDrop(e, bucket)}>
        <p className="bucket-name">{bucket}</p>
        <AddCard data={db} setDb={setDb} bucket={bucket}/>
        {videos.map(({name,link},indexx) => (
          <Card id={id} key={name} name={name} link={link} index={indexx} sourceBucket={bucket}/>
    ))}

      </div>
    ))}
      
    </div>
  );
}

export default App;
