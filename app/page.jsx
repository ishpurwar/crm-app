'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
function Home() {
  const { user} = useUser();
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const response = await axios.get('/api/campaigns');
      setCampaigns(response.data);
    };

    fetchCampaigns();
  }, []);

  if (!user) {
    return (
      <div className='container mx-auto p-4'>
        <h1 className='font-extrabold text-2xl text-violet-600 flex justify-center p-2 mb-3'>Welcome to My CRM App</h1>
        <p className='text-center'>Please login to the app</p>
      </div>
    )
  }
  return (
    <div>
      {<>
        <h1 className='text-center text-[32px] font-semibold '>Campaigns</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign._id}>
                    <TableCell className="overflow-hidden">{campaign.message}</TableCell>
                    <TableCell>{campaign.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table></>
          }
    </div>
  );
}

export default Home;
