import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

interface LogoProps {
    classes?: string;
}

function Logo({ classes }: LogoProps) {
    return (
        <Link to="/" className="cursor-pointer">
            <img
                src={logo}
                alt="DineFlow"
                width={500}
                height={500}
                className={classes}
            />
        </Link>
    );
}

export default Logo;
