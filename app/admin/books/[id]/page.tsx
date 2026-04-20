const BooksDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  return <div>BooksDetailsPage: {id}</div>;
};

export default BooksDetailsPage;
