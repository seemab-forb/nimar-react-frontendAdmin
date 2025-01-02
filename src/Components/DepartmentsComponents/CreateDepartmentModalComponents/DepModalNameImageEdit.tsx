import { MdUpload } from "react-icons/md";
import { useDepartmentModalContext } from "./useDepartmentModalContext";
function DepModalNameImageEdit() {
  const {
    setDepartmentLogo,
    departmentLogoUrl,
    setDepartmentLogoUrl,
    setDepartmentName,
    departmentName,
    departmentAbbreviation,
    setDepartmentAbbreviation,
  } = useDepartmentModalContext();

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-12 bg-blue-200 border-2 border-white rounded-full 2xl:w-16 aspect-square">
        {departmentLogoUrl && (
          <img
            src={departmentLogoUrl}
            alt=""
            className="object-cover w-full overflow-hidden rounded-full aspect-square"
          />
        )}
        <label
          className="absolute right-0 bottom-0 bg-blue-400 rounded-full p-[2px] cursor-pointer"
          title="Upload logo or image"
        >
          <MdUpload className="text-xs text-white 2xl:text-base" />
          <input
            type="file"
            name="icon"
            id="icon"
            className="absolute invisible"
            accept="image/*"
            onChange={(e) => {
              // only images are allowed
              if (
                e.target.files &&
                e.target.files[0]?.type.split("/")[0] === "image"
              ) {
                setDepartmentLogo(e.target.files[0]);
                setDepartmentLogoUrl(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
        </label>
      </div>
      <div>
        <input
          type="text"
          name="name"
          id="name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          className="py-1 text-xs input-field-form"
          placeholder="Department Name"
        />
      </div>
      <div>
        <input
          type="text"
          name="abbreviation"
          id="abbreviation"
          value={departmentAbbreviation}
          onChange={(e) => setDepartmentAbbreviation(e.target.value)}
          className="py-1 text-xs input-field-form"
          placeholder="Abbreviation"
        />
      </div>
    </div>
  );
}
export default DepModalNameImageEdit;
