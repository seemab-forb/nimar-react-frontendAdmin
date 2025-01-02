import { useCheckUserName } from "../../../API/useCheckUserName";
import { useManageDepartmentsPage } from "../../../Context/useManageDepartmentsPage";
import { DepartmentModalModeType } from "../../../Context/useManageDepartmentsPage.types";
import { useDepartmentModalContext } from "./useDepartmentModalContext";
import InputWithLabelBaseline from "../../Primitives/InputWithLabelBaseline";
import { MdCheckCircle } from "react-icons/md";
import { TailSpin } from "react-loader-spinner";
import { FcCancel } from "react-icons/fc";

const formFieldsGroup1 = [
	{
		name: "departmentAdminFirstName",
		type: "text",
		label: "First Name",
		placeholder: "Enter First Name",
	},
	{
		name: "departmentAdminLastName",
		type: "text",
		label: "Last Name",
		placeholder: "Enter Last Name",
	},
];
const formFieldsGroup2 = [
	{
		name: "departmentAdminEmail",
		type: "email",
		label: "Email",
		placeholder: "Enter Email",
	},
	{
		name: "departmentAdminPassword",
		type: "password",
		label: "Password",
		placeholder: "Enter Password",
	},
];

function AddNewUser() {
	const { userFormdata, setUserFormdata } = useDepartmentModalContext();
	const { departmentModalMode } = useManageDepartmentsPage();
	const { data: isUsernameAvailable, isLoading } = useCheckUserName(
		userFormdata.departmentAdminUsername,
	);

	return (
		<div className="">
			<div className="grid grid-cols-3 gap-6">
				{formFieldsGroup1.map((field) => (
					<div className="flex flex-col gap-1 my-2 grow" key={field.name}>
						<InputWithLabelBaseline
							label={field.label}
							labelProps={{
								htmlFor: field.name,
								className: "text-sm",
							}}
							inputProps={{
								type: field.type,
								name: field.name,
								id: field.name,
								placeholder: field.placeholder,
								value: userFormdata[field.name],
								onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
									setUserFormdata({
										...userFormdata,
										[field.name]: e.target.value,
									}),
							}}
						/>
					</div>
				))}
				<div className="relative flex flex-col gap-1 my-2 grow">
					<InputWithLabelBaseline
						label="Username"
						labelProps={{
							htmlFor: "username",
							className: "text-sm",
						}}
						inputProps={{
							type: "text",
							name: "username",
							id: "username",
							placeholder: "Username",
							className: "pr-10",
							value: userFormdata.departmentAdminUsername,
							onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
								setUserFormdata({
									...userFormdata,
									departmentAdminUsername: e.target.value,
								});
							},
							disabled: departmentModalMode === DepartmentModalModeType.Edit,
						}}
					/>
					{departmentModalMode !== DepartmentModalModeType.Edit && (
						<div className="text-xs text-red-500">
							{isLoading && (
								<div className="absolute top-9 right-1">
									<TailSpin
										visible={true}
										height="20"
										width="20"
										color="#4fa94d"
										ariaLabel="tail-spin-loading"
										radius="1"
										wrapperStyle={{}}
										wrapperClass=""
										strokeWidth={5}
									/>
								</div>
							)}

							{isUsernameAvailable?.data?.message === "True" && (
								<div
									className="absolute top-9 right-1"
									title="Username available"
								>
									<MdCheckCircle
										size={20}
										className="text-green-500"
										aria-label="username-available"
									/>
								</div>
							)}

							{isUsernameAvailable?.data?.message === "False" && (
								<div
									className="absolute top-9 right-1"
									title="Username already exists"
								>
									<FcCancel size={20} aria-label="username-not-available" />
								</div>
							)}
							{userFormdata.departmentAdminUsername.includes(" ") && (
								<p className="text-xs text-red-500">
									Username cannot contain spaces
								</p>
							)}
						</div>
					)}
				</div>
			</div>
			<div className="flex flex-wrap gap-6">
				{formFieldsGroup2.map((field) => (
					<div className="flex flex-col gap-1 my-2 grow" key={field.name}>
						<InputWithLabelBaseline
							label={field.label}
							labelProps={{
								htmlFor: field.name,
								className: "text-sm",
							}}
							inputProps={{
								type: field.type,
								name: field.name,
								id: field.name,
								placeholder: field.placeholder,
								value: userFormdata[field.name],
								onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
									setUserFormdata({
										...userFormdata,
										[field.name]: e.target.value,
									}),
								disabled:
									field.name !== "departmentAdminEmail" &&
									departmentModalMode === DepartmentModalModeType.Edit,
							}}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
export default AddNewUser;
