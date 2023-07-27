import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`
  )}`

const postDateTemplate = { year: 'numeric', month: 'long', day: 'numeric' }

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { slug, fileName, date, title, images, tags, poster } = frontMatter

  return (
    <div className="mx-auto max-w-2xl px-4">
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <ScrollTopAndComment />
      <article>
        <div>
          <header className="pt-6 xl:pb-12">
            {poster && (
              <Image
                src={poster}
                width="644px"
                height="322px"
                alt="poster"
                className="rounded-[12px] object-cover"
              />
            )}
            <div className="my-8 space-y-1">
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
            {authorDetails.map((author) => (
              <div className="flex items-center space-x-2" key={author.name}>
                {author.avatar && (
                  <Image
                    src={author.avatar}
                    width="55px"
                    height="55px"
                    alt="avatar"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                )}
                <dl className="whitespace-nowrap text-sm font-medium leading-5">
                  <dt className="sr-only">Name</dt>
                  <dd className="mb-1 text-[17px] font-semibold text-[#4E5968] dark:text-gray-100">
                    {author.name} - Frontend Developer
                  </dd>
                  <dd className="text-[14px] text-gray-400 dark:text-gray-300">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale).slice(0, -1)}
                    </time>
                  </dd>
                </dl>
              </div>
            ))}
          </header>
          <div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 pb-8 text-[19px] text-[#334D4B] dark:prose-dark">
                {children}
              </div>
              <Comments frontMatter={frontMatter} />
            </div>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                <div className="flex justify-between">
                  {prev && (
                    <div>
                      <h2 className="text-sm tracking-wide text-gray-500 dark:text-gray-400">
                        이전 글
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                      </div>
                    </div>
                  )}
                  {next && (
                    <div>
                      <h2 className="text-sm tracking-wide text-gray-500 dark:text-gray-400">
                        다음 글
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </div>
  )
}
