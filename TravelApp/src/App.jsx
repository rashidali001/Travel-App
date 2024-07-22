import { useState } from 'react'



const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];



function App() {

  const [packingListItems, setPackingListItems] = useState([])
  

  return (

    <div className='app'>
     <Logo />
     <Form items={packingListItems} onAddingItems={setPackingListItems} />
     <Packinglist  items={packingListItems} />
     <Stats />
    </div>
    
  )
}

function Logo(){

  return <h1>🌴 Travel App 💼</h1>

}


function Form({items, onAddingItems}){

  const item = {quantity:1}
  const [placeHolder, setPlaceHolder] = useState("Item...")
  function handleForm(e){
    e.preventDefault();
    if (item.description == null){
      alert("Item is empty");
      return;
    }
    item.id = Date.now();
    item.packed = false;
    onAddingItems(items=> [...items, item]);
    
    
  }

  function handleSelect(e){
    item.quantity = e.target.value
  }

  function handleInput(e){

    item.description = e.target.value;

  }


  return(
    <form className='add-form' onSubmit={handleForm}>
      <h3>What do you need for your trip?</h3>
      <select onChange={handleSelect}>
        {Array.from({length:20},(_,i)=> i + 1).map(num=>(
          <option value={num} key={num}>{num}</option>
        ))
        }
      </select>
      <input onChange={handleInput} type="text" placeholder={placeHolder} />
      <button>ADD</button>    
    </form>
  )
  
}


function Packinglist({items}){

  return(
    <div className='list'>
      <ul>
        {items.map((item)=>(
          <li key={item.id}>
            <span style={{margin:"0 1px"}}>{item.quantity}</span>
            <span>{item.description}</span>
            <span style={{cursor:"pointer"}}>❌</span>
          </li>
        ))}
      </ul>

    </div>
  )
  
}


function Stats(){

  return (
    <div className='stats'>
      <p>You have X items on your list, and you already packed X (X%)</p>
    </div>
  )
  
}

export default App
