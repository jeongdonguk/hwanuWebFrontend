// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Image from '@tiptap/extension-image';
// import Youtube from '@tiptap/extension-youtube';
// import React from 'react';

// export default function TiptapEditor({ content, setContent }) {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Image,
//       Youtube.configure({
//         width: 640,
//         height: 360,
//         HTMLAttributes: {
//           class: 'mx-auto my-4',
//         },
//       }),
//     ],
//     content,
//     onUpdate: ({ editor }) => {
//       setContent(editor.getHTML());
//     },
//   });

//   const insertImage = () => {
//     const input = document.createElement('input');
//     input.type = 'file';
//     input.accept = 'image/*';
//     input.onchange = async () => {
//       const file = input.files[0];
//       const formData = new FormData();
//       formData.append('image', file);

//       const res = await fetch('/api/upload-image', {
//         method: 'POST',
//         body: formData,
//       });
//       const { url } = await res.json();

//       editor?.chain().focus().setImage({ src: url }).run();
//     };
//     input.click();
//   };

//   const insertYoutube = () => {
//     const url = prompt('YouTube 영상 URL을 입력하세요');
//     if (url) {
//       editor?.chain().focus().setYoutubeVideo({ src: url }).run();
//     }
//   };

//   return (
//     <div>
//       <div className="flex gap-2 mb-2">
//         <button onClick={insertImage} className="bg-gray-200 px-2 py-1 rounded">
//           이미지 삽입
//         </button>
//         <button onClick={insertYoutube} className="bg-gray-200 px-2 py-1 rounded">
//           유튜브 삽입
//         </button>
//       </div>
//       <div className="border p-2 rounded min-h-[300px]">
//         <EditorContent editor={editor} />
//       </div>
//     </div>
//   );
// }
