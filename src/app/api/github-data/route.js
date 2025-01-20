import { NextResponse } from 'next/server';
import axios from 'axios';
import { auth } from '@clerk/nextjs/server';

import prismaClientConfig from '@/prismaClientConfig';


export async function POST(req) {

  try {

    const { userId } = await auth();

    
    const { jobTitle, skills, location, experienceLevel, activityTimeline, numberOfLeads } = await req.json();


    const formattedSkills = skills
    .split(',')
    .map(skill => `"${skill.trim()}"`) 
    .join(' OR ');


    let query = `${formattedSkills} ${jobTitle}`;

    if (location !== 'Remote') {

      query += ` location:${location}`;

    }


    if (activityTimeline === 'Last 3 months') {

      query += ` created:>${new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString().split('T')[0]}`;

    } else if (activityTimeline === 'Last 6 months') {

      query += ` created:>${new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString().split('T')[0]}`;
    
    } else if (activityTimeline === 'Last 1 year') {
      
      query += ` created:>${new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0]}`;

    }


    const { data } = await axios.get('https://api.github.com/search/users', {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
      params: {
        q: query,
        per_page: numberOfLeads,
      },
    });



    if (data?.items?.length) {
      
      const userDetailsPromises = data.items.map(async (user) => {
        
        try {
          
          const { data: userProfile } = await axios.get(user?.url, {
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
              'X-GitHub-Api-Version': '2022-11-28',
            },
          });

          const sanitizedFollowingUrl = userProfile.following_url.replace(
            '{/other_user}',
            ''
          );

          const sanitizedGistsUrl = userProfile.gists_url.replace(
            '{/gist_id}',
            ''
          );

          const sanitizedStarredUrl = userProfile.starred_url.replace(
            '{/owner}{/repo}',
            ''
          );

          const [followers, following, gists, starred, repos] = await Promise.all([

            axios.get(userProfile.followers_url, {
              headers: {
                Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
                'X-GitHub-Api-Version': '2022-11-28',
              },
            }),

            axios.get(sanitizedFollowingUrl, {
              headers: {
                Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
                'X-GitHub-Api-Version': '2022-11-28',
              },
            }),

            axios.get(sanitizedGistsUrl, {
              headers: {
                Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
                'X-GitHub-Api-Version': '2022-11-28',
              },
            }),

            axios.get(sanitizedStarredUrl, {
              headers: {
                Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
                'X-GitHub-Api-Version': '2022-11-28',
              },
            }),

            axios.get(userProfile.repos_url, {
              headers: {
                Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
                'X-GitHub-Api-Version': '2022-11-28',
              },
            }),

          ]);


          return {
            name: userProfile?.login,
            avatar: userProfile?.avatar_url,
            githubUrl: userProfile?.html_url,
            followers: followers?.data?.length,
            following: following?.data?.length,
            gists: gists?.data?.length,
            starred: starred?.data?.length,
            repos: repos?.data?.length,
          };


        } catch (error) {

          console.error(`Error fetching data for user ${user.login}:`, error);

          return NextResponse.json(
            {
              error: null,
            },
            { status: 500 }
          );
        }

      });


      const userDetails = (await Promise.all(userDetailsPromises)).filter(
        (user) => user !== null
      );

      const userData = await prismaClientConfig.githubData.create({
        data: {
          jobTitle: jobTitle,                                
          skills: skills,                                  
          location: location,                                
          activityTimeline: activityTimeline,  
          experienceLevel: experienceLevel,                   
          numberOfLeads: numberOfLeads,      
          githubData: JSON.stringify(userDetails),                              
          clerkIdOfTheUserWhoCreatedTheGithubData: userId 
        }
      });


      return NextResponse.json(
        {
          success: true,
          userData: userData
        },
        { status: 201 }
      );

    }

  } catch (error) {

    console.error('Error fetching GitHub data:', error);

    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );

  }

}
