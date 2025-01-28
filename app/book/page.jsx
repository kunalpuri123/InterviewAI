import React from "react";
import CardWithHoverEffect from "./_components/CardWithHoverEffect";
import { AnimatedText } from "./_components/AnimatedText";


const Roadmaps = () => {
    const projects = [
        {
          title: "Operating System",
          description:
            "operating system (OS), program that manages a computer's resources, especially the allocation of those resources among other programs. Typical resources include the central processing unit (CPU), computer memory, file storage, input/output (I/O) devices, and network connections. ",
          link: "/book/os",
        },
        {
          title: "Computer Networks",
          description:
            "For a technical interview in computer networking, it's crucial to have a solid understanding of networking fundamentals. This includes knowledge of the OSI model, TCP/IP protocols, subnetting, routing, switching, and network troubleshooting techniques. ",
          link: "/book/os",
        },
        {
          title: "Database Management System",
          description:
            "A database management system (DBMS) is a software system for creating and managing databases. A DBMS enables end users to create, protect, read, update and delete data in a database. It also manages security, data integrity and concurrency for databases. ",
          link: "/book/os",
        },
        {
          title: "Object-oriented programming",
          description:
            "Object-oriented programming aims to implement real-world entities like inheritance, hiding, polymorphism, etc. in programming. The main aim of OOP is to bind together the data and the functions that operate on them so that no other part of the code can access this data except that function. ",
          link: "/book/os",
        },
       
    ];
    
  return (
    <>
     <AnimatedText 
      text="Core Subjects" 
      textClassName="text-[4rem] md:text-[6rem] font-bold"
    />
     <div className="max-w-5xl mx-auto px-8">
    <CardWithHoverEffect items={projects} />
  </div>
    </>

   
  );
};

export default Roadmaps;
