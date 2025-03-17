import './JsonFormatter.css';
import { useState } from 'react';
import { Space, Form, Button, message, Row, Col } from "antd";
import copy from "clipboard-copy";
import TextArea from 'antd/es/input/TextArea';
import { CopyOutlined } from "@ant-design/icons";

function JsonFormatter() {
  const [text, setText] = useState("");
  const [formattedJson, setFormattedJson] = useState("");

  const handleCopyClick = () => {
    if (formattedJson) {
      copy(formattedJson);
      message.success("JSON copiado para a área de transferência");
    } else {
      message.error("Nenhum JSON para copiar");
    }
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(text);
      setFormattedJson(JSON.stringify(parsed, null, 4));
    } catch (error) {
      message.error("JSON inválido");
    }
  };

  return (
    <div className='content-body'>
      <h1>Formatador de JSON</h1>
      <Form layout="vertical">
        <Form.Item label="Cole seu JSON aqui:">
          <TextArea 
            className="form-items"
            placeholder="Cole o JSON aqui..."
            rows={5}
            value={text}
            onChange={(event) => setText(event.target.value)}
            style={{ borderRadius: '5px' }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={formatJson}>Formatar JSON</Button>
        </Form.Item>
      </Form>

      <h3 className="margin-h3">JSON Formatado</h3>
      <Form layout="vertical">
        <Form.Item>
          <Space direction="vertical" className='form-items'>
            <Space.Compact className='form-items'>
              <TextArea 
                rows={5}
                value={formattedJson}
                readOnly
                style={{ borderRadius: '5px' }}
              />
              <Button type="primary" title="Copiar JSON" onClick={handleCopyClick}>
                <CopyOutlined/>
              </Button>
            </Space.Compact>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default JsonFormatter;