import { Container } from 'postcss'
import React from 'react'

import { useState, useCallback, useEffect, useRef} from 'react'

function App() {

  const [length, setlength] =useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(true)
  const [password, setPassword] = useState('')


  const passwordRef = useRef(null)



  const generatepassword = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if(charAllowed) str +="!@#$%^&*()_+"

    for(let i=1; i< length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length, numberAllowed, charAllowed ])


  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current.select()
  }
  useEffect(()=>{
      generatepassword()
  },[length, numberAllowed, charAllowed ])

  return (
    <div className='w-full max-w-md mx-auto shadow-md
    rounded-lg px-4 py-3 my-8 bg-yellow-500 text-black-500'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
        tyre="text"
        value={password}
        className='outline-none w-full py-1, px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >Copy
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex item-center gap-x-1'>
          <input 
           type='range'
           min ={6}
           max={50}
           value={length}
           className='cursor-pointer'
           onChange={(e)=> setlength(e.target.value)}
           name=''
           id=''
           /> 
           <label htmlFor='length'>Length:{length} </label>      
          </div>
          <div className='flex item-cemter gap-x-1'>
            <input 
            type='checkbox'
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
            name=''
            id=''
            />
            <label htmlFor='number'>Numbers</label>
           </div>

           <div className='flex item-cemter gap-x-1'>
            <input 
            type='checkbox'
            defaultChecked={charAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
            name=''
            id=''
            />
            <label htmlFor='charInput'>Character</label>
           </div>
      </div>

    </div>
  )
}

export default App
