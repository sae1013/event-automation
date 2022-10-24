import React, { useState,useEffect,useRef } from 'react'
import './App.module.scss'

function App() {
  const [intrinsicSize,setIntrinsicSize] = useState(0);
  const [renderSize,setRenderSize] = useState(0);
  const imageContainerRef = useRef(null);
  const ref = useRef(null);

  const onClickHandler = (e) => {
    const width = window.innerWidth; // 이미지의 render 사이즈 기준으로 계산하면 이미지내부에서 클릭한 상대적위치의 크기를 알수있다.
    const height = window.innerHeight;
    const wrapperOffsetLeft = 100;
    const targetY = e.clientY;
    const targetX = e.clientX
    console.log('현재클릭좌표',targetX-100,targetY);
    console.log('렌더사이즈',renderSize)
    const absoluteX = intrinsicSize*targetX /renderSize
    console.log('현재클릭한 절대좌표',absoluteX-100) // 79.597122

    // intrinsic:render = absoluteX:relativeX
    const relativeX = absoluteX * renderSize /intrinsicSize // 41을 클릭하라고 다시 나오네 !
    console.log('다시변환한 상대좌표',relativeX-100)
    console.dir(ref.current)
    console.dir(imageContainerRef.current.offsetLeft)
  }

  const onLoadImage = (src) => {
    const intrinsicSize = src.target.naturalWidth
    const renderSize = src.target.width
    setIntrinsicSize(intrinsicSize);
    setRenderSize(renderSize);

  }

  useEffect(()=>{
    interact('.resize-drag')
      .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        listeners: {
          move (event) {
            var target = event.target
            var x = (parseFloat(target.getAttribute('data-x')) || 0)
            var y = (parseFloat(target.getAttribute('data-y')) || 0)

            // update the element's style
            target.style.width = event.rect.width + 'px'
            target.style.height = event.rect.height + 'px'

            // translate when resizing from top or left edges
            x += event.deltaRect.left
            y += event.deltaRect.top

            target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

            target.setAttribute('data-x', x)
            target.setAttribute('data-y', y)
            target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
          }
        },
        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: 'parent'
          }),

          // minimum size
          interact.modifiers.restrictSize({
            min: { width: 100, height: 50 }
          })
        ],

        inertia: true
      })
      .draggable({
        listeners: { move: window.dragMoveListener },
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
          })
        ]
      })
  },[])

  return (
    <div>
      <div>mypabe</div>
      {/*<div id="grid-snap">*/}
      {/*  Dragging is constrained to the corners of a grid*/}
      {/*</div>*/}
    </div>

  )
}

export default App

// 이미지 맵을 활용해서 이벤트 자동화 !? 퍼센트로 계산하는 방법도 있음. 영역을 그리면 왼쪽기준으로
// 전체크기에서
// 이미지 렌더사이즈에서 canvas 에서
// 현재 렌더된 이미지 크기 기준으로 %으로 영역을 만든다. ->
// coord 속성을 정확한 px값으로 찾을수 있다.
// 렌더 이미지 크기와 원본 이미지 크기를 비교하면된다.