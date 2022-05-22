import React, { Component } from "react";
import { Link } from 'react-router-dom'

class Confirm extends Component{

    // componendidmount(){
    //     localStorage.clear()
    // }

    render(){
        return (
            <div className='confirm'>
                <Link to='/'>
                    {/* <Spinner spinning={''} /> */}
                    Redirecting....
                </Link>
            </div>
        )
    }

}

export default Confirm;