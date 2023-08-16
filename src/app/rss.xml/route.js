import { BLOG_TITLE } from "@/constants";
import { getBlogPostList } from "@/helpers/file-helpers";
import RSS from "rss";

export async function GET(request) {
  const blogPosts = await getBlogPostList();
  const baseUrl = new URL(request.url).origin;
  const feed = new RSS({
    title: BLOG_TITLE,
    description: "A wonderful blog about JavaScript",
    feed_url: request.url,
    site_url: baseUrl,
  });
  blogPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${baseUrl}/${post.slug}`,
      date: post.publishedOn,
    });
  });
  return new Response(feed.xml(), {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
