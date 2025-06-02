import ProfilePic from '../images/pfp.webp';
import { Star, PaperPlaneRight } from "@phosphor-icons/react";
import UserComment from './UserComments';
import { useState } from 'react';
import Rating from './Rating';
import { useLocation } from 'react-router-dom';

function CommentInput( callback ){
    const location = useLocation();
    const { selectedItem } = location.state || {};
    const [inputText, setInputText] = useState('');
    const [rating, setRating] = useState(1);

    const handleChange = (event) => {
        setInputText(event.target.value); // stores the text in state
    };

    async function PostComment(commentText, userRating) {

    try {
        const payload = {
            comment: commentText,
            likes: 0,
            rating: userRating,
            userId: '6838c46ed8607af2f8846e9c',
            itemId: selectedItem,
        };

        const response = await fetch('http://localhost:5000/api/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const currentComment = await response.json();
        const idBody = {
            commentId: currentComment._id
        }

        const ItemResponse = await fetch(`http://localhost:5000/api/items/${selectedItem}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(idBody)
        })

        if (ItemResponse.ok) {
            alert('Item saved!');
            callback();
        } else {
            const errorText = await ItemResponse.text(); // Or use .json() if server returns JSON
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
                    <img className='CommentProfilePic' src={ProfilePic}/>
                    <h1 className='domine-Label m-0'>{"Billy"}</h1>
                    <Rating userRating={rating} setUserRating={setRating} />
                </div>

                <div className='commentInputContainer'>
                    <form id='commentForm' onSubmit={(e) => {
                        e.preventDefault();
                        PostComment(inputText, rating);
                        setInputText('');
                        }}>
                        <input className='CommentInput' placeholder="I like this piece because.. " name="Comment" value={inputText} onChange={handleChange}>
                        
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