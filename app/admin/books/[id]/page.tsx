interface BookDetailsPageProps {
  params: {
    id: string;
  };
}

const BooksDetailsPage = async ({ params }: BookDetailsPageProps) => {
  const { id } = await params;
  
  return <div>BooksDetailsPage: {id}</div>;
};

export default BooksDetailsPage;
