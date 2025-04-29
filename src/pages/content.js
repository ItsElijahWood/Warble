import { useEffect } from "react";
import urls from "../url.js";
import Header from "../components/header.js";

function Content() {
  // Check if logged in
  useEffect(() => {
    const checkProtected = async() => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found in localStorage.');
        window.location.href = "/";
        return;
      }
    
      try {
        const response = await fetch(`${urls().server_url}/api/protected`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
    
        const data = await response.json();
        console.log('Protected data:', data);
      } catch (error) {
        console.error('Failed to fetch protected data:', error);
      }
    }

  checkProtected();
  }, []);  

  return (
    <>
      <Header />
    </>
  )
}

export default Content;
