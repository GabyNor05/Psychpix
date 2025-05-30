import { Star, PaperPlaneRight } from "@phosphor-icons/react";

function Rating({userRating, setUserRating, canRate = true}){
    const handleRatingClick = (i) => {
        if(canRate)
            setUserRating(i + 1); // Add 1 because star index starts at 0
    };

    function solid(){
        const stars = [];

        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i}>
                    <Star size={42} weight={i < userRating ? "fill" : "light"} onClick={() => {handleRatingClick(i)}} style={{ cursor: 'pointer'}}/>
                </span>
            );
        }

        return stars;
    }
    return(
        <>
            {solid()}
        </>
    )
}

export default Rating;