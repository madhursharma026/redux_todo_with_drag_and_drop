import "./App.css";
import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { AddPost, DeletePostData, RemoveAllPostData, UpdatePost } from "./actions/actions"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";


function App() {
  let list = useSelector((state) => state.todoReducers.list)
  const [inputValue, setinputValue] = useState("")
  const [editId, seteditId] = useState(null)
  const [editValue, seteditValue] = useState(null)
  const dispatch = useDispatch();


  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  const onEnd = (result) => {
    list = reorder(list, result.source.index, result.destination.index)
  }

  return (
    <div className="container-md post_data">
      <div className='text-center'>
        <i className="fa fa-book mt-5" style={{ fontSize: "72px", color: "blue" }}></i>
        <h1>My Notes</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          {(editValue !== null) ?
            <>
              <input type="text" className="post_input mx-2 fa px-2" maxLength="100" value={editValue} placeholder="&#xf044; Edit Notes" style={{ fontSize: "24px", height: "41px", width: "80%" }} onChange={(e) => seteditValue(e.target.value)} />
              <button type="submit" className="btn btn-primary add_post_btn" title="Add Post" style={{ fontSize: "18px", marginTop: "-12px" }} onClick={() => dispatch(UpdatePost(editId, editValue), seteditValue(""), seteditValue(null))}><b><i className="fa fa-pencil"></i></b></button>
            </>
            :
            <>
              <input type="text" className="post_input mx-2 fa px-2" maxLength="100" value={inputValue} placeholder="&#xf044; Add Notes" style={{ fontSize: "24px", height: "41px", width: "80%" }} onChange={(e) => setinputValue(e.target.value)} />
              {inputValue !== "" ?
                <button type="submit" className="btn btn-primary add_post_btn" title="Add Post" style={{ fontSize: "18px", marginTop: "-12px" }} onClick={() => dispatch(AddPost(inputValue), setinputValue(""))}><b>+</b></button>
                :
                <button type="button" className="btn btn-primary add_post_btn disabled" title="Add Post" style={{ fontSize: "18px", marginTop: "-12px" }} onClick={() => dispatch(AddPost(inputValue), setinputValue(""))}><b>+</b></button>
              }
            </>
          }
        </form>
      </div>
      <DragDropContext onDragEnd={onEnd}>
        <Droppable droppableId="ListData">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {list.map((elem, i) => {
                return (
                  <div className="mt-3">
                    <Draggable key={elem.id} draggableId={elem.id} index={i}>
                      {(provided) => (
                        <ul className="list-group" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <li className="list-group-item" style={{ fontSize: '20px' }}>{i + 1}. {elem.data}<span className='bg-danger' style={{ paddingTop: '2px', paddingBottom: '2px', paddingLeft: '4px', paddingRight: '4px', cursor: "pointer", marginLeft: "10px", marginRight: "10px" }} onClick={() => dispatch(DeletePostData(elem.id), seteditValue(null))}><i className="fa fa-trash"></i></span><span className='bg-warning' style={{ paddingTop: '2px', paddingBottom: '2px', paddingLeft: '4px', paddingRight: '4px', cursor: "pointer" }} onClick={() => (seteditValue(elem.data), seteditId(elem.id))}><i className="fa fa-pencil"></i></span></li>
                        </ul>
                      )}
                    </Draggable>
                    {
                      i === list.length - 1 ?
                        <button type="button" className="btn btn-info mt-2 w-100 mb-3" onClick={() => dispatch(RemoveAllPostData(), seteditValue(null))}>Remove All</button>
                        :
                        <></>
                    }
                  </div>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;


