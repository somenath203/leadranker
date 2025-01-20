'use client';

import { z } from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ImSpinner9 } from "react-icons/im";
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


const Page = () => {


  const [ loading, setLoading ] = useState(false);

  const [ error, setError ] = useState('');

  const router = useRouter();


  const formSchema = z.object({
    jobTitle: z
      .string()
      .min(2, { message: 'Job title must be at least 2 characters.' })
      .max(50, { message: 'Job title must be at less than 50 characters.' }),
    skills: z
      .string()
      .min(2, { message: 'Skills must be at least 2 characters.' })
      .max(30, { message: 'Job title can be maximum of 30 characters only'}),
    location: z
      .string()
      .min(2, { message: 'Location title must be at least 2 characters.' })
      .max(30, { message: 'Job title must be at less than 30 characters.' }),
    experienceLevel: z.enum(['Entry-level', 'Mid-level', 'Senior-level'], {
      required_error: 'Experience level is required. Please select one.',
    }),
    activityTimeline: z.enum(
      ['Last 3 months', 'Last 6 months', 'Last 1 year'],
      {
        required_error: 'Activity timeline is required. Please select one.',
      }
    ),
    numberOfLeads: z.coerce
      .number()
      .min(1, { message: 'Number of leads must be at least 1.' })
      .max(10, { message: 'Number of leads cannot be more than 10' }),
  });


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: '',
      skills: '',
      location: '',
      experienceLevel: undefined,
      activityTimeline: undefined,
      numberOfLeads: '',
    },
  });


  const onSubmit = async (values) => {

    try {

      setLoading(true);

      setError('');

      const { data } = await axios.post('/api/github-data', {
        jobTitle: values?.jobTitle,
        skills: values?.skills,
        location: values?.location,
        activityTimeline: values?.activityTimeline,
        experienceLevel: values?.experienceLevel,
        numberOfLeads: values?.numberOfLeads,
      });

      if(data?.success) {

        router.push(`view-particular-data-detail/${data?.userData?.id}`);
        
      }

    } catch (error) {

      console.log(error);

      setError('An error occurred while fetching data from the GitHub API with the specified requirements. Please try again with a different combination of inputs after some time.')

    } finally {

      setLoading(false);

    }

  };


  return (
    <>
      
      <div className="max-w-6xl mx-auto mt-4">
        
        <Card className="bg-white/80 dark:bg-slate-900/80 shadow-xl p-5">
          
          <CardHeader>
            
            <CardTitle className="text-xl lg:text-2xl text-center lg:text-left font-bold bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
              Find Your Perfect Leads
            </CardTitle>

            <CardDescription className='text-center lg:text-left'>
              Fill in the details below to discover targeted leads matching your
              criteria.
            </CardDescription>

          </CardHeader>

          <CardContent>

            <Form {...form}>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>

                        <FormLabel className="font-medium">
                          Job Title/Role
                        </FormLabel>

                        <FormControl>

                          <Input
                            className="bg-white/50 dark:bg-slate-800/50"
                            placeholder="e.g. Frontend Developer"
                            {...field}
                          />

                        </FormControl>

                        <FormMessage />

                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>

                        <FormLabel className="font-medium">
                          Required Skills
                        </FormLabel>

                        <FormControl>
                          <Input
                            className="bg-white/50 dark:bg-slate-800/50"
                            placeholder="e.g. JavaScript, React"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />

                      </FormItem>
                    )}
                  />

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  <FormField
                    control={form.control}
                    name="experienceLevel"
                    render={({ field }) => (
                      <FormItem>

                        <FormLabel className="font-medium">
                          Experience Level
                        </FormLabel>

                        <FormControl>

                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >

                            <SelectTrigger className="bg-white/50 dark:bg-slate-800/50">
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>

                            <SelectContent>
                              {['Entry-level', 'Mid-level', 'Senior-level'].map(
                                (level) => (
                                  <SelectItem key={level} value={level}>
                                    {level}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>

                          </Select>

                        </FormControl>

                        <FormMessage />
                      
                      </FormItem>
                    
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>

                        <FormLabel className="font-medium">Location</FormLabel>

                        <FormControl>
                          <Input
                            className="bg-white/50 dark:bg-slate-800/50"
                            placeholder="e.g., Remote, USA"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />

                      </FormItem>
                    )}
                  />

                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <FormField
                    control={form.control}
                    name="activityTimeline"
                    render={({ field }) => (
                      <FormItem>

                        <FormLabel className="font-medium">
                          Activity Timeline
                        </FormLabel>

                        <FormControl>

                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >

                            <SelectTrigger className="bg-white/50 dark:bg-slate-800/50">
                              <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>

                            <SelectContent>
                              {[
                                'Last 3 months',
                                'Last 6 months',
                                'Last 1 year',
                              ].map((timeline) => (
                                <SelectItem key={timeline} value={timeline}>
                                  {timeline}
                                </SelectItem>
                              ))}
                            </SelectContent>

                          </Select>

                        </FormControl>

                        <FormMessage />
                      
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="numberOfLeads"
                    render={({ field }) => (
                      <FormItem>

                        <FormLabel className="font-medium">
                          Number of Leads
                        </FormLabel>

                        <FormControl>
                          <Input
                            className="bg-white/50 dark:bg-slate-800/50"
                            placeholder="e.g. 10"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />

                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                >
                  { loading ? <ImSpinner9 className='animate-spin duration-700' /> : 'Search for Leads' }
                </Button>

              </form>

            </Form>

            { error && <p className='mt-3 text-center lg:text-left text-red-500 dark:text-red-300'>{error}</p> }

          </CardContent>

        </Card>

      </div>

    </>
  );
};


export default Page;
