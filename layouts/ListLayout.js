import Link from '@/components/Link'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'
import Image from 'next/image'

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }) {
  const [searchValue, setSearchValue] = useState('')
  const pageTitle = title
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-[#333D4B] dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="게시글 검색"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul>
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags, poster } = frontMatter
            return (
              <li key={slug} className="py-4">
                <article className="flex items-center">
                  {poster && (
                    <Image
                      src={poster}
                      width="200px"
                      height="160px"
                      alt="poster"
                      className="items-center rounded-[12px] object-cover"
                    />
                  )}
                  <div className="ml-8 w-[80%]">
                    <div>
                      <h3 className="mb-2 text-[22px] font-bold leading-8 tracking-tight xl:text-[32px]">
                        <Link
                          href={`${
                            pageTitle === '개발'
                              ? '/blog'
                              : pageTitle === '이벤트'
                              ? '/event'
                              : '/notice'
                          }/${slug}`}
                          className="text-[#333D4B] dark:text-gray-100"
                        >
                          {title}
                        </Link>
                      </h3>
                    </div>
                    <div className="prose mb-2 max-w-none text-[17px] text-[#4E5968] dark:text-gray-400">
                      {summary}
                    </div>
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-[15px] font-medium leading-6 text-gray-400 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
