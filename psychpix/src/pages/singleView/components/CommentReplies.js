import { Star, Heart, MegaphoneIcon, PaperPlaneRight } from "@phosphor-icons/react";
import lineSquare from '../../home/images/lil_square2.png';
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';

function UserCommentReplies( {data, commentID} ){
    const [likes, updateLikes] = useState(0);
    const [isLiked, toggleLikeState] = useState(false);
    
    useEffect(() => {
        if(data != null && data != undefined){
            updateLikes(data.likes); 
        }
    }, []);

    function parseDDMMYYYY(dateStr) {
        if (typeof dateStr !== 'string') {
            console.warn("Invalid date string:", dateStr);
            return new Date(NaN); // invalid date
        }

        const parts = dateStr.split('/');
        if (parts.length < 3) {
            console.warn("Unexpected date format:", dateStr);
            return new Date(NaN);
        }

        const [day, month, rest] = parts;
        if (!rest) {
            console.warn("Missing year/time portion:", dateStr);
            return new Date(NaN);
        }

        const restParts = rest.trim().split(' ');
        if (restParts.length < 3) {
            console.warn("Expected 'YYYY hh:mm AM/PM' format, got:", rest);
            return new Date(NaN);
        }

        const [year, time, meridiem] = restParts;
        const [hourStr, minuteStr] = time.split(':');

        let hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr, 10);

        if (meridiem === 'PM' && hour !== 12) hour += 12;
        if (meridiem === 'AM' && hour === 12) hour = 0;

        const isoString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;

        return new Date(isoString);
    }


    const timestamp = parseDDMMYYYY(data.timestamp); 
    const now = new Date();

    const msAgo = Math.abs(now.getTime() - timestamp.getTime());

    function TimeAgo(msAgo) {
        const seconds = Math.floor(msAgo / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
        if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        if (hours < 24)   return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    }

    const currentTimeAgo = TimeAgo(msAgo);
    
    async function ToggleLike(){
        toggleLikeState(!isLiked);
        let addLike = !isLiked? 1 : -1;
        updateLikes(likes + addLike);

        if(addLike === -1){
            addLike = 0;
        }
        const response = await fetch(`http://localhost:5000/api/replies/${commentID}/replies/${data._id}/like`, {
            method: 'PUT'
        });
    }

    async function addReport(){
        const response = await fetch(`http://localhost:5000/api/replies/${commentID}/replies/${data._id}/flag`, {
            method: 'PUT'
        });
        if(response.ok){
            toast.success('Comment Reported');
        }
    }

    return(
        <>
            <div className="UserReplyBlock">
                <img className='lineSquareTL' src={lineSquare} alt='lilSquare'/>
                <img className='CommentProfilePic' src={data.username === "Guest"? `https://res.cloudinary.com/dgf9sqcdy/image/upload/v1748461716/DefaultProfilePic_xr1uie.jpg` : data.profilePic} style={{gridArea: 'userPic'}}/>
                <h1 className='domine-Label m-0' style={{gridArea: 'userName', alignSelf: 'center'}}>{data.username}</h1>
                <h5 className="jost-light userTimeStamp" style={{gridArea: 'userTimeStamp'}}>{currentTimeAgo}</h5>

                <div className='userComment' style={{gridArea: 'userComment'}}>
                    <h4 className="jost-light">
                        {data.comment}
                    </h4>
                    <div className="userInteract">
                        <div className="userHearts">
                            <Heart onClick={() => ToggleLike()} className="commentIcon" style={{ cursor: 'pointer', '--hover-color': '#FF0088', color: isLiked? '#FF0088' : 'rgba(255, 255, 255, 0.443)'}} size={42} weight={isLiked? "fill": "light"} />
                            <h6 className="jost-light">{likes}</h6>
                        </div>
                        <div>
                            <MegaphoneIcon onClick={() => addReport()} className="commentIcon" style={{ cursor: 'pointer', '--hover-color': '#FF0000'}} size={42} weight="light" />
                        </div>
                    </div>
                    <div>
                </div>
                </div> 
            </div>
        </>
    )
}

export default UserCommentReplies;