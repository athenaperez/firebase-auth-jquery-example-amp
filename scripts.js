firebase.initializeApp({
    apiKey: "AIzaSyCpjV3kTPJEu5FQRPNcetyFxhMI3ia_wKo",
    authDomain: "c17-jquery-auth-1852c.firebaseapp.com",
    databaseURL: "https://c17-jquery-auth-1852c.firebaseio.com",
    storageBucket: "c17-jquery-auth-1852c.appspot.com",
    messagingSenderId: "204747812281"
  });


// event listener to listen for when logged in changed to logged out-->
firebase.auth().onAuthStateChanged(() => {
	if (firebase.auth().currentUser !== null) {
	// logged in
	var email = firebase.auth().currentUser.email

	$('.login-page').addClass('hidden')
	$('.main-page').removeClass('hidden')
		$('.main-page h1').text(`Welcome ${email}`)
} else {
	// logged out
	$('.login-page').removeClass('hidden')
	$('.main-page').addClass('hidden')
  }
})

// on login
$('.login-page form').submit((e) => {
	var email = $('input[type="email"]').val()
	var password = $('input[type="password"]').val()

// collecting sign in info -->
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(() => {
				$('form')[0].reset()
// VANILLA VERSION ----->  of this^^^
// // next thing to happen when successfully logged in (hence, .then)-->
// 		//set to the h1 -->
// 			$('.main-page h1').text(`Welcome ${email}`)
// 			//switch the views --> (add class, remover class)x
// 			$('.login-page').addClass('hidden')
// 			$('.main-page').removeClass('hidden')
	})
	//prevent default reload
	e.preventDefault()
})

// logout button
$('.log-out').click(() => firebase.auth().signOut())

$('.main-page form').submit((e) => {
	var task = $('.main-page input[type="text"]').val()
	// unique identifyer for the user
	var uid = firebase.auth().currentUser.uid
	$.post(
		`https://c17-jquery-auth-1852c.firebaseio.com/${uid}.json`,
		JSON.stringify({ task: task })
		).then(console.log)

	e.preventDefault()
})


