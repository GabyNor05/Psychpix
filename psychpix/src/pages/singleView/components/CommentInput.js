import ProfilePic from '../images/pfp.webp';
import { Star, PaperPlaneRight } from "@phosphor-icons/react";

function CommentInput(){
    return(
        <>
            <div className="CommentInputBlock">
                <div className="ProfileContainer">
                    <img className='CommentProfilePic' src={ProfilePic}/>
                    <h1 className='domine-Label m-0'>Keith Waterson</h1>
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
                        <input className='CommentInput' placeholder="I like this piece because.. " name="Comment">
                        
                        </input>
                        <span>
                            <button className='submitCommentButton'><span id='iconElement'><PaperPlaneRight size={48} weight="light" /></span></button>
                        </span>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CommentInput;