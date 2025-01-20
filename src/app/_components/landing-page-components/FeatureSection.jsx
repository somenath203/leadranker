import { MdAutoGraph, MdPersonSearch, MdAnalytics } from "react-icons/md";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";


const FeatureSection = () => {
  return (
    <div className="py-12 lg:py-20">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">


        <Card className="backdrop-blur-lg">

          <CardHeader>

            <div className="h-12 w-12 bg-orange-500 rounded-lg mb-6 flex items-center justify-center">
              <MdPersonSearch className="h-6 w-6 text-white" />
            </div>

            <CardTitle>Smart Lead Discovery</CardTitle>

          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground">
              Automatically identify potential leads from GitHub using the power of Google Gemini AI.
            </p>
          </CardContent>

        </Card>


        <Card className="backdrop-blur-lg">

          <CardHeader>
            <div className="h-12 w-12 bg-orange-500 rounded-lg mb-6 flex items-center justify-center">
              <MdAutoGraph className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Intelligent Ranking</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground">
              Prioritize leads based on engagement levels, project activity, and
              likelihood of conversion using AI scoring.
            </p>
          </CardContent>

        </Card>


        <Card className="backdrop-blur-lg">

          <CardHeader>
            <div className="h-12 w-12 bg-orange-500 rounded-lg mb-6 flex items-center justify-center">
              <MdAnalytics className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Actionable Insights</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground">
              Get detailed analytics and insights about each lead's interests,
              activities, and potential opportunities.
            </p>
          </CardContent>

        </Card>

      </div>

    </div>
  );
};


export default FeatureSection;
