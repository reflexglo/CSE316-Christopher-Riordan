import React, { useState } 	from 'react';
import { REGISTER }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const CreateAccount = (props) => {
	const [input, setInput] = useState({ email: '', password: '', fullName: '' });
	const [loading, toggleLoading] = useState(false);
	const [Register] = useMutation(REGISTER);

	
	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleCreateAccount = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('All fields must be filled out to register');
				return;
			}
		}
		const { loading, error, data } = await Register({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			console.log(data)
			toggleLoading(false);
			if(data.register.email === 'already exists') {
				alert('User with that email already registered');
			}
			else {
				props.fetchUser();
			}
			props.setShowCreate(false);

		};
	};

	return (
        // Replace div with WModal

		<WModal className="signup-modal" visible="true">
			<WMHeader className="modal-header">
				<WRow>
					<WCol size="11">
						Create Account
					</WCol>
					<WCol size="1">
						<WButton className="modal-button" onClick={() => props.setShowCreate(false)} span clickAnimation="ripple-light" hoverAnimation="darken" >
							X
						</WButton>
					</WCol>
				</WRow>
			</WMHeader>

			{
				loading ? <div />
					: <WMMain className="modal-main">
						<WRow>
							<WCol size="3" className="modal-info">
								Name:
							</WCol>
							<WCol size="9">
								<WInput 
									className="modal-input" onBlur={updateInput} name="fullName" labelAnimation="up" 
									barAnimation="solid" labelText="*Enter Name Here*" wType="outlined" inputType="text" 
								/>
							</WCol>
						</WRow>
						<div className="modal-spacer">&nbsp;</div>
						<WRow>
							<WCol size="3" className="modal-info">
								Email:
							</WCol>
							<WCol size="9">
								<WInput 
									className="modal-input" onBlur={updateInput} name="email" labelAnimation="up" 
									barAnimation="solid" labelText="*Enter Email Here*" wType="outlined" inputType="text" 
								/>
							</WCol>
						</WRow>
						<div className="modal-spacer">&nbsp;</div>
						<WRow>
							<WCol size="3" className="modal-info">
								Password:
							</WCol>
							<WCol size="9">
								<WInput 
									className="modal-input" onBlur={updateInput} name="password" labelAnimation="up" 
									barAnimation="solid" labelText="*Enter Password Here*" wType="outlined" inputType="password" 
								/>
							</WCol>
						</WRow>
						<div className="modal-spacer">&nbsp;</div>
						<WRow>
							<WCol size="3">

							</WCol>
							<WCol size="9">

							</WCol>
						</WRow>						
						<div className="modal-spacer">&nbsp;</div>
						<WRow>
							<WCol size="5">
								<WButton className="modal-button" onClick={handleCreateAccount} span clickAnimation="ripple-light" hoverAnimation="darken">
									Submit
								</WButton>
							</WCol>
							<WCol size="2">

							</WCol>
							<WCol size="5">
								<WButton className="modal-button" onClick={() => props.setShowCreate(false)} span clickAnimation="ripple-light" hoverAnimation="darken" >
									Cancel
								</WButton>
							</WCol>
						</WRow>
					</WMMain>
			}
		</WModal>
	);
}

export default CreateAccount;
