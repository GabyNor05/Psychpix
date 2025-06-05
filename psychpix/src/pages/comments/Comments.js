import './css/Comments.css';
import FlaggedComments from './components/FlaggedComments';
import Navbar from '../home/components/Navbar';

function DisplayComments(){
    return(
        <>       
            <FlaggedComments />
        </>
    )
}

export default DisplayComments;