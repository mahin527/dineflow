
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

// interface LogoProps {
//     classes?: string;
// }

// function Logo({ classes }: LogoProps) {
function Logo() {

    return (

        <Link to="/" className='cursor-pointer'>
            <img src={logo} alt="DineFlow" width={300} height={300} className="w-36 h-auto sm:w-42 md:w-50 2xl:w-54" />
        </Link>

    );
}

export default Logo