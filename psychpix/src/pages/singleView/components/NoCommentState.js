import NoCommentGraphic from '../images/NoComment2.jpeg';

function NoCommentState(){
    return (
        <>
            <div className="NoComment jost-regular">
                <h3 id='noCommentText'>No reviews yet, be the first to leave a review!</h3>

                <div className='NoComment'>
                    <img src={NoCommentGraphic} />
                </div>
            </div>
        </>
    )
}

export default NoCommentState;