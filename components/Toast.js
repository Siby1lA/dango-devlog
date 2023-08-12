const Toast = () => {
  return (
    <div className="flex justify-center">
      <div className="fixed top-12 z-10 flex items-center rounded-[12px] bg-[#F9FAFB] px-[1rem] py-[0.7rem] shadow-xl">
        <span className="flex items-center text-[18px] font-medium text-[#333D4B] dark:text-gray-100">
          <svg className="mr-2 h-6 w-6" viewBox="0 0 20 20" fill="#f97148">
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
          의견 주셔서 감사합니다!
        </span>
      </div>
    </div>
  )
}

export default Toast
