import React, { useState } 	from 'react';
import { LOGIN } 			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';
import WCol from 'wt-frontend/build/components/wgrid/WCol';
import WRow from 'wt-frontend/build/components/wgrid/WRow';

const Login = (props) => {
	const [input, setInput] = useState({ email: '', password: '' });
	const [loading, toggleLoading] = useState(false);
	const [showErr, displayErrorMsg] = useState(false);
	const errorMsg = "Email/Password not found.";
	const [Login] = useMutation(LOGIN);

	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	}

	const handleLogin = async (e) => {

		const { loading, error, data } = await Login({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (data.login._id === null) {
			displayErrorMsg(true);
			return;
		}
		if (data) {
			props.fetchUser();
			props.refetch();
			props.refetchRegions();
			toggleLoading(false)
			props.setShowLogin(false)
		};
	};


	return (
        // Replace div with WModal

		<WModal className="login-modal" visible="true">
			<WMHeader className="modal-header">
				<WRow>
					<WCol size="11">
						Login
					</WCol>
					<WCol size="1">
						<WButton className="modal-button" onClick={() => props.setShowLogin(false)} span clickAnimation="ripple-light" hoverAnimation="darken">
							X
						</WButton>
					</WCol>
				</WRow>
			</WMHeader>

			{
				loading ? <div />
					: <WMMain className="main-login-modal">
						<WRow>
							<WCol size="3" className="modal-info">
								Email:
							</WCol>
							<WCol size="9">
								<WInput className="modal-input" onBlur={updateInput} name='email' labelAnimation="up" barAnimation="solid" labelText="*Enter Email Here*" wType="outlined" inputType='text' />
							</WCol>
						</WRow>
						<div className="modal-spacer">&nbsp;</div>
						<WRow>
							<WCol size="3" className="modal-info">
								Password:
							</WCol>
							<WCol size="9">
								<WInput className="modal-input" onBlur={updateInput} name='password' labelAnimation="up" barAnimation="solid" labelText="*Enter Password Here*" wType="outlined" inputType='password' />
							</WCol>
						</WRow>		
						<div className="modal-spacer" >&nbsp;</div>
						<WRow>
							<WCol size="5">
								<WButton className="modal-button" onClick={handleLogin} span clickAnimation="ripple-light" hoverAnimation="darken">
									Login
								</WButton>
							</WCol>
							<WCol size="2">

							</WCol>
							<WCol size="5">
								<WButton className="modal-button" onClick={() => props.setShowLogin(false)} span clickAnimation="ripple-light" hoverAnimation="darken">
									Cancel
								</WButton>
							</WCol>
						</WRow>
						{
							showErr ? <div className='modal-error'>
								{errorMsg}
							</div>
								: <div className='modal-error'>&nbsp;</div>
						}
					</WMMain>
			}
		</WModal>
	);
}

export default Login;