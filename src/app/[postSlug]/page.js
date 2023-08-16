import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import CodeSnippet from "@/components/CodeSnippet/CodeSnippet";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const DivisionGroupsDemo = dynamic(() =>
  import("@/components/DivisionGroupsDemo/DivisionGroupsDemo")
);

const CircularColorsDemo = dynamic(() =>
  import("@/components/CircularColorsDemo/CircularColorsDemo")
);

async function BlogPost({ params }) {
  const blogPost = await loadBlogPost(params.postSlug).catch(() => notFound());
  return (
    <article className={styles.wrapper}>
      <BlogHero title="Example post!" publishedOn={new Date()} />
      <div className={styles.page}>
        <MDXRemote
          source={blogPost.content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;

export async function generateMetadata({ params }) {
  const blogPost = await loadBlogPost(params.postSlug);

  return {
    title: blogPost.frontmatter.title,
    description: blogPost.frontmatter.abstract,
  };
}
