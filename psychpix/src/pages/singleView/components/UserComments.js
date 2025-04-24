
import { Star, Heart, ArrowUUpLeft } from "@phosphor-icons/react";

function UserComment( {userProfilePic, userName, userComment, userReplies}){
    return(
        <>
            <div>
                <div className="UserCommentBlock">
                    <img className='CommentProfilePic' src={userProfilePic} style={{gridArea: 'userPic'}}/>
                    <h1 className='domine-Label m-0' style={{gridArea: 'userName'}}>{userName}</h1>
                    <h5 className="jost-light userTimeStamp" style={{gridArea: 'userTimeStamp'}}>5h ago</h5>
                    <div className='StarRatingBlock' style={{gridArea: 'userRating'}}>
                        <span><Star size={42} weight="fill" /></span>
                        <span><Star size={42} weight="fill" /></span>
                        <span><Star size={42} weight="fill" /></span>
                        <span><Star size={42} weight="light" /></span>
                        <span><Star size={42} weight="light" /></span>
                    </div>
                    <div className='userComment' style={{gridArea: 'userComment'}}>
                        <h4 className="jost-light">
                            {userComment}
                        </h4>
                        <div className="userInteract">
                            <div className="userHearts">
                                <Heart size={42} color="#FFFFFF55" weight="light" />
                                <h6>20</h6>
                            </div>
                            <div>
                                <ArrowUUpLeft size={42} color="#FFFFFF55" weight="light" />
                            </div>
                        </div>
                    </div> 

                    <div style={{gridArea: 'userReply'}}>
                        {userReplies}
                    </div>       
                </div>
            </div>
        </>
    )
}

export default UserComment;