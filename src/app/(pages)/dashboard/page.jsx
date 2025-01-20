'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { TbMoodEmpty } from "react-icons/tb";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import Link from "next/link";


const Page = () => {


  const [loading, setLoading] = useState(false);

  const [allGitHubData, setAllGitHubData] = useState([]);


  const fetchAllGithubDataOfCurrentlyLoggedInUser = async () => {

    try {

      setLoading(true);

      const { data } = await axios.get('/api/fetch-all-data');

      if (data?.success) {

        setAllGitHubData(data?.data);

      }

    } catch (error) {

      console.log(error);

    } finally {
      
      setLoading(false);
    
    }

  };


  useEffect(() => {

    fetchAllGithubDataOfCurrentlyLoggedInUser();

  }, []);


  return (
    <div className="px-8 py-4">

      <h1 className="text-xl lg:text-2xl text-center lg:text-left font-bold mb-6">Dashboard</h1>

      {loading ? (

        <ImSpinner2 className="transition-all animate-spin duration-700 size-8 text-orange-600" />

      ) : allGitHubData.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {allGitHubData.map((item, index) => (

            <Link key={index} href={`/view-particular-data-detail/${item.id}`}>

              <Card
                className="border border-orange-600 bg-gradient-to-br from-gray-200 via-gray-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 hover:scale-105 transition-all cursor-pointer duration-500"
              >
                <CardHeader>

                  <CardTitle className="text-lg font-bold text-orange-500">
                    {item.jobTitle || "No Job Title"}
                  </CardTitle>

                  <CardDescription className="text-sm text-gray-500">
                    {item.location || "Location not provided"}
                  </CardDescription>

                </CardHeader>

                <CardContent>

                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Skills:</span> {item.skills || "No skills listed"}
                  </p>

                </CardContent>

              </Card>
            </Link>
          ))}

        </div>

      ) : (
        
        <div className="flex flex-col gap-2">

          <TbMoodEmpty className="size-16 text-orange-500" />

          <p className="text-lg text-orange-500">No data found. Please create one.</p>

        </div>
      
      )}
    
    </div>
  );
};


export default Page;
