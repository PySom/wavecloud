import React, {useState} from 'react'
import { FaStar } from 'react-icons/fa';
import axios from 'axios';




const Rating = ({userId, beatId, rate}) => {
    const [rating, setRating] = useState(rate);
    const [hover, setHover] = useState(null)

    const onSetRate = (rate) => {
        
        if(rate){
            setRating(rate)
            const data = {
                Rate: rate,
                userId,
                beatId
              }
              axios.post('/api/ratings', data)  
            .then(response => {
                console.log('ratings',response)
            })
            .catch(err => console.log(err))
        }
        
    }
    // useEffect(() => {
    //     return () => {
    //       const data = {
    //         Rate: rating,
    //         userId,
    //         beatId
    //       }
    //       axios.post('/api/account/ratings', data)  
    //     .then(response => {
    //         console.log('ratings',response)
    //     })
    //     .catch(err => console.log(err))
    //     }
    //   }, [])

    

    return (
        <div className="pad-cart">
            {[ ...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                 <label>
                     <input 
                     style={{width:"6px"}}
                      value={rating} 
                      type="radio" name="rating" 
                      onClick={() => onSetRate(ratingValue)}
                      />
                    <FaStar 
                    className="star" 
                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                    size={20}
                    />
                </label> 
                )
               
            })}
          
        </div>
    )
}

export default Rating