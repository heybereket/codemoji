import '../style/contributors.css';
import { useState, useEffect } from 'react';
function Contributors() {
    const [contributors, setContributors] = useState([])
    
    useEffect(() => {
      const fetchContributors = async () => {
        const response = await fetch(
          'https://api.github.com/repos/heybereket/codemoji/contributors'
        )
        const contributors = await response.json()
  
        setContributors(
          contributors.filter((contributor) => !contributor.login.includes('bot'))
        )
      }
  
      fetchContributors()
    }, [])

        return (
            <div className="contributors-wrapper">
            <h1 className="contributors-heading">made possible by,</h1>
        {contributors.map((contributor) => (
            <a href={contributor.html_url} target="_blank">
            <img className="contributor" src={contributor.avatar_url} />
            </a>
        ))}
        </div>
        );
}

export default Contributors;