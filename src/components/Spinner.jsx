const Spinner = () => (
  <div className="flex justify-center items-center py-10">
    <span className="mr-4 text-gray-600">Merci de patienter svp...</span>
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
  </div>
);

export default Spinner;
