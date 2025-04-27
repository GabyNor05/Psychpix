import ProfilePic from '../images/pfp.webp';
import { Star, PaperPlaneRight } from "@phosphor-icons/react";
import UserComment from './UserComments';
import { useState } from 'react';

function addComment (profilePic, userName, userComment){
    return(<UserComment userProfilePic={profilePic} userName={userName} userComment={userComment} />);
}

let currentUserName = 'Mike Hunt';

function CommentInput( {callback} ){
    
    const [inputText, setInputText] = useState('');

    const handleChange = (event) => {
        setInputText(event.target.value); // stores the text in state
    };

    return(
        <>
            <div className="CommentInputBlock">
                <div className="ProfileContainer">
                    <img className='CommentProfilePic' src={ProfilePic}/>
                    <h1 className='domine-Label m-0'>{currentUserName}</h1>
                    <div className='StarRatingBlock' style={{justifySelf: 'end'}}>
                        <span><Star size={42} weight="light" /></span>
                        <span><Star size={42} weight="light" /></span>
                        <span><Star size={42} weight="light" /></span>
                        <span><Star size={42} weight="light" /></span>
                        <span><Star size={42} weight="light" /></span>
                    </div>
                </div>

                <div className='commentInputContainer'>
                    <form id='commentForm'>
                        <input className='CommentInput' placeholder="I like this piece because.. " name="Comment" value={inputText} onChange={handleChange}>
                        
                        </input>
                        <span>
                            <div className='submitCommentButton' onClick={() => callback(addComment(ProfilePic, currentUserName, inputText))}>
                                <span id='iconElement'><PaperPlaneRight size={48} weight="light" /></span>
                            </div>
                        </span>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CommentInput;