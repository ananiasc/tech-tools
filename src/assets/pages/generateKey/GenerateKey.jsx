import { useState } from 'react';
import './GenerateKey.css';
import { Space, Form, Input, Button, Switch, message } from "antd";
import copy from "clipboard-copy";
import TextArea from 'antd/es/input/TextArea';
import {
  CopyOutlined
} from "@ant-design/icons";

function GenerateKey() {
  const [containUpperCase, setContainUpperCase ] = useState(true);
  const [containLowerCase, setContainLowerCase ] = useState(true);
  const [containNumbers, setContainNumbers ] = useState(true);
  const [containCharacSpecial, setContainCharacSpecial ] = useState(false);
  const [size, setSize] = useState(10);
  const [key, setKey] = useState("");

  const mountCharacterComposition = () => {
    let caracteres = "";

    if(containUpperCase)
      caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(containLowerCase)
      caracteres += "abcdefghijklmnopqrstuvwxyz";
    if(containNumbers)
      caracteres += "0123456789";
    if(containCharacSpecial)
      caracteres += "!@#$%&*()-+.,;?{[}]^><:";

    return caracteres;
  }

  const generateRandomIndex = (caracteres) => {
    return Math.floor(Math.random() * caracteres.length);
  }

  const generateRandomCharacter = (caracteres) => {
    return caracteres.charAt(generateRandomIndex(caracteres));
  }

  const generateKey = () => {
    let caracteres = mountCharacterComposition();
    let chave = "";
    for (let i = 0; i < size; i++) {
      chave += generateRandomCharacter(caracteres);
    }
    return chave;
  };

  const handleCopyClick = () => {
    if (key) {
      copy(key);
      message.success("Texto copiado para a área de transferência");
    } else {
      message.error("Nenhum texto para copiar");
    }
  };

  const onProcess = () => {
    if(!containUpperCase && !containLowerCase && !containNumbers) {
      message.error("Necessário selecionar uma opção de composição da senha!");
      return;
    }
    const newKey = generateKey();
    setKey(newKey);
  }

  return (
    <div className='content-body'>
      <h1>Gerador de Senha</h1>
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        onFinish={onProcess}
      >
        <Form.Item label="Digite o nome dos ambientes:">
          <Input
            type="number"
            placeholder="10"
            value={size}
            className='form-items'
            min={1}
            max={128}
            required
            onChange={(event) => {
              setSize(event.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Composição da senha:" style={{ width: '43vw' }}>
          <Switch
            checked={containUpperCase}
            checkedChildren="Com maísculas"
            unCheckedChildren="Sem maísculas"
            onChange={() => {
              setContainUpperCase(!containUpperCase);
            }}
          />
          <Switch
            checked={containLowerCase}
            checkedChildren="Com minúsculas"
            unCheckedChildren="Sem minúsculas"
            onChange={() => {
              setContainLowerCase(!containLowerCase);
            }}
          />
          <Switch
            checked={containNumbers}
            checkedChildren="Com números"
            unCheckedChildren="Sem números"
            onChange={() => {
              setContainNumbers(!containNumbers);
            }}
          />
          <Switch
            checked={containCharacSpecial}
            checkedChildren="Com caracteres especiais"
            unCheckedChildren="Sem caracteres especiais"
            onChange={() => {
              setContainCharacSpecial(!containCharacSpecial);
            }}
            style={{minWidth: '180px'}}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Processar
        </Button>
      </Form><br/><br/>

      <h3>Senha Gerada</h3>

      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        layout="vertical"
      >
        <Form.Item label="Clique no campo para copiá-lo:">
          <Space direction="vertical" className='form-items'>
            <Space.Compact className='form-items'>
              <TextArea 
                rows={3}
                value={key}
                style={{
                  borderRadius: '5px 0px 5px 5px'
                }}>
              </TextArea>
              <Button type="primary" onClick={() => {handleCopyClick()}}><CopyOutlined/></Button>
            </Space.Compact>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default GenerateKey;