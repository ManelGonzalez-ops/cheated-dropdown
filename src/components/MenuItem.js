import React, { useEffect, useRef } from 'react'


export const MenuItem = ({ info, handleHover, selection, setSelection, setCurrentRef, setFirstRef = null, firstRef = null }) => {
    const navItem = useRef(null)
    // const cleanableTimer = useRef
    // const debounceMouseLeave =()=>{
    //     console.log("mama")
    //     cleanableTimer.current = setTimeout(()=>{
    //         console.log("mucho")
    //         if(!selection){
    //             setSelection("")
    //         }
    //     }, 400)
    // }
    // useEffect(()=>{
    //    return ()=>{
    //         clearTimeout(cleanableTimer.current)
    //     }
    // })
    const handleEnter = (id) => {
        if (!firstRef && info.id === 1) {
            setFirstRef(navItem.current)

        }
        setCurrentRef(navItem.current)
        handleHover(id)
    }

    return (
        <li
            onMouseEnter={() => { handleEnter(info.id) }}
            ref={navItem}
        // onMouseLeave={debounceMouseLeave}
        >
            <h5>{info.title}</h5>

        </li>
    )
}
