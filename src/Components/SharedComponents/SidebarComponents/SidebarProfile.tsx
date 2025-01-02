import { useUser } from "../../../Context/useUser";
import { verifyResourceUrl } from "../../../Utils/helpers";
import userPicPlaceholder from "../../../assets/placeholderUser.jpg";

const userCategory: Record<string, string> = {
  super: "Super Admin",
  admin: "Admin",
};

function SidebarProfile() {
  const { username, profilePic, userType } = useUser();

  return (
    <div className="mt-10 mb-6">
      <div className="mx-auto overflow-hidden border-2 border-white rounded-full w-fit">
        <img
          src={verifyResourceUrl(profilePic || "", userPicPlaceholder)}
          alt=""
          className="object-cover w-12 2xl:w-20 aspect-square"
        />
      </div>
      <p className="py-3 text-xs 2xl:text-base">
        <span className="block text-center text-white select-none">
          {username}
        </span>
        <span className="block text-center text-gray-400 select-none">
          {/* because userType is null initially */}
          {!!userType && userCategory[userType]}
        </span>
      </p>
    </div>
  );
}
export default SidebarProfile;
