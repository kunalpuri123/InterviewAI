"use client";
import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { db } from "@/utils/db"; // Assuming db is already configured with Drizzle ORM
import { UserProgress } from "@/utils/schema"; // Assuming you have a schema for user progress
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs"; // Assuming you're using Clerk for user authentication
import { FaFolderClosed, FaFolderOpen } from "react-icons/fa"; // Folder icons
import { MdOutlineDoneOutline } from "react-icons/md"; // Icon for completed folder
import { FaRegFolderOpen } from "react-icons/fa";
import { IoMdFolderOpen } from "react-icons/io";

const BookViewer = () => {
  const [selectedChapter, setSelectedChapter] = useState(
    "https://online.flippingbook.com/view/297538379/"
  );
  const [completedChapters, setCompletedChapters] = useState([]);
  const { user } = useUser(); // Access current user
  const [openFolders, setOpenFolders] = useState({}); // To track open/closed folders

  const folders = [
    {
      id: "folder1",
      title: "Introduction", // Added title for the folder
      subchapters: [
        { id: "chapter1", name: "Chapter 1: Overview", file: "https://online.flippingbook.com/view/297538379/" },
        { id: "chapter2", name: "Chapter 2: Details", file: "https://drive.google.com/file/d/FILE_ID2/preview" }
      ],
    },
    {
      id: "folder2",
      title: "Advanced Topics", // Added title for the folder
      subchapters: [
        { id: "chapter3", name: "Chapter 3: Methods", file: "https://drive.google.com/file/d/FILE_ID3/preview" },
        { id: "chapter4", name: "Chapter 4: Applications", file: "https://drive.google.com/file/d/FILE_ID4/preview" }
      ],
    },
  ];

  useEffect(() => {
    const fetchProgress = async () => {
      if (user) {
        try {
          const userEmail = user.primaryEmailAddress?.emailAddress; // Ensure this is correct
          const progressData = await db
            .select()
            .from(UserProgress)
            .where(eq(UserProgress.userEmail, userEmail))
            .execute();

          const completedChapters = progressData
            .filter((progress) => progress.isCompleted)
            .map((progress) => progress.chapterId);

          setCompletedChapters(completedChapters);
        } catch (error) {
          console.error("Error fetching progress:", error);
        }
      }
    };

    fetchProgress();
  }, [user]);

  const handleChapterClick = (file) => {
    setSelectedChapter(file);
  };

  const handleCheckboxChange = (id) => {
    const updatedChapters = completedChapters.includes(id)
      ? completedChapters.filter((chapter) => chapter !== id)
      : [...completedChapters, id];

    setCompletedChapters(updatedChapters);

    if (!completedChapters.includes(id)) {
      triggerCelebration();
    }

    handleProgressSave(id, !completedChapters.includes(id));
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleProgressSave = async (chapterId, isCompleted) => {
    if (user) {
      const userEmail = user.primaryEmailAddress?.emailAddress;
      const progressPercentage = isCompleted ? 100 : 0;

      try {
        const existingProgress = await db
          .select()
          .from(UserProgress)
          .where(eq(UserProgress.userEmail, userEmail))
          .where(eq(UserProgress.chapterId, chapterId))
          .execute();

        if (existingProgress.length > 0) {
          await db
            .update(UserProgress)
            .set({
              isCompleted,
              progressPercentage,
            })
            .where(eq(UserProgress.userEmail, userEmail))
            .where(eq(UserProgress.chapterId, chapterId))
            .execute();
        } else {
          await db.insert(UserProgress).values({
            userEmail,
            chapterId,
            isCompleted,
            progressPercentage,
          }).execute();
        }
      } catch (error) {
        console.error("Error saving progress:", error);
      }
    }
  };

  // Calculate total chapters and completed progress
  const totalChapters = folders.reduce((acc, folder) => acc + folder.subchapters.length, 0);
  const progress = (completedChapters.length / totalChapters) * 100;

  // Calculate the completion percentage for each folder
  const getFolderCompletionPercentage = (folder) => {
    const completedSubchapters = folder.subchapters.filter(subchapter =>
      completedChapters.includes(subchapter.id)
    );
    return (completedSubchapters.length / folder.subchapters.length) * 100;
  };

  // Toggle folder open/close state
  const toggleFolder = (folderId) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId], // Toggle the open/close state of the folder
    }));
  };

  // Check if all subchapters of a folder are completed
  const isFolderCompleted = (folder) => {
    return folder.subchapters.every(subchapter => completedChapters.includes(subchapter.id));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Title and Description */}
      <div className="bg-gray-800 text-center p-8 shadow-lg z-10 relative">
        <h1 className="text-4xl font-extrabold text-gray-100">
          The Book Title
        </h1>
        <p className="mt-4 text-xl text-gray-300">
          Dive deep into fascinating topics with insightful explanations and examples.
        </p>
      </div>

      {/* Progress Bar and Percentage */}
      <div className="w-full h-2 bg-gray-600 mt-4">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-center mt-2 text-xl text-gray-300">
        {Math.round(progress)}% Completed
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-800 p-6 overflow-y-auto rounded-lg shadow-lg z-10 relative">
          <h2 className="text-xl font-semibold text-gray-200 mb-6">Chapters</h2>
          <ul>
            {folders.map((folder) => {
              const folderCompletionPercentage = getFolderCompletionPercentage(folder);
              return (
                <li key={folder.id}>
                  {/* Folder Toggle with Folder Open/Close Icon */}
                  <div
                    onClick={() => toggleFolder(folder.id)}
                    className="flex items-center cursor-pointer p-4 bg-gray-700 hover:bg-gray-600 rounded-lg mb-2"
                  >
                    {/* Folder Icon */}
                    {openFolders[folder.id] ? (
                      <FaRegFolderOpen className="mr-2 text-yellow-500" size={24} />
                    ) : (
                      <IoMdFolderOpen  className="mr-2 text-gray-400" size={24} />
                    )}

                    {/* Folder Title */}
                    <span className="text-gray-200 font-bold">{folder.title}</span>

                    {/* Folder Completion Percentage */}
                    <span className="ml-2 text-gray-300 text-sm">
                      ({Math.round(folderCompletionPercentage)}%)
                    </span>

                    {/* Completed Folder Icon */}
                    {isFolderCompleted(folder) && (
                      <MdOutlineDoneOutline className="ml-2 text-green-500" />
                    )}
                  </div>

                  {/* Subchapters */}
                  {openFolders[folder.id] && (
                    <ul>
                      {folder.subchapters.map((subchapter) => (
                        <li
                          key={subchapter.id}
                          onClick={() => handleChapterClick(subchapter.file)}
                          className={`p-4 cursor-pointer rounded-lg transition-all duration-300 transform flex items-center ${
                            selectedChapter === subchapter.file
                              ? "bg-indigo-600 text-gray-100 font-bold"
                              : "bg-gray-700 hover:bg-gray-600"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={completedChapters.includes(subchapter.id)}
                            onChange={() => handleCheckboxChange(subchapter.id)}
                            className="mr-4 w-5 h-5 text-green-500 rounded-lg border-2 border-gray-500 focus:ring-2 focus:ring-green-400 transition-all duration-200 transform hover:scale-110"
                          />
                          {subchapter.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-xl z-10 relative">
          <div className="w-full h-full relative">
            <iframe
              src={selectedChapter}
              title="Chapter Viewer"
              className="w-full h-full border-none rounded-lg"
              frameBorder="0"
              loading="lazy"
              allow="fullscreen"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookViewer;
