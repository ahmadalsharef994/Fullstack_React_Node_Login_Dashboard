import {useState, useEffect} from "react";
import jwt_decode from "jwt-decode";
import { Table, Badge, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdForwardToInbox } from "react-icons/md";


function Dashboard() {

	  const [from, setFrom] = useState("");
	  const [to, setTo] = useState("");
	  const [content, setContent] = useState("");
	  const [messages, setMessages]=useState([])

	  useEffect(() => { //get jwt token
	    var token = localStorage.getItem('token')
	    var decoded = jwt_decode(token);
	    setFrom(decoded.email)
	    console.log(
	      "This only happens ONCE.  But it happens AFTER the initial render."
	    );
	  }, []);


	async function  sendMessage(event){
	    event.preventDefault(); //prevent default form redirect behavior
	    const response = await fetch("http://localhost:1337/sendMessage", {
		method: 'POST',
		headers: {
		    "content-type": "application/json"            
		},
		body: JSON.stringify({
			from,
			to,
			content
		    })
	    })
	    const data = await response.json()
	    console.log(data)
		}
	
	async function  forwardMessage(originalWriter, content){
		const to = prompt('Please enter destination address')
		content+=`\n______________\n Forwarded \n Original: ${originalWriter} -----> ${to}`
		const response = await fetch("http://localhost:1337/sendMessage", {
		    method: 'POST',
		    headers: {
			"content-type": "application/json"
		    },
		    body: JSON.stringify({
			    from,
			    to,
			    content
			})
		})
		const data = await response.json()
		console.log(data)
		}

	async function  checkInbox(event){
		const response = await fetch("http://localhost:1337/checkInbox", {
		    method: 'POST',
		    headers: {
			"content-type": "application/json"      
		    },
		    body: JSON.stringify({
			from
		    })
		})
		const data = await response.json()
		console.log(data)
		setMessages(data)
		}


  return (
	  
    <div>
	  
      <h1 style={{textAlign: 'center'}}><Badge bg="success">Dashboard</Badge></h1>
      <h6 style={{textAlign: 'center'}}><Badge  bg="primary">Logged in as {from}</Badge></h6>
      <br />

    <form className="form-inline" onSubmit={sendMessage}>
        <h3>Compose Message</h3>
        <br/>
        <div className="form-group  col-4">
        <input type="email" className="form-control" placeholder="to" value={to} onChange={(e)=>setTo(e.target.value)}/>
        <br/>
        <textarea type="text" className="form-control" placeholder="content" value={content} onChange={(e)=>setContent(e.target.value)}/>
        <br/>
        <input className="form-control btn btn-secondary" type="submit" value="Send"/>
        </div>
    </form>

    <br/>
		
    <div>
        <h2>List Messages</h2>
        <br />
        <Button variant="primary" size="sm" onClick={checkInbox}> Fetch from Inbox</Button>
        <br />       
        <br />    
		
        <Table striped bordered hover>
        <thead>
            <tr>
                <td>From</td>
                <td>Content</td>
                <td>Actions</td>
            </tr>
        </thead>
        <tbody>
            {messages.map((message,index)=>{
                return(
                    <tr key={index}>
                        <td>{message.from}</td>
                        <td style={{whiteSpace: "pre-wrap"}}>{message.content}</td>
                        <td>
                            <Button variant="secondary" onClick={()=>forwardMessage(message.from, message.content)}><MdForwardToInbox/></Button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
        </Table>
    </div>

    </div>
  );
}

export default Dashboard;
