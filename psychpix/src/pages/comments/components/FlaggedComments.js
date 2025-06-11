import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Profile1 from "../../profile/assets/userprofile/profile1.jpg";
import { TrashIcon, XIcon } from "@phosphor-icons/react";
import TestImage from '../../home/images/Home1.jpeg'

function DisplayFlaggedComments(){
    const navigate = useNavigate();
    const [TotalComments, setTotalComments] = useState(0);
    const handleSelect = (item) => {
        navigate('/singleItem', { state: { selectedItem: item } });
    };

    async function fetchFlaggedComments() {
    try {
        const response = await fetch('http://localhost:5000/api/comments', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const comments = await response.json(); 
        let flaggedComments = comments.filter(item => item.flags > 0);
        let flagged = comments.map(comment => ({...comment, replies: comment.replies.filter(reply => reply.flags > 0)}));
        let flaggedRepliesOnly = flagged.flatMap(item =>
        item.replies
        .filter(reply => reply.flags > 0)
        .map(reply => ({
            ...reply,
            itemId: item.itemId,        // Inherit from parent comment
            parentCommentId: item._id,  // Optional: reference to the parent
            profilePic: reply.profilePic || item.profilePic, // fallback if needed
            itemTitle: item.itemTitle,  // Also inherit if needed
            itemImageUrl: item.itemImageUrl
        }))
);
        console.log(flaggedRepliesOnly);

        const itemFetches = flagged.map(item =>
            fetch(`http://localhost:5000/api/items/${item.itemId}`).then(res => res.json()).catch(res => null)
        );

        const commentItems = await Promise.all(itemFetches);

        let payload = {
            flaggedComments: flaggedComments,
            products: commentItems,
            flaggedReplies: flaggedRepliesOnly,
        }

        return payload; 
    } catch (error) {
        console.error('Error fetching comments:', error);
        return [];
        }
    }

    async function removeComment(id){
        try{
            const response = await fetch(`http://localhost:5000/api/comments/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok){
            alert("Comment removed");
            setTotalComments(TotalComments - 1);
        }
        } catch (error) {
            alert("Could not remove commnet");
            console.error('Error fetching comments:', error);
        return [];
        }
    }

    async function removeReply(commentID, replyId){
        try{
            const response = await fetch(`http://localhost:5000/api/replies/${commentID}/replies/${replyId}/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok){
            alert("Comment removed");
            setTotalComments(TotalComments - 1);
        }
        } catch (error) {
            alert("Could not remove commnet");
            console.error('Error fetching comments:', error);
        return [];
        }
    }

    async function dismissComment(id){
        const response = await fetch(`http://localhost:5000/api/comments/${id}/flags`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({ flags: 0 })
        });
        if(response.ok){
            alert('Comment Dismissed');
        }
    }

    async function dismissReply(commentID, replyId){
        try{
            const response = await fetch(`http://localhost:5000/api/replies/${commentID}/replies/${replyId}/resetflag`, {
            method: 'PUT'
        });

        if(response.ok){
            alert("Comment dismissed");
            setTotalComments(TotalComments - 1);
        }
        } catch (error) {
            alert("Could not dissmess comment");
            console.error('Error fetching comments:', error);
        return [];
        }
    }

    const [flaggedComments, setComments] = useState([]);

    useEffect(() => {
        const getComments = async () => {
            const comments = await fetchFlaggedComments();
            setComments(comments);
        };
        getComments();
    }, [TotalComments]);

    let commentsObject = [{
        _id: 1234,
        profilePic: Profile1,
        itemTitle: 'Mercy',
        username: 'SauceCode',
        comment: `The image portrays an evil psychedelic cat, a visually arresting creature that slinks out of the surreal and into the sublime. Its fur, once mundane, now ripples with an iridescent spectrum of hyper-saturated colors—violet bleeding into acid green, electric orange flickering into ultraviolet blue. The cat’s eyes are dilated, bottomless pits that pulse with sentient menace, like miniature black holes rimmed with neon. Around its head, a halo of kaleidoscopic distortion warps the space, as if reality is bending to its will.
        This is no ordinary feline—it’s a digital shaman, glitching between dimensions. Its pupils reflect sacred geometry and spiraling fractals, while its whiskers crackle like tiny bolts of lightning. Smoke or mist swirls at its feet, tinged with hues not found on any natural color wheel. Behind it, a backdrop of psychedelic chaos unspools—a cosmic tapestry of dripping stars, melting galaxies, and eyes that open and close within the fabric of space itself.
        The photo has been edited to amplify the cat’s otherworldliness: shadows are unnaturally deep, highlights burst like flares, and texture overlays give its fur an almost reptilian sheen. There’s a tension between attraction and fear, beauty and dread. It stares directly at the viewer—not as prey, but as an omnipotent being that sees through your ego and into your soul.
        `,
        rating: 3,
        flags: 1,
    }]

    useEffect(() => {
        setTotalComments(flaggedComments.length);
    }, [flaggedComments.length]);

    if(flaggedComments.length == 0){
        return(<p>...Loading</p>)
    }else{}

    return(
        <>
            <div className="CommentsDisplaySection">
                <h2 className="domine-Label adminPageTitle">Flagged Comments</h2>
                <div>
                    {flaggedComments.flaggedComments.length === 0 && flaggedComments.flaggedReplies.length === 0 ? (
                        <>No comments yet.</>
                    ) : (
                        <>
                        {flaggedComments.flaggedComments.length > 0 && (
                            flaggedComments.flaggedComments.map((comment, index) => (
                            <div key={comment._id} className="comment-item jost-regular">
                                <div style={{ display: 'grid' }}>
                                    <img className="CommentUserPic" src={comment.profilePic || Profile1} alt="Profile" />
                                    <span onClick={() => dismissComment(comment._id)} style={{ alignSelf: 'end', display: 'flex', fontSize: '24px', cursor: 'pointer' }}>
                                        <XIcon size={32} color="#00AAFF" weight="bold" /><h4>Dismiss</h4>
                                    </span>
                                    <span onClick={() => removeComment(comment._id)} style={{ alignSelf: 'end', display: 'flex', fontSize: '24px', cursor: 'pointer' }}>
                                        <TrashIcon size={32} color="#EE0000" weight="bold" /><h4>Remove</h4>
                                    </span>
                                </div>

                                <div className="profile-comment-item-details CommentContent" style={{ width: '70%', paddingRight: '32px' }}>
                                    <div className="commentImpInfo jost-regular">
                                        <h5 style={{ color: '#CC5500' }}>Rating: {comment.rating}</h5>
                                        <h5 style={{ color: 'red' }}>Flags: {comment.flags}</h5>
                                    </div>
                                    <div className="commentUsername" style={{ width: 'fit-content', margin: 0 }}>
                                        <h4 style={{ fontSize: '16px' }}>User: {comment.username || "Unknown"}</h4>
                                    </div>
                                    <div className="jost-regular"><h4>Comment: "{comment.comment}"</h4></div>
                                    <div className="comment-timestamp">
                                        {comment.timestamp ? new Date(comment.timestamp).toLocaleString() : ""}
                                    </div>
                                </div>

                                <div className="CommentItemPic jost-regular">
                                    <h4>Item: {flaggedComments.products[index].title}</h4>
                                    <img onClick={() => handleSelect(flaggedComments.products[index]._id)} style={{ cursor: 'pointer' }} src={flaggedComments.products[index].imageUrl || Profile1} alt="Product" />
                                </div>
                            </div>
                            ))
                        )}

                        {flaggedComments.flaggedReplies.length > 0 && (
                            flaggedComments.flaggedReplies.map((comment, index) => (
                            <div key={index} className="comment-item jost-regular">
                                <div style={{ display: 'grid' }}>
                                    <img className="CommentUserPic" src={comment.profilePic || Profile1} alt="Profile" />
                                    <span onClick={() => dismissReply(comment.parentCommentId, comment._id)} style={{ alignSelf: 'end', display: 'flex', fontSize: '24px', cursor: 'pointer' }}>
                                        <XIcon size={32} color="#00AAFF" weight="bold" /><h4>Dismiss</h4>
                                    </span>
                                    <span onClick={() => removeReply(comment.parentCommentId, comment._id)} style={{ alignSelf: 'end', display: 'flex', fontSize: '24px', cursor: 'pointer' }}>
                                        <TrashIcon size={32} color="#EE0000" weight="bold" /><h4>Remove</h4>
                                    </span>
                                </div>

                                <div className="profile-comment-item-details CommentContent" style={{ width: '70%', paddingRight: '32px' }}>
                                    <div className="commentImpInfo jost-regular">
                                        <h5 style={{ color: 'red' }}>Flags: {comment.flags}</h5>
                                    </div>
                                    <div className="commentUsername" style={{ width: 'fit-content', margin: 0 }}>
                                        <h4 style={{ fontSize: '16px' }}>User: {comment.username || "Unknown"}</h4>
                                    </div>
                                    <div className="jost-regular"><h4>Comment: "{comment.comment}"</h4></div>
                                    <div className="comment-timestamp">
                                        {comment.timestamp ? new Date(comment.timestamp).toLocaleString() : ""}
                                    </div>
                                </div>

                                <div className="CommentItemPic jost-regular">
                                    <h4>Item: {comment.itemTitle}</h4>
                                    <img onClick={() => handleSelect(comment.itemId)} style={{ cursor: 'pointer' }} src={comment.itemImageUrl || Profile1} alt="Product" />
                                </div>
                            </div>
                            ))
                        )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default DisplayFlaggedComments;