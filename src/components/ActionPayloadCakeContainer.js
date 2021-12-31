import React,{useState} from 'react'
import { buyCake } from '../redux/cake/CakeActions'
import {connect} from 'react-redux';

function ActioPayloadCakeContainer(props){
    const [number, setnumber]=useState(1)
    return (
        <div>
            <h2>Number of Cakes - {props.numberOfCakes}</h2>
            <input type='text' value={number} onChange={(e)=>setnumber(e.target.value)}/>
            <button onClick={()=>props.buyCake(number)}> Buy {number} Cakes</button>
        </div>
    )
}

const mapStateProps=state=>{
    return{
        numberOfCakes:state.cake.numberOfCakes
    }
}

const mapDispatchToProps= dispatch=>{
    return{
        buyCake:number=>dispatch(buyCake(number))
    }
}
export default connect(mapStateProps,mapDispatchToProps)(ActioPayloadCakeContainer)