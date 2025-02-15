import Header from "./Header";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex flex-col justify-start items-center bg-white overflow-x-clip">
      <Header />

      {children}

      <div className="bg-pink-700 w-full h-10 flex items-center justify-center">
        <p className="text-white text-sm">
          نوشته شده توسط{" "}
          <a
            href="https://www.linkedin.com/in/ehsan-markazi-94325a219"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:underline"
          >
            احسان
          </a>
        </p>
      </div>
    </div>
  );
}
