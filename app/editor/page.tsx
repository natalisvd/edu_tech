'use client'; 


import React, { useState, useRef, useMemo, LegacyRef } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });


interface JoditConfig {
  uploader: {
    insertImageAsBase64URI: boolean;
    imagesExtensions: string[];
  };
}

export default function Home() {

  
  const editor = useRef<HTMLInputElement | null>(null)

  const [content, setContent] = useState<string>('Hello world'); 


  const config = useMemo<JoditConfig>(
    () => ({
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp'], 
      },
    }),
    []
  );

  const handleChange = (value: string) => {
    setContent(value);
  };


  return (
    <>
      <Head>
        <title>Text Editor on the Web </title>
        <meta name="author" content="Soubhagyajit Borah" />
      </Head>
      <main>
        <div className="h-screen w-screen flex items-center flex-col">
          <div className="m-10 flex flex-col items-center">
            <span className="text-2xl text-center">Text Editor</span>
   
          </div>
          <div className="h-full w-[90vw]">
            <JoditEditor
              //@ts-ignore
              ref={editor} 
              value={content}
               //@ts-ignore
              config={config || undefined} 
              onChange={handleChange}
              className="w-full h-[70%] mt-10 bg-white"
            />
            <style>{`.jodit-wysiwyg{height:300px !important}`}</style>
          </div>

          <div className="my-10 h-full w-[90vw]">
            Preview:
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        </div>
      </main>
    </>
  );
}
