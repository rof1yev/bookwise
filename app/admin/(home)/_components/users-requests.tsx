import Avatar from "@/components/avatar";
import { getInitials } from "@/lib/utils";
import { User } from "@/types";
import NotFoundState from "./not-found-state";

interface UsersRequestsProps {
  data: User[];
}

const UsersRequests = ({ data }: UsersRequestsProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-3 hover:opacity-80">
          {data.map((user: User) => (
            <div
              key={user.id}
              className="bg-[#F8F8FF] rounded-[10px] py-3.5 px-3 flex flex-col gap-3"
            >
              <Avatar
                src=""
                fallback={getInitials(user.fullName)}
                className="size-12 mx-auto"
              />
              <div className="text-center">
                <h4 className="text-dark-400 font-medium">{user.fullName}</h4>
                <p className="text-[#64748B] text-xs">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NotFoundState
          src="/images/not-found-user-requests.png"
          title="No Pending Account Requests"
          description="There are currently no account requests awaiting approval."
          className="mt-10"
        />
      )}
    </>
  );
};

export default UsersRequests;
