import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";

// Safe Markdown: raw HTML is not parsed (react-markdown default), output is sanitized with rehype-sanitize's GitHub-style schema
// (no scripts, event handlers or javascript:/data: URLs), and highlighting runs AFTER sanitizing so it only adds spans it generated itself.
const components: Components = {
  a: ({ href, children }) => {
    const external = !!href && /^https?:\/\//i.test(href);
    return <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>;
  },
  img: ({ src, alt }) => (typeof src === "string" ? <img src={src} alt={alt ?? ""} loading="lazy" referrerPolicy="no-referrer" /> : null),
};
export default function Markdown({ source }: { source: string }) {
  return (<div className="md"><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize, [rehypeHighlight, { detect: false, ignoreMissing: true }]]} components={components}>{source}</ReactMarkdown></div>);
}
