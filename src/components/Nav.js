import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faInfo} from '@fortawesome/free-solid-svg-icons'
import { faBriefcase} from '@fortawesome/free-solid-svg-icons'
function Nav() {
    return (
        <nav className="navbar">
            <Link to="/about" className="left">
                <FontAwesomeIcon icon={faInfo} />
                <p className="text">about</p>
            </Link>
            <Link to="/" className="center">
                <FontAwesomeIcon icon={faBars} />
                <p className="text">&nbsp;home</p>
            </Link>
            <Link to="/works" className="right">
                <FontAwesomeIcon icon={faBriefcase} />
                <p className="text">portfolio</p>
            </Link>
        </nav>
    )
}

export default Nav;