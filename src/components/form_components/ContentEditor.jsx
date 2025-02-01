import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useId } from "react";
import { Controller } from "react-hook-form";

function ContentEditor({ name, control, label, defaultValue = "" }) {
  const id = useId();

  const editorSettings = {
    selector: "textarea",
    skin: "oxide-dark",
    content_css: "dark",
    initialValue: defaultValue,
    height: 500,
    menubar: true,
    plugins: [
      "image",
      "advlist",
      "autolink",
      "lists",
      "link",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "code",
      "help",
      "wordcount",
    ],
    toolbar:
      "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
    content_style:
      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
  };

  return (
    <Controller
      name={name || "content"}
      control={control}
      rules={{
        required: "Content is required", // Add validation rules
        minLength: {
          value: 10,
          message: "Content must be at least 10 characters",
        },
      }}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <>
          {label && <label htmlFor={id}>{label}</label>}
          <Editor
            initialValue={defaultValue}
            apiKey="1ssrgeqr3hhkpl6mprcu0ui57v6j7worrtz7kfhn45ek3sgq"
            init={editorSettings}
            onEditorChange={onChange}
            id={id}
          />
          {/* Displaying error message */}
          {error && <p className="input-error">{error.message}</p>}
        </>
      )}
    />
  );
}

export default ContentEditor;
