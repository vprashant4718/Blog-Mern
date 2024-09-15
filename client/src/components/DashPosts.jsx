import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function DashPosts() {
  const {currentUser} = useSelector((state)=> state.user);
  const [userPost, setUserPost]= useState([]);
const [showMore, setShowMore] = useState(true);

  console.log(userPost);
  useEffect(() => {
     const getpostdata=async()=>{
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if(res.ok){
          setUserPost(data.posts);
          if(data.posts.length < 1){
            setShowMore(false);
          }
        }
        else{
          console.log(error.message);
        }
        
      } catch (error) {
        console.log(error)
      }
    }
    
    if(currentUser.isAdmin){
      getpostdata();
    }
  }, [currentUser._id])
  

  const handleShowMore = async()=>{
    const startIndex = userPost.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setUserPost((prev)=> [...prev, ...data.posts]);
        if(data.posts.length < 1){
          setShowMore(false);
        }
      }
      else{
        console.error(error);
      }
    } catch (error) {
      
    }
  }
  return (
      <div className='w-48'>
      <Table className='w-48'>
        <TableHead>
          <TableHeadCell>DATE UPDATE</TableHeadCell>
          <TableHeadCell>POST IMAGE</TableHeadCell>
          <TableHeadCell>POST TITLE</TableHeadCell>
          <TableHeadCell>CATEGORY</TableHeadCell>
          <TableHeadCell>DELETE</TableHeadCell>
          <TableHeadCell>EDIT</TableHeadCell>
        </TableHead>
        {userPost.map((posts)=> <TableBody>
        <TableRow>
          <TableCell>{new Date(posts.createdAt).toLocaleDateString()}</TableCell>
          <TableCell><img src={posts.image} alt="" width={30} height={20} /></TableCell>
          <TableCell>{posts.title}</TableCell>
          <TableCell>{posts.categories}</TableCell>
          <TableCell><Button>Delete</Button></TableCell>
          <TableCell><Button>Update </Button></TableCell>
          </TableRow>
        </TableBody>)}
      </Table>

      {
        showMore && 
       (<button onClick={handleShowMore} className='mb-6 text-yellow-300 text-center border-solid border-yellow-300 m-auto'>+Show More</button>)
      }
      </div>
  )

}
