import Button from './Button'
import './Editor.css'
import EmotionItem from './EmotionItem'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { emotionList } from '../util/constants'
import { getStringedDate } from '../util/getStringedDate'

const Editor = ({ initData, onSubmit }) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: 'hello',
  })

  const nav = useNavigate()

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
        emotionId: Number(initData.emotionId), // 반드시 숫자로 변환!
      })
    }
  }, [initData])

  const onChangeInput = (e) => {
    let name = e.target.name
    let value = e.target.value

    if (name === 'createdDate') {
      value = new Date(value)
    }
    if (name === 'emotionId') {
      value = Number(value)
    }

    setInput({
      ...input,
      [name]: value,
    })
  }

  const onClickSubmitButton = () => {
    console.log(input)
    onSubmit(input)
  }

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate"
          value={getStringedDate(input.createdDate)}
          type="date"
          onChange={onChangeInput}
        />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() => {
                onChangeInput({
                  target: {
                    name: 'emotionId',
                    value: Number(item.emotionId), // 숫자로 변환
                  },
                })
              }}
              key={item.emotionId}
              {...item}
              isSelected={Number(item.emotionId) === Number(input.emotionId)}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        ></textarea>
      </section>
      <section className="button_section">
        <Button
          onClick={() => {
            nav(-1)
          }}
          text={'취소하기'}
        />
        <Button
          onClick={onClickSubmitButton}
          text={'작성 완료'}
          type={'POSITIVE'}
        />
      </section>
    </div>
  )
}

export default Editor
