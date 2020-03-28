import * as React from 'react';
import { useState, useEffect } from 'react';
import {useParams, useHistory} from 'react-router-dom';

const Admin: React.FC<AdminProps> = () => {
    const history =useHistory();
    const {id} = useParams();

    const [username, setUsername] = useState<string>('');
    const [message, setMessage] = useState<string>('')

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);


    useEffect(() => {
        (async() =>{
            let res = await fetch(`/api/chirps/${id}`);
            let chirp = await res.json();
            console.log(chirp)
            setUsername(chirp.username);
            setMessage(chirp.message);
        })();
    }, [id]);

    const saveEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let res = await fetch (`/api/chirps/${id}`, {
            method: 'PUT',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username,message})
        })
        if (res.ok){
            history.push(`/details/${id}`);
        }else {
            console.log('something went wrong. Our code monkeys are working very hard to fix this')
        }
    }

    const deleteChirp = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let res = await fetch (`/api/chirps/${id}`, {
            method: 'DELETE',
        })
        if (res.ok){
            history.push('/');
        }else {
            console.log('something went wrong. Our code monkeys are working very hard to fix this')
        }
    }

    const cancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        history.push(`/details/${id}`);
    }

    return (
            <main className="container">
            <section className="row my-2 justify-content-center">
                <div className="col-md-8">
                    <form action="" className="form-group p-3 shadow border rounded">
                        <label htmlFor="username">Username</label>
                        <input value={username} onChange={handleUsernameChange} placeholder="Username" id="username" type="text" className="form-control"/>
                        <label htmlFor="message">Message</label>
                        <textarea value={message} onChange={handleMessageChange} rows={8} placeholder="Chirp into the Void" className="form-control" name="message" id="message"/>
                        <div className="d-flex justify-content-end align-items-center">
                        <button onClick={saveEdit} className="btn btn-small btn-outline-dark m-1">Save Chirp</button>
                        <button onClick={cancel} className="btn btn-small btn-outline-dark m-1">Cancel Edit</button>
                        <button onClick={deleteChirp} className="btn btn-small btn-outline-danger m-1">Destroy Chirp</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

interface AdminProps {}

export default Admin;