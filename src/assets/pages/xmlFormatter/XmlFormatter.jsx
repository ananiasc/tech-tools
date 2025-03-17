import './XmlFormatter.css';
import { useState } from 'react';
import { Space, Form, Button, message, Row, Col } from "antd";
import copy from "clipboard-copy";
import TextArea from 'antd/es/input/TextArea';
import { CopyOutlined } from "@ant-design/icons";

function XmlFormatter() {
  const [text, setText] = useState("");
  const [formattedXml, setFormattedXml] = useState("");

  const handleCopyClick = () => {
    if (formattedXml) {
      copy(formattedXml);
      message.success("XML copiado para a área de transferência");
    } else {
      message.error("Nenhum XML para copiar");
    }
  };

  const formatXml = () => {
    try {
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'application/xml');

      if (xml.getElementsByTagName('parsererror').length) {
        throw new Error('XML inválido');
      }

      const serializer = new XMLSerializer();
      const formattedXml = formatPrettyXml(serializer.serializeToString(xml));
      setFormattedXml(formattedXml);
    } catch (error) {
      message.error("XML inválido");
    }
  };

  const formatPrettyXml = (xml) => {
    const PADDING = '  ';
    let formatted = '';
    let pad = 0;
    xml.split(/>\s*</).forEach((node) => {
      if (node.match(/^\/\w/)) pad -= 2;
      formatted += PADDING.repeat(pad) + '<' + node + '>\n';
      if (node.match(/^<?\w[^>]*[^\/]$/)) pad += 2;
    });
    return formatted.trim().slice(1, -1);
  };

  return (
    <div className='content-body'>
      <h1>Formatador de XML</h1>
      <Form layout="vertical">
        <Form.Item label="Cole seu XML aqui:">
          <TextArea 
            className="form-items"
            placeholder="Cole o XML aqui..."
            rows={5}
            value={text}
            onChange={(event) => setText(event.target.value)}
            style={{ borderRadius: '5px' }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={formatXml}>Formatar XML</Button>
        </Form.Item>
      </Form>

      <h3 className="margin-h3">XML Formatado</h3>
      <Form layout="vertical">
        <Form.Item>
          <Space direction="vertical" className='form-items'>
            <Space.Compact className='form-items'>
              <TextArea 
                rows={5}
                value={formattedXml}
                readOnly
                style={{ borderRadius: '5px' }}
              />
              <Button type="primary" title="Copiar XML" onClick={handleCopyClick}>
                <CopyOutlined/>
              </Button>
            </Space.Compact>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default XmlFormatter;