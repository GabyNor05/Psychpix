import CommentInput from './CommentInput';
import UserComment from './UserComments';
import UserReplies from './CommentReplies';
import ProfilePic from '../images/pfp.webp';
import Footer from '../../home/components/Footer';

function CommentSection()
{
    let user1Comment = `ArtVista is a sleek, user-friendly art website showcasing diverse talent and stunning visual works. With artist profiles, insightful blogs, and a smooth buying experience, it’s perfect for art lovers seeking inspiration, discovery, or a meaningful connection to creativity.`;

    let replyComment1 = `HIIII`

    let replyComment2 = `I had a great experience buying a print from ArtVista. The process was smooth and the artist even included a personal thank-you note. It’s rare to find platforms that support artists this well. Definitely coming back for more!`

    let replyComment3 = `ArtVista has quickly become my go-to art site. The variety of styles and mediums is amazing, and the site just feels welcoming. I appreciate how they highlight emerging talent—it gives lesser-known artists a real chance to shine.`

    let replies = [
        <UserReplies userProfilePic={ProfilePic} userName={"Dr.Vegetable Man"} userComment={replyComment1} />,
        <UserReplies userProfilePic={ProfilePic} userName={"Mr.Gains"} userComment={replyComment2} />,
        <UserReplies userProfilePic={ProfilePic} userName={"Dr.Crazy"} userComment={replyComment3} />
      ];

    return(
    <>
        <div className="CommentSection">
            <CommentInput />
            <UserComment userProfilePic={ProfilePic} userName={"Dr.Bird Man"} userComment={user1Comment} userReplies={replies}/>
            <UserComment userProfilePic={ProfilePic} userName={"Dr.Bird Man"} userComment={user1Comment}/>
        </div>

        <Footer />
    </>
    )
}

export default CommentSection;