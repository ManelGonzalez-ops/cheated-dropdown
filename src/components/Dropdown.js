import React, { useEffect, useRef, useState } from 'react'





export const Dropdown = ({ state, info, selection, setDropdownRef, setSelection, translateX, setDropdownId }) => {
    const dropdown = useRef(null)
    const [isSelected, setIsSelected] = useState(false)
console.log(JSON.parse(JSON.stringify(translateX)), "anchura")
    const transitionStyles = {
        entering: {  transform: `translateX(${translateX * 2}px)` },
        entered: {  transform: `translateX(${0}px)` },
        exiting: {  transform: `translateX(${0}px)` },
        exited: {  transform: `translateX(${0}px)` },
    }
   
    // const transitionStyles = {
    //     entering: { opacity: 1, left: `${-transformX}px` },
    //     entered: { opacity: 1, left: `${-transformX}px` },
    //     exiting: { opacity: 0, left: `${transformX}px` },
    //     exited: { opacity: 0, left: `${transformX}px` },
    // }
    // const transitionStyles = {
    //     entering: { opacity: 1 },
    //     entered: { opacity: 1 },
    //     exiting: { opacity: 0 },
    //     exited: { opacity: 0 },
    // }

    useEffect(() => {
        if (selection.id === info.id) {
            setDropdownRef(dropdown.current)
            setDropdownId(info.id)
            setIsSelected(true)
        } else {
            setIsSelected(false)
        }
    }, [selection])


    const defaultStyles = {
        position: "absolute",

        transition: "all 0.3s ease",
        // transform: isSelected ? `translateX(${-currentRefXStored }px)`:`translateX(0px)`
        //transition: "none"
        //backgroundColor: "lightblue",

    }

    return (
        <ul
            style={{
                ...defaultStyles,
                ...transitionStyles[state],

                // left: isSelected ? `${-currentRefXStored}px` : "0px"
            }}
            ref={dropdown}
            onMouseLeave={() => { setSelection("") }}
        >
            {info.dropdownItems.map((item, index) => (
                <li
                    key={index}
                >{item}</li>
            ))}
        </ul>
    )
}
