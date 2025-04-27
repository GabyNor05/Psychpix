import { useEffect, useState } from "react";
import UserReplies from './CommentReplies';
import { Star, Heart, ArrowUUpLeft, PaperPlaneRight } from "@phosphor-icons/react";
import { UserData } from '../../Userdata';

function UserComment( {userProfilePic, userName, userComment, userReplies, callback}){
    const [inputText, setInputText] = useState('');
    const [currentUserData, SetUserData] = useState(null);
    
    useEffect(() => {
        SetUserData(UserData);
    }, []);

    console.log(currentUserData);

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
                    <span><Star weight="fill" /></span>
                    <span><Star weight="fill" /></span>
                    <span><Star weight="fill" /></span>
                    <span><Star weight="light" /></span>
                    <span><Star weight="light" /></span>
                </div>
                <div className='userComment' style={{gridArea: 'userComment'}}>
                    <h4 className="jost-light">
                        {userComment}
                    </h4>
                    <div className="userInteract">
                        <div className="userHearts">
                            <Heart size={42} color="#FFFFFF55" weight="light" />
                            <h6 className="jost-light">{Math.floor(Math.random() * 999)}</h6>
                        </div>
                        <div>
                            <ArrowUUpLeft size={42} color="#FFFFFF55" weight="light" />
                        </div>
                    </div>

                    <div className='replyInputContainer'>
                        <form id='commentForm'>
                            <input className='CommentInput' placeholder="My experience was.. " name="Comment" onChange={handleChange} value={inputText}>
                            
                            </input>
                            <span>
                                <div className='submitCommentButton' onClick={() => callback(handleAddReply)}>
                                    <span id='iconElement'><PaperPlaneRight size={48} weight="light" /></span>
                                </div>
                            </span>
                        </form>
                    </div>
                </div>    
            </div>

            <div style={{gridArea: 'userReply'}}>
                <UserReplies userProfilePic={userReplies.profilePic} userName={userReplies.userName} userComment={userReplies.UserComment} />
            </div>  
        </div>
    )
}

export default UserComment;