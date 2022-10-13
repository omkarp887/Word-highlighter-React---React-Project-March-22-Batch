import React, { useRef, useState } from 'react'
import '../styles/App.css';
import { IgnoreCaseToggle } from './IgnoreCaseToggle';
import { ParagraphInput } from './ParagraphInput';
import { WordInput } from './WordInput';

const App = () => {
  const [paragraphContent, setParagraphContent] = useState("");
  const [search, setSearch] = useState(0)
  const ref = useRef()
  const[ignoreCase, setIgnoreCase] = useState(false);
  const highlight = (val, wordCase) =>{
    let newt = ''
    let i =0
    if(wordCase){
      const reg = new RegExp(val, 'ig')
      newt = ref.current.innerText,replaceAll(reg, (args)=>{
        i++;
        return `<span class="highlighted-txt">${args}</span>`
      })
    }else{
      newt = ref.current.innerText.replaceAll(val, (args)=>{
        i++;
        return `<span class="highlighted-txt">${args}</span>`
      })
    }
    setSearch(i)
    ref.current.innerHTML = newt
  }

  const handleWordInput = (val) => {
    highlight(val,ignoreCase)
    setParagraphContent(val)
  }

  const handleChangeToggle = () =>{
    highlight(word,!ignoreCase)
    setIgnoreCase(!ignoreCase)

  }

  return (
    <div id="main">
      <ParagraphInput pRef={ref}/>
      <div>
        Total matches: <span id="search-counter">{search}</span>
      </div>
      <WordInput handleChange={handleWordInput} value={paragraphContent} />
      <br />
      <IgnoreCaseToggle checked={ignoreCase} onChange={handleChangeToggle} />
      <span id="search-counter">{search}</span>
    </div>
  )
}


export default App;