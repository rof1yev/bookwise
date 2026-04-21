"use client";

const EmptyState = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <main className="root-container min-h-screen flex flex-col items-center justify-center">
      <h1 className="font-bebas-neue text-5xl font-bold text-light-100">
        {title}
      </h1>
      <p className="mt-3 max-w-xl text-center text-light-400">{description}</p>
    </main>
  );
};

export default EmptyState;
