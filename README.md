# turbo-octo-waffle
Full stack final project


# TODO
## [LOGIN]
	- POST /login (use session cookie)
		- Body: {email, password}	
		- Response: 	
            - Yay: {session-cookie} 
			- Nay: {error??}

## [CRUD]
- Create:
	 - POST /user/create
	    - Body: {email, name, password}
		- Response: 	
            - Yay: {"user created"} 
		    - Nay: {"error message??"}

    -	POST /account/create
		- Body: {user-session-cookie}
		- Response: 	
            - Yay: {JSON with accounts?} 
			- Nay: {null or error?}

- Read:
	- GET /account/readall/
		- Body: {user-session-cookie}
		- Response: 	
            - Yay: {JSON with accounts?} 
			- Nay: {null or error?}
- Update:
	- POST /account/update/{accountid}
		- Body: {account object}, {user-session-cookie}
		- Response: 	
            - Yay: {JSON with accounts?} 
			- Nay: {null or error?}

- Delete:
	- DELETE /account/delete/{accountid}
		- Body: {user-session-cookie}
		- Response: 	
            - Yay: {JSON with accounts?} 
			- Nay: {null or error?}


