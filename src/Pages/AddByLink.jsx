import React, { useEffect } from 'react';
import { addSharedWorkspace } from '../Services';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const Test = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    useEffect(() => {
        const addWorkSpace = async () => {
            const mode = searchParams.get('mode');
            if(!token){
              toast.error("Please log in to continue.")
              navigate("/landing")
              return ;
            }
            try {
                const response = await addSharedWorkspace(id, mode);
                if (response.status === "200") {
                    toast.success(response.message);
                    navigate(`/dashboard/${localStorage.getItem("userId")}`);
                }
            } catch (error) {
                toast.error(error.message || "Error creating form");
                navigate(`/dashboard/${localStorage.getItem("userId")}`);
            }
        };
        addWorkSpace();
    }, []); 
    return (
        <div>
        </div>
    );
};

export default Test;
