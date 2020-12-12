import React, { useRef } from 'react'

export const MenuItem = ({ info,
    handleHover,
    setCurrentRef,
    setFirstRef = null,
    firstRef = null
}) => {
    const navItem = useRef(null)
    const handleEnter = (id) => {
        if (!firstRef && info.id === 1) {
            setFirstRef(navItem.current)

        }
        setCurrentRef(navItem.current)
        handleHover(id)
    }

    return (
        <li
            style={{ position: "relative" }}
            onMouseEnter={() => { handleEnter(info.id) }}
            ref={navItem}

        >
            <h5>{info.title}</h5>


        </li>
    )
}
