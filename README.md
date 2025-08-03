# AI-Blog

**AI-Powered Blog Content Generator**  
AI-Blog is a Next.js application that uses the OpenAI API to generate high-quality blog post content. It allows users to input topics or prompts, and the AI generates titles, summaries, and full articles. The app is designed for bloggers and content creators who want to streamline their content creation process.

![Demo Screenshot](/public/homeScreenshot.png)

---

## Features

- **AI-Powered Content Generation**: Seamlessly integrates with OpenAI's GPT API to generate blog posts.
- **User-Friendly Interface**: Simple and intuitive UI for creating and managing posts.
- **Responsive Design**: Built with Tailwind CSS for a clean and modern look.
- **Database Integration**: Uses MongoDB to store and retrieve posts.
- **Authentication**: Secure user authentication via Auth0.
- **Markdown Support**: Write and preview posts using Markdown formatting.

---

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: Auth0
- **AI Integration**: OpenAI API

---

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Sarthak690/AI-Blog-main.git
   cd AI-Blog

   ```

2. **Install dependencies**:

   ```bash
   npm install

   ```

3. **Set up environment variables**:

   Create a .env.local file in the root directory and add the following variables:
   ```plaintext
   MONGODB_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   AUTH0_SECRET=your_auth0_secret
   AUTH0_BASE_URL=http://localhost:3000
   AUTH0_ISSUER_BASE_URL=your_auth0_domain
   AUTH0_CLIENT_ID=your_auth0_client_id
   AUTH0_CLIENT_SECRET=your_auth0_client_secret

   ```

4. **Run the development server**:

   ```bash
   npm run dev

   ```

5. **Open the app**:
   Visit http://localhost:3000 in your browser.

---

## Usage

- **Sign Up/Log In**: Use Auth0 to create an account or log in.
- **Create a Post**: Enter a topic and keywords than let the AI generate a blog post for you.
- **View Posts**: Access all your saved posts from the sidebar.

---

