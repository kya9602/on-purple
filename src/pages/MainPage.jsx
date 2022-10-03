import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Deck from "../components/Main/Deck";
//import Test from "../components/Main/test";


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