"use client";

const GreetingTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-dark-400">{title}</h3>
      <p className="font-normal text-[#64748B]">{description}</p>
    </div>
  );
};

export default GreetingTitle;
