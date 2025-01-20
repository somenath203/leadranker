import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = process.env.GOOGLE_GEMINI_API_KEY_PERSONALIZED_EMAIL;

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


export const GenerateEmailModel = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Job Title: Frontend Developer\n        Required Skills: JavaScript\n        Experience Level: Entry-level\n        User Details:\n          - Name: neerajkumar1909\n          - GitHub Profile: https://github.com/neerajkumar1909\n          - Followers: 3\n          - Following: 1\n          - Gists: 0\n          - Starred Repositories: 0\n          - Public Repositories: 30\n\n        Using the above details, craft a personalized and professional hiring or referral email.\n        The email should express interest in hiring the user, stating that you discovered their profile on GitHub.\n        Ensure the tone is engaging, respectful, and aligned with professional communication standards.\n        Return the final email in README format."},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```markdown\n# Hiring Email for Neerajkumar1909\n\nSubject: Frontend Developer Opportunity - [Your Company Name]\n\nDear Neerajkumar1909,\n\nMy name is [Your Name] and I'm a [Your Title] at [Your Company Name]. I came across your GitHub profile ([https://github.com/neerajkumar1909](https://github.com/neerajkumar1909)) and was impressed by your portfolio of 30 public repositories.  Given your stated interest in JavaScript and our current search for an entry-level Frontend Developer, I wanted to reach out directly.\n\nAt [Your Company Name], we're a [brief, compelling description of your company and its culture - e.g.,  dynamic team building innovative web applications for the education sector].  We're particularly interested in candidates who are passionate about learning and contributing to a collaborative environment.  Your active GitHub profile suggests a dedication to continuous learning, which aligns perfectly with our values.\n\nWhile the number of followers and stars on GitHub isn't the sole determinant of skill, your proactive approach to building and sharing your projects is highly commendable. We would be interested in learning more about your experience with JavaScript and your approach to frontend development.\n\nWould you be open to a brief introductory call sometime next week to discuss this opportunity further? Please let me know your availability.\n\nThank you for your time and consideration.\n\nSincerely,\n\n[Your Name]\n[Your Title]\n[Your Company Name]\n[Your Contact Information]\n```\n"},
        ],
      },
    ],
});