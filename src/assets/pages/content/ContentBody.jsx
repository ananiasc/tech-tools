import { Routes,Route } from "react-router-dom";
import ConvertText from "../convertText/ConvertText";
import GenerateKey from "../generateKey/GenerateKey";
import GenerateCpf from "../generateCpf/GenerateCpf";

function ContentBody() {
  return ( 
    <> 
      <Routes>
        <Route path='/' element={<div className='content-body'><h1>Bem-vindo</h1></div>}></Route>
        <Route path='/convert-text' element={<ConvertText />}></Route>
        <Route path='/generate-key' element={<GenerateKey />}></Route>
        <Route path='/generate-cpf' element={<GenerateCpf />}></Route>
      </Routes>
    </>
  );
}

export default ContentBody