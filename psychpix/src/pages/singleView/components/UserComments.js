import { useEffect, useState } from "react";
import UserReplies from './CommentReplies';
import { MegaphoneIcon, HeartIcon, ArrowUUpLeftIcon, PaperPlaneRightIcon } from "@phosphor-icons/react";
import Rating from "./Rating";
import { toast } from 'react-toastify';

function UserComment( {data} ){
    const [replyText, setReplyText] = useState('');
    const [isLiked, toggleLikeState] = useState(false);
    const [showReply, toggleReplyState] = useState(false);

    let DefaultProfilePic = `https://res.cloudinary.com/dgf9sqcdy/image/upload/v1748461716/DefaultProfilePic_xr1uie.jpg`;
    let username = "Guest";
    let profilePic = DefaultProfilePic;
    let userId = '6841edbdaf8a2cf16b83becc'; // fallback
    try {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user) {
            if (user.username) username = user.username;
            user.profilePic? (user.username == 'Guest'? profilePic = DefaultProfilePic : profilePic = user.profilePic) : profilePic = DefaultProfilePic;
            if (user.id || user._id) userId = user.id || user._id;
        }
    } catch {
        // keep defaults
    }

    const handleReplyChange = (event) => {
        setReplyText(event.target.value); // stores the text in state
    };
    
    let commentData = data.commentData;
    let userData = data.userData;
    const [likes, updateLikes] = useState(0);

    useEffect(() => {
        if(commentData != null && commentData != undefined){
            updateLikes(commentData.likes); 
        }
    }, []);

    if(commentData == null || !userData){
        return('');
    }

    let commentID = commentData._id;

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

    const timestamp = parseDDMMYYYY(commentData.timestamp); 
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
        const response = await fetch(`http://localhost:5000/api/comments/${commentID}/likes`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({ likes: commentData.likes + addLike })
        });
    }

    async function addReport(){
        const response = await fetch(`http://localhost:5000/api/comments/${commentID}/flags`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({ flags: commentData.flags + 1 })
        });
        if(response.ok){
            toast.success('Comment Reported');
        }
    }

    async function PostReply(comment){
        let userData = {
            username: username,
            profilePic: profilePic,
            comment: comment
        }
        try{
            const response = await fetch(`http://localhost:5000/api/replies/${commentID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                toast.success('Comment saved!');
            } else {
                const errorText = await response.text();
                toast.error("Error: ", errorText);
            }
        } 
        catch (err) {
            console.error('Fetch failed:', err);
        }
    }

    let repliesData = commentData.replies;

    return(
        <div className="userCommentContainer">
            <div className="UserCommentBlock">
                <img className='CommentProfilePic' src={userData.username === "Guest" ? `https://res.cloudinary.com/dgf9sqcdy/image/upload/v1748461716/DefaultProfilePic_xr1uie.jpg` : userData.profilePic} style={{gridArea: 'userPic'}}/>
                <h1 className='domine-Label m-0' style={{gridArea: 'userName'}}>{userData.username}</h1>
                <h5 className="jost-light userTimeStamp" style={{gridArea: 'userTimeStamp'}}>{currentTimeAgo}</h5>
                <div className='StarRatingBlock' style={{gridArea: 'userRating', fontSize: 'clamp(20px, 4vw, 42px)'}}>
                    <Rating canRate={false} userRating={commentData.rating} />
                </div>
                
                <div className='userComment' style={{gridArea: 'userComment'}}>
                    <h4 className="jost-light">
                        {commentData.comment}
                    </h4>
                    <div className="userInteract">
                        <div className="userHearts">
                            <HeartIcon onClick={() => ToggleLike()} className="commentIcon" style={{ cursor: 'pointer', '--hover-color': '#FF0088', color: isLiked? '#FF0088' : 'rgba(255, 255, 255, 0.443)'}} size={42} weight={isLiked? "fill": "light"} />
                            <h6 className="jost-light">{likes}</h6>
                        </div>
                        <div>
                            <ArrowUUpLeftIcon onClick={() => toggleReplyState(!showReply)} className="commentIcon" style={{ cursor: 'pointer', '--hover-color': '#5555FF', color: showReply? '#5555FF' : 'rgba(255, 255, 255, 0.443)'}} size={42} weight="light" />
                        </div>
                        <div>
                            <MegaphoneIcon onClick={() => addReport()} className="commentIcon" style={{ cursor: 'pointer', '--hover-color': '#FF0000'}} size={42} weight="light" />
                        </div>
                    </div>

                    <div className='replyInputContainer' style={{ height: showReply? '100px' : 0 , paddingTop: '32px'}}>
                        <form id='commentForm' onSubmit={(e) => {
                            e.preventDefault();
                            PostReply(replyText);
                            setReplyText('');
                            }}>
                            <input className='CommentInput' placeholder="My experience was.. " name="Comment" onChange={handleReplyChange} value={replyText}>
                            
                            </input>
                            <span>
                                <button type="submit" className='submitCommentButton'>
                                    <span id='iconElement'><PaperPlaneRightIcon size={48} weight="light" /></span>
                                </button>
                            </span>
                        </form>
                    </div>
                </div>    
            </div> 
            <div style={{gridArea: 'userReply', display: 'block'}}>
                {repliesData.map((item, index) => {
                    return(
                        <UserReplies key={index} data={item} commentID={commentID} />
                    );
                })}
            </div>
        </div>
    )
}

export default UserComment;