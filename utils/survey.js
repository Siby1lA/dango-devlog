export const getKoreaTodayDateInfo = () => {
  const DATE = new Date() // 현재 날짜(로컬 기준) 가져오기
  const utc = DATE.getTime() + DATE.getTimezoneOffset() * 60 * 1000 // utc 표준시 도출
  const kstGap = 9 * 60 * 60 * 1000 // 한국 kst 기준시간 더하기
  const today = new Date(utc + kstGap) // 한국 시간으로 date 객체 만들기(오늘)
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()
  const hour = today.getHours()
  const minute = today.getMinutes()
  return [year, month, date, hour, minute]
}
