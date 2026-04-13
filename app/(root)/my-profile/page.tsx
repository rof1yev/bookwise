import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";

const MyProfilePage = () => {
  return (
    <div className="">
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button type="submit">Logout</Button>
      </form>
    </div>
  );
};

export default MyProfilePage;
