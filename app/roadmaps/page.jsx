import React from "react";
import CardWithHoverEffect from "./_components/CardWithHoverEffect";
import { AnimatedText } from "./_components/AnimatedText";


const Roadmaps = () => {
    const projects = [
        {
          title: "Backend",
          description:
            "The backend of a website or application is the server-side that manages data and ensures the front-end works properly. Users don't directly interact with the backend.Backend Development involves the logic, database, and other operations that are built behind the scenes to run the web servers efficiently. Backend Development refers to the server-side development of the web application. It is the part of the application where the server and database reside and the logics is build to perform operations.  ",
          link: "/roadmaps/backend",
        },
        {
          title: "Java",
          description:
            "Java is a programming language and computing platform first released by Sun Microsystems in 1995. Java is a general-purpose, class-based, object-oriented programming language designed for having lesser implementation dependencies. It is a computing platform for application development. Java is fast, secure, and reliable. Therefore, it is widely used for developing Java applications in laptops, data centers, game consoles, scientific supercomputers, cell phones, etc.",
          link: "/roadmaps/java",
        },
        {
          title: "DevOps",
          description:
            "While DevOps is not a specific job title or role, organizations often hire for a DevOps Engineer role. A DevOps Engineer is a software engineer who specializes in the practices and tools that enable the continuous delivery of software. DevOps Engineers are responsible for the design and implementation of applications, software, and services for their organization, and they work closely with developers, testers, and operations staff to oversee the code releases.",
          link: "/roadmaps/devops",
        },
        {
          title: "Frontend",
          description:
            "A frontend developer is a professional who uses HTML, CSS, and JavaScript to design and build the visual and interactive elements of websites and applications that users engage with directly. They ensure the interface is responsive, accessible, and visually appealing. Every feature you see and interact with on a website (like buttons, menus, and animations) is created by a frontend developer.",
          link: "/roadmaps/frontend",
        },
        {
          title: "Kubernetes",
          description:
            "Kubernetes, also known as k8s, is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. It provides a way to abstract the underlying infrastructure and manage applications at scale, while also offering flexibility, portability, and a rich feature set. Kubernetes has become the de facto standard for container orchestration due to its widespread adoption, active community, and ability to handle complex, multi-tiered applications.",
          link: "/roadmaps/kubernetes",
        },
        {
          title: "MongoDB",
          description:
            "MongoDB is a popular NoSQL database system that stores data in Flexible JSON-like documents, making it suitable for working with large scale and unstructured data.MongoDB is a source-available, cross-platform, document-oriented database program. Classified as a NoSQL database product, MongoDB uses JSON-like documents with optional schemas. Released in February 2009 by 10gen (now MongoDB Inc.), it supports features like sharding, replication, and ACID transactions (from version 4.0).",
          link: "/roadmaps/mongodb",
        },
    ];
    
  return (
    <>
     <AnimatedText 
      text="Roadmaps" 
      textClassName="text-[4rem] md:text-[6rem] font-bold"
    />
     <div className="max-w-5xl mx-auto px-8">
    <CardWithHoverEffect items={projects} />
  </div>
    </>

   
  );
};

export default Roadmaps;
