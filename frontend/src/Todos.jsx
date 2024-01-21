import "./Todos.css";

function Todos(props){
        
    function handleclick(value){
        console.log(value);
        fetch("http://localhost:5000/updatetodo", {  
            method: "POST",
            headers: {
                'Content-Type': 'application/json', 
              },
              body:JSON.stringify({
                id:value
              })
            }).then(async function (res) {
                const json = await res.json();
                console.log(json);
                window.location.reload();
              })
            
    }
           
    return(
        <div className="alltodos" style={{display:props.display , display:"flex"}}>
        <div className="allcontent">
         <div className="alltitle">{props.title} {console.log(props.id)}</div>
         <div  className="alldescription">{props.description}</div>
         </div>
         <div className="delete"><button onClick={() => handleclick(props.id)}>Completed</button></div>
        </div>
    )
}

export default Todos;