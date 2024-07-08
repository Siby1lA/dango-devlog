import { useRouter } from 'next/router.js'
import { useState } from 'react'
import { getKoreaTodayDateInfo } from 'utils/survey.js'

export default function Survey({ title, setToastView }) {
  const router = useRouter()
  const type = router.asPath.split('/')[1]
  const [formState, setFormState] = useState('')
  const [submitData, setSubmitData] = useState('')

  const handleSubmitDataChange = (event) => {
    setSubmitData(event.target.value)
  }

  const submit = async () => {
    if (!submitData) return
    const { doc, setDoc, arrayUnion } = await import('firebase/firestore')
    const { fireStoreDB } = await import('./firebase.js')
    const [year, month, date, hour, minute] = getKoreaTodayDateInfo()
    const createdAt = year + '년 ' + month + '월 ' + date + '일 ' + hour + '시 ' + minute + '분'
    const newBlog = { content: submitData, createdAt }
    const userRef = doc(fireStoreDB, `survey/${type}`)
    try {
      await setDoc(userRef, { [title]: { [formState]: arrayUnion(newBlog) } }, { merge: true })
      setToastView(true)
      setTimeout(() => {
        setToastView(false)
      }, 3000)
      setFormState('')
      setSubmitData('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      id="survey"
      className={`relative flex w-full flex-col items-center justify-center rounded-[12px] bg-[#F9FAFB] px-6 py-12 dark:bg-[#262626]`}
    >
      {!formState ? (
        <>
          <div className="mb-6 flex flex-col items-center pt-[20px]">
            <span className="mb-1 text-2xl font-extrabold text-[#333D4B] dark:text-gray-100">
              이번 글은 어떠셨나요?
            </span>
            <span className="text-[15px] text-gray-600 dark:text-gray-400">
              당고당고는 항상 여러분의 의견을 듣고 있어요.
            </span>
          </div>
          <div className="text-lg">
            <button
              onClick={() => setFormState('GOOD')}
              className="mr-4 rounded-[12px] bg-[#f97148] px-8 py-[10px] font-semibold text-[#333D4B] dark:text-gray-100"
            >
              유용해요
            </button>
            <button
              onClick={() => setFormState('BAD')}
              className="rounded-[12px] bg-[#EDEDED] px-8 py-[10px] font-semibold text-[#333D4B] dark:bg-[#1c1c1c] dark:text-gray-100"
            >
              아쉬워요
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex w-full flex-col items-center">
            <div className="absolute right-6 top-6">
              <svg
                onClick={() => {
                  setFormState('')
                  setSubmitData('')
                }}
                className="h-7 w-7 cursor-pointer text-[#333D4B] dark:text-gray-100"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                fill="currentColor"
                viewBox="0 0 384 512"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
            <span className="mb-6 mt-2 text-2xl font-extrabold text-[#333D4B] dark:text-gray-100">
              어떤 점이 유용하거나 아쉬우셨나요?
            </span>
            <textarea
              placeholder="어떤 점이 좋거나 아쉬웠는지 알려주세요!"
              className="h-[200px] w-full resize-none rounded-[2px] border-none text-[15px] text-[#333D4B] focus:outline-none dark:bg-[#1c1c1c] dark:text-gray-100"
              value={submitData}
              maxLength={300}
              onChange={handleSubmitDataChange}
            />
            <div className="mt-2 flex w-full justify-end">
              <span className="text-[12px] font-semibold text-gray-600 dark:text-gray-400">
                {submitData.length}자 입력 / 최대 300자
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center text-lg">
            <button
              onClick={() => submit()}
              type="button"
              className="mr-4 mt-4 rounded-[12px] bg-[#f97148] px-8 py-[10px] font-semibold text-[#333D4B] dark:text-gray-100"
            >
              보내기
            </button>
          </div>
        </>
      )}
    </div>
  )
}
