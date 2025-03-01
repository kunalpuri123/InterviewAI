import React from "react";
import { AnimatedText } from "../_components/AnimatedText";
import Image from "next/image";
import Frontend from "../_roadmaps/frontend.png"; // Ensure this path is correct

const Roadmaps = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Animated Text Component */}
      <AnimatedText
        text="Frontend"
        textClassName="text-[4rem] md:text-[6rem] font-bold"
      />

      {/* Text below the animated text */}
      <div className="mt-8 text-center text-lg md:text-xl px-4 z-10 text-white">
        <p>
          <strong>Which languages are used for Frontend Development?</strong> The best part about the frontend development role is that there aren’t that many options to pick from when it comes to frontend technologies (unlike with backend development).

As a frontend developer, you’ll be working with the following technologies:

HTML: The markup language used to create the skeleton of the page. All the information you want to show on a webpage will be laid out through HTML.
CSS: The Cascading Style Sheet language allows you to adjust the way in which the HTML elements are rendered, improving the visuals of your webpage.
JavaScript: This is the de facto programming language for frontend development, and it allows you to add dynamism to your websites/web apps. There is an alternative known as TypeScript, which is a strongly typed superset of JavaScript that you can use instead. However, in that scenario, you’d have to set up a transpiler to translate your code into JavaScript before being able to run it in the browser.
        </p>
        <p className="mt-4">
          <strong>What is the role of a Frontend Developer?</strong><br />
          While this is not a complete frontend developer job description, the following can be considered as a great introduction to the role of a frontend developer: you'll be responsible for creating the user interface of a website to ensure it looks good and is easy to use, with great focus on design principles and user experience. You'll be working closely with designers, back-end developers, and project managers to make sure the final product meets the client's needs and provides the best possible experience for the end-users.


        </p>
      </div>

      {/* Image in the center below the text */}
      <div className="mt-8 z-10 relative">
      <Image
        src={Frontend}
        alt="Backend Image"
        useMap="#image-map"
        width={1200}
        height={800}
        layout="intrinsic"
      />
      {/* Image Map Generated by http://www.image-map.net/ */}
      
    </div>
  
    </div>
  );
};

export default Roadmaps;
