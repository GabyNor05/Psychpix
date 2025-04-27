import CommentInput from './CommentInput';
import UserComment from './UserComments';
import UserReplies from './CommentReplies';
import ProfilePic from '../images/pfp.webp';
import Footer from '../../home/components/Footer';
import user1pfp from '../images/user1.jpg';
import user2pfp from '../images/user2.jpg';
import user3pfp from '../images/user3.jpg';
import user4pfp from '../images/user4.jpg';
import { useState } from 'react';



function CommentSection()
{
    

    let user1Comment = `Psychedelic Pixels is a sleek, user-friendly art website showcasing diverse talent and stunning visual works. With artist profiles, insightful blogs, and a smooth buying experience, it’s perfect for art lovers seeking inspiration, discovery, or a meaningful connection to creativity.`;

    let user2Comment = `Psychedelic Pixels is a vibrant platform that makes exploring art feel personal and engaging. The interface is clean, the artist features are thoughtful, and the range of styles is impressive. Whether you're browsing for inspiration or buying original pieces, it's a fantastic space that truly celebrates creativity and connects people through art.`

    const reply = {
        comment1: "Totally agree! I found so many incredible new artists on Psychedelic Pixels. The site is easy to navigate and feels really well thought-out. I especially love the blog section—super inspiring and full of great insights.",
        comment2: "HIIIII!",
        comment3: "Psychedelic Pixels has quickly become my go-to art site. The variety of styles and mediums is amazing, and the site just feels welcoming. I appreciate how they highlight emerging talent—it gives lesser-known artists a real chance to shine."
    };
    
    const repliesData = [
        {
          userProfilePic: user1pfp,
          userName: "General Meltz",
          userComment: "Totally agree! I found so many incredible new artists on Psychedelic Pixels. The site is easy to navigate and feels really well thought-out. I especially love the blog section—super inspiring and full of great insights."
        },
        {
          userProfilePic: user2pfp,
          userName: "Anonymous",
          userComment: "HIIIII!"
        },
        {
          userProfilePic: user3pfp,
          userName: "Creative Soul",
          userComment: "Psychedelic Pixels has quickly become my go-to art site. The variety of styles and mediums is amazing, and the site just feels welcoming. I appreciate how they highlight emerging talent—it gives lesser-known artists a real chance to shine."
        }
      ];

      const [replies, setReplies] = useState({ user1Replies: [], user2Replies: [] });
      
      const addReply = (user, reply) => {
        console.log(replies.user1Replies);
        setReplies(prev => ({ ...prev, [`${user}Replies`]: [...prev[`${user}Replies`], reply] }));
    };

    const comments = [
        {
          userProfilePic: ProfilePic,
          userName: "Bruce Burnz",
          userComment: user1Comment,
          userReplies: replies.user1Replies,
          addReply: (reply) => addReply("user1", reply)
        },
        {
          userProfilePic: user4pfp,
          userName: "Dr.Bird Man",
          userComment: user2Comment,
          userReplies: replies.user2Replies,
          addReply: (reply) => addReply("user2", reply)
        }
      ];

    const [commentSection, addComment] = useState(comments);

    const addItem = (item) => {
        addComment(prevItems => [...prevItems, item]);
      };

    return(
    <>
        <div className="CommentSection">
            <div className='CommentScroll'>
                {comments.map((comment, index) => (
                    <UserComment key={index} userProfilePic={comment.userProfilePic} userName={comment.userName} 
                    userComment={comment.userComment} userReplies={comment.userReplies} callback={comment.addReply} />
                ))}
            </div>
            <CommentInput callback={(newComment) => { comments.push({ userProfilePic: ProfilePic, userName: "New User",
                 userComment: newComment, userReplies: [], addReply: (reply) => {}}); setReplies({ ...replies }); }} />
        </div>

        <Footer />
    </>
    )
}

export default CommentSection;