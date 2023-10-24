import ReactPaginate from "react-paginate";

const Pagination = ({
  pageCount,
  onPageChange,
  initialPage,
}: {
  pageCount: number;
  onPageChange: (data: { selected: number }) => any;
  initialPage: number;
}) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={onPageChange}
      containerClassName="pagination flex justify-center"
      pageClassName="px-2 py-1 mx-1 border rounded-lg hover:bg-gray-100 hover:border-blue-500"
      previousLabel="Previous"
      nextLabel="Next"
      previousClassName="px-2 py-1 mx-1 rounded-lg border bg-blue-500 text-white hover:bg-blue-600"
      nextClassName="px-2 py-1 mx-1 rounded-lg border bg-blue-500 text-white hover:bg-blue-600"
      breakLabel="..."
      breakClassName="mx-1"
      activeClassName="bg-blue-500 text-white"
      initialPage={initialPage}
    />
  );
};

export default Pagination;
