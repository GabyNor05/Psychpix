import { useState } from 'react';
import { Star, PaperPlaneRight } from "@phosphor-icons/react";
import UserComment from './UserComments';
import Rating from './Rating';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

// Get default profile image if user is not logged in or has no profilePic
let DefaultProfilePic = `https://res.cloudinary.com/dgf9sqcdy/image/upload/v1748461716/DefaultProfilePic_xr1uie.jpg`;

function CommentInput( callback ){
    const location = useLocation();
    const { selectedItem } = location.state || {};
    const [inputText, setInputText] = useState('');
    const [rating, setRating] = useState(5);

    // Get user info from sessionStorage ONCE
    let username = "Guest";
    let profilePic = DefaultProfilePic;
    let userId = '6841edbdaf8a2cf16b83becc'; // fallback
    try {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user) {
            if (user.username) username = user.username;
            user.profilePic? (user.username == 'Guest'? profilePic = DefaultProfilePic : profilePic = user.profilePic) : profilePic = DefaultProfilePic;
            if (user.id || user._id) userId = user.id || user._id;
        }
    } catch {
        // keep defaults
    }

    const handleChange = (event) => {
        setInputText(event.target.value); // stores the text in state
    };

    function formatTimestamp(dateObj) {
        const pad = n => n < 10 ? '0' + n : n;
        const year = dateObj.getFullYear();
        const month = pad(dateObj.getMonth() + 1);
        const day = pad(dateObj.getDate());
        let hour = dateObj.getHours();
        const min = pad(dateObj.getMinutes());
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour ? hour : 12; // 0 should be 12
        return `${day}/${month}/${year} ${hour}:${min} ${ampm}`;
    }

    async function PostComment(commentText, userRating) {
        try {
            // Fetch item info
            let itemTitle = "";
            let itemImageUrl = "";
            if (selectedItem) {
                const itemRes = await fetch(`http://localhost:5000/api/items/${selectedItem}`);
                if (itemRes.ok) {
                    const itemData = await itemRes.json();
                    itemTitle = itemData.title || "";
                    itemImageUrl = itemData.imageUrl || "";
                }
            }

            const payload = {
                comment: commentText,
                likes: 0,
                rating: userRating,
                userId: userId,
                itemId: selectedItem,
                username: username,
                profilePic: profilePic,
                timestamp: formatTimestamp(new Date()),
                itemTitle: itemTitle,         // <-- Add this
                itemImageUrl: itemImageUrl    // <-- Add this
            };

            const response = await fetch('http://localhost:5000/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                toast.error("Failed to save comment: " + errorText);
                return;
            }

            const currentComment = await response.json();
            if (!currentComment._id) {
                toast.error("Failed to save comment: No comment ID returned.");
                return;
            }

            const idBody = {
                rating: userRating,
                commentId: currentComment._id,
            };

            const ItemResponse = await fetch(`http://localhost:5000/api/items/${selectedItem}/comments`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(idBody)
            });

            if (ItemResponse.ok) {
                toast.success('Comment saved!');
                callback(ItemResponse);
            } else {
                const errorText = await ItemResponse.text();
                toast.error("Could not add comment!")
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