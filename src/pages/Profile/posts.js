// // Posts.js
// import React from 'react';

// function Posts({ filteredPosts }) {
//     return (
//         <div className="profilePostContainner">
//             <div className=" row row-cols-1 row-cols-md-2 row-cols-lg-3">
//                 {filteredPosts.map((post) => (
//                     <div key={post.id} className="col  postColumn ">
//                         <div className="cardPost">
//                             <img src={post.img} className="card-img-top" alt={post.name} />
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Posts;
// import React from 'react'
import React, { useState } from 'react';



import food1 from "../../imges/food1.jpeg"
import food2 from "../../imges/food2.jpg"
import food3 from "../../imges/food3.jpeg"
import food4 from "../../imges/food4.jpg"
import food5 from "../../imges/food5.jpg"
import food6 from "../../imges/food6.jpg"

function Posts() {


    const postsData = [
        {
            id: 1,
            img: food1,
            userName: 'sathish57',
            name: 'Biriyani',
            location: 'City 1',
            foodStyle: 'Mediterranean',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 2,
            img: food2,
            userName: 'Dosaa',
            name: 'Mediterranean Dish 2',
            location: 'City 2',
            foodStyle: 'Mediterranean',
            content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            id: 3,
            img: food3,
            userName: 'ranjiths88',
            name: 'Upma',
            location: 'City 2',
            foodStyle: 'Mediterranean',
            content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            id: 4,
            img: food4,
            userName: 'rohith_roy',
            name: 'Chicken',
            location: 'City 2',
            foodStyle: 'Mediterranean',
            content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            id: 5,
            img: food5,
            userName: 'firzzzzzzzz',
            name: 'Rayala sima chicken',
            location: 'City 2',
            foodStyle: 'Mediterranean',
            content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            id: 6,
            img: food6,
            userName: 'somthing',
            name: 'kodikuraa',
            location: 'City 2',
            foodStyle: 'Mediterranean',
            content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            id: 1,
            img: food1,
            userName: 'sathish57',
            name: 'Biriyani',
            location: 'City 1',
            foodStyle: 'Mediterranean',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 2,
            img: food2,
            userName: 'Dosaa',
            name: 'Mediterranean Dish 2',
            location: 'City 2',
            foodStyle: 'Mediterranean',
            content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            id: 3,
            img: food3,
            userName: 'ranjiths88',
            name: 'Upma',
            location: 'City 2',
            foodStyle: 'Mediterranean',
            content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            id: 4,
            img: food4,
            userName: 'rohith_roy',
            name: 'Chicken',
            location: 'City 2',
            foodStyle: 'Mediterranean',
            content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            id: 5,
            img: food5,
            userName: 'firzzzzzzzz',
            name: 'Rayala sima chicken',
            location: 'City 2',
            foodStyle: 'Mediterranean',
            content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            id: 6,
            img: food6,
            userName: 'somthing',
            name: 'kodikuraa',
            location: 'City 2',
            foodStyle: 'Mediterranean',
            content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        // Add more posts as needed
    ];
const [locationFilter, setLocationFilter] = useState('');
    const [foodStyleFilter, setFoodStyleFilter] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [showMore, setShowMore] = useState(false);
    const [showPosts, setShowPosts] = useState(false);

    


    const toggleShowMore = () => {
        setShowMore(!showMore);
    };
   
    const toggleShowPosts = () => {
        setShowPosts(!showPosts);
    };


const filterPosts = (post) => {
  const locationMatch = post.location.toLowerCase().includes(locationFilter.toLowerCase());
  const foodStyleMatch = post.foodStyle.toLowerCase().includes(foodStyleFilter.toLowerCase());
  const nameMatch = post.name.toLowerCase().includes(nameFilter.toLowerCase());

  return locationMatch && foodStyleMatch && nameMatch;
};


// Filtered posts based on user input
// Change this line
const filteredPosts = postsData.filter(filterPosts);


  return (
    <div className="profilePostContainner">
    <div className=" row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {filteredPosts.map((post) => (
            <div key={post.id} className="col  postColumn ">
                <div className="cardPost">
                    <img src={post.img} className="card-img-top" alt={post.name} />

                </div>
            </div>
        ))}
    </div>








</div>
  )
}

export default Posts;