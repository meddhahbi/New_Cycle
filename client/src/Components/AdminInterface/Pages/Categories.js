import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../Sidebar';
import Navbar from '../Navbar';
import Style from '../Pages/style/Posts.css'
import { Link } from 'react-router-dom';



function Categorie() {
    const [categories, setCategories] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [IdCat, setId] = useState();
    const [Cate, setCate] = useState([]);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (confirmDelete) {
            setIsDeleting(true);
            axios.delete(`http://localhost:3001/category/${id}`)
                .then(res => {
                    // setCategories(categories.filter(cat => cat._id !== id));
                    setIsDeleting(false);
                    window.location = "/categorie"
                })
                .catch(err => {
                    console.log(err);
                    setIsDeleting(false);
                });
        }
    };

    useEffect(() => {
        axios.get('http://localhost:3001/category')
            .then((response) => {
                console.log(response.data.cats)
                setCategories(response.data.cats);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("test");
        //event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);

        console.log("err")
        axios.put(`http://localhost:3001/category/${IdCat}`, formData, {
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            // }
        }).then(response => {
            console.log(response.data);
            setName('');
            setDescription('');

            // window.location = "/category"

        }).catch(error => {
            console.log(error.response.data);

        });
    };

    const handleGetId = (id) => {
        axios.get(`http://localhost:3001/category/${id}`)
            .then((response) => {
                setId(id);
                setCate(response.data.cats);
                console.log(response.data)
                console.log("errrra");
                //console.log(IdCat);
                console.log(Cate);
            })

    }
    return (
        <div>
            <Navbar />
            <SideBar />
            <section id='wej' class="blog-section section-b-space">
                <div class="container-fluid-lg">
                    
                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.length===0?
                                <h3>no categories!!</h3>
                                :
                                <>
                                    {categories.map(cat => (
                                        <tr key={cat._id}>
                                            <td>{cat.name}</td>
                                            <td>{cat.description}</td>
                                            <td><button class="btn btn-danger" onClick={() => handleDelete(cat._id)}>Delete</button></td>
                                            <td><button onClick={handleGetId(cat._id)} type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal">
                                                Update
                                            </button></td>
                                        </tr>
                                    ))}
                                </>
                            }
                            
                        </tbody>
                    </table>
                    <Link to={`/addCategory`} >
                        <button class="btn btn-success" >Add your new categorie</button>
                    </Link>
                </div>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Update your category here</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                {Cate?
                                <form >
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Enter name"
                                        defaultValue={Cate.name}

                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                        Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        rows="3"
                                        placeholder="Enter description"
                                        defaultValue={Cate.description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>

                                <button onClick={() => handleSubmit()} type="submit" class="btn btn-primary">Submit</button>

                            </form>
                            :""
                            }
                                
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                            </div>

                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
}

export default Categorie;