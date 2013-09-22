SocialGobelins
==============

A social sprite-animated interface



installation :

                -   'npm install' on root folder 
                
                it works with the file : package.json to list dependencies.

Launch : 

                'node index.js'   ,  the app is pre-configured to run on : 127.0.0.1 on port 3700. (127.0.0.1:3700).
                
                
                To change port and ip local adress :


        example for port 4200, on your local network ip adress '192.168.1.42 :



        index.js :
        
        ...
        
        var port = 4200;
        
        
        
        

        public/index.html :   
        
        ...
        <script src="http://192.168.1.42:4200/socket.io/socket.io.js">
        ...
        var socket = io.connect('1192.168.1.42:4200');
        
        
    





