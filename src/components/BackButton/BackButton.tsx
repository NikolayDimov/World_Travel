import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const BackButton: React.FC = () => {
    const navigate = useNavigate();

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        navigate(-1);
    };

    return (
        <Button type="back" onClick={handleButtonClick}>
            &larr; Back
        </Button>
    );
};

export default BackButton;
