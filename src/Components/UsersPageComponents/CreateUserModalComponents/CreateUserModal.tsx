import CreateUserModalContextComponent from "./CreateUserModalContextComponent";
import CreateUserModalBody from "./CreateUserModalBody";

function CreateUserModal() {
  return (
    <CreateUserModalContextComponent>
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-11/12 bg-white 2xl:w-9/12 rounded-xl">
          <CreateUserModalBody />
        </div>
      </div>
    </CreateUserModalContextComponent>
  );
}
export default CreateUserModal;
