export default ()=>({

    signin:(email, password)=>{
        return new Promise((resolve, reject)=>{

            setTimeout(()=>{
                let json ={
                    error:'',
                    token:'123'
                };

                resolve(json);

            }, 1000);
        });
    },

    signup:(name, email, password)=>{
        return new Promise((resolve, reject)=>{

            setTimeout(()=>{
                let json ={
                    error:'',
                };

                if(email == 'erro@hotmail.com'){
                    json.error = 'Email já existe!';
                } else{
                    json.token = '123';
                }

                resolve(json);

            }, 1000);
        });
    },


    getRequestPrice:(distance) =>{
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                let json ={
                    error:''
                };
    
                json.price = distance * 7;
    
                resolve(json);
            },1000);
        });
    },

    findDriver:(options)=>{
       return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let json = {
                error:''
            };

            json.driver = {
                id:'1234',
                name: 'Tony Rogers',
                stars: 4,
                carName: 'Honda Civic',
                carColor:'Branco',
                carPlate:'AAA-0101'
            };

            json.error = 'Nenhum motorista encontrado';

            resolve(json);
        }, 3000);
       }); 
    }



});

