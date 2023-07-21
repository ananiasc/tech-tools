import './ConvertText.css'
import { useState } from 'react';
import { Space, Form, Button, message, Row, Col } from "antd";
import copy from "clipboard-copy";
import TextArea from 'antd/es/input/TextArea';
import {
  CopyOutlined
} from "@ant-design/icons";

function ConvertText() {
  const [text, setText] = useState("");
  const [changedText, setChangedText] = useState("");

  const handleCopyClick = () => {
    if (changedText) {
      copy(changedText);
      message.success("Texto copiado para a área de transferência");
    } else {
      message.error("Nenhum texto para copiar");
    }
  };

  const convertToUpperCase = () => {
    setChangedText(text.toUpperCase());
  }
  
  const convertToLowerCase = () => {
    setChangedText(text.toLowerCase());
  }

  const convertToAlternateSize = () => {
    let textAlternateSize = [...text].map((letter, index) => index % 2 === 0 ? letter.toUpperCase() : letter.toLowerCase()).join('');
    setChangedText(textAlternateSize);
  }

  const convertToFirstLetterWordUpper = () => {
    const preposicoes = ['de', 'da', 'do', 'e'];
    let textFirstLetterWordUpper = text.toLowerCase().replace(/\b\w+/g, function(word) {
      return preposicoes.includes(word) ? word : word.charAt(0).toUpperCase() + word.slice(1);
    });
    setChangedText(textFirstLetterWordUpper);
  }

  return (
    <div className='content-body'>
      <h1>Conversor de Texto</h1>
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
      >
        <Form.Item label="Digite o texto que deseja alterar:">
          <TextArea 
            className="form-items"
            placeholder="Seu texto"
            rows={3}
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
            style={{
              borderRadius: '5px 0px 5px 5px'
            }}>
          </TextArea>
        </Form.Item>
        <Form.Item className="form-items">
          <Row className="form-items"
          gutter={{
            xs: 4,
            sm: 8,
            md: 12,
            lg: 12,
          }}>
            <Col className="col">
              <Button type="primary botao" onClick={() => {convertToUpperCase()}}>Maiúscula</Button>
            </Col>
            <Col className="col">
            <Button type="primary botao" onClick={() => {convertToLowerCase()}}>Minúscula</Button>
            </Col>
            <Col className="col">
              <Button type="primary botao" onClick={() => {convertToAlternateSize()}}>Alternado</Button>
            </Col>
            <Col className="col">
              <Button type="primary botao" onClick={() => {convertToFirstLetterWordUpper()}}>Primeira Letra da Palavra</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>

      <h3 className="margin-h3">Texto Convertido</h3>
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        layout="vertical"
      >
        <Form.Item>
          <Space direction="vertical" className='form-items'>
            <Space.Compact className='form-items'>
              <TextArea 
                rows={3}
                value={changedText}
                style={{
                  borderRadius: '5px 0px 5px 5px'
                }}>
              </TextArea>
              <Button type="primary" title="Clique aqui para copiar o texto" onClick={() => {handleCopyClick()}}><CopyOutlined/></Button>
            </Space.Compact>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ConvertText;