import Page from "../../components/layout/page";

export default function InternalServerError() {
  return (
    <Page title="Internal Server Error">
      <div className="flex flex-col justify-center items-center min-h-[70vh] p-8 text-center text-gray-800 gap-6">
        <div className="relative w-[240px] h-[240px]">
          <h1
            className="absolute inset-0 flex items-center justify-center text-[6rem] font-extrabold text-pink-600 leading-none"
            aria-label="500 - Internal Server Error"
          >
            500
          </h1>
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 tracking-wide">Internal Server Error</h2>

        <p className="text-base text-gray-600 max-w-md">Something went wrong while connecting to the database.</p>
      </div>
    </Page>
  );
}
