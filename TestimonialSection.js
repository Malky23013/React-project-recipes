import React from "react";
import './App.css';
import { useState } from "react";
const TestimonialSection = () => {
  const [count1, setCount1] = useState(52);
  const [count2, setCount2] = useState(89);
  const [count3, setCount3] = useState(47);
   
  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [flag3, setFlag3] = useState(false);
  //function for update the values
  function getValueById(id) {
    const values = [
      { id: 1, count: count1 },
      { id: 2, count: count2 },
      { id: 3, count: count3 },
    ];
    return values.find((value) => value.id === id).count;
  }
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      testimonial: "Thanks for everything,your recipes are crazy!!!!!!!",
    },
    {
      id: 2,
      name: "Jane Smith",
      testimonial: "Your web is not just a place to find recipes it's a place of fun",
    },
    {
      id: 3,
      name: "David Williams",
      testimonial: "Your recipes are yummy"
    },
  ];

  return (
    <div className="testimonial-section">
      <h2 id="h2">Testimonials</h2>
      <div className="testimonial-list">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial">
            <p>{testimonial.testimonial}</p>
            <p className="testimonial-name">- {testimonial.name}</p>
            <button id="heart"
              onClick={() => {
                switch (testimonial.id) {
                  case 1:
                    if(flag1==false){
                      setCount1(count1 + 1);
                      setFlag1(true);
                    }
                    break;
                  case 2:
                    if(flag2==false){
                      setCount2(count2 + 1);
                      setFlag2(true);
                    }
                    break;
                  case 3:
                    if(flag3==false){
                      setCount3(count3 + 1);
                      setFlag3(true);
                    }
                    break;
                  default:
                    setCount1(0);
                }
              }}
            > <span role="img" aria-label="Heart" >&#x2764;{"   "}{getValueById(testimonial.id)}</span></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;