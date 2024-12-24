const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const userSignUp = async (data) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return response.json();
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Something went wrong");
      }
    } catch (error) {
      throw new Error(error.message || "An unexpected error occurred");
    }
  };
  export const userSignIn = async (data) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return response.json();
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Something went wrong");
      }
    } catch (error) {
      throw new Error(error.message || "An unexpected error occurred");
    }
  };
  
  
export const createFolder = async (name,userId) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/folder/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({name}),
    });
    if (response.ok) {
      return response.json();
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Something went wrong");
    }
  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};


export const getFolders = async (userId) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/folder/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`,
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Something went wrong");
    }
  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const deleteFolders = async (folderId) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/folder/${folderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`,
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Something went wrong");
    }
  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};


export const getForms = async (folderId, userId) => {
  try {
    const folderQuery = folderId ? `?folderId=${folderId}` : "";
    const response = await fetch(`${BACKEND_URL}/api/form/${userId}${folderQuery}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
    });

    if (response.ok) {
      return response.json();
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Something went wrong");
    }
  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};


export const createForm = async (name,folderId,userId) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/form/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({name,folderId}),
    });
    if (response.ok) {
      return response.json();
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Something went wrong");
    }
  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};
