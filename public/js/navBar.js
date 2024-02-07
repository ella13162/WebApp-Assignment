/*
    Navigation bar is added dynamically
*/
document.addEventListener('DOMContentLoaded',async()=>{
    let navlist = document.getElementById('page-navigation');
    
    const response = await fetch('/user/loggeduser');
    const result = await response.json();
    
    navlist.innerHTML = `
        <li> <a href="/searchPage.html">Search</a></li>
        <li> <a href="/addBusiness.html">Add Business</a></li>
        ${(response.status===401)? `
            <li> <a id='login-button' href="#">Login</a></li>
        `:`
            <li> Logged in as ${result.username} </li>
            <li> <a id='logout-button' href="#">Logout</a></li>
        `}
    `;
    
    /*
        Adding a login form when login button clicked
    */
    document.getElementById('login-button')?.addEventListener('click',(event)=>{
        let login_form = document.getElementById('login-form');
        login_form.innerHTML = `
            <form>
                <input type="text" id="business-username" placeholder="Username"/> <br>
                <input type="password" id="business-password" placeholder="Password"/> <br>
                <button type="submit" id="business-login-button">Login</button>
            </form>
        `;

        /*
            Handling login with fetch API call
        */
        document.getElementById('business-login-button').addEventListener('click', async (event)=>{
            const username = document.getElementById('business-username').value;
            const password = document.getElementById('business-password').value;
            const response = await fetch("/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username,password})
            });
            const result = await response.json();
            if(response.status === 200){
                login_form.innerHTML = '';
                window.location.replace('/');
            }
            alert(result.message);
        });
    });

    /*
        Handling logout button click
    */
    document.getElementById('logout-button')?.addEventListener('click', async (event)=>{
        const response = await fetch("/user/logout");
        const result = await response.json();
        window.location.replace('/');
        alert(result.message);
    })
})