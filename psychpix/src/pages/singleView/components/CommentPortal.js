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
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function CommentSection()
{
    const location = useLocation();
    const { selectedItem } = location.state || {};
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function fetchComments() {
            try {
                const ItemResponse = await fetch(`http://localhost:5000/api/items/${selectedItem}`);
                if(ItemResponse.ok){
                  const ItemJSON = await ItemResponse.json();
                  const commentIds = ItemJSON.commentsId;
                  const commentFetches = commentIds.map(id =>
                    fetch(`http://localhost:5000/api/comments/${id}`).then(res => res.json()).catch(res => null)
                  );

                  const commentsData = await Promise.all(commentFetches);
                  const userDataFetches = commentsData.map((item) => {
                        if(item != null){
                            if (item != null) {
                                return fetch(`http://localhost:5000/api/users/${item.userId}`).then(res => res.json());
                            } else {
                                return Promise.resolve(null); // fallback if item is null
                            }
                        }
                    }
                  );

                const userDataComments = await Promise.all(userDataFetches);

                const userComments = commentsData.map((item, index) => ({
                    commentData: item,
                    userData: userDataComments[index]
                }));

                setComments(userComments);
                return userComments;
            }
        } catch (err) {
            console.error("Couldn't fetch comments:", err);
        }
    }

        fetchComments();
    }, [comments]);

    const handleNewComment = (newComment) => {
        setComments(prev => [...prev, newComment]);
    };

    return (
        <div className="CommentSection">
            <h1 className='domine-Label CommentSectionTitle'>Reviews</h1>
            <div className='CommentScroll' style={{ height: comments.length === 0? '300px' : '800px'}}>
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