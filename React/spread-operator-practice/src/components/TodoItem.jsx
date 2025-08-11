import React,{useState} from "react";

// function ToDoItem(props) {
//     const [lineThrough,setLineThrough] = useState(false);
//     function lineThroughItem(){
//         setLineThrough(prevValue => !prevValue);
//     }
//   return (
//     <div onClick={lineThroughItem}>
//       <li style={{textDecoration: lineThrough ? "line-through":"none"}}>{props.text}</li>
//     </div>
//   );
// }

function ToDoItem(props){
    return (
       <div onClick={()=>{
        props.onChecked(props.id)
       }}>
       <li>{props.text}</li>
     </div> 
    )
}

export default ToDoItem;
