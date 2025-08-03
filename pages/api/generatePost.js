import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import clientPromisse from "../../lib/mongodb";
import OpenAI from "openai";

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = await getSession(req, res);
  const client = await clientPromisse;
  const db = client.db("blog-ai");

  const userProfile = await db.collection("users").findOne({
    auth0Id: user.sub,
  });

  if (!userProfile?.availableTokens) {
    res.status(403);
    return;
  }

  const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const model = "gpt-4o-mini-2024-07-18";
  const { topic, keywords } = req.body;

  if (!topic || !keywords) {
    res.status(422).json({ error: "Missing required fields" });
    return;
  }

  if (!topic.length > 100 || !keywords.length > 100) {
    res.status(422).json({ error: "Fields are too long" });
    return;
  }

  const response = await openAi.chat.completions.create({
    model: model,
    messages: [
      {
        role: "system",
        content:
          "You are a SEO friendly blog post generator called AI-Blog. You are disigned to output markdown without frontmatter.",
      },
      {
        role: "user",
        content: `Generate me a short seo blog post on the following topic delimited by triple hyphens: 
        ---
        ${topic}
        --- 
        targeting the following comma separeted keywords delimited by triple hyphens: 
        ---
        ${keywords}
        ---`,
      },
    ],
  });

  const postContent = response.choices[0]?.message?.content;

  const seoResponse = await openAi.chat.completions.create({
    model: model,
    messages: [
      {
        role: "system",
        content:
          "You are a SEO friendly blog post generator called AI-Blog. You are disigned to output JSON. Do not include HTML tags in your output.",
      },
      {
        role: "user",
        content: `Generate a SEO friendly title and a SEO friendly meta for the following 
        ${postContent} 
        --- 
        The output json format must be in the following format:
        {
            title: "title example", 
            metaData: "metadata example"
        }`,
      },
    ],
    response_format: { type: "json_object" },
  });

  const { title, metaData } = JSON.parse(
    seoResponse.choices[0]?.message?.content || {}
  );

  await db.collection("users").updateOne(
    {
      auth0Id: user.sub,
    },
    {
      $inc: {
        availableTokens: -1,
      },
    }
  );

  const post = await db.collection("posts").insertOne({
    postContent,
    title,
    metaData,
    topic,
    keywords,
    userId: userProfile._id,
    created: new Date(),
  });

  res.status(200).json({ postId: post.insertedId });
});
