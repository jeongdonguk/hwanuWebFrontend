// // Editor.tsx
// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import Image from '@tiptap/extension-image'
// import { postUploadUrl } from './../../api/postApi'

// export default function TiptapEditor()  {
//   const editor = useEditor({
//     extensions: [StarterKit, Image],
//     content: '',
//   })

//   const addImage = async () => {
//     const url = await postUploadUrl()  // MinIO presigned URL 활용
//     if (url && editor) {
//       editor.chain().focus().setImage({ src: url }).run()
//     }
//   }

//   return (
//     <div>
//       <input type="text" placeholder="제목을 입력하세요" className="border w-full p-2 mb-4" />
//       <button onClick={addImage}>이미지 삽입</button>
//       <EditorContent editor={editor} className="border p-2 mt-2 min-h-[300px]" />
//     </div>
//   )
// }





// // // pages/PostEditor.tsx
// // import React, { useState } from 'react';
// // import TiptapEditor from './TiptapEditor';

// // export default function PostEditor() {
// //   const [title, setTitle] = useState('');
// //   const [content, setContent] = useState('<p><br /></p>');

// //   const handleSubmit = () => {
// //     console.log({ title, content });
// //     // TODO: 백엔드 저장 API 연동
// //   };

// //   return (
// //     <div className="max-w-3xl mx-auto p-4">
// //       <input
// //         type="text"
// //         placeholder="제목을 입력하세요"
// //         value={title}
// //         onChange={(e) => setTitle(e.target.value)}
// //         className="w-full border p-2 mb-4 text-lg font-semibold"
// //       />
// //       <TiptapEditor content={content} setContent={setContent} />
// //       <button
// //         onClick={handleSubmit}
// //         className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
// //       >
// //         작성 완료
// //       </button>
// //     </div>
// //   );
// // }
