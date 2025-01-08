import { useEffect, useState } from "react";

const TypewriterAni = () => {
const [currentNameIndex, setCurrentNameIndex] = useState(0);
const [currentText, setCurrentText] = useState("");
const [isDeleting, setIsDeleting] = useState(false);
const typingSpeed = 150;
const deletingSpeed = 75;

useEffect(() => {
const names = ["Income", "Expense"];
const currentName = names[currentNameIndex];
let timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setCurrentText(currentName.slice(0, currentText.length - 1));
      }, deletingSpeed);
    } else {
      timeout = setTimeout(() => {
        setCurrentText(currentName.slice(0, currentText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && currentText === currentName) {
      timeout = setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentNameIndex((currentNameIndex + 1) % names.length);
    }

    return () => clearTimeout(timeout);

}, [currentText, isDeleting, currentNameIndex]);

return (
<div>
<span>Manage Your Daily </span>
<span className="typewriter">{currentText}</span>
<span className="cursor"></span>
</div>
);
};

export default TypewriterAni;
