import { useState } from 'react';
import './GenerateCpf.css';
import { Space, Form, Button, message, Input } from "antd";
import copy from "clipboard-copy";
import {
  CopyOutlined
} from "@ant-design/icons";

function GenerateCpf() {
  const [CPF, setCPF] = useState("");

  const generateValidCPF = () => {
    const cpfNumbers = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  
    let sum = 0;
    for (let i = 10; i > 1; i--) {
      sum += cpfNumbers[10 - i] * i;
    }
    let firstDigit = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
    cpfNumbers.push(firstDigit);

    sum = 0;
    for (let i = 11; i > 1; i--) {
      sum += cpfNumbers[11 - i] * i;
    }
    let secondDigit = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
    cpfNumbers.push(secondDigit);
  
    // Formata o CPF em uma string com pontos e traço
    const cpf = cpfNumbers.join('').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  
    return cpf;
  }

  const handleCopyClick = () => {
    if (CPF) {
      copy(CPF);
      message.success("Texto copiado para a área de transferência");
    } else {
      message.error("Nenhum texto para copiar");
    }
  };

  const onProcess = () => {
    const cpf = generateValidCPF();
    setCPF(cpf);
  }

  return (
    <div className='content-body'>
      <h1>Gerador de CPF</h1>
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        onFinish={onProcess}
      ><br/>
        <Button type="primary botao" htmlType="submit">
          Gerar CPF
        </Button>
      </Form>
        <br/>

      <h3 className="margin-h3">CPF Gerado</h3>

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
                value={CPF}
              >
              </Input>
              <Button type="primary" title="Clique aqui para copiar o CPF" onClick={() => {handleCopyClick()}}><CopyOutlined/></Button>
            </Space.Compact>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default GenerateCpf;