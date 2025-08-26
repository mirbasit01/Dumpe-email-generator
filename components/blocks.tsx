export type Block = {
  id: string;
  type: "text" | "image" | "button" | "divider";
  content?: string;
};

export const BlockRenderer = ({ block }: { block: Block }) => {
  switch (block.type) {
    case "text":
      return <div className="p-4 text-gray-800" dangerouslySetInnerHTML={{ __html: block.content || "Sample text" }} />;
    case "image":
      return <img src={block.content || "https://via.placeholder.com/600x200"} alt="email-img" className="w-full" />;
    case "button":
      return (
        <a
          href="#"
          className="bg-blue-600 text-white px-6 py-3 rounded-md inline-block text-center"
        >
          {block.content || "Click Me"}
        </a>
      );
    case "divider":
      return <hr className="my-4 border-gray-300" />;
    default:
      return null;
  }
};
