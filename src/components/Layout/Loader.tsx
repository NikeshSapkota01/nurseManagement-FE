import { FidgetSpinner } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        ballColors={["#ff0000", "#00ff00", "#0000ff"]}
        backgroundColor="#F4442E"
      />
      <p className="text-xl font-semibold">Loading...</p>
    </div>
  );
};

export default Loader;
