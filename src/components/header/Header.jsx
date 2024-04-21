import React from 'react'
import { Navbar, Logo, Container } from "../index"
import "./Header.css"

function Header() {
    return (
        <Container>
            <header>
                <Logo />
                <Navbar />
            </header>
        </Container>
    )
}

export default Header