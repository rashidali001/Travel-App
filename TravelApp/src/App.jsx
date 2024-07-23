import { useState } from 'react'

function App() {

  const [packingListItems, setPackingListItems] = useState([])


  function handleCheckedItem(id){

    setPackingListItems((packingListItems) => packingListItems.map(
      (item) => item.id === id?{...item, packed : !item.packed}: item
    ))

  }

  function handleDeletedItem(id){

    setPackingListItems((packingListItems)=> packingListItems.filter(
      (item) => item.id !== id
    ))
  }


  

  return (

    <div className='app'>
     <Logo />
     <Form  onAddingItems={setPackingListItems} />
     <Packinglist onHandleChecked={handleCheckedItem} onHandleDelete={handleDeletedItem}  items={packingListItems} />
     <Stats />
    </div>
    
  )
}

function Logo(){

  return <h1>🌴 Travel App 💼</h1>

}


function Form({onAddingItems}){

  const item = {quantity:1, packed:false}
  const [placeHolder, setPlaceHolder] = useState("Item...")
  const [seletedQuantity, setSelectedQuantity] = useState(1)

  function handleForm(e){
    e.preventDefault();
    if (item.description == null){
      alert("Item is empty");
      return;
    }
    item.id = Date.now();
    item.quantity = seletedQuantity;
    onAddingItems(items=> [...items, item]);
    setSelectedQuantity(1); 
    const inputDescription = document.getElementById("input");
    inputDescription.value = "";
    console.log(item);
  }

  function handleSelect(e){
    setSelectedQuantity(parseInt(e.target.value));    
    item.quantity = seletedQuantity;
  }

  function handleInput(e){
    item.description = e.target.value;
    
  }


  return(
    <form className='add-form' onSubmit={handleForm}>
      <h3>What do you need for your trip?</h3>
      <select value={seletedQuantity} onChange={handleSelect}>
        {Array.from({length:20},(_,i)=> i + 1).map(num=>(
          <option value={num} key={num}>{num}</option>
        ))
        }
      </select>
      <input id='input' onChange={handleInput} type="text" placeholder={placeHolder} />
      <button>ADD</button>    
    </form>
  )
  
}


function Packinglist({items, onHandleChecked, onHandleDelete}){

  return(
    <div className='list'>
      <ul>
        {items.map((item)=>(
          <li key={item.id}>
            <input type="checkbox" value={item.packed} onChange={()=>onHandleChecked(item.id)} />
            <span style={item.packed?{textDecoration:"line-through"}:{}}>
            <span style={{margin:"0 1px"}}>{item.quantity}</span>
            <span>{item.description}</span>
            </span>
            <span style={{cursor:"pointer"}} onClick={()=> onHandleDelete(item.id)}>❌</span>
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
