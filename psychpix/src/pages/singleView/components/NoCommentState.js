import NoCommentGraphic from '../images/NoComment2.jpeg';

function NoCommentState(){
    return (
        <>
            <div className="NoComment">
                <h1 id='noCommentText'>No comments yet, be the first to leave a comment!</h1>

                <div className='NoComment'>
                    <img src={NoCommentGraphic} />
                </div>
            </div>
        </>
    )
}

export default NoCommentState;