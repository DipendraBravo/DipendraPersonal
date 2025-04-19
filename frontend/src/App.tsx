import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/hello`)
            .then(res => setMessage(res.data));
    }, []);

    return <h1>{message || "Loading..."}</h1>;
}
export default App;