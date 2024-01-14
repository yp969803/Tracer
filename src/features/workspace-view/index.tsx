import SearchBar from 'app/components/search';
import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import WorkspaceCard from './workspace-card';
import { workSpaceData } from 'app/utils/workspaceData';
import UserContext from 'app/context/user/userContext';
import { UserOrgDetails, getUserOrgs } from 'app/api/user';
import loader from '../../app/assets/gifs/loader.gif'

const WorkspaceView = () => {
  const userContext= useContext(UserContext);
  const [isLoad, setIsLoad]= useState<boolean>(true)
  const [archeives, setArcheives]= useState<boolean>(false);
  const token= localStorage.getItem('token')
  const fetchData=async()=>{
  
    if(token&&userContext?.username&&!userContext.userOrgs){
      setIsLoad(true)
       try{
         const userOrgs= await getUserOrgs(token, userContext?.username.toString());
         userContext?.setUserOrgs(userOrgs.data)
       }catch(e){

       }
       setIsLoad(false)
    }
  }


   useEffect(()=>{
    fetchData();
   },[userContext?.setUsername, userContext?.username])

  return (
    <div className='workspaceview-container'>
      <div className='workspaceview-header'>
        <SearchBar />

        <button onClick={()=>setArcheives(!archeives)}>Archeives</button>
        <button>Create a workspace</button>
        
      </div>

      <div className='workspaceview-card-container'>
        {isLoad?<img src={loader}className='loader'/>:userContext?.userOrgs&&Object.entries(userContext.userOrgs.userOrgs).map(([orgName, details])=>{
         
          return <WorkspaceCard 
          key={orgName}
          workspaceName={orgName}
          archeive={"true"===details.archeive}
          bookmark={"true"===details.bookmark}
          role={details.role}
          archeives={archeives}
           />
         })}
      </div>
    </div>
  );
};

export default WorkspaceView;
