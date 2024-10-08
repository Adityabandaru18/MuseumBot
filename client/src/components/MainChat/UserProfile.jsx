import React, { useState, useEffect } from "react";
import { FaTimes, FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";
import { useUser } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../Redux/userSlice";

const Profile = ({ onClose }) => {
	const { user } = useUser();
	const dispatch = useDispatch();

	const userProfile = useSelector((state) => state.user);
	console.log(userProfile)
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
	const [name, setName] = useState(
		userProfile?.fullName || user?.fullName ||""
	);
	const [email, setEmail] = useState(
		userProfile?.primaryEmail ||
			user?.primaryEmailAddress?.emailAddress || ""
	);
	const [phone, setPhone] = useState(
		userProfile?.phone ||
			user?.primaryPhoneNumber?.phoneNumber ||""
	);

	useEffect(() => {
		const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
		if (storedProfile) {
			setName(storedProfile.name || "");
			setEmail(storedProfile.email || "");
			setPhone(storedProfile.phone || "");
		}
	}, []);

	useEffect(() => {
		const userProfileData = { name, email, phone };
		localStorage.setItem("userProfile", JSON.stringify(userProfileData));

		dispatch(updateUser(userProfileData));
	}, [name, email, phone, dispatch]);

	if (!user) {
		return <div>Loading user data...</div>;
	}

	const handleEdit = (field, setField) => {
		const newValue = prompt(`Enter new ${field}:`, field);
		if (newValue !== null) {
			setField(newValue); 
		}
	};

	const EditableField = ({ label, value, placeholder, setField }) => (
		<div className='flex justify-between items-center'>
			<p>
				<strong>{label}:</strong>{" "}
				{value || <span className='italic text-gray-500'>{placeholder}</span>}
			</p>
			<button
				onClick={() => handleEdit(label, setField)}
				className='text-blue-400 hover:text-blue-300'
			>
				<FaEdit />
			</button>
		</div>
	);

	return (
		<div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-85'>
			<div className='relative bg-neutral-800 text-white p-8 rounded-lg w-[20rem] max-w-full h-[40rem] sm:w-[70rem] 2xl:w-[80rem] overflow-y-auto'>
				<button className='absolute top-4 right-4 text-white' onClick={onClose}>
					<FaTimes size={20} />
				</button>
				<h2 className='text-2xl font-semibold mb-6'>User Profile</h2>

				<div className='space-y-4'>
					<div className='flex items-center space-x-4'>
						{user.profileImageUrl ? (
							<img
								src={user.profileImageUrl}
								alt='Profile'
								className='w-20 h-20 rounded-full'
							/>
						) : (
							<div className='w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center'>
								<FaEdit className='text-gray-400 cursor-pointer' />
							</div>
						)}
						<div>
							<EditableField
								label='Name'
								value={name}
								placeholder='Add your name'
								setField={setName}
							/>
							<EditableField
								label='Email'
								value={email}
								placeholder='Add your email'
								setField={setEmail}
							/>
						</div>
					</div>

					<div className='border-t border-gray-700 pt-4'>
						<h4 className='text-lg font-semibold mb-2'>Contact Information</h4>
						<EditableField
							label='Phone'
							value={phone}
							placeholder='Add your phone number'
							setField={setPhone}
						/>
						<EditableField
							label='Email'
							value={email}
							placeholder='Add your email'
							setField={setEmail}
						/>
					</div>

					<div className='border-t border-gray-700 pt-4'>
						<h4 className='text-lg font-semibold mb-2'>Account Details</h4>
						<p>
							<strong>User ID:</strong> {user.id}
						</p>
						<p>
							<strong>Created:</strong>{" "}
							{new Date(user.createdAt).toLocaleDateString()}
						</p>
						<p>
							<strong>Last Updated:</strong>{" "}
							{new Date(user.updatedAt).toLocaleDateString()}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

Profile.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default Profile;
