import React, { useState} from "react";
import Board_component from './Board_component'
import axios from 'axios';  

export default function Home() {
  const link = getLink()
  const [boardLink, setBoardLink] = useState(link)

  function createBoard (){
    axios.post(`http://94.250.250.156:3000/api/v1/boards`)
      .then((response) => {
        setBoardLink(response.data.link);
    window.location = `${window.location.href}/${response.data.link}`; 
    })
  }

  return <div>
    {boardLink === 'boards' || boardLink === '' ? <button onClick={createBoard}> create board </button> : <Board_component/> }
  </div>
}

function getLink() {
  let url = window.location.href
  let splittedurl = url.split('/')
  let link = splittedurl[splittedurl.length - 1]
  return link
}