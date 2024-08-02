"use client"
import React, { useState } from 'react';
import  chatSession  from '../../../utils/gemini';

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobRole, setJobRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experience, setExperience] = useState('');
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);   

  const [interviewQuestions, setInterviewQuestions] = useState([]);

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const InputPrompt = `Job Position: ${jobRole}. Job Description: ${jobDescription}. Year of Experience: ${experience}. Based on the job description and year of experience, provide 10-15 interview questions along with answers in JSON format. Provide questions and answers in JSON.`;
      console.log(InputPrompt);
      // console.log(chatSession);
      console.log(chatSession.sendMessage)
      const response = await chatSession.sendMessage({ inputText: InputPrompt });
      const data = JSON.parse(response.outputText); // Assuming the response is in JSON format
      setInterviewQuestions(data);
    } catch (error) {
      console.error('Error during API call:', error);
      setError(error.message);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleFileChange = (event) => {
    setResume(event.target.files[0]);
  };

    return (
        <div>
            <div
                className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={handleOpen}
            >
                <h2 className='font-bold text-lg text-center'>+Add New</h2>
            </div>

            {/* Modal */}
            {openDialog && (
                <div className='fixed inset-0 flex items-center justify-center z-50'>
                    <div className='fixed inset-0 bg-black opacity-50' onClick={handleClose}></div>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative'>
                        <span className='absolute top-2 right-2 text-2xl cursor-pointer' onClick={handleClose}>&times;</span>
                        <h2 className='text-lg font-bold mb-4'>Add Interview Details</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <label htmlFor='jobRole' className='block text-sm font-medium text-gray-700'>Job Role/Job Position</label>
                                <input
                                    type='text'
                                    id='jobRole'
                                    name='jobRole'
                                    value={jobRole}
                                    onChange={(e) => setJobRole(e.target.value)}
                                    className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='jobDescription' className='block text-sm font-medium text-gray-700'>Job Description/Tech Stack</label>
                                <textarea
                                    id='jobDescription'
                                    name='jobDescription'
                                    rows='3'
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                                    required
                                ></textarea>
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='experience' className='block text-sm font-medium text-gray-700'>Year of Experience</label>
                                <input
                                    type='number'
                                    id='experience'
                                    name='experience'
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='resume' className='block text-sm font-medium text-gray-700'>Resume (PDF)</label>
                                <input
                                    type='file'
                                    id='resume'
                                    name='resume'
                                    accept='.pdf'
                                    onChange={handleFileChange}
                                    className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
                                    required
                                />
                            </div>
                            <div className='flex justify-end gap-4'>
                                <button
                                    type='submit'
                                    className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
                                >
                                    {loading ? 'Submitting...' : 'Start Interview'}
                                </button>
                                <button
                                    type='button'
                                    className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400'
                                    onClick={handleClose}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddNewInterview
