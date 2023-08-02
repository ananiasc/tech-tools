import { useState } from 'react';
import './GenerateCnpj.css';
import { Space, Form, Button, message, Input } from "antd";
import copy from "clipboard-copy";
import {
  CopyOutlined
} from "@ant-design/icons";

function GenerateCnpj() {
  const [CNPJ, setCNPJ] = useState("");

  const generateValidCNPJ = () => {
  const cnpjBase = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10));
  let sum = 0;
  let multiplier = 5;
  for (let i = 0; i < 12; i++) {
    sum += cnpjBase[i] * multiplier;
    multiplier = (multiplier === 2) ? 9 : multiplier - 1;
  }
  let firstDigit = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
  cnpjBase.push(firstDigit);

  sum = 0;
  multiplier = 6;
  for (let i = 0; i < 13; i++) {
    sum += cnpjBase[i] * multiplier;
    multiplier = (multiplier === 2) ? 9 : multiplier - 1;
  }
  let secondDigit = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
  cnpjBase.push(secondDigit);

  // Formata o CNPJ em uma string com pontos, barras e traço
  const cnpj = cnpjBase.join('').replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');

  return cnpj;
  }

  const handleCopyClick = () => {
    if (CNPJ) {
      copy(CNPJ);
      message.success("Texto copiado para a área de transferência");
    } else {
      message.error("Nenhum texto para copiar");
    }
  };

  const onProcess = () => {
    const cpf = generateValidCNPJ();
    setCNPJ(cpf);
  }

  return (
    <div className='content-body'>
      <h1>Gerador de CNPJ</h1>
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        onFinish={onProcess}
      ><br/>
        <Button type="primary botao" htmlType="submit">
          Gerar CNPJ
        </Button>
      </Form>
        <br/>

      <h3 className="margin-h3">CNPJ Gerado</h3>

      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        layout="vertical"
      >
        <Form.Item>
          <Space direction="vertical" className='form-items'>
            <Space.Compact className='form-items'>
              <Input 
                type='text'
                value={CNPJ}
              >
              </Input>
              <Button type="primary" title="Clique aqui para copiar o CNPJ" onClick={() => {handleCopyClick()}}><CopyOutlined/></Button>
            </Space.Compact>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default GenerateCnpj;