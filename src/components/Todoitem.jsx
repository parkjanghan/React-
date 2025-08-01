import './Todoitem.css'
import { memo, useContext } from 'react';
import { TodoDispatchContext } from '../App';

const Todoitem = ({id, isDone, content, date}) => {
    const {onUpdate, onDelete} = useContext(TodoDispatchContext);
    
    const onChangeCheckbox = (e) => {
        onUpdate(id);
    }

    const onClickDeleteButton = () => {
        onDelete(id);
    }

    return <div className="Todoitem">
        <input type="checkbox" checked={isDone} onChange={onChangeCheckbox}></input>
        <div className="content">{content}</div>
        <div className="date">{new Date(date).toLocaleDateString()}</div>
        <button onClick={onClickDeleteButton}>삭제</button>
    </div>
}

export default memo(Todoitem);