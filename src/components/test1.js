import React, { Component } from "react";

class Test1 extends Component{
    state={
        message="Hello"
    }

    changeData=(event)=>{
        [event.target.name]=event.target.value
    }

    changeName=()=>{
        this.setState({
            message:'Good Bye..'
        })
    }
    render(){
        return(
            <div>
                <input type='text' value={this.state.message}  onChange={this.changeData}/>
                <button onClick={this.changeName}>Click me</button>
            </div>
        )
    }
}
export default Test1