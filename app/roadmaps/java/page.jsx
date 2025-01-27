import React from "react";
import { AnimatedText } from "../_components/AnimatedText";
import Image from "next/image";
import Java from "../_roadmaps/java.png"; // Ensure this path is correct

const Roadmaps = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Animated Text Component */}
      <AnimatedText
        text="Java"
        textClassName="text-[4rem] md:text-[6rem] font-bold"
      />

      {/* Text below the animated text */}
      <div className="mt-8 text-center text-lg md:text-xl px-4 z-10 text-white">
        <p>
          <strong>Java Fundamentals:</strong> Java is a programming language and computing platform first released by Sun Microsystems in 1995. Java is a general-purpose, class-based, object-oriented programming language designed for having lesser implementation dependencies. It is a computing platform for application development. Java is fast, secure, and reliable. Therefore, it is widely used for developing Java applications in laptops, data centers, game consoles, scientific supercomputers, cell phones, etc.

Learn about the fundamentals of Java such as basic syntax, data types, variables, conditionals, functions, data structures, packages, etc.
        </p>
       
      </div>

      {/* Image in the center below the text */}
      <div className="mt-8 z-10 relative">
        <Image
          src={Java}
          alt="Backend Image"
          useMap="#image-map"
          width={1200} // Define width
          height={800} // Define height
          layout="intrinsic" // Adjusts the layout to fit the image’s intrinsic aspect ratio
        />
        <map name="image-map">
        <area target="_blank" alt="Java Fundamentals" title="Java Fundamentals" href="https://hyperskill.org/courses/8" coords="573,568,1089,648" shape="rect" />
<area target="_blank" alt="Basic Syntax" title="Basic Syntax" href="https://dev.java/learn/language-basics/" coords="6,480,438,557" shape="rect" />
<area target="_blank" alt="Data Types and Variables" title="Data Types and Variables" href="https://www.guru99.com/java-variables.html" coords="2,575,441,649" shape="rect" />
<area target="_blank" alt="Conditionals" title="Conditionals" href="https://www.educative.io/answers/what-are-conditional-statements-in-programming" coords="7,665,438,740" shape="rect" />
<area target="_blank" alt="Functions" title="Functions" href="https://www.javatpoint.com/method-in-java" coords="2,754,439,832" shape="rect" />
<area target="_blank" alt="Working with Date and Time in Java" title="Working with Date and Time in Java" href="https://chamalwr.medium.com/datetime-api-in-java-2aef5df1c39b" coords="" shape="rect" />
<area target="_blank" alt="DSA" title="DSA" href="https://www.javatpoint.com/data-structure-tutorial" coords="1244,467,1794,543" shape="rect" />
<area target="_blank" alt="oop" title="oop" href="https://www.youtube.com/playlist?list=PL9gnSGHSqcno1G3XjUbwzXHL8_EttOuKk" coords="1243,556,1796,634" shape="rect" />
<area target="_blank" alt="Package" title="Package" href="https://docs.oracle.com/javase/8/docs/api/java/lang/Package.html" coords="1240,649,1796,724" shape="rect" />
<area target="_blank" alt="Files and APIs" title="Files and APIs" href="https://www.marcobehler.com/guides/java-files" coords="1240,740,1794,816" shape="rect" />
<area target="_blank" alt="loops" title="loops" href="https://www.javatpoint.com/java-for-loop" coords="541,721,906,797" shape="rect" />
<area target="_blank" alt="Exception Handling" title="Exception Handling" href="https://naveen-metta.medium.com/mastering-java-exception-handling-a-comprehensive-guide-a897b8020582" coords="544,813,905,886" shape="rect" />
<area target="_blank" alt="getting deeper" title="getting deeper" href="https://www.geeksforgeeks.org/what-is-advanced-java/" coords="630,964,1194,1040" shape="rect" />
<area target="_blank" alt="Memory Management" title="Memory Management" href="https://www.javatpoint.com/memory-management-in-java" coords="1,867,444,942" shape="rect" />
<area target="_blank" alt="Collection Framework" title="Collection Framework" href="https://www.javatpoint.com/collections-in-java" coords="2,959,442,1034" shape="rect" />
<area target="_blank" alt="serialization" title="serialization" href="https://www.javatpoint.com/serialization-in-java" coords="4,1050,438,1123" shape="rect" />
<area target="_blank" alt="socket" title="socket" href="https://docs.oracle.com/javase/tutorial/networking/sockets/index.html" coords="1,1139,441,1212" shape="rect" />
<area target="_blank" alt="generics" title="generics" href="https://www.tutorialspoint.com/java/java_generics.htm" coords="1028,851,1259,923" shape="rect" />
<area target="_blank" alt="stream" title="stream" href="https://www.javatpoint.com/java-8-stream" coords="1032,1088,1259,1162" shape="rect" />
<area target="_blank" alt="JVM" title="JVM" href="https://www.infoworld.com/article/2269370/what-is-the-jvm-introducing-the-java-virtual-machine.html" coords="1345,873,1777,950" shape="rect" />
<area target="_blank" alt="garbage-collection" title="garbage-collection" href="https://stackify.com/what-is-java-garbage-collection/" coords="1345,965,1780,1039" shape="rect" />
<area target="_blank" alt="Thread" title="Thread" href="https://docs.oracle.com/javase/7/docs/api/java/lang/Thread.html" coords="1343,1058,1780,1137" shape="rect" />
<area target="_blank" alt="gradle" title="gradle" href="https://www.javatpoint.com/gradle" coords="7,1247,226,1316" shape="rect" />
<area target="_blank" alt="maven" title="maven" href="https://maven.apache.org/guides/getting-started/" coords="7,1334,228,1410" shape="rect" />
<area target="_blank" alt="ant" title="ant" href="https://ant.apache.org/" coords="9,1429,230,1505" shape="rect" />
<area target="_blank" alt="spring" title="spring" href="https://docs.spring.io/spring-framework/reference/" coords="1346,1162,1781,1237" shape="rect" />
<area target="_blank" alt="spring boot" title="spring boot" href="https://www.ibm.com/think/topics/java-spring-boot" coords="1343,1253,1783,1332" shape="rect" />
<area target="_blank" alt="Play_Framework" title="Play_Framework" href="https://en.wikipedia.org/wiki/Play_Framework" coords="1346,1347,1783,1423" shape="rect" />
<area target="_blank" alt="sparkjava" title="sparkjava" href="https://sparkjava.com/" coords="1345,1443,1786,1516" shape="rect" />
<area target="_blank" alt="quarkus" title="quarkus" href="https://quarkus.io/" coords="" shape="rect" />
<area target="_blank" alt="orm" title="orm" href="https://www.altexsoft.com/blog/object-relational-mapping/" coords="423,1542,674,1620" shape="rect" />
<area target="_blank" alt="jpa" title="jpa" href="https://www.tutorialspoint.com/jpa/jpa_architecture.htm" coords="422,1405,600,1485" shape="rect" />
<area target="_blank" alt="spring-data-jpa" title="spring-data-jpa" href="https://spring.io/projects/spring-data-jpa" coords="15,1537,342,1613" shape="rect" />
<area target="_blank" alt="hibernate" title="hibernate" href="https://hibernate.org/" coords="14,1632,342,1707" shape="rect" />
<area target="_blank" alt="ebean" title="ebean" href="https://ebean.io/" coords="15,1725,342,1801" shape="rect" />
<area target="_blank" alt="jdbc" title="jdbc" href="https://www.ibm.com/docs/en/informix-servers/12.10?topic=started-what-is-jdbc" coords="422,1723,673,1799" shape="rect" />
<area target="_blank" alt="jdbi3" title="jdbi3" href="https://jdbi.org/" coords="15,1842,344,1917" shape="rect" />
<area target="_blank" alt="jdbc template" title="jdbc template" href="https://www.baeldung.com/spring-jdbc-jdbctemplate" coords="15,1936,342,2010" shape="rect" />
<area target="_blank" alt="java-logging-intro" title="java-logging-intro" href="https://www.baeldung.com/java-logging-intro" coords="870,1632,1337,1707" shape="rect" />
<area target="_blank" alt="logback" title="logback" href="https://logback.qos.ch/manual/configuration.html" coords="1008,1420,1233,1496" shape="rect" />
<area target="_blank" alt="log4j2" title="log4j2" href="https://logging.apache.org/log4j/2.x/manual/configuration.html" coords="1005,1510,1230,1586" shape="rect" />
<area target="_blank" alt="slf4j" title="slf4j" href="https://www.slf4j.org/" coords="" shape="rect" />
<area target="_blank" alt="tinylog" title="tinylog" href="https://tinylog.org/v1/" coords="1454,1634,1784,1709" shape="rect" />
<area target="_blank" alt="mockito" title="mockito" href="https://site.mockito.org/" coords="917,1801,1264,1875" shape="rect" />
<area target="_blank" alt="testing" title="testing" href="https://www.guru99.com/software-testing-introduction-importance.html" coords="866,1934,1259,2007" shape="rect" />
<area target="_blank" alt="cucumber" title="cucumber" href="https://cucumber.io/" coords="1403,1877,1737,1953" shape="rect" />
<area target="_blank" alt="cukes" title="cukes" href="https://github.com/ctco/cukes" coords="1405,1967,1543,2041" shape="rect" />
<area target="_blank" alt="jbehave" title="jbehave" href="https://jbehave.org/" coords="1565,1967,1740,2042" shape="rect" />
<area target="_blank" alt="junit" title="junit" href="https://junit.org/junit5/" coords="69,2145,314,2222" shape="rect" />
<area target="_blank" alt="testng" title="testng" href="https://testng.org/" coords="74,2239,314,2315" shape="rect" />
<area target="_blank" alt="rest-assured" title="rest-assured" href="https://github.com/rest-assured/rest-assured/wiki" coords="363,2147,652,2221" shape="rect" />
<area target="_blank" alt="spring-boot-testing" title="spring-boot-testing" href="https://www.baeldung.com/spring-boot/testing" coords="1345,2044,1779,2115" shape="rect" />
<area target="_blank" alt="swagger" title="swagger" href="https://swagger.io/" coords="1346,2136,1779,2211" shape="rect" />

        </map>
      </div>
    </div>
  );
};

export default Roadmaps;
