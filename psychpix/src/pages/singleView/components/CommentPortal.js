import CommentInput from './CommentInput';
import UserComment from './UserComments';
import DefaultCommentState from './NoCommentState';
import UserReplies from './CommentReplies';
import ProfilePic from '../images/pfp.webp';
import Footer from '../../home/components/Footer';
import user1pfp from '../images/user1.jpg';
import user2pfp from '../images/user2.jpg';
import user3pfp from '../images/user3.jpg';
import user4pfp from '../images/user4.jpg';
import { useEffect, useState } from 'react';



function CommentSection()
{
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function fetchComments() {
            try {
                const response = await fetch('http://localhost:5000/api/comments');
                const data = await response.json();
                setComments(data);
                console.log(data);
            } catch (err) {
                console.error("Couldn't fetch comments:", err);
            }
        }

        fetchComments();
    }, []);

    const handleNewComment = (newComment) => {
        setComments(prev => [...prev, newComment]);
    };

    return (
        <div className="CommentSection">
            <div className='CommentScroll'>
                {comments.length === 0 ? (
                    <DefaultCommentState />
                ) : (
                    comments.map((comment, index) => (
                        <UserComment key={index} data={comment} />
                    ))
                )}
            </div>
            <CommentInput callback={handleNewComment} />
        </div>
    );
}

export default CommentSection;