import Link from "next/link";
import { hexToRgba } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowLeftIcon, CalendarDaysIcon, Edit3Icon } from "lucide-react";
import BookCover from "@/components/book-cover";
import { Button } from "@/components/ui/button";
import BookVideo from "@/components/book-video";
import { getBookDetailsById } from "@/services/books";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const bookDetails = await getBookDetailsById(id);

  return {
    title: bookDetails.title,
    description: bookDetails.description,
  };
}

const BookDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  const bookDetails = await getBookDetailsById(id);

  return (
    <main className="mt-8">
      <Button className="back-btn" asChild variant="outline">
        <Link href="/admin/books">
          <ArrowLeftIcon size={16} />
          Go Back
        </Link>
      </Button>

      <section>
        <div className="flex flex-col xl:flex-row gap-7">
          <div
            style={{ backgroundColor: hexToRgba(bookDetails.coverColor, 0.3) }}
            className="flex justify-center items-center rounded-xl py-6 px-8 sm:px-20"
          >
            <BookCover
              coverColor={bookDetails.coverColor}
              coverImage={bookDetails.coverUrl}
              className="full"
              variant="medium"
            />
          </div>

          <div className="flex flex-col gap-2 sm:gap-4">
            <p className="flex items-center text-[#64748B]">
              Created at: &nbsp;
              <CalendarDaysIcon size={18} />
              &nbsp;
              {format(bookDetails.createdAt!, "dd/MM/yyyy")}
            </p>
            <h2 className="font-semibold text-dark-400 text-xl sm:text-2xl">
              {bookDetails.title}
            </h2>
            <h3 className="text-[#3A354E] font-semibold">
              By {bookDetails.author}
            </h3>
            <p className="font-normal text-xs text-[#64748B]">
              {bookDetails.genre}
            </p>
            <Link href={`/admin/books/edit/${bookDetails.id}`}>
              <Button className="bg-primary-admin hover:bg-primary-admin/90 transition-all w-full">
                <Edit3Icon /> Edit Book
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-9 flex gap-10 flex-col xl:flex-row-reverse">
        <section className="flex flex-col gap-2 sm:gap-7 w-full xl:w-[400px]">
          <h3 className="text-dark-400 font-semibold">Video</h3>

          <div className="w-full xl:w-[400px]">
            <BookVideo src={bookDetails.videoUrl} title={bookDetails.title} />
          </div>
        </section>
        <section className="flex-col gap-2 sm:gap-7">
          <h3 className="text-dark-400 font-semibold">Summary</h3>

          <div className="space-y-5 text-xl text-[#64748B]">
            {bookDetails.summary.split("\n").map((line: string, i: number) => (
              <p key={i} className="font-normal text-sm sm:text-base">
                {line}
              </p>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default BookDetailsPage;
