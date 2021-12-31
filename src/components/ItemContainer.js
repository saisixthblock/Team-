import React from "react";
import {connect} from 'react-redux';
import { buyCake } from "../redux/cake/CakeActions";
import { buyIceCream } from "../redux/iceCream/IceCreamAction";

function ItemContainer(props){
    return(
        <div>
            <h2>Item - {props.item}</h2>
            <button onClick={props.buyItem}>Buy Item</button>
        </div>
    )
}

const mapStateProps=(state,OwnProps)=>{
    const items=OwnProps.cake ? state.cake.numberOfCakes : state.iceCream.numberOfIceCreams
    return {
        item: items
    }
}

const mapDispatchToProps=(dispatch,OwnProps)=>{
    const dispatchFunction=OwnProps.cake ?()=> dispatch(buyCake()) :()=> dispatch(buyIceCream())
    return {
        buyItem:dispatchFunction
    }
}

export default connect(mapStateProps,mapDispatchToProps)(ItemContainer)