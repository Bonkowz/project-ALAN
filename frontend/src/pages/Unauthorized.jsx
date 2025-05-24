const Unauthorized = () => {
  return (
    <div className="bg-[#FEFAE0] min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="font-serif text-6xl text-[#606C38] mb-4">401</h1>
      <p className="font-serif text-2xl text-[#BC6C25]">Unauthorized Access</p>
      <p className="font-sans text-md text-[#283618] mt-2 max-w-md">
        You don’t have permission to view this page.
      </p>
    </div>
  );
};

export default Unauthorized;