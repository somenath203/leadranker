import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = process.env.GOOGLE_GEMINI_API_KEY_INSIGHTS;

const genAI = new GoogleGenerativeAI(apiKey);


const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});


const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};


export const GenerateInightsModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "Job Title: Frontend Developer\n          Skills: JavaScript\n          Activity Timeline: Last 1 year,\n          Job Experience Requirements: Entry-level,\n          Fetched GitHub User Details Based on the Above Criteria:\n          [\n  {\n    \"name\": \"neerajkumar1909\",\n    \"avatar\": \"https://avatars.githubusercontent.com/u/158050168?v=4\",\n    \"githubUrl\": \"https://github.com/neerajkumar1909\",\n    \"followers\": 3,\n    \"following\": 1,\n    \"gists\": 0,\n    \"starred\": 0,\n    \"repos\": 30\n  },\n  {\n    \"name\": \"student-Raju\",\n    \"avatar\": \"https://avatars.githubusercontent.com/u/157442234?v=4\",\n    \"githubUrl\": \"https://github.com/student-Raju\",\n    \"followers\": 8,\n    \"following\": 11,\n    \"gists\": 0,\n    \"starred\": 1,\n    \"repos\": 6\n  },\n  {\n    \"name\": \"Krishna123-55\",\n    \"avatar\": \"https://avatars.githubusercontent.com/u/157452782?v=4\",\n    \"githubUrl\": \"https://github.com/Krishna123-55\",\n    \"followers\": 3,\n    \"following\": 2,\n    \"gists\": 0,\n    \"starred\": 1,\n    \"repos\": 9\n  }\n]\n\n          Generate a detailed insight based on the above data and rank GitHub users based on relevance, activities, and interests with respect to the job information. Return the result in markdown format."},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "## Frontend Developer Candidate Ranking:\n\nBased on the provided data, here's a ranking of GitHub users for the Frontend Developer position, considering their activity, relevance, and potential interest in the role.  This analysis is limited by the available data (only repositories, followers, following, stars, and gists are considered).  A more thorough assessment would require analyzing code quality, project complexity, and contribution history within repositories.\n\n\n**Ranking Criteria:**\n\n* **Repositories (Repos):**  Number of repositories indicates activity level and breadth of projects.  More repositories suggest more experience.\n* **Followers:** A higher follower count may suggest more visibility and recognition within the community.\n* **Following:** The number of users followed can indicate areas of interest. (Not directly relevant to ranking in this limited data set)\n* **Stars and Gists:** These show engagement with other projects and contributions to open-source projects, indicating initiative and collaborative spirit.  However, they are not weighted heavily here due to the low numbers across all candidates.\n\n\n**Candidate Profiles:**\n\n\n| Rank | GitHub User       | Repos | Followers | Stars | Gists | Relevance Score | Notes                                                                    |\n|------|--------------------|-------|------------|-------|-------|-----------------|-------------------------------------------------------------------------|\n| 1    | neerajkumar1909   | 30    | 3          | 0     | 0     | 7             | Highest number of repositories suggests broader experience or experimentation.  Requires further analysis to validate project quality.|\n| 2    | Krishna123-55    | 9     | 3          | 1     | 0     | 3             | Fewer repositories than the top candidate but still demonstrates some activity.|\n| 3    | student-Raju      | 6     | 8          | 1     | 0     | 2             | Relatively low number of repositories; follower count might indicate community engagement but needs further investigation.|\n\n\n**Relevance Score Calculation (Simplified):**\n\nThis is a simplified score for illustrative purposes.  A more robust scoring system would involve weighting factors based on the importance of each metric for the specific job description.  Here, we've simply weighted repositories most heavily:\n\n* `Repos * 2 + Followers`\n\n\n**Overall Assessment:**\n\n* **neerajkumar1909** appears to be the strongest candidate based solely on the number of repositories.  However, the quality and relevance of these projects to frontend development remain unknown.  Further investigation of their repository content is crucial.\n* **Krishna123-55** and **student-Raju** show less extensive activity but still merit consideration, especially if their repositories showcase relevant skills.\n\n**Next Steps:**\n\nTo provide a more accurate ranking, it is vital to:\n\n* **Analyze repository content:**  Examine the code quality, technologies used (JavaScript frameworks like React, Angular, Vue.js, etc.), and project complexity within each user's repositories.\n* **Check for contributions to open-source projects:** Participation in open-source projects demonstrates collaboration skills and understanding of community standards.\n* **Review profile information:** Look at the user's profile description, contributions, and pinned repositories for further insights.\n\n\nThis enhanced analysis would provide a much more reliable ranking and a more complete picture of each candidate's suitability for the Frontend Developer position.\n"},
      ],
    },
  ],
});