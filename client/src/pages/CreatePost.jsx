import { Alert, Button, FileInput, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {app} from '../firebase';
import {getDownloadURL, getStorage, uploadBytesResumable} from 'firebase/storage'
import {ref} from 'firebase/storage';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


export default function CreatePost() {
  const [imageuploadProgress, setimageUploadProgress] = useState(null);
  const [postdata, setpostdata]= useState({});
  const [postUploading, setPostUploading] = useState(null);
  const [imageUploadError, setImageUploadError]= useState(null);
  const [postingError, setPostingError] = useState(null);
  const [successUplaod, setSuccessUpload] = useState(null);
  const[file, setfile] = useState(null);
  const handleOnChange=(e)=>{
    setpostdata({
      ...postdata, [e.target.id]:e.target.value,
    })
  };
     
  
  
  const handleImageChange=(e)=>{
    setImageUploadError(null);
    setfile(e.target.files[0]); 
  }
  const uploadpostimage=async()=>{
    setImageUploadError(null);
     if (!file) {
      setImageUploadError('Please select an image');
      return
     }
    const storage = getStorage(app);
    const fileName = file.name + Math.random();
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setimageUploadProgress(progress.toFixed());
          console.log(progress)
        },
        (error)=>{
          setImageUploadError('image uplaod error');
          setimageUploadProgress(null);
        },
        ()=>{ getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          setimageUploadProgress(null);
          setImageUploadError(null);
             console.log(downloadUrl);
             setpostdata({...postdata, image:downloadUrl});
          console.log(file)
        
      })}
    )};

    const handleSubmit = async(e)=>{
      e.preventDefault();
      setPostUploading(true);
      setImageUploadError(null);
      setPostingError(null);
      setSuccessUpload(null);
      try {
        const res = await fetch(`/api/post/create`,{
          method: 'POST',
          headers:{
            'Content-Type':'application/json', 
          },
          body:JSON.stringify(postdata)
        })
        const data = await res.json();
        if(res.ok){
          console.log(data);
          setPostUploading(false);
          setSuccessUpload('Post is Published !');
        }
        else{
          setPostingError(data.message);
          setPostUploading(false);
        };
        
      } catch (error) {
        setPostingError(error.message);
        setPostUploading(false);

      }
    }

  return (
    <div className='flex flex-col justify-center gap-2 m-auto'>
      <h1 className='text-center my-6 font-bold text-3xl'>Create Post</h1>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-4 m-auto'>
        <div className='flex flex-col gap-2 w-[90vw] rounded-lg sm:flex-row sm:w-[50vw] lg:w-[50vw] focus:outline-none'>
          <TextInput placeholder='title' id='title' onChange={handleOnChange} className='w-[90vw] rounded-lg sm:w-[50vw] lg:w-[40vw] focus:outline-none' />
          <select name="categories" id="category"  onChange={handleOnChange} className='rounded-lg w-[90vw] sm:w-[30vw] lg:w-[20vw] focus:outline-none dark:text-black'>categories
            <option value="categories">categories</option>
            <option value="Next.js">Next.js</option>
            <option value="React.js">React.js</option>
            <option value="Javascript">Javascript</option>
          </select>
        </div>
        <div className='flex flex-row gap-2 border-none justify-center items-center w-[90vw] rounded-lg sm:flex-row sm:w-[50vw] sm:p-2 sm:justify-between sm:border-2 sm:border-teal-500 sm:border-dashed  lg:w-[50vw] focus:outline-none '>
          <FileInput accept='image/*' className='w-[80vw] ' id='image'  onChange={handleImageChange}/>
         {imageuploadProgress && imageuploadProgress?  <CircularProgressbar
              onClick={() => {
                filePicker.current.click();
              }}
              value={imageuploadProgress || 0}
              text={`${imageuploadProgress}%`}
              strokeWidth={5}
              className='rounded-lg w-[20vw] sm:w-[10vw]'
              styles={{
                root: {
                  position: "relative",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageuploadProgress / 100})`,
                },
              }}
            />
          :<Button type='button' className='rounded-lg w-[90vw] sm:w-[50vw]' onClick={uploadpostimage}>Upload Image</Button>}
        </div>
        <ReactQuill theme="snow"  id='content' onChange={(value)=>{ setpostdata({...postdata, content:value})}}  className='w-[90vw] h-48 rounded-lg sm:w-[50vw] sm:h-40 lg:w-[50vw] focus:outline-none'/>
        <br />
        <Button type='submit' gradientDuoTone={'purpleToPink'} className='w-[90vw] rounded-lg sm:w-[50vw] lg:w-[50vw] focus:outline-none mb-2'>{postUploading? <Spinner/> :'Publish'} </Button>
      </form>
      <div className=' flex flex-col gap-2 justify-center m-auto mb-10 items-center w-[90vw] rounded-lg sm:w-[50vw] lg:w-[50vw] focus:outline-none '>
      {imageUploadError && <Alert color={'failure'} className='m-auto w-[90vw] rounded-lg sm:w-[50vw] lg:w-[50vw] focus:outline-none'> {imageUploadError}</Alert>}
      {successUplaod && <Alert color={'success'} className='m-auto w-[90vw] rounded-lg sm:w-[50vw] lg:w-[50vw] focus:outline-none'> {successUplaod}</Alert>}
      {postingError && <Alert color={'failure'} className='m-auto w-[90vw] rounded-lg sm:w-[50vw] lg:w-[50vw] focus:outline-none'> {postingError}</Alert>}
      
      </div>
    </div>
  )
}
