import './App.css'
import { useReducer, useRef, createContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import New from './pages/New'
import Diary from './pages/Diary'
import Edit from './pages/Edit'
import Notfound from './pages/Notfound'
import { useState } from 'react'

export const DiaryStateContext = createContext()
export const DiaryDispatchContext = createContext()

function reducer(state, action) {
  let nextState

  switch (action.type) {
    case 'INIT': {
      return action.data
    }
    case 'CREATE': {
      nextState = [action.data, ...state]
      break
    }
    case 'UPDATE': {
      nextState = state.map((item) =>
        Number(item.id) === Number(action.data.id) ? action.data : item
      )
      break
    }
    case 'DELETE': {
      nextState = state.filter(
        (item) => Number(item.id) !== Number(action.data.id)
      )
      break
    }
    default:
      return state
  }

  localStorage.setItem('diary', JSON.stringify(nextState))
  return nextState
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, dispatch] = useReducer(reducer, [])
  const idRef = useRef(0)

  useEffect(() => {
    const storedData = localStorage.getItem('diary')
    if (!storedData) {
      setIsLoading(false)
      return
    }
    const parsedData = JSON.parse(storedData)
    if (!Array.isArray(parsedData)) {
      setIsLoading(false)
      return
    }

    let maxId = 0
    parsedData.forEach((item) => {
      item.id = Number(item.id) // id를 숫자로 변환
      if (item.id > maxId) {
        maxId = item.id
      }
    })
    idRef.current = maxId + 1
    dispatch({
      type: 'INIT',
      data: parsedData,
    })
    setIsLoading(false)
  }, [])

  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    })
  }

  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id: Number(id),
        createdDate,
        emotionId,
        content,
      },
    })
  }

  const onDelete = (id) => {
    dispatch({
      type: 'DELETE',
      data: {
        id,
      },
    })
  }

  if (isLoading) {
    return <div>데이터 로딩 중...</div>
  }

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  )
}

export default App
