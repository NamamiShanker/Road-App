import { React, useState, useEffect } from 'react';
import './existingComplaints.css';
import { Navbar, Nav, Table} from 'react-bootstrap';
import axios from 'axios';

const IssuesAssigned = () => {

    const [data, setData] = useState([])

    

    useEffect(() => {

        const config = {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        }

        axios.get('/issues', config).then(json => {
            setData(json.data)
            console.log(json)});
        }, [])


    const renderTable = () => {

    const onSubmit = async () => {

        const config = {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        }
            
            try{
                
                const res = await axios.post('/complaints/upvote',{
                    'complaint_id':data.complaint_id
                },config);

            }
            catch(err){
                console.error(err.response.data);
            }
        }

        return data.map(complaint => {
            return (
                <tr>
                <td>{complaint.createdAt.substring(0, 10)}</td>
                <td>{complaint.title}</td>
                <td>{complaint.description}</td>
                <td>{complaint.complaint_address}</td> 
                <td>{complaint.status} <i className="arrow up" onClick={() => {onSubmit()}}></i></td>
                </tr>
            )
        })
    }
    return(
        <div style={{height:"100vh",backgroundColor:"rgb(0, 0, 0, 0.9)"}}>
            <Navbar style={{backgroundColor:"black"}}>
                    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <Navbar.Brand class="nav-link" style={{color:"white"}}>Bombay Municipal Corporation</Navbar.Brand>
                            </li>
                        </ul>
                    </div>

                    <div class="mx-auto">
                        
                        <Nav>
                            <Nav.Link href="/complains" style={{color:"white",paddingLeft:"1rem"}} class="navbar-brand mx-auto" >Register a Complaint</Nav.Link>
                            
                            <Nav.Link href="/existing-complaints" style={{color:"white",paddingLeft:"2rem"}} class="navbar-brand mx-auto" >Existing Complaints</Nav.Link>
                            
                            <Nav.Link href="/my-complaints" style={{color:"white",paddingLeft:"2rem"}} class="navbar-brand mx-auto" >My Complaints</Nav.Link>

                            <Nav.Link href="/my-issues" style={{color:"white",paddingLeft:"2rem"}} class="navbar-brand mx-auto" >Issues Assigned</Nav.Link>
                        </Nav>
                        
                        
                    </div>
            <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                    <Nav.Link href="/login" style={{color:"white"}} class="nav-link" >Logout</Nav.Link>
                    </li>
                </ul>
    </div>
            </Navbar>
            <div id="complaint-card">
                <Table responsive="sm" style={{marginTop:"2rem",color:"white"}} id="existing-complaints">
                    <thead>
                        <tr>
                            <th>Date of the Complaint</th>
                            <th>Title</th>
                            <th>Description of the Complaint</th>
                            <th>Address of the Complaint</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>{renderTable()}</tbody>
                </Table>
            </div>
        </div>
    );
};

export default IssuesAssigned;