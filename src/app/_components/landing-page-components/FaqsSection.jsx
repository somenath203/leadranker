import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';


const FaqsSection = () => {

  const faqsData = [
    {
      id: 1,
      title: 'What is LeadRanker?',
      description:
        'LeadRanker is an AI-powered tool that helps companies find and rank top developer talent using data from GitHub.',
    },
    {
      id: 2,
      title: 'How does it work?',
      description:
        'LeadRanker analyzes GitHub profiles based on skills, experience, and activity. It uses AI to rank candidates and provide actionable insights.',
    },
    {
      id: 3,
      title: 'What inputs are required?',
      description:
        'Provide details like job title, required skills, experience level, and location to refine your search for the best developers.',
    },
    {
      id: 4,
      title: 'How are results delivered?',
      description:
        'Results are displayed in a ranked list on your dashboard.',
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 mb-10">

        <Accordion type="single" className='w-11/12 text-orange-600 dark:text-orange-400' collapsible>

            {faqsData.map((faq) => (
                <AccordionItem value={`item-${faq.id}`} key={faq.id}>

                <AccordionTrigger className='text-lg tracking-wide'>{faq.title}</AccordionTrigger>

                <AccordionContent className='text-base tracking-wide'>

                    {faq.description}

                </AccordionContent>

                </AccordionItem>
            ))}

      </Accordion>

    </div>
  )

};


export default FaqsSection;
