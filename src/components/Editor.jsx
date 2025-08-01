import './Editor.css'
import { useState, useRef, useContext } from 'react';
import { TodoDispatchContext } from '../App';

const Editor = () => {
    const {onCreate} = useContext(TodoDispatchContext);
    

    const [content, setContent] = useState("");
    const contentRef = useRef();

    const onKeyDown = (e) => {
        if(e.keyCode === 13){
            onSubmit();
        }
    }

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    const onSubmit = () => {
        if(content==="") {
            contentRef.current.focus();
            return;
        }
        
        onCreate(content);
        setContent("")
    }
    return (
    <div className="Editor">
        <input value = {content} ref={contentRef} onKeyDown={onKeyDown} onChange={onChangeContent} placeholder="새로운 Todo..."></input>
        <button onClick={onSubmit}>추가</button>
    </div>
    )
}

export default Editor;