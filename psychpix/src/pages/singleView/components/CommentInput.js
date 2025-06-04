import { useState } from 'react';
import { Star, PaperPlaneRight } from "@phosphor-icons/react";
import UserComment from './UserComments';
import Rating from './Rating';
import { useLocation } from 'react-router-dom';

// Get default profile image if user is not logged in or has no profilePic
import DefaultProfilePic from '../images/pfp.webp';

function CommentInput( callback ){
    const location = useLocation();
    const { selectedItem } = location.state || {};
    const [inputText, setInputText] = useState('');
    const [rating, setRating] = useState(1);

    // Get user info from sessionStorage ONCE
    let username = "Guest";
    let profilePic = DefaultProfilePic;
    let userId = '6838c46ed8607af2f8846e9c'; // fallback
    try {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user) {
            if (user.username) username = user.username;
            if (user.profilePic) profilePic = user.profilePic;
            if (user.id || user._id) userId = user.id || user._id;
        }
    } catch {
        // keep defaults
    }

    const handleChange = (event) => {
        setInputText(event.target.value); // stores the text in state
    };

    async function PostComment(commentText, userRating) {
        try {
            const payload = {
                comment: commentText,
                likes: 0,
                rating: userRating,
                userId: userId, // always use the value from above
                itemId: selectedItem,
                username: username,
                profilePic: profilePic,
                timestamp: new Date().toISOString() 
            };

            const response = await fetch('http://localhost:5000/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                alert("Failed to save comment: " + errorText);
                return;
            }

            const currentComment = await response.json();
            if (!currentComment._id) {
                alert("Failed to save comment: No comment ID returned.");
                return;
            }

            const idBody = {
                commentId: currentComment._id
            };

            const ItemResponse = await fetch(`http://localhost:5000/api/items/${selectedItem}/comments`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(idBody)
            });

            if (ItemResponse.ok) {
                alert('Item saved!');
                callback();
            } else {
                const errorText = await ItemResponse.text();
                alert(errorText);
            }
        } catch (err) {
            console.error('Fetch failed:', err);
        }
    } 

    return(
        <>
            <div className="CommentInputBlock">
                <div className="ProfileContainer">
                    <img className='CommentProfilePic' src={profilePic} alt="Profile" />
                    <h1 className='domine-Label m-0'>{username}</h1>
                    <Rating userRating={rating} setUserRating={setRating} />
                </div>

                <div className='commentInputContainer'>
                    <form id='commentForm' onSubmit={(e) => {
                        e.preventDefault();
                        PostComment(inputText, rating);
                        setInputText('');
                        }}>
                        <input className='CommentInput jost-regular' placeholder="I like this piece because.. " name="Comment" value={inputText} onChange={handleChange}>
                        
                        </input>
                        <span>
                            <button type='submit' className='submitCommentButton'>
                                <span id='iconElement'><PaperPlaneRight size={48} weight="light" /></span>
                            </button>
                        </span>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CommentInput;