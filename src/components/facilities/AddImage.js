import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import AuthContext from '../../store/auth-context';

const AddImage = () => {
   const {id} =useParams();
   const history= useHistory();
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const ctx= useContext(AuthContext);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = () => {
		const formData = new FormData();

		formData.append('image', selectedFile);

		fetch(
			'http://localhost:5000/facility/upload/'+id,
			{
				method: 'POST',
				body: formData,
                headers: {
                    'Authorization': 'Bearer ' + ctx.token,
                    'Accept': '*/*'
                },
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
                history.push('/facility/all')

			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};
	

	return(

         <div style={{ display:'block',margin:'auto' }}>
             <div >
                 
			<input type="file" name="file" onChange={changeHandler} />
			{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<Button variant="contained"
                                            color="primary" onClick={handleSubmission}>Submit</Button>
			</div>


             </div>
        </div>
	)
};

export default AddImage;