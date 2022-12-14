import { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './SubNav-Style.css';



export default function SubNav(props) {

    const navTo                           = props.to;
    

    const [subMenu, setSubMenu]           = useState('');

    useEffect(() => {
        setSubMenu(navTo);
    }, [navTo]);

    
    

    function handleSubMenu(subMenu){   
        setSubMenu(subMenu)
        props.subMenu(subMenu);
    }

    return(
        

          
              <ul className='  w-full bg-gray-800  h-12 SubNav pl-4 ml-1 border flex  items-center mx-auto justify-between sm:justify-start '>
                <li className={`${subMenu === "departamentos" ? "Selected" : null} `}>
                      <button className=' px-2'  onClick={()=>{handleSubMenu("departamentos")}} >
                        <h5 className='text-gray-300 '>{props.submenu01}</h5>
                      </button>
                </li>
                <li className={`${subMenu === "Sessoes" ? "Selected" : null} sm:mx-4`}>
                      <button className=' px-2 text-gray-300' onClick={()=>{handleSubMenu("Sessoes")}}>{props.submenu02}
                    </button></li>
                <li className={`${subMenu === "Ranges" ? "Selected" : null} sm:mx-4`}>
                      <button className=' px-2 text-gray-300 hidden sm:flex ' onClick={()=>{handleSubMenu("Ranges")}}>{props.submenu03}
                      </button>
                </li>
                <li className={`${subMenu === "Areas" ? "Selected" : null} sm:mx-4`}>
                      <button className=' px-2 text-gray-300 hidden sm:flex ' onClick={()=>{handleSubMenu("Areas")}}>{props.submenu04}
                      </button>
                </li>
                <li className="flex sm:hidden text-2xl text-gray-300 mr-6">
                    <FaBars/>
                </li>
                  
              </ul>
              
              
         
    ) 
}