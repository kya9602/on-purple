import React from "react";
import Footer from "../components/Footer/Footer";
import Deck from "../components/Main/Deck";
import Header from "../components/Header/Header";


const MainPage = () => {
    return (
        <div>
            <Header />
                <Deck />
            <Footer />
        </div>
    )
}

export default MainPage;