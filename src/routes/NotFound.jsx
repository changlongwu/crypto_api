import {Link} from "react-router-dom";
const NotFound = ()=>{
    return (
        <div>
            <p>There's nothing here!</p>
            <Link to="/">
            Back to home
            </Link>
        </div>
    )

}

export default NotFound;