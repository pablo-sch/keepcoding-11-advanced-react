function Footer() {
  return (
    <footer
      className="text-gray-300 border-t border-gray-700 py-10 text-center text-sm font-sans relative overflow-hidden"
      style={{
        backgroundColor: "#0a1a2b",
        backgroundImage: "linear-gradient(to top, rgba(11, 14, 17, 0.8), transparent 70%)",
      }}
    >
      <p className="text-gray-400 text-sm">
        © 2025 —{" "}
        <a href="https://github.com/pablo-sch" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors duration-300 underline underline-offset-2">
          GitHub Profile <span className="font-semibold">@pablo-sch</span>
        </a>
      </p>
    </footer>
  );
}

export default Footer;
