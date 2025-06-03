import { HashLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <HashLoader color="#0090f9" size={50} speedMultiplier={1.2} />
      <p className="mt-8 text-lg font-medium text-cyan-400">Loading...</p>
    </div>
  );
};

export default LoadingPage;
