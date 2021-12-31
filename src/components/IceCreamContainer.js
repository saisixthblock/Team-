import React from "react";
import { buyIceCream } from "../redux/iceCream/IceCreamAction";
import {connect} from 'react-redux';

function IceCreamContainer(props){
    return(
        <div>
            <h2> Number of IceCreams-{props.numberOfIceCreams}</h2>
            <button onClick={props.buyIceCream}>Buy IceCreams</button>
        </div>
    )
}

const mapStateProps=state=>{
    return{
        numberOfIceCreams: state.iceCream.numberOfIceCreams
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        buyIceCream:()=>dispatch(buyIceCream())
    }
}
export default connect(mapStateProps,mapDispatchToProps)(IceCreamContainer)