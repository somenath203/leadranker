'use client';

import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { saveAs } from 'file-saver';
import {
  AiOutlineFileText,
  AiOutlineCode,
  AiOutlineEnvironment,
  AiOutlineClockCircle,
  AiOutlineTeam,
} from 'react-icons/ai';
import { ImSpinner2 } from "react-icons/im";
import { TbMoodEmpty } from "react-icons/tb";
import { IoSparkles } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { FaSpinner } from "react-icons/fa6";
import { FaRegClipboard } from "react-icons/fa";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw';
import { RiFileExcel2Fill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';


const Page = () => {


  const params = useParams();

  const id = params?.id;


  const [githubData, setGithubData] = useState();

  const [ generatedInsights, setGeneratedInsights ] = useState('');

  const [ generatedEmail, setGeneratedEmail ] = useState('');


  const [ openEmailDialogBox, setOpenEmailDialogBox ] = useState(false);


  const [loading, setLoading] = useState(false);

  const [ loadingGeneratingInsights, setLoadingGeneratingInsights ] = useState(false);

  const [ loadingGenerateEmails, setLoadingGenerateEmails ] = useState(false);


  const [ errorInsights, setErrorInsights ] = useState('');

  const [ errorPersonalizedEmail, setErrorPersonalizedEmail ] = useState('');


  const fetchParticularGithubDataDetails = async () => {

    try {

      setLoading(true);

      const { data } = await axios.post('/api/fetch-particular-data', {
        githubDataId: id,
      });

      if (data?.success) {

        setGithubData(data?.data);

      }

    } catch (error) {

      console.log(error);

    } finally {
      
      setLoading(false);
    
    }

  };


  const generateGithubUserInsightsUsingGemini = async () => {

    try {

      setLoadingGeneratingInsights(true);

      setGeneratedInsights('');


      const { jobTitle, skills, activityTimeline, experienceLevel, githubData: githubUsers } = githubData;
  
      if (jobTitle || skills || activityTimeline || githubUsers) {

        const formattedGithubUsers = JSON.stringify(JSON.parse(githubUsers), null, 2);
  
        const promptToGenerateInsights = `
          Job Title: ${jobTitle}
          Skills: ${skills}
          Activity Timeline: ${activityTimeline},
          Job Experience Requirements: ${experienceLevel},
          Fetched GitHub User Details Based on the Above Criteria: 
          ${formattedGithubUsers}
    
          Generate a detailed insight based on the above data and rank GitHub users based on relevance, activities, and interests with respect to the job information. Return the result in markdown format.
        `;
    
        
        const { data } = await axios.post('/api/generate-insights', {
          promptToGenerateInsights: promptToGenerateInsights
        });

        if (data?.success) {

          setGeneratedInsights(data?.result);

          setTimeout(() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight - 300, 
              behavior: 'smooth',
            });
          }, 100); 

        }
        
      }

    } catch (error) {
      
      console.error(error);

      setErrorInsights('An error occurred while generating the personalized insights, or the Gemini API has reached its daily limit. Please try again later.');
    
    } finally {

      setLoadingGeneratingInsights(false);

    }

  };


  const generatePersonalizedEmail = async (userData) => {

    try {

      setLoadingGenerateEmails(true);

      setOpenEmailDialogBox(true);

      setErrorPersonalizedEmail('');


      const { jobTitle, skills, experienceLevel } = githubData;

      const promptToGeneratePersonalizedEmail = `
        Create a personalized and professional hiring/referral email based on the following details:

        Job Information:
        - Title: ${jobTitle}
        - Required Skills: ${skills}
        - Experience Level: ${experienceLevel}

        Candidate Details:
        - Name: ${userData?.name}
        - GitHub Profile: ${userData?.githubUrl}
        - Followers: ${userData?.followers}
        - Following: ${userData?.following}
        - Gists: ${userData?.gists}
        - Starred Repositories: ${userData?.starred}
        - Public Repositories: ${userData?.repos}

        Guidelines:
        - Express interest in hiring the candidate, referencing their GitHub profile as the source of discovery.
        - Use an engaging and respectful tone while maintaining professional standards.
        - Ensure the email is formatted as plain text with proper spacing and readability.

        Return only the completed email in plain text format.
      `;



      const { data } = await axios.post('/api/generate-personalized-emails', {
        promptToGenerateEmail: promptToGeneratePersonalizedEmail
      });
      

      if (data?.success) {

        setGeneratedEmail(data?.result);

      }
      
    } catch (error) {

      console.log(error);

      setErrorPersonalizedEmail('An error occurred while generating the personalized email, or the Gemini API has reached its daily limit. Please try again later.');
      
    } finally {
      
      setLoadingGenerateEmails(false);

    }

  }
  
  
  const copyEmailToClipbaord = () => {

    if (generatedEmail) {

      navigator.clipboard.writeText(generatedEmail);

    }

  }


  const downloadLeadsAsCSV = () => {

    if (parsedGithubUsers?.length > 0) {

      const headers = [
        'Avatar URL',
        'Name',
        'Profile URL',
        'Followers',
        'Following',
        'Gists',
        'Starred Repositories',
        'Repositories',
      ];
  
      const rows = parsedGithubUsers.map((user) => [
        user?.avatar || '',
        user?.name || 'N/A',
        user?.githubUrl || '',
        user?.followers || 0,
        user?.following || 0,
        user?.gists || 0,
        user?.starred || 0,
        user?.repos || 0,
      ]);
  
      const csvContent = [headers, ...rows]
        .map((row) => row.map((field) => `"${field}"`).join(','))
        .join('\n');
  
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
      saveAs(blob, `leads-${uuidv4()}.csv`);

    } 

  };
  

  useEffect(() => {

    fetchParticularGithubDataDetails();

  }, []);


  if (loading) {

    return <div className="px-8 py-4">

      <ImSpinner2 className="transition-all animate-spin duration-700 size-8 text-orange-600" />

    </div>

  }

  if (!githubData) {

    return <div className="px-8 py-4">

      <div className="flex flex-col gap-2">

        <TbMoodEmpty className="size-16 text-orange-500" />

        <p className="text-lg text-orange-500">Something went wrong or any data with the given ID does not exist.</p>

      </div>

    </div>

  }


  const {
    jobTitle,
    skills,
    location,
    activityTimeline,
    numberOfLeads,
    experienceLevel,
    githubData: githubUsers,
  } = githubData;

  const parsedGithubUsers = JSON.parse(githubUsers);


  return (
    <>
      <div className="px-2 lg:px-8 py-3 lg:py-6">

        <h1 className="text-2xl lg:text-3xl text-center lg:text-left font-extrabold text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text mb-6">
          GitHub Data Details
        </h1>


        <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg shadow-lg">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div className="flex flex-col lg:flex-row items-center gap-4">

              <div className="p-3 bg-orange-500 text-white rounded-full">
                <AiOutlineFileText size={24} />
              </div>

              <div>

                <h2 className="text-lg text-center lg:text-left font-semibold text-gray-800 dark:text-gray-100">
                  Job Title
                </h2>

                <p className="text-gray-700 text-center lg:text-left dark:text-gray-300">
                  {jobTitle || 'N/A'}
                </p>

              </div>

            </div>


            <div className="flex flex-col lg:flex-row items-center gap-4">

              <div className="p-3 bg-purple-500 text-white rounded-full">
                <AiOutlineCode size={24} />
              </div>

              <div>

                <h2 className="text-lg text-center lg:text-left font-semibold text-gray-800 dark:text-gray-100">
                  Skills
                </h2>

                <p className="text-gray-700 text-center lg:text-left dark:text-gray-300">
                  {skills || 'N/A'}
                </p>

              </div>

            </div>


            <div className="flex flex-col lg:flex-row items-center gap-4">

              <div className="p-3 bg-blue-500 text-white rounded-full">
                <AiOutlineEnvironment size={24} />
              </div>

              <div>

                <h2 className="text-lg text-center lg:text-left font-semibold text-gray-800 dark:text-gray-100">
                  Location
                </h2>

                <p className="text-gray-700 text-center lg:text-left dark:text-gray-300">
                  {location || 'N/A'}
                </p>

              </div>

            </div>


            <div className="flex flex-col lg:flex-row items-center gap-4">

              <div className="p-3 bg-green-500 text-white rounded-full">
                <AiOutlineClockCircle size={24} />
              </div>

              <div>

                <h2 className="text-lg text-center lg:text-left font-semibold text-gray-800 dark:text-gray-100">
                  Activity Timeline
                </h2>

                <p className="text-gray-700 text-center lg:text-left dark:text-gray-300">
                  {activityTimeline || 'N/A'}
                </p>

              </div>

            </div>


            <div className="flex flex-col lg:flex-row items-center gap-4">

              <div className="p-3 bg-indigo-700 text-white rounded-full">
                <IoMdPerson size={24} />
              </div>

              <div>

                <h2 className="text-lg text-center lg:text-left font-semibold text-gray-800 dark:text-gray-100">
                  Experience
                </h2>

                <p className="text-gray-700 text-center lg:text-left dark:text-gray-300">
                  {experienceLevel || 'N/A'}
                </p>

              </div>

            </div>


            <div className="flex flex-col lg:flex-row items-center gap-4">

              <div className="p-3 bg-pink-500 text-white rounded-full">
                <AiOutlineTeam size={24} />
              </div>

              <div>

                <h2 className="text-lg text-center lg:text-left font-semibold text-gray-800 dark:text-gray-100">
                  Number of Leads
                </h2>

                <p className="text-gray-700 text-center lg:text-left dark:text-gray-300">
                  {numberOfLeads || 'N/A'}
                </p>

              </div>

            </div>

          </div>

        </div>


        <div className="mt-10">

          <div className='flex flex-col lg:flex-row items-center justify-center lg:justify-between mb-4'>

            <h2 className="text-base lg:text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
              Fetched GitHub Users Based on the Above Criteria
            </h2>

            {parsedGithubUsers?.length > 0 && <div className="mt-4 flex justify-center">
              <Button
                className="bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600 flex items-center justify-center"
                onClick={downloadLeadsAsCSV}
              >

                <RiFileExcel2Fill />
                
                <span>Download Leads Data</span>

              </Button>
            </div>}

          </div>

          {parsedGithubUsers?.length > 0 ? (

            <Table className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              
              <TableHeader>
                
                <TableRow className="bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                  
                  <TableHead className="text-gray-800 dark:text-gray-100">
                    Avatar
                  </TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-100">
                    User Name
                  </TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-100">
                    Profile URL
                  </TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-100">
                    Followers
                  </TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-100">
                    Following
                  </TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-100">
                    Gists
                  </TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-100">
                    Starred Repos
                  </TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-100">
                    Repositories
                  </TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-100">
                    Generate Personalized Email
                  </TableHead>

                </TableRow>

              </TableHeader>

              <TableBody>
                {parsedGithubUsers?.map((user, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
                  >
                    <TableCell>

                      <Avatar className="h-10 w-10">

                        <AvatarImage src={user?.avatar} alt={user?.login} />

                        <AvatarFallback>
                          {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>

                      </Avatar>

                    </TableCell>
                    
                    <TableCell className="text-gray-800 dark:text-gray-100">
                      {user?.name || 'N/A'}
                    </TableCell>
                    
                    <TableCell>
                      
                      <Link
                        href={`${user?.githubUrl}`}
                        target="_blank"
                        className="text-blue-500 hover:underline"
                      >
                        View Profile
                      </Link>
                    
                    </TableCell>
                    
                    <TableCell className="text-gray-800 dark:text-gray-100">
                      {user?.followers || 0}
                    </TableCell>
                    
                    <TableCell className="text-gray-800 dark:text-gray-100">
                      {user?.following || 0}
                    </TableCell>
                    
                    <TableCell className="text-gray-800 dark:text-gray-100">
                      {user?.gists || 0}
                    </TableCell>
                    
                    <TableCell className="text-gray-800 dark:text-gray-100">
                      {user?.starred || 0}
                    </TableCell>
                    
                    <TableCell className="text-gray-800 dark:text-gray-100">
                      {user?.repos || 0}
                    </TableCell>

                    <TableCell>
                      <Button onClick={() => generatePersonalizedEmail(user)}>Generate Personalized Email</Button>
                    </TableCell>
                  
                  </TableRow>
                
                ))}
              
              </TableBody>
            
            </Table>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">

              <div className="flex flex-col gap-2">

                <TbMoodEmpty className="size-12 text-orange-500" />

                <p className="text-lg text-orange-500">No Github Data Found</p>

              </div>

            </p>
          )}

        </div>

        {loadingGeneratingInsights ? <div className='mt-8 flex items-center gap-3'>
          
          <FaSpinner className='text-2xl lg:text-4xl transition-all animate-spin duration-700 text-orange-500 dark:text-orange-400' />

          <p className='text-orange-500 dark:text-orange-400'>Generating Insights...</p>

        </div> : <div 
          className='mt-8 flex items-center gap-2 p-5 w-56 bg-orange-600 text-white rounded-2xl shadow-xl cursor-pointer'
          onClick={generateGithubUserInsightsUsingGemini}
        >
          
          <IoSparkles className='text-5 lg:size-6' />

          <span className='text-sm lg:text-lg'>Generate Insights</span>

        </div>}

        {!loadingGeneratingInsights && errorInsights && (
          <p className='mt-4 text-left'>
            {errorInsights}
          </p>
        )}

        {!loadingGeneratingInsights && generatedInsights && (
          <div className="my-5 lg:my-10 p-2 lg:p-6 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
              📊 Generated Insights
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
              Explore the detailed insights generated for the GitHub users. Interact and analyze the results in a structured and readable format.
            </p>

            <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 transition-transform transform hover:scale-[1.02] hover:shadow-xl break-words">
              <div className="overflow-x-auto">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  className="max-w-full overflow-x-auto text-sm lg:text-lg text-center lg:text-left"
                >
                  {generatedInsights}
                </Markdown>
              </div>
            </div>


            <div className="flex justify-center mt-8">
              <Button
                className="px-6 py-3 bg-orange-500 text-white font-semibold text-lg rounded-full shadow-md hover:bg-orange-600"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Back to Top
              </Button>
            </div>

          </div>
        )}

      </div>

      <Dialog open={openEmailDialogBox} onOpenChange={setOpenEmailDialogBox}>

        <DialogContent className="bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-slate-900 dark:via-slate-800 dark:to-orange-950 shadow-lg rounded-lg px-6 py-8 max-h-[90vh] max-w-2xl overflow-y-auto">
          
          <DialogHeader>

            <DialogTitle className="text-left mt-4 text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
              Your Email
            </DialogTitle>

            <div className="mt-3 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              
              { loadingGenerateEmails ? <FaSpinner className='text-3xl transition-all animate-spin duration-700 text-orange-500 dark:text-orange-400' /> : errorPersonalizedEmail ? <p>{errorPersonalizedEmail}</p> : <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                className='leading-8'
              >
                { generatedEmail }

              </Markdown> }

            </div>

          </DialogHeader>

          {generatedEmail && <Button className='flex items-center gap-2 py-6' onClick={copyEmailToClipbaord}>
            
            <FaRegClipboard className='text-3xl text-white' />

            <span className='text-lg text-white'>Copy to clipboard</span>

          </Button>}

        </DialogContent>

      </Dialog>

    </>
  );
};

export default Page;
