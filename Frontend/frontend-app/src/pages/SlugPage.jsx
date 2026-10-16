import { useParams } from "react-router-dom";
import PackageDetail from "./packages/PackageDetail";
import RamayanaTrail from "./packages/RamayanaTrail";
import BlogPost from "./blogs/BlogPost";
import NotFound from "./NotFound";
import { RAMAYANA, findPackage } from "../data/packages";
import { findBlog } from "../data/blogs";

// The old WordPress site served tours and blog posts at top-level URLs (e.g. /galle-fort-sri-lanka/),
// so this route looks the slug up in both lists to keep those links working.
export default function SlugPage() {
  const { slug } = useParams();

  if (slug === RAMAYANA.slug) return <RamayanaTrail />;

  const pkg = findPackage(slug);
  if (pkg) return <PackageDetail key={slug} pkg={pkg} />;

  const post = findBlog(slug);
  if (post) return <BlogPost key={slug} post={post} />;

  return <NotFound />;
}
