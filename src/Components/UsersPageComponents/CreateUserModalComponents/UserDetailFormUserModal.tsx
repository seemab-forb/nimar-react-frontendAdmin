import useCreateUserModalContext from "./useCreateUserModalContext";
import useManageUsersPage, {
	CreateUserModalModeType,
} from "../../../Context/useManageUsersPage";
import { useCheckUserName } from "../../../API/useCheckUserName";
import InputWithLabelBaseline from "../../Primitives/InputWithLabelBaseline";
import { TailSpin } from "react-loader-spinner";
import { MdCheckCircle } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
function UserDetailFormUserModal() {
	const { userDetails, setUserDetails } = useCreateUserModalContext();
	const { createUserModalMode } = useManageUsersPage();
	const { data: isUsernameAvailable, isLoading } = useCheckUserName(
		userDetails.username,
	);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setUserDetails({
			...userDetails,
			[e.target.name]: e.target.value,
		});
	}

	const userDetailsFieldsGroup1 = [
		{
			label: "First Name",
			inputProps: {
				id: "firstName",
				type: "text",
				name: "firstName",
				placeholder: "Enter First Name",
				value: userDetails.firstName,
				onChange: handleChange,
			},
		},
		{
			label: "Last Name",
			inputProps: {
				id: "lastName",
				type: "text",
				name: "lastName",
				placeholder: "Enter Last Name",
				value: userDetails.lastName,
				onChange: handleChange,
			},
		},
	];

	const userDetailsFieldsGroup2 = [
		{
			label: "Email",
			inputProps: {
				id: "email",
				type: "email",
				name: "email",
				placeholder: "Enter Email",
				value: userDetails.email,
				onChange: handleChange,
			},
		},
		{
			label: "Password",
			inputProps: {
				id: "password",
				type: "password",
				name: "password",
				placeholder: "Enter Password",
				value: userDetails.password,
				onChange: handleChange,
				disabled: createUserModalMode === CreateUserModalModeType.EDIT,
			},
		},
	];

	return (
		<div className="">
			<div className="px-3 pt-3">
				<div className="flex gap-6">
					{userDetailsFieldsGroup1.map((field) => (
						<InputWithLabelBaseline
							key={field.label}
							label={field.label}
							labelProps={{
								htmlFor: field.inputProps.id,
							}}
							inputProps={field.inputProps}
						/>
					))}
					<div className="relative grow">
						<InputWithLabelBaseline
							key="userName"
							label="User Name"
							labelProps={{
								htmlFor: "userName",
							}}
							inputProps={{
								id: "userName",
								type: "text",
								name: "username",
								placeholder: "Enter User Name",
								className: "pr-10",
								value: userDetails.username,
								onChange: handleChange,
								disabled: createUserModalMode === CreateUserModalModeType.EDIT,
							}}
						/>
						{createUserModalMode !== CreateUserModalModeType.EDIT && (
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
								{userDetails.username.includes(" ") && (
									<p className="text-xs text-red-500">
										Username cannot contain spaces
									</p>
								)}
							</div>
						)}
					</div>
				</div>
				<div className="flex gap-6 mt-10">
					{userDetailsFieldsGroup2.map((field) => (
						<InputWithLabelBaseline
							key={field.label}
							label={field.label}
							labelProps={{
								htmlFor: field.inputProps.id,
							}}
							inputProps={field.inputProps}
						/>
					))}
					<div className="grow" />
				</div>
			</div>
		</div>
	);
}
export default UserDetailFormUserModal;
