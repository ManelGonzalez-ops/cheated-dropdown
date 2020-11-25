import React, { useEffect, useRef, useState } from 'react'
import { MenuItem } from './MenuItem'
import { Transition } from 'react-transition-group'

const menuItems = [
    {
        title: "Home",
        dropdownItems: ["amazon", "google", "facebook"],
        id: 1
    },
    {
        title: "About",
        dropdownItems: ["amazon", "google"],
        id: 2
    },
    {
        title: "Work",
        dropdownItems: ["amazon"],
        id: 3
    },
    {
        title: "Contact",
        dropdownItems: ["amazon", "google", "facebook", "amazon", "google"],
        id: 4
    },
]


export const Navbar = () => {
    const [selection, setSelection] = useState("")
    const dropdown = useRef(null)
    
    const [{ height, width, transform }, setDimensions] = useState({ height: 0, width: 0, transform: 0 })
    const [lastRef, setLastRef] = useState("")
    const [linkRef, setLinkRef] = useState([])
    const [firstRef, setFirstRef] = useState("") 
    const transitionStyles = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 },
    }
    const [currentRef, setCurrentRef] = useState("")
    const defaultStyles = {
        position: "absolute",
        transition: "opacity 0.4s ease"
        //backgroundColor: "lightblue",
        //transition: "height 0.4s ease"
    }
    const handleHover = (id) => {
        if (selection) {

        }
        setSelection(menuItems.find(item => item.id === id))
    }

    console.log(linkRef, "puta")

    useEffect(() => {
        if (selection) {
            const transformAmount = currentRef.getBoundingClientRect().x + 
            currentRef.getBoundingClientRect().width -firstRef.getBoundingClientRect().x
            setDimensions({
                height: dropdown.current.offsetHeight,
                width: dropdown.current.offsetWidth,
                transform: `translateX(${transformAmount}px)`
            })
            console.log("diferencia", dropdown.current.getBoundingClientRect().x - currentRef.getBoundingClientRect().x)
            //console.log(currentRef.getBoundingClientRect().x, "ostia")
        }
    }, [selection])

   

    return (
        <header>
            <a href="#"><h3>logo</h3></a>
            <nav
                style={{ position: "relative" }}
            >
                <ul
                    className="ul-nav"
                    onMouseLeave={() => { setSelection("") }}
                >
                    <MenuItem key={menuItems[0].id} handleHover={handleHover} setCurrentRef={setCurrentRef} firstRef={firstRef} setFirstRef={setFirstRef} info={menuItems[0]} />
                    {menuItems.slice(1, menuItems.length).map(item => (
                    <MenuItem
                        key={item.id}
                        info={item}
                        handleHover={handleHover}
                        selection={selection}
                        setSelection={setSelection}
                        setCurrentRef={setCurrentRef}
                    //isSelected = {item.id === selection.id}
                    />))}
                </ul>
                <div style={{ position: "absolute", height, width, transform, background: "lightblue", transition: "all 0.4s ease", overflow: "hidden" }}>
                   
                       
                            <ul
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
                            </ul>
                        
                    
                    </div>
            </nav>
        </header>
    )
}

const ItemAnimated = ({ selection }) => {

    const [selectionDefered, setSelectionDefered] = useState()
    useEffect(() => {
        if (selection) {
            setTimeout(() => {
                setSelectionDefered(selection)
            }, 200)
        } else {
            //if the dropdown was close we won't settimout
            setSelectionDefered(selection)
        }
    }, [selection])

    return (
        <>
            {selectionDefered && selectionDefered.dropdownItems.map((item, index) => (
                <li
                    key={index}
                >{item}</li>
            ))}
        </>)
}