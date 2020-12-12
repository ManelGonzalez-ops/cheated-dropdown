import React, { useEffect, useRef } from 'react'





export const Dropdown = ({ state,
    info,
    selection,
    setDropdownRef,
    setSelection,
    translateX,
    setDropdownId 
}) => {
    const dropdown = useRef(null)
    console.log(JSON.parse(JSON.stringify(translateX)), "anchura")
    const transitionStyles = {
        entering: { transform: `translateX(${translateX * 2}px)` },
        entered: { transform: `translateX(${0}px)` },
        exiting: { transform: `translateX(${translateX}px)` },
        exited: { transform: `translateX(${translateX}px)` },
    }

    useEffect(() => {
        if (selection.id === info.id) {
            setDropdownRef(dropdown.current)
            setDropdownId(info.id)
        }
    }, [selection])


    const defaultStyles = {
        position: "absolute",
        transition: "all 0.3s ease",
    }

    return (
        <ul
            style={{
                ...defaultStyles,
                ...transitionStyles[state],
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
