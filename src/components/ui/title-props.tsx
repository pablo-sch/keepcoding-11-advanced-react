interface TitleProps {
  children: React.ReactNode;
}

function Title({ children }: TitleProps) {
  return <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-600 drop-shadow-md pb-4">{children}</h2>;
}

export default Title;
