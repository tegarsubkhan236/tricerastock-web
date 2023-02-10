import React from 'react';
import TypingCard from "../../../components/TypingCard";

const Index = () => {
    const cardContent = `
        Berikut adalah contoh <strong>BASIC FORM</strong>...
    `
    return (
        <div className="app-container">
            <TypingCard title='Basic Form' source={cardContent}/>
        </div>
    );
};

export default Index;