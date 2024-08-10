import { Alert, Button, Modal, Spinner } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, uploadBytesResumable, } from "firebase/storage";
import { ref } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch } from "react-redux";
import {updateUserFailure, updateUserStart,updateUserSuccess, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutStart, signOutSuccess, signInFailure, signOutFailure} from "../redux/slice/createSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { PiSignOutBold } from "react-icons/pi";
import { PiWarningBold } from "react-icons/pi";


export default function DashProfile() {
  const dispatch = useDispatch();
  const { currentUser, error:errormessage } = useSelector((state) => state.user);
  const [formdata, setformdata] = useState({});
  const [loading, setloading] = useState(false);
  const [profile, setprofile] = useState(null);
  const [profileURL, setprofileURL] = useState(null);
  const [profileUploadProgress, setprofileUploadProgress] = useState(null);
  const [profileUploadError, setprofileUploadError] = useState(null);
  const [imageUploading, setimageUploading] = useState(false);
  const [userUpdateSuccess, setuserUpdateSuccess] = useState(false);
  const [userUpdateError, setuserUpdateError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const filePicker = useRef();

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setprofile(e.target.files[0]);
    }
  };

  console.log(formdata);
  useEffect(() => {
    if (profile) {
      uploadProfileImage();
    }
  }, [profile]);

  const uploadProfileImage = async () => {
    setprofileUploadError(null);
    setimageUploading("please wait Profile is Uploading ");
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime().toString() + profile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, profile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setprofileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setprofileUploadError(
            "could not upload image (image should be 5 MB or less"
          );
          setprofileUploadProgress(null);
          setimageUploading(false);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setprofileURL(downloadUrl);
            console.log(downloadUrl);
            setformdata({ ...formdata, googlePhotoUrl: downloadUrl });
            setimageUploading(false);
          });
        }
      );
    } catch (error) {
      next(error);
    }
  };

  const onHandleChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setuserUpdateError(null);
    setuserUpdateSuccess(null);
    if (Object.keys(formdata).length === 0) {
      setuserUpdateError('No Changes made');
      return;
    }
    dispatch(updateUserStart());
    setloading(true);
    if (imageUploading) {
      setloading(false);
      return;
    }
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, { 
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (res.ok) {
        setloading(false);
        dispatch(updateUserSuccess(data));
        setuserUpdateSuccess("User's profile is updated");
      } else {
        setloading(false);
        dispatch(updateUserFailure(data.message));
        setuserUpdateError(data.message)
      }
    } catch (error) {
      setloading(false);
      dispatch(updateUserFailure(error.message));
      setuserUpdateError(error.message)
    }
  };

  const handleDeleteAccount=async(e)=>{
    e.preventDefault();
    dispatch(deleteUserStart());
    try {
      
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
      method:'DELETE'
    });
    const data = await res.json();
    if(res.ok){
      alert('your account is deleted! redirecting to sign in page')
      dispatch(deleteUserSuccess(data));
    }
  } catch (error) {
    dispatch(deleteUserFailure(error.message));
  }
  };


  const signOutUser =async(e)=>{
    e.preventDefault();
    dispatch(signOutStart());
    try {
      const res = await fetch(`/api/user/signout`,{
        method:'POST'
      });
      const data = await res.json();
      if(res.ok){
       dispatch(signOutSuccess(data));
     }
    } catch (error) {
        dispatch(signOutFailure(error.message));
    }
  }
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <h1 className="text-3xl mb-5">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col mb-4 justify-center items-center relative">
          <input
            type="file"
            name="img"
            id="profile_change"
            accept="image/*"
            onChange={handleProfileChange}
            ref={filePicker}
            hidden
          />
          {profileUploadProgress && (
            <CircularProgressbar
              onClick={() => {
                filePicker.current.click();
              }}
              value={profileUploadProgress || 0}
              text={`${profileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${profileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={profileURL || currentUser.googlePhotoUrl}
            alt=""
            className={`rounded-full w-28 h-28 border-8 border-gray-200 cursor-pointer ${
              profileUploadProgress &&
              profileUploadProgress < 100 &&
              "opacity-10"
            }`}
            onClick={() => {
              filePicker.current.click();
            }}
          />
        </div>
        {profileUploadError && (
          <Alert color={"failure"}>{profileUploadError}</Alert>
        )}
        <div className="flex flex-col gap-4 justify-center dark:text-black">
          <input
            type="text"
            name="username"
            id="username"
            onChange={onHandleChange}
            defaultValue={currentUser.username}
            className="w-[90vw] border rounded-lg sm:w-[50vw] lg:w-[40vw] focus:outline-none lowercase"
          />
          <input
            type="email"
            name="email"
            id="email"
            onChange={onHandleChange}
            defaultValue={currentUser.email}
            className="w-[90vw] border rounded-lg sm:w-[50vw] lg:w-[40vw] focus:outline-none lowercase"
          />
          <input
            type="password"
            name="password"
            id="password"
            onChange={onHandleChange}
            className="w-[90vw] border rounded-lg sm:w-[50vw] lg:w-[40vw] focus:outline-none lowercase"
          />

          <Button
            disabled={loading || imageUploading}
            type="submit"
            gradientDuoTone={"purpleToBlue"}
            className="w-[90vw] border rounded-lg sm:w-[50vw] lg:w-[40vw] focus:outline-none dark:text-white"
          >
            {loading ? (
              <Spinner className="text-sm dark:text-white" />
            ) : (
              'Update'
            )}
          </Button>
        </div>
      </form>
            <div className="flex flex-row justify-between w-[90vw] sm:w-[50vw] lg:w-[40vw]">
            <Button color={'red'} onClick={()=>{setShowModal(true)}}>Delete Account {<AiOutlineDelete className="text-xl text-black dark:text-white"/> }</Button> 
              
            <Button color={'red'} onClick={signOutUser}>Sign Out <PiSignOutBold className="text-xl text-black dark:text-white"/> </Button> 
            

              
            </div>
            <Modal show={showModal} onClose={()=>{setShowModal(false)}} popup size={'md'}  >
              <Modal.Header />
              <Modal.Body>
                <div className="flex flex-col">
                  <PiWarningBold className="w-14 h-14 m-auto dark:text-white"/>
                  <div className="m-auto mb-3">Are you sure you want to delete Your Account</div>
                </div>
                <div className="flex flex-row m-auto justify-between">
                <Button color={'red'} className="bg-red-600 text-white hover:text-black" onClick={handleDeleteAccount}>Yes i'm sure {<AiOutlineDelete className="text-xl text-black dark:text-white"/> }</Button> 
                <Button color={'red'} onClick={()=>{setShowModal(false)}}>Cancel</Button>
                </div>
              </Modal.Body>
            </Modal>

      {userUpdateSuccess && (
        <Alert color={"success"}>{userUpdateSuccess}</Alert>
      )}
      {userUpdateError && (
        <Alert color={"failure"}>{userUpdateError}</Alert>
      )}
      {imageUploading && (
        <Alert color={"failure"}>{imageUploading}</Alert>
      )}
    </div>
  );
}
