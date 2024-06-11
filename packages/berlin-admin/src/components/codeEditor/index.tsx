import { CKEditor } from '@ckeditor/ckeditor5-react';
import { FormHelperText } from '@mui/material';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { useState } from 'react';

function CodeEditor({
  value,
  name,
  formik,
  error = false,
  touched = false,
  lang = 'en',
}) {
  const editorConfiguration: any = {
    language: lang, // Arabic language for RTL direction
    contentsLangDirection: lang === 'en' ? 'ltr' : 'rtl', // Set the content direction to RTL
    toolbar: {
      items: [
        'bold',
        'italic',
        'sourceEditing',
        'heading',
        'mediaEmbed',
        'insertTable',
        'link',
        'bulletedList',
        'numberedList',
        'outdent',
        'indent',
        'imageUpload',
        'blockQuote',
        'undo',
        'redo',
      ],
    },
    htmlSupport: {
      allow: [
        {
          name: /.*/,
          attributes: true,
          classes: true,
          styles: true,
        },
      ],
    },
  };
  const [isFocus, setIsFocus] = useState(false);
  return (
    <>
      <CKEditor
        editor={Editor}
        data={value}
        config={editorConfiguration}
        onBlur={() => formik.setFieldTouched(name, true)}
        onFocus={() => setIsFocus(true)}
        onChange={(event, editor) => {
          if (isFocus === true) {
            const data = editor.getData();
            formik.setFieldValue(name, data);
          }
        }}
      />
      {touched && error && (
        <FormHelperText
          sx={{ marginLeft: 1.75 }}
          error
          id="helper-text-country"
        >
          {error}
        </FormHelperText>
      )}
    </>
  );
}

export default CodeEditor;
