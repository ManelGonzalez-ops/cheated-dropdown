import React, { useEffect, useRef } from 'react'
import { Transition } from 'react-transition-group'

const defaultStyles = {
    position: "absolute",
    transition: "opacity 0.4s ease"
    //backgroundColor: "lightblue",
    //transition: "height 0.4s ease"
}

const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
}

export const MenuItem = ({ info, handleHover, selection, setSelection, setCurrentRef, setDropdownRef, setFirstRef = null, firstRef = null }) => {
    const navItem = useRef(null)
    const dropdown = useRef(null)
    const handleEnter = (id) => {
        if (!firstRef && info.id === 1) {
            setFirstRef(navItem.current)

        }
        setCurrentRef(navItem.current)
        setDropdownRef(dropdown.current)
        handleHover(id)
    }

    return (
        <li
            style={{ position: "relative", overflow: selection.id === info.id? "visible": "hidden" }}
            onMouseEnter={() => { handleEnter(info.id) }}
            ref={navItem}
        // onMouseLeave={debounceMouseLeave}
        >
            <h5>{info.title}</h5>
            <Transition
                in={selection.id === info.id}
            >{
                    state => (
                        <ul
                            style={{
                                ...defaultStyles,
                                ...transitionStyles[state]
                            }}
                            ref={dropdown}
                        >
                            {info.dropdownItems.map((item, index) => (
                                <li
                                    key={index}
                                >{item}</li>
                            ))}
                        </ul>
                    )}
            </Transition>
            {/* <ul
                style={{
                    ...defaultStyles
                }}
                ref={dropdown}
            >
                {selection && selection.dropdownItems.map((item, index) => (
                    <li
                        key={index}
                    >{item}</li>
                ))}
            </ul> */}
        </li>
    )
}
