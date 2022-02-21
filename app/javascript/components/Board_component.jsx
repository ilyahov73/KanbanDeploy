import React, { useState , useEffect} from "react";
import axios from 'axios';  


function Card_component(props) {
  const [inputValue, setInputValue] = useState(props.cardTitle);

  function handleChange(event) {
		setInputValue(event.target.value);
	}

  function deleteCard (){
    axios.delete(`http://94.250.250.156:3000/api/v1/cards/${props.cardId}`)
      .then(() => props.deleteDestroyedCardFromCards(props.cardId)) 
  }

  function moveCardToLeft(){
    if (props.columnPosition != 1){
      props.moveCardToLeftColumn(inputValue, props.cardId)
    }
  }

  function moveCardToRight(){
    props.moveCardToRightColumn(inputValue, props.cardId)
  }
  return (
    <div className="card">
      <input type="text" value={inputValue} name="login" onKeyUp={(e) => props.handleUpdateCard(e.code, inputValue, props.cardId)} onChange={handleChange}/>
      <button onClick={moveCardToLeft}>Left</button> 
      <button onClick={deleteCard}>Delete</button> 
      <button onClick={moveCardToRight}>Right</button> 
    </div>
  );
}


function Colomn_component(props) {
  const [cards, setCards] = useState([]);
  const [inputValue, setInputValue] = useState('');

  function deleteDestroyedCardFromCards (cardId) {
    const newCards = cards.filter((card) => card.id !== cardId)
    setCards(newCards)
  }

  function moveCardToLeftColumn(cardTitle, cardId){
    axios.put(`http://94.250.250.156:3000/api/v1/card_move_left/${cardId}`)
    .then(() => {props.moveCardToLeftColumnWithUpdate(cardTitle)})
  }

  function moveCardToRightColumn(cardTitle, cardId){
    axios.put(`http://94.250.250.156:3000/api/v1/card_move_right/${cardId}`)
    .then(() => {props.moveCardToRightColumnWithUpdate(cardTitle)})
  }

  function handleChange(event) {
		setInputValue(event.target.value);
	}
  
  function handleKeyPress(e) {
    if (e.code == "Enter") {
      axios.post(`http://94.250.250.156:3000/api/v1/cards`,{ card: { title:  inputValue, colomn_id: props.columnId}})
      .then((response) => {
        setCards([...cards, response.data])
        setInputValue("")
      })
    }
  }

  function handleUpdateCard(code, value, cardId) {
    if (code == "Enter") {
      axios.put(`http://94.250.250.156:3000/api/v1/cards/${cardId}`, { card: { title:  value}})
      .then((response) => {
        const newCards = cards.filter((card) => {
          if (card.id === response.data.id) {
            card.title = response.data.title
            return card
          } else {
            return card
          }
        })
        setCards(newCards);
      })
    }
  }

  useEffect(() => {
    axios.get(`http://94.250.250.156:3000/api/v1/cards/${props.columnId}`)
    .then((response) => {
      setCards(response.data);
    })
  }, []);

  console.log('columnId: ', props.columnId, ' cards: ', cards);
  return <div className="colomn">
    <h3>{props.columnTitle}</h3>
    <button onClick={() => props.deleteColumn(props.columnId)}>Delete</button> 
    {cards.map((card) => {
        return <Card_component 
          key={card.id} 
          cardTitle={card.title}
          cardId={card.id} 
          columnPosition = {props.columnPosition}
          deleteDestroyedCardFromCards = {deleteDestroyedCardFromCards} 
          moveCardToLeftColumn = {moveCardToLeftColumn}
          moveCardToRightColumn = {moveCardToRightColumn}
          handleUpdateCard = {handleUpdateCard} /> ;
      })}
    <input type="text" value={inputValue} name="login" onKeyUp={(e) => handleKeyPress(e)} onChange={handleChange}/>
  </div>
}


export default function Board_component() {
  const link = getLink()
  const [board, setBoard] = useState(null);
  const [columns, setColumns] = useState([]);
  const [inputAddColumnValue, setInputAddColumnValue] = useState('');

  function deleteColumn (columnId){
    axios.delete(`http://94.250.250.156:3000/api/v1/colomns/${columnId}`)
      .then(() => {
        const newColumns = columns.filter((column) => column.id !== columnId);
        setColumns(newColumns)
    })
  }
  
  function moveCardToLeftColumnWithUpdate() {
    setColumns([])
    axios.get(`http://94.250.250.156:3000/api/v1/colomns/${board.id}`)
      .then((response) => {
        setColumns(response.data);
    })
  }

  function moveCardToRightColumnWithUpdate() {
    setColumns([])
    axios.get(`http://94.250.250.156:3000/api/v1/colomns/${board.id}`)
      .then((response) => {
        setColumns(response.data);
    })
  }

  function handleChangeAddColumn(event) {
		setInputAddColumnValue(event.target.value);
	}

  function handleKeyPressAddColumn(e) {
    let newColumnPosition = 1
    columns.map((column) => {
      newColumnPosition +=1
    })

    if (e.code == "Enter") {
      axios.post(`http://94.250.250.156:3000/api/v1/colomns`,{ colomn: { title:  inputAddColumnValue, position: newColumnPosition, board_id: board.id}})
      .then((response) => {
        setColumns([...columns, response.data])
        setInputAddColumnValue("")
      })
    }
  }

  useEffect(() => {
    axios.get(`http://94.250.250.156:3000/api/v1/boards/${link}`)
    .then((response) => {
      setBoard(response.data);
    })
  }, []); 

  useEffect(() => {
    if (board !== null && board !== undefined) {
      axios.get(`http://94.250.250.156:3000/api/v1/colomns/${board.id}`)
      .then((response) => {
        setColumns(response.data);
      })
    }
  }, [board]);


  return <div>
    {columns.map((column) => {
    return <Colomn_component 
    key={column.id} 
    columnTitle={column.title} 
    columnId={column.id} 
    columnPosition={column.position} 
    deleteColumn = {deleteColumn} 
    moveCardToLeftColumnWithUpdate = {moveCardToLeftColumnWithUpdate}
    moveCardToRightColumnWithUpdate = {moveCardToRightColumnWithUpdate}/>
    })}
    <input type="text" value={inputAddColumnValue} name="login" onKeyUp={(e) => handleKeyPressAddColumn(e)} onChange={handleChangeAddColumn}/>
  </div>
}

function getLink() {
  let url = window.location.href
  let splittedurl = url.split('/')
  let link = splittedurl[splittedurl.length - 1]
  return link
}

