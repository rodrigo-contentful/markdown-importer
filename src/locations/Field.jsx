import React, { useState } from 'react';
import { Form,Button } from '@contentful/f36-components';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import 'codemirror/lib/codemirror.css';
import {  MarkdownEditor } from '@contentful/field-editor-markdown';

const Field = () => {
  const sdk = useSDK();
  sdk.window.startAutoResizer();
  const [file, setFile] = useState()

  // handle the upload of a file into a state.
  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  // handle the submit of the form, reads the file and add the content
  // into the markdown field.
  function handleSubmit(event) {
    event.preventDefault()
    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = e => {
      sdk.field.setValue(e.target.result);
    };
   
  }

  return (<>
    <Form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange}/>
      <br/>
      <br/>
      <Button variant="primary" type="submit">Upload</Button>
    </Form>
    <MarkdownEditor isInitiallyDisabled={false} sdk={sdk}/>
    </> 
  );
  
};

export default Field;
