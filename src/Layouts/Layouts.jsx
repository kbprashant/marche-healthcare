import {useEffect, useState} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
// import uparraw from "../assets/up-arrow-svgrepo-com (1).svg"
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
export const Layouts = ({ children, title }) => {
    const [upArrow,setUpArrow]=useState(false);
    useEffect(() => {
        document.title = title;
        document.addEventListener('scroll', (e) => {if(window.scrollY === 0){
            setUpArrow(false);
        }else{
            setUpArrow(true);
        
        }});
    }, []);
    
    return (
        <>
            <Header />

            <div className='spacedivider'>{children}</div>
            
            <div onClick={scrollToTop} className={upArrow?"backtotop showuparrow":"backtotop"}><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-3.2 -3.2 38.40 38.40" enable-background="new 0 0 32 32" xml:space="preserve" width="53px" height="55px" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(4.48,4.48), scale(0.72)"><rect x="-3.2" y="-3.2" width="38.40" height="38.40" rx="19.2" fill="#560cf5" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="3.904"></g><g id="SVGRepo_iconCarrier"> <line fill="none" stroke="#ffffff" stroke-width="1.056" stroke-miterlimit="10" x1="16" y1="11" x2="16" y2="23"></line> <polyline fill="none" stroke="#ffffff" stroke-width="1.056" stroke-miterlimit="10" points="10.3,16 16,10.3 21.7,16 "></polyline> <circle fill="none" stroke="#ffffff" stroke-width="1.056" stroke-miterlimit="10" cx="16" cy="16" r="12"></circle> </g></svg></div>
            <Footer />
        </>
    )
}
