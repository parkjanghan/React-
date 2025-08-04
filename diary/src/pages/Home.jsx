import Header from '../components/Header'
import Button from '../components/Button'
import DiaryList from '../components/DiaryList'
import { useState, useContext } from 'react'
import { DiaryStateContext } from '../App'

const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime()

  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  )
  return data.filter(
    (item) => item.createdDate >= beginTime && item.createdDate <= endTime
  )
}

const Home = () => {
  const data = useContext(DiaryStateContext)
  const [pivotDate, setpivotDate] = useState(new Date())

  const monthlyData = getMonthlyData(pivotDate, data)

  const onIncreaseMonth = () => {
    setpivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1))
  }
  const onDecreaseMonth = () => {
    setpivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1))
  }

  return (
    <>
      <div>
        <Header
          title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
          leftChild={<Button text={'<'} onClick={onDecreaseMonth} />}
          rightChild={<Button text={'>'} onClick={onIncreaseMonth} />}
        />
      </div>
      <div>
        <DiaryList data={monthlyData} />
      </div>
    </>
  )
}

export default Home
