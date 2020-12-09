import React, { useEffect, useRef, useState } from 'react'



const transitionStyles = {
    entering: { opacity: 1, transform: "translateX(-100px)" },
    entered: { opacity: 1, transform: "translateX(-100px)" },
    exiting: { opacity: 0, transform: "translateX(0px)" },
    exited: { opacity: 0, transform: "translateX(0px)" },
}

export const Dropdown = ({ state, info, selection, setDropdownRef, setSelection, currentRefXStored }) => {
    const dropdown = useRef(null)
    const [isSelected, setIsSelected] = useState(false)
    useEffect(() => {
        if (selection.id === info.id) {
            setDropdownRef(dropdown.current)
            setIsSelected(true)
        } else {
            setIsSelected(false)
        }
    }, [selection])

    const defaultStyles = {
        position: "relative",
        left: "50px",
        //transition: "opacity 0.4s ease",
        
        //transition: "none"
        //backgroundColor: "lightblue",
        transition: "unset"
    }

    return (
        <ul
            style={{
                ...defaultStyles,
                ...transitionStyles[state],
                //left: isSelected ? `${currentRefXStored}px` : "0px"
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
