import { useEffect } from "react"

import "../cdn/css/index.css";
import { Link } from "react-router-dom";

export default function Index() {
    useEffect(() => {
        document.title = "RedEye Bot";
        document.body.onscroll = () => {
            console.log("scroll");
            document.querySelectorAll(".fade-up").forEach(element => {
                if (element.getBoundingClientRect().top < window.innerHeight) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            });
            document.querySelectorAll(".fade-down").forEach(element => {
                if (element.getBoundingClientRect().top < window.innerHeight) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            });
        };
    }, []);

    return (
        <>
            <Link to="/docs">Docs</Link>
        </>
    )
}