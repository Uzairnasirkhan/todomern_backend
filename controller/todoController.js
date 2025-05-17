const TodoModel = require("../models/todoModel")

const TodoController = {

    get: async(req,res)=>{
        try {
            const result = await TodoModel.find({})
            res.status(200).json({
                isSuccessfull: true,
                data: result
            })    
        } catch (error) {
            console.log(error)
            res.status(400).json({
                isSuccessfull: false,
                error: error.message
            })
        }
    },

    getById: async(req,res)=>{
        try {
            const id = req.params.id
                const result = await TodoModel.findById(id)
                res.status(200).json({
                  isSuccessfull:true,
                  data: result
                })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                isSuccessfull: false,
                error: error.message
            })
        }
    },

    post: async(req,res)=>{
        try {
            const { title } = req.body;
            if (!title) {
              return res.status(400).json({
                isSuccessfull: false,
                error: "Title is required",
              });
            }
            const modelObj = new TodoModel({ title });
            await modelObj.save();
            res.status(201).json({
              isSuccessfull: true,
              message: "Data posted successfully",
            });
          } catch (error) {
            console.error(error);
            res.status(400).json({
              isSuccessfull: false,
              error: "Failed to create todo",
            });
          }
    },

    put: async(req,res)=>{
        try {
            const id = req.params.id;
                const body = req.body;
            
                const result = await TodoModel.findByIdAndUpdate(id, body, { new: true });
            
                res.status(200).json({
                  isSuccessfull: true,
                  message: "Record Updated Successfully",
                  data: result,
                });
        } catch (error) {
            console.log(error);
                res.status(400).json({
                  isSuccessfull: false,
                  error: error.message,
                });
        }
    },

    delete: async(req,res)=>{
        try {
            const id = req.params.id;
            const result = await TodoModel.findByIdAndDelete(id);
            
                res.status(200).json({
                  isSuccessfull: true,
                  message: "Book deleted Successfully",
                  data: result,
                });
        } catch (error) {
            console.log(error);
                res.status(400).json({
                  isSuccessfull: false,
                  error: error.message,
                });
        }
    }

}

module.exports = TodoController