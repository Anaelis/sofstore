Modal.allowMultiple=true;

var validador=$.validator;

validador.setDefaults({
	rules:{
		regnombre:{
			required:true,
			minlength:4,
			maxlength:24
		},
		regmail:{
			required:true,
			email:true
		},
		regclave1:{
			required:true,
			minlength:6
		},
		regclave2:{
			required:true,
			minlength:6,
			equalTo:"#regpass1"
		},
		lognombre:{
			required:true,
			minlength:4,
			maxlength:24
		},
		logclave1:{
			required:true,
			minlength:6
		}
	},
	messages:{
		regnombre:{
			required:"Introducir un nombre",
			minlength:"como mínimo {0} caracteres",
			maxlength:"como máximo {0} caracteres"
		},
		regmail:{
			required:"Introducir un email",
			email:"Has introducido un email inválido"
		},
		regclave1:{
			required:"Introducir una contraseña",
			minlength:"como mínimo {0} caracteres"
		},
		regclave2:{
			required:"Debes repetir la contraseña",
			minlength:"como mínimo {0} caracteres",
			equalTo:"Ambas claves deben ser iguales"
		},
		lognombre:{
			required:"Introducir un Usuario válido",
			minlength:"como mínimo {0} caracteres",
			maxlength:"como máximo {0} caracteres"
		},
		logclave1:{
			required:"Introducir Contraseña",
			minlength:"como mínimo {0} caracteres"
		}
	}
});

Template.login.onRendered(function (){
	validator=$('#login-form').validate();
});

Template.register.onRendered(function (){
	validator=$('#register-form').validate();
});

Template.login.events({
	"click a#logreg":function(event,template){
		event.preventDefault();
		Modal.hide(template);
		Modal.show('register');
	},
	"submit #login-form":function(event,template){
		var user=template.find('#lognombre').value;
		var pass=template.find('#logpass1').value;
		Meteor.loginWithPassword(user,pass,function(err){

			if(err){
				if(err.reason == "User not found"){
					validator.showErrors({
						lognombre:"Ese usuario no existe"
					});
				}

				if(err.reason == "Incorrect password"){
					validator.showErrors({
						logclave1:"Has introducido una contraseña incorrecta"
					});
				}
			}
			else{
				//router
				console.log(Meteor.user());
				Modal.hide(template);
			}

		});
		return false;
	}

});
Template.register.events({
	"click a#reglogin":function(event,template){
		event.preventDefault();
		Modal.hide(template);
		Modal.show('login');
	},

	"submit #register-form":function(event,template){
		 var user=template.find('#regnombre').value;
		 var email=template.find('#regemail').value;
		 var pass1=template.find('#regpass1').value;
		 var pass2=template.find('#regpass2').value;

		 var userObject={
		 	username:user,
		 	email:email,
		 	password:pass1
		 };

		Accounts.createUser(userObject, function(err){
			if(err){
				console.log(err.reason);

				//username already exits
				if(err.reason == "Username already exists."){
					validador.showError({
						regnombre:"Ya existe un usuario con ese nombre."
					});
				}
				

				// email already exits
				if(err.reason == "Email already exists."){
					validador.showError({

						regmail:"Email ya pertenece a un usuario registrado."
				});
	
				}
				


			}else{

				console.log(Meteor.user());
				Modal.hide(template);
			}
			});

			console.log('submit form'+user+email+pass1+pass2);
			return false;
			}
		});

Template.logout.events({
	"submit #logout-form": function(event, template){
		Meteor.logout(function(err){
		console.log(err.reason);
		});
	}
});


