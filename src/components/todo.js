import React from 'react'
import "./style.css"
const getLocalStorage=()=>{
    const list=localStorage.getItem("mytodostorage");
    if(list){
        return JSON.parse(list);
    }
    else{
        return [];
    }
}

const Todo = () => {
    
  const [inputData,setinputData]=React.useState("");
  const [item,setItem]=React.useState(getLocalStorage());
  const [togglebtn,setToggleBtn]=React.useState(false);
  const [idattoggle,setidAtToggle]=React.useState("");
  const additems=()=>{
     if(!inputData){
        alert("Plese write first")
     }
     else if(inputData&&togglebtn){
        setItem(
            item.map((curr)=>{
                if(curr.id==idattoggle){
                return({...curr,name:inputData})
                }
                else{
                    return curr;
                }
            })
        )
        setToggleBtn(false);
        setinputData("");
        setidAtToggle("");

     }
     else{
        
        const obj={
            id:new Date().getTime().toString(),
            name:inputData
        }
        setItem([...item,obj]);
        setinputData("");
        setToggleBtn(false);
     }
  }
  const removeAll=()=>{
    setItem([]);
  }
  const deleteone=(index)=>{
     const updateditem=item.filter((curr)=>{
        return curr.id!==index
     })
     setItem(updateditem);}
  const edit=(index)=>{
    const editfil=item.find((curr)=>{
        return curr.id==index
    })
    setinputData(editfil.name);
    setToggleBtn(true);
    setidAtToggle(index);
    // editfil.name=inputData;
  }
  
    React.useEffect(() => {
       localStorage.setItem("mytodostorage",JSON.stringify(item));
      
    }, [item])
    
  
  
  return (
    <>
   
    <div className='veryfirstdiv'>
    <h1>Heyy 🙋‍♂️ Lets Try My Momo List 👇 </h1>
    <div className='main-div'>
        
        <div className='child-div'>
            <figure>
                <img src='./images/todo.svg'></img>
                <figcaption>JUST add ! your list here and feel free😎</figcaption>
            </figure>
            <div className='addItems'><input type="text" placeholder='✍️ Write here ' className='form-control' value={inputData} onChange={(event)=>setinputData(event.target.value)}/>
            {togglebtn?<i className='far fa-edit add-btn' onClick={additems}></i>:<i className ="fa fa-plus add-btn" onClick={additems}></i>}</div>
            <div className='showItems'>
             {item.map((curr)=>{
                return(
                <div className='eachItem' >
                    <h3>{curr.name}</h3>
                    <div className='todo-btn'>
                        <i className='far fa-edit add-btn' onClick={()=>{
                            edit(curr.id)
                        }}></i>
                        <i className='far fa-trash-alt add-btn' onClick={()=>{
                            deleteone(curr.id)
                        }}></i>
                    </div>
                </div>)
             })}
                
            </div>
            <div className='showItems'><button className="btn effect04" data-sm-link-text = "Remove All" onClick={removeAll}><span>Check List</span></button></div>
        </div>
    </div>
    </div>
    
    </>
    
  )
}

export default Todo