import { Routes,Route } from "react-router-dom";
import ConvertText from "../convertText/ConvertText";
import GenerateKey from "../generateKey/GenerateKey";
import GenerateCpf from "../generateCpf/GenerateCpf";
import GenerateCnpj from "../generateCnpj/GenerateCnpj";
import JsonFormatter from "../jsonFormatter/JsonFormatter";
import XmlFormatter from "../xmlFormatter/XmlFormatter";

function ContentBody() {
  return ( 
    <> 
      <Routes>
        <Route path='/' element={<div className='content-body'><h1>Bem-vindo</h1></div>}></Route>
        <Route path='/convert-text' element={<ConvertText />}></Route>
        <Route path='/generate-key' element={<GenerateKey />}></Route>
        <Route path='/generate-cpf' element={<GenerateCpf />}></Route>
        <Route path='/generate-cnpj' element={<GenerateCnpj />}></Route>
        <Route path='/json-formatter' element={<JsonFormatter />}></Route>
        <Route path='/xml-formatter' element={<XmlFormatter />}></Route>
      </Routes>
    </>
  );
}

export default ContentBody