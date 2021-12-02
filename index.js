const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model.js');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
     useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async(x) => {
    console.log(
      `Conectado ao banco ${x.connections[0].name} com sucesso!`);
      try{

     const createdRecipes = await  Recipe.create({
      title: "Chicken Glazer 11 ",
       level: "UltraPro Chef",
        ingredients:"1/2 cup rice vinegar",
         
    
        cuisine: "Asian",
        dishType: "main_course",
        image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
        duration: 40,
        creator: "Chef LePapu",
        created: 01/12/2021
     });

        //criando muitos
        await Recipe.insertMany(data);

        //atualizando dados da duração
        const updatedDuracion = await Recipe.findOneAndUpdate(
         { title: "Rigatoni alla Genovese"},
          { $set: { duration: 100 } },
          { new: true }

         
        );
        console.log("DURAÇÃO ATUALIZADA COM SUCESSO! => ", updatedDuracion);

        const  deleteCake = await Recipe.deleteOne({
          title: "Carrot Cake"
         } );
        console.log("RECEITA APAGADA COM SUCESSO! => ", deleteCake);
 

        // Before adding any recipes to the database, let's remove all existing ones

    console.log(`Connected to the database: "${x.connection.name}"`);
        Recipe.close();
    // Before adding any recipes to the database, let's remove all existing ones
   // return Recipe.deleteMany()
    } catch (err) {
      console.log(err);
    }
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
   // console.log("um produto criado", createdRecipes);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
