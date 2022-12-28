import { UserInterface } from "../modules/user";
import { useState } from "react";
import { baseurl } from "../modules/config";
import { useNavigate } from "react-router";
function UserForm(props: any): JSX.Element {
	const [user, setUser] = useState<UserInterface>({} as UserInterface);
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [avatar, setAvatar] = useState<Blob|null>(null);
	const [errors, setErrors] = useState<string[]>([]);
	const navigate = useNavigate();
	const submituser = async (user: UserInterface, password: string, confirmPassword: string, avatar: Blob|null) => {
		if (password !== confirmPassword) {
			setErrors(['Passwords do not match']);
			return;
		}
		const formData = new FormData();
		(user.email) && (formData.append('email', user.email));
		(user.username) && (formData.append('username', user.username));
		(user.firstName) && (formData.append('firstName', user.firstName));
		(user.lastName) && (formData.append('lastName', user.lastName));
		(user.country) && (formData.append('country', user.country));
		(user.avatar) && (formData.append('avatar', user.avatar));
		(user.bio) && (formData.append('bio', user.bio));
		(password) && (formData.append('password', password));
		(avatar) && (formData.append('avatar', avatar));

		const data = await fetch(`${baseurl}/users`, {
			method: 'POST',
			body: formData
			}).then((res) => res.json());
		if (data.statusCode === 412) {
			setErrors(data.message);
			return;
		} else if (data.statusCode === 400) {
			setErrors([data.message]);
			return;
		} else {
			setErrors([]);
			navigate(`/user/${data._id}`);
		}
	}

	return <>
		<form className="mb-3">
			<div className="form-floating mb-3">
				<input required type="email" className="form-control" value={(user.email) ? (user.email) : ''} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} id="emailinput" placeholder="name@example.com" />
				<label htmlFor="emailinput">Email address</label>
			</div>
			<div className="form-floating mb-3">
				<input required type="text" className="form-control" value={(user.username) ? (user.username) : ''} onChange={(e) => { setUser({ ...user, username: e.target.value }) }} id="usernameinput" placeholder="rtyer456" />
				<label htmlFor="usernameinput">Username</label>
			</div>
			<div className="form-floating mb-3">
				<input required type="text" className="form-control" value={(user.firstName) ? (user.firstName) : ''} onChange={(e) => { setUser({ ...user, firstName: e.target.value }) }} id="firstNameinput" placeholder="joe" />
				<label htmlFor="firstNameinput">First Name</label>
			</div>
			<div className="form-floating mb-3">
				<input required type="text" className="form-control" value={(user.lastName) ? (user.lastName) : ''} onChange={(e) => { setUser({ ...user, lastName: e.target.value }) }} id="lastNameinput" placeholder="doe" />
				<label htmlFor="lastNameinput">Last Name</label>
			</div>
			<div className="form-floating mb-3">
				<input required type="password" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} id="passwordinput" placeholder="&*JN{JJp" />
				<label htmlFor="passwordinput">Password ( Should contain 8 characters, 1 uppercase, 1 lowercase, 1 numeric, 1 special ) </label>
			</div>
			<div className="form-floating mb-3">
				<input required type="password" className="form-control" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} id="confirmpasswordinput" placeholder="&*JN{JJp" />
				<label htmlFor="confirmpasswordinput">Confirm Password</label>
			</div>

			<div className="form-floating mb-3">
				<input type="file" className="form-control" onChange={(e) => { setAvatar((e.target.files) ? (e.target.files[0]) : null ) }} id="avatarinput" placeholder="New York" />
				<label htmlFor="avatarinput">avatar</label>
			</div>

			<div className="form-floating mb-3">
				<input type="text" className="form-control" value={(user.country) ? (user.country) : ''} onChange={(e) => { setUser({ ...user, country: e.target.value }) }} id="countryinput" placeholder="US" />
				<label htmlFor="countryinput">Country</label>
			</div>

			<div className="form-floating mb-3">
				<textarea rows={4} className="form-control" value={(user.bio) ? (user.bio) : ''} onChange={(e) => { setUser({ ...user, bio: e.target.value }) }} id="bioinput" placeholder="New York" />
				<label htmlFor="bioinput">Short Bio</label>
			</div>

			<button type="submit" onClick={(e) => { e.preventDefault(); submituser(user, password, confirmPassword, avatar); }} className="btn btn-primary">Submit</button>
		</form>
		{(errors.length > 0) ? (
			<div className="alert alert-danger" role="alert">
				<ul>
					{errors.map((error, index) => (<li key={index}>{error}</li>))}
				</ul>
			</div>) : (<></>)}
	</>;
}

export default UserForm;
