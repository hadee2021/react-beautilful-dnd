import React from 'react'
import './App.css'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { useState, useEffect } from "react"


function App() {

  const [itemList, setItemList] = useState([
    { id: "1", name: "John" , age: 18, gender: "male"},
    { id: "2", name: "Sarah", age: 18, gender: "female" },
    { id: "3", name: "Paul", age: 18, gender: "male" },
  ])
  // const [itemList, setItemList] = useState(userdata.data)



  console.log("itemList",itemList)

  useEffect(() => {
    console.log("서버로 업뎃")
  }, [itemList])


  const handleDragEnd = (e: any) => {
    console.log("handleDragEnd 받는 이벤트",e)
    if (!e.destination) return
    if(e.source.index === e.destination.index) return
    let tempData = Array.from(itemList)
    let [source_data] = tempData.splice(e.source.index, 1)
    tempData.splice(e.destination.index, 0, source_data)
    console.log("tempData",tempData)
    setItemList(tempData)
  }

  return (
    <div className="App">
      <DragDropContext onDragEnd={handleDragEnd}>
        <p>dnd beautiful test</p>
        <Droppable droppableId="droppable-1">
        {(provider) => (
          <div
            className="list-container"
            ref={provider.innerRef}
            {...provider.droppableProps}
          >
            {itemList?.map((user, index) => (
              <Draggable
                draggableId={user.id}
                key={user.id}
                index={index}
              >
                {(provider) => (
                  <div {...provider.draggableProps} ref={provider.innerRef} className="user-card">
                    <div {...provider.dragHandleProps} className="move"> = </div>
                    <div>{user.name}</div>
                    <div>{user.age}</div>
                    <div>{user.gender}</div>
                    <div className="btn-container">
                      <button onClick={() => alert("변경")}>
                        변경
                      </button>
                      <button onClick={() => alert("삭제")}>
                        삭제
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provider.placeholder}
          </div>
        )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default App
