import React from "react";
import Image from "next/image";

const LessonPage = ({ params: { id } }: { params: { id: string } }) => {
  console.log(id);
  const questions = [
    "What is a React component?",
    "What is the virtual DOM in React?",
    "How do you manage state in a React application?",
    "What are props in React?",
    "What is a hook in React?",
    "What is JSX in React?",
    "How do you use the useEffect hook?",
    "What is the difference between state and props?",
    "How do you create a context in React?",
    "What is the useState hook?",
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Lesson {id}</h1>
      <div className="mb-8">
        <Image
          src="/images/image1.jpg"
          alt="Lesson Image"
          width={300}
          height={300}
          className="rounded-md"
        />
      </div>
      <ul className="list-disc space-y-2">
        {questions.map((question, index) => (
          <li key={index} className="text-lg">
            {question}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonPage;
