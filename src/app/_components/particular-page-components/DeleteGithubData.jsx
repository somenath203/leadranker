'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import axios from "axios";

import { Button } from "@/components/ui/button";


const DeleteGithubData = ({ itemId }) => {

  
  const router = useRouter();

  const [ loading, setLoading ] = useState(false);

  
  const deleteItem = async () => {

    try {

        setLoading(true);

        const { data } = await axios.post('/api/delete-data', {
          itemId: itemId
        });

        if (data?.success) {

          router.push('/dashboard');

        }
        
    } catch (error) {
        
    } finally {

        setLoading(false);

    }

  }

  return (
    loading ? <ImSpinner8 className='transition-all animate-spin duration-700 size-5 text-orange-500 dark:text-orange-400' /> : <Button onClick={deleteItem}>
      Delete Github Data
    </Button>
  )
}

export default DeleteGithubData;