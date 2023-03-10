import Card from "./components/Card";
import './App.css';
import { useEffect, useState} from "react";
import AddCard from "./components/AddCard";
import Navbar from "./Navbar";




const App= () => {
  const [db,setDb] = useState([]);

  const [entertainment,setEntertainment] = useState([]);
  const [education,setEducation] = useState([]);
  const [funny,setFunny] = useState([]);

  useEffect(() => {
    let enter = [];
    let edu = [];
    let fun = [];
    fetch("http://localhost:3000/buckets")
    .then(res => res.json())
    .then(res => setDb(res))
    .catch(err => console.log(err));

    db.forEach((video) => {
      if(video.bucket === "Entertainment"){
        enter.push(video);
      }else if(video.bucket === "Education"){
        edu.push(video);
      }else {
        fun.push(video);
      }
    })
    setEducation(edu);
    setEntertainment(enter);
    setFunny(fun);
  },[db])


  const onDragOver = e => {
    e.preventDefault();
}

  const onDrop = (e, destBucket) => {
  e.preventDefault();
  console.log(destBucket)
  let newData = null;
  const ide = e.dataTransfer.getData("id");
  console.log(ide);

  const data = db.filter((video) => {
    if(video.id == ide){
      video.bucket = destBucket;
      newData = video;
    }
    return video;
  });
 
  fetch(`http://localhost:3000/buckets/${ide}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newData)
      })
  setDb(data);

}

  return (
    <div >
    <Navbar />
    <div className="App">
    <div className="bucket-container" onDragOver={e => onDragOver(e)} onDrop={(e) => onDrop(e, "Entertainment")}>
    <p className="bucket-name">Entertainment</p>
    <AddCard data={db} setDb={setDb} bucket="Entertainment"/>
    {entertainment.map(({bucket,id,name,link}) => (
      <Card key={id} id={id} name={name} link={link} sourceBucket={bucket} />
    ))}
    </div>

    <div className="bucket-container" onDragOver={e => onDragOver(e)} onDrop={(e) => onDrop(e, "Education")}>
    <p className="bucket-name">Education</p>
    <AddCard data={db} setDb={setDb} bucket="Education"/>
    {education.map(({bucket,id,name,link}) => (
      <Card data={db} setDb={setDb} key={id} id={id} name={name} link={link} sourceBucket={bucket} />
    ))}
    </div>

    <div className="bucket-container" onDragOver={e => onDragOver(e)} onDrop={(e) => onDrop(e, "Funny")}>
    <p className="bucket-name">Funny</p>
    <AddCard data={db} setDb={setDb} bucket="Funny"/>
    {funny.map(({bucket,id,name,link}) => (
      <Card data={db} setDb={setDb} key={id} id={id} name={name} link={link} sourceBucket={bucket} />
    ))}
    </div>
    </div>
     
    </div>
  );
}

export default App;
