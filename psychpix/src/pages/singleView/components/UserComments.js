import { useEffect, useState } from "react";
import UserReplies from './CommentReplies';
import { StarIcon, HeartIcon, ArrowUUpLeftIcon, PaperPlaneRightIcon } from "@phosphor-icons/react";

function UserComment( {userProfilePic, userName, userComment, userReplies, callback}){
    const [inputText, setInputText] = useState('');
    const [currentUserData, SetUserData] = useState(null);

    const handleChange = (event) => {
        setInputText(event.target.value); // stores the text in state
    };

    const handleAddReply = () => {
        const replyData = {
            profilePic: currentUserData.profilePic,
            userName: currentUserData.userName,
            userComment: inputText
        };
        callback(replyData);
        setInputText('');  // Clear the input after adding the reply
    };

    return(
        <div className="userCommentContainer">
            <div className="UserCommentBlock">
                <img className='CommentProfilePic' src={userProfilePic} style={{gridArea: 'userPic'}}/>
                <h1 className='domine-Label m-0' style={{gridArea: 'userName'}}>{userName}</h1>
                <h5 className="jost-light userTimeStamp" style={{gridArea: 'userTimeStamp'}}>{Math.floor(Math.random() * 24)}h ago</h5>
                <div className='StarRatingBlock' style={{gridArea: 'userRating', fontSize: 'clamp(20px, 4vw, 42px)'}}>
                    <span><StarIcon weight="fill" /></span>
                    <span><StarIcon weight="fill" /></span>
                    <span><StarIcon weight="fill" /></span>
                    <span><StarIcon weight="light" /></span>
                    <span><StarIcon weight="light" /></span>
                </div>
                
                <div className='userComment' style={{gridArea: 'userComment'}}>
                    <h4 className="jost-light">
                        {userComment}
                    </h4>
                    <div className="userInteract">
                        <div className="userHearts">
                            <HeartIcon size={42} color="#FFFFFF55" weight="light" />
                            <h6 className="jost-light">{Math.floor(Math.random() * 999)}</h6>
                        </div>
                        <div>
                            <ArrowUUpLeftIcon size={42} color="#FFFFFF55" weight="light" />
                        </div>
                    </div>

                    <div className='replyInputContainer' style={{ height: '0' }}>
                        <form id='commentForm'>
                            <input className='CommentInput' placeholder="My experience was.. " name="Comment" onChange={handleChange} value={inputText}>
                            
                            </input>
                            <span>
                                <div className='submitCommentButton' onClick={() => callback(handleAddReply)}>
                                    <span id='iconElement'><PaperPlaneRightIcon size={48} weight="light" /></span>
                                </div>
                            </span>
                        </form>
                    </div>
                </div>    
            </div> 
            <div style={{gridArea: 'userReply', display: 'none'}}>
                {userReplies.map((item, index) => {
                    return(
                        <UserReplies key={index} userProfilePic={item.userProfilePic} userName={item.userName} userComment={item.userComment} />
                    );
                })}
            </div>
        </div>
    )
}

export default UserComment;