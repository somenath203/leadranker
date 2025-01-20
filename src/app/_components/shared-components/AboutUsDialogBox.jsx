import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const AboutUsDialogBox = ({ openAboutUsDialogBox, setOpenAboutusDialogBox }) => {

  return (
    <Dialog open={openAboutUsDialogBox} onOpenChange={setOpenAboutusDialogBox}>

      <DialogContent className="bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-slate-900 dark:via-slate-800 dark:to-orange-950 shadow-lg rounded-lg px-6 py-8">
        
        <DialogHeader>

          <DialogTitle className="text-left mt-4 text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
            About Us
          </DialogTitle>

          <p className="text-left font-semibold mt-3 text-slate-800 dark:text-slate-100">
            LeadRanker: Your Gateway to Targeted Leads
          </p>

          <div className="mt-3 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
            
            <p>
              LeadRanker is a cutting-edge platform designed to connect you with
              the most relevant leads for your business. Whether you're a
              recruiter, marketer, or entrepreneur, we simplify the process of
              finding and analyzing professionals to help you achieve your
              goals.
            </p>

            <p>
              By leveraging advanced filters and real-time data, LeadRanker
              saves you time while enabling informed decision-making. With our
              intuitive interface, you can effortlessly grow your network and
              build lasting connections with the right individuals.
            </p>

          </div>

        </DialogHeader>

      </DialogContent>

    </Dialog>
  );
};


export default AboutUsDialogBox;
