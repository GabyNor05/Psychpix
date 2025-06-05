import { useState, useEffect } from "react";
import Profile1 from "../../profile/assets/userprofile/profile1.jpg";

function DisplayFlaggedComments(){

    const [userComments, setUserComments] = useState([]);

    let commentsObject = [{
        _id: 1234,
        profilePic: Profile1,
        username: 'SauceCode',
        comment: 'This is an amazing one tbh',
        rating: 3
    }]

    useEffect(() => {
        setUserComments(commentsObject);
    }, []);

    return(
        <>
            <div className="CommentsDisplaySection">
                <h3>Flagged Comments</h3>
                <div>
                    {userComments.length === 0 ? (
                    <>No comments yet.</>
                    ) : (
                    userComments.map((comment) => (
                        <div key={comment._id} className="comment-item">
                        <img
                            className="CommentProfilePic"
                            src={comment.profilePic || Profile1}
                            alt="Profile"
                        />
                        <div className="profile-comment-item-details">
                            <div className="comment-username">{comment.username || "Unknown"}</div>
                            <div>{comment.comment}</div>
                            <div className="comment-timestamp">
                            {comment.timestamp ? new Date(comment.timestamp).toLocaleString() : ""}
                            </div>
                            <div className="comment-rating">
                            Rating: {comment.rating}
                            </div>
                        </div>
                        </div>
                    ))
                    )}
                </div>
            </div>
        </>
    )
}

export default DisplayFlaggedComments;