import { Star, Heart, ArrowUUpLeft, PaperPlaneRight } from "@phosphor-icons/react";
import lineSquare from '../../home/images/lil_square2.png';

function UserCommentReplies( {userProfilePic, userName, userComment} ){
    return(
        <>
        
            <div className="UserReplyBlock">
                <img className='lineSquareTL' src={lineSquare} alt='lilSquare'/>
                <img className='CommentProfilePic' src={userProfilePic} style={{gridArea: 'userPic'}}/>
                <h1 className='domine-Label m-0' style={{gridArea: 'userName', alignSelf: 'center'}}>{userName}</h1>
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
                    <div>
                    <div className='replyInputContainer'>
                        <form id='commentForm'>
                            <input className='CommentInput' placeholder="I like this piece because.. " name="Comment">
                            
                            </input>
                            <span>
                                <div className='submitCommentButton'>
                                    <span id='iconElement'><PaperPlaneRight size={48} weight="light" /></span>
                                </div>
                            </span>
                        </form>
                    </div>
                </div>
                </div> 

                
            </div>
        </>
    )
}

export default UserCommentReplies;