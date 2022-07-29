import React, { useState } from 'react';
import { Form,Button, FormControl,TextInput } from '@contentful/f36-components';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import 'codemirror/lib/codemirror.css';
import {  MarkdownEditor } from '@contentful/field-editor-markdown';

const Field = () => {
  const sdk = useSDK();
  sdk.window.startAutoResizer();
  const [file, setFile] = useState()
  const [filename, setFilename] = useState('')

  // handle the upload of a file into a state.
  function handleChange(event) {
    let fname = event.target.files[0];
    
    var re = /(\.mdown|\.mkdn|\.md|\.mkd|\.mdwn|\.mdtxt|\.mdtext|\.text)$/i;
    if (!re.exec(fname.name)) {
      setFilename('')
    } else {
      setFile(fname)
      setFilename(fname.name)
    }
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
    <FormControl isInvalid={!filename}>
      <FormControl.Label>Upload markdown file</FormControl.Label>
      <TextInput
         defaultValue=""
        type="file"
        name="file"
        placeholder="test-markdown.md"
        onChange={handleChange}
      />
      <FormControl.HelpText>Select a markdown file to import below</FormControl.HelpText>
      {!filename && (
        <FormControl.ValidationMessage>
          Files supported: .markdown, .mdown, .mkdn, .md, .mkd, .mdwn, .mdtxt, .mdtext and .text
        </FormControl.ValidationMessage>
      )}
      </FormControl>
      <Button variant="primary" type="submit">Upload</Button>
    </Form>
    <MarkdownEditor isInitiallyDisabled={false} sdk={sdk}/>
    </> 
  );
  
};

export default Field;
