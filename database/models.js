module.exports = {
	user:{
		name:{type:String,required:true},
		password:{type:String,required:true}
	},
	todolist:{
		name:{type:String,required:true},
		title:{type:String,required:true},
		context:{type:String,required:true},
		time:{type:Date,required:true}
	}
};
