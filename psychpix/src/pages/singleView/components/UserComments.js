import { useEffect, useState } from "react";
import UserReplies from './CommentReplies';
import { MegaphoneIcon, HeartIcon, ArrowUUpLeftIcon, PaperPlaneRightIcon } from "@phosphor-icons/react";
import Rating from "./Rating";

function UserComment( {data} ){
    const [inputText, setInputText] = useState('');
    const [currentUserData, SetUserData] = useState(null);
    const [isLiked, toggleLikeState] = useState(false);

    const handleChange = (event) => {
        setInputText(event.target.value); // stores the text in state
    };

    const handleAddReply = () => {
        const replyData = {
            profilePic: currentUserData.profilePic,
            userName: currentUserData.userName,
            userComment: inputText
        };
        setInputText('');  // Clear the input after adding the reply
    };

    let commentData = data.commentData;
    let userData = data.userData;

    if(commentData == null || !userData){
        return('');
    }

    let commentID = commentData._id;

    async function ToggleLike(){
        toggleLikeState(!isLiked);
        let addLike = !isLiked? 1 : -1;
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
            alert('Comment Reported');
        }
    }

    return(
        <div className="userCommentContainer">
            <div className="UserCommentBlock">
                <img className='CommentProfilePic' src='https://res.cloudinary.com/dgf9sqcdy/image/upload/v1748461716/DefaultProfilePic_xr1uie.jpg' style={{gridArea: 'userPic'}}/>
                <h1 className='domine-Label m-0' style={{gridArea: 'userName'}}>{userData.username}</h1>
                <h5 className="jost-light userTimeStamp" style={{gridArea: 'userTimeStamp'}}>{Math.floor(Math.random() * 24)}h ago</h5>
                <div className='StarRatingBlock' style={{gridArea: 'userRating', fontSize: 'clamp(20px, 4vw, 42px)'}}>
                    <Rating canRate={false} userRating={commentData.rating} />
                </div>
                
                <div className='userComment' style={{gridArea: 'userComment'}}>
                    <h4 className="jost-light">
                        {commentData.comment}
                    </h4>
                    <div className="userInteract">
                        <div className="userHearts">
                            <HeartIcon onClick={() => ToggleLike(isLiked)} className="commentIcon" style={{ cursor: 'pointer', '--hover-color': '#FF0088'}} size={42} weight={isLiked? "fill": "light"} />
                            <h6 className="jost-light">{commentData.likes}</h6>
                        </div>
                        <div>
                            <ArrowUUpLeftIcon className="commentIcon" style={{ cursor: 'pointer', '--hover-color': '#5555FF'}} size={42} weight="light" />
                        </div>
                        <div>
                            <MegaphoneIcon onClick={() => addReport()} className="commentIcon" style={{ cursor: 'pointer', '--hover-color': '#FF0000'}} size={42} weight="light" />
                        </div>
                    </div>

                    <div className='replyInputContainer' style={{ height: '0' }}>
                        <form id='commentForm'>
                            <input className='CommentInput' placeholder="My experience was.. " name="Comment" onChange={handleChange} value={inputText}>
                            
                            </input>
                            <span>
                                <div className='submitCommentButton'>
                                    <span id='iconElement'><PaperPlaneRightIcon size={48} weight="light" /></span>
                                </div>
                            </span>
                        </form>
                    </div>
                </div>    
            </div> 
            {/* <div style={{gridArea: 'userReply', display: 'none'}}>
                {userReplies.map((item, index) => {
                    return(
                        <UserReplies key={index} userProfilePic={item.userProfilePic} userName={item.userName} userComment={item.userComment} />
                    );
                })}
            </div> */}
        </div>
    )
}

export default UserComment;